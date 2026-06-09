export const services = [
  {
    id: "ventas",
    icon: "AI",
    name: "Agente de Ventas",
    description: "WhatsApp · Llamadas · CRM automático",
    detail: "Convierte conversaciones en oportunidades, incluso fuera de horario.",
    accent: "green",
  },
  {
    id: "contenido",
    icon: "✦",
    name: "Contenido IA",
    description: "Posts · Videos · Redes sociales",
    detail: "Crea y publica contenido consistente con la voz de tu marca.",
    accent: "wine",
  },
] as const;

export const stats = [
  { value: "24/7", label: "siempre activo" },
  { value: "<7d", label: "tiempo de setup" },
  { value: "3×", label: "más conversiones" },
  { value: "80%", label: "menos trabajo manual" },
] as const;

export const solutions = [
  {
    id: "ventas",
    eyebrow: "agente de ventas",
    title: "Responde, califica\ny cierra — solo",
    description: "Un agente de IA entrenado con tu negocio que convierte prospectos mientras duermes.",
    features: [
      ["💬", "Responde 24/7", "Sin demoras, sin días de descanso. Cada mensaje atendido al instante."],
      ["🎙", "Audios con voz natural", "Detecta cuándo mandar audio para generar confianza y cerrar más ventas."],
      ["🧠", "IA especializada", "Tecnología avanzada, entrenada con la información específica de tu negocio."],
      ["📊", "CRM automático", "Cada lead registrado, calificado y seguido sin ningún trabajo manual."],
      ["📞", "Llamadas con IA", "Cuando el cliente quiere hablar, el agente agenda y llama automáticamente."],
      ["▧", "Analiza imágenes", "Entiende las fotos que envían tus clientes y responde de forma inteligente."],
    ],
  },
  {
    id: "contenido",
    eyebrow: "contenido automatizado",
    title: "La cadena completa,\nsin tocar nada",
    description: "Estrategia, creación, diseño, programación y análisis — todo conectado de inicio a fin.",
    features: [
      ["🧠", "Estrategia IA", "Analiza tu marca, competencia y audiencia para generar el plan editorial mensual."],
      ["✎", "Copys con tu voz", "Textos personalizados por canal. Aprende tu tono y lo mantiene consistente."],
      ["✦", "Imágenes únicas", "Visuales generados por IA adaptados a tu identidad visual. Cero stock genérico."],
      ["▶", "Reels y videos", "Videos cortos generados automáticamente con texto, voz e imagen para cada red."],
      ["□", "Publicación auto", "Se publica en el horario óptimo para tu audiencia sin trabajo manual."],
      ["↗", "Análisis continuo", "Reportes automáticos y mejora continua basada en datos reales de rendimiento."],
    ],
  },
] as const;

export const faqs = [
  ["¿Necesito conocimientos técnicos para empezar?", "No. Nosotros configuramos todo. Solo necesitas contarnos sobre tu negocio — qué vendes, cuánto vale y cómo hablas con tus clientes. En 7 días tu sistema ya está activo."],
  ["¿El agente suena como una persona real?", "Sí. Usamos voces naturales y entrenamos el agente con tu tono de voz para crear conversaciones fluidas y cercanas."],
  ["¿Qué pasa si necesito más conversaciones?", "Puedes agregar paquetes de conversaciones adicionales o cambiar a un plan superior cuando tu negocio lo necesite."],
  ["¿El contenido se ve genérico o con marca IA?", "No. Cargamos ejemplos de tu contenido, tu tono de voz y las características de tu audiencia para mantener tu marca consistente."],
  ["¿Puedo combinar ventas y contenido?", "Sí. El contenido atrae prospectos y el agente de ventas los convierte. Juntos tienen un 15% de descuento."],
  ["¿Hay contratos de permanencia?", "No. Puedes cancelar con 30 días de aviso. El setup es un pago único y la mensualidad no tiene permanencia mínima."],
] as const;

