import { useRef } from 'react';
import { PiBrainDuotone, PiGlobeHemisphereEastDuotone, PiHeartbeatDuotone, PiPlantDuotone } from 'react-icons/pi';
import { aiForImpact } from '../../data/content';
import { useExpandOnScroll } from '../../hooks/useExpandOnScroll';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import Photo from '../ui/Photo';
import { ArrowText, Button, Eyebrow, SplitWords } from '../ui/primitives';
import './ai.css';

const ICONS = [PiPlantDuotone, PiHeartbeatDuotone, PiBrainDuotone, PiGlobeHemisphereEastDuotone];
const ACCENTS = ['blue', 'red', 'violet', 'gold'];

// Soft light that follows the pointer across a card.
const trackPointer = (e) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function AIForImpact() {
  const stageRef = useRef(null);
  useExpandOnScroll(stageRef);
  const spotlight = useSectionFocus('ai-for-impact');

  return (
    <section id="ai-for-impact" className="ai-wrap" aria-labelledby="ai-title">
      <div ref={stageRef} className="ai on-dark">
        <div className="ai-bg" aria-hidden="true">
          <span className="ai-orb ai-orb-1" />
          <span className="ai-orb ai-orb-2" />
        </div>
        <div className="container-x section-y relative">
          <div className="ai-head">
            <div>
              <Eyebrow accent="blue">{aiForImpact.eyebrow}</Eyebrow>
              <h2 id="ai-title" className="ai-title" data-reveal="words">
                <SplitWords text={aiForImpact.title} />
              </h2>
            </div>
            <div className="ai-intro" data-reveal>
              <p>{aiForImpact.body}</p>
              <Button href="#get-involved" variant="light" magnetic>
                {aiForImpact.cta}
              </Button>
            </div>
          </div>

          <div className="ai-bento">
            {aiForImpact.items.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <article
                  key={item.id}
                  className={`ai-card ai-card-${i} accent-${ACCENTS[i]}`}
                  data-spotlight={spotlight === item.id || undefined}
                  data-reveal
                  style={{ '--i': i }}
                  onPointerMove={trackPointer}
                >
                  {item.image && (
                    <Photo id={item.image} className="ai-card-photo" sizes={i === 0 ? '(min-width: 1024px) 46vw, 92vw' : '(min-width: 1024px) 30vw, 92vw'} />
                  )}
                  <div className="ai-card-body">
                    <span className="ai-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="ai-card-title">{item.title}</h3>
                    <p className="ai-card-text">{item.body}</p>
                    <a href="#" className="link-arrow ai-link">
                      <ArrowText>{item.cta}</ArrowText>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
