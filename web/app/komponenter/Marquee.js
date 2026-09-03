'use client';

import { useEffect, useState } from 'react';
import styles from './Marquee.module.css';

/* Bevisremsan: kundsajternas domäner varvade med löftena.
   Står still tills besökaren scrollat (design-loopen runda 4: på första
   skärmen får bara filmen röra sig, annars vibrerar sidan). */
const RAD = [
  'smamaleri.se',
  'Förslag inom 48 timmar',
  'brommatradgardsservice.se',
  'Ni äger sidan',
  'maykaskitchen.se',
  'Synlighet som säljer',
];

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
    <div className={`${styles.marquee} ${igang ? styles.igang : ''}`} aria-hidden="true">
      <div className={styles.spar}>
        {[0, 1].map((k) => (
          <div key={k} className={styles.set}>
            {RAD.map((m) => (
              <span key={m}>
                {m}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
