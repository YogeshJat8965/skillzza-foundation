import { useEffect, useRef, useState } from 'react';
import { PiBooksDuotone, PiBriefcaseDuotone, PiRocketLaunchDuotone } from 'react-icons/pi';
import { hero } from '../../data/content';
import { finePointer, prefersReducedMotion } from '../../lib/motion';
import { onReady } from '../../lib/ready';
import Petals from '../brand/Petals';
import Star from '../brand/Star';
import Photo from '../ui/Photo';
import { Button } from '../ui/primitives';
import './hero.css';

const JOURNEY = [
  { Icon: PiBooksDuotone, accent: 'blue' },
  { Icon: PiBriefcaseDuotone, accent: 'orange' },
  { Icon: PiRocketLaunchDuotone, accent: 'red' },
];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const visualRef = useRef(null);

  useEffect(() => onReady(() => setReady(true)), []);

  // Petals, star and photos drift gently against the pointer (desktop only).
  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    const el = visualRef.current;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', ((e.clientX - (r.left + r.width / 2)) / window.innerWidth).toFixed(3));
        el.style.setProperty('--py', ((e.clientY - (r.top + r.height / 2)) / window.innerHeight).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className={`hero ${ready ? 'is-in' : ''}`} aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container-x hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            {hero.headline.map((word, i) => (
              <span key={word} className="hero-line split-word">
                <span style={{ '--w': i * 2, '--base-delay': '80ms' }}>
                  {word.slice(0, -1)}
                  <span className={`hero-stop stop-${i}`}>.</span>
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub" style={{ '--i': 0 }}>
            {hero.subheading}
          </p>
          <p className="hero-body" style={{ '--i': 1 }}>
            {hero.body}
          </p>
          <div className="hero-ctas" style={{ '--i': 2 }}>
            <Button href="#get-involved" magnetic>
              {hero.primaryCta}
            </Button>
            <Button href="#donate" variant="outline" sparkle magnetic>
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div ref={visualRef} className="hero-visual">
          <div className="hero-petals-wrap" aria-hidden="true">
            <Petals className="hero-petals" />
          </div>
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-photo-wrap">
            <div className="hero-photo leaf">
              <Photo id="hero" priority sizes="(min-width: 1024px) 44vw, 92vw" />
            </div>
          </div>
          <div className="hero-star" aria-hidden="true">
            <Star className="hero-star-svg" />
          </div>
          <div className="hero-orb" aria-hidden="true">
            <div className="hero-orb-inner">
              <Photo id="story-learn" sizes="150px" alt="" />
            </div>
          </div>
          <div className="hero-journey" aria-hidden="true">
            <div className="hero-journey-inner">
              {JOURNEY.map(({ Icon, accent }, i) => (
                <span key={accent} className="contents">
                  {i > 0 && <span className="hj-line" />}
                  <span className={`hj-node accent-${accent}`}>
                    <Icon />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
