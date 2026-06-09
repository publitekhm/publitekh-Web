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
      <div className="dashboard-metric-top"><span>{label}</span><i>{icon}</i></div>
      <strong>{value}</strong>
      {note && <p>{note}</p>}
    </DashboardCard>
  );
}

