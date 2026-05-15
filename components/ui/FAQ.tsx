"use client";

import { useState } from "react";

interface FAQItem {
  pergunta: string;
  resposta: string;
}

interface FAQProps {
  items: FAQItem[];
}

function FAQAccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-surface)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] transition-colors hover:bg-[var(--color-surface-2)]"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-bold text-sm md:text-base text-[var(--color-brand)] leading-snug pr-2">
          {item.pergunta}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-[var(--color-brand)] text-[var(--color-brand)] transition-transform duration-200">
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-45" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          className="px-6 pb-6 text-sm text-[var(--color-text-2)] leading-relaxed"
        >
          {item.resposta}
        </div>
      )}
    </div>
  );
}

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <FAQAccordionItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}
