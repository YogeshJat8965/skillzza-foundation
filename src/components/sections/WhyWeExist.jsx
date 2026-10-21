import { Fragment, useLayoutEffect, useRef } from 'react';
import { PiBooksDuotone, PiBriefcaseDuotone, PiLightningDuotone, PiRocketLaunchDuotone } from 'react-icons/pi';
import { whyWeExist } from '../../data/content';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion';
import Star from '../brand/Star';
import { Eyebrow, RichText } from '../ui/primitives';
import './why.css';

// School → skills → career → enterprise: a broken path that joins up as you scroll.
const NODES = [
  { x: 40, y: 250, Icon: PiBooksDuotone, accent: 'blue' },
  { x: 230, y: 110, Icon: PiLightningDuotone, accent: 'violet' },
  { x: 420, y: 215, Icon: PiBriefcaseDuotone, accent: 'orange' },
  { x: 560, y: 72, Icon: PiRocketLaunchDuotone, accent: 'red' },
];
const PATH = 'M40 250 C 120 250 150 110 230 110 S 340 215 420 215 S 500 72 560 72';

export default function WhyWeExist() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const artRef = useRef(null);
  const drawRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const nodes = artRef.current.querySelectorAll('.wj-node');
    if (reduced) {
      nodes.forEach((n) => n.classList.add('is-on'));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current.querySelectorAll('.fill-word'),
        { color: '#7f8aa0' },
        {
          color: '#0b2254',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', end: 'bottom 50%', scrub: true },
        },
      );
      const path = drawRef.current;
      const len = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: artRef.current,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: 0.6,
            onUpdate: (self) =>
              nodes.forEach((n, i) => n.classList.toggle('is-on', self.progress >= i / (nodes.length - 1) - 0.03)),
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const words = whyWeExist.title.split(' ');
  return (
    <section id="why-we-exist" ref={sectionRef} className="section-y why" aria-labelledby="why-title">
      <div className="container-x">
        <Eyebrow accent="red">{whyWeExist.eyebrow}</Eyebrow>
        <h2 id="why-title" ref={titleRef} className="why-title">
          {words.map((word, i) => (
            <Fragment key={i}>
              <span className="fill-word">{word}</span>
              {i < words.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h2>

        <div className="why-grid">
          <div ref={artRef} className="why-art" aria-hidden="true">
            <svg viewBox="0 0 600 320" className="why-art-svg">
              <defs>
                <linearGradient id="why-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#0a8ff0" />
                  <stop offset="0.38" stopColor="#7b4bd2" />
                  <stop offset="0.72" stopColor="#ff8a00" />
                  <stop offset="1" stopColor="#e31e24" />
                </linearGradient>
              </defs>
              <path d={PATH} className="why-path-broken" />
              <path ref={drawRef} d={PATH} className="why-path-draw" stroke="url(#why-grad)" />
            </svg>
            {NODES.map(({ x, y, Icon, accent }) => (
              <span key={accent} className={`wj-node accent-${accent}`} style={{ left: `${x / 6}%`, top: `${y / 3.2}%` }}>
                <Icon />
              </span>
            ))}
            <Star className="why-star" />
          </div>

          <div className="why-copy">
            <p className="why-problem" data-reveal>
              <RichText parts={whyWeExist.problem} />
            </p>
            <p className="why-answer" data-reveal style={{ '--i': 1 }}>
              <RichText parts={whyWeExist.answer} />
            </p>
            <ul className="why-pills" data-reveal style={{ '--i': 2 }}>
              {whyWeExist.alignments.map((item, i) => (
                <li key={item} className="why-pill">
                  <span className={`why-pill-dot ${i % 2 ? 'is-blue' : 'is-red'}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
