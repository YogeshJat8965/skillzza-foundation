import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

// Endless right-to-left carousel. The track holds two identical groups and slides by one group's
// width forever; hover, focus or dragging ease it to a stop instead of cutting it.
export function useTicker({ speed = 45 } = {}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const holds = useRef({ hover: false, focus: false, offscreen: false, nudge: false, drag: false, seek: false });
  const seekTimer = useRef(0);

  const settle = useCallback((duration = 0.6) => {
    const tween = tweenRef.current;
    if (!tween) return;
    const stop = Object.values(holds.current).some(Boolean);
    gsap.to(tween, { timeScale: stop ? 0 : 1, duration, ease: stop ? 'power2.out' : 'power2.in', overwrite: true });
  }, []);

  const wrapped = (time) => {
    const d = tweenRef.current.duration();
    return ((time % d) + d) % d;
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    let tween = null;
    const build = () => {
      const progress = tween ? tween.progress() : 0;
      const scale = tween ? tween.timeScale() : 1;
      tween?.kill();
      const distance = track.children[0].offsetWidth;
      if (!distance) return;
      tween = gsap.fromTo(track, { x: 0 }, { x: -distance, duration: distance / speed, ease: 'none', repeat: -1 });
      tween.progress(progress).timeScale(scale);
      tweenRef.current = tween;
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(track.children[0]);
    return () => {
      ro.disconnect();
      tween?.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: 'transform' });
    };
  }, [speed]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const h = holds.current;
    const io = new IntersectionObserver(([entry]) => {
      h.offscreen = !entry.isIntersecting;
      settle(0);
    });
    io.observe(viewport);

    const onEnter = (e) => {
      if (e.pointerType !== 'mouse') return;
      h.hover = true;
      settle();
    };
    const onLeave = (e) => {
      if (e.pointerType !== 'mouse') return;
      h.hover = false;
      settle(0.9);
    };
    const onFocusIn = () => {
      h.focus = true;
      settle();
    };
    const onFocusOut = (e) => {
      if (viewport.contains(e.relatedTarget)) return;
      h.focus = false;
      settle();
    };

    // Drag / swipe: move the playhead with the pointer; a real drag swallows the click that follows.
    let pointer = null;
    let startX = 0;
    let startTime = 0;
    let dragged = false;
    const onDown = (e) => {
      if (e.button !== 0 || !tweenRef.current) return;
      pointer = e.pointerId;
      startX = e.clientX;
      startTime = tweenRef.current.totalTime() + tweenRef.current.duration();
      dragged = false;
      if (e.pointerType === 'mouse') e.preventDefault();
    };
    const onMove = (e) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - startX;
      if (!dragged) {
        if (Math.abs(dx) < 6) return;
        dragged = true;
        h.drag = true;
        settle(0.15);
        viewport.setPointerCapture(pointer);
        viewport.classList.add('is-dragging');
      }
      tweenRef.current.totalTime(wrapped(startTime - dx / speed));
    };
    const onUp = (e) => {
      if (e.pointerId !== pointer) return;
      pointer = null;
      if (!dragged) return;
      h.drag = false;
      viewport.classList.remove('is-dragging');
      settle(0.9);
    };
    const onClick = (e) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    };

    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);
    viewport.addEventListener('focusin', onFocusIn);
    viewport.addEventListener('focusout', onFocusOut);
    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerup', onUp);
    viewport.addEventListener('pointercancel', onUp);
    viewport.addEventListener('click', onClick, true);
    return () => {
      io.disconnect();
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
      viewport.removeEventListener('focusin', onFocusIn);
      viewport.removeEventListener('focusout', onFocusOut);
      viewport.removeEventListener('pointerdown', onDown);
      viewport.removeEventListener('pointermove', onMove);
      viewport.removeEventListener('pointerup', onUp);
      viewport.removeEventListener('pointercancel', onUp);
      viewport.removeEventListener('click', onClick, true);
      clearTimeout(seekTimer.current);
    };
  }, [settle, speed]);

  // Glide the playhead to an absolute time (in seconds), holding the ticker while it moves.
  const glide = useCallback(
    (time, hold = 'nudge', after = 0) => {
      const tween = tweenRef.current;
      if (!tween) return;
      const h = holds.current;
      h[hold] = true;
      settle(0.2);
      tween.totalTime(tween.totalTime() + tween.duration());
      gsap.to(tween, {
        totalTime: time,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          tween.totalTime(wrapped(tween.totalTime()));
          clearTimeout(seekTimer.current);
          seekTimer.current = setTimeout(() => {
            h[hold] = false;
            settle(0.9);
          }, after);
        },
      });
    },
    [settle],
  );

  // One card forwards (+1) or back (-1).
  const nudge = useCallback(
    (dir) => {
      const group = trackRef.current?.children[0];
      const tween = tweenRef.current;
      if (!group || !tween) return;
      const step = group.children[0].offsetWidth + parseFloat(getComputedStyle(group).columnGap || 0);
      glide(tween.totalTime() + tween.duration() + (dir * step) / speed);
    },
    [glide, speed],
  );

  // Bring item `index` to the left edge of `alignEl`'s content box and hold it there for a moment.
  const seekTo = useCallback(
    (index, alignEl, holdFor = 3200) => {
      const group = trackRef.current?.children[0];
      const tween = tweenRef.current;
      const item = group?.children[index];
      if (!item || !tween) return;
      const box = alignEl.getBoundingClientRect();
      const left = box.left + parseFloat(getComputedStyle(alignEl).paddingLeft);
      const offset = item.offsetLeft - (left - viewportRef.current.getBoundingClientRect().left);
      const d = tween.duration();
      const target = tween.totalTime() + d + ((((offset / speed - tween.totalTime()) % d) + d) % d);
      glide(target, 'seek', holdFor);
    },
    [glide, speed],
  );

  return { viewportRef, trackRef, nudge, seekTo };
}
