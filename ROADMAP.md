# Roadmap Publitek Web

## Completado

- [x] Fase 1: estructura Next.js, navbar, hero, selector y estadísticas.
- [x] Fase 2: soluciones, pricing, FAQ, CTA y footer.
- [x] Fase 3: modal y formulario local de captura de leads.
- [x] Fase 4: endpoint interno con validación cliente/servidor.
- [x] Diseñar integración con el schema Supabase existente.
- [x] Resolver dinámicamente la empresa interna `Publitek Leads`.
- [x] Crear o actualizar leads por `(empresa_id, telefono)`.
- [x] Anexar reingresos web a `leads.historial`.
- [x] Registrar `lead_web_creado` en `actividades_lead`.
- [x] Responder desde `/api/leads` únicamente con `lead_id`.
- [x] Fase 5: integración Supabase para captura de leads cerrada.
- [x] Paso 2: ruta `/onboarding` migrada al sistema visual de Publitek.
- [x] Paso 4: ruta `/dashboard-demo` migrada con datos mock.
- [x] Dashboard MVP reorganizado en componentes reutilizables.
- [x] Dashboard MVP con Resumen, Analíticas, Leads, IA/Humano y Pagos.
- [x] Añadir mocks de uso del plan, pipeline, audios, pagos y handoffs.
- [x] Conectar CTAs de planes con el onboarding completo de 32 preguntas.
- [x] Validar y mostrar `servicio` y `plan` seleccionados en `/onboarding`.
- [x] Incluir `servicio_interes` y `plan_interes` en el payload local del onboarding.
- [x] Definir el contrato semántico tipado del onboarding para n8n.
- [x] Mantener `respuestas_raw` con `q1` a `q32`.
- [x] Validar empresa, descripción, WhatsApp, servicio y plan antes de procesar.
- [x] Crear `POST /api/onboarding` como proxy server-side hacia n8n.
- [x] Conectar el formulario completo al workflow sin exponer el webhook.

## Integración Supabase

- [x] Obtener y analizar DDL de `empresas`, `leads` y `actividades_lead`.
- [x] Confirmar el mapeo en `docs/supabase-integration-plan.md`.
- [x] Confirmar existencia de la empresa interna `Publitek Leads`.
- [x] Implementar acceso Supabase exclusivamente server-side.
- [x] Insertar/actualizar `public.leads` sin modificar schema ni RLS.
- [x] Registrar `tipo_actividad = 'lead_web_creado'`.
- [x] Manejar reingresos por el unique `(empresa_id, telefono)`.
- [ ] Definir una operación transaccional para lead + actividad + evento.
- [ ] Obtener y analizar DDL de `eventos_sistema`.
- [ ] Registrar `tipo_evento = 'nuevo_lead_web'`.
- [ ] Añadir pruebas automatizadas de errores y persistencia.

## Próxima fase: unificación visual

- [x] Unificar el estilo visual del onboarding con la landing de Publitek.
- [x] Unificar el estilo visual del dashboard demo con la landing de Publitek.
- [x] Unificar el flujo visual `plan → onboarding → configuración`.
- [ ] Consolidar colores, tipografías, espaciado y componentes compartidos.
- [ ] Verificar experiencia responsive de onboarding y dashboard demo.

## Fuera de alcance actual

- Autenticación.
- Dashboard.
- Pagos.
- Twilio.
- Cambios de schema o RLS.
