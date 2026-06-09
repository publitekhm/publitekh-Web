import Link from "next/link";
import { getOnboardingHref } from "@/lib/plans";

export function ComboBanner() {
  return (
    <aside className="combo-banner">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg">Ventas + Contenido — Todo junto</h3>
          <span className="plan-badge static">15% DESCUENTO</span>
        </div>
        <p className="mt-1 text-xs text-mist">La solución completa para escalar tu negocio con IA · Agente de ventas + contenido automatizado</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem]">
          <span className="combo-chip text-petroleum-light">AI Agente WhatsApp</span>
          <span className="combo-chip text-green-accent">✦ Contenido IA</span>
          <span className="combo-chip text-wine-light">◎ Métricas unificadas</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[0.68rem] text-slate line-through">desde $950/mes</p>
          <p className="font-display text-3xl">$850 <span className="font-sans text-xs text-mist">/ mes</span></p>
          <p className="text-[0.62rem] text-green-accent">ahorras ~$100/mes</p>
        </div>
        <Link className="button-primary whitespace-nowrap px-5 py-3 text-xs" href={getOnboardingHref("combo", "combo-growth")}>Quiero el combo →</Link>
      </div>
    </aside>
  );
}
