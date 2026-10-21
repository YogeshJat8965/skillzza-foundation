import { useEffect } from 'react';
import { finePointer, prefersReducedMotion } from '../lib/motion';
import { scrollToId } from '../lib/scroll';
import { starBurst } from '../lib/burst';

// Page-wide behaviour wired once: reveal-on-scroll, in-page links, button feedback, magnetic CTAs.
export function useGlobalInteractions() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    observe();
    let queued = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(observe);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const burst = e.target.closest('[data-burst]');
      if (burst && !prefersReducedMotion()) {
        const r = burst.getBoundingClientRect();
        const fromKeyboard = e.detail === 0;
        starBurst(fromKeyboard ? r.left + r.width / 2 : e.clientX, fromKeyboard ? r.top + r.height / 2 : e.clientY);
      }
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      if (id) scrollToId(id, { focus: link.dataset.focus });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let current = null;
    const reset = (el) => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };
    const onMove = (e) => {
      const el = e.target.closest?.('[data-magnetic]');
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - (r.left + r.width / 2)) * 0.22).toFixed(1)}px`);
      el.style.setProperty('--my', `${((e.clientY - (r.top + r.height / 2)) * 0.32).toFixed(1)}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
