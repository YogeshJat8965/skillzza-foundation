import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { contactCta, navigation } from '../../data/navigation';
import Petals from '../brand/Petals';
import { ArrowText } from '../ui/primitives';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function MobileMenu({ open, onClose, burgerRef }) {
  const [expanded, setExpanded] = useState(null);
  const [origin, setOrigin] = useState({ x: '100%', y: '0px' });
  const rootRef = useRef(null);

  // The circular reveal grows out of the burger button.
  useLayoutEffect(() => {
    if (!open) return;
    const r = burgerRef.current?.getBoundingClientRect();
    if (r) setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
  }, [open, burgerRef]);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const focusTimer = setTimeout(() => root.querySelector(FOCUSABLE)?.focus(), 350);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = [burgerRef.current, ...root.querySelectorAll(FOCUSABLE)].filter((el) => el && !el.closest('[inert]'));
      const first = nodes[0];
      const lastNode = nodes.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, burgerRef]);

  const close = () => {
    setExpanded(null);
    onClose();
  };

  return (
    <div
      id="mobile-menu"
      ref={rootRef}
      className="mobile-menu on-dark"
      data-open={open || undefined}
      data-lenis-prevent
      inert={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      style={{ '--ox': origin.x, '--oy': origin.y }}
    >
      <Petals className="mm-petals" />
      <div className="mm-inner">
        <ul className="mm-list">
          {navigation.map((item, i) => (
            <li key={item.id} className={`mm-item accent-${item.accent}`} style={{ '--i': i }}>
              <button
                type="button"
                className="mm-trigger"
                aria-expanded={expanded === i}
                aria-controls={`mm-${item.id}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="mm-dot" aria-hidden="true" />
                {item.label}
                <PiCaretDownBold className="mm-caret" aria-hidden="true" />
              </button>
              <div id={`mm-${item.id}`} className="mm-panel" data-open={expanded === i || undefined} inert={expanded !== i}>
                <div className="mm-panel-inner">
                  <div className="mm-panel-body">
                    <p className="mm-desc">{item.description}</p>
                    <a href={item.cta.href} className="link-arrow mm-cta" onClick={close}>
                      <ArrowText>{item.cta.label}</ArrowText>
                    </a>
                    {item.groups.map((group) => (
                      <div key={group.label} className="mm-group">
                        <p className="mm-group-label">{group.label}</p>
                        <ul>
                          {group.links.map((link) => {
                            const Icon = link.icon;
                            return (
                              <li key={link.label}>
                                <a href={link.href} data-focus={link.focus} className="mm-link" onClick={close}>
                                  <span className="mm-icon">
                                    <Icon aria-hidden="true" />
                                  </span>
                                  {link.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <a href={contactCta.href} className="btn btn-primary mm-contact" onClick={close}>
          {contactCta.label}
        </a>
      </div>
    </div>
  );
}
