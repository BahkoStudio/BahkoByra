'use client';

import { useState } from 'react';
import { DEMO_NYCKEL, TACK } from '../formular';

/* Formuläret i ett hemsideförslag.

   Skickar till Web3Forms och landar hos Bahko Byrå, inte hos firman i förslaget.
   Blir förslaget en skarp sajt byts nyckeln mot kundens egen och inget annat ändras.

   Besökaren lämnar ALDRIG sidan: kvittensen visas på plats. Ett förslag ska kännas
   som firmans egen sajt hela vägen, och en omdirigering till bahkobyra.se avslöjar
   att det inte är det.

   Går anropet inte igenom påstår kvittensen aldrig att något skickats. Då visas
   felet och besökaren får försöka igen eller ringa. Samma regel som på kundsajterna. */

export default function DemoFormular({ className, amne, children, nyckel = DEMO_NYCKEL, fran = 'Bahko-förslag', tack, kvittens, reserv = 'mailto:mathias@bahkobyra.se' }) {
  const [lage, setLage] = useState('redo');

  async function skicka(e) {
    const form = e.currentTarget;
    // Ingen nyckel ifylld: låt formuläret göra som förut (mailto via action), skicka inget tomt.
    if (!nyckel) return;
    e.preventDefault();
    setLage('skickar');
    try {
      const data = new FormData(form);
      data.append('access_key', nyckel);
      data.append('subject', amne);
      data.append('from_name', fran);
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
        {kvittens || (
          <>
            <p style={{ fontWeight: 700, fontSize: '1.15rem' }}>Tack! Din förfrågan är skickad.</p>
            <p>Vi läser den så snart vi kan och hör av oss. Har du bråttom går det bra att ringa.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={skicka}
      aria-describedby="form-not"
      {...(nyckel
        ? tack
          ? { action: 'https://api.web3forms.com/submit', method: 'POST' }
          : {}
        : { action: reserv, method: 'post', encType: 'text/plain' })}
    >
      {tack && nyckel ? (
        <>
          <input type="hidden" name="access_key" value={nyckel} />
          <input type="hidden" name="subject" value={amne} />
          <input type="hidden" name="from_name" value={fran} />
          <input type="hidden" name="redirect" value={tack === true ? TACK : tack} />
        </>
      ) : null}
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
