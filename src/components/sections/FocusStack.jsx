import { useLayoutEffect, useRef } from 'react';
import {
  PiCpuDuotone,
  PiDesktopDuotone,
  PiHandshakeDuotone,
  PiLaptopDuotone,
  PiLightbulbFilamentDuotone,
  PiMedalDuotone,
  PiMegaphoneDuotone,
  PiPlantDuotone,
  PiPresentationChartDuotone,
  PiStorefrontDuotone,
  PiUsersThreeDuotone,
} from 'react-icons/pi';
import { careerToCampus, girlsWomen, youngFounders } from '../../data/content';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion';
import Photo from '../ui/Photo';
import { ArrowLink, Button, Eyebrow, RichText, SplitWords } from '../ui/primitives';
import './focus.css';

const GIRLS_ICONS = [PiMedalDuotone, PiCpuDuotone, PiStorefrontDuotone];
const CAREER_ICONS = [PiPresentationChartDuotone, PiLaptopDuotone, PiDesktopDuotone, PiHandshakeDuotone];
const FOUNDER_ICONS = [PiLightbulbFilamentDuotone, PiUsersThreeDuotone, PiPlantDuotone, PiMegaphoneDuotone];

// "rises" lifts letter by letter when the heading arrives; trailing punctuation stays on its line.
function RisingTitle({ text }) {
  return text.split(/(rises[,.]?)/).map((part, i) => {
    if (!part.startsWith('rises')) return part;
    return (
      <span key={i} className="whitespace-nowrap">
        <span className="rise">
          {[...'rises'].map((ch, k) => (
            <span key={k} style={{ '--k': k }}>
              {ch}
            </span>
          ))}
        </span>
        {part.slice(5)}
      </span>
    );
  });
}

function FocusCard({ id, accent, image, flip, index, labelledBy, children }) {
  return (
    <>
      <span id={id} className="scroll-anchor" aria-hidden="true" />
      <article className={`focus-card accent-${accent}`} data-flip={flip || undefined} style={{ '--k': index }} aria-labelledby={labelledBy}>
        <div className="focus-card-inner">
          <div className="focus-photo img-reveal" data-reveal="fade">
            <Photo id={image} sizes="(min-width: 1024px) 44vw, 92vw" />
          </div>
          <div className="focus-content">{children}</div>
          <span className="focus-dim" aria-hidden="true" />
        </div>
      </article>
    </>
  );
}

function FeatureChips({ items, icons }) {
  return (
    <ul className="focus-chips">
      {items.map((label, i) => {
        const Icon = icons[i];
        return (
          <li key={label} className="focus-chip" data-reveal style={{ '--i': i }}>
            <span className="focus-chip-icon">
              <Icon aria-hidden="true" />
            </span>
            {label}
          </li>
        );
      })}
    </ul>
  );
}

export default function FocusStack() {
  const stackRef = useRef(null);
  const stacked = useMediaQuery('(min-width: 1024px) and (min-height: 760px)');
  const reduced = useReducedMotion();

  // As each card is covered by the next, it eases back and dims slightly.
  useLayoutEffect(() => {
    if (!stacked || reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.focus-card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const scrollTrigger = { trigger: next, start: 'top bottom', end: 'top 140px', scrub: true };
        gsap.to(card.querySelector('.focus-card-inner'), { scale: 0.92, ease: 'none', scrollTrigger });
        gsap.to(card.querySelector('.focus-dim'), { opacity: 0.32, ease: 'none', scrollTrigger });
      });
    }, stackRef);
    return () => ctx.revert();
  }, [stacked, reduced]);

  return (
    <div ref={stackRef} className="focus-stack container-x" data-stacked={stacked || undefined}>
      <FocusCard id="girls-women-first" accent="violet" image="focus-girls" index={0} labelledBy="gw-title">
        <Eyebrow accent="violet">{girlsWomen.eyebrow}</Eyebrow>
        <h2 id="gw-title" className="focus-title" data-reveal="words">
          <RisingTitle text={girlsWomen.title} />
        </h2>
        <p className="focus-text">{girlsWomen.body}</p>
        <ul className="gw-items">
          {girlsWomen.items.map((item, i) => {
            const Icon = GIRLS_ICONS[i];
            return (
              <li key={item.title} className="gw-item" data-reveal style={{ '--i': i }}>
                <span className="focus-chip-icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <p className="gw-item-title">{item.title}</p>
                  <p className="gw-item-text">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="focus-ctas">
          <Button variant="accent" burst magnetic>
            {girlsWomen.primaryCta}
          </Button>
          <Button variant="outline" burst>
            {girlsWomen.secondaryCta}
          </Button>
        </div>
      </FocusCard>

      <FocusCard id="career-to-campus" accent="orange" image="focus-career" flip index={1} labelledBy="ctc-title">
        <Eyebrow accent="orange">{careerToCampus.eyebrow}</Eyebrow>
        <h2 id="ctc-title" className="focus-title" data-reveal="words">
          <SplitWords text={careerToCampus.title} />
        </h2>
        <p className="focus-text">
          <RichText parts={careerToCampus.body} />
        </p>
        <FeatureChips items={careerToCampus.items} icons={CAREER_ICONS} />
        <ArrowLink href="#get-involved" data-focus="government" className="focus-link">
          {careerToCampus.cta}
        </ArrowLink>
      </FocusCard>

      <FocusCard id="young-founders" accent="red" image="focus-founders" index={2} labelledBy="yf-title">
        <Eyebrow accent="red">{youngFounders.eyebrow}</Eyebrow>
        <h2 id="yf-title" className="focus-title" data-reveal>
          {youngFounders.title.before}
          <span className="yf-today">{youngFounders.title.muted}</span>
          {youngFounders.title.middle}
          <span className="text-gradient">{youngFounders.title.bright}</span>
          {youngFounders.title.end}
        </h2>
        <p className="focus-text">{youngFounders.body}</p>
        <FeatureChips items={youngFounders.items} icons={FOUNDER_ICONS} />
        <ArrowLink href="#" className="focus-link">
          {youngFounders.cta}
        </ArrowLink>
      </FocusCard>
    </div>
  );
}
