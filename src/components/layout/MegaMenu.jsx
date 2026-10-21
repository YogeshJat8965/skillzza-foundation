import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import Petals from '../brand/Petals';
import Photo from '../ui/Photo';
import { ArrowText } from '../ui/primitives';

const GUTTER = 16;

// One card shared by every menu: it morphs its size and position between menus while the
// panels inside slide in from the side the pointer travelled towards.
export default function MegaMenu({ ref, items, open, triggers, onNavigate }) {
  const cardRef = useRef(null);
  const panels = useRef([]);
  const wasOpen = useRef(false);
  const [vw, setVw] = useState(() => document.documentElement.clientWidth);
  const [geo, setGeo] = useState({ x: 0, w: 0, h: 0, caret: 0 });
  const [last, setLast] = useState(0);

  useImperativeHandle(ref, () => ({
    focusFirst: (i) => panels.current[i]?.querySelector('a')?.focus(),
  }));

  const widthFor = useCallback((i) => Math.min(items[i].width, vw - GUTTER * 2), [items, vw]);

  const measure = useCallback(() => {
    if (open === null || !triggers.current[open]) return;
    const w = widthFor(open);
    const t = triggers.current[open].getBoundingClientRect();
    const cx = t.left + t.width / 2;
    const x = Math.max(GUTTER, Math.min(cx - w / 2, vw - GUTTER - w));
    setGeo({ x, w, h: panels.current[open].offsetHeight, caret: cx - x });
  }, [open, triggers, vw, widthFor]);

  useLayoutEffect(() => {
    if (open === null) {
      wasOpen.current = false;
      return;
    }
    setLast(open);
    if (!wasOpen.current) {
      // First open: place the card instantly, then animate only its entrance.
      const card = cardRef.current;
      card.classList.add('mega-snap');
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('mega-snap')));
    }
    wasOpen.current = true;
    measure();
  }, [open, measure]);

  useEffect(() => {
    const onResize = () => setVw(document.documentElement.clientWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const header = cardRef.current.parentElement;
    header.addEventListener('transitionend', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      header.removeEventListener('transitionend', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [open, measure]);

  const shown = open !== null;
  const current = shown ? open : last;
  return (
    <div
      ref={cardRef}
      className="mega"
      data-open={shown || undefined}
      style={{ width: geo.w, height: geo.h, transform: `translateX(${geo.x}px)`, '--caret': `${geo.caret}px` }}
    >
      <span className="mega-caret" aria-hidden="true" />
      <div className="mega-viewport">
        {items.map((item, i) => (
          <div
            key={item.id}
            id={`mega-${item.id}`}
            ref={(el) => (panels.current[i] = el)}
            className={`mega-panel accent-${item.accent}`}
            data-pos={i === current ? 'active' : i < current ? 'before' : 'after'}
            inert={!shown || i !== current}
            style={{ width: widthFor(i) }}
          >
            <MegaPanel item={item} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaPanel({ item, onNavigate }) {
  return (
    <div className="mega-grid">
      <div className="mega-feature">
        <Petals className="mega-feature-petals" />
        <p className="mega-title">{item.title}</p>
        <p className="mega-desc">{item.description}</p>
        <a href={item.cta.href} className="link-arrow mega-cta" onClick={onNavigate}>
          <ArrowText>{item.cta.label}</ArrowText>
        </a>
        <div className="mega-photo">
          <Photo id={item.image} sizes="300px" alt="" />
        </div>
      </div>
      <div className="mega-groups" style={{ '--cols': item.groups.length }}>
        {item.groups.map((group, g) => (
          <div key={group.label} className={`mega-group accent-${group.accent ?? item.accent}`}>
            <p className="mega-group-label">
              <span className="eyebrow-dot" aria-hidden="true" />
              {group.label}
            </p>
            <ul>
              {group.links.map((link, k) => {
                const Icon = link.icon;
                return (
                  <li key={link.label} style={{ '--i': g * 2 + k }}>
                    <a href={link.href} data-focus={link.focus} className="mega-link" onClick={onNavigate}>
                      <span className="mega-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="mega-link-label">{link.label}</span>
                      <PiArrowRightBold className="mega-link-arrow" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
