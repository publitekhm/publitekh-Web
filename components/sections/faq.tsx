import { FaqItem } from "@/components/ui/faq-item";
import { faqs } from "@/lib/site-data";

export function Faq() {
  return (
    <section className="section-shell border-t border-petroleum/25" id="faq">
      <p className="section-eyebrow">preguntas frecuentes</p>
      <h2 className="section-title">Resolvemos<br />tus dudas</h2>
      <div className="mt-10 flex flex-col gap-2">
        {faqs.map(([question, answer]) => <FaqItem answer={answer} key={question} question={question} />)}
      </div>
    </section>
  );
}

