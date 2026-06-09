import type {
  OnboardingAnswers,
  OnboardingPayload,
  OnboardingPayloadValidation,
  OnboardingPlanSelection,
  OnboardingQuestionId,
  OnboardingRawAnswers,
} from "@/types/onboarding";

export const onboardingQuestionIds = Array.from(
  { length: 32 },
  (_, index) => `q${index + 1}` as OnboardingQuestionId,
);

function answer(answers: OnboardingAnswers, id: OnboardingQuestionId) {
  return answers[id]?.trim() ?? "";
}

export function buildOnboardingPayload(
  answers: OnboardingAnswers,
  selection: OnboardingPlanSelection | null,
  fechaEnvio = new Date().toISOString(),
): OnboardingPayload {
  const respuestasRaw = Object.fromEntries(
    onboardingQuestionIds.map((id) => [id, answers[id] ?? ""]),
  ) as OnboardingRawAnswers;

  return {
    empresa_nombre: answer(answers, "q1"),
    descripcion_empresa: answer(answers, "q2"),
    sector: answer(answers, "q3"),
    ubicacion: answer(answers, "q4"),
    horario_atencion: answer(answers, "q5"),
    whatsapp: answer(answers, "q6"),
    sitio_web_redes: answer(answers, "q7"),
    nombre_agente: answer(answers, "q8"),
    tono_agente: answer(answers, "q9"),
    trato_cliente: answer(answers, "q10"),
    palabras_prohibidas: answer(answers, "q11"),
    frases_obligatorias: answer(answers, "q12"),
    ejemplo_tono: answer(answers, "q13"),
    preguntas_frecuentes: answer(answers, "q14"),
    producto_servicio: answer(answers, "q15"),
    documentos_link: answer(answers, "q16"),
    documentos_archivos: [],
    temas_prohibidos: answer(answers, "q17"),
    frecuencia_actualizacion: answer(answers, "q18"),
    mensajes_voz: answer(answers, "q19"),
    tipo_voz: answer(answers, "q20"),
    audios_clonacion_archivos: [],
    llamadas_automaticas: answer(answers, "q22"),
    instrucciones_llamadas: answer(answers, "q23"),
    reglas_escalamiento: answer(answers, "q24"),
    contacto_escalamiento: answer(answers, "q25"),
    fuera_horario: answer(answers, "q26"),
    captura_datos_cliente: answer(answers, "q27"),
    crm_actual: answer(answers, "q28"),
    twilio_estado: answer(answers, "q29"),
    whatsapp_business_acceso: answer(answers, "q30"),
    contacto_tecnico: answer(answers, "q31"),
    integraciones_adicionales: answer(answers, "q32"),
    servicio_interes: selection?.servicio_interes ?? "",
    plan_interes: selection?.plan_interes ?? "",
    origen: "formulario_onboarding_publitek",
    fecha_envio: fechaEnvio,
    respuestas_raw: respuestasRaw,
  };
}

export function validateOnboardingPayload(payload: OnboardingPayload): OnboardingPayloadValidation {
  const fieldErrors: Record<string, string> = {};

  if (!payload.empresa_nombre) fieldErrors.q1 = "Ingresa el nombre de tu empresa.";
  if (!payload.descripcion_empresa) fieldErrors.q2 = "Describe a qué se dedica tu negocio.";
  if (!payload.whatsapp) fieldErrors.q6 = "Ingresa el número de WhatsApp para el agente.";

  const selectionError = !payload.servicio_interes || !payload.plan_interes
    ? "Selecciona un servicio y un plan desde la landing antes de enviar."
    : undefined;

  return { fieldErrors, selectionError };
}
