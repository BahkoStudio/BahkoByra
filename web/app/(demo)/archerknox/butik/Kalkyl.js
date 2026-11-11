'use client';

import { useState } from 'react';

/* Räknaren "Hur många meter?" (2026-11-11). Ren aritmetik på butikens egna priser:
   fågelbandet säljs styckvis (0,5 m) och i kartong om 30 m. Räknar ut antal band och
   billigaste köpet, och länkar till rätt produkt i butiken. Utan JavaScript syns
   startvärdet (10 m) som vanlig text. */
export default function Kalkyl({ klass: s, styckPris, kartongPris, styckHref, kartongHref }) {
  const [meter, setMeter] = useState(10);
  const m = Math.max(1, Math.min(300, Number(meter) || 1));
  const band = Math.ceil(m / 0.5);
  const kr = (n) => `${Math.round(n).toLocaleString('sv-SE')} kr`;
  // Tre sätt att köpa: bara styckvis, bara kartonger, eller hela kartonger plus resten styckvis.
  const helaKartonger = Math.floor(m / 30);
  const restBand = Math.ceil((m - helaKartonger * 30) / 0.5);
  const alt = [
    { txt: `${band} band à 0,5 m`, pris: band * styckPris, href: styckHref, knapp: 'Köp styckvis' },
    { txt: `${Math.ceil(m / 30)} kartong${Math.ceil(m / 30) > 1 ? 'er' : ''} à 30 m`, pris: Math.ceil(m / 30) * kartongPris, href: kartongHref, knapp: 'Köp kartong' },
    ...(helaKartonger > 0 && restBand > 0 ? [{ txt: `${helaKartonger} kartong${helaKartonger > 1 ? 'er' : ''} och ${restBand} band`, pris: helaKartonger * kartongPris + restBand * styckPris, href: kartongHref, knapp: 'Köp kartong' }] : []),
  ].sort((a, b) => a.pris - b.pris);
  const bast = alt[0];
  return (
    <div className={s.kalkyl}>
      <label className={s.kalkylFalt}>
        <span>Meter runt panelerna</span>
        <span className={s.kalkylRad}>
          <input type="range" min="1" max="120" step="1" value={Math.min(m, 120)} onChange={(e) => setMeter(e.target.value)} aria-label="Meter runt panelerna" />
          <input type="number" min="1" max="300" inputMode="numeric" value={meter} onChange={(e) => setMeter(e.target.value)} aria-label="Meter" />
          <b>m</b>
        </span>
      </label>
      <div className={s.kalkylSvar} aria-live="polite">
        <p className={s.kalkylStor}>{band} band</p>
        <p>Billigast: <strong>{bast.txt}</strong>, {kr(bast.pris)}</p>
        <a className={s.knapp} href={bast.href} target="_blank" rel="noopener">{bast.knapp}</a>
      </div>
    </div>
  );
}
