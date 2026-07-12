import { useState, useEffect, useRef } from 'react';
import { Download, ShieldAlert, CheckCircle2, X, Terminal, Cpu, Check, Play, Zap } from 'lucide-react';
import { Plan } from '../types';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [downloadStep, setDownloadStep] = useState<'idle' | 'downloading' | 'verifying' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);
  const pctRef = useRef<HTMLSpanElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const spinAngleRef = useRef(0);

  // Define a single unified plan configuration
  const unifiedPlan: Plan = {
    id: 'vanta-all-in-one',
    name: 'Vanta Premium Rust Suite',
    price: 'FREE',
    period: 'OPEN-SOURCE RELEASE',
    badge: 'STABLE BUILD v10.4',
    features: [
      'Perfect Recoil Compensation (AK-47, Thompson, SAR, MP5, custom curves)',
      'Advanced Silent Aim & Hitbox Angle Snapping',
      'Real-time Player overlay ESP (Skeletons, 3D boxes, visible-checks)',
      'Loot filters (Sleeping bags, buried stashes, tool cupboards)',
      'Low-level Ring 0 Hypervisor HWID Spoofer (Prevents registry serial bans)',
      'Hardware level TriggerBot with custom delay and bone locks',
      'Polymorphic Compiler Engine (Each build compiles a unique binary signature)'
    ]
  };

  const handleOpenDownload = () => {
    setSelectedPlan(unifiedPlan);
    setDownloadStep('downloading');
    setProgress(0);
  };

  const handleCloseDownload = () => {
    setSelectedPlan(null);
    setDownloadStep('idle');
  };

  // Smooth continuous progress simulation
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

      setProgress(pct);
      if (pctRef.current) pctRef.current.textContent = `${pct}%`;
      spinAngleRef.current += 2;
      if (spinnerRef.current) spinnerRef.current.style.transform = `rotate(${spinAngleRef.current}deg)`;

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
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

  return (
    <section id="pricing" className="section-shell overflow-hidden">

      <div className="site-container relative z-10">

        {/* Section Header */}
        <div className="section-heading mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/30 px-3.5 py-1 rounded-full mb-4">
            <Terminal size={12} className="text-brand-primary" />
            <span>SECURE LOADER INSTANT ACCESS</span>
          </div>
          <h2 className="mx-auto">
            POLYMORPHIC BUILD LOADER
          </h2>
          <p className="mx-auto">
            Our premium kernel software modules are compiled on-demand and free of charge. No trials, no payments. Download your complete unified suite instantly.
          </p>
        </div>

        {/* SINGLE UNIFIED DOWNLOAD CONTAINER */}
        <div className="surface-card mx-auto max-w-4xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">

            {/* Left half: Detailed contents (Col Span 7) */}
            <div className="p-8 md:p-10 md:col-span-7 border-b md:border-b-0 md:border-r border-brand-border flex flex-col justify-between">
              <div>
                <span className="eyebrow block mb-2">UNIFIED SUITE CONTENTS</span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-6">
                  {unifiedPlan.name}
                </h3>

                <ul className="space-y-4">
                  {unifiedPlan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-xs sm:text-sm text-white/60">
                      <div className="w-4 h-4 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-brand-primary" />
                      </div>
                      <span className="leading-tight font-light">{feat}</span>
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

            {/* Right half: Single massive Call-To-Action (Col Span 5) */}
            <div className="p-8 md:p-10 md:col-span-5 bg-brand-bg/40 flex flex-col justify-between text-center md:text-left">

              <div className="space-y-4">
                <div className="inline-block bg-brand-primary/12 text-brand-primary font-mono text-[9px] tracking-wider font-bold px-3 py-1 rounded border border-brand-primary/25">
                  {unifiedPlan.badge}
                </div>

                <div className="border-b border-brand-border pb-6">
                  <span className="font-mono text-xs text-white/50 block uppercase mb-1">DOWNLOAD TIER</span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="font-mono text-5xl font-bold text-brand-primary tracking-tight">{unifiedPlan.price}</span>
                    <span className="font-mono text-xs text-white/45 uppercase">/ {unifiedPlan.period}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-white/55 text-left leading-relaxed py-2 font-light">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Instant Admin Bypass Mode</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Polymorphic dynamic protection</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    <span>Anti-cheat bypass signatures</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
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

        {/* Security / Driver guarantees footer */}
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
            <span className="font-mono text-[9px] text-white/50 mt-1 block">STANDALONE ZIP CLIENT</span>
          </div>
        </div>

      </div>

      {/* --- SECURE DOWNLOADSIMULATOR OVERLAY MODAL --- */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">

          <div className="surface-card w-full max-w-lg overflow-hidden relative">

            {/* Close button */}
            <button
              onClick={handleCloseDownload}
              className="absolute top-4 right-4 p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Close download dialog"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div className="bg-brand-bg/60 border-b border-brand-border px-6 py-4">
              <span className="font-mono text-[9px] text-brand-primary tracking-widest font-bold flex items-center gap-1">
                <Cpu size={10} className="text-brand-primary" />
                VANTA DOWNLOAD
              </span>
              <h4 className="font-display font-bold text-sm text-white uppercase mt-0.5">DOWNLOADING SECURE CLIENT LOADER</h4>
            </div>

            {/* STEP 1 & 2: DOWNLOADING AND GENERATING STATUS */}
            {(downloadStep === 'downloading' || downloadStep === 'verifying') && (
              <div className="p-6 space-y-6">

                <div className="space-y-2 text-center py-4">
                  <div className="relative inline-flex items-center justify-center">
                    <div ref={spinnerRef} className="h-14 w-14 rounded-full border-[3px] border-white/10 border-t-brand-primary" />
                    <span ref={pctRef} className="absolute font-mono text-[10px] text-white font-bold">{progress}%</span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs text-white uppercase block font-bold">
                      {downloadStep === 'downloading' ? 'CHECKING FOR UPDATES' : 'VERIFYING'}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-brand-bg rounded-full h-2.5 overflow-hidden border border-brand-border">
                  <div
                    className="bg-brand-primary h-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: LOADER COMPLETED AND READY TO EXTRACT */}
            {downloadStep === 'ready' && (
              <div className="p-6 space-y-6">

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

                {/* Tactical Installation Checklist */}
                <div className="text-left bg-brand-bg/60 border border-brand-border p-4 rounded space-y-2.5 font-mono text-[10px] text-white/55">
                  <span className="text-white block font-bold border-b border-brand-border pb-1.5 flex items-center gap-1.5">
                    <Play size={10} className="text-brand-primary" />
                    RUST SUITE INJECTION STEPS:
                  </span>
                  <div className="flex gap-2">
                    <span className="text-brand-primary font-bold">01.</span>
                    <span>Turn off antivirus and run as administrator.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-primary font-bold">02.</span>
                    <span>Run <span className="text-white font-bold bg-brand-primary/12 px-1 rounded">Vanta_Launcher.exe</span> as Administrator prior to opening Rust.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-primary font-bold">03.</span>
                    <span>Launch Rust. The stream-safe overlay interface will automatically load in the background.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-primary font-bold">04.</span>
                    <span>Press the <span className="text-white font-bold bg-brand-primary/12 px-1.5 py-0.5 rounded border border-brand-primary/25">[Insert]</span> key in-game to configure overlay parameters instantly.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="flex-1 bg-brand-primary text-brand-bg text-center py-3 rounded-[.7rem] font-display font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    <span>DOWNLOAD</span>
                  </a>
                  <button
                    onClick={handleCloseDownload}
                    className="px-5 border border-white/13 bg-white/5 text-white/80 py-3 rounded-[.7rem] font-display font-bold text-xs tracking-wider uppercase hover:border-white/32 hover:text-white transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
