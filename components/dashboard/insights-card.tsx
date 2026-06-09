import { DashboardCard } from "@/components/dashboard/dashboard-card";

export function InsightsCard() {
  return (
    <DashboardCard meta="Recomendación mock" title="Insights del agente">
      <div className="dashboard-insight">
        <b>Oportunidad detectada</b>
        <p>Los leads que reciben respuesta durante los primeros cinco minutos convierten 2.4× más.</p>
      </div>
      <div className="dashboard-insight wine">
        <b>Acción sugerida</b>
        <p>Escalar a humano cuando un lead consulte precio dos veces y tenga interés alto.</p>
      </div>
    </DashboardCard>
  );
}
