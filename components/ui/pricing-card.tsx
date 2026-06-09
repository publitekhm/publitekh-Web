import Link from "next/link";
import { getOnboardingHref } from "@/lib/plans";
import type { Plan, PlanFeature } from "@/types/plan";

function FeatureList({ features }: { features: PlanFeature[] }) {
  return (
    <ul className="my-4">
      {features.map((feature) => (
        <li className={`plan-feature ${feature.included === false ? "plan-feature-muted" : ""}`} key={feature.label}>
          <span>{feature.included === false ? "×" : "✓"}</span>{feature.label}
        </li>
      ))}
    </ul>
  );
}

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article className={`pricing-card pricing-${plan.accent} ${plan.featured ? "pricing-featured" : ""}`}>
      {plan.featured && <span className="plan-badge">MÁS POPULAR</span>}
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate">{plan.name}</p>
      <p className="mt-1.5 text-xs italic text-mist">{plan.target}</p>
      <p className="mt-5 text-[0.68rem] text-slate">{plan.setup}</p>
      <p className="mt-1 font-display text-5xl font-bold tracking-[-0.06em]">
        <sup className="mr-1 align-top font-sans text-base font-normal text-mist">$</sup>{plan.price}
        <sub className="ml-1 font-sans text-sm font-normal tracking-normal text-mist">/mes</sub>
      </p>
      <p className={`mt-1 text-[0.68rem] text-slate ${plan.category === "combo" ? "line-through" : ""}`}>{plan.period}</p>
      <div className="my-5 h-px bg-petroleum/30" />
      {plan.extraLabel && <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-petroleum-light">{plan.extraLabel}</p>}
      <FeatureList features={plan.features} />
      {plan.extraFeatures && <FeatureList features={plan.extraFeatures} />}
      <p className="mb-5 rounded-lg bg-white/[0.025] px-3 py-2 text-[0.68rem] text-slate">LTV año 1: <strong className="text-green-accent">{plan.ltv}</strong></p>
      <Link className={`plan-button ${plan.featured ? "plan-button-primary" : ""}`} href={getOnboardingHref(plan.category, plan.id)}>Empezar →</Link>
    </article>
  );
}
