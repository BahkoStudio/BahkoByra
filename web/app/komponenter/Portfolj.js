'use client';

import { useState } from 'react';
import Maskot from './Maskot';
import { PORTFOLJ } from '../portfolj';
import styles from './Portfolj.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const FILTER = [
  { id: 'alla', text: 'Alla' },
  { id: 'kund', text: 'Kunder' },
  { id: 'demo', text: 'Demos' },
];

/* Siterabbits-mönstret: ett rutnät av riktiga sajter med kategori, namn och
   en rad om vad sidan gör. Filtret är bara ett urval, ingen sortering —
   ordningen är kunder först, demos sedan. */
export default function Portfolj() {
  const [filter, setFilter] = useState('alla');
  const kort = PORTFOLJ.filter((k) => filter === 'alla' || k.typ === filter);

  return (
    <div className={styles.rot}>
      <div className={styles.chips} role="group" aria-label="Visa">
        {FILTER.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.chip} ${filter === f.id ? styles.vald : ''}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.text}
          </button>
        ))}
      </div>

      <div className={styles.nat}>
        {kort.map((k, i) => (
          <a
            key={k.namn}
            href={k.url}
            target="_blank"
            rel="noopener"
            className={`${styles.kort} ${i === 0 ? styles.forst : ''}`}
          >
            {i === 0 && (
              <span className={styles.kikare}>
                <Maskot pose="kikar" stil="liten" alt="Bahko-maskoten kikar fram bakom kortet" />
              </span>
            )}
            <span className={styles.bild}>
              <img src={k.bild} alt={`Förhandsvisning av ${k.namn}`} loading="lazy" width="640" height="400" />
            </span>
            <span className={styles.kropp}>
              <span className={styles.tagg}>{k.kategori}</span>
              <strong>{k.namn}</strong>
              <span className={styles.rad}>{k.rad}</span>
              <span className={styles.oppna}>
                {k.typ === 'demo' ? 'Öppna demo' : 'Öppna sajt'} {PIL}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
