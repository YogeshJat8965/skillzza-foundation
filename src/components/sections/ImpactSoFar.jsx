import { useState } from 'react';
import { PiMapPinFill, PiSealCheckDuotone } from 'react-icons/pi';
import { impact } from '../../data/content';
import map from '../../data/india-map.json';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import { Odometer } from '../ui/primitives';
import './impact.css';

export default function ImpactSoFar() {
  const [hovered, setHovered] = useState(null);
  const spotlight = useSectionFocus('impact');

  return (
    <section id="impact" className="section-y impact" aria-labelledby="impact-title">
      <div className="container-x impact-grid">
        <div className="impact-copy">
          <h2 id="impact-title" className="impact-title" data-reveal>
            {impact.title}
          </h2>
          <p className="impact-meta" data-reveal style={{ '--i': 1 }}>
            <PiSealCheckDuotone aria-hidden="true" />
            {impact.meta}
          </p>
          <ul className="impact-stats">
            {impact.stats.map((stat, i) => (
              <li key={stat.label} className={`impact-stat accent-${stat.accent}`} data-reveal style={{ '--i': i + 1 }}>
                <Odometer value={stat.value} className="impact-value" />
                <span className="impact-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="impact-map-card" data-spotlight={spotlight === 'map' || undefined} data-reveal style={{ '--i': 1 }}>
          <div className="impact-map">
            <svg viewBox={map.viewBox} role="img" aria-labelledby="impact-active">
              <path d={map.country} className="map-country" />
              {map.states.map((state, i) => (
                <path
                  key={state.name}
                  d={state.d}
                  className="map-state"
                  data-hot={hovered === state.name || undefined}
                  style={{ '--n': i }}
                  onMouseEnter={() => setHovered(state.name)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
              {map.dots.map((dot, i) => (
                <g key={dot.name} className="map-dot" data-hot={hovered === dot.name || undefined} style={{ '--n': i }}>
                  <circle cx={dot.x} cy={dot.y} r="14" className="map-dot-pulse" />
                  <circle cx={dot.x} cy={dot.y} r="5.5" className="map-dot-core" />
                </g>
              ))}
            </svg>
          </div>
          <div className="impact-states">
            <p id="impact-active" className="impact-active">
              <PiMapPinFill aria-hidden="true" />
              {impact.activeLabel}
            </p>
            <ul className="impact-chips">
              {impact.states.map((state) => (
                <li
                  key={state}
                  className="impact-chip"
                  data-hot={hovered === state || undefined}
                  onMouseEnter={() => setHovered(state)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {state}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
