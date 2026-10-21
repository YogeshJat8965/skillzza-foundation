import { useCallback, useState } from 'react';
import { PiCpuDuotone, PiDeviceMobileDuotone, PiLightbulbFilamentDuotone } from 'react-icons/pi';
import { labs } from '../../data/content';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import Photo from '../ui/Photo';
import { Button, Eyebrow, SplitWords } from '../ui/primitives';
import './labs.css';

const ICONS = [PiCpuDuotone, PiDeviceMobileDuotone, PiLightbulbFilamentDuotone];

// Three photo panels; the one under the pointer (or focus) opens wide and tells its story.
export default function Labs() {
  const [active, setActive] = useState(0);
  const onFocus = useCallback((focus) => {
    const index = labs.items.findIndex((lab) => lab.id === focus);
    if (index >= 0) setActive(index);
  }, []);
  const spotlight = useSectionFocus('labs', onFocus);

  return (
    <section id="labs" className="section-y labs" aria-labelledby="labs-title">
      <div className="container-x">
        <div className="labs-head">
          <div>
            <Eyebrow accent="orange">{labs.eyebrow}</Eyebrow>
            <h2 id="labs-title" className="labs-title" data-reveal="words">
              <SplitWords text={labs.title} />
            </h2>
          </div>
          <div className="labs-intro" data-reveal>
            <p>{labs.body}</p>
            <Button href="#get-involved" data-focus="csr" magnetic>
              {labs.cta}
            </Button>
          </div>
        </div>

        <div className="labs-panels" data-reveal style={{ '--i': 1 }}>
          {labs.items.map((lab, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={lab.id}
                className={`lab-panel accent-${lab.accent}`}
                data-active={active === i || undefined}
                data-spotlight={spotlight === lab.id || undefined}
                tabIndex={0}
                aria-labelledby={`lab-${lab.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <Photo id={lab.image} className="lab-photo" sizes="(min-width: 1024px) 56vw, 86vw" />
                <span className="lab-shade" aria-hidden="true" />
                <div className="lab-content">
                  <span className="lab-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 id={`lab-${lab.id}`} className="lab-title">
                    {lab.title}
                  </h3>
                  <div className="lab-text-wrap">
                    <p className="lab-text">{lab.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
