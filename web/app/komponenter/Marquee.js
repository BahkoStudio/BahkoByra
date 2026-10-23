'use client';

import { useEffect, useState } from 'react';
import styles from './Marquee.module.css';

/* Kundbältet: direkt efter heron, alla kunder med sin logga (Mathias 2026-10-23).
   Under varje logga står det vi kan belägga: en Google-placering med sökfrasen, eller
   det vi gör åt dem. Inga procent, inga löften. Bältet står still tills besökaren
   scrollat (design-loopen runda 4: på första skärmen får inget vibrera).

   Loggorna kommer från kundernas egna sajter. CK Måleri och Mayka Gulo har ordmärken i
   stället för bildloggor, så de sätts i text. */
const KUNDER = [
  {
    namn: 'Bromma Trädgårdsservice',
    bild: { src: '/img/kunder/bromma.svg', w: 1080, h: 320 },
    rad: 'Etta på "trädgårdsservice i Stockholm"',
  },
  {
    namn: 'Matboden i Huskvarna',
    bild: { src: '/img/kunder/matboden.webp', w: 410, h: 140 },
    rad: 'Etta på "buffé i Huskvarna"',
  },
  {
    namn: 'GD Måleri, Stockholm',
    bild: { src: '/img/kunder/gdmaleri.webp', w: 341, h: 320, kvadrat: true },
    rad: 'Hemsida och Google varje månad',
  },
  {
    namn: 'Smålands Måleri AB',
    bild: { src: '/img/kunder/smamaleri.webp', w: 340, h: 168 },
    rad: 'Ny hemsida, smamaleri.se',
  },
  {
    namn: 'CK Måleri & Golv',
    ord: 'CK Måleri & Golv',
    rad: 'Hemsida och Google varje månad',
  },
  {
    namn: 'Mayka Gulo',
    ord: 'Mayka Gulo',
    mark: 'kock',
    rad: 'Säljsida för kokboken',
  },
];

/* Maykas kockmössa, samma märke som på maykaskitchen.se */
const KOCK = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="19" cy="21" r="9" fill="currentColor" />
    <circle cx="32" cy="14.5" r="11" fill="currentColor" />
    <circle cx="45" cy="21" r="9" fill="currentColor" />
    <rect x="12.5" y="21" width="39" height="14" fill="currentColor" />
    <rect x="11.5" y="35.5" width="41" height="6.5" rx="2" fill="currentColor" />
    <path d="M15.5 42 Q32 60 48.5 42" stroke="#E3A93B" strokeWidth="2.3" strokeLinecap="round" strokeDasharray="0.1 3.2" fill="none" />
    <path d="M32 53.4 V62 M28.8 56.4 H35.2" stroke="#E3A93B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export default function Marquee() {
  const [igang, setIgang] = useState(false);

  useEffect(() => {
    const kolla = () => {
      if (window.scrollY > 24) {
        setIgang(true);
        window.removeEventListener('scroll', kolla);
      }
    };
    kolla();
    window.addEventListener('scroll', kolla, { passive: true });
    return () => window.removeEventListener('scroll', kolla);
  }, []);

  return (
    <section className={`${styles.balte} ${igang ? styles.igang : ''}`} aria-label="Våra kunder">
      <div className="wrap">
        <p className={styles.etikett}>
          Kunder vi sköter sidan och Google åt
        </p>
      </div>
      <div className={styles.spar}>
        {[0, 1].map((k) => (
          <ul key={k} className={styles.set} aria-hidden={k === 1 ? 'true' : undefined}>
            {KUNDER.map((kund) => (
              <li key={kund.namn} className={styles.kund}>
                <span className={styles.logga}>
                  {kund.bild ? (
                    <img
                      src={kund.bild.src}
                      alt={kund.namn}
                      width={kund.bild.w}
                      height={kund.bild.h}
                      className={kund.bild.kvadrat ? styles.kvadrat : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.ord}>
                      {kund.mark === 'kock' ? KOCK : null}
                      {kund.ord}
                    </span>
                  )}
                </span>
                <span className={styles.rad}>{kund.rad}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
