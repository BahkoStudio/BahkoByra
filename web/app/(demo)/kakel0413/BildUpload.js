'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* Kakel 0413: bilduppladdning i kontaktformuläret (Nuh 2026-10-22: "Skicka gärna bilder").
   Mallen (🔒 DemoSida/DemoFormular) har inget filfält, så fältet monteras här under
   "Kort om jobbet" via en portal. DemoFormular bygger FormData(form) av hela formuläret,
   så ett fält med name följer med i anropet till Web3Forms utan att mallen rörs.

   BILAGOR_PA: Web3Forms filbilagor är en PRO-funktion (docs.web3forms.com, File Attachments).
   Gratisnyckeln kan avvisa hela inskicket när en fil följer med. Därför skickas filerna bara
   när BILAGOR_PA = true, dvs. när nyckeln i data.formular / demonyckeln har PRO. Annars visas
   fältet men filerna skickas inte, och besökaren får veta hur bilderna når fram. */
export const BILAGOR_PA = true; // Nuhs nyckel har PRO (Mathias 2026-10-23).
/* Format enligt Web3Forms docs (File Attachments): standarduppladdaren tar EN fil per fält, högst 5 MB,
   och flera filer skickas som separata fält ("multiple file attachments ... we process them together").
   Väljaren nedan har därför inget name; varje vald bild läggs i ett eget dolt fält bild1 … bild5.
   DemoFormular skickar FormData utan Content-Type-header, så webbläsaren sätter multipart själv. */
const MAX_ANTAL = 5;
const MAX_MB = 5;

export default function BildUpload({ epost }) {
  const [mal, setMal] = useState(null);
  const [filer, setFiler] = useState([]);
  const [fel, setFel] = useState('');
  const [dolda, setDolda] = useState(null);

  useEffect(() => {
    const falt = document.querySelector('#kontakt textarea[name="meddelande"]');
    const etikett = falt?.closest('label');
    if (!etikett) return undefined;
    const ruta = document.createElement('div');
    etikett.after(ruta);
    setMal(ruta);
    return () => ruta.remove();
  }, []);

  function valj(e) {
    const valda = Array.from(e.target.files || []);
    let meddelande = '';
    if (valda.length > MAX_ANTAL) meddelande = `Välj högst ${MAX_ANTAL} bilder.`;
    else if (valda.some((f) => f.size > MAX_MB * 1024 * 1024)) meddelande = `Varje bild får vara högst ${MAX_MB} MB.`;
    else if (valda.some((f) => !f.type.startsWith('image/'))) meddelande = 'Välj bara bildfiler.';
    const ok = meddelande ? [] : valda;
    if (meddelande) e.target.value = '';
    setFiler(ok);
    setFel(meddelande);
    // Ett dolt filfält per bild (bild1 … bild5), töms när valet ändras.
    if (dolda) dolda.querySelectorAll('input').forEach((falt, i) => {
      const dt = new DataTransfer();
      if (ok[i]) dt.items.add(ok[i]);
      falt.files = dt.files;
      falt.disabled = !ok[i];
    });
  }

  if (!mal) return null;
  return createPortal(
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      Bilder på jobbet (valfritt)
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={valj}
        style={{ padding: '0.6rem', border: '1px dashed #C9BFAE', borderRadius: 10, background: '#fff', font: 'inherit', fontSize: '0.95rem', cursor: 'pointer' }}
      />
      <span style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.8 }} aria-live="polite">
        {fel || (filer.length ? `${filer.length} ${filer.length === 1 ? 'bild vald' : 'bilder valda'}.` : `Upp till ${MAX_ANTAL} bilder, högst ${MAX_MB} MB styck.`)}
        {!BILAGOR_PA && filer.length ? <> Mejla gärna bilderna till <a href={`mailto:${epost}`}>{epost}</a> också.</> : null}
      </span>
      {BILAGOR_PA ? (
        <span ref={setDolda} hidden>
          {Array.from({ length: MAX_ANTAL }, (_, i) => <input key={i} type="file" name={`bild${i + 1}`} accept="image/*" tabIndex={-1} aria-hidden="true" disabled />)}
        </span>
      ) : null}
    </label>,
    mal,
  );
}
