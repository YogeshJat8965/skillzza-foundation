import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis = null;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  if (document.documentElement.classList.contains('is-preloading')) lenis.stop();
  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function stopScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
}

export function startScroll() {
  lenis?.start();
  document.documentElement.style.overflow = '';
}

// Scroll to a section and tell it what to spotlight once it is on screen.
export function scrollToId(id, { focus } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === 'top' ? 0 : -parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset'));
  const done = () => {
    if (el.hasAttribute('tabindex')) el.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent('skz:focus', { detail: { section: id, focus, arrived: true } }));
  };
  window.dispatchEvent(new CustomEvent('skz:focus', { detail: { section: id, focus, arrived: false } }));
  if (lenis) {
    lenis.scrollTo(id === 'top' ? 0 : el, { offset, duration: 1.4, onComplete: done });
  } else {
    const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    setTimeout(done, prefersReducedMotion() ? 0 : 700);
  }
}
