import { gsap } from './motion';

const COLORS = ['#E31E24', '#0A8FF0', '#FFB000', '#7B4BD2', '#FF8A00'];
const STAR = 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z';
const SVG_NS = 'http://www.w3.org/2000/svg';

// Small burst of logo-coloured stars - feedback for buttons that don't go anywhere yet.
export function starBurst(x, y) {
  const layer = document.createElement('div');
  layer.className = 'burst';
  layer.setAttribute('aria-hidden', 'true');
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;

  for (let i = 0; i < 12; i++) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', STAR);
    path.setAttribute('fill', COLORS[i % COLORS.length]);
    svg.appendChild(path);
    layer.appendChild(svg);

    const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 46 + Math.random() * 52;
    gsap.fromTo(
      svg,
      { x: 0, y: 0, scale: 0, rotate: 0 },
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.6 + Math.random() * 0.7,
        rotate: (Math.random() - 0.5) * 260,
        duration: 0.9,
        ease: 'expo.out',
      },
    );
    gsap.to(svg, { opacity: 0, scale: 0, duration: 0.4, delay: 0.5, ease: 'power2.in' });
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1100);
}
