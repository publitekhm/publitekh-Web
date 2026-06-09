import { dashboardPages, type DashboardPage } from "@/components/dashboard/dashboard-sidebar";

export function DashboardTopbar({ activePage }: { activePage: DashboardPage }) {
  const activeLabel = dashboardPages.find((page) => page.id === activePage)?.label;

  return (
    <header className="dashboard-topbar">
      <div>
        <p>Dashboard comercial · Datos mock</p>
        <h1>{activeLabel}</h1>
        <span>Lead → conversación → oportunidad → decisión.</span>
      </div>
      <div>
        <span className="dashboard-pill active">Agente activo</span>
        <span className="dashboard-pill">Plan Growth</span>
      </div>
    </header>
  );
}
