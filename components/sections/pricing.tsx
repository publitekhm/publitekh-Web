import { ComboBanner } from "@/components/ui/combo-banner";
import { PricingTabs } from "@/components/ui/pricing-tabs";

export function Pricing() {
  return (
    <section className="section-shell border-t border-petroleum/25" id="planes">
      <p className="section-eyebrow">precios</p>
      <h2 className="section-title">Sin sorpresas.<br />Sin letra pequeña.</h2>
      <p className="section-description">Elige tu plan → completa onboarding → configuramos tu agente. Escala cuando tu negocio crezca.</p>
      <PricingTabs />
      <ComboBanner />
    </section>
  );
}
