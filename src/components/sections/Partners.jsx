import {
  PiBankDuotone,
  PiBriefcaseDuotone,
  PiCpuDuotone,
  PiGraduationCapDuotone,
  PiHandHeartDuotone,
  PiHandshakeDuotone,
} from 'react-icons/pi';
import { partners } from '../../data/content';
import Marquee from '../ui/Marquee';
import { SplitWords } from '../ui/primitives';
import './partners.css';

const ICONS = [PiBankDuotone, PiCpuDuotone, PiGraduationCapDuotone, PiBriefcaseDuotone, PiHandHeartDuotone, PiHandshakeDuotone];
const ACCENTS = ['navy', 'blue', 'violet', 'orange', 'red', 'gold'];

// Placeholder tiles until partner logos arrive; each sits grey and wakes up in colour on hover.
function Tiles({ order }) {
  return order.map((i) => {
    const Icon = ICONS[i];
    return (
      <span key={i} className={`partner-tile accent-${ACCENTS[i]}`}>
        <span className="partner-icon">
          <Icon aria-hidden="true" />
        </span>
        {partners.items[i]}
      </span>
    );
  });
}

export default function Partners() {
  return (
    <section id="partners" className="section-y partners" aria-labelledby="partners-title">
      <div className="container-x partners-head">
        <div>
          <h2 id="partners-title" className="partners-title" data-reveal="words">
            <SplitWords text={partners.title} />
          </h2>
          <p className="partners-text" data-reveal style={{ '--i': 1 }}>
            {partners.body}
          </p>
        </div>
      </div>
      <div className="partners-rows">
        <Marquee duration={38} hoverPause>
          <Tiles order={[0, 1, 2, 3, 4, 5]} />
        </Marquee>
        <Marquee duration={44} reverse hoverPause>
          <Tiles order={[3, 5, 1, 4, 0, 2]} />
        </Marquee>
      </div>
    </section>
  );
}
