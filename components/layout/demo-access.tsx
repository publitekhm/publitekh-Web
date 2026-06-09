"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export const DEMO_STORAGE_KEY = "publitek_demo_enabled";
export const DEMO_ENABLED_EVENT = "publitek-demo-enabled";

function subscribeDemoPreference(callback: () => void) {
  window.addEventListener(DEMO_ENABLED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(DEMO_ENABLED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getDemoPreference() {
  return window.localStorage.getItem(DEMO_STORAGE_KEY) === "true";
}

export function DemoAccess() {
  const enabled = useSyncExternalStore(subscribeDemoPreference, getDemoPreference, () => false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", closeOutside);

    return () => {
      document.removeEventListener("mousedown", closeOutside);
    };
  }, []);

  function hideDemo() {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    window.dispatchEvent(new Event(DEMO_ENABLED_EVENT));
    setOpen(false);
  }

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[80]" ref={menuRef}>
      {open && (
        <div className="mb-2 w-56 rounded-2xl border border-petroleum/30 bg-panel/95 p-2 shadow-panel backdrop-blur-xl">
          <p className="px-2 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-slate">Accesos demo</p>
          <Link className="block rounded-xl px-3 py-2.5 text-xs text-mist transition hover:bg-white/5 hover:text-fog" href="/onboarding?servicio=ventas&plan=growth&demo=true" onClick={() => setOpen(false)}>
            Onboarding demo Growth
          </Link>
          <Link className="block rounded-xl px-3 py-2.5 text-xs text-mist transition hover:bg-white/5 hover:text-fog" href="/dashboard-demo" onClick={() => setOpen(false)}>
            Dashboard demo
          </Link>
          <button className="mt-1 w-full rounded-xl border-t border-petroleum/20 px-3 py-2.5 text-left text-xs text-wine-light transition hover:bg-wine/10" onClick={hideDemo} type="button">
            Ocultar demo
          </button>
        </div>
      )}
      <button aria-expanded={open} className="rounded-full border border-green-accent/25 bg-panel/90 px-4 py-2 text-xs font-bold text-green-accent shadow-panel backdrop-blur-xl transition hover:border-green-accent/45 hover:bg-[#111d22]" onClick={() => setOpen((current) => !current)} type="button">
        Demo
      </button>
    </div>
  );
}
