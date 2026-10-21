import { useEffect, useRef, useState } from 'react';
import { PiArrowUpBold } from 'react-icons/pi';
import { hero } from '../../data/content';
import { Button } from '../ui/primitives';
import './floating.css';

// Back-to-top with a progress ring, plus the mobile bottom CTA bar.
export default function FloatingUI() {
  const [showTop, setShowTop] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop(y > 900);
      ringRef.current?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
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

  // The bar appears once the hero is gone and steps aside near the donate band and footer.
  useEffect(() => {
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id || e.target.tagName, e.isIntersecting));
      setShowBar(!visible.get('top') && !visible.get('donate') && !visible.get('FOOTER'));
    });
    ['top', 'donate'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const footerEl = document.querySelector('footer');
    if (footerEl) io.observe(footerEl);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a href="#top" className="to-top" data-show={showTop || undefined} data-lift={showBar || undefined} aria-label="Back to top">
        <svg className="to-top-progress" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" className="to-top-track" />
          <circle ref={ringRef} cx="24" cy="24" r="21" className="to-top-ring" pathLength="1" />
        </svg>
        <PiArrowUpBold aria-hidden="true" />
      </a>
      <div className="cta-bar" data-show={showBar || undefined}>
        <Button href="#get-involved" size="sm">
          {hero.primaryCta}
        </Button>
        <Button href="#donate" size="sm" variant="outline" sparkle>
          {hero.secondaryCta}
        </Button>
      </div>
    </>
  );
}
