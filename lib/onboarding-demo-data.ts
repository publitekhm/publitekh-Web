import type { OnboardingRawAnswers } from "@/types/onboarding";

export type OnboardingDemoNiche =
  | "clinica-dental"
  | "inmobiliaria"
  | "ecommerce"
  | "academia-online"
  | "restaurante"
  | "agencia-viajes"
  | "centro-estetico"
  | "gimnasio"
  | "servicios-profesionales";

interface DemoTemplate {
  label: string;
  business: string;
  sector: string;
  description: string;
  products: string;
  faq: string;
  forbiddenTopics: string;
  escalationRules: string;
  callInstructions: string;
  integrations: string;
}

export const onboardingDemoNiches: Array<{ id: OnboardingDemoNiche; label: string }> = [
  { id: "clinica-dental", label: "Clínica dental" },
  { id: "inmobiliaria", label: "Inmobiliaria" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "academia-online", label: "Academia online" },
  { id: "restaurante", label: "Restaurante" },
  { id: "agencia-viajes", label: "Agencia de viajes" },
  { id: "centro-estetico", label: "Centro estético" },
  { id: "gimnasio", label: "Gimnasio / fitness" },
  { id: "servicios-profesionales", label: "Servicios profesionales" },
];

const templates: Record<OnboardingDemoNiche, DemoTemplate> = {
  "clinica-dental": {
    label: "Clínica dental",
    business: "Clínica Dental Sonrisa Perfecta",
    sector: "Salud",
    description: "Clínica dental especializada en odontología general, estética, ortodoncia e implantes, con atención cercana y planes de tratamiento claros.",
    products: "Valoración odontológica — $80.000 — Diagnóstico y plan inicial.\nLimpieza dental — desde $150.000 — Profilaxis y revisión.\nOrtodoncia — precio según valoración — Tratamiento personalizado.",
    faq: "P: ¿Cuánto cuesta la valoración?\nR: La valoración inicial cuesta $80.000.\n\nP: ¿Manejan financiación?\nR: Sí, para tratamientos seleccionados.\n\nP: ¿Atienden urgencias?\nR: Sí, según disponibilidad.",
    forbiddenTopics: "No diagnosticar sin valoración profesional.\nNo recomendar medicamentos.\nNo compartir información privada de pacientes.",
    escalationRules: "Transferir ante urgencias, preguntas clínicas específicas, quejas o cambios de cita para el mismo día.",
    callInstructions: "Llamar cuando el paciente solicite una valoración o necesite confirmar una cita.",
    integrations: "Google Calendar para citas y HubSpot para seguimiento de pacientes.",
  },
  inmobiliaria: {
    label: "Inmobiliaria",
    business: "Inmobiliaria Horizonte",
    sector: "Inmobiliaria",
    description: "Inmobiliaria dedicada a venta y arriendo de apartamentos y casas, con acompañamiento en visitas, documentación y negociación.",
    products: "Arriendo de apartamentos — desde $1.800.000/mes.\nVenta de vivienda — desde $280.000.000.\nAdministración de inmuebles — 8% del canon mensual.",
    faq: "P: ¿Qué documentos necesito para arrendar?\nR: Documento de identidad y soportes de ingresos.\n\nP: ¿Puedo agendar una visita?\nR: Sí, coordinamos según disponibilidad.\n\nP: ¿Manejan financiación?\nR: Le conectamos con aliados bancarios.",
    forbiddenTopics: "No garantizar aprobación bancaria.\nNo negociar precios sin autorización.\nNo compartir datos del propietario.",
    escalationRules: "Transferir para ofertas formales, negociación de precio, documentación sensible o problemas contractuales.",
    callInstructions: "Llamar cuando un prospecto solicite visita o tenga interés alto en un inmueble.",
    integrations: "CRM inmobiliario, Google Calendar y portal de inventario.",
  },
  ecommerce: {
    label: "E-commerce",
    business: "Tienda Nova",
    sector: "Retail / Comercio",
    description: "Tienda e-commerce de productos para hogar y estilo de vida, con ventas nacionales, pagos en línea y seguimiento de pedidos.",
    products: "Kit organización premium — $189.900.\nLámpara LED inteligente — $129.900.\nSet bienestar hogar — $219.900.",
    faq: "P: ¿Cuánto tarda el envío?\nR: Entre 2 y 5 días hábiles.\n\nP: ¿Puedo pagar contra entrega?\nR: Está disponible en ciudades seleccionadas.\n\nP: ¿Cómo hago un cambio?\nR: Se solicita dentro de los primeros 15 días.",
    forbiddenTopics: "No prometer inventario sin validarlo.\nNo inventar fechas de entrega.\nNo aprobar devoluciones fuera de política.",
    escalationRules: "Transferir por pagos rechazados, pedidos perdidos, devoluciones especiales o reclamos.",
    callInstructions: "Llamar a compradores con carrito de alto valor o solicitudes de venta corporativa.",
    integrations: "Shopify, plataforma logística y CRM de clientes.",
  },
  "academia-online": {
    label: "Academia online",
    business: "Academia Impulso Digital",
    sector: "Educación",
    description: "Academia online con programas prácticos de marketing, ventas y herramientas digitales para emprendedores y equipos comerciales.",
    products: "Curso Marketing Digital — $490.000.\nPrograma Ventas Consultivas — $790.000.\nMentoría empresarial — desde $1.500.000.",
    faq: "P: ¿Las clases quedan grabadas?\nR: Sí, durante la vigencia del programa.\n\nP: ¿Entregan certificado?\nR: Sí, al completar los módulos.\n\nP: ¿Hay clases en vivo?\nR: Sí, según el programa.",
    forbiddenTopics: "No garantizar ingresos o resultados.\nNo ofrecer becas sin autorización.\nNo compartir contenido privado del curso.",
    escalationRules: "Transferir para financiación, convenios empresariales, soporte académico especial o cancelaciones.",
    callInstructions: "Llamar a prospectos interesados en mentorías o programas empresariales.",
    integrations: "Hotmart, Zoom, Calendly y CRM.",
  },
  restaurante: {
    label: "Restaurante",
    business: "Restaurante Sabor Urbano",
    sector: "Otro",
    description: "Restaurante de cocina contemporánea colombiana con servicio en salón, reservas, domicilios y eventos privados.",
    products: "Menú ejecutivo — $32.000.\nCena para dos — desde $145.000.\nEvento privado — cotización personalizada.",
    faq: "P: ¿Aceptan reservas?\nR: Sí, recomendamos reservar con anticipación.\n\nP: ¿Tienen opciones vegetarianas?\nR: Sí, contamos con varias opciones.\n\nP: ¿Hacen domicilios?\nR: Sí, dentro de nuestra zona de cobertura.",
    forbiddenTopics: "No confirmar reservas sin disponibilidad.\nNo asegurar ausencia total de alérgenos.\nNo ofrecer descuentos no autorizados.",
    escalationRules: "Transferir por alergias severas, eventos privados, quejas o reservas de grupos grandes.",
    callInstructions: "Llamar para confirmar eventos, grupos de más de diez personas o reservas especiales.",
    integrations: "Sistema de reservas, WhatsApp y plataforma de domicilios.",
  },
  "agencia-viajes": {
    label: "Agencia de viajes",
    business: "Viajes Brújula",
    sector: "Servicios profesionales",
    description: "Agencia de viajes que diseña experiencias nacionales e internacionales, paquetes familiares y viajes corporativos.",
    products: "Escapada Caribe — desde $2.400.000.\nEuropa esencial — desde $8.900.000.\nViaje corporativo — cotización personalizada.",
    faq: "P: ¿Los precios incluyen vuelos?\nR: Depende del paquete seleccionado.\n\nP: ¿Ayudan con visas?\nR: Brindamos orientación documental.\n\nP: ¿Puedo pagar por cuotas?\nR: Sí, según condiciones del proveedor.",
    forbiddenTopics: "No garantizar aprobación de visas.\nNo confirmar tarifas sin validarlas.\nNo prometer disponibilidad aérea.",
    escalationRules: "Transferir por cambios urgentes, grupos grandes, visas, reembolsos o viajes corporativos.",
    callInstructions: "Llamar cuando el viajero solicite cotización personalizada o tenga fechas definidas.",
    integrations: "CRM, Calendly y sistema de cotizaciones.",
  },
  "centro-estetico": {
    label: "Centro estético",
    business: "Centro Estético Aura",
    sector: "Salud",
    description: "Centro estético especializado en cuidado facial, corporal y tratamientos no invasivos con valoración personalizada.",
    products: "Limpieza facial profunda — $180.000.\nPlan corporal — desde $650.000.\nValoración estética — $60.000.",
    faq: "P: ¿Necesito valoración?\nR: Sí, para recomendar el tratamiento adecuado.\n\nP: ¿Cuántas sesiones necesito?\nR: Depende de la valoración.\n\nP: ¿Tienen financiación?\nR: Sí, para planes seleccionados.",
    forbiddenTopics: "No prometer resultados garantizados.\nNo emitir diagnósticos médicos.\nNo recomendar procedimientos sin valoración.",
    escalationRules: "Transferir por contraindicaciones, reacciones, preguntas clínicas, financiación o quejas.",
    callInstructions: "Llamar para confirmar valoraciones y planes de tratamiento.",
    integrations: "Google Calendar, CRM y sistema de historias de atención.",
  },
  gimnasio: {
    label: "Gimnasio / fitness",
    business: "Distrito Fitness",
    sector: "Otro",
    description: "Gimnasio con entrenamiento funcional, clases grupales y planes personalizados para mejorar condición física y bienestar.",
    products: "Mensualidad libre — $159.000.\nPlan personalizado — $320.000/mes.\nClase de prueba — sin costo.",
    faq: "P: ¿Puedo tomar una clase de prueba?\nR: Sí, con reserva previa.\n\nP: ¿Incluye entrenador?\nR: Depende del plan.\n\nP: ¿Qué horarios manejan?\nR: Abrimos todos los días.",
    forbiddenTopics: "No prometer resultados físicos.\nNo dar recomendaciones médicas.\nNo ofrecer tarifas no vigentes.",
    escalationRules: "Transferir por lesiones, planes corporativos, congelaciones, cancelaciones o quejas.",
    callInstructions: "Llamar a interesados en planes personalizados o convenios empresariales.",
    integrations: "Sistema de membresías, calendario de clases y CRM.",
  },
  "servicios-profesionales": {
    label: "Servicios profesionales",
    business: "Consultora Norte Estratégico",
    sector: "Servicios profesionales",
    description: "Firma consultora que ayuda a pymes a mejorar estrategia comercial, procesos, finanzas y crecimiento sostenible.",
    products: "Diagnóstico empresarial — $950.000.\nConsultoría mensual — desde $2.500.000.\nTaller para equipos — desde $1.800.000.",
    faq: "P: ¿Cómo comienza el proceso?\nR: Con una reunión de diagnóstico.\n\nP: ¿Trabajan por proyecto?\nR: Sí, también ofrecemos acompañamiento mensual.\n\nP: ¿Atienden empresas fuera de Bogotá?\nR: Sí, de forma virtual.",
    forbiddenTopics: "No garantizar resultados financieros.\nNo emitir conceptos legales.\nNo compartir información de clientes.",
    escalationRules: "Transferir para propuestas, alcance técnico, contratos, alianzas o negociación comercial.",
    callInstructions: "Llamar a prospectos empresariales que soliciten diagnóstico o propuesta.",
    integrations: "HubSpot, Calendly, Google Drive y sistema de propuestas.",
  },
};

const contactNames = ["Laura Gómez", "Daniel Rojas", "Mariana Torres", "Andrés Pérez", "Camila Vargas", "Santiago Ruiz"];
const agentNames = ["Valentina", "Sofía", "Mariana", "Daniel", "Luna", "Mateo"];
const cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga"];

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomDigits(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
}

function randomColombianPhone() {
  return `+573${randomDigits(9)}`;
}

export function generateOnboardingDemoData(niche: OnboardingDemoNiche): OnboardingRawAnswers {
  const template = templates[niche];
  const suffix = `${randomItem(["Demo", "Plus", "360", "Pro", "Prime"])} ${randomDigits(3)}`;
  const businessName = `${template.business} ${suffix}`;
  const contactName = randomItem(contactNames);
  const agentName = randomItem(agentNames);
  const whatsapp = randomColombianPhone();
  const contactPhone = randomColombianPhone();
  const escalationPhone = randomColombianPhone();
  const email = `${slugify(contactName)}.${randomDigits(3)}@${slugify(template.business)}.demo`;
  const businessSlug = slugify(businessName);

  return {
    q1: businessName,
    q2: template.description,
    q3: template.sector,
    q4: randomItem(cities),
    q5: "Lunes a viernes 8am–6pm, sábados 9am–1pm",
    q6: whatsapp,
    q7: `https://${businessSlug}.demo · @${businessSlug}`,
    q8: agentName,
    q9: "Cercano y amigable — conversacional, cálido, como un asesor de confianza",
    q10: "Adaptar según el cliente",
    q11: "No usar lenguaje ofensivo.\nNo prometer condiciones que no estén confirmadas.",
    q12: "Con gusto le ayudamos.\nPermítame revisar la mejor opción para usted.",
    q13: `Hola, soy ${agentName} de ${businessName}. Con gusto le ayudo a resolver sus dudas y encontrar la mejor opción.`,
    q14: template.faq,
    q15: template.products,
    q16: `https://drive.google.com/demo-${businessSlug}`,
    q17: template.forbiddenTopics,
    q18: "Mensualmente",
    q19: "Solo si el cliente envía audio",
    q20: "Voz genérica",
    q21: "No aplica: se utilizará voz genérica.",
    q22: "Sí, desde el inicio",
    q23: `${template.callInstructions} Presentarse como ${agentName} de ${businessName}.`,
    q24: template.escalationRules,
    q25: `${escalationPhone} · coordinacion@${slugify(template.business)}.demo`,
    q26: "Responder e informar horario",
    q27: "Solo cuando pide algo específico",
    q28: "HubSpot",
    q29: "Sí, pero necesito ayuda",
    q30: "Sí, acceso completo",
    q31: `${contactName} · ${contactPhone} · ${email}`,
    q32: template.integrations,
  };
}
