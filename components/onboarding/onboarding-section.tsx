import { OnboardingQuestion } from "@/components/onboarding/onboarding-question";
import type { OnboardingAnswers, OnboardingSectionData } from "@/types/onboarding";

interface Props {
  section: OnboardingSectionData;
  isOpen: boolean;
  answers: OnboardingAnswers;
  errors: Record<string, string>;
  onToggle: () => void;
  onChange: (id: string, value: string) => void;
}

export function OnboardingSection({ section, isOpen, answers, errors, onToggle, onChange }: Props) {
  const visibleQuestions = section.questions.filter(
    (question) => !question.conditional || answers[question.conditional.field] === question.conditional.value,
  );

  return (
    <section className={`onboarding-section ${isOpen ? "open" : ""}`}>
      <button aria-expanded={isOpen} className="onboarding-section-head" onClick={onToggle} type="button">
        <span className="onboarding-section-number">{section.id}</span>
        <span className="flex-1">
          <strong>{section.title}</strong>
          <small>{section.subtitle}</small>
        </span>
        <span className="onboarding-section-count">{visibleQuestions.length} preguntas</span>
        <span className="onboarding-chevron">⌄</span>
      </button>
      {isOpen && (
        <div className="onboarding-section-body">
          {visibleQuestions.map((question) => (
            <OnboardingQuestion error={errors[question.id]} key={question.id} onChange={onChange} question={question} value={answers[question.id] ?? ""} />
          ))}
          {section.id === 6 && <div className="onboarding-security"><strong>Nota de seguridad:</strong> Las claves API y contraseñas nunca se solicitan por este formulario.</div>}
        </div>
      )}
    </section>
  );
}

