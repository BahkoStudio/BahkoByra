'use client';

import { useEffect, useRef } from 'react';
import styles from './MaskotScen.module.css';

/* En maskotscen (Higgsfield-render) med ett levande öga ovanpå — Duolingo-
   känslan Mathias bad om 2026-09-06: han blinkar, tittar mot pekaren och
   mot det håll innehållet kommer ifrån när man scrollar, och spärrar upp
   ögat när det går fort.

   Ögat i rendern täcks av ett SVG-öga på exakt samma plats (koordinaterna
   är uppmätta ur bilderna med scratchpad/hitta-oga.mjs): ögonvita med
   samma skuggning som rendern, pupill med glimt, och ett ögonlock i kubens
   egen gröna ton som fälls ner vid blinkningen. Hela figuren (bild + öga)
   bär idle-studsen från globals.css (.maskot-scen), så ögat följer med.

   oga: { x, y, rx, ry } i procent av bilden, gron: ögonlockets färg.
   Utan oga renderas bara bilden (luppscenen: ögat sitter bakom glaset).
   Vid prefers-reduced-motion: inget blink, ingen pupill som rör sig. */

const MAX_BLICK = 21; // pupillens största förflyttning i SVG-enheter (av 100)

export default function MaskotScen({ src, alt, className = '', width = 640, height = 800, oga, index = 0 }) {
  const rotRef = useRef(null);
  const ogaRef = useRef(null);
  const pupillRef = useRef(null);

  useEffect(() => {
    if (!oga) return undefined;
    const rot = rotRef.current;
    const ogat = ogaRef.current;
    const pupill = pupillRef.current;
    if (!rot || !ogat || !pupill) return undefined;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const vila = { x: 0, y: 0.18 };
    let mal = { ...vila };
    let nu = { ...vila };
    let rafId = null;
    let synlig = false;
    let sistaY = window.scrollY;
    let sistaT = performance.now();
    let stillaTimer = null;

    const rita = () => {
      nu.x += (mal.x - nu.x) * 0.16;
      nu.y += (mal.y - nu.y) * 0.16;
      pupill.style.transform = `translate(${(nu.x * MAX_BLICK).toFixed(2)}px, ${(nu.y * MAX_BLICK).toFixed(2)}px)`;
      const kvar = Math.abs(mal.x - nu.x) + Math.abs(mal.y - nu.y);
      rafId = kvar > 0.003 ? requestAnimationFrame(rita) : null;
    };
    const vack = () => {
      if (rafId === null) rafId = requestAnimationFrame(rita);
    };

    /* Pekaren: pupillen tittar mot den, mer ju närmare den är */
    const vidMus = (e) => {
      if (!synlig) return;
      const r = ogat.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 320);
      mal = { x: (dx / d) * k, y: (dy / d) * k };
      vack();
    };

    /* Scroll: tittar dit innehållet kommer ifrån; spärrar upp ögat om det går fort */
    const vidScroll = () => {
      if (!synlig) return;
      const y = window.scrollY;
      const t = performance.now();
      const v = (y - sistaY) / Math.max(1, t - sistaT); // px per ms
      sistaY = y;
      sistaT = t;
      mal = { x: 0, y: Math.max(-1, Math.min(1, v * 0.8)) };
      vack();
      if (Math.abs(v) > 1.4) rot.classList.add(styles.stor);
      window.clearTimeout(stillaTimer);
      stillaTimer = window.setTimeout(() => {
        rot.classList.remove(styles.stor);
        mal = { ...vila };
        vack();
      }, 280);
    };

    const obs = new IntersectionObserver(
      (poster) => {
        synlig = poster.some((p) => p.isIntersecting);
      },
      { rootMargin: '160px' }
    );
    obs.observe(rot);
    window.addEventListener('mousemove', vidMus, { passive: true });
    window.addEventListener('scroll', vidScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('mousemove', vidMus);
      window.removeEventListener('scroll', vidScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.clearTimeout(stillaTimer);
    };
  }, [oga]);

  const gradId = `maskotVita${index}`;
  const klippId = `maskotKlipp${index}`;

  return (
    <span ref={rotRef} className={`maskot-scen ${styles.rot} ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      {oga && (
        <svg
          ref={ogaRef}
          className={styles.oga}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            left: `${oga.x - oga.rx}%`,
            top: `${oga.y - oga.ry}%`,
            width: `${2 * oga.rx}%`,
            height: `${2 * oga.ry}%`,
            '--lock': oga.gron,
            '--blink-tid': `${4.4 + (index % 3) * 0.9}s`,
            '--blink-delay': `${(index * 1.3) % 3.7}s`,
          }}
        >
          <defs>
            <radialGradient id={gradId} cx="38%" cy="32%" r="72%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.7" stopColor="#f3f6f5" />
              <stop offset="1" stopColor="#c4cfca" />
            </radialGradient>
            <clipPath id={klippId}>
              <circle cx="50" cy="50" r="48" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="48" fill={`url(#${gradId})`} />
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(6, 40, 26, 0.28)" strokeWidth="3" />
          <g ref={pupillRef} className={styles.pupill}>
            <circle cx="50" cy="50" r="19" fill="#0f1412" />
            <circle cx="43.5" cy="43" r="5.5" fill="#ffffff" opacity="0.92" />
          </g>
          <g clipPath={`url(#${klippId})`}>
            <circle className={styles.lock} cx="50" cy="50" r="52" fill="var(--lock, #1a7a52)" />
          </g>
        </svg>
      )}
    </span>
  );
}
