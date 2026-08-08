'use client';

import { useState } from 'react';
import styles from './HeroVideo.module.css';

const ID = 'ZjvHsth4NJM';

/**
 * Facade: posterbilden visas direkt, YouTube-iframen laddas först vid klick.
 * Embeden drar ~860 kB JS och låste huvudtråden i gamla sajten, så den får
 * inte ligga i sidladdningen.
 */
export default function HeroVideo() {
  const [spelar, setSpelar] = useState(false);

  return (
    <div className={styles.ruta}>
      {spelar ? (
        <iframe
          className={styles.ram}
          src={`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`}
          title="Därför syns inte ditt företag på Google, Bahko Byrå"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.knapp}
          onClick={() => setSpelar(true)}
          aria-label="Spela videon: därför syns inte ditt företag på Google"
        >
          <img src="/img/video-poster.webp" alt="" width="1280" height="720" />
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
