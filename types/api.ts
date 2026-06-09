import type { LeadErrors } from "@/types/lead";
import type { OnboardingPayloadValidation } from "@/types/onboarding";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  fields?: LeadErrors;
}

export interface LeadCreated {
  lead_id: string;
}

export type LeadApiResponse = ApiSuccess<LeadCreated> | ApiError;

export interface OnboardingApiError {
  success: false;
  error: string;
  fields?: OnboardingPayloadValidation["fieldErrors"];
  selectionError?: string;
}

export type OnboardingApiResponse = ApiSuccess<Record<string, never>> | OnboardingApiError;
