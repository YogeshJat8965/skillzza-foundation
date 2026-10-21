import { useId } from 'react';

// The four logo petals, redrawn as vectors so they can bloom, spin and scale crisply.
// Angles and lengths follow the logo's arrangement around its centre.
const PETALS = [
  { key: 'red', angle: -116, scale: 1, from: '#c80f2b', to: '#ff5a36' },
  { key: 'blue', angle: -40, scale: 0.88, from: '#0a4fe0', to: '#2bd4ff' },
  { key: 'gold', angle: 176, scale: 0.9, from: '#ff7a00', to: '#ffd23f' },
  { key: 'violet', angle: 108, scale: 0.88, from: '#5326c2', to: '#a86bf2' },
];

const LEAF = 'M0 0 C 12 -36 58 -48 92 -9 C 70 22 26 28 0 0 Z';
const FOLD = 'M0 0 C 30 -7 62 -13 92 -9 C 70 22 26 28 0 0 Z';

export default function Petals({ className = '', petalClassName = '' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        {PETALS.map((p) => (
          <linearGradient key={p.key} id={`${uid}-${p.key}`} gradientUnits="userSpaceOnUse" x1="0" y1="8" x2="92" y2="-10">
            <stop offset="0" stopColor={p.from} />
            <stop offset="1" stopColor={p.to} />
          </linearGradient>
        ))}
      </defs>
      {PETALS.map((p, i) => (
        <g key={p.key} transform={`translate(100 100) rotate(${p.angle}) translate(9 0) scale(${p.scale})`}>
          <g className={`petal ${petalClassName}`} style={{ '--n': i }}>
            <path d={LEAF} fill={`url(#${uid}-${p.key})`} />
            <path d={FOLD} fill="#000" opacity="0.1" />
          </g>
        </g>
      ))}
    </svg>
  );
}
