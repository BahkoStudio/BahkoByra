'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from '../_mall/mall.module.css';

/* Kakel 0413, revision 3 (Mathias 2026-10-25): "Kontaktar som" och "Stadsdel/Kommun" i formuläret.
   Mallen (🔒 DemoSida/DemoFormular) har inga sådana fält, så de monteras här före namnfälten via en
   portal, på samma sätt som BildUpload.js. DemoFormular bygger FormData(form) av hela formuläret,
   så fälten kontaktar_som och kommun följer med till Web3Forms utan att mallen rörs.
   Stilen är mallens egen: knappvalen (.kundtyp/.kundtypVal) och .form label/select. */

// Skånes 33 kommuner: Eslöv först (där Nuh utgår från), sedan övriga 32 i svensk
// bokstavsordning (localeCompare 'sv': å, ä, ö sist; Helsingborg före Hässleholm), sist Annan ort.
export const KOMMUNER = [
  'Eslöv',
  'Bjuv', 'Bromölla', 'Burlöv', 'Båstad', 'Helsingborg', 'Hässleholm', 'Höganäs', 'Hörby', 'Höör',
  'Klippan', 'Kristianstad', 'Kävlinge', 'Landskrona', 'Lomma', 'Lund', 'Malmö', 'Osby', 'Perstorp',
  'Simrishamn', 'Sjöbo', 'Skurup', 'Staffanstorp', 'Svalöv', 'Svedala', 'Tomelilla', 'Trelleborg',
  'Vellinge', 'Ystad', 'Åstorp', 'Ängelholm', 'Örkelljunga', 'Östra Göinge',
];
const KONTAKTAR_SOM = ['Privat', 'Företag'];

export default function KontaktFalt() {
  const [mal, setMal] = useState(null);

  useEffect(() => {
    const rad = document.querySelector('#kontakt input[name="namn"]')?.closest('div');
    if (!rad) return undefined;
    const ruta = document.createElement('div');
    // display: contents = fälten blir egna rader i formulärets grid, med samma avstånd som övriga.
    ruta.style.display = 'contents';
    rad.before(ruta);
    setMal(ruta);
    return () => ruta.remove();
  }, []);

  if (!mal) return null;
  return createPortal(
    <>
      <fieldset className={s.kundtyp}>
        <legend>Kontaktar som<span aria-hidden="true"> *</span></legend>
        <div className={s.kundtypVal}>
          {KONTAKTAR_SOM.map((v) => <label key={v}><input type="radio" name="kontaktar_som" value={v} required />{v}</label>)}
        </div>
      </fieldset>
      <label>
        <span>Stadsdel/Kommun<span aria-hidden="true"> *</span></span>
        <select name="kommun" required defaultValue="">
          <option value="" disabled>Välj kommun</option>
          {KOMMUNER.map((k) => <option key={k}>{k}</option>)}
          <option>Annan ort</option>
        </select>
      </label>
    </>,
    mal,
  );
}
