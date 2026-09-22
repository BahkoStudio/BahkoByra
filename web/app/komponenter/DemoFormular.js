'use client';

import { useState } from 'react';
import { DEMO_NYCKEL } from '../formular';

/* Formuläret i ett hemsideförslag.

   Skickar till Web3Forms och landar hos Bahko Byrå, inte hos firman i förslaget.
   Blir förslaget en skarp sajt byts nyckeln mot kundens egen och inget annat ändras.

   Besökaren lämnar ALDRIG sidan: kvittensen visas på plats. Ett förslag ska kännas
   som firmans egen sajt hela vägen, och en omdirigering till bahkobyra.se avslöjar
   att det inte är det.

   Går anropet inte igenom påstår kvittensen aldrig att något skickats. Då visas
   felet och besökaren får försöka igen eller ringa. Samma regel som på kundsajterna. */

export default function DemoFormular({ className, amne, children }) {
  const [lage, setLage] = useState('redo');

  async function skicka(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setLage('skickar');
    try {
      const data = new FormData(form);
      data.append('access_key', DEMO_NYCKEL);
      data.append('subject', amne);
      data.append('from_name', 'Bahko-förslag');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const svar = await res.json().catch(() => ({}));
      setLage(res.ok && svar.success !== false ? 'klar' : 'fel');
    } catch (err) {
      setLage('fel');
    }
  }

  if (lage === 'klar') {
    return (
      <div className={className} role="status" aria-live="polite">
        <p style={{ fontWeight: 700, fontSize: '1.15rem' }}>Tack! Din förfrågan är skickad.</p>
        <p>Vi läser den så snart vi kan och hör av oss. Har du bråttom går det bra att ringa.</p>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={skicka} aria-describedby="form-not">
      {/* Honungsfälla mot skräppost. Robotar fyller i den, människor ser den inte. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
      <fieldset disabled={lage === 'skickar'} style={{ border: 0, margin: 0, padding: 0, display: 'contents' }}>
        {children}
      </fieldset>
      {lage === 'skickar' ? <p role="status" aria-live="polite">Skickar...</p> : null}
      {lage === 'fel' ? (
        <p role="alert" style={{ fontWeight: 600 }}>
          Något gick fel och förfrågan skickades inte. Försök igen, eller ring oss direkt.
        </p>
      ) : null}
    </form>
  );
}
