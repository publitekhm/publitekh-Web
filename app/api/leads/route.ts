import { NextResponse } from "next/server";
import { leadPayloadFromUnknown, validateLead } from "@/lib/lead-validation";
import { createOrUpdateLandingLead } from "@/lib/supabase-server";
import type { LeadApiResponse } from "@/types/api";
import type { NormalizedLead } from "@/types/lead";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<LeadApiResponse>(
      { success: false, error: "El cuerpo de la solicitud debe ser JSON válido." },
      { status: 400 },
    );
  }

  const payload = leadPayloadFromUnknown(body);

  if (!payload) {
    return NextResponse.json<LeadApiResponse>(
      { success: false, error: "El payload del lead no tiene un formato válido." },
      { status: 400 },
    );
  }

  const fields = validateLead(payload);

  if (Object.keys(fields).length > 0) {
    return NextResponse.json<LeadApiResponse>(
      { success: false, error: "Revisa los datos enviados.", fields },
      { status: 400 },
    );
  }

  const lead: NormalizedLead = {
    ...payload,
    servicio_interes: payload.servicio_interes as NormalizedLead["servicio_interes"],
    origen: "landing_publitek",
    estado: "nuevo",
    created_at: new Date().toISOString(),
  };

  try {
    const result = await createOrUpdateLandingLead(lead);
    console.log("[Publitek API lead persistido]", { lead_id: result.leadId, created: result.created });

    // TODO: Registrar public.eventos_sistema cuando su DDL esté confirmado.
    // TODO: Enviar webhook a n8n en una fase posterior.

    return NextResponse.json<LeadApiResponse>(
      { success: true, data: { lead_id: result.leadId } },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Publitek API leads]", error);
    return NextResponse.json<LeadApiResponse>(
      { success: false, error: "No pudimos guardar tu solicitud. Intenta nuevamente." },
      { status: 500 },
    );
  }
}
