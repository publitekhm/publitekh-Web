"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingSection } from "@/components/onboarding/onboarding-section";
import { onboardingSections, requiredOnboardingIds } from "@/lib/onboarding-data";
import { buildOnboardingPayload, validateOnboardingPayload } from "@/lib/onboarding-payload";
import type { OnboardingApiResponse } from "@/types/api";
import type { OnboardingAnswers, OnboardingFormStatus, OnboardingPlanSelection } from "@/types/onboarding";

export function OnboardingForm({ selection }: { selection: OnboardingPlanSelection | null }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectionError, setSelectionError] = useState("");
  const [openSections, setOpenSections] = useState<number[]>([1]);
  const [status, setStatus] = useState<OnboardingFormStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const completed = useMemo(
    () => requiredOnboardingIds.filter((id) => answers[id]?.trim()).length,
    [answers],
  );

  function updateAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setSubmitError("");
    }
  }

  function toggleSection(id: number) {
    setOpenSections((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = buildOnboardingPayload(answers, selection);
    const minimumValidation = validateOnboardingPayload(payload);
    const requiredErrors = Object.fromEntries(
      requiredOnboardingIds.filter((id) => !answers[id]?.trim()).map((id) => [id, "Este campo es obligatorio."]),
    );
    const nextErrors = { ...requiredErrors, ...minimumValidation.fieldErrors };
    setErrors(nextErrors);
    setSelectionError(minimumValidation.selectionError ?? "");
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0 || minimumValidation.selectionError) {
      setStatus("error");
      const firstId = Object.keys(nextErrors)[0];
      if (firstId) {
        const section = onboardingSections.find((item) => item.questions.some((question) => question.id === firstId));
        if (section) setOpenSections((current) => [...new Set([...current, section.id])]);
        window.setTimeout(() => document.getElementById(`question-${firstId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      }
      return;
    }

    setStatus("loading");

    if (process.env.NODE_ENV === "development") {
      console.log("[Publitek onboarding]", payload);
    }

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as OnboardingApiResponse;

      if (!response.ok || !result.success) {
        if (!result.success) {
          setErrors((current) => ({ ...current, ...(result.fields ?? {}) }));
          setSelectionError(result.selectionError ?? "");
          setSubmitError(result.error);
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("No pudimos enviar el onboarding. Intenta nuevamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="onboarding-success">
        <span>✓</span>
        <p className="section-eyebrow justify-center">onboarding recibido</p>
        <h2>Ya tenemos todo para empezar</h2>
        <p>Recibimos tu información. El equipo de Publitek comenzará la configuración inicial de tu agente.</p>
        <Link className="button-primary mt-7 px-7 py-3.5" href="/">Volver a Publitek →</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <OnboardingProgress completed={completed} total={requiredOnboardingIds.length} />
      <div className="mt-6 flex flex-col gap-3">
        {onboardingSections.map((section) => (
          <OnboardingSection answers={answers} errors={errors} isOpen={openSections.includes(section.id)} key={section.id} onChange={updateAnswer} onToggle={() => toggleSection(section.id)} section={section} />
        ))}
      </div>
      <div className="onboarding-submit">
        {Object.keys(errors).length > 0 && <p>Completa los campos obligatorios marcados antes de enviar.</p>}
        {selectionError && <p>{selectionError}</p>}
        {submitError && <p role="alert">{submitError}</p>}
        <button className="button-primary px-8 py-4 disabled:cursor-wait disabled:opacity-70" disabled={status === "loading"} type="submit">
          {status === "loading" ? "Enviando..." : "Enviar formulario →"}
        </button>
        <span>Enviaremos tus respuestas de forma segura al equipo de Publitek.</span>
      </div>
    </form>
  );
}
