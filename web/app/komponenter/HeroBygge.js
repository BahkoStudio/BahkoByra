'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroBygge.module.css';

/* Heron "Bygget live": maskoten bygger en hemsida panel för panel, och
   scrollen styr hur långt han kommit. Bildrutorna är 72 webp-rutor ur
   bahko-bygger-loop.mp4 (tools/assets/bygge-frames.sh), ritade på en canvas.

   Tre lägen, valda vid montering:
     canvas  desktop ≥ 900 px — scrollstyrd, pinnad sektion (220 vh)
     video   under 900 px — loopen spelas som vanlig autoplay-video
     stilla  prefers-reduced-motion — sista rutan som stillbild

   Innan JavaScript kört visas alltid första rutan som <img>: det är LCP-
   elementet, och sidan utan skript ser komplett ut. */

const ANTAL = 72;
const BAS = '/brand/maskot/bygge/f-';
const LOOP = '/brand/maskot/bahko-bygger-loop.mp4';
const FORST = 8; // rutor som laddas innan canvasen tar över

const ruta = (i) => `${BAS}${String(i).padStart(3, '0')}.webp`;

export default function HeroBygge() {
  const rotRef = useRef(null);
  const canvasRef = useRef(null);
  const streckRefs = useRef([]);
  const [lage, setLage] = useState('bild'); // 'bild' | 'canvas' | 'video' | 'stilla'

  useEffect(() => {
    const dampad =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (dampad) {
      setLage('stilla');
      return undefined;
    }
    if (window.innerWidth < 900) {
      setLage('video');
      return undefined;
    }

    const rot = rotRef.current;
    const canvas = canvasRef.current;
    const sektion = rot ? rot.closest('section') : null;
    if (!rot || !canvas || !sektion) return undefined;

    const ctx = canvas.getContext('2d');
    const bilder = new Array(ANTAL);
    let laddade = 0;
    let visarCanvas = false;
    let avbruten = false;

    /* Cover-fit: rutan fyller ytan som object-fit: cover, oavsett format. */
    const rita = (i) => {
      const bild = bilder[i];
      if (!bild || !visarCanvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const skala = Math.max(w / bild.naturalWidth, h / bild.naturalHeight);
      const bw = bild.naturalWidth * skala;
      const bh = bild.naturalHeight * skala;
      ctx.drawImage(bild, (w - bw) / 2, (h - bh) / 2, bw, bh);
    };

    const matUpp = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = rot.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };

    let mal = 0;
    let nu = 0;
    let senasteRuta = -1;
    let rafId = null;

    const lasScroll = () => {
      const r = sektion.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const stracka = Math.max(1, r.height - vh);
      mal = Math.max(0, Math.min(1, -r.top / stracka));
    };

    const visa = (p) => {
      const i = Math.round(p * (ANTAL - 1));
      if (i !== senasteRuta && bilder[i]) {
        rita(i);
        senasteRuta = i;
      }
      // Fyra streck, ett per byggpanel
      streckRefs.current.forEach((s, k) => {
        if (!s) return;
        const lokal = Math.max(0, Math.min(1, p * 4 - k));
        s.style.transform = `scaleX(${lokal})`;
      });
    };

    /* Samma utjämning som SynlighetsPanel: värdet glider mot scrollens mål. */
    const rulle = () => {
      const kvar = mal - nu;
      if (Math.abs(kvar) < 0.0008) {
        nu = mal;
        visa(nu);
        rafId = null;
        return;
      }
      nu += kvar * 0.14;
      visa(nu);
      rafId = requestAnimationFrame(rulle);
    };

    const vack = () => {
      lasScroll();
      if (rafId === null) rafId = requestAnimationFrame(rulle);
    };

    const vidResize = () => {
      matUpp();
      senasteRuta = -1;
      vack();
    };

    const laddaEn = (i) =>
      new Promise((klar) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          bilder[i] = img;
          laddade += 1;
          klar();
        };
        img.onerror = () => klar();
        img.src = ruta(i);
      });

    /* De första rutorna laddas direkt så canvasen kan ta över tidigt; resten
       i batchar när webbläsaren har tid, så heron aldrig blockerar. */
    const laddaResten = (fran) => {
      if (avbruten || fran >= ANTAL) return;
      const till = Math.min(ANTAL, fran + FORST);
      const jobb = [];
      for (let i = fran; i < till; i++) jobb.push(laddaEn(i));
      Promise.all(jobb).then(() => {
        if (avbruten) return;
        senasteRuta = -1;
        visa(nu);
        const nasta = () => laddaResten(till);
        if ('requestIdleCallback' in window) window.requestIdleCallback(nasta, { timeout: 400 });
        else window.setTimeout(nasta, 60);
      });
    };

    const forsta = [];
    for (let i = 0; i < FORST; i++) forsta.push(laddaEn(i));
    Promise.all(forsta).then(() => {
      if (avbruten) return;
      matUpp();
      visarCanvas = true;
      setLage('canvas');
      lasScroll();
      nu = mal;
      visa(nu);
      laddaResten(FORST);
    });

    window.addEventListener('scroll', vack, { passive: true });
    window.addEventListener('resize', vidResize);
    return () => {
      avbruten = true;
      window.removeEventListener('scroll', vack);
      window.removeEventListener('resize', vidResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rotRef} className={`${styles.rot} ${styles[lage] || ''}`}>
      <span className={styles.etikett}>Scrolla, B bygger vidare</span>

      <div className={styles.scen} aria-label="Bahko-maskoten bygger en hemsida, panel för panel" role="img">
        {/* Första rutan är alltid med: LCP och fallback utan skript */}
        <img
          className={styles.bild}
          src={lage === 'stilla' ? ruta(ANTAL - 1) : ruta(0)}
          alt=""
          width="1200"
          height="675"
          fetchPriority="high"
          decoding="async"
        />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        {lage === 'video' && (
          <video className={styles.video} src={LOOP} autoPlay muted loop playsInline aria-hidden="true" />
        )}
      </div>

      <div className={styles.streck} aria-hidden="true">
        {[0, 1, 2, 3].map((k) => (
          <span key={k}>
            <i ref={(el) => { streckRefs.current[k] = el; }} />
          </span>
        ))}
      </div>

      <p className={styles.bubbla}>Den här bygger jag åt er. Klar på 48 timmar.</p>
    </div>
  );
}
