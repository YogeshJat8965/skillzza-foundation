import { useId } from 'react';

// The logo's figure reaching for the star - used as the journey marker on the Pathway.
export default function Figure({ className = '' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-b`} x1="1" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ffb000" />
          <stop offset="1" stopColor="#f25c05" />
        </linearGradient>
      </defs>
      <path
        d="M6 47 L35 39 L93 3 L53 47 L80 117 L41 70 L32 55 L8 54 Z"
        fill={`url(#${uid}-b)`}
        stroke={`url(#${uid}-b)`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="20" r="12" fill="#e8262a" />
    </svg>
  );
}
