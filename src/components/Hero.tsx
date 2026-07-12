import { useEffect, useRef } from 'react';
import { ChevronRight, Play, ShieldCheck, Star } from 'lucide-react';
import rustHuntingBow from '../assets/images/rust-huntingbow.jpg';
import { CheatConfig } from '../types';
import { AimIndicator, EspTarget } from './OverlayElements';

interface HeroProps {
  config: CheatConfig;
}

export default function Hero({ config }: HeroProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fovSize = Math.round(Math.max(58, Math.min(104, config.aimFov * 0.52)));
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const el = previewRef.current;
    const hero = heroRef.current;
    if (!el || !hero) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.transform = `perspective(1200px) rotateY(${x * -4}deg) rotateX(${y * 4}deg)`;
    };

    const onMouseLeave = () => {
      el.style.transform = 'perspective(1200px) rotateY(-2deg) rotateX(1deg)';
      el.style.transition = 'transform 0.6s ease-out';
      setTimeout(() => { el.style.transition = ''; }, 600);
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-shell relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="site-container relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-2xl">
          <div className="status-chip mb-7">
            <span className="status-dot" />
            <span>STATUS: UNDETECTED</span>
            <span className="text-white/20">/</span>
            <span className="text-brand-primary">214 DAYS</span>
          </div>

          <h1 className="display-title text-[clamp(4rem,9vw,8.75rem)] leading-[0.85]">
            Own every
            <span className="block text-brand-primary">wipe.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
            Dominate every server, win every fight, and clear out entire monuments with our premium, stream-safe undetected Rust suite.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollTo('pricing')} className="primary-button group">
              <span>Get instant access</span>
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo('cheat-ui')} className="secondary-button">
              <Play size={14} fill="currentColor" />
              <span>Explore the suite</span>
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5 text-xs text-white/48">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-brand-primary" />
              <strong className="font-semibold text-white/88">99.9%</strong> undetected
            </span>
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-primary">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}
              </span>
              <strong className="font-semibold text-white/88">4.9</strong> · 12k reviews
            </span>
          </div>
        </div>

        <div ref={previewRef} className="preview-frame" style={{ transform: 'perspective(1200px) rotateY(-2deg) rotateX(1deg)' }}>
          <div className="preview-topbar">
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span>LIVE VIEWPORT / RUST</span>
            </div>
            <span>240 FPS · 14 MS</span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-black">
            <img src={rustHuntingBow} alt="Official Rust gameplay showing a player aiming a hunting bow" className="h-full w-full object-cover" />
            <div className="preview-vignette" />

            <EspTarget config={config} className="left-[48.7%] top-[57.5%] h-[20%] w-[4.4%]" name="HAZMAT_CHAD" distance="28M" health="86%" weapon="CROSSBOW" />
            <AimIndicator enabled size={fovSize} className="left-1/2 top-1/2" />

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              Preview stream active
            </div>
          </div>
          <div className="preview-caption">
            <span>OFFICIAL RUST MEDIA</span>
            <span>FRONTEND OVERLAY PREVIEW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
