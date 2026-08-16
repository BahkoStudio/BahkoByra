'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Popup.module.css';
import Maskot from './Maskot';

// Sekunder innan popupen visas, och innan den kommer tillbaka efter en stängning.
const INTERVALL = 30;

export default function Popup() {
  const [oppen, setOppen] = useState(false);
  const kortRef = useRef(null);
  const timer = useRef(null);

  const schemalagg = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOppen(true), INTERVALL * 1000);
  }, []);

  useEffect(() => {
    schemalagg();
    return () => clearTimeout(timer.current);
  }, [schemalagg]);

  const stang = useCallback(() => {
    setOppen(false);
    schemalagg();
  }, [schemalagg]);

  // Escape stänger, och fokus flyttas in i kortet när det öppnas.
  useEffect(() => {
    if (!oppen) return;
    const vidTangent = (e) => {
      if (e.key === 'Escape') stang();
    };
    document.addEventListener('keydown', vidTangent);
    kortRef.current?.focus();
    return () => document.removeEventListener('keydown', vidTangent);
  }, [oppen, stang]);

  if (!oppen) return null;

  return (
    <div className={styles.lager}>
      <button className={styles.skugga} onClick={stang} aria-label="Stäng" tabIndex={-1} />
      <div
        className={styles.kort}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-rubrik"
        ref={kortRef}
        tabIndex={-1}
      >
        <button className={styles.stang} onClick={stang} aria-label="Stäng">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <Maskot pose="vinkar" stil="popup" alt="Bahko-maskoten vinkar" />

        <span className={styles.tagg}>Kostnadsfri hemsideanalys</span>
        <h2 id="popup-rubrik">Vill ni veta vad som stoppar kunderna?</h2>
        <p>
          Vi går igenom er sida mot tio punkter och skickar en personlig rapport: vad som gör att
          folk hör av sig, och vad som får dem att lämna. Svar inom 24 timmar.
        </p>

        <a href="/foretag/gratis-granskning.html" className="btn btn-primar">
          Få min gratis analys
        </a>
        <button className={styles.senare} onClick={stang}>
          Inte nu
        </button>
      </div>
    </div>
  );
}
