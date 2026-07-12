import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, ShieldAlert, CheckCircle2, X, Terminal, Cpu, Check, Play, Zap } from 'lucide-react';

const UNIFIED_PLAN = {
  name: 'Vanta Premium Rust Suite',
  price: 'FREE',
  period: 'FOREVER',
  badge: 'STABLE BUILD v10.4',
  features: [
    'Precision Aimbot', 'Player ESP', 'No Recoil', 'Weapon Modifiers',
    'Hitbox Expander', 'Silent Aim', 'Adjustable Triggerbot', 'FOV & Smoothing',
    'Loot ESP', 'Health & Weapon Tags', 'Skeletons & Snaplines', 'Stream-Safe Overlay',
    'System Monitor', 'HWID Protection', 'Theme Config', 'Skin Changer — Soon',
  ],
} as const;

function Pricing() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadStep, setDownloadStep] = useState<'idle' | 'downloading' | 'verifying' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenDownload = () => {
    setIsDownloadOpen(true);
    setDownloadStep('downloading');
    setProgress(0);
  };

  const handleCloseDownload = () => {
    setIsDownloadOpen(false);
    setDownloadStep('idle');
  };

  useEffect(() => {
    if (downloadStep !== 'downloading') return;

    const duration = 5000;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      const pct = Math.round(eased * 100);

      setProgress((current) => current === pct ? current : pct);
      if (raw < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setDownloadStep('verifying');
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [downloadStep]);

  useEffect(() => {
    if (downloadStep === 'verifying') {
      const timer = setTimeout(() => {
        setDownloadStep('ready');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [downloadStep]);

  useEffect(() => {
    if (!isDownloadOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : openButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById('root');
    const hadInert = appRoot?.hasAttribute('inert') ?? false;
    document.body.style.overflow = 'hidden';
    appRoot?.setAttribute('inert', '');

    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsDownloadOpen(false);
        setDownloadStep('idle');
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!hadInert) appRoot?.removeAttribute('inert');
      previousFocus?.focus();
    };
  }, [isDownloadOpen]);

  return (
    <>
    <section id="pricing" className="section-shell overflow-hidden" aria-labelledby="pricing-heading">

      <div className="site-container relative z-10">

        <div className="section-heading mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/30 px-3.5 py-1 rounded-full mb-4">
            <Terminal size={12} className="text-brand-primary" />
            <span>SECURE LOADER INSTANT ACCESS</span>
          </div>
          <h2 id="pricing-heading" className="mx-auto">
            POLYMORPHIC BUILD LOADER
          </h2>
          <p className="mx-auto">
            Our premium kernel software modules are compiled on-demand and free of charge. No trials, no payments. Download your complete unified suite instantly.
          </p>
        </div>

        <div className="surface-card mx-auto max-w-4xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">

            <div className="p-8 md:p-10 md:col-span-7 border-b md:border-b-0 md:border-r border-brand-border flex flex-col justify-between">
              <div>
                <span className="eyebrow block mb-2">UNIFIED SUITE CONTENTS</span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-6">
                  {UNIFIED_PLAN.name}
                </h3>

                <ul className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6">
                  {UNIFIED_PLAN.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-wide text-white/68 sm:text-[10px]">
                      <div className="grid h-4 w-4 shrink-0 place-items-center rounded border border-brand-primary/35 bg-brand-primary/10">
                        <Check size={10} strokeWidth={2.5} className="text-brand-primary" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-border flex items-center gap-3">
                <ShieldAlert size={14} className="text-brand-primary shrink-0" />
                <span className="font-mono text-[9px] text-white/50 uppercase leading-relaxed">
                  HWID Spoofer and DX11 overlays are packed directly in a single executable launcher.
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 md:col-span-5 bg-brand-bg/40 flex flex-col justify-between text-center md:text-left">

              <div className="space-y-4">
                <div className="inline-block bg-brand-primary/12 text-brand-primary font-mono text-[9px] tracking-wider font-bold px-3 py-1 rounded border border-brand-primary/25">
                  {UNIFIED_PLAN.badge}
                </div>

                <div className="border-b border-brand-border pb-6">
                  <span className="font-mono text-xs text-white/50 block uppercase mb-1">DOWNLOAD TIER</span>
                  <div className="flex flex-wrap items-baseline justify-center gap-2 md:justify-start">
                    <span className="font-mono text-5xl font-bold text-brand-primary tracking-tight">{UNIFIED_PLAN.price}</span>
                    <span className="font-mono text-xs text-white/55 uppercase">/ {UNIFIED_PLAN.period}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-white/55 text-left leading-relaxed py-2 font-light">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Ready-to-use launcher</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Automatic build protection</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Stream-safe overlay mode</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  ref={openButtonRef}
                  type="button"
                  onClick={handleOpenDownload}
                  className="primary-button group w-full"
                >
                  <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>DOWNLOAD NOW</span>
                </button>
                <span className="flex items-center justify-center gap-1.5 text-center font-mono text-[9px] text-white/50 mt-3 uppercase tracking-wider">
                  <Zap size={10} className="text-brand-primary" />
                  Direct download. 100% Free &amp; Unrestricted.
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="surface-card mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-6 p-5 sm:flex-row">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded bg-brand-primary/12 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white block uppercase">POLYMORPHIC PACKET ENCRYPTION ACTIVE</span>
              <p className="font-sans text-[11px] text-white/55 mt-1 font-light leading-relaxed">
                To guarantee zero-detection streaks, VANTA automatically compiles, mutates, and scrambles each loader download block. Every build file generates a completely unique cryptographic signature.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-mono text-xs text-brand-primary block tracking-wider uppercase font-bold">100% SECURE DIRECT HOST</span>
            <span className="font-mono text-[9px] text-white/50 mt-1 block">STANDALONE EXECUTABLE</span>
          </div>
        </div>

      </div>

    </section>

      {isDownloadOpen && createPortal(
        <div className="download-backdrop fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/95 p-4 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget) handleCloseDownload();
        }}>

          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="download-dialog-title" className="download-dialog surface-card relative w-full max-w-lg overflow-x-hidden overflow-y-auto">

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleCloseDownload}
              className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close download dialog"
            >
              <X size={18} />
            </button>

            <div className="bg-brand-bg/60 border-b border-brand-border px-6 py-4">
              <span className="font-mono text-[9px] text-brand-primary tracking-widest font-bold flex items-center gap-1">
                <Cpu size={10} className="text-brand-primary" />
                VANTA DOWNLOAD
              </span>
              <h4 id="download-dialog-title" className="mt-0.5 pr-10 font-display text-sm font-bold uppercase text-white">DOWNLOADING SECURE CLIENT LOADER</h4>
            </div>

            {(downloadStep === 'downloading' || downloadStep === 'verifying') && (
              <div className="p-6 space-y-6">

                <div className="space-y-2 text-center py-4">
                  <div className="relative inline-flex items-center justify-center">
                    <div className="download-spinner h-14 w-14 rounded-full border-[3px] border-white/10 border-t-brand-primary" />
                    <span className="absolute font-mono text-[10px] font-bold text-white">{progress}%</span>
                  </div>

                  <div className="space-y-1">
                    <span className="block font-mono text-xs font-bold uppercase text-white" role="status" aria-live="polite">
                      {downloadStep === 'downloading' ? 'CHECKING FOR UPDATES' : 'VERIFYING'}
                    </span>
                  </div>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full border border-brand-border bg-brand-bg" role="progressbar" aria-label="Download progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                  <div
                    className="h-full origin-left bg-brand-primary transition-transform duration-75"
                    style={{ transform: `scaleX(${progress / 100})` }}
                  />
                </div>
              </div>
            )}

            {downloadStep === 'ready' && (
              <div className="space-y-6 p-6" aria-live="polite">

                <div className="text-center space-y-3 py-4">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center mx-auto text-brand-primary shadow-[0_0_20px_var(--color-brand-glow)]">
                    <CheckCircle2 size={36} />
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-lg text-white uppercase">VANTA DOWNLOAD READY</h5>
                    <span className="font-sans text-xs text-white/50 block font-light">
                      Vanta is processed and ready for download.
                    </span>
                  </div>
                </div>

                <div className="rounded border border-brand-border bg-brand-bg/60 p-4 text-left font-mono text-[10px] text-white/55">
                  <span className="text-white block font-bold border-b border-brand-border pb-1.5 flex items-center gap-1.5">
                    <Play size={10} className="text-brand-primary" />
                    RUST SUITE INJECTION STEPS:
                  </span>
                  <ol className="mt-2.5 space-y-2.5">
                    <li className="flex gap-2">
                      <span className="font-bold text-brand-primary">01.</span>
                      <span>Turn off antivirus to allow successful injection.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-brand-primary">02.</span>
                      <span>Run <span className="rounded bg-brand-primary/12 px-1 font-bold text-white">Vanta_Launcher.exe</span> as Administrator prior to opening Rust.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-brand-primary">03.</span>
                      <span>Launch Rust. The stream-safe overlay interface will automatically load in the background.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-brand-primary">04.</span>
                      <span>Press the <span className="rounded border border-brand-primary/25 bg-brand-primary/12 px-1.5 py-0.5 font-bold text-white">[Insert]</span> key in-game to configure overlay parameters instantly.</span>
                    </li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-primary text-brand-bg text-center py-3 rounded-[.7rem] font-display font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    <span>DOWNLOAD</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCloseDownload}
                    className="px-5 border border-white/13 bg-white/5 text-white/80 py-3 rounded-[.7rem] font-display font-bold text-xs tracking-wider uppercase hover:border-white/32 hover:text-white transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>,
        document.body,
      )}
    </>
  );
}

export default memo(Pricing);
