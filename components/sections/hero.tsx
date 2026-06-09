import { ServiceSelector } from "@/components/ui/service-selector";
import { Stats } from "@/components/ui/stats";

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36"
      id="inicio"
    >
      <div aria-hidden="true" className="hero-orb hero-orb-petroleum" />
      <div aria-hidden="true" className="hero-orb hero-orb-wine" />
      <div aria-hidden="true" className="hero-grid" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-accent/20 bg-green/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-green-accent sm:text-xs">
          <span className="size-1.5 animate-pulse rounded-full bg-green-accent shadow-[0_0_12px_rgba(61,219,135,0.8)]" />
          Marketing automation · IA de última generación
        </div>

        <h1 className="max-w-4xl font-display text-[clamp(3.25rem,8.5vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-balance">
          Tu negocio
          <br />
          <span className="text-green-accent">creciendo solo</span>,
          <br />
          mientras tú <em className="font-semibold text-wine-light">descansas</em>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-mist sm:text-lg">
          Agente de ventas en WhatsApp + contenido automatizado en redes. La cadena
          completa, conectada, sin intervención humana.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a className="button-primary px-7 py-3.5" href="#servicios">
            Explorar servicios <span aria-hidden="true">→</span>
          </a>
          <a className="button-secondary px-7 py-3.5" href="#estadisticas">
            Ver resultados
          </a>
        </div>

        <ServiceSelector />
        <Stats />
      </div>
    </section>
  );
}

