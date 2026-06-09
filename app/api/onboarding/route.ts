import { NextResponse } from "next/server";
import { validateOnboardingPayload } from "@/lib/onboarding-payload";
import type { OnboardingApiResponse } from "@/types/api";
import type { OnboardingPayload } from "@/types/onboarding";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<OnboardingApiResponse>(
      { success: false, error: "El cuerpo de la solicitud debe ser JSON válido." },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json<OnboardingApiResponse>(
      { success: false, error: "El payload del onboarding no tiene un formato válido." },
      { status: 400 },
    );
  }

  if (
    !isNonEmptyString(body.empresa_nombre) ||
    !isNonEmptyString(body.descripcion_empresa) ||
    !isNonEmptyString(body.whatsapp) ||
    !isNonEmptyString(body.servicio_interes) ||
    !isNonEmptyString(body.plan_interes)
  ) {
    return NextResponse.json<OnboardingApiResponse>(
      { success: false, error: "Revisa los datos enviados." },
      { status: 400 },
    );
  }

  const payload = body as unknown as OnboardingPayload;
  const validation = validateOnboardingPayload(payload);

  if (Object.keys(validation.fieldErrors).length > 0 || validation.selectionError) {
    return NextResponse.json<OnboardingApiResponse>(
      {
        success: false,
        error: "Revisa los datos enviados.",
        fields: validation.fieldErrors,
        selectionError: validation.selectionError,
      },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_ONBOARDING_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("[Publitek API onboarding] Falta configurar N8N_ONBOARDING_WEBHOOK_URL.");
    return NextResponse.json<OnboardingApiResponse>(
      { success: false, error: "No pudimos procesar el onboarding. Intenta nuevamente." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[Publitek API onboarding] n8n respondió con error.", { status: response.status });
      return NextResponse.json<OnboardingApiResponse>(
        { success: false, error: "No pudimos procesar el onboarding. Intenta nuevamente." },
        { status: 502 },
      );
    }

    return NextResponse.json<OnboardingApiResponse>({ success: true, data: {} });
  } catch (error) {
    console.error("[Publitek API onboarding]", error);
    return NextResponse.json<OnboardingApiResponse>(
      { success: false, error: "No pudimos procesar el onboarding. Intenta nuevamente." },
      { status: 502 },
    );
  }
}
