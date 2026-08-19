'use client';

import { useEffect, useRef } from 'react';
import styles from './ProcessRail.module.css';

const STEG = [
  {
    n: '01',
    h: 'Ni får ett förslag',
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
 * Korten glider i sidled när sidan scrollas, och går att dra direkt med mus
 * eller finger. Ingen egen scrollyta och inget scrollfält: scrollen sätter
 * grundläget, greppet lägger en förskjutning ovanpå.
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
    // Greppet ligger ovanpa scrollen som en forskjutning i stallet for att
    // skriva over den. Da slass de aldrig om samma varde, och sidan behover
    // inte hoppa nar man slapper.
    let grepp = 0;

    const klamp = (v) => Math.max(0, Math.min(1, v));

    const rita = (p) => {
      const { vagstracka } = spannRef.current;
      spar.style.transform = `translate3d(${-p * vagstracka}px, 0, 0)`;
    };

    const scrollAndel = () => {
      const { start, langd } = spannRef.current;
      return ((window.scrollY || 0) - start) / langd;
    };

    const lasScroll = () => {
      mal = klamp(scrollAndel() + grepp);
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

    // --- dra med mus eller finger ---
    let provar = false;   // pekaren är nere, riktningen inte avgjord än
    let drar = false;     // riktningen är vågrät, vi styr rörelsen
    let startX = 0;
    let startY = 0;
    let startGrepp = 0;
    let startAndel = 0;

    const vidNer = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (spannRef.current.vagstracka <= 0) return;
      provar = true;
      drar = false;
      startX = e.clientX;
      startY = e.clientY;
      startGrepp = grepp;
      startAndel = scrollAndel();
    };

    const vidRor = (e) => {
      if (!provar) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!drar) {
        // Vänta tills riktningen är tydlig. Ett lodrätt svep ska fortfarande
        // scrolla sidan som vanligt, annars går raden inte att passera på mobil.
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        if (Math.abs(dx) <= Math.abs(dy)) {
          provar = false;
          return;
        }
        drar = true;
        yta.setPointerCapture(e.pointerId);
        yta.classList.add(styles.griper);
      }

      const { vagstracka } = spannRef.current;
      // Forskjutningen klamps sa att summan stannar inom 0..1. Utan det byggs
      // ett overskott upp vid kanterna som maste dras tillbaka innan nagot syns.
      grepp = Math.max(-startAndel, Math.min(1 - startAndel, startGrepp - dx / vagstracka));
      mal = klamp(startAndel + grepp);
      nu = mal; // fingret ska följas 1:1, ingen utjämning under greppet
      rita(nu);
      e.preventDefault();
    };

    const vidSlapp = (e) => {
      if (drar) {
        yta.classList.remove(styles.griper);
        if (yta.hasPointerCapture?.(e.pointerId)) yta.releasePointerCapture(e.pointerId);
      }
      provar = false;
      drar = false;
    };

    matUpp();
    lasScroll();
    nu = mal;
    rita(nu);

    if (!dampad) {
      window.addEventListener('scroll', vack, { passive: true });
    }
    window.addEventListener('resize', vidResize);
    yta.addEventListener('pointerdown', vidNer);
    yta.addEventListener('pointermove', vidRor, { passive: false });
    yta.addEventListener('pointerup', vidSlapp);
    yta.addEventListener('pointercancel', vidSlapp);
    return () => {
      window.removeEventListener('scroll', vack);
      window.removeEventListener('resize', vidResize);
      yta.removeEventListener('pointerdown', vidNer);
      yta.removeEventListener('pointermove', vidRor);
      yta.removeEventListener('pointerup', vidSlapp);
      yta.removeEventListener('pointercancel', vidSlapp);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

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
