'use client';

import { useEffect, useRef } from 'react';
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
const OMKRETS = 2 * Math.PI * 52;

/** Catmull-Rom till bezier: gör den kantiga punktserien till en mjuk kurva. */
function mjukKurva(varden) {
  const pkt = varden.map((v, i) => [
    (i / (varden.length - 1)) * 260,
    96 - (v / 100) * 78,
  ]);
  let d = `M ${pkt[0][0].toFixed(1)} ${pkt[0][1].toFixed(1)}`;
  for (let i = 0; i < pkt.length - 1; i++) {
    const p0 = pkt[i - 1] || pkt[i];
    const p1 = pkt[i];
    const p2 = pkt[i + 1];
    const p3 = pkt[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const KURVBANA = mjukKurva(KURVA);

export default function SynlighetsPanel() {
  const panelRef = useRef(null);
  const bageRef = useRef(null);
  const talRef = useRef(null);
  const svgRef = useRef(null);
  const kurvaRef = useRef(null);
  const radRefs = useRef([]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const kurvlangd = kurvaRef.current ? kurvaRef.current.getTotalLength() : 430;
    if (kurvaRef.current) {
      kurvaRef.current.style.strokeDasharray = String(kurvlangd);
    }

    // Skriver direkt till DOM i stället för att rendera om varje bildruta.
    const rita = (p) => {
      const tal = Math.round(START + (MAL - START) * p);
      if (bageRef.current) {
        bageRef.current.setAttribute('stroke-dasharray', `${(tal / 100) * OMKRETS} ${OMKRETS}`);
      }
      if (talRef.current) talRef.current.textContent = String(tal);
      if (svgRef.current) svgRef.current.setAttribute('aria-label', `Synlighet ${tal} av 100`);
      if (kurvaRef.current) {
        kurvaRef.current.style.strokeDashoffset = String(kurvlangd * (1 - p));
      }
      radRefs.current.forEach((rad, i) => {
        if (!rad) return;
        const lokal = Math.max(0, Math.min(1, (p - RADER[i].vid) / 0.16));
        rad.style.opacity = lokal;
        rad.style.transform = `translateY(${(1 - lokal) * 12}px)`;
      });
    };

    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (dampad) {
      rita(1);
      return;
    }

    let mal = 0;
    let nu = 0;
    let rafId = null;

    const lasScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const fran = vh * 0.95;
      const till = vh * 0.3;
      mal = Math.max(0, Math.min(1, (fran - r.top) / (fran - till)));
    };

    /* Utjamning: varje bildruta glider varden en bit narmare scrollens mal.
       Utan den blir rorelsen lika hackig som hjulets steg. Loopen stannar nar
       den kommit fram och vaknar igen vid nasta scroll. */
    const rulle = () => {
      const kvar = mal - nu;
      if (Math.abs(kvar) < 0.0008) {
        nu = mal;
        rita(nu);
        rafId = null;
        return;
      }
      nu += kvar * 0.14;
      rita(nu);
      rafId = requestAnimationFrame(rulle);
    };

    const vackLoopen = () => {
      lasScroll();
      if (rafId === null) rafId = requestAnimationFrame(rulle);
    };

    lasScroll();
    nu = mal;
    rita(nu);

    window.addEventListener('scroll', vackLoopen, { passive: true });
    window.addEventListener('resize', vackLoopen);
    return () => {
      window.removeEventListener('scroll', vackLoopen);
      window.removeEventListener('resize', vackLoopen);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

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
          <svg ref={svgRef} viewBox="0 0 120 120" role="img" aria-label="Synlighet 10 av 100">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="9" />
            <circle
              ref={bageRef}
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${(START / 100) * OMKRETS} ${OMKRETS}`}
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
            <strong ref={talRef}>{START}</strong>
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
              <path
                ref={kurvaRef}
                d={KURVBANA}
                fill="none"
                stroke="#047857"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className={styles.rader}>
        {RADER.map((r, i) => (
          <li
            key={r.vad}
            ref={(node) => {
              radRefs.current[i] = node;
            }}
            style={{ opacity: 0 }}
          >
            <span className={`${styles.ikon} ${r.ton === 'lt' ? styles.ikonLt : ''}`}>{r.ikon}</span>
            <span className={styles.vad}>{r.vad}</span>
            <span className={styles.utfall}>{r.utfall}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
