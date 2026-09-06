'use client';

import { useEffect, useRef } from 'react';
import styles from './MaskotFilm.module.css';

/* En maskotscen som riktig film: Higgsfield-animerad (Seedance 2.5) loop,
   utklippt ur videon till ett WebP-ark med genomskinlig bakgrund
   (scratchpad/sprite.mjs: alla rutor i ett rutnät, en enda fil), spelat
   ruta för ruta på en canvas. Så får figuren riktig 3D-rörelse (andas,
   blinkar, gestikulerar) och står ändå fri mot vilken bakgrund som helst —
   en mp4 kan inte vara genomskinlig.

   Rutan väljs efter klockan (elapsed × fps), inte genom att räkna upp ett
   steg per tick: ligger webbläsaren efter hoppar filmen fram i stället för
   att sacka (Mathias 2026-09-06: "hänger inte med"). 24 fps.

   Stillbilden ligger alltid som <img> under canvasen: den syns innan
   skriptet kört, utan skript, och vid prefers-reduced-motion (då spelas
   ingenting). Arket laddas först när figuren närmar sig bild, och släpps
   ur minnet när den lämnat bild — ett ark avkodat är ~60 MB, fem samtidigt
   skulle knäcka en mobil.

   ark: { src, fps, ramar, kolumner, bredd, hojd } — ur sprite.mjs:s json. */

export default function MaskotFilm({ still, ark, alt, className = '' }) {
  const rotRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const rot = rotRef.current;
    const canvas = canvasRef.current;
    if (!rot || !canvas || !ark) return undefined;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const { src, fps, ramar, kolumner, bredd, hojd } = ark;
    const ctx = canvas.getContext('2d');
    let bild = null;
    let laddar = false;
    let synlig = false;
    let rafId = null;
    let avbruten = false;
    let start = 0;
    let senasteIndex = -1;

    const rita = (index) => {
      const sx = (index % kolumner) * bredd;
      const sy = Math.floor(index / kolumner) * hojd;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bild, sx, sy, bredd, hojd, 0, 0, canvas.width, canvas.height);
    };

    const spela = (t) => {
      if (avbruten || !synlig) {
        rafId = null;
        return;
      }
      if (bild) {
        if (!start) start = t;
        const index = Math.floor(((t - start) / 1000) * fps) % ramar;
        if (index !== senasteIndex) {
          senasteIndex = index;
          rita(index);
          if (!rot.classList.contains(styles.igang)) rot.classList.add(styles.igang);
        }
      }
      rafId = requestAnimationFrame(spela);
    };

    const ladda = () => {
      if (bild || laddar) return;
      laddar = true;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        laddar = false;
        if (avbruten) return;
        bild = img;
        start = 0;
        senasteIndex = -1;
      };
      img.onerror = () => {
        laddar = false;
      };
      img.src = src;
    };

    /* Släpper arket när figuren är långt ur bild; stillbilden tar över */
    const slapp = () => {
      bild = null;
      start = 0;
      senasteIndex = -1;
      rot.classList.remove(styles.igang);
    };

    const obs = new IntersectionObserver(
      (poster) => {
        const nu = poster.some((p) => p.isIntersecting);
        synlig = nu;
        if (nu) {
          ladda();
          if (rafId === null) rafId = requestAnimationFrame(spela);
        } else {
          slapp();
        }
      },
      { rootMargin: '400px' }
    );
    obs.observe(rot);

    return () => {
      avbruten = true;
      obs.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ark]);

  return (
    <span ref={rotRef} className={`maskot-scen maskot-film ${styles.rot} ${className}`}>
      <img src={still} alt={alt} width={ark ? ark.bredd : 640} height={ark ? ark.hojd : 800} loading="lazy" decoding="async" />
      <canvas ref={canvasRef} className={styles.canvas} width={ark ? ark.bredd : 300} height={ark ? ark.hojd : 400} aria-hidden="true" />
    </span>
  );
}
