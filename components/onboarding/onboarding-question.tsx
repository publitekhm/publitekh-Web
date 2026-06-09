import type { OnboardingQuestion as Question } from "@/types/onboarding";

interface Props {
  question: Question;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void;
}

export function OnboardingQuestion({ question, value, error, onChange }: Props) {
  return (
    <div className={`onboarding-question ${error ? "has-error" : ""}`} id={`question-${question.id}`}>
      <div className="onboarding-question-title">
        <span>{String(question.number).padStart(2, "0")}</span>
        <label htmlFor={question.id}>{question.label}{question.required && <em>*</em>}</label>
      </div>
      {question.help && <p className="onboarding-question-help">{question.help}</p>}

      {question.type === "radio" && (
        <div className="onboarding-options">
          {question.options?.map((option) => (
            <label className={value === option ? "selected" : ""} key={option}>
              <input checked={value === option} name={question.id} onChange={() => onChange(question.id, option)} type="radio" value={option} />
              <span />{option}
            </label>
          ))}
        </div>
      )}
      {(question.type === "text" || question.type === "tel") && (
        <input id={question.id} onChange={(event) => onChange(question.id, event.target.value)} placeholder={question.placeholder} type={question.type} value={value} />
      )}
      {question.type === "textarea" && (
        <textarea id={question.id} onChange={(event) => onChange(question.id, event.target.value)} placeholder={question.placeholder} rows={question.rows ?? 3} value={value} />
      )}
      {question.type === "file-placeholder" && (
        <>
          <div className="onboarding-file-placeholder" aria-disabled="true">
            <span>↥</span><strong>Carga de archivos próximamente</strong>
            <p>No se subirán archivos en esta fase del onboarding.</p>
          </div>
          {question.linkField && <input id={question.id} onChange={(event) => onChange(question.id, event.target.value)} placeholder={question.placeholder} type="url" value={value} />}
        </>
      )}
      {error && <p className="onboarding-field-error">{error}</p>}
    </div>
  );
}

