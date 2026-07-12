let activeFrame = 0;

function glideTo(destination: number, onComplete?: () => void) {
  cancelAnimationFrame(activeFrame);
  const start = window.scrollY;
  const distance = destination - start;
  const duration = Math.min(1100, Math.max(650, Math.abs(distance) * 0.42));
  const startedAt = performance.now();
  document.documentElement.classList.add('is-page-gliding');

  const animate = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) {
      activeFrame = requestAnimationFrame(animate);
      return;
    }
    document.documentElement.classList.remove('is-page-gliding');
    activeFrame = 0;
    onComplete?.();
  };
  activeFrame = requestAnimationFrame(animate);
}

export function scrollToElement(id: string, moveFocus = false) {
  const target = document.getElementById(id);
  if (!target) return;
  const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 76);
  glideTo(destination, () => {
    if (!moveFocus) return;
    const heading = target.matches('h1, h2') ? target : target.querySelector<HTMLElement>('h1, h2');
    if (!(heading instanceof HTMLElement)) return;
    const hadTabIndex = heading.hasAttribute('tabindex');
    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    if (!hadTabIndex) heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
  });
}

export function scrollToTop() {
  glideTo(0);
}
