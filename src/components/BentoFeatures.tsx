import { memo, useState } from 'react';
import { Check, Cpu, MoveHorizontal, ShieldCheck, Zap } from 'lucide-react';
import { AIM_HIGHLIGHTS, SYSTEM_STATISTICS } from '../data';
import rustHazmat from '../assets/images/rust-hazmat.jpg';
import rustRaid from '../assets/images/rust-raid.jpg';
import rustBases from '../assets/images/rust-bases.jpg';

function BentoFeatures() {
  const [split, setSplit] = useState(66);

  return (
    <section id="features" className="section-shell" aria-labelledby="features-heading">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">CORE CAPABILITIES</span>
            <h2 id="features-heading">BEYOND STANDARD INJECTIONS</h2>
          </div>
          <p>VANTA deploys at the hypervisor ring, completely separate from the operating system registry. No performance impact, no detection footprint.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="surface-card relative overflow-hidden p-7 sm:p-9 lg:col-span-7">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="card-kicker">COMBAT_AIM_ENGINE</span>
                <span className="icon-tile"><Cpu size={18} /></span>
              </div>
              <h3 className="card-title">ADAPTIVE VECTOR ANGLING</h3>
              <p className="card-copy mt-4">Bypass traditional client mouse hook captures. VANTA streams sub-pixel coordinates directly to the virtual HID driver layer, creating perfectly smooth tracking lines that imitate actual human hand ergonomics.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {AIM_HIGHLIGHTS.map((highlight) => (
                  <li key={highlight} className="feature-point"><Check size={13} />{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-5 font-mono text-[9px] tracking-[0.12em] text-white/58">
              <span>MODULE: AIMBOT_CORE.SYS</span>
              <span className="text-brand-primary">99% RECOIL CONTROL ACTIVE</span>
            </div>
          </article>

          <article className="surface-card p-5 lg:col-span-5">
            <div className="mb-5 flex items-end justify-between gap-4 px-2 pt-2">
              <div>
                <span className="card-kicker">VISUAL_ENGINE_COMPARATIVE</span>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.03em]">INTERACTIVE ESP SIMULATOR</h3>
              </div>
              <MoveHorizontal size={18} className="text-brand-primary" />
            </div>

            <div className="comparison-frame relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black">
              <img src={rustHazmat} alt="Official Rust gameplay showing a hazmat-suited character" width="1500" height="811" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute bottom-3 right-3 z-10 rounded bg-black/65 px-2 py-1 font-mono text-[8px] tracking-wider text-white/70">STANDARD CLIENT</span>

              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                <div className="absolute inset-0 bg-brand-primary/5" />
                <div className="esp-target absolute left-[50.7%] top-[49%] h-[45%] w-[9.5%] -translate-x-1/2 -translate-y-1/2">
                  <div className="esp-frame absolute inset-0">
                    <i className="esp-corner esp-corner-tl" />
                    <i className="esp-corner esp-corner-tr" />
                    <i className="esp-corner esp-corner-bl" />
                    <i className="esp-corner esp-corner-br" />
                  </div>
                  <span className="esp-tag esp-tag-name">ROOF_CAMPER / 28M</span>
                  <span className="esp-health"><span style={{ height: '86%' }} /></span>
                  <span className="esp-tag esp-tag-weapon">TORCH</span>
                </div>
                <span className="absolute bottom-3 left-3 rounded border border-brand-primary/40 bg-black/65 px-2 py-1 font-mono text-[8px] tracking-wider text-brand-primary">VANTA ESP STREAM</span>
              </div>

              <div className="comparison-divider pointer-events-none absolute inset-y-0 z-20 w-px bg-brand-primary" style={{ left: `clamp(1rem, ${split}%, calc(100% - 1rem))` }}>
                <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-primary bg-[#11100f] text-brand-primary"><MoveHorizontal size={13} /></span>
              </div>
              <input aria-label="Compare standard gameplay with overlay preview" aria-valuetext={`${split}% overlay preview`} type="range" min="0" max="100" value={split} onChange={(event) => setSplit(Number(event.target.value))} className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0" />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-center font-mono text-[9px] tracking-wider text-white/58"><Zap size={11} className="text-brand-primary" />DRAG TO COMPARE THE LIVE PREVIEW</p>
          </article>

          <article className="image-card lg:col-span-5">
            <img src={rustBases} alt="Official Rust media showing player-built bases" width="1500" height="844" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="image-card-shade" />
            <div className="relative z-10 mt-auto p-7">
              <span className="card-kicker">SECURITY_DRIVER_STEALTH</span>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">HYPERVISOR HWID SPOOFER</h3>
              <p className="mt-3 text-xs leading-6 text-white/60">Our complete Ring-0 security driver hooks beneath Windows registry diagnostic layers at boot, modifying hardware serialization tables dynamically on the fly. Permanent hardware bans are officially obsolete.</p>
              <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[8px] tracking-wider text-white/60">
                <span className="mini-stat">ANTICHEAT<br /><b>BYPASSED</b></span>
                <span className="mini-stat">HWID<br /><b>SPOOFED</b></span>
                <span className="mini-stat">SESSION<br /><b>PROTECTED</b></span>
              </div>
            </div>
          </article>

          <article className="surface-card relative overflow-hidden lg:col-span-7">
            <img src={rustRaid} alt="Official Rust media showing a base raid" width="1500" height="844" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-28" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12110f] via-[#12110f]/95 to-[#12110f]/45" />
            <div className="relative z-10 p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="card-kicker">WEAPON_INTELLIGENCE</span>
                <span className="icon-tile"><ShieldCheck size={18} /></span>
              </div>
              <h3 className="card-title mt-8">SHARED SCRIPT CONFIGS</h3>
              <p className="card-copy mt-4 max-w-xl">Instantly load community-made script configurations tailored for specific weapons and attachments. Enjoy dynamic humanization algorithms that vary recoil paths slightly to evade automated detection systems.</p>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SYSTEM_STATISTICS.map((stat) => <span key={stat.label} className="mini-stat"><b>{stat.value}</b><small>{stat.label}</small></span>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default memo(BentoFeatures);
