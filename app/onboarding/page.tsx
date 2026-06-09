import type { Metadata } from "next";
import Link from "next/link";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { getOnboardingPlanSelection } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Onboarding | Publitek",
  description: "Configura la personalidad, conocimiento y operación de tu agente Publitek.",
};

interface OnboardingPageProps {
  searchParams: Promise<{ servicio?: string | string[]; plan?: string | string[] }>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const servicio = typeof params.servicio === "string" ? params.servicio : undefined;
  const plan = typeof params.plan === "string" ? params.plan : undefined;
  const selection = getOnboardingPlanSelection(servicio, plan);

  return (
    <main className="onboarding-page">
      <div aria-hidden="true" className="hero-grid fixed inset-0" />
      <header className="onboarding-header">
        <Link className="flex items-center gap-2 font-display text-xl font-bold" href="/">
          <span className="h-5 w-1 rounded-full bg-gradient-to-b from-green-accent to-petroleum-light" />Publitek
        </Link>
        <span>Configuración del agente</span>
      </header>
      <div className="onboarding-intro">
        <p className="section-eyebrow justify-center">onboarding estratégico</p>
        {selection && (
          <div className="onboarding-plan-chip">
            <span>Plan seleccionado</span>
            <strong>{selection.servicio_label} · {selection.plan_label}</strong>
          </div>
        )}
        <h1>Construyamos un agente<br /><em>que suene a tu negocio</em></h1>
        <p>Estas 32 respuestas serán la base para configurar su personalidad, conocimiento y reglas de operación.</p>
      </div>
      <div className="onboarding-container"><OnboardingForm selection={selection} /></div>
    </main>
  );
}
