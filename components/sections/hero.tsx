import Image from "next/image";

export function Hero() {
  return (
    <>
      <section
        className="hero-premium relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32"
        id="inicio"
      >
        <div aria-hidden="true" className="hero-orb hero-orb-petroleum" />
        <div aria-hidden="true" className="hero-orb hero-orb-wine" />
        <div aria-hidden="true" className="hero-grid" />

        <div className="hero-layout">
          <div className="hero-copy relative z-10">
            <div className="hero-eyebrow mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] sm:text-xs">
              <span aria-hidden="true">✦</span>
              Agentes IA de ventas para WhatsApp
            </div>

            <h1 className="hero-title font-display font-bold text-balance">
              Conectamos inteligencia, automatizamos procesos y hacemos{" "}
              <span className="text-green-accent">crecer negocios.</span>
            </h1>

            <p className="hero-subtitle mt-7 text-base leading-7 text-mist sm:text-lg">
              Publitek es el núcleo inteligente que conecta cada área de tu negocio.
              Nuestros agentes IA trabajan, aprenden y evolucionan para generar
              resultados reales.
            </p>

            <div className="hero-actions mt-9 flex flex-wrap gap-3">
              <a className="button-primary px-7 py-3.5" href="#planes">
                Solicitar demo <span aria-hidden="true">→</span>
              </a>
              <a className="button-secondary px-7 py-3.5" href="#soluciones">
                <span aria-hidden="true" className="hero-play">▶</span>
                Ver cómo funciona
              </a>
            </div>

            <div className="hero-features">
              <span><b aria-hidden="true">ϟ</b> Respuestas instantáneas</span>
              <span><b aria-hidden="true">◉</b> Calificación inteligente</span>
              <span><b aria-hidden="true">↗</b> Más ventas, menos esfuerzo</span>
            </div>
          </div>

          <div aria-hidden="true" className="hero-emblem-panel">
            <div className="hero-seed-atmosphere">
              <span className="hero-seed-glow" />
              <span className="hero-seed-orbit">
                <i className="orbit-dot orbit-dot-petroleum" />
                <i className="orbit-dot orbit-dot-wine" />
              </span>
              <Image alt="" height={420} priority src="/publitek-seed.svg" width={394} />
            </div>
            <div className="hero-emblem-wordmark">
              publi<span>tek</span>
            </div>
            <div className="hero-emblem-tagline">Agentes IA que venden por ti</div>
          </div>
        </div>
      </section>

      <aside className="clients-strip" aria-label="Empresas que usan Publitek">
        <p>Empresas que ya impulsan sus ventas con Publitek</p>
        <div>
          <span>Sonrisa Vital<small>ODONTOLOGÍA</small></span>
          <span>Inmobiliaria<small>DEL PARQUE</small></span>
          <span>Fitcore<small>NUTRITION</small></span>
          <span>Legalia<small>ABOGADOS</small></span>
          <span>Nova<small>ESTÉTICA</small></span>
          <span>Educa+<small>ACADEMIA ONLINE</small></span>
        </div>
      </aside>
    </>
  );
}
