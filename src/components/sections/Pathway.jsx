import { useCallback, useLayoutEffect, useRef } from 'react';
import { pathway } from '../../data/content';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import { gsap } from '../../lib/motion';
import { scrollToY } from '../../lib/scroll';
import Figure from '../brand/Figure';
import Star from '../brand/Star';
import Photo from '../ui/Photo';
import { Eyebrow } from '../ui/primitives';
import './pathway.css';

const LINE = 'M0 62 C 70 62 110 22 220 26 S 400 88 540 70 S 780 14 1000 34';

export default function Pathway() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const drawRef = useRef(null);
  const markerRef = useRef(null);
  const endRef = useRef(null);
  const railRef = useRef(null);
  const triggerRef = useRef(null);

  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)');
  const reduced = useReducedMotion();
  const horizontal = wide && !reduced;

  // Desktop: pin the stage and slide the three steps sideways while the path draws itself
  // and the figure walks along it to the star.
  useLayoutEffect(() => {
    if (!horizontal) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const path = drawRef.current;
      const len = path.getTotalLength();
      let box = { left: 0, top: 0, width: 0, height: 0 };
      const measure = () => {
        const line = lineRef.current;
        box = { left: line.offsetLeft, top: line.offsetTop, width: line.offsetWidth, height: line.offsetHeight };
      };
      const place = (p) => {
        const pt = path.getPointAtLength(len * p);
        gsap.set(markerRef.current, { x: box.left + (pt.x / 1000) * box.width, y: box.top + (pt.y / 100) * box.height });
        endRef.current.classList.toggle('is-reached', p > 0.985);
      };
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({
        onUpdate: () => place(tl.progress()),
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            place(tl.progress());
          },
        },
      });
      tl.to(track, { x: () => -distance(), ease: 'none' }, 0).to(path, { strokeDashoffset: 0, ease: 'none' }, 0);
      triggerRef.current = tl.scrollTrigger;
      measure();
      place(0);
    }, sectionRef);
    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [horizontal]);

  // Stacked layout: the rail fills as you read down the steps.
  useLayoutEffect(() => {
    if (horizontal || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: trackRef.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [horizontal, reduced]);

  // Menu links can ask for a specific step (e.g. "Changemaker Fellowship" → Lead).
  const onFocus = useCallback((focus, arrived) => {
    if (!arrived) return;
    const index = pathway.steps.findIndex((s) => s.id === focus);
    if (index < 0) return;
    const st = triggerRef.current;
    if (st) {
      scrollToY(st.start + (st.end - st.start) * (index / (pathway.steps.length - 1)));
    } else {
      const el = document.getElementById(`pathway-${focus}`);
      scrollToY(el.getBoundingClientRect().top + window.scrollY - 110);
    }
  }, []);
  const spotlight = useSectionFocus('pathway', onFocus);

  return (
    <section
      id="pathway"
      ref={sectionRef}
      className="pathway"
      data-mode={horizontal ? 'pin' : 'stack'}
      aria-labelledby="pathway-title"
    >
      <div className="container-x pathway-head">
        <Eyebrow accent="blue">{pathway.eyebrow}</Eyebrow>
        <h2 id="pathway-title" className="pathway-title" data-reveal="words">
          <span className="text-gradient">{pathway.title.lead}</span> {pathway.title.not}
          {pathway.title.struck}
          {pathway.title.end}
        </h2>
        <p className="pathway-body" data-reveal style={{ '--i': 1 }}>
          {pathway.body}
        </p>
      </div>

      <div ref={stageRef} className="pathway-stage">
        <div ref={trackRef} className="pathway-track">
          {horizontal && (
            <div ref={lineRef} className="pathway-line" aria-hidden="true">
              <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathway-grad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#0a8ff0" />
                    <stop offset="0.5" stopColor="#ff8a00" />
                    <stop offset="1" stopColor="#e31e24" />
                  </linearGradient>
                </defs>
                <path d={LINE} className="pathway-line-base" vectorEffect="non-scaling-stroke" />
                <path ref={drawRef} d={LINE} className="pathway-line-draw" stroke="url(#pathway-grad)" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          )}
          {!horizontal && (
            <span className="pathway-rail" aria-hidden="true">
              <span ref={railRef} className="pathway-rail-fill" />
            </span>
          )}

          {pathway.steps.map((step) => (
            <article
              key={step.id}
              id={`pathway-${step.id}`}
              className={`pathway-panel accent-${step.accent}`}
              data-spotlight={spotlight === step.id || undefined}
              aria-labelledby={`pathway-${step.id}-title`}
            >
              <div className="pp-body">
                <span className="pp-number" aria-hidden="true">
                  {step.number}
                </span>
                <h3 id={`pathway-${step.id}-title`} className="pp-title">
                  <span className="sr-only">{step.number} </span>
                  {step.title}
                </h3>
                <p className="pp-subtitle">{step.subtitle}</p>
                <p className="pp-text">{step.body}</p>
                <ul className="pp-chips">
                  {step.programmes.map((name) => (
                    <li key={name} className="chip">
                      <span className="eyebrow-dot" aria-hidden="true" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pp-photo img-reveal" data-reveal="fade">
                <Photo id={step.image} sizes="(min-width: 1024px) 32vw, 92vw" />
              </div>
            </article>
          ))}

          {horizontal && (
            <div ref={endRef} className="pathway-end" aria-hidden="true">
              <Star className="pathway-end-star" />
            </div>
          )}
          {horizontal && (
            <div ref={markerRef} className="pathway-marker" aria-hidden="true">
              <Figure className="pathway-figure" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
