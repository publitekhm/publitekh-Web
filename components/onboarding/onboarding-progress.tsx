interface OnboardingProgressProps {
  completed: number;
  total: number;
}

export function OnboardingProgress({ completed, total }: OnboardingProgressProps) {
  const percentage = Math.round((completed / total) * 100);
  return (
    <div className="onboarding-progress">
      <div>
        <span>Progreso del onboarding</span>
        <strong>{percentage}%</strong>
      </div>
      <div className="onboarding-progress-track"><span style={{ width: `${percentage}%` }} /></div>
      <p>{completed} de {total} respuestas obligatorias completas</p>
    </div>
  );
}

