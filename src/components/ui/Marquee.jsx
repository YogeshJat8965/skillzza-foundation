import { Fragment, useEffect, useRef } from 'react';

// Infinite CSS marquee: two identical halves slide by -50%. Copies are hidden from screen readers,
// and the animation pauses while off screen (and on hover with `hoverPause`).
export default function Marquee({ children, duration = 40, reverse = false, repeat = 2, hoverPause, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute('data-offscreen', !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const group = (copy) => (
    <div className="marquee-group" aria-hidden={copy || undefined}>
      {Array.from({ length: repeat }, (_, k) =>
        k === 0 && !copy ? (
          <Fragment key={k}>{children}</Fragment>
        ) : (
          <div key={k} className="contents" aria-hidden="true">
            {children}
          </div>
        ),
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className={`marquee ${className}`}
      data-reverse={reverse || undefined}
      data-hover-pause={hoverPause || undefined}
      style={{ '--marquee-duration': `${duration}s` }}
    >
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
