'use client';

import { useEffect, useRef, useState } from 'react';

/* Den streckade vägen i "Kundens väg till er": en mjuk kurva som ritas genom mitten av
   varje klistermärke, från sökrutan till maskoten. Punkterna mäts i webbläsaren, så kurvan
   följer korten oavsett skärmbredd. På mobil (en kolumn) ritar CSS en rak linje i stället. */
export default function Vagen() {
  const ref = useRef(null);
  const [d, setD] = useState('');
  const [storlek, setStorlek] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return undefined;
    const karta = svg.parentElement;

    const rita = () => {
      if (window.innerWidth <= 640) {
        setD('');
        return;
      }
      const box = karta.getBoundingClientRect();
      const mitt = (el) => {
        const r = el.getBoundingClientRect();
        return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
      };
      const start = karta.querySelector('[data-start]');
      const mal = karta.querySelector('[data-mal]');
      const stopp = [...karta.querySelectorAll('[data-stopp]')];
      if (!start || !mal || stopp.length < 2) return;

      /* Startpunkten är sökrutans högerkant, slutpunkten maskotens mitt */
      const sr = start.getBoundingClientRect();
      const p = [[sr.right - box.left, sr.top - box.top + sr.height / 2], ...stopp.map(mitt), mitt(mal)];

      /* Catmull-Rom till kubiska Bézier-segment: mjuk kurva genom alla punkter */
      let s = `M ${p[0][0]} ${p[0][1]}`;
      for (let i = 0; i < p.length - 1; i++) {
        const p0 = p[i - 1] || p[i];
        const p1 = p[i];
        const p2 = p[i + 1];
        const p3 = p[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        s += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
      }
      setD(s);
      setStorlek({ w: box.width, h: box.height });
    };

    rita();
    const ro = new ResizeObserver(rita);
    ro.observe(karta);
    window.addEventListener('resize', rita);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', rita);
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      width={storlek.w || 1}
      height={storlek.h || 1}
      viewBox={`0 0 ${storlek.w || 1} ${storlek.h || 1}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
    >
      {d ? (
        <path
          d={d}
          fill="none"
          stroke="rgba(10, 22, 40, 0.28)"
          strokeWidth="2"
          strokeDasharray="7 10"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}
