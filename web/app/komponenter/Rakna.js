'use client';

import { useEffect, useRef } from 'react';

/* Räknare som tickar upp till sitt värde när den scrollas in i bild.
   Slutvärdet står i markupen från start, så sidan utan skript (och
   sökmotorn) ser rätt siffra. Körs en gång per sidladdning. */
export default function Rakna({ till, suffix = '', decimaler = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (dampad || !('IntersectionObserver' in window)) return undefined;

    let rafId = null;
    const kor = () => {
      const start = performance.now();
      const langd = 1100;
      const steg = (t) => {
        const p = Math.min(1, (t - start) / langd);
        const lattad = 1 - Math.pow(1 - p, 2); // power1.out
        el.textContent = (till * lattad).toFixed(decimaler);
        if (p < 1) rafId = requestAnimationFrame(steg);
        else el.textContent = till.toFixed(decimaler);
      };
      el.textContent = (0).toFixed(decimaler);
      rafId = requestAnimationFrame(steg);
    };

    const obs = new IntersectionObserver(
      (poster) => {
        if (poster.some((p) => p.isIntersecting)) {
          kor();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [till, decimaler]);

  return (
    <>
      <span ref={ref}>{till.toFixed(decimaler)}</span>
      {suffix}
    </>
  );
}
