'use client';

import { useEffect, useRef } from 'react';
import styles from './ProcessRail.module.css';

const STEG = [
  {
    n: '01',
    h: 'Du får ett förslag',
    p: 'Vi bygger en riktig sida åt er och skickar den inom 48 timmar. Kostar ingenting och binder er inte vid något.',
  },
  {
    n: '02',
    h: 'Ni tittar och säger till',
    p: 'Gillar ni den gör vi den skarp med era bilder, texter och kontaktuppgifter. Gillar ni den inte är det tack och hej.',
  },
  {
    n: '03',
    h: 'Sidan går live',
    p: 'På er egen domän, inom sju dagar. Ni äger sidan, domänen och allt innehåll.',
  },
  {
    n: '04',
    h: 'Kunderna hittar in',
    p: 'Offertknappen finns på varje skärm och sidan är snabb i mobilen. Vill ni växa vidare finns vi kvar.',
  },
];

/**
 * Korten glider i sidled när sidan scrollas. Ingen egen scrollyta, inget
 * scrollfält att dra i och inga pilar: sidscrollen är enda källan, precis
 * som i panelen.
 */
export default function ProcessRail() {
  const ytaRef = useRef(null);
  const sparRef = useRef(null);
  const spannRef = useRef({ start: 0, langd: 1, vagstracka: 0 });

  useEffect(() => {
    const yta = ytaRef.current;
    const spar = sparRef.current;
    if (!yta || !spar) return;

    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const matUpp = () => {
      const r = yta.getBoundingClientRect();
      const sidY = window.scrollY || 0;
      const vh = window.innerHeight || 800;
      // Rörelsen sker medan sektionen passerar genom fönstret.
      const start = r.top + sidY - vh * 0.85;
      const langd = Math.max(1, r.height + vh * 0.5);
      const vagstracka = Math.max(0, spar.scrollWidth - yta.clientWidth);
      spannRef.current = { start, langd, vagstracka };
    };

    let mal = 0;
    let nu = 0;
    let rafId = null;

    const rita = (p) => {
      const { vagstracka } = spannRef.current;
      spar.style.transform = `translate3d(${-p * vagstracka}px, 0, 0)`;
    };

    const lasScroll = () => {
      const { start, langd } = spannRef.current;
      const p = ((window.scrollY || 0) - start) / langd;
      mal = Math.max(0, Math.min(1, p));
    };

    // Samma utjämning som panelen: värdet glider mot scrollens mål.
    const rulle = () => {
      const kvar = mal - nu;
      if (Math.abs(kvar) < 0.0005) {
        nu = mal;
        rita(nu);
        rafId = null;
        return;
      }
      nu += kvar * 0.14;
      rita(nu);
      rafId = requestAnimationFrame(rulle);
    };

    const vack = () => {
      lasScroll();
      if (rafId === null) rafId = requestAnimationFrame(rulle);
    };

    const vidResize = () => {
      matUpp();
      vack();
    };

    matUpp();
    lasScroll();
    nu = dampad ? mal : mal;
    rita(nu);

    if (!dampad) {
      window.addEventListener('scroll', vack, { passive: true });
    }
    window.addEventListener('resize', vidResize);
    return () => {
      window.removeEventListener('scroll', vack);
      window.removeEventListener('resize', vidResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Inga pilar: sidscrollen är enda styrningen, precis som hinten ovanför säger.
  return (
    <div className={styles.hylla}>
      <div className={styles.yta} ref={ytaRef}>
        <div className={styles.spar} ref={sparRef}>
          {STEG.map((s) => (
            <article key={s.n}>
              <span className={styles.nr}>{s.n}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
