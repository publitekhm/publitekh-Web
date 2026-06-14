import { DashboardCard } from "@/components/dashboard/dashboard-card";

const leads = [
  ["Heyder Mejía", "Publitek Demo", "Alto", "Pago pendiente", "IA", "Link de pago enviado"],
  ["Mary Peña", "Escala Store", "Medio", "Oportunidad", "Humano", "Dueño tomó control"],
  ["Cliente 003", "Clínica Norte", "Bajo", "Nuevo", "IA", "Respondió FAQ"],
] as const;

export function LeadsTable() {
  return (
    <DashboardCard className="dashboard-table-card" meta="CRM comercial" title="Leads recientes">
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Lead</th><th>Empresa</th><th>Interés</th><th>Estado</th><th>Modo</th><th>Última acción</th></tr></thead>
          <tbody>
            {leads.map(([name, company, interest, status, mode, action]) => (
              <tr key={name}>
                <td>{name}</td><td>{company}</td>
                <td><span className={`dashboard-badge dashboard-interest-light badge-${interest.toLowerCase()}`}><i aria-hidden="true" />{interest}</span></td>
                <td>{status}</td>
                <td><span className={`dashboard-badge badge-${mode.toLowerCase()}`}>{mode}</span></td>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
