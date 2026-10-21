import { lazy, Suspense, startTransition, useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Preloader from './components/layout/Preloader';
import Hero from './components/sections/Hero';
import MarqueeBands from './components/sections/MarqueeBands';
import { useGlobalInteractions } from './hooks/useGlobalInteractions';
import { ScrollTrigger } from './lib/motion';
import { initSmoothScroll } from './lib/scroll';

const BelowFold = lazy(() => import('./BelowFold'));

export default function App() {
  const [showRest, setShowRest] = useState(false);
  useGlobalInteractions();
  useEffect(() => initSmoothScroll(), []);

  // The hero paints first; the rest renders in an interruptible transition so it never blocks input.
  useEffect(() => {
    startTransition(() => setShowRest(true));
  }, []);

  // Late layout shifts (fonts, lazy images) move pinned sections - re-measure once things settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <MarqueeBands />
        {showRest && (
          <Suspense fallback={<div className="min-h-[100vh]" aria-hidden="true" />}>
            <BelowFold />
          </Suspense>
        )}
      </main>
    </>
  );
}
