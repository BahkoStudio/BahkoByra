'use client';

import { useState } from 'react';
import styles from './HeroVideo.module.css';

/**
 * Facade: posterbilden visas direkt, filmen laddas först vid klick (19 MB får inte
 * ligga i sidladdningen). Filmen är Mathias egen "Topp 3 på Google" (2026-11-15), 2 min 12 s,
 * 1080p (19 MB), och ligger på sajten i stället för på YouTube. Den har inbrända ord i bild,
 * så inget textspår behövs.
 */
export default function HeroVideo() {
  const [spelar, setSpelar] = useState(false);

  return (
    <div className={styles.ruta}>
      {spelar ? (
        <video
          className={styles.ram}
          src="/video/topp3-pa-google.mp4"
          poster="/img/video-poster-topp3.webp"
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label="Därför ringer kunden ett annat företag: så hamnar du i topp 3 på Google, Bahko Byrå"
        />
      ) : (
        <button
          type="button"
          className={styles.knapp}
          onClick={() => setSpelar(true)}
          aria-label="Spela videon (2 min): så hamnar du i topp 3 på Google"
        >
          <img src="/img/video-poster-topp3.webp" alt="Bild ur filmen så hamnar du i topp 3 på Google" width="1600" height="900" loading="lazy" decoding="async" />
          <span className={styles.spela}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.langd}>2 min</span>
        </button>
      )}
    </div>
  );
}
