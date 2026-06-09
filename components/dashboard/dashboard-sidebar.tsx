"use client";

import Link from "next/link";

export const dashboardPages = [
  { id: "overview", label: "Resumen", icon: "⌂" },
  { id: "analytics", label: "Analíticas", icon: "↗" },
  { id: "leads", label: "Leads", icon: "◎" },
  { id: "handoff", label: "IA / Humano", icon: "↔" },
  { id: "payments", label: "Pagos", icon: "$" },
] as const;

export type DashboardPage = (typeof dashboardPages)[number]["id"];

interface Props {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
}

export function DashboardSidebar({ activePage, onNavigate }: Props) {
  return (
    <aside className="dashboard-sidebar">
      <Link className="dashboard-brand" href="/">
        <span /><div><strong>Publitek</strong><small>Dashboard demo</small></div>
      </Link>
      <nav>
        {dashboardPages.map((page) => (
          <button className={activePage === page.id ? "active" : ""} key={page.id} onClick={() => onNavigate(page.id)} type="button">
            <i>{page.icon}</i>{page.label}
          </button>
        ))}
      </nav>
      <div className="dashboard-side-card">
        <span>Insight IA</span>
        <p>Detecta oportunidades perdidas y recomendaciones para vender más.</p>
        <button onClick={() => onNavigate("analytics")} type="button">Ver análisis →</button>
      </div>
    </aside>
  );
}

