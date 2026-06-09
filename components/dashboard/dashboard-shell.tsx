"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardSidebar, dashboardPages, type DashboardPage } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { FunnelCard } from "@/components/dashboard/funnel-card";
import { InsightsCard } from "@/components/dashboard/insights-card";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { UsageCard } from "@/components/dashboard/usage-card";

type Metric = readonly [string, string, string, string, "green" | "petroleum" | "wine"];

const overviewMetrics: readonly Metric[] = [
  ["Conversaciones", "384", "+18% vs mes anterior", "↗", "petroleum"],
  ["Leads nuevos", "96", "17 leads calientes", "✦", "wine"],
  ["Leads calientes", "17", "Interés alto detectado", "◎", "green"],
  ["Ventas cerradas", "12", "$8.4M confirmado", "✓", "green"],
];

const chart = [["Lun", 45], ["Mar", 58], ["Mié", 73], ["Jue", 50], ["Vie", 85], ["Sáb", 68], ["Dom", 40]] as const;

export function DashboardShell() {
  const [activePage, setActivePage] = useState<DashboardPage>("overview");

  return (
    <div className="dashboard-shell">
      <DashboardSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="dashboard-main">
        <div className="dashboard-mobile-nav">
          {dashboardPages.map((page) => (
            <button className={activePage === page.id ? "active" : ""} key={page.id} onClick={() => setActivePage(page.id)} type="button">
              {page.label}
            </button>
          ))}
        </div>
        <DashboardTopbar activePage={activePage} />
        {activePage === "overview" && <Overview />}
        {activePage === "analytics" && <Analytics />}
        {activePage === "leads" && <Leads />}
        {activePage === "handoff" && <Handoff />}
        {activePage === "payments" && <Payments />}
      </main>
    </div>
  );
}

function Metrics({ items }: { items: readonly Metric[] }) {
  return (
    <div className="dashboard-metrics">
      {items.map(([label, value, note, icon, accent]) => (
        <MetricCard accent={accent} icon={icon} key={label} label={label} note={note} value={value} />
      ))}
    </div>
  );
}

function MiniRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return <div className="dashboard-mini-rows">{rows.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>;
}

function Overview() {
  return (
    <>
      <Metrics items={overviewMetrics} />
      <div className="dashboard-layout"><FunnelCard /><UsageCard /></div>
      <div className="dashboard-three">
        <DashboardCard meta="En vivo" title="Actividad reciente"><MiniRows rows={[["Lead caliente detectado", "Hace 4 min"], ["IA pausada por humano", "Hace 19 min"], ["Pago aprobado", "Hace 1 h"]]} /></DashboardCard>
        <DashboardCard meta="IA / Humano" title="Modo atención"><div className="dashboard-big-value">82%</div><p className="dashboard-note">Conversaciones resueltas por IA</p><MiniRows rows={[["Humano activo", "7 leads"], ["Reactivados", "16 leads"]]} /></DashboardCard>
        <DashboardCard meta="Pipeline" title="Oportunidades"><div className="dashboard-big-value">$21.8M</div><p className="dashboard-note">Valor abierto estimado</p><MiniRows rows={[["Pago pendiente", "20"], ["Ventas cerradas", "12"]]} /></DashboardCard>
      </div>
    </>
  );
}

function Analytics() {
  const metrics: readonly Metric[] = [
    ["Lead → oportunidad", "38.5%", "Conversión comercial", "↗", "green"],
    ["Oportunidad → pago", "54%", "Cierre asistido", "↗", "petroleum"],
    ["Audios enviados", "71", "Conversaciones humanizadas", "♪", "wine"],
    ["Tiempo a interés alto", "7m", "Respuesta promedio", "⌁", "green"],
  ];

  return (
    <>
      <div className="dashboard-layout">
        <DashboardCard meta="Últimos 7 días" title="Conversaciones por día">
          <div className="dashboard-chart">{chart.map(([day, value]) => <div key={day}><i style={{ height: `${value}%` }} /><span>{day}</span></div>)}</div>
        </DashboardCard>
        <InsightsCard />
      </div>
      <Metrics items={metrics} />
    </>
  );
}

function Leads() {
  return (
    <>
      <Metrics items={[
        ["Leads totales", "96", "Mes actual", "◎", "petroleum"],
        ["Interés alto", "17", "Listos para cierre", "✦", "wine"],
        ["En oportunidad", "37", "Pipeline activo", "↗", "green"],
        ["Nuevos hoy", "8", "Últimas 24 horas", "+", "petroleum"],
      ]} />
      <LeadsTable />
    </>
  );
}

function Handoff() {
  const metrics: readonly Metric[] = [
    ["Conversaciones IA", "315", "82% del total", "AI", "green"],
    ["Conversaciones humano", "69", "18% del total", "H", "wine"],
    ["Handoffs activos", "7", "Control humano actual", "↔", "petroleum"],
    ["Reactivaciones", "16", "Retorno automático", "↻", "green"],
  ];

  return (
    <>
      <Metrics items={metrics} />
      <div className="dashboard-layout">
        <DashboardCard meta="IA no pisa al humano" title="Registro de handoff"><MiniRows rows={[["Lead solicitó asesor", "Humano activo"], ["Queja detectada", "Humano activo"], ["Seguimiento completado", "IA reactivada"], ["Pausa vencida", "IA reactivada"]]} /></DashboardCard>
        <DashboardCard meta="Tiempo promedio" title="Operación asistida"><div className="dashboard-big-value">4m 32s</div><p className="dashboard-note">Hasta que un humano toma control</p><MiniRows rows={[["Resolución humana", "12m"], ["Satisfacción mock", "94%"]]} /></DashboardCard>
      </div>
    </>
  );
}

function Payments() {
  const metrics: readonly Metric[] = [
    ["Pagos confirmados", "$8.4M", "Recaudo simulado", "$", "green"],
    ["Pago pendiente", "$4.1M", "Pipeline simulado", "…", "wine"],
    ["Órdenes", "32", "Mes actual", "#", "petroleum"],
    ["Aprobación", "60%", "Tasa simulada", "✓", "green"],
  ];

  return (
    <>
      <Metrics items={metrics} />
      <DashboardCard className="dashboard-table-card" meta="Datos mock" title="Pagos recientes">
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead><tr><th>Orden</th><th>Lead</th><th>Estado</th><th>Valor</th><th>Método</th></tr></thead>
            <tbody>
              <tr><td>ORD-1024</td><td>Heyder Mejía</td><td><span className="dashboard-badge badge-ia">Aprobado</span></td><td className="dashboard-money">$1.200.000</td><td>Nequi</td></tr>
              <tr><td>ORD-1021</td><td>Mary Peña</td><td><span className="dashboard-badge badge-medio">Pendiente</span></td><td className="dashboard-money">$600.000</td><td>PSE</td></tr>
              <tr><td>ORD-1019</td><td>Laura Gómez</td><td><span className="dashboard-badge badge-ia">Aprobado</span></td><td className="dashboard-money">$2.500.000</td><td>Tarjeta</td></tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}
