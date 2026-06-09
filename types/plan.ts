export type PlanCategory = "ventas" | "contenido" | "combo";
export type PlanAccent = "petroleum" | "green" | "wine";

export interface PlanFeature {
  label: string;
  included?: boolean;
}

export interface Plan {
  id: string;
  category: PlanCategory;
  name: string;
  target: string;
  setup: string;
  price: string;
  period: string;
  features: PlanFeature[];
  extraLabel?: string;
  extraFeatures?: PlanFeature[];
  ltv: string;
  accent: PlanAccent;
  featured?: boolean;
}

export interface PlanGroup {
  id: PlanCategory;
  label: string;
  icon: string;
  title: string;
  description: string;
  plans: Plan[];
}

