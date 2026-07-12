import { memo } from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

function ReviewCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="testimonial-set" aria-hidden={duplicate || undefined}>
      {TESTIMONIALS.map((testimonial) => (
        <article key={`${duplicate ? 'copy-' : ''}${testimonial.author}`} className="testimonial-card surface-card">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-1 text-brand-primary" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}
              </div>
              <Quote size={22} className="text-white/10" />
            </div>
            <p className="text-sm leading-7 text-white/64">“{testimonial.quote}”</p>
          </div>
          <div className="mt-7 border-t border-white/8 pt-4">
            <strong className="block font-display text-xs tracking-wider text-white/90">{testimonial.author}</strong>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-white/58">{testimonial.role}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="section-shell overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <div className="section-heading mx-auto max-w-3xl text-center">
          <span className="eyebrow">VERIFIED RECONNAISSANCE</span>
          <h2 id="testimonials-heading" className="mx-auto">ACCLAIMED BY SOLO SURVIVALISTS</h2>
          <p className="mx-auto">Critical feedback from active server veterans who dominate high-tier clan encounters using our suite.</p>
        </div>
      </div>

      <div className="testimonial-marquee mt-12" aria-label="Customer reviews">
        <div className="testimonial-track">
          <ReviewCards />
          <ReviewCards duplicate />
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
