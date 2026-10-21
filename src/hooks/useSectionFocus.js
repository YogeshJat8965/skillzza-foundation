import { useEffect, useState } from 'react';

// Listens for menu/footer links that target this section and returns the id to spotlight.
// The spotlight clears itself after a few seconds.
export function useSectionFocus(section, onFocus) {
  const [spotlight, setSpotlight] = useState(null);

  useEffect(() => {
    let timer;
    const handle = (e) => {
      const { section: target, focus, arrived } = e.detail;
      if (target !== section || !focus) return;
      onFocus?.(focus, arrived);
      if (!arrived) return;
      setSpotlight(focus);
      clearTimeout(timer);
      timer = setTimeout(() => setSpotlight(null), 2600);
    };
    window.addEventListener('skz:focus', handle);
    return () => {
      window.removeEventListener('skz:focus', handle);
      clearTimeout(timer);
    };
  }, [section, onFocus]);

  return spotlight;
}
