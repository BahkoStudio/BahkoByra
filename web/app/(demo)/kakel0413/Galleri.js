'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import s from '../_mall/mall.module.css';

/* Kakel 0413: "Våra jobb". Mallen (🔒 _mall) har jobbanden men inga före/efter-reglage och
   banden kräver poster, så galleriet monteras här via en portal före Vanliga frågor.
   Renderar INGENTING när listan är tom (se jobb.js). */

function ForeEfter({ j }) {
  const [v, setV] = useState(50);
  const w = j.bredd || 4; const h = j.hojd || 3;
  return (
    <div style={{ position: 'relative', aspectRatio: `${w} / ${h}`, overflow: 'hidden', borderRadius: 'var(--r)', background: '#ddd', touchAction: 'pan-y' }}>
      <Image src={j.bilder.efter} alt={`Efter: ${j.alt}`} fill sizes="(max-width: 700px) 92vw, 560px" loading="lazy" style={{ objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - v}% 0 0)` }}>
        <Image src={j.bilder.fore} alt={`Före: ${j.alt}`} fill sizes="(max-width: 700px) 92vw, 560px" loading="lazy" style={{ objectFit: 'cover' }} />
      </div>
      <span aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: `${v}%`, width: 3, marginLeft: -1.5, background: '#fff', boxShadow: '0 0 8px rgba(0,0,0,.4)', pointerEvents: 'none' }} />
      <span aria-hidden style={{ ...etikett, left: 10 }}>Före</span>
      <span aria-hidden style={{ ...etikett, right: 10 }}>Efter</span>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(Number(e.target.value))}
        aria-label={`Jämför före och efter: ${j.titel}`} aria-valuetext={`${v} % före`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', margin: 0, opacity: 0, cursor: 'ew-resize' }} />
    </div>
  );
}
const etikett = { position: 'absolute', bottom: 10, padding: '0.2rem 0.6rem', borderRadius: 999, background: 'rgba(0,0,0,.65)', color: '#fff', fontSize: '0.8rem', fontWeight: 600, pointerEvents: 'none' };

export default function Galleri({ jobb }) {
  const [mal, setMal] = useState(null);
  useEffect(() => {
    if (!jobb?.length) return undefined;
    const fore = document.getElementById('fragor');
    if (!fore) return undefined;
    const ruta = document.createElement('div');
    fore.before(ruta);
    setMal(ruta);
    return () => ruta.remove();
  }, [jobb]);
  if (!jobb?.length || !mal) return null;
  return createPortal(
    <section className={s.sek} id="vara-jobb">
      <div className={s.wrap}>
        <div className={s.sekHuvud}>
          <p className={s.eyebrow}>Våra jobb</p>
          <h2 className={s.h2}>Före och efter <em>från riktiga uppdrag</em></h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0', display: 'grid', gap: '1.4rem', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))' }}>
          {jobb.map((j) => (
            <li key={j.titel + (j.src || j.bilder?.efter)}>
              <figure style={{ margin: 0 }}>
                {j.typ === 'fore-efter' ? <ForeEfter j={j} /> : (
                  <div style={{ position: 'relative', aspectRatio: `${j.bredd || 4} / ${j.hojd || 3}`, overflow: 'hidden', borderRadius: 'var(--r)', background: '#ddd' }}>
                    <Image src={j.src} alt={j.alt} fill sizes="(max-width: 700px) 92vw, 560px" loading="lazy" style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <figcaption style={{ marginTop: '0.7rem' }}><b style={{ fontFamily: 'var(--f-rubrik)' }}>{j.titel}</b>{j.plats ? <span style={{ opacity: 0.7 }}> · {j.plats}</span> : null}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>,
    mal,
  );
}
