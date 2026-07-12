import { useLayoutEffect, useState } from 'react';
import { PlaySquare, Settings2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import CheatMenu from './components/CheatMenu';
import GamePreview from './components/GamePreview';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import { INITIAL_CHEAT_CONFIG } from './data';
import type { CheatConfig } from './types';

export default function App() {
  const [config, setConfig] = useState<CheatConfig>(INITIAL_CHEAT_CONFIG);

  useLayoutEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.hero-shell, .section-shell, footer'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('reveal-ready');
    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) target.classList.add('is-visible');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    targets.forEach((target) => {
      if (!target.classList.contains('is-visible')) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0908] font-sans text-white">
      <Navbar />
      <main>
        <Hero config={config} />
        <BentoFeatures />
        <section id="cheat-ui" className="section-shell scroll-mt-20" aria-labelledby="cheat-ui-heading">
          <div className="site-container">
            <div className="section-heading mx-auto max-w-3xl text-center">
              <span className="eyebrow">TACTICAL SIMULATION CONSOLE</span>
              <h2 id="cheat-ui-heading">SIDE-BY-SIDE CONFIGURATION MONITOR</h2>
              <p className="mx-auto">
                Configure aim locks, skeleton overlays, and base ESP in the left control panel. Observe the adjacent preview canvas update instantly to experience VANTA internals completely free.
              </p>
            </div>

            <div className="mt-12 grid items-stretch gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="flex min-w-0 flex-col">
                <div className="panel-label">
                  <Settings2 size={14} className="text-brand-primary" />
                  <span>VANTA Internal Customizer (Virtual Stream)</span>
                </div>
                <CheatMenu config={config} setConfig={setConfig} />
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="panel-label">
                  <PlaySquare size={14} className="text-brand-primary" />
                  <span>Active directx rendering viewport</span>
                </div>
                <GamePreview config={config} />
              </div>
            </div>
            <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">VANTA overlay supports direct x11, x12, and Vulkan render outputs inside standard fullscreen mode.</p>
          </div>
        </section>
        <Testimonials />
        <Pricing />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
