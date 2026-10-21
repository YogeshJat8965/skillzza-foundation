// "Ready" = the intro has finished (or was skipped); hero entrance animations wait for it.
let ready = false;
const listeners = new Set();

export function markReady() {
  if (ready) return;
  ready = true;
  document.documentElement.classList.add('is-ready');
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onReady(fn) {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// "Sections ready" = the below-the-fold sections have mounted (they load as a separate chunk).
let sectionsReady = false;
const sectionListeners = new Set();

export function markSectionsReady() {
  if (sectionsReady) return;
  sectionsReady = true;
  sectionListeners.forEach((fn) => fn());
  sectionListeners.clear();
}

export function onSectionsReady(fn) {
  if (sectionsReady) {
    fn();
    return () => {};
  }
  sectionListeners.add(fn);
  return () => sectionListeners.delete(fn);
}
