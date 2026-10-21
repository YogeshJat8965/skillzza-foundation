import { useLayoutEffect, useRef, useState } from 'react';
import { logoFull } from '../brand/logos';
import Petals from '../brand/Petals';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { markReady } from '../../lib/ready';
import { startScroll, stopScroll } from '../../lib/scroll';
import './preloader.css';

const SEEN = 'skz-intro-seen';

// Decided once per page load: the intro plays on the first visit of a session only.
const PLAY = (() => {
  if (prefersReducedMotion()) return false;
  try {
    if (sessionStorage.getItem(SEEN)) return false;
    sessionStorage.setItem(SEEN, '1');
  } catch {
    // Storage blocked (private mode etc.) - still play the intro.
  }
  return true;
})();

// Petals bloom, become the logo, and the logo flies into its place in the navbar.
export default function Preloader() {
  const [playing, setPlaying] = useState(PLAY);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!playing) {
      markReady();
      return;
    }
    const root = rootRef.current;
    const html = document.documentElement;
    html.classList.add('is-preloading');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    stopScroll();

    const finish = () => {
      html.classList.remove('is-preloading');
      startScroll();
      markReady();
      setPlaying(false);
    };

    const ctx = gsap.context(() => {
      const logo = root.querySelector('.pl-logo');
      gsap
        .timeline({ delay: 0.8 })
        .to('.pl-petals', { scale: 0.45, opacity: 0, duration: 0.35, ease: 'power3.in' })
        .fromTo(
          logo,
          { opacity: 0, scale: 0.86, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' },
          '-=0.12',
        )
        .add(() => {
          const target = document.getElementById('nav-logo').getBoundingClientRect();
          const from = logo.getBoundingClientRect();
          gsap.to(logo, {
            x: target.left - from.left,
            y: target.top - from.top,
            scale: target.height / from.height,
            transformOrigin: '0 0',
            duration: 0.85,
            ease: 'expo.inOut',
          });
          // The hero starts its entrance while the curtain lifts.
          gsap.delayedCall(0.3, markReady);
          gsap.to('.pl-bg', { opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.inOut', onComplete: finish });
        }, '+=0.15');
    }, root);

    return () => {
      ctx.revert();
      html.classList.remove('is-preloading');
    };
  }, [playing]);

  if (!playing) return null;
  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="pl-bg" />
      <div className="pl-center">
        <Petals className="pl-petals" />
        <img className="pl-logo" {...logoFull} sizes="(max-width: 540px) 80vw, 460px" alt="" />
      </div>
    </div>
  );
}
