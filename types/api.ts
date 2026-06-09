import type { LeadErrors } from "@/types/lead";

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
