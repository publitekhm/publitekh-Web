import { DashboardCard } from "@/components/dashboard/dashboard-card";

const funnel = [
  ["Nuevo", 96, 100],
  ["Calificado", 65, 72],
  ["Oportunidad", 37, 45],
  ["Pago pendiente", 20, 28],
  ["Cliente", 12, 18],
] as const;

export function FunnelCard() {
  return (
    <DashboardCard className="publitek-funnel-card" title="Embudo comercial">
      <div className="publitek-funnel-bars">
        {funnel.map(([label, value, percentage]) => (
          <div aria-label={`${label}: ${value}`} className="publitek-funnel-stage" key={label}>
            <span className="publitek-funnel-bar" style={{ height: `${percentage}%` }} />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
