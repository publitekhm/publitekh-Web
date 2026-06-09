"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardSidebar, dashboardPages, type DashboardPage } from "@/components/dashboard/dashboard-sidebar";
import { FunnelCard } from "@/components/dashboard/funnel-card";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { MetricCard } from "@/components/dashboard/metric-card";

const overviewMetrics = [
  ["Conversaciones", "384", "+18% vs mes anterior", "↗", "petroleum"],
  ["Leads nuevos", "96", "17 leads calientes", "✦", "wine"],
  ["Ventas cerradas", "12", "$8.4M confirmado", "✓", "green"],
  ["Audios enviados", "71", "Respuesta humanizada", "♪", "petroleum"],
] as const;

const chart = [["Lun", 45], ["Mar", 58], ["Mié", 73], ["Jue", 50], ["Vie", 85], ["Sáb", 68], ["Dom", 40]] as const;

export function AppShell() {
  const [activePage, setActivePage] = useState<DashboardPage>("overview");
  const activeLabel = dashboardPages.find((page) => page.id === activePage)?.label;

  return (
    <div className="dashboard-shell">
      <DashboardSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="dashboard-main">
        <div className="dashboard-mobile-nav">
          {dashboardPages.map((page) => <button className={activePage === page.id ? "active" : ""} key={page.id} onClick={() => setActivePage(page.id)} type="button">{page.label}</button>)}
        </div>
        <header className="dashboard-topbar">
          <div><p>Dashboard comercial · Demo</p><h1>{activeLabel}</h1><span>Lead → conversación → oportunidad → decisión.</span></div>
          <div><span className="dashboard-pill active">Agente activo</span><span className="dashboard-pill">Plan Growth</span></div>
        </header>
        {activePage === "overview" && <Overview />}
        {activePage === "analytics" && <Analytics />}
        {activePage === "leads" && <LeadsTable />}
        {activePage === "handoff" && <Handoff />}
        {activePage === "payments" && <Payments />}
      </main>
    </div>
  );
}

function Metrics({ items = overviewMetrics }: { items?: readonly (readonly [string, string, string, string, "green" | "petroleum" | "wine"])[] }) {
  return <div className="dashboard-metrics">{items.map(([label, value, note, icon, accent]) => <MetricCard accent={accent} icon={icon} key={label} label={label} note={note} value={value} />)}</div>;
}

function MiniRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return <div className="dashboard-mini-rows">{rows.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>;
}

function Overview() {
  return <>
    <Metrics />
    <div className="dashboard-layout"><FunnelCard /><DashboardCard meta="Growth" title="Plan y uso"><div className="dashboard-big-value">64%</div><div className="dashboard-usage"><span style={{ width: "64%" }} /></div><MiniRows rows={[["384 usados", "216 restantes"], ["Audios", "71"], ["Imágenes recibidas", "24"], ["Llamadas agendadas", "14"]]} /></DashboardCard></div>
    <div className="dashboard-three"><DashboardCard meta="En vivo" title="Actividad reciente"><MiniRows rows={[["Lead caliente detectado", "Hace 4 min"], ["IA pausada por humano", "Hace 19 min"], ["Pago aprobado", "Hace 1 h"]]} /></DashboardCard><DashboardCard meta="IA/Humano" title="Modo atención"><div className="dashboard-big-value">82%</div><p className="dashboard-note">Leads atendidos por IA</p><MiniRows rows={[["Humano activo", "7 leads"]]} /></DashboardCard><DashboardCard meta="Pipeline" title="Oportunidades"><div className="dashboard-big-value">$21.8M</div><p className="dashboard-note">Valor abierto estimado</p><MiniRows rows={[["Pago pendiente", "20"]]} /></DashboardCard></div>
  </>;
}

function Analytics() {
  const items = [["Lead → oportunidad", "38.5%", "Conversión comercial", "↗", "green"], ["Oportunidad → pago", "54%", "Cierre asistido", "↗", "petroleum"], ["Pago → aprobado", "60%", "Órdenes aprobadas", "✓", "green"], ["Tiempo a interés alto", "7m", "Respuesta promedio", "⌁", "wine"]] as const;
  return <><div className="dashboard-layout"><DashboardCard meta="Últimos 7 días" title="Conversaciones por día"><div className="dashboard-chart">{chart.map(([day, value]) => <div key={day}><i style={{ height: `${value}%` }} /><span>{day}</span></div>)}</div></DashboardCard><DashboardCard meta="Recomendación" title="Análisis con IA"><div className="dashboard-insight"><b>Problema detectado</b><p>Hay muchos leads calificados, pero el paso a pago pendiente está bajo.</p></div><div className="dashboard-insight wine"><b>Acción recomendada</b><p>Empujar antes a una llamada o cierre directo cuando el lead repita preguntas de precio.</p></div></DashboardCard></div><Metrics items={items} /></>;
}

function Handoff() {
  const items = [["Leads en IA", "89", "Atención automatizada", "AI", "green"], ["Leads en humano", "7", "Control activo", "H", "wine"], ["Bloqueos IA", "21", "Intervenciones seguras", "×", "petroleum"], ["Reactivaciones", "16", "Retorno automático", "↻", "green"]] as const;
  return <><Metrics items={items} /><DashboardCard meta="IA no pisa al humano" title="Registro de handoff"><MiniRows rows={[["modo_atencion = humano → IA bloqueada", "Correcto"], ["#ia recibido → IA reactivada", "Correcto"], ["pausado_hasta vencido → auto reactivación", "Pendiente"]]} /></DashboardCard></>;
}

function Payments() {
  const items = [["Pagos confirmados", "$8.4M", "Mock de recaudo", "$", "green"], ["Pendiente proveedor", "$4.1M", "Mock pendiente", "…", "wine"], ["Órdenes", "32", "Mes actual", "#", "petroleum"], ["Aprobación", "60%", "Tasa mock", "✓", "green"]] as const;
  return <><Metrics items={items} /><DashboardCard className="dashboard-table-card" meta="Datos mock" title="Pagos recientes"><div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr><th>Orden</th><th>Lead</th><th>Estado</th><th>Valor</th><th>Método</th></tr></thead><tbody><tr><td>ORD-1024</td><td>Heyder Mejía</td><td><span className="dashboard-badge badge-ia">Aprobado</span></td><td className="dashboard-money">$1.200.000</td><td>Nequi</td></tr><tr><td>ORD-1021</td><td>Mary Peña</td><td><span className="dashboard-badge badge-medio">Pendiente</span></td><td className="dashboard-money">$600.000</td><td>PSE</td></tr></tbody></table></div></DashboardCard></>;
}

