import { useId } from 'react';

// The logo's star with its four rays.
export default function Star({ className = '', rays = true }) {
  const uid = useId().replace(/:/g, '');
  const points = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 13 : 30;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(58 + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  const rayAngles = [-138, -96, -48, 8];
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#ff9500" />
        </linearGradient>
      </defs>
      {rays && (
        <g className="star-rays" stroke="#ffb000" strokeWidth="5" strokeLinecap="round">
          {rayAngles.map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={50 + 38 * Math.cos(a)}
                y1={58 + 38 * Math.sin(a)}
                x2={50 + 48 * Math.cos(a)}
                y2={58 + 48 * Math.sin(a)}
              />
            );
          })}
        </g>
      )}
      <polygon
        className="star-core"
        points={points}
        fill={`url(#${uid}-g)`}
        stroke={`url(#${uid}-g)`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
