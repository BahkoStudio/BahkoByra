'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from '../_mall/mall.module.css';

/* Kakel 0413: Nuhs intro om privat/företag + referensnamnen (SMS 2026-11-09).
   Portas in före #tjanster så den landar direkt efter heron och tejpen, utan att röra 🔒 _mall.
   Bara text, inga logotyper (Skanska m.fl.). */

const NAMN = ['Skanska', 'NCC', 'MVB', 'Peab', 'Tornstaden'];

export default function Referenser() {
  const [mal, setMal] = useState(null);
  useEffect(() => {
    const efter = document.getElementById('tjanster');
    if (!efter) return undefined;
    const ruta = document.createElement('div');
    efter.before(ruta);
    setMal(ruta);
    return () => ruta.remove();
  }, []);
  if (!mal) return null;
  return createPortal(
    <section className={`${s.sek} ${s.sekKram}`} id="referenser" aria-label="Om Kakel 0413">
      <div className={s.wrap} style={{ maxWidth: '42rem', marginInline: 'auto', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: 1.55, color: 'var(--text, #16181B)' }}>
          Kakel 0413 erbjuder tjänster inom kakel och klinker för både privatpersoner och företag.
        </p>
        <p style={{ margin: '0.85rem 0 0', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: 1.55, color: 'var(--text, #16181B)' }}>
          Bakom företaget finns många års erfarenhet inom branschen. Företagets ägare har tidigare arbetat med flera av Sveriges ledande byggföretag, bland annat Skanska, NCC, MVB, Peab och Tornstaden.
        </p>
        <ul style={{
          listStyle: 'none', margin: '1.4rem 0 0', padding: 0,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.55rem 1.1rem',
          fontFamily: 'var(--f-rubrik, inherit)', fontWeight: 700, letterSpacing: '0.02em',
          fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', color: 'var(--accent-text, #B54A00)',
        }}>
          {NAMN.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </section>,
    mal,
  );
}
