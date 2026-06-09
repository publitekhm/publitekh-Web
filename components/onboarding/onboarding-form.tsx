"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingSection } from "@/components/onboarding/onboarding-section";
import { onboardingSections, requiredOnboardingIds } from "@/lib/onboarding-data";
import { generateOnboardingDemoData, onboardingDemoNiches, type OnboardingDemoNiche } from "@/lib/onboarding-demo-data";
import { buildOnboardingPayload, validateOnboardingPayload } from "@/lib/onboarding-payload";
import type { OnboardingApiResponse } from "@/types/api";
import type { OnboardingAnswers, OnboardingFormStatus, OnboardingPlanSelection } from "@/types/onboarding";

interface OnboardingFormProps {
  allowDemo: boolean;
  selection: OnboardingPlanSelection | null;
}

export function OnboardingForm({ allowDemo, selection }: OnboardingFormProps) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectionError, setSelectionError] = useState("");
  const [openSections, setOpenSections] = useState<number[]>([1]);
  const [status, setStatus] = useState<OnboardingFormStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [demoNiche, setDemoNiche] = useState<OnboardingDemoNiche>("clinica-dental");
  const [demoMessage, setDemoMessage] = useState("");

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

  function loadDemoData() {
    const niche = onboardingDemoNiches.find((item) => item.id === demoNiche);
    setAnswers(generateOnboardingDemoData(demoNiche));
    setErrors({});
    setSelectionError("");
    setSubmitError("");
    setStatus("idle");
    setDemoMessage(`Demo de ${niche?.label ?? "nicho"} cargada. Puedes revisarla antes de enviar.`);
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
      {allowDemo && (
        <aside className="mb-4 rounded-2xl border border-petroleum/30 bg-panel/90 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-accent">Modo demo comercial</p>
              <p className="mt-1 text-xs text-mist">Elige un nicho y carga datos de prueba para una demostración.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="demo-niche">Nicho de demostración</label>
              <select className="rounded-lg border border-petroleum/30 bg-[#111d22] px-3 py-2 text-xs text-fog outline-none" id="demo-niche" onChange={(event) => setDemoNiche(event.target.value as OnboardingDemoNiche)} value={demoNiche}>
                {onboardingDemoNiches.map((niche) => <option key={niche.id} value={niche.id}>{niche.label}</option>)}
              </select>
              <button className="button-secondary whitespace-nowrap px-3 py-2 text-xs" onClick={loadDemoData} type="button">
                Cargar demo del nicho
              </button>
            </div>
          </div>
          {demoMessage && <p className="mt-3 text-xs text-green-accent" role="status">{demoMessage}</p>}
        </aside>
      )}
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
