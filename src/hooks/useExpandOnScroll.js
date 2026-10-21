import { useLayoutEffect } from 'react';
import { gsap } from '../lib/motion';
import { useMediaQuery, useReducedMotion } from './useMediaQuery';

// Dark "stage" sections grow from a rounded card to full bleed as they enter, and settle back as they leave.
export function useExpandOnScroll(ref) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const from = { scale: wide ? 0.93 : 0.96, borderRadius: wide ? 56 : 32 };
    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        scale: 1,
        borderRadius: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true },
      });
      gsap.to(el, {
        ...from,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'bottom 70%', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, [ref, reduced, wide]);
}
