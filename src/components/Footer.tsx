import { memo } from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { scrollToElement, scrollToTop } from '../utils/scroll';

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#080706] py-12">
      <div className="site-container">
        <div className="grid gap-10 border-b border-white/8 pb-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand-primary/30 bg-brand-primary/10 text-brand-primary"><ShieldCheck size={18} /></span>
              <span><strong className="block font-display text-sm tracking-[0.15em]">VANTA SUITE</strong><small className="font-mono text-[9px] tracking-[.18em] text-white/58">SIGNATURE STACK ONLINE</small></span>
            </div>
            <p className="mt-5 text-xs leading-6 text-white/55">Premium community-powered hypervisor loader and ESP configuration suite designed strictly for Rust security audits and solo survivalists. Bypasses standard registry telemetry checks.</p>
          </div>

          <div>
            <span className="card-kicker">CAPABILITIES</span>
            <div className="mt-4 flex flex-col items-start gap-3 font-mono text-[11px] tracking-wider text-white/58">
              <button type="button" onClick={() => scrollToElement('features')} className="transition-colors hover:text-white">RECOIL_MASTERY</button>
              <button type="button" onClick={() => scrollToElement('features')} className="transition-colors hover:text-white">VISUAL_OVERLAY</button>
              <button type="button" onClick={() => scrollToElement('cheat-ui')} className="transition-colors hover:text-white">HWID_PROTECTION</button>
            </div>
          </div>

          <div>
            <span className="card-kicker">RECONNAISSANCE</span>
            <div className="mt-4 flex flex-col items-start gap-3 font-mono text-[11px] tracking-wider text-white/58">
              <button type="button" onClick={() => scrollToElement('pricing')} className="transition-colors hover:text-white">COMMUNITY_LOADER</button>
              <button type="button" onClick={() => scrollToElement('faq')} className="transition-colors hover:text-white">TECHNICAL_FAQ</button>
              <button type="button" onClick={() => scrollToElement('navbar-header')} className="transition-colors hover:text-white">VIP_LAUNCHER</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <span className="font-mono text-[9px] font-semibold tracking-[.15em] text-white/58">TRADEMARK DISCLAIMER</span>
            <p className="mt-2 text-[11px] leading-5 text-white/58">VANTA is fully detached from, and in no way associated with, Facepunch Studios, Steam, Easy Anti-Cheat, or any of their licensed software, intellectual properties, or registered trademarks.</p>
          </div>
          <button type="button" onClick={scrollToTop} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 text-white/55 transition-colors hover:border-brand-primary/45 hover:text-brand-primary" aria-label="Scroll to top"><ArrowUp size={16} /></button>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/8 pt-6 font-mono text-[10px] tracking-wider text-white/58 sm:flex-row sm:justify-between">
          <span>© 2026 VANTA RUST SUITE GROUP. ALL RIGHTS RESERVED.</span>
          <span className="text-brand-primary/70">VANTA CLOUD NODE :: ATLANTA, GA</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
