import Link from "next/link";
import { getOnboardingHref } from "@/lib/plans";

export function Cta() {
  return (
    <section className="cta-section border-t border-petroleum/25" id="cta">
      <h2 className="relative font-display text-[clamp(2.7rem,6vw,4.3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
        Listo en menos<br />de <span className="text-green-accent">7 días</span>
      </h2>
      <p className="relative mt-4 text-base text-mist">Elige tu plan → completa onboarding → configuramos tu agente.</p>
      <div className="relative mt-9 flex flex-wrap justify-center gap-3">
        <Link className="button-primary px-7 py-3.5" href={getOnboardingHref("ventas", "growth")}>Quiero mi agente de ventas →</Link>
        <Link className="button-secondary px-7 py-3.5" href={getOnboardingHref("contenido", "professional")}>Quiero mi contenido →</Link>
      </div>
    </section>
  );
}
