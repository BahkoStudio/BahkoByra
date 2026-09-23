'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Popup.module.css';
import Maskot from './Maskot';

// Sekunder innan popupen visas. Den visas högst en gång per besök, aldrig på
// sidorna där besökaren redan är på väg att höra av sig, och aldrig mitt i ett formulär.
const FORDROJNING = 30;
const NYCKEL = 'bb_popup_sedd';
const TYST = /^[/](kontakt|tack|integritet)/;

function sedd() {
  try {
    return sessionStorage.getItem(NYCKEL) === '1';
  } catch {
    return false;
  }
}

function markeraSedd() {
  try {
    sessionStorage.setItem(NYCKEL, '1');
  } catch {}
}

export default function Popup() {
  const sokvag = usePathname() || '';
  const [oppen, setOppen] = useState(false);
  const kortRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (TYST.test(sokvag) || sedd()) return;
    const forsok = () => {
      // Skriver besökaren i ett formulär väntar vi tio sekunder till.
      if (document.activeElement?.closest?.('form')) {
        timer.current = setTimeout(forsok, 10000);
        return;
      }
      if (sedd()) return;
      markeraSedd();
      setOppen(true);
    };
    timer.current = setTimeout(forsok, FORDROJNING * 1000);
    return () => clearTimeout(timer.current);
  }, [sokvag]);

  const stang = useCallback(() => setOppen(false), []);

  // Escape stänger, och fokus flyttas in i kortet när det öppnas.
  useEffect(() => {
    if (!oppen) return;
    const vidTangent = (e) => {
      if (e.key === 'Escape') stang();
    };
    document.addEventListener('keydown', vidTangent);
    kortRef.current?.focus();
    // Bokningsraden läser data-lager och gömmer sig medan popupen är öppen
    document.body.setAttribute('data-lager', 'popup');
    return () => {
      document.removeEventListener('keydown', vidTangent);
      document.body.removeAttribute('data-lager');
    };
  }, [oppen, stang]);

  if (!oppen || TYST.test(sokvag)) return null;

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

        <Maskot pose="pekar" stil="popup" alt="Bahko-maskoten pekar på erbjudandet" />

        <span className={styles.tagg}>Kostnadsfritt förslag</span>
        <h2 id="popup-rubrik">Se er nya hemsida innan ni bestämmer er.</h2>
        <p>
          Vi bygger ett förslag på er nya hemsida inom 48 timmar. Ni ser exakt vad ni får,
          innan ni bestämmer något. Kostar inget.
        </p>

        <a href="/kontakt/" className="btn btn-primar">
          Se er sida kostnadsfritt
        </a>
        <button className={styles.senare} onClick={stang}>
          Inte nu
        </button>
      </div>
    </div>
  );
}
