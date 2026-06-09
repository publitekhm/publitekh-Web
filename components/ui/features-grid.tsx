import { FeatureCard } from "@/components/ui/feature-card";

interface FeaturesGridProps {
  features: readonly (readonly [string, string, string])[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="feature-grid">
      {features.map(([icon, title, description], index) => (
        <FeatureCard description={description} icon={icon} index={index} key={title} title={title} />
      ))}
    </div>
  );
}

