"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { validateLead } from "@/lib/lead-validation";
import { planGroups } from "@/lib/plans";
import type { LeadApiResponse } from "@/types/api";
import type { LeadErrors, LeadFormStatus, LeadModalDefaults, LeadPayload } from "@/types/lead";

const emptyLead: LeadPayload = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  servicio_interes: "",
  plan_interes: "",
  mensaje: "",
};

interface LeadFormProps {
  defaults: LeadModalDefaults;
  onClose: () => void;
}

export function LeadForm({ defaults, onClose }: LeadFormProps) {
  const [payload, setPayload] = useState<LeadPayload>({
    ...emptyLead,
    servicio_interes: defaults.servicio_interes ?? "",
    plan_interes: defaults.plan_interes ?? "",
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const availablePlans = useMemo(
    () => planGroups.find((group) => group.id === payload.servicio_interes)?.plans ?? [],
    [payload.servicio_interes],
  );

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setPayload((current) => ({
      ...current,
      [name]: value,
      ...(name === "servicio_interes" ? { plan_interes: "" } : {}),
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setSubmitError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateLead(payload);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as LeadApiResponse;

      if (!response.ok || !result.success) {
        setErrors(result.success ? {} : (result.fields ?? {}));
        setSubmitError(result.success ? "No pudimos procesar tu solicitud." : result.error);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setSubmitError("No pudimos enviar tus datos. Intenta nuevamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-success" role="status">
        <span aria-hidden="true">✓</span>
        <h3>¡Recibimos tus datos!</h3>
        <p>Te contactaremos pronto para revisar la mejor opción para {payload.empresa}.</p>
        <button className="button-primary mt-6 px-6 py-3 text-sm" onClick={onClose} type="button">Cerrar</button>
      </div>
    );
  }

  return (
    <form className="lead-form" noValidate onSubmit={handleSubmit}>
      <div className="lead-form-grid">
        <LeadField error={errors.nombre} label="Nombre" name="nombre">
          <input autoComplete="name" id="nombre" name="nombre" onChange={updateField} placeholder="Tu nombre" value={payload.nombre} />
        </LeadField>
        <LeadField error={errors.empresa} label="Empresa" name="empresa">
          <input autoComplete="organization" id="empresa" name="empresa" onChange={updateField} placeholder="Nombre de tu empresa" value={payload.empresa} />
        </LeadField>
        <LeadField error={errors.email} label="Email" name="email">
          <input autoComplete="email" id="email" name="email" onChange={updateField} placeholder="tu@empresa.com" type="email" value={payload.email} />
        </LeadField>
        <LeadField error={errors.telefono} label="Teléfono" name="telefono">
          <input autoComplete="tel" id="telefono" name="telefono" onChange={updateField} placeholder="+57 300 000 0000" type="tel" value={payload.telefono} />
        </LeadField>
        <LeadField error={errors.servicio_interes} label="Servicio de interés" name="servicio_interes">
          <select id="servicio_interes" name="servicio_interes" onChange={updateField} value={payload.servicio_interes}>
            <option value="">Selecciona un servicio</option>
            {planGroups.map((group) => <option key={group.id} value={group.id}>{group.label}</option>)}
          </select>
        </LeadField>
        <LeadField error={errors.plan_interes} label="Plan de interés" name="plan_interes">
          <select disabled={!payload.servicio_interes} id="plan_interes" name="plan_interes" onChange={updateField} value={payload.plan_interes}>
            <option value="">Selecciona un plan</option>
            {availablePlans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name} · ${plan.price}/mes</option>)}
          </select>
        </LeadField>
      </div>
      <LeadField label="Mensaje opcional" name="mensaje">
        <textarea id="mensaje" name="mensaje" onChange={updateField} placeholder="Cuéntanos brevemente qué quieres automatizar." rows={3} value={payload.mensaje} />
      </LeadField>

      {status === "error" && <p className="lead-form-alert" role="alert">{submitError || "Revisa los campos marcados antes de continuar."}</p>}

      <button className="button-primary mt-2 w-full px-6 py-3.5 text-sm disabled:cursor-wait disabled:opacity-70" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Enviando..." : "Quiero hablar con Publitek →"}
      </button>
      <p className="mt-3 text-center text-[0.65rem] leading-5 text-slate">Sin pagos ni compromisos. Usaremos tus datos únicamente para contactarte.</p>
    </form>
  );
}

function LeadField({ children, error, label, name }: { children: React.ReactNode; error?: string; label: string; name: string }) {
  return (
    <label className="lead-field" htmlFor={name}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
