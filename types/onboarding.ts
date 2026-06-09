import type { PlanCategory } from "@/types/plan";

export type OnboardingQuestionType = "text" | "tel" | "textarea" | "radio" | "file-placeholder";

export interface OnboardingQuestion {
  id: `q${number}`;
  number: number;
  label: string;
  type: OnboardingQuestionType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[];
  rows?: number;
  conditional?: { field: string; value: string };
  linkField?: boolean;
}

export interface OnboardingSectionData {
  id: number;
  title: string;
  subtitle: string;
  questions: OnboardingQuestion[];
}

export type OnboardingAnswers = Record<string, string>;
export type OnboardingQuestionId = `q${number}`;
export type OnboardingRawAnswers = Record<OnboardingQuestionId, string>;

export interface OnboardingPlanSelection {
  servicio_interes: PlanCategory;
  plan_interes: string;
  servicio_label: string;
  plan_label: string;
}

export interface OnboardingPayload {
  empresa_nombre: string;
  descripcion_empresa: string;
  sector: string;
  ubicacion: string;
  horario_atencion: string;
  whatsapp: string;
  sitio_web_redes: string;
  nombre_agente: string;
  tono_agente: string;
  trato_cliente: string;
  palabras_prohibidas: string;
  frases_obligatorias: string;
  ejemplo_tono: string;
  preguntas_frecuentes: string;
  producto_servicio: string;
  documentos_link: string;
  documentos_archivos: string[];
  temas_prohibidos: string;
  frecuencia_actualizacion: string;
  mensajes_voz: string;
  tipo_voz: string;
  audios_clonacion_archivos: string[];
  llamadas_automaticas: string;
  instrucciones_llamadas: string;
  reglas_escalamiento: string;
  contacto_escalamiento: string;
  fuera_horario: string;
  captura_datos_cliente: string;
  crm_actual: string;
  twilio_estado: string;
  whatsapp_business_acceso: string;
  contacto_tecnico: string;
  integraciones_adicionales: string;
  servicio_interes: PlanCategory | "";
  plan_interes: string;
  origen: "formulario_onboarding_publitek";
  fecha_envio: string;
  respuestas_raw: OnboardingRawAnswers;
}

export interface OnboardingPayloadValidation {
  fieldErrors: Record<string, string>;
  selectionError?: string;
}

export type OnboardingFormStatus = "idle" | "loading" | "error" | "success";
