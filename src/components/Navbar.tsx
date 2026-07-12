import { memo, useEffect, useRef, useState } from 'react';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { scrollToElement, scrollToTop } from '../utils/scroll';

const links = [
  ['features', 'Capabilities'],
  ['cheat-ui', 'Live preview'],
  ['pricing', 'Access'],
  ['faq', 'FAQ'],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    desktopQuery.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      desktopQuery.removeEventListener('change', closeOnDesktop);
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);

  const goTo = (id: string) => {
    const moveFocus = open;
    setOpen(false);
    scrollToElement(id, moveFocus);
  };

  return (
    <header ref={headerRef} id="navbar-header" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/8 bg-[#0a0908]/90 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="site-container flex h-20 items-center justify-between">
        <button type="button" onClick={scrollToTop} className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand-primary/35 bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-black"><ShieldCheck size={18} /></span>
          <span className="text-left">
            <strong className="block font-display text-sm font-bold tracking-[0.16em]">VANTA</strong>
            <small className="block font-mono text-[8px] tracking-[0.22em] text-white/58">RUST SUITE</small>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([id, label]) => <button type="button" key={id} onClick={() => goTo(id)} className="nav-link">{label}</button>)}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/58"><span className="status-dot" />SYSTEM ONLINE</span>
          <button type="button" onClick={() => goTo('pricing')} className="nav-cta">Get access</button>
        </div>

        <button ref={menuButtonRef} type="button" onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white transition-colors hover:border-brand-primary/40 hover:text-brand-primary lg:hidden" aria-label="Toggle navigation" aria-controls="mobile-navigation" aria-expanded={open}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav-enter border-t border-white/8 bg-[#0a0908]/98 px-5 py-5 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([id, label]) => <button type="button" key={id} onClick={() => goTo(id)} className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white">{label}</button>)}
          </div>
        </nav>
      )}
    </header>
  );
}

export default memo(Navbar);
