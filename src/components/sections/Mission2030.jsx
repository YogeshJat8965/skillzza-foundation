import { useRef } from 'react';
import { mission2030 } from '../../data/content';
import { useExpandOnScroll } from '../../hooks/useExpandOnScroll';
import Petals from '../brand/Petals';
import Star from '../brand/Star';
import { Eyebrow, Odometer, SplitWords } from '../ui/primitives';
import './mission.css';

export default function Mission2030() {
  const stageRef = useRef(null);
  useExpandOnScroll(stageRef);

  return (
    <section id="mission-2030" className="mission-wrap" aria-labelledby="mission-title">
      <div ref={stageRef} className="mission on-dark">
        <span className="mission-year" aria-hidden="true">
          2030
        </span>
        <Petals className="mission-petals" />
        <div className="container-x mission-inner relative">
          <div className="mission-head">
            <div>
              <Eyebrow accent="gold">{mission2030.eyebrow}</Eyebrow>
              <h2 id="mission-title" className="mt-5 max-w-[15ch] text-h1 font-extrabold" data-reveal="words">
                <SplitWords text={mission2030.title} />
              </h2>
            </div>
            <Star className="mission-star" />
          </div>
          <ul className="mission-stats">
            {mission2030.stats.map((stat, i) => (
              <li key={stat.label} className={`mission-stat accent-${stat.accent}`} data-reveal style={{ '--i': i }}>
                <Odometer value={stat.value} className="mission-value" unitClassName="mission-unit" />
                <p className="mission-label">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
