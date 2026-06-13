"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { DEMO_ENABLED_EVENT, DEMO_STORAGE_KEY } from "@/components/layout/demo-access";
import { useLeadModal } from "@/components/ui/lead-modal";
import { getOnboardingHref } from "@/lib/plans";

const links = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Planes", href: "#planes" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const { openLeadModal } = useLeadModal();
  const logoClicks = useRef<number[]>([]);

  function handleLogoClick() {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((timestamp) => now - timestamp < 1800), now];

    if (logoClicks.current.length >= 5) {
      window.localStorage.setItem(DEMO_STORAGE_KEY, "true");
      window.dispatchEvent(new Event(DEMO_ENABLED_EVENT));
      logoClicks.current = [];
    }
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-14 max-w-[73.75rem] items-center justify-between rounded-2xl border border-petroleum/30 bg-ink/80 px-4 shadow-nav backdrop-blur-xl sm:px-5"
      >
        <a className="brand-logo group flex items-center gap-2 text-xl font-bold" href="#inicio" onClick={handleLogoClick}>
          <span className="brand-logo-emblem">
            <Image alt="" height={34} priority src="/publitek-seed.svg" width={34} />
          </span>
          <span>Publi<span className="brand-logo-tek">tek</span></span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="rounded-lg px-3 py-2 text-sm font-medium text-mist transition hover:bg-white/5 hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="hidden px-2 py-2 text-xs font-medium text-mist transition hover:text-fog sm:block" onClick={() => openLeadModal()} type="button">Hablemos</button>
          <Link className="button-primary px-4 py-2 text-xs sm:text-sm" href={getOnboardingHref("ventas", "growth")}>
            Empezar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
