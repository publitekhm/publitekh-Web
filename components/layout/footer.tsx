import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-petroleum/25 px-6 py-7">
      <a className="brand-logo flex items-center gap-2 text-lg" href="#inicio">
        <span className="brand-logo-emblem brand-logo-emblem-small">
          <Image alt="" height={28} src="/publitek-seed.svg" width={28} />
        </span>
        <span>Publi<span className="brand-logo-tek">tek</span></span>
      </a>
      <p className="text-[0.68rem] text-slate">© 2026 Publitek · Marketing automation completo con IA</p>
      <p className="text-[0.68rem] text-slate">Soacha, Cundinamarca, Colombia</p>
    </footer>
  );
}
