import { useState, useEffect } from 'react';
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
import { CheatConfig } from './types';
import { PlaySquare, Settings2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<CheatConfig>(INITIAL_CHEAT_CONFIG);

  useEffect(() => {
    const targets = document.querySelectorAll('.hero-shell, .section-shell, footer');
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-visible');
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0908] text-white flex flex-col font-sans">
      <Navbar />
      <Hero config={config} />
      <BentoFeatures />
      <section id="cheat-ui" className="section-shell scroll-mt-20">
        <div className="site-container">
          <div className="section-heading mx-auto max-w-3xl text-center">
            <span className="eyebrow">TACTICAL SIMULATION CONSOLE</span>
            <h2>SIDE-BY-SIDE CONFIGURATION MONITOR</h2>
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
              <div>
                <GamePreview config={config} />
              </div>
            </div>
          </div>
          <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">VANTA overlay supports direct x11, x12, and Vulkan render outputs inside standard fullscreen mode.</p>
        </div>
      </section>
      <Testimonials />
      <Pricing />
      <FaqSection />
      <Footer />
    </div>
  );
}
