'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SynlighetsPanel.module.css';

// Dag 1 ligger på 10 %, dag 90 landar på 88 %. Kurvan spänner över samma spann.
const START = 10;
const MAL = 88;

const RADER = [
  { ikon: '◍', vad: 'Syns i lokala sökningar', utfall: 'Hittas av fler', ton: 'em', vid: 0.4 },
  { ikon: '✓', vad: 'Offertknapp på varje skärm', utfall: 'Fler förfrågningar', ton: 'em', vid: 0.58 },
  { ikon: '⌁', vad: 'Snabb i mobilen', utfall: 'Färre som lämnar', ton: 'lt', vid: 0.76 },
];

// Illustration av utvecklingen över 90 dagar, inte mätdata från en enskild kund.
const KURVA = [10, 15, 13, 21, 27, 25, 34, 41, 38, 49, 57, 63, 60, 71, 80, 88];
const KURVLANGD = 430;

export default function SynlighetsPanel() {
  // 0 = panelen kommer underifrån, 1 = fullt utvecklad. Styrs av scrollpositionen.
  const [p, setP] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (dampad) {
      setP(1);
      return;
    }

    let rafId = null;

    const berakna = () => {
      rafId = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Nollpunkt: panelens överkant vid nedre kanten av fönstret.
      // Ett: panelen har rest sig till drygt en tredjedel upp i fönstret.
      const fran = vh * 0.95;
      const till = vh * 0.3;
      const andel = (fran - r.top) / (fran - till);
      setP(Math.max(0, Math.min(1, andel)));
    };

    // Scrollhändelser samlas i en bildruta så vi inte räknar om i onödan.
    const vidScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(berakna);
    };

    berakna();
    window.addEventListener('scroll', vidScroll, { passive: true });
    window.addEventListener('resize', vidScroll);
    return () => {
      window.removeEventListener('scroll', vidScroll);
      window.removeEventListener('resize', vidScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const tal = Math.round(START + (MAL - START) * p);
  const omkrets = 2 * Math.PI * 52;
  const fyllt = (tal / 100) * omkrets;

  const punkter = KURVA.map((v, i) => {
    const x = (i / (KURVA.length - 1)) * 260;
    const y = 96 - (v / 100) * 78;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div ref={panelRef} className={styles.panel}>
      <div className={styles.topp}>
        <span className={styles.titel}>Din synlighet</span>
        <span className={styles.status}>
          <i /> live
        </span>
      </div>

      <div className={styles.rutnat}>
        <div className={styles.matare}>
          <svg viewBox="0 0 120 120" role="img" aria-label={`Synlighet ${tal} av 100`}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${fyllt} ${omkrets}`}
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#34D399" />
                <stop offset="1" stopColor="#047857" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.talruta}>
            <strong>{tal}</strong>
            <span>/100</span>
          </div>
        </div>

        <div className={styles.hoger}>
          <div className={styles.etikett}>
            <b>Synlighet</b>
            <span>Från osedd till hittad</span>
          </div>

          <div className={styles.graf}>
            <div className={styles.grafTopp}>
              <span>Kundförfrågningar</span>
              <span className={styles.period}>90 dagar</span>
            </div>
            <svg viewBox="0 0 260 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points={punkter}
                fill="none"
                stroke="#047857"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={KURVLANGD}
                strokeDashoffset={KURVLANGD * (1 - p)}
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className={styles.rader}>
        {RADER.map((r) => {
          // Varje rad kommer in på sin egen punkt i scrollen och backar om man scrollar upp.
          const lokal = Math.max(0, Math.min(1, (p - r.vid) / 0.16));
          return (
            <li
              key={r.vad}
              style={{ opacity: lokal, transform: `translateY(${(1 - lokal) * 12}px)` }}
            >
              <span className={`${styles.ikon} ${r.ton === 'lt' ? styles.ikonLt : ''}`}>{r.ikon}</span>
              <span className={styles.vad}>{r.vad}</span>
              <span className={styles.utfall}>{r.utfall}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
