'use client';

import { useState } from 'react';
import styles from './Faq.module.css';

/**
 * Dragspel: en fråga i taget. Öppnar man en ny stängs den förra automatiskt.
 * Byggt med knappar och aria-expanded i stället för <details> så att höjden
 * kan animeras mjukt (grid-template-rows 0fr → 1fr).
 */
export default function Faq({ frager, mork = false }) {
  const [oppen, setOppen] = useState(null);

  return (
    <div className={`${styles.lista} ${mork ? styles.mork : ''}`}>
      {frager.map((f, i) => {
        const aktiv = oppen === i;
        return (
          <div key={f.fraga} className={`${styles.post} ${aktiv ? styles.aktiv : ''}`}>
            <h3 className={styles.rubrik}>
              <button
                type="button"
                className={styles.knapp}
                aria-expanded={aktiv}
                aria-controls={`faq-svar-${i}`}
                onClick={() => setOppen(aktiv ? null : i)}
              >
                <span>{f.fraga}</span>
                <span className={styles.tecken} aria-hidden="true" />
              </button>
            </h3>
            {/* Ingen hidden-attribut här: den skulle döda höjdanimationen.
                CSS sköter både utfällningen och att stängt svar tas ur läsordningen. */}
            <div id={`faq-svar-${i}`} className={styles.svarYta} role="region">
              <div className={styles.svarInner}>
                <p>{f.svar}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
