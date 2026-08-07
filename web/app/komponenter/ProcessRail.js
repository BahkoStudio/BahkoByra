'use client';

import { useEffect, useRef, useState } from 'react';
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
 * Horisontell process med scroll-knappar. CSS scroll-snap i stället för
 * pinnad GSAP-scroll: samma känsla, men utan bibliotek som låser huvudtråden.
 */
export default function ProcessRail() {
  const spar = useRef(null);
  const [kanBak, setKanBak] = useState(false);
  const [kanFram, setKanFram] = useState(true);

  const las = () => {
    const el = spar.current;
    if (!el) return;
    setKanBak(el.scrollLeft > 8);
    setKanFram(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    las();
    const el = spar.current;
    if (!el) return;

    /* Mushjulet scrollar spåret i sidled. Vid kanterna släpps scrollen
       vidare till sidan, annars fastnar man i spåret och kommer inte förbi. */
    const vidHjul = (e) => {
      // Trackpad i sidled sköter webbläsaren redan korrekt.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const framat = e.deltaY > 0;
      const kvarFram = el.scrollWidth - el.clientWidth - el.scrollLeft;
      if (framat && kvarFram <= 1) return;
      if (!framat && el.scrollLeft <= 1) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('scroll', las, { passive: true });
    // passive: false kravs for att preventDefault ska bita pa hjulet.
    el.addEventListener('wheel', vidHjul, { passive: false });
    window.addEventListener('resize', las);
    return () => {
      el.removeEventListener('scroll', las);
      el.removeEventListener('wheel', vidHjul);
      window.removeEventListener('resize', las);
    };
  }, []);

  const flytta = (riktning) => {
    const el = spar.current;
    if (!el) return;
    const kort = el.querySelector('article');
    const steg = kort ? kort.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: riktning * steg, behavior: 'smooth' });
  };

  return (
    <div className={styles.hylla}>
      <div className={styles.knappar}>
        <button
          type="button"
          onClick={() => flytta(-1)}
          disabled={!kanBak}
          aria-label="Visa föregående steg"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => flytta(1)}
          disabled={!kanFram}
          aria-label="Visa nästa steg"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.spar} ref={spar} tabIndex={0} role="group" aria-label="Processens steg, skrolla i sidled">
        {STEG.map((s) => (
          <article key={s.n}>
            <span className={styles.nr}>{s.n}</span>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
