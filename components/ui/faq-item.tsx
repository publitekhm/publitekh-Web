"use client";

import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`faq-item ${open ? "open" : ""}`}>
      <button aria-expanded={open} onClick={() => setOpen(!open)} type="button">
        {question}<span aria-hidden="true">+</span>
      </button>
      <div className="faq-answer"><p>{answer}</p></div>
    </article>
  );
}

