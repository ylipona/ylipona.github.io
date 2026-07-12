import { useEffect, useState } from 'react';
import { Menu, ShieldCheck, X } from 'lucide-react';

const links = [
  ['features', 'Capabilities'],
  ['cheat-ui', 'Live preview'],
  ['pricing', 'Access'],
  ['faq', 'FAQ'],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header id="navbar-header" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/8 bg-[#0a0908]/90 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="site-container flex h-20 items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand-primary/35 bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-black"><ShieldCheck size={18} /></span>
          <span className="text-left">
            <strong className="block font-display text-sm font-bold tracking-[0.16em]">VANTA</strong>
            <small className="block font-mono text-[8px] tracking-[0.22em] text-white/38">RUST SUITE</small>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([id, label]) => <button key={id} onClick={() => goTo(id)} className="nav-link">{label}</button>)}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/40"><span className="status-dot" />SYSTEM ONLINE</span>
          <button onClick={() => goTo('pricing')} className="nav-cta">Get access</button>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-[#0a0908]/98 px-5 py-5 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([id, label]) => <button key={id} onClick={() => goTo(id)} className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">{label}</button>)}
          </div>
        </nav>
      )}
    </header>
  );
}
