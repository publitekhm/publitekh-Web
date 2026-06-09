import type { PlanCategory } from "@/types/plan";

export interface LeadPayload {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio_interes: PlanCategory | "";
  plan_interes: string;
  mensaje: string;
}

export interface NormalizedLead extends Omit<LeadPayload, "servicio_interes"> {
  servicio_interes: PlanCategory;
  origen: "landing_publitek";
  estado: "nuevo";
  created_at: string;
}

export type LeadErrors = Partial<Record<keyof LeadPayload, string>>;
export type LeadFormStatus = "idle" | "loading" | "error" | "success";

export interface LeadModalDefaults {
  servicio_interes?: PlanCategory;
  plan_interes?: string;
}
