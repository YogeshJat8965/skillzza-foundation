import { useCallback, useRef } from 'react';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import { programmes } from '../../data/content';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import { useTicker } from '../../hooks/useTicker';
import Petals from '../brand/Petals';
import Photo from '../ui/Photo';
import { ArrowLink, ArrowText, Button, Eyebrow, SplitWords } from '../ui/primitives';
import './programmes.css';

const TAG_ACCENT = { LEARN: 'blue', EARN: 'orange', LEAD: 'red' };

function ProgrammeCard({ item, spotlight, copy }) {
  return (
    <article className={`prog-card group accent-${TAG_ACCENT[item.tag]}`} data-spotlight={spotlight || undefined}>
      <div className="prog-photo">
        <Photo id={item.image} sizes="(min-width: 1200px) 410px, 300px" alt={copy ? '' : undefined} />
        <span className="tag prog-tag">{item.tag}</span>
      </div>
      <div className="prog-body">
        <h3 className="prog-name">
          {item.name}
          {item.subtitle && <span className="prog-sub"> - {item.subtitle}</span>}
        </h3>
        <p className="prog-text">{item.body}</p>
        <a href="#" className="link-arrow prog-link" tabIndex={copy ? -1 : undefined}>
          <ArrowText>{programmes.learnMore}</ArrowText>
        </a>
      </div>
    </article>
  );
}

export default function Programmes() {
  const headRef = useRef(null);
  const ticker = useTicker({ speed: 42 });
  const { seekTo } = ticker;

  // Menu links name a programme: glide its card to the front and hold it there.
  const onFocus = useCallback(
    (focus, arrived) => {
      const index = programmes.items.findIndex((p) => p.id === focus);
      if (index >= 0 && !arrived) seekTo(index, headRef.current, 4200);
    },
    [seekTo],
  );
  const spotlight = useSectionFocus('programmes', onFocus);

  return (
    <section id="programmes" className="section-y programmes" aria-labelledby="programmes-title">
      <div ref={headRef} className="container-x">
        <div className="programmes-head">
          <div>
            <Eyebrow accent="blue">{programmes.eyebrow}</Eyebrow>
            <h2 id="programmes-title" className="programmes-title" data-reveal="words">
              <SplitWords text={programmes.title} />
            </h2>
          </div>
          <div className="programmes-actions">
            <ArrowLink href="#donate" className="text-lg">
              {programmes.fundCta}
            </ArrowLink>
            <div className="programmes-arrows">
              <button type="button" className="round-btn" aria-label="Previous programme" onClick={() => ticker.nudge(-1)}>
                <PiArrowLeftBold aria-hidden="true" />
              </button>
              <button type="button" className="round-btn" aria-label="Next programme" onClick={() => ticker.nudge(1)}>
                <PiArrowRightBold aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={ticker.viewportRef} className="ticker programmes-ticker" data-reveal="fade">
        <div ref={ticker.trackRef} className="ticker-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} className="ticker-group" aria-hidden={copy || undefined}>
              {programmes.items.map((item) => (
                <li key={item.id} className="ticker-item">
                  <ProgrammeCard item={item} spotlight={spotlight === item.id} copy={copy} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className="partner-band on-dark" data-reveal>
          <Petals className="partner-band-petals" />
          <div className="partner-band-copy">
            <h3 className="partner-band-title">{programmes.partnership.title}</h3>
            <p className="partner-band-text">{programmes.partnership.body}</p>
          </div>
          <Button href="#get-involved" variant="light" magnetic>
            {programmes.partnership.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
