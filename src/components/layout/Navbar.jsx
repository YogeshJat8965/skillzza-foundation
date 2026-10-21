import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { logoFull, logoFullDark } from '../brand/logos';
import { contactCta, navigation } from '../../data/navigation';
import { onSectionsReady } from '../../lib/ready';
import { startScroll, stopScroll } from '../../lib/scroll';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import './navbar.css';

const SPY = new Map([['top', null]]);
navigation.forEach((item, i) => item.spy.forEach((id) => SPY.set(id, i)));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  const headerRef = useRef(null);
  const triggers = useRef([]);
  const megaRef = useRef(null);
  const burgerRef = useRef(null);
  const progressRef = useRef(null);
  const openRef = useRef(null);
  const pointerType = useRef('mouse');
  const timers = useRef({});

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Scroll: pill state, smart hide, progress line, and close the mega menu after a real scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    let anchorY = lastY;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 520);
        lastY = y;
      }
      if (openRef.current === null) anchorY = y;
      else if (Math.abs(y - anchorY) > 140) setOpen(null);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-spy: whichever section crosses the middle of the viewport lights up its menu item.
  useEffect(() => {
    let io;
    const cancel = onSectionsReady(() => {
      io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(SPY.get(entry.target.id))),
        { rootMargin: '-45% 0px -54% 0px' },
      );
      SPY.forEach((_, id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    });
    return () => {
      cancel();
      io?.disconnect();
    };
  }, []);

  const clearTimers = () => {
    clearTimeout(timers.current.open);
    clearTimeout(timers.current.close);
  };
  const requestOpen = (i) => {
    clearTimers();
    if (openRef.current !== null) setOpen(i);
    else timers.current.open = setTimeout(() => setOpen(i), 70);
  };
  const requestClose = () => {
    clearTimers();
    timers.current.close = setTimeout(() => {
      setOpen(null);
      setHover(null);
    }, 200);
  };
  const closeMega = useCallback(() => {
    clearTimers();
    setOpen(null);
    setHover(null);
  }, []);

  const onTriggerClick = (i) => {
    if (pointerType.current === 'mouse') setOpen(i);
    else setOpen((current) => (current === i ? null : i));
  };
  const onTriggerKey = (e, i) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    setOpen(i);
    requestAnimationFrame(() => megaRef.current?.focusFirst(i));
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      triggers.current[openRef.current]?.focus();
      closeMega();
    };
    const onPointer = (e) => {
      if (!headerRef.current.contains(e.target)) closeMega();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, closeMega]);

  const onHeaderBlur = (e) => {
    if (open !== null && !headerRef.current.contains(e.relatedTarget)) closeMega();
  };

  const pillTarget = hover ?? open;
  useLayoutEffect(() => {
    const el = triggers.current[pillTarget];
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [pillTarget, scrolled]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    startScroll();
  }, []);
  const toggleMobile = () => {
    if (mobileOpen) closeMobile();
    else {
      setMobileOpen(true);
      stopScroll();
    }
  };
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && closeMobile();
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [closeMobile]);

  const megaOpen = open !== null;
  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !megaOpen && !mobileOpen) || undefined}
        data-mega={megaOpen || undefined}
        data-mobile-open={mobileOpen || undefined}
        onMouseEnter={() => clearTimeout(timers.current.close)}
        onMouseLeave={requestClose}
        onBlur={onHeaderBlur}
      >
        <div className="nav-shell">
          <nav className="nav-bar" aria-label="Main">
            <a href="#top" className="nav-logo">
              <img id="nav-logo" className="logo-light" {...logoFull} sizes="170px" alt="Skillzza Foundation" fetchPriority="high" />
              <img className="logo-dark" {...logoFullDark} sizes="170px" alt="" />
            </a>

            <div className="nav-list-wrap" onMouseLeave={() => setHover(null)}>
              <span
                className={`nav-pill accent-${navigation[pillTarget ?? 0].accent}`}
                data-show={pillTarget !== null || undefined}
                style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
                aria-hidden="true"
              />
              <ul className="nav-list">
                {navigation.map((item, i) => (
                  <li key={item.id}>
                    <button
                      ref={(el) => (triggers.current[i] = el)}
                      type="button"
                      className={`nav-trigger accent-${item.accent}`}
                      aria-expanded={open === i}
                      aria-controls={`mega-${item.id}`}
                      data-active={active === i || undefined}
                      onPointerDown={(e) => (pointerType.current = e.pointerType)}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== 'mouse') return;
                        setHover(i);
                        requestOpen(i);
                      }}
                      onClick={() => onTriggerClick(i)}
                      onKeyDown={(e) => onTriggerKey(e, i)}
                    >
                      {item.label}
                      <PiCaretDownBold className="nav-caret" aria-hidden="true" />
                      <span className="nav-dot" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <a href={contactCta.href} className="btn btn-primary btn-sm nav-contact" data-magnetic>
              {contactCta.label}
            </a>
            <button
              ref={burgerRef}
              type="button"
              className="burger"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMobile}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
          <span ref={progressRef} className="nav-progress" aria-hidden="true" />
        </div>

        <MegaMenu ref={megaRef} items={navigation} open={open} triggers={triggers} onNavigate={closeMega} />
      </header>
      <div className="nav-scrim" data-show={megaOpen || undefined} aria-hidden="true" />
      <MobileMenu open={mobileOpen} onClose={closeMobile} burgerRef={burgerRef} />
    </>
  );
}
