import { useEffect, useRef, useState } from 'react';
import { hero } from '../../data/content';
import { onReady } from '../../lib/ready';
import Photo from '../ui/Photo';
import { Button } from '../ui/primitives';
import './hero.css';

// The journey in three real moments: school, a first job, an enterprise of her own.
const COLLAGE = [
  { image: 'scholar', accent: 'blue' },
  { image: 'prog-her-rise', accent: 'orange' },
  { image: 'women-livelihood', accent: 'red' },
];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => onReady(() => setReady(true)), []);

  // The entrance replays whenever the hero comes back into view after being scrolled away.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" ref={sectionRef} className={`hero ${ready && visible ? 'is-in' : ''}`} aria-labelledby="hero-title">
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

        <div className="hero-visual">
          <span className="hero-visual-glow" aria-hidden="true" />
          {COLLAGE.map((tile, i) => (
            <figure key={tile.image} className={`hero-tile hero-tile-${i} accent-${tile.accent}`} style={{ '--i': i }}>
              <Photo id={tile.image} priority={i === 0} sizes={i === 0 ? '(min-width: 1024px) 44vw, 92vw' : '(min-width: 1024px) 22vw, 46vw'} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
