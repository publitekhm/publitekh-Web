import type { LeadErrors, LeadPayload } from "@/types/lead";
import { planGroups } from "@/lib/plans";
import type { PlanCategory } from "@/types/plan";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const serviceCategories: PlanCategory[] = ["ventas", "contenido", "combo"];

export function validateLead(payload: LeadPayload): LeadErrors {
  const errors: LeadErrors = {};

  if (!payload.nombre.trim()) errors.nombre = "Ingresa tu nombre.";
  if (!payload.empresa.trim()) errors.empresa = "Ingresa el nombre de tu empresa.";
  if (!emailPattern.test(payload.email.trim())) errors.email = "Ingresa un correo válido.";
  if (!payload.telefono.trim()) errors.telefono = "Ingresa tu teléfono.";
  if (!payload.servicio_interes || !serviceCategories.includes(payload.servicio_interes)) {
    errors.servicio_interes = "Selecciona un servicio válido.";
  }

  const plans = planGroups.find((group) => group.id === payload.servicio_interes)?.plans ?? [];
  if (!payload.plan_interes || !plans.some((plan) => plan.id === payload.plan_interes)) {
    errors.plan_interes = "Selecciona un plan válido para el servicio.";
  }

  return errors;
}

export function leadPayloadFromUnknown(input: unknown): LeadPayload | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const record = input as Record<string, unknown>;
  const stringValue = (key: keyof LeadPayload) =>
    typeof record[key] === "string" ? record[key].trim() : "";
  const service = stringValue("servicio_interes");

  return {
    nombre: stringValue("nombre"),
    empresa: stringValue("empresa"),
    email: stringValue("email").toLowerCase(),
    telefono: stringValue("telefono"),
    servicio_interes: serviceCategories.includes(service as PlanCategory)
      ? (service as PlanCategory)
      : "",
    plan_interes: stringValue("plan_interes"),
    mensaje: stringValue("mensaje"),
  };
}

