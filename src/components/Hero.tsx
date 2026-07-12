import { useEffect, useRef } from 'react';
import { ChevronRight, Play, ShieldCheck, Star } from 'lucide-react';
import rustHuntingBow from '../assets/images/rust-huntingbow.jpg';
import type { CheatConfig } from '../types';
import { scrollToElement } from '../utils/scroll';
import { AimIndicator, EspTarget } from './OverlayElements';

interface HeroProps {
  config: CheatConfig;
}

export default function Hero({ config }: HeroProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fovSize = Math.round(Math.max(58, Math.min(104, config.aimFov * 0.52)));

  useEffect(() => {
    const el = previewRef.current;
    const hero = heroRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!el || !hero || !finePointer) return;

    let animationFrame = 0;
    let resetTimer = 0;
    let tiltX = 1;
    let tiltY = -2;
    let bounds = hero.getBoundingClientRect();

    const renderTilt = () => {
      el.style.transform = `perspective(1200px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;
      animationFrame = 0;
    };

    const updateBounds = () => {
      bounds = hero.getBoundingClientRect();
    };

    const onPointerMove = (event: PointerEvent) => {
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      tiltX = y * 4;
      tiltY = x * -4;
      el.classList.remove('is-resetting');
      window.clearTimeout(resetTimer);
      if (!animationFrame) animationFrame = requestAnimationFrame(renderTilt);
    };

    const onPointerLeave = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      tiltX = 1;
      tiltY = -2;
      el.classList.add('is-resetting');
      renderTilt();
      resetTimer = window.setTimeout(() => el.classList.remove('is-resetting'), 600);
    };

    hero.addEventListener('pointerenter', updateBounds);
    hero.addEventListener('pointermove', onPointerMove);
    hero.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });
    return () => {
      hero.removeEventListener('pointerenter', updateBounds);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-shell relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40" aria-labelledby="hero-heading">
      <div className="site-container relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-2xl">
          <div className="status-chip mb-7">
            <span className="status-dot" />
            <span>STATUS: UNDETECTED</span>
            <span className="text-white/20">/</span>
            <span className="text-brand-primary">214 DAYS</span>
          </div>

          <h1 id="hero-heading" className="display-title text-[clamp(4rem,9vw,8.75rem)] leading-[0.85]">
            Own every
            <span className="block text-brand-primary">wipe.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
            Dominate every server, win every fight, and clear out entire monuments with our premium, stream-safe undetected Rust suite.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToElement('pricing')} className="primary-button group">
              <span>Get instant access</span>
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => scrollToElement('cheat-ui')} className="secondary-button">
              <Play size={14} fill="currentColor" />
              <span>Explore the suite</span>
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-brand-primary" />
              <strong className="font-semibold text-white/88">99.9%</strong> undetected
            </span>
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-primary" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}
              </span>
              <strong className="font-semibold text-white/88">4.9</strong> · 12k reviews
            </span>
          </div>
        </div>

        <div ref={previewRef} className="hero-tilt min-w-0">
          <div className="preview-frame">
            <div className="preview-topbar">
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span>LIVE VIEWPORT / RUST</span>
              </div>
              <span>240 FPS · 14 MS</span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <img src={rustHuntingBow} alt="Official Rust gameplay showing a player aiming a hunting bow" width="1500" height="844" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
              <div className="preview-vignette" />

              <EspTarget config={config} className="left-[48.7%] top-[57.5%] h-[20%] w-[4.4%]" name="WIPEDAY_RAT" distance="28M" health="86%" weapon="CROSSBOW" />
              <AimIndicator enabled={config.aimEnabled} size={fovSize} className="left-1/2 top-1/2" />

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
      </div>
    </section>
  );
}
