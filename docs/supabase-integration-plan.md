# Plan de integración con Supabase

## Alcance del análisis

Este documento analiza el DDL compartido para integrar la landing con el
proyecto Supabase existente. No crea SQL, no modifica schema o RLS y no realiza
inserciones.

DDL disponible:

- `public.empresas`: columnas, defaults y constraints principales.
- `public.leads`: columnas, defaults, foreign key y unique constraint.
- `public.actividades_lead`: columnas, defaults y foreign keys.
- Índices reales de `public.empresas`, `public.leads` y
  `public.actividades_lead`.
- `public.eventos_sistema`: no fue incluido en el DDL compartido.

## Conclusión ejecutiva

`public.leads` puede recibir leads de la landing sin modificar el schema.

La tabla no tiene columnas dedicadas para `email`, empresa declarada,
`servicio_interes`, `plan_interes` o `mensaje`. Para conservar toda la
información:

- `servicio_interes` se guarda en `intencion`.
- `plan_interes` se guarda en `campana`.
- El payload original completo se guarda como un elemento estructurado de
  `historial`.
- `canal` se establece como `web`.
- `origen` se establece como `landing_publitek`.

La integración completa con `public.eventos_sistema` no puede confirmarse aún
sin su DDL real.

## public.empresas

### Columnas obligatorias

| Columna | Tipo | Default |
| --- | --- | --- |
| `id` | `uuid` | `gen_random_uuid()` |
| `nombre` | `text` | ninguno |

Las demás columnas son nullable o tienen default.

### Resolución de empresa_id

Todos los leads web pertenecen al tenant interno `Publitek Leads`.

Resolución requerida:

```text
public.empresas.nombre = 'Publitek Leads'
```

La consulta futura debe seleccionar `id` y exigir exactamente un resultado.
No debe crear la empresa automáticamente.

Riesgo: el DDL compartido no muestra un constraint unique sobre
`public.empresas.nombre`. Si existen duplicados, la integración debe fallar y
registrar el problema.

### Índices confirmados

- Primary key unique sobre `id`.
- Unique parcial sobre `twilio_number` cuando no es null.
- Índice sobre `whatsapp_contacto`.

No existe índice ni constraint unique sobre `nombre`. Resolver
`Publitek Leads` por nombre es posible sin modificar schema, pero la aplicación
debe detectar cero o múltiples resultados. Para evitar ambigüedad, conviene
resolver una vez el UUID confirmado y configurarlo server-side en la futura
integración.

## public.leads

### Columnas

| Columna | Tipo | Nullable | Default |
| --- | --- | --- | --- |
| `id` | `uuid` | no | `gen_random_uuid()` |
| `empresa_id` | `uuid` | sí | ninguno |
| `telefono` | `text` | no | ninguno |
| `nombre` | `text` | sí | ninguno |
| `canal` | `text` | sí | `whatsapp` |
| `estado` | `text` | sí | `nuevo` |
| `nivel_interes` | `text` | sí | `bajo` |
| `intencion` | `text` | sí | ninguno |
| `historial` | `jsonb` | sí | `[]` |
| `ultima_interaccion` | `timestamptz` | sí | `now()` |
| `created_at` | `timestamptz` | sí | `now()` |
| `modo_atencion` | `text` | sí | `ia` |
| `pausado_hasta` | `timestamptz` | sí | ninguno |
| `estado_comercial` | `text` | sí | `nuevo` |
| `origen` | `text` | sí | ninguno |
| `campana` | `text` | sí | ninguno |

### Constraints confirmados

- Primary key: `leads.id`.
- Foreign key: `leads.empresa_id -> empresas.id`.
- Unique compuesto: `leads (empresa_id, telefono)`.
- `id` y `telefono` son obligatorios.
- No se compartieron checks de valores permitidos para estados o canales.

### Índices confirmados

- `idx_leads_empresa` sobre `(empresa_id)`.
- `idx_leads_estado` sobre `(empresa_id, estado)`.
- `idx_leads_interes` sobre `(empresa_id, nivel_interes)`.
- Unique `leads_empresa_id_telefono_key` sobre `(empresa_id, telefono)`.
- Primary key unique sobre `(id)`.

Estos índices confirman que las consultas y operaciones de leads deben estar
siempre acotadas por `empresa_id`. La búsqueda previa por
`(empresa_id, telefono)` está respaldada por un índice unique y es la ruta
correcta para detectar reingresos desde la landing.

### Mapeo real LeadForm -> public.leads

| Formulario web | Destino real | Transformación |
| --- | --- | --- |
| `nombre` | `nombre` | trim |
| `empresa` | `historial[0].datos_web.empresa` | trim |
| `email` | `historial[0].datos_web.email` | trim + lowercase |
| `telefono` | `telefono` | trim; normalización E.164 recomendada antes de insertar |
| `servicio_interes` | `intencion` y `historial[0].datos_web.servicio_interes` | id validado |
| `plan_interes` | `campana` y `historial[0].datos_web.plan_interes` | id validado |
| `mensaje` | `historial[0].datos_web.mensaje` | trim; `null` si está vacío |
| constante | `empresa_id` | id resuelto de `Publitek Leads` |
| constante | `canal` | `web` |
| constante | `origen` | `landing_publitek` |

La empresa declarada por el prospecto no debe confundirse con `empresa_id`.
`empresa_id` identifica a `Publitek Leads`; la empresa declarada se conserva
dentro de `historial`.

No existen columnas ni índices dedicados para email o empresa declarada. El
mapeo a `historial` conserva esos valores sin modificar schema, pero no permite
búsquedas eficientes por email o empresa desde SQL. Esta es una limitación
aceptable para la captura inicial, no una equivalencia funcional a columnas
dedicadas.

### Payload final propuesto para public.leads

Este payload usa exclusivamente columnas confirmadas:

```json
{
  "empresa_id": "<uuid de Publitek Leads>",
  "telefono": "+573001234567",
  "nombre": "Ana Pérez",
  "canal": "web",
  "estado": "nuevo",
  "nivel_interes": "bajo",
  "intencion": "ventas",
  "historial": [
    {
      "tipo": "lead_web_creado",
      "created_at": "<ISO timestamp>",
      "datos_web": {
        "empresa": "Empresa Demo",
        "email": "ana@example.com",
        "servicio_interes": "ventas",
        "plan_interes": "growth",
        "mensaje": "Quiero automatizar ventas",
        "origen": "landing_publitek"
      }
    }
  ],
  "ultima_interaccion": "<ISO timestamp>",
  "modo_atencion": "ia",
  "estado_comercial": "nuevo",
  "origen": "landing_publitek",
  "campana": "growth"
}
```

Se pueden omitir `id` y `created_at` porque tienen defaults. Se propone enviar
explícitamente estados, canal y modo para que la intención de la integración no
dependa de defaults diseñados originalmente para WhatsApp.

### Riesgo obligatorio: teléfono duplicado

El unique constraint `(empresa_id, telefono)` impide crear otro lead web con el
mismo teléfono dentro de `Publitek Leads`.

Antes de implementar debe elegirse una política:

1. **Recomendado:** buscar por `(empresa_id, telefono)`, actualizar los campos
   recientes y anexar un nuevo elemento a `historial`.
2. Rechazar el envío duplicado con una respuesta controlada.

No debe usarse un upsert que reemplace `historial`, porque perdería actividad
anterior.

## public.actividades_lead

### Columnas

| Columna | Tipo | Nullable | Default |
| --- | --- | --- | --- |
| `id` | `uuid` | no | `gen_random_uuid()` |
| `empresa_id` | `uuid` | no | ninguno |
| `lead_id` | `uuid` | sí | ninguno |
| `tipo_actividad` | `text` | no | ninguno |
| `actor` | `text` | no | ninguno |
| `descripcion` | `text` | sí | ninguno |
| `payload` | `jsonb` | sí | `{}` |
| `created_at` | `timestamptz` | no | `now()` |

### Constraints confirmados

- Primary key: `actividades_lead.id`.
- Foreign key: `empresa_id -> empresas.id`.
- Foreign key: `lead_id -> leads.id`.
- Obligatorios: `empresa_id`, `tipo_actividad`, `actor`.
- `lead_id` es nullable, pero debe incluirse para esta integración.

### Índices confirmados

- `idx_actividades_empresa` sobre `(empresa_id, tipo_actividad)`.
- `idx_actividades_lead` sobre `(lead_id, created_at)`.
- Primary key unique sobre `(id)`.

El payload propuesto aprovecha ambos índices: incluye siempre `empresa_id`,
`tipo_actividad`, `lead_id` y deja que `created_at` use su default.

### Payload final propuesto para public.actividades_lead

```json
{
  "empresa_id": "<uuid de Publitek Leads>",
  "lead_id": "<uuid del lead creado o actualizado>",
  "tipo_actividad": "lead_web_creado",
  "actor": "landing_publitek",
  "descripcion": "Lead recibido desde la landing de Publitek",
  "payload": {
    "empresa_declarada": "Empresa Demo",
    "email": "ana@example.com",
    "telefono": "+573001234567",
    "servicio_interes": "ventas",
    "plan_interes": "growth",
    "mensaje": "Quiero automatizar ventas",
    "origen": "landing_publitek"
  }
}
```

Se omiten `id` y `created_at` para usar sus defaults.

Si un teléfono ya existe, debe decidirse si la actividad conserva
`lead_web_creado` por requerimiento funcional o usa otro tipo como
`lead_web_reingresado`. Este segundo valor no está confirmado por el schema.

## public.eventos_sistema

El DDL de esta tabla no fue incluido. Por tanto, no es posible identificar sus
columnas obligatorias, defaults, constraints, foreign keys ni producir un
payload garantizado como insertable.

Contrato conceptual requerido:

```json
{
  "tipo_evento": "nuevo_lead_web",
  "empresa_id": "<uuid de Publitek Leads>",
  "lead_id": "<uuid del lead creado o actualizado>",
  "payload": {
    "origen": "landing_publitek",
    "servicio_interes": "ventas",
    "plan_interes": "growth"
  }
}
```

Este payload es solo conceptual. Debe reemplazarse por el payload real cuando
se comparta el DDL de `public.eventos_sistema`.

## Flujo de integración propuesto

```text
POST /api/leads
  -> validar y normalizar payload
  -> resolver public.empresas.id por nombre = "Publitek Leads"
  -> normalizar teléfono
  -> buscar public.leads por (empresa_id, telefono)
  -> crear lead o actualizar/anexar historial según política de duplicados
  -> insertar public.actividades_lead
  -> insertar public.eventos_sistema cuando su DDL esté confirmado
  -> responder solo lead_id
```

La resolución de empresa, creación/actualización del lead y registros
relacionados deberían ejecutarse atómicamente.

## ¿Puede integrarse sin modificar schema?

**Sí, `/api/leads` puede integrarse con `public.leads` y
`public.actividades_lead` sin modificar schema.** Todos los datos del formulario
pueden conservarse usando las columnas existentes y `historial` JSONB.

La implementación debe:

1. Resolver un `empresa_id` no nulo para `Publitek Leads`.
2. Normalizar el teléfono.
3. Consultar por el unique `(empresa_id, telefono)`.
4. Crear o actualizar/anexar historial según la política de reingreso.
5. Registrar la actividad con los campos obligatorios e indexados.

**Aún no puede confirmarse para `public.eventos_sistema`**, porque falta su DDL
real. La política de teléfonos duplicados ya está definida e implementada como
actualización del lead existente con anexado de historial.

## Estado de implementación

Implementado en `lib/supabase-server.ts` y `POST /api/leads`:

- Resolución dinámica de `Publitek Leads` por nombre.
- Normalización de teléfono.
- Consulta por `(empresa_id, telefono)`.
- Creación de leads nuevos.
- Actualización de leads existentes anexando `historial`.
- Recuperación ante una carrera de inserción por el unique compuesto.
- Registro en `public.actividades_lead`.
- Respuesta pública limitada a `lead_id`.

La integración usa las variables server-side `SUPABASE_URL` y
`SUPABASE_SERVICE_ROLE_KEY`. No modifica schema ni RLS.

Limitación actual: la escritura de lead y actividad usa dos operaciones REST.
Si la actividad falla después de persistir el lead, la API responde error pero
el lead permanece guardado. Resolver esto de forma atómica requerirá confirmar
o crear una operación transaccional compatible con la arquitectura existente.

## Pendientes antes de implementar

- Compartir DDL de `public.eventos_sistema`.
- Confirmar que `canal = 'web'`, `actor = 'landing_publitek'` y
  `tipo_actividad = 'lead_web_creado'` son valores aceptados por la aplicación,
  dado que no aparecen checks que los limiten.
- Política implementada para duplicados: actualizar el lead y anexar historial.
- Confirmar que existe exactamente una empresa llamada `Publitek Leads`.
- Confirmar si `historial` tiene una estructura esperada por procesos actuales.
- Confirmar si las operaciones se implementarán mediante una función/RPC
  transaccional existente.
