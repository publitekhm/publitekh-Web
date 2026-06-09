import type { OnboardingSectionData } from "@/types/onboarding";

const q = (number: number, label: string, config: Omit<OnboardingSectionData["questions"][number], "id" | "number" | "label">) => ({
  id: `q${number}` as const, number, label, ...config,
});

export const onboardingSections: OnboardingSectionData[] = [
  {
    id: 1, title: "Datos del negocio", subtitle: "Información básica de tu empresa",
    questions: [
      q(1, "Nombre comercial de tu negocio", { type: "text", required: true, placeholder: "Ej: Inmobiliaria Los Andes" }),
      q(2, "¿A qué se dedica tu negocio?", { type: "textarea", required: true, help: "Descríbelo como si se lo explicaras a un cliente por primera vez. Esta descripción se convierte en la memoria base del agente.", placeholder: "Ej: Somos una inmobiliaria especializada en apartamentos de arriendo..." }),
      q(3, "Sector principal de tu negocio", { type: "radio", required: true, options: ["Inmobiliaria", "Seguros", "Educación", "Salud", "Retail / Comercio", "Servicios profesionales", "Otro"] }),
      q(4, "Ciudad o ciudades donde opera", { type: "text", required: true, placeholder: "Ej: Bogotá, Medellín" }),
      q(5, "Horario de atención", { type: "text", required: true, help: "El agente usará esto para responder sobre disponibilidad.", placeholder: "Ej: Lunes a viernes 8am–6pm, sábados 9am–1pm" }),
      q(6, "Número de WhatsApp para el agente", { type: "tel", required: true, help: "Incluye el código de país. Debe ser un número que puedas conectar a WhatsApp Business.", placeholder: "Ej: +57 3112752225" }),
      q(7, "Sitio web o redes sociales", { type: "text", help: "Opcional. El agente puede redirigir a estos recursos.", placeholder: "Ej: www.minegocio.com · @minegocio" }),
    ],
  },
  {
    id: 2, title: "Personalidad y tono", subtitle: "Cómo habla y se presenta el agente",
    questions: [
      q(8, "¿Cómo se llamará tu agente?", { type: "text", required: true, help: "El nombre crea familiaridad desde el primer mensaje.", placeholder: "Ej: Sofía" }),
      q(9, "Tono de comunicación del agente", { type: "radio", required: true, options: ["Formal y profesional — vocabulario cuidado, distancia apropiada", "Cercano y amigable — conversacional, cálido, como un asesor de confianza", "Técnico y preciso — enfocado en datos, directo al punto", "Entusiasta y energético — dinámico, positivo, orientado a motivar"] }),
      q(10, "¿El agente debe tutear o usar “usted”?", { type: "radio", required: true, options: ["Siempre tutear", "Siempre usted", "Adaptar según el cliente"] }),
      q(11, "Palabras o frases que el agente NUNCA debe usar", { type: "textarea", help: "Ej: nombres de competidores, jerga interna o términos que tu marca evita.", placeholder: "Una por línea..." }),
      q(12, "Frases que el agente SIEMPRE debe usar", { type: "textarea", help: "Ej: un saludo característico, cierre o tagline de tu marca.", placeholder: "Una por línea..." }),
      q(13, "Escribe un ejemplo de cómo hablaría un asesor tuyo a un cliente", { type: "textarea", required: true, rows: 5, help: "Este ejemplo es la referencia principal para calibrar el tono.", placeholder: "Hola, buen día. Soy [Nombre] de [Negocio]..." }),
    ],
  },
  {
    id: 3, title: "Base de conocimiento", subtitle: "Lo que el agente sabe sobre tu negocio",
    questions: [
      q(14, "Las 10 preguntas que más te hacen los clientes, con su respuesta ideal", { type: "textarea", required: true, rows: 8, help: "Formato sugerido: P: ¿Cuánto cuesta? R: Nuestros planes comienzan desde...", placeholder: "P: ¿Cuánto cuesta el servicio?\nR: Nuestros planes comienzan desde..." }),
      q(15, "Productos o servicios principales con precio y descripción", { type: "textarea", required: true, rows: 5, help: "Si los precios son variables o a consultar, indícalo.", placeholder: "Servicio 1: [Nombre] — $[Precio] — [Descripción breve]" }),
      q(16, "Documentos de referencia (catálogos, tarifarios, políticas)", { type: "file-placeholder", help: "La carga de archivos se habilitará en una fase posterior. Por ahora puedes compartir un enlace.", linkField: true, placeholder: "Pega un link de Google Drive aquí" }),
      q(17, "Temas sobre los que el agente NUNCA debe dar información", { type: "textarea", required: true, help: "Ej: competencia, descuentos no autorizados o información confidencial.", placeholder: "Ej: No ofrecer descuentos sin autorización..." }),
      q(18, "¿Con qué frecuencia cambia la información del agente?", { type: "radio", required: true, options: ["Diariamente", "Semanalmente", "Mensualmente", "Raramente", "Equipo interno"] }),
    ],
  },
  {
    id: 4, title: "Voz y llamadas", subtitle: "Audio IA y llamadas automáticas",
    questions: [
      q(19, "¿El agente debe enviar mensajes de voz?", { type: "radio", required: true, options: ["Sí, siempre", "Solo si el cliente envía audio", "No, solo texto"] }),
      q(20, "Tipo de voz para el agente", { type: "radio", required: true, options: ["Voz clonada", "Voz genérica"] }),
      q(21, "Sube 3 audios de mínimo 1 minuto para clonar la voz", { type: "file-placeholder", help: "Sin ruido de fondo, sin eco y con tu tono normal de trabajo.", conditional: { field: "q20", value: "Voz clonada" } }),
      q(22, "¿Quieres llamadas telefónicas automáticas?", { type: "radio", required: true, options: ["Sí, desde el inicio", "Más adelante", "No"] }),
      q(23, "¿Cuándo debe llamar el agente y qué debe decir?", { type: "textarea", rows: 4, help: "Describe el escenario y el guion base de la llamada.", placeholder: "Ej: Si un lead no responde en 2 horas, llamar y decir...", conditional: { field: "q22", value: "Sí, desde el inicio" } }),
    ],
  },
  {
    id: 5, title: "Escalamiento", subtitle: "Cuándo y cómo transferir al humano",
    questions: [
      q(24, "¿En qué situaciones el agente DEBE transferir a un humano?", { type: "textarea", required: true, rows: 4, help: "Sé específico con quejas, solicitudes o casos especiales.", placeholder: "Ej: Cuando el cliente está enojado o pide hablar con un asesor..." }),
      q(25, "¿A qué número o correo se transfiere el escalamiento?", { type: "text", required: true, placeholder: "Ej: +57 300 000 0000 · atencion@minegocio.com" }),
      q(26, "¿Qué hace el agente fuera del horario de atención?", { type: "radio", required: true, options: ["Responder e informar horario", "Solo informar horario", "Responder preguntas simples", "No responder fuera de horario"] }),
      q(27, "¿El agente debe capturar datos del cliente durante la conversación?", { type: "radio", required: true, options: ["Siempre al inicio", "Solo cuando pide algo específico", "No"] }),
      q(28, "¿Tienes un CRM donde guardar los leads capturados?", { type: "text", help: "Ej: HubSpot, Pipedrive, Notion, Airtable o Google Sheets.", placeholder: "Ej: HubSpot · o escribe “No tengo CRM”" }),
    ],
  },
  {
    id: 6, title: "Accesos técnicos", subtitle: "Configuración e integración",
    questions: [
      q(29, "¿Tienes cuenta de Twilio?", { type: "radio", required: true, options: ["Sí, activa", "Sí, pero necesito ayuda", "No tengo"] }),
      q(30, "Acceso al número de WhatsApp Business", { type: "radio", required: true, options: ["Sí, acceso completo", "Número nuevo", "Necesito ayuda verificación"] }),
      q(31, "Contacto técnico durante el onboarding", { type: "text", required: true, help: "Nombre, WhatsApp y correo. Esta persona coordinará las pruebas.", placeholder: "Ej: Juan García · +57 310 000 0000 · juan@minegocio.com" }),
      q(32, "¿Necesitas integraciones adicionales desde el inicio?", { type: "textarea", help: "Ej: Google Calendar, Calendly, reservas, inventario o e-commerce.", placeholder: "Describe qué sistema necesitas conectar o escribe “No por ahora”..." }),
    ],
  },
];

export const requiredOnboardingIds = onboardingSections.flatMap((section) =>
  section.questions.filter((question) => question.required).map((question) => question.id),
);

