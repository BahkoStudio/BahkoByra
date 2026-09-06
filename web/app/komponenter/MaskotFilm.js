'use client';

import { useEffect, useRef } from 'react';
import styles from './MaskotFilm.module.css';

/* En maskotscen som riktig film: Higgsfield-animerad (Seedance 2.5) loop,
   utklippt ur videon till ett WebP-ark med genomskinlig bakgrund
   (scratchpad/sprite.mjs: alla ramar i ett rutnät, en enda fil), spelat
   ruta för ruta på en canvas. Så får figuren riktig 3D-rörelse (andas,
   blinkar, gestikulerar) och står ändå fri mot vilken bakgrund som helst —
   en mp4 kan inte vara genomskinlig.

   Stillbilden (scenens vanliga webp) ligger alltid som <img> under
   canvasen: den syns innan skriptet kört, utan skript, och vid
   prefers-reduced-motion (då spelas ingenting). Arket laddas först när
   figuren närmar sig bild, och uppspelningen pausar när den lämnar bild.

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
    const steg = 1000 / fps;
    let bild = null;
    let startad = false;
    let synlig = false;
    let rafId = null;
    let avbruten = false;
    let senaste = 0;
    let index = 0;

    const rita = () => {
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
      if (bild && t - senaste >= steg) {
        senaste = t;
        index = (index + 1) % ramar;
        rita();
        if (!rot.classList.contains(styles.igang)) rot.classList.add(styles.igang);
      }
      rafId = requestAnimationFrame(spela);
    };

    const ladda = () => {
      if (startad) return;
      startad = true;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        bild = img;
      };
      img.src = src;
    };

    const obs = new IntersectionObserver(
      (poster) => {
        const nu = poster.some((p) => p.isIntersecting);
        if (nu && !startad) ladda();
        synlig = nu;
        if (synlig && rafId === null) rafId = requestAnimationFrame(spela);
      },
      { rootMargin: '300px' }
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
