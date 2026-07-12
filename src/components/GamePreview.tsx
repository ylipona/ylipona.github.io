import { Cpu, Eye, Radio } from 'lucide-react';
import rustScientists from '../assets/images/rust-scientists.jpg';
import type { CheatConfig } from '../types';
import { AimIndicator, EspTarget } from './OverlayElements';

interface GamePreviewProps {
  config: CheatConfig;
}

export default function GamePreview({ config }: GamePreviewProps) {
  const fovSize = Math.round(Math.max(56, Math.min(118, config.aimFov * 0.62)));

  return (
    <div className="preview-frame">
      <div className="preview-topbar">
        <div className="flex items-center gap-2">
          <span className="status-dot" />
          <span>VANTA HYPERVISOR ESP STREAM</span>
        </div>
        <span className="hidden items-center gap-1.5 sm:flex"><Cpu size={11} /> RING 0 / ACTIVE</span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <img src={rustScientists} alt="Official Rust gameplay in an industrial interior" width="1500" height="844" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="preview-vignette" />
        <div className="scanline-overlay" />

        <div className="absolute left-4 top-4 z-20 hidden rounded-lg border border-white/10 bg-black/55 p-2.5 backdrop-blur-md sm:block">
          <div className="radar-display relative grid h-16 w-16 place-items-center rounded-full border border-brand-primary/35">
            <span className="absolute h-10 w-10 rounded-full border border-brand-primary/15" />
            <span className="absolute h-px w-full bg-brand-primary/15" />
            <span className="absolute h-full w-px bg-brand-primary/15" />
            <span className="radar-dot h-1.5 w-1.5 rounded-full bg-brand-primary" />
            <span className="radar-contact absolute right-3 top-5 h-1.5 w-1.5 rounded-full bg-brand-primary" title="NAKED_REVENGE" />
            <span className="radar-contact radar-contact-secondary absolute left-[46%] top-[28%] h-1.5 w-1.5 rounded-full bg-brand-primary" title="GRUB_WITH_DB" />
          </div>
          <span className="mt-1.5 block text-center font-mono text-[8px] tracking-widest text-white/58">RADAR / 50M</span>
        </div>

        <EspTarget config={config} className="left-[51.3%] top-[52%] h-[20%] w-[4.6%]" name="GRUB_WITH_DB" distance="32M" health="84%" weapon="MP5" />
        <EspTarget config={config} className="left-[73.5%] top-[58.2%] h-[20.5%] w-[5%]" name="NAKED_REVENGE" distance="41M" health="100%" weapon="LR-300" />

        {config.espSnaplines && (
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <line x1="50%" y1="50%" x2="51.3%" y2="52%" stroke="var(--color-brand-primary)" strokeOpacity=".46" strokeDasharray="3 6" />
            <line x1="50%" y1="50%" x2="73.5%" y2="58.2%" stroke="var(--color-brand-primary)" strokeOpacity=".46" strokeDasharray="3 6" />
          </svg>
        )}

        <AimIndicator enabled={config.aimEnabled} size={fovSize} className="left-1/2 top-1/2" />

        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] text-white/65 backdrop-blur-md">
          <Eye size={11} className="text-brand-primary" /> TARGET: {config.aimBone.toUpperCase()}
        </div>
        <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-2 rounded-md border border-white/10 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] text-white/65 backdrop-blur-md sm:flex">
          <Radio size={11} className="text-brand-primary" /> SMOOTHING: {config.aimSmoothing}
        </div>
      </div>

      <div className="preview-caption">
        <span>OFFICIAL RUST MEDIA</span>
        <span>240 FPS · 14 MS · DIRECTX 12</span>
      </div>
    </div>
  );
}
