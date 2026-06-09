import { DashboardCard } from "@/components/dashboard/dashboard-card";

const funnel = [
  ["Nuevo", 96, 100],
  ["Calificado", 65, 68],
  ["Oportunidad", 37, 39],
  ["Pago pendiente", 20, 21],
  ["Cliente", 12, 13],
] as const;

export function FunnelCard() {
  return (
    <DashboardCard meta="Mes actual" title="Embudo de leads">
      <div className="dashboard-funnel">
        {funnel.map(([label, value, percentage]) => (
          <div key={label}>
            <b>{label}</b>
            <span><i style={{ width: `${percentage}%` }} /></span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

