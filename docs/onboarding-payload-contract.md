# Contrato del payload de onboarding

## Alcance

Este contrato define el payload que el formulario React `/onboarding` envía a
`POST /api/onboarding`. El endpoint interno valida los campos mínimos y reenvía
el mismo objeto al workflow n8n configurado.

La URL del webhook nunca se expone al navegador. El onboarding no accede
directamente a Supabase ni Twilio.

## Construcción

El payload se construye mediante `buildOnboardingPayload` en
`lib/onboarding-payload.ts`.

La función:

1. Normaliza los campos semánticos eliminando espacios al inicio y al final.
2. Conserva `respuestas_raw` con todas las claves desde `q1` hasta `q32`.
3. Mantiene los arreglos de archivos vacíos mientras la subida está
   deshabilitada.
4. Incluye el servicio y plan previamente validados desde la URL.
5. Genera `fecha_envio` en formato ISO 8601.

## Mapeo semántico

| Campo del payload | Origen |
| --- | --- |
| `empresa_nombre` | `q1` |
| `descripcion_empresa` | `q2` |
| `sector` | `q3` |
| `ubicacion` | `q4` |
| `horario_atencion` | `q5` |
| `whatsapp` | `q6` |
| `sitio_web_redes` | `q7` |
| `nombre_agente` | `q8` |
| `tono_agente` | `q9` |
| `trato_cliente` | `q10` |
| `palabras_prohibidas` | `q11` |
| `frases_obligatorias` | `q12` |
| `ejemplo_tono` | `q13` |
| `preguntas_frecuentes` | `q14` |
| `producto_servicio` | `q15` |
| `documentos_link` | `q16` |
| `documentos_archivos` | `[]` |
| `temas_prohibidos` | `q17` |
| `frecuencia_actualizacion` | `q18` |
| `mensajes_voz` | `q19` |
| `tipo_voz` | `q20` |
| `audios_clonacion_archivos` | `[]` |
| `llamadas_automaticas` | `q22` |
| `instrucciones_llamadas` | `q23` |
| `reglas_escalamiento` | `q24` |
| `contacto_escalamiento` | `q25` |
| `fuera_horario` | `q26` |
| `captura_datos_cliente` | `q27` |
| `crm_actual` | `q28` |
| `twilio_estado` | `q29` |
| `whatsapp_business_acceso` | `q30` |
| `contacto_tecnico` | `q31` |
| `integraciones_adicionales` | `q32` |
| `servicio_interes` | selección validada desde query params |
| `plan_interes` | selección validada desde query params |
| `origen` | `formulario_onboarding_publitek` |
| `fecha_envio` | fecha ISO generada al enviar |
| `respuestas_raw` | objeto completo `q1` a `q32` |

`q21` se conserva dentro de `respuestas_raw`, pero no tiene un campo semántico
de texto porque representa archivos para clonación de voz. Mientras no exista
carga de archivos, `audios_clonacion_archivos` será un arreglo vacío.

## Validación mínima del contrato

Además de las preguntas requeridas del formulario, el payload no puede
procesarse localmente si falta alguno de estos valores:

- `empresa_nombre`
- `descripcion_empresa`
- `whatsapp`
- `servicio_interes`
- `plan_interes`

La selección de servicio y plan proviene de
`/onboarding?servicio=<servicio>&plan=<plan>` y se valida contra
`lib/plans.ts`.

## Payload exacto

```json
{
  "empresa_nombre": "Inmobiliaria Los Andes",
  "descripcion_empresa": "Empresa dedicada al arriendo de apartamentos.",
  "sector": "Inmobiliaria",
  "ubicacion": "Bogotá",
  "horario_atencion": "Lunes a viernes 8am–6pm",
  "whatsapp": "+573112752225",
  "sitio_web_redes": "https://empresa.com",
  "nombre_agente": "Sofía",
  "tono_agente": "Cercano y amigable",
  "trato_cliente": "Siempre tutear",
  "palabras_prohibidas": "",
  "frases_obligatorias": "",
  "ejemplo_tono": "Hola, ¿cómo puedo ayudarte?",
  "preguntas_frecuentes": "P: ¿Cuál es el precio?\nR: Depende del inmueble.",
  "producto_servicio": "Arriendo de apartamentos",
  "documentos_link": "https://drive.google.com/...",
  "documentos_archivos": [],
  "temas_prohibidos": "No ofrecer descuentos sin autorización.",
  "frecuencia_actualizacion": "Mensualmente",
  "mensajes_voz": "Sí, siempre",
  "tipo_voz": "Voz genérica",
  "audios_clonacion_archivos": [],
  "llamadas_automaticas": "Sí, desde el inicio",
  "instrucciones_llamadas": "Llamar cuando el prospecto solicite una visita.",
  "reglas_escalamiento": "Transferir cuando solicite hablar con un asesor.",
  "contacto_escalamiento": "+573000000000",
  "fuera_horario": "Responder e informar horario",
  "captura_datos_cliente": "Siempre al inicio",
  "crm_actual": "HubSpot",
  "twilio_estado": "No tengo",
  "whatsapp_business_acceso": "Sí, acceso completo",
  "contacto_tecnico": "Juan García · +573100000000 · juan@empresa.com",
  "integraciones_adicionales": "",
  "servicio_interes": "ventas",
  "plan_interes": "growth",
  "origen": "formulario_onboarding_publitek",
  "fecha_envio": "2026-06-09T20:00:00.000Z",
  "respuestas_raw": {
    "q1": "Inmobiliaria Los Andes",
    "q2": "Empresa dedicada al arriendo de apartamentos.",
    "q3": "Inmobiliaria",
    "q4": "Bogotá",
    "q5": "Lunes a viernes 8am–6pm",
    "q6": "+573112752225",
    "q7": "https://empresa.com",
    "q8": "Sofía",
    "q9": "Cercano y amigable",
    "q10": "Siempre tutear",
    "q11": "",
    "q12": "",
    "q13": "Hola, ¿cómo puedo ayudarte?",
    "q14": "P: ¿Cuál es el precio?\nR: Depende del inmueble.",
    "q15": "Arriendo de apartamentos",
    "q16": "https://drive.google.com/...",
    "q17": "No ofrecer descuentos sin autorización.",
    "q18": "Mensualmente",
    "q19": "Sí, siempre",
    "q20": "Voz genérica",
    "q21": "",
    "q22": "Sí, desde el inicio",
    "q23": "Llamar cuando el prospecto solicite una visita.",
    "q24": "Transferir cuando solicite hablar con un asesor.",
    "q25": "+573000000000",
    "q26": "Responder e informar horario",
    "q27": "Siempre al inicio",
    "q28": "HubSpot",
    "q29": "No tengo",
    "q30": "Sí, acceso completo",
    "q31": "Juan García · +573100000000 · juan@empresa.com",
    "q32": ""
  }
}
```

## Integración n8n

El endpoint utiliza la variable server-side `N8N_ONBOARDING_WEBHOOK_URL`.
Responde `{ "success": true, "data": {} }` únicamente cuando n8n devuelve una
respuesta HTTP exitosa. Los errores externos se transforman en mensajes
genéricos para no exponer información interna.
