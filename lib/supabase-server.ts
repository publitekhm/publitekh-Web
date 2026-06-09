import "server-only";

import type { NormalizedLead } from "@/types/lead";

const LANDING_COMPANY_NAME = "Publitek Leads";

interface CompanyRow {
  id: string;
}

interface LeadRow {
  id: string;
  historial: unknown;
}

interface LandingLeadResult {
  leadId: string;
  created: boolean;
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  return { serviceRoleKey, url };
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
  expectedStatuses: number[] = [200],
): Promise<T> {
  const { serviceRoleKey, url } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Profile": "public",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!expectedStatuses.includes(response.status)) {
    const detail = await response.text();
    console.error("[Supabase REST]", response.status, detail);
    throw new Error(`Supabase respondió con status ${response.status}.`);
  }

  if (response.status === 204) return undefined as T;

  const body = await response.text();
  return body ? (JSON.parse(body) as T) : (undefined as T);
}

function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

function historyEntry(lead: NormalizedLead) {
  return {
    tipo: "lead_web_creado",
    created_at: lead.created_at,
    datos_web: {
      empresa: lead.empresa,
      email: lead.email,
      servicio_interes: lead.servicio_interes,
      plan_interes: lead.plan_interes,
      mensaje: lead.mensaje || null,
      origen: lead.origen,
    },
  };
}

function historyArray(history: unknown) {
  return Array.isArray(history) ? history : [];
}

async function resolveLandingCompanyId() {
  const query = new URLSearchParams({
    select: "id",
    nombre: `eq.${LANDING_COMPANY_NAME}`,
    limit: "2",
  });
  const companies = await supabaseRequest<CompanyRow[]>(`empresas?${query}`);

  if (companies.length !== 1) {
    throw new Error(`Se esperó una empresa "${LANDING_COMPANY_NAME}" y se encontraron ${companies.length}.`);
  }

  return companies[0].id;
}

async function findLead(empresaId: string, telefono: string) {
  const query = new URLSearchParams({
    select: "id,historial",
    empresa_id: `eq.${empresaId}`,
    telefono: `eq.${telefono}`,
    limit: "1",
  });
  const leads = await supabaseRequest<LeadRow[]>(`leads?${query}`);
  return leads[0] ?? null;
}

async function updateExistingLead(existing: LeadRow, lead: NormalizedLead, telefono: string) {
  const query = new URLSearchParams({ id: `eq.${existing.id}` });
  await supabaseRequest<void>(
    `leads?${query}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        nombre: lead.nombre,
        telefono,
        canal: "web",
        estado: "nuevo",
        nivel_interes: "bajo",
        intencion: lead.servicio_interes,
        historial: [...historyArray(existing.historial), historyEntry(lead)],
        ultima_interaccion: lead.created_at,
        modo_atencion: "ia",
        estado_comercial: "nuevo",
        origen: lead.origen,
        campana: lead.plan_interes,
      }),
    },
    [204],
  );
  return existing.id;
}

async function createLead(empresaId: string, lead: NormalizedLead, telefono: string) {
  const rows = await supabaseRequest<LeadRow[]>(
    "leads?select=id,historial",
    {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        empresa_id: empresaId,
        telefono,
        nombre: lead.nombre,
        canal: "web",
        estado: "nuevo",
        nivel_interes: "bajo",
        intencion: lead.servicio_interes,
        historial: [historyEntry(lead)],
        ultima_interaccion: lead.created_at,
        modo_atencion: "ia",
        estado_comercial: "nuevo",
        origen: lead.origen,
        campana: lead.plan_interes,
      }),
    },
    [201],
  );

  if (!rows[0]?.id) throw new Error("Supabase no devolvió el id del lead creado.");
  return rows[0].id;
}

async function registerLeadActivity(
  empresaId: string,
  leadId: string,
  lead: NormalizedLead,
  telefono: string,
  created: boolean,
) {
  await supabaseRequest<void>(
    "actividades_lead",
    {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        empresa_id: empresaId,
        lead_id: leadId,
        tipo_actividad: "lead_web_creado",
        actor: "landing_publitek",
        descripcion: created
          ? "Lead recibido desde la landing de Publitek"
          : "Lead web existente actualizado desde la landing de Publitek",
        payload: {
          empresa_declarada: lead.empresa,
          email: lead.email,
          telefono,
          servicio_interes: lead.servicio_interes,
          plan_interes: lead.plan_interes,
          mensaje: lead.mensaje || null,
          origen: lead.origen,
          reingreso: !created,
        },
      }),
    },
    [201],
  );
}

export async function createOrUpdateLandingLead(lead: NormalizedLead): Promise<LandingLeadResult> {
  const empresaId = await resolveLandingCompanyId();
  const telefono = normalizePhone(lead.telefono);
  const existing = await findLead(empresaId, telefono);
  let leadId: string;
  let created = false;

  if (existing) {
    leadId = await updateExistingLead(existing, lead, telefono);
  } else {
    try {
      leadId = await createLead(empresaId, lead, telefono);
      created = true;
    } catch (error) {
      // A concurrent request may have inserted the same (empresa_id, telefono).
      const concurrentLead = await findLead(empresaId, telefono);
      if (!concurrentLead) throw error;
      leadId = await updateExistingLead(concurrentLead, lead, telefono);
    }
  }

  await registerLeadActivity(empresaId, leadId, lead, telefono, created);
  return { created, leadId };
}
