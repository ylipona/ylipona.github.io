import { memo, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell" aria-labelledby="faq-heading">
      <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="section-heading lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow flex items-center gap-2"><HelpCircle size={13} />KNOWLEDGE INFRASTRUCTURE</span>
          <h2 id="faq-heading">FREQUENTLY ASKED QUESTIONS</h2>
          <p>Everything you need to know about our hypervisor injection driver and security system layers.</p>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="secondary-button mt-7 inline-flex">Open Discord support ticket</a>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={faq.question} className={`faq-card surface-card overflow-hidden ${isOpen ? 'border-brand-primary/25' : ''}`}>
                <button type="button" id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 p-5 text-left sm:p-6" aria-expanded={isOpen}>
                  <span className="font-display text-sm font-semibold tracking-[-0.01em] text-white/88 sm:text-base">{faq.question}</span>
                  <ChevronDown size={17} className={`shrink-0 text-brand-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-white/8 px-5 py-5 text-sm leading-7 text-white/60 sm:px-6">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(FaqSection);
