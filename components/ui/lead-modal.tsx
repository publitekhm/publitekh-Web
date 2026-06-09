"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { LeadForm } from "@/components/ui/lead-form";
import type { LeadModalDefaults } from "@/types/lead";

interface LeadModalContextValue {
  openLeadModal: (defaults?: LeadModalDefaults) => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) throw new Error("useLeadModal debe usarse dentro de LeadModalProvider.");
  return context;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [defaults, setDefaults] = useState<LeadModalDefaults>({});
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => setIsOpen(false), []);
  const openLeadModal = useCallback((nextDefaults: LeadModalDefaults = {}) => {
    setDefaults(nextDefaults);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  return (
    <LeadModalContext.Provider value={{ openLeadModal }}>
      {children}
      {isOpen && (
        <div aria-label="Formulario de contacto" aria-modal="true" className="lead-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeModal()} role="dialog">
          <div className="lead-modal-panel">
            <button aria-label="Cerrar formulario" className="lead-modal-close" onClick={closeModal} type="button">×</button>
            <div className="mb-6">
              <p className="section-eyebrow">hablemos de tu negocio</p>
              <h2 className="font-display text-3xl font-bold tracking-tight">Activa tu crecimiento</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-mist">Cuéntanos qué necesitas y diseñaremos una ruta de automatización para tu empresa.</p>
            </div>
            <LeadForm defaults={defaults} key={`${defaults.servicio_interes}-${defaults.plan_interes}`} onClose={closeModal} />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

