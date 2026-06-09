import { FeaturesGrid } from "@/components/ui/features-grid";
import { solutions } from "@/lib/site-data";

export function Solutions() {
  return (
    <section className="section-shell border-t border-petroleum/25" id="soluciones">
      {solutions.map((solution, index) => (
        <div className={index > 0 ? "mt-20" : ""} key={solution.id}>
          <p className="section-eyebrow">{solution.eyebrow}</p>
          <h2 className="section-title whitespace-pre-line">{solution.title}</h2>
          <p className="section-description">{solution.description}</p>
          <FeaturesGrid features={solution.features} />
        </div>
      ))}
    </section>
  );
}

