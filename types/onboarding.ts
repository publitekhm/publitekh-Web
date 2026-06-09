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

export interface OnboardingPlanSelection {
  servicio_interes: PlanCategory;
  plan_interes: string;
  servicio_label: string;
  plan_label: string;
}
