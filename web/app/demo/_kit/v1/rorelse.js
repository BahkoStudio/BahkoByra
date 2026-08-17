'use client';

/**
 * rorelse.js — scrollmatematiken, utan animationsbibliotek.
 *
 * Lyft ur app/komponenter/SynlighetsPanel.js och ProcessRail.js 2026-08-17.
 * De två filerna är OFÖRÄNDRADE och äger fortfarande marknadssajten — här
 * duplicerar vi 80 rader väldokumenterad matte i stället för att refaktorera
 * bahkobyra.se:s mest synliga komponenter för en demoleverans.
 *
 * Mönstret som gör det billigt: en rAF-loop som SJÄLVDÖR när värdet är framme,
 * och som skriver direkt till DOM i stället för att trigga omrendering.
 */

import { useEffect, useRef } from 'react';

const dampat = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Progress 0→1 medan elementet passerar fönstret.
 * @param {object} ref element att mäta
 * @param {(p:number)=>void} rita anropas med progressen; skriv till DOM här
 */
export function useRullProgress(ref, rita, { fran = 0.95, till = 0.30, tyngd = 0.14 } = {}) {
  const ritaRef = useRef(rita);
  ritaRef.current = rita;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (dampat()) { ritaRef.current(1); return undefined; }

    let mal = 0, nu = 0, raf = null;

    const las = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const spann = vh * fran - vh * till;
      mal = Math.max(0, Math.min(1, (vh * fran - r.top) / (spann || 1)));
    };
    const rulle = () => {
      const kvar = mal - nu;
      if (Math.abs(kvar) < 0.0008) { nu = mal; ritaRef.current(nu); raf = null; return; }
      nu += kvar * tyngd;
      ritaRef.current(nu);
      raf = requestAnimationFrame(rulle);
    };
    const vack = () => { las(); if (raf === null) raf = requestAnimationFrame(rulle); };

    las(); nu = mal; ritaRef.current(nu);
    addEventListener('scroll', vack, { passive: true });
    addEventListener('resize', vack);
    return () => {
      removeEventListener('scroll', vack);
      removeEventListener('resize', vack);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [ref, fran, till, tyngd]);
}

/**
 * Progress genom en scen som är högre än fönstret (sticky-lager).
 * Rå progress utan utjämning: den ska följa fingret exakt.
 */
export function useScenProgress(ref, rita) {
  const ritaRef = useRef(rita);
  ritaRef.current = rita;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (dampat()) { ritaRef.current(0); return undefined; }

    let raf = null;
    const las = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const akt = r.height - (window.innerHeight || 800);
      ritaRef.current(akt <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / akt)));
    };
    const vack = () => { if (raf === null) raf = requestAnimationFrame(las); };

    las();
    addEventListener('scroll', vack, { passive: true });
    addEventListener('resize', vack);
    return () => {
      removeEventListener('scroll', vack);
      removeEventListener('resize', vack);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/**
 * Entré när elementet kommer in i vyn. En gång, sedan aldrig mer.
 * IntersectionObserver i stället för scrollmatte: billigare och exakt rätt
 * beteende för "once".
 */
export function useEntre(klass = 'inne', marginal = '0px 0px -12% 0px') {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const barn = [el, ...el.querySelectorAll('[data-stig]')];
    if (dampat()) { barn.forEach((b) => b.classList.add(klass)); return undefined; }

    const obs = new IntersectionObserver((poster) => {
      for (const p of poster) {
        if (!p.isIntersecting) continue;
        barn.forEach((b) => b.classList.add(klass));
        obs.disconnect();
      }
    }, { threshold: 0.15, rootMargin: marginal });
    obs.observe(el);
    return () => obs.disconnect();
  }, [klass, marginal]);
  return ref;
}

/** Räknare som tickar upp till målet första gången den syns. */
export function useRaknare(ref, mal, { ms = 1100 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const skriv = (v) => { el.textContent = String(Math.round(v)); };
    if (dampat()) { skriv(mal); return undefined; }

    let raf = null, start = null;
    const obs = new IntersectionObserver((poster) => {
      if (!poster.some((p) => p.isIntersecting)) return;
      obs.disconnect();
      const steg = (t) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / ms);
        skriv(mal * (1 - (1 - p) ** 3));           // easeOutCubic
        if (p < 1) raf = requestAnimationFrame(steg);
      };
      raf = requestAnimationFrame(steg);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [ref, mal, ms]);
}
