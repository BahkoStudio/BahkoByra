'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SynlighetsPanel.module.css';

const MAL = 68;
const RADER = [
  { ikon: '◍', vad: 'Syns i lokala sökningar', utfall: 'Hittas av fler', ton: 'em' },
  { ikon: '✓', vad: 'Offertknapp på varje skärm', utfall: 'Fler förfrågningar', ton: 'em' },
  { ikon: '⌁', vad: 'Snabb i mobilen', utfall: 'Färre som lämnar', ton: 'lt' },
];

// Illustration av vad en färdig sida gör, inte mätdata från en enskild kund.
const KURVA = [4, 18, 14, 30, 26, 44, 52, 48, 66, 74, 88, 96];

export default function SynlighetsPanel() {
  const [tal, setTal] = useState(0);
  const [igang, setIgang] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (dampad) {
      setTal(MAL);
      setIgang(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([post]) => {
        if (!post.isIntersecting) return;
        obs.disconnect();
        setIgang(true);

        // Räknaren tickar upp med requestAnimationFrame, inget bibliotek.
        const start = performance.now();
        const tid = 1400;
        const steg = (nu) => {
          const p = Math.min(1, (nu - start) / tid);
          const mjuk = 1 - Math.pow(1 - p, 3);
          setTal(Math.round(MAL * mjuk));
          if (p < 1) requestAnimationFrame(steg);
        };
        requestAnimationFrame(steg);
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const omkrets = 2 * Math.PI * 52;
  const fyllt = (tal / 100) * omkrets;

  const punkter = KURVA.map((v, i) => {
    const x = (i / (KURVA.length - 1)) * 260;
    const y = 96 - (v / 100) * 78;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div ref={panelRef} className={`${styles.panel} ${igang ? styles.igang : ''}`}>
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
                className={styles.linje}
                points={punkter}
                fill="none"
                stroke="#047857"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className={styles.rader}>
        {RADER.map((r, i) => (
          <li key={r.vad} style={{ '--fordrojning': `${0.5 + i * 0.16}s` }}>
            <span className={`${styles.ikon} ${r.ton === 'lt' ? styles.ikonLt : ''}`}>{r.ikon}</span>
            <span className={styles.vad}>{r.vad}</span>
            <span className={styles.utfall}>{r.utfall}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
