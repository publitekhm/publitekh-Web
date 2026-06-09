import { stats } from "@/lib/site-data";

export function Stats() {
  return (
    <dl
      className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-petroleum/25 bg-petroleum/25 sm:grid-cols-4"
      id="estadisticas"
    >
      {stats.map((stat) => (
        <div className="bg-ink/80 px-4 py-5 sm:py-6" key={stat.label}>
          <dd className="font-display text-3xl font-bold tracking-tight text-fog">
            {stat.value}
          </dd>
          <dt className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-slate">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

