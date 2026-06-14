import { DashboardCard } from "@/components/dashboard/dashboard-card";

interface MetricCardProps {
  label: string;
  value: string;
  note?: string;
  accent?: "green" | "petroleum" | "wine";
  icon?: string;
}

export function MetricCard({ label, value, note, accent = "petroleum", icon = "↗" }: MetricCardProps) {
  return (
    <DashboardCard className={`dashboard-metric dashboard-metric-${accent}`}>
      <span aria-hidden="true" className="publitek-metric-slide" />
      <div className="dashboard-metric-top"><span className="dashboard-metric-label">{label}</span><span className="publitek-metric-icon">{icon}</span></div>
      <strong>{value}</strong>
      {note && <p>{note}</p>}
    </DashboardCard>
  );
}
