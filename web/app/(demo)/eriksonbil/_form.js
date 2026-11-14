'use client';

import { useState } from 'react';
import styles from './eriksonbil.module.css';

/* Demoformulär. Skickar INGENTING: inget fetch, ingen action, ingen nyckel.
   Erikson Bil har ingen mottagare än (firman är inte startad). När den finns
   byts det här mot repots DemoFormular med kundens egen Web3Forms-nyckel. */
export default function DemoForm({ knapp, kvitto, children, className }) {
  const [klar, setKlar] = useState(false);
  if (klar) {
    return (
      <div className={styles.kvitto} role="status" tabIndex={-1}>
        <p className={styles.kvittoRubrik}>{kvitto}</p>
        <p>Det här är en demo, så inget skickades. På den riktiga sidan landar det här direkt hos er.</p>
        <button type="button" className={styles.knappGhost} onClick={() => setKlar(false)}>Tillbaka till formuläret</button>
      </div>
    );
  }
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setKlar(true);
      }}
    >
      {children}
      <button type="submit" className={styles.knappGuld}>{knapp}</button>
      <p className={styles.formNot}>Demo: formuläret skickar inget än.</p>
    </form>
  );
}
