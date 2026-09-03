'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroBygge.module.css';

/* Heron "Bygget live": maskoten bygger en hemsida panel för panel.

   Loopen spelas som film på alla skärmar (beslut i design-loopen, runda 2:
   den pinnade scrubben lästes som "sidan har fastnat"; scrubb-koden finns i
   git-historiken, commit f6f9e94, om den ska tillbaka).

   Innan filmen kan spela visas första rutan som <img>: den är LCP-elementet
   och sidan utan skript ser komplett ut. Filmen tonas in först när den
   faktiskt spelar, så scenen aldrig blinkar till, och bubblan kommer in
   först när det finns en bild att prata i.

   prefers-reduced-motion: sista rutan som stillbild, ingen film. */

const BAS = '/brand/maskot/bygge/f-';
const LOOP = '/brand/maskot/bahko-bygger-loop.mp4';
const SISTA = 71;

const ruta = (i) => `${BAS}${String(i).padStart(3, '0')}.webp`;

export default function HeroBygge() {
  const bildRef = useRef(null);
  const [lage, setLage] = useState('bild'); // 'bild' | 'film' | 'stilla'
  const [spelar, setSpelar] = useState(false);
  const [redo, setRedo] = useState(false); // första rutan är laddad → bubblan får komma

  useEffect(() => {
    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setLage(dampad ? 'stilla' : 'film');

    const bild = bildRef.current;
    if (bild && bild.complete && bild.naturalWidth > 0) setRedo(true);
  }, []);

  const klasser = [styles.rot, styles[`lage-${lage}`]];
  if (spelar) klasser.push(styles.spelar);
  if (redo) klasser.push(styles.redo);

  return (
    <div className={klasser.join(' ')}>
      <span className={styles.etikett}>Live: B bygger er sida</span>

      <div className={styles.scen} aria-label="Bahko-maskoten bygger en hemsida, panel för panel" role="img">
        <img
          ref={bildRef}
          className={styles.bild}
          src={lage === 'stilla' ? ruta(SISTA) : ruta(0)}
          alt=""
          width="1200"
          height="675"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setRedo(true)}
        />
        {lage === 'film' && (
          <video
            className={styles.video}
            src={LOOP}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setSpelar(true)}
          />
        )}
      </div>

      <p className={styles.bubbla}>Den här bygger jag åt er. Klar på 48&nbsp;timmar.</p>
    </div>
  );
}
