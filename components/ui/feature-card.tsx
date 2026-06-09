interface FeatureCardProps {
  index: number;
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ index, icon, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="feature-symbol">{icon}</span>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-mist">{description}</p>
    </article>
  );
}

