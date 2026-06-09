"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingSection } from "@/components/onboarding/onboarding-section";
import { onboardingSections, requiredOnboardingIds } from "@/lib/onboarding-data";
import type { OnboardingAnswers, OnboardingPlanSelection } from "@/types/onboarding";

export function OnboardingForm({ selection }: { selection: OnboardingPlanSelection | null }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<number[]>([1]);
  const [success, setSuccess] = useState(false);

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
  }

  function toggleSection(id: number) {
    setOpenSections((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      requiredOnboardingIds.filter((id) => !answers[id]?.trim()).map((id) => [id, "Este campo es obligatorio."]),
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      const section = onboardingSections.find((item) => item.questions.some((question) => question.id === firstId));
      if (section) setOpenSections((current) => [...new Set([...current, section.id])]);
      window.setTimeout(() => document.getElementById(`question-${firstId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }

    const payload = {
      ...answers,
      servicio_interes: selection?.servicio_interes ?? null,
      plan_interes: selection?.plan_interes ?? null,
      documentos_archivos: [],
      audios_clonacion_archivos: [],
      origen: "formulario_onboarding_publitek",
      fecha_envio: new Date().toISOString(),
    };
    console.log("[Publitek onboarding]", payload);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (success) {
    return (
      <div className="onboarding-success">
        <span>✓</span>
        <p className="section-eyebrow justify-center">onboarding recibido</p>
        <h2>Ya tenemos todo para empezar</h2>
        <p>Tu información quedó preparada localmente. El equipo de Publitek podrá convertirla en la configuración inicial de tu agente.</p>
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
        <button className="button-primary px-8 py-4" type="submit">Enviar formulario →</button>
        <span>Por ahora se guardará únicamente en la consola del navegador.</span>
      </div>
    </form>
  );
}
