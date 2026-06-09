"use client";

import { useState } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { planGroups } from "@/lib/plans";
import type { PlanCategory } from "@/types/plan";

export function PricingTabs() {
  const [activeId, setActiveId] = useState<PlanCategory>("ventas");
  const group = planGroups.find((item) => item.id === activeId) ?? planGroups[0];

  return (
    <>
      <div className="pricing-tabs" role="tablist" aria-label="Tipos de planes">
        {planGroups.map((item) => (
          <button className={item.id === activeId ? "active" : ""} key={item.id} onClick={() => setActiveId(item.id)} role="tab" aria-selected={item.id === activeId} type="button">
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>
      <div className="mb-5 flex w-fit flex-wrap items-center gap-2 rounded-lg border border-petroleum/25 bg-petroleum/10 px-3.5 py-2.5">
        <strong className="text-xs text-petroleum-light">{group.title}</strong>
        <span className="text-[0.68rem] text-slate">— {group.description}</span>
      </div>
      <div className="grid gap-3.5 lg:grid-cols-3">
        {group.plans.map((plan) => <PricingCard key={plan.id} plan={plan} />)}
      </div>
    </>
  );
}

