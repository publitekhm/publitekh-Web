"use client";

export const dashboardPages = [
  { id: "overview", label: "Resumen", icon: "⌂" },
  { id: "leads", label: "Leads", icon: "◎" },
  { id: "analytics", label: "Analytics", icon: "↗" },
  { id: "payments", label: "Pagos", icon: "$" },
  { id: "handoff", label: "IA / Humano", icon: "↔" },
] as const;

export type DashboardPage = (typeof dashboardPages)[number]["id"];

interface Props {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
}

export function DashboardSidebar({ activePage, onNavigate }: Props) {
  return (
    <aside className="dashboard-sidebar">
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
