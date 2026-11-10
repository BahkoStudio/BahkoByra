'use client';

/* Tjänstesektionen speglar "Våra tjänster" på bahkobyra.se (web/app/(sajt)/page.js
   + page.module.css): runda 3D-märken som hänger över kortens överkant, rubrik och
   en mening, tagg och cirkelpil i foten. Mallen (🔒 _mall) rörs inte; komponenten
   portaleras in i #tjanster och mallens egen wrap döljs i CSS. */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './tjanster.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const M = '/fargatak/media';

const KORT = [
  { id: 'takmalning', namn: 'Takmålning', text: 'Vi målar tak i hela Sverige.', bild: `${M}/ikon-takmalning.webp` },
  { id: 'fargval', namn: 'Färgval', text: 'Du väljer kulör till taket.', bild: `${M}/ikon-fargval.webp` },
  { id: 'klart', namn: 'Ett tak som ser nytt ut', text: 'Ett nymålat tak syns från gatan.', bild: `${M}/ikon-klart.webp` },
];

export default function Tjanster() {
  const [mal, setMal] = useState(null);

  useEffect(() => {
    const sek = document.querySelector('section#tjanster');
    if (!sek) return;
    let mount = sek.querySelector('[data-ft-tjanster]');
    if (!mount) {
      mount = document.createElement('div');
      mount.setAttribute('data-ft-tjanster', '');
      sek.appendChild(mount);
    }
    setMal(mount);
  }, []);

  if (!mal) return null;

  return createPortal(
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <span className={styles.kicker}>Tjänster</span>
        <h2 className={styles.rubrik}>
          Det här <span className={styles.accent}>gör vi.</span>
        </h2>
        <p className={styles.lede}>Takmålning i hela Sverige.</p>
      </div>
      <div className={styles.nat}>
        {KORT.map((t) => (
          <a key={t.id} href="#kontakt" className={styles.kort}>
            <span className={styles.marke}>
              <img src={t.bild} alt="" width="640" height="640" loading="lazy" decoding="async" />
            </span>
            <h3>{t.namn}</h3>
            <p>{t.text}</p>
            <span className={styles.fot}>
              <span className={styles.tagg}>Begär offert</span>
              <span className={styles.pil}>{PIL}</span>
            </span>
          </a>
        ))}
      </div>
    </div>,
    mal,
  );
}
