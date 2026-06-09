"use client";

import { useState } from "react";
import { services } from "@/lib/site-data";

export function ServiceSelector() {
  const [activeService, setActiveService] = useState<(typeof services)[number]["id"]>(
    services[0].id,
  );

  const active = services.find((service) => service.id === activeService) ?? services[0];

  return (
    <div className="mt-16 w-full max-w-3xl" id="servicios">
      <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate">
        Elige cómo quieres crecer
      </p>
      <div
        aria-label="Selector de servicios"
        className="grid gap-1.5 rounded-3xl border border-petroleum/30 bg-panel/75 p-1.5 shadow-panel backdrop-blur-lg sm:grid-cols-2"
        role="tablist"
      >
        {services.map((service) => {
          const isActive = service.id === activeService;

          return (
            <button
              aria-controls="service-detail"
              aria-selected={isActive}
              className={`service-option ${isActive ? "service-option-active" : ""}`}
              key={service.id}
              onClick={() => setActiveService(service.id)}
              role="tab"
              type="button"
            >
              <span
                aria-hidden="true"
                className={`service-icon service-icon-${service.accent}`}
              >
                {service.icon}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold text-fog">{service.name}</span>
                <span className="text-xs text-slate">{service.description}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p
        aria-live="polite"
        className="mx-auto mt-4 max-w-xl text-sm leading-6 text-mist"
        id="service-detail"
        role="tabpanel"
      >
        {active.detail}
      </p>
    </div>
  );
}

