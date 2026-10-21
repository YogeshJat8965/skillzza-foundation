import { Fragment } from 'react';
import Sparkle from '../brand/Sparkle';

export function Eyebrow({ children, accent = 'red', center = false, className = '', id }) {
  return (
    <p id={id} className={`eyebrow accent-${accent} ${center ? 'eyebrow-center' : ''} ${className}`}>
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

// Splits a trailing "→" into its own span so it can animate; the text itself is unchanged.
export function ArrowText({ children }) {
  if (typeof children !== 'string' || !children.endsWith('→')) return children;
  return (
    <>
      {children.slice(0, -1)}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </>
  );
}

export function Button({ href = '#', children, variant = 'primary', size, className = '', magnetic, sparkle, burst, ...rest }) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;
  const extra = { 'data-magnetic': magnetic || undefined, 'data-burst': burst || undefined };
  const content = (
    <>
      <ArrowText>{children}</ArrowText>
      {sparkle && <Sparkle className="btn-sparkle" />}
    </>
  );
  if (rest.type === 'submit' || rest.type === 'button') {
    return (
      <button className={cls} {...extra} {...rest}>
        {content}
      </button>
    );
  }
  return (
    <a href={href} className={cls} {...extra} {...rest}>
      {content}
    </a>
  );
}

export function ArrowLink({ href = '#', children, className = '', ...rest }) {
  return (
    <a href={href} className={`link-arrow ${className}`} {...rest}>
      <ArrowText>{children}</ArrowText>
    </a>
  );
}

// Paragraph made of plain strings and { mark } segments that get the marker sweep.
export function RichText({ parts }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <mark key={i} className="marker" data-reveal="marker">
        {part.mark}
      </mark>
    ),
  );
}

export function SplitWords({ text, baseDelay = 0, start = 0 }) {
  const words = text.split(' ');
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="split-word">
        <span style={{ '--w': start + i, '--base-delay': `${baseDelay}ms` }}>{word}</span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ));
}

const STRIP = [...'01234567890123456789'];

// Running numbers: each digit spins through 0-9 and lands on its value; brackets, commas and
// symbols stay put, and a trailing word ("Crore", "Lakh") becomes the unit. Screen readers get the plain value.
export function Odometer({ value, className = '', unitClassName = '' }) {
  const [, body, unit] = value.match(/^(.*?\d[^A-Za-z]*)(\s*[A-Za-z].*)?$/) ?? [null, value, ''];
  let column = 0;
  return (
    <span className={`odo ${className}`}>
      <span className="sr-only">{value}</span>
      <span className="odo-num" aria-hidden="true">
        {[...body].map((ch, i) =>
          /\d/.test(ch) ? (
            <span className="odo-digit" key={i}>
              <span className="odo-sizer">{ch}</span>
              <span className="odo-strip" style={{ '--to': 10 + Number(ch), '--c': column++ }}>
                {STRIP.map((n, k) => (
                  <span key={k}>{n}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
      {unit && (
        <span className={unitClassName} aria-hidden="true">
          {unit.trim()}
        </span>
      )}
    </span>
  );
}
