import { DashboardCard } from "@/components/dashboard/dashboard-card";

const usage = [
  ["Conversaciones", "384 / 600"],
  ["Audios enviados", "71"],
  ["Imágenes recibidas", "24"],
  ["Llamadas agendadas", "14"],
] as const;

export function UsageCard() {
  return (
    <DashboardCard meta="Plan Growth" title="Uso del plan">
      <div className="dashboard-big-value">64%</div>
      <p className="dashboard-note">216 conversaciones disponibles</p>
      <div className="dashboard-usage"><span style={{ width: "64%" }} /></div>
      <div className="dashboard-mini-rows">
        {usage.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
      </div>
    </DashboardCard>
  );
}
