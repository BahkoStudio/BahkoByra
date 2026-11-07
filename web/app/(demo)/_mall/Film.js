'use client';

import { useEffect, useRef } from 'react';

/* ===========================================================================
   FILMERNA I MALLEN — laddas först när de behövs (GD Måleri, SEO-audit 2026-10-27).

   Problemet: autoplay struntar i preload, så webbläsaren hämtade hero-filmen i
   BÅDA formaten (liggande 2,4 MB + stående 0,9 MB) fast CSS bara visar ett, och
   Varför- och kontaktfilmerna (0,75 MB) direkt vid sidladdning. Totalt ~5 MB på
   mobil innan något syns.

   Lösningen: servern ritar <video> med poster men UTAN källa (markupen är exakt
   densamma före och efter hydrering, så första skärmen hoppar inte). Efter
   montering sätts källan bara på den hero-film CSS:en visar, och på de nedre
   filmerna först när de närmar sig skärmen. Utan JavaScript syns postrarna.
   =========================================================================== */

function starta(v, src) {
  if (!v || v.src || !src) return;
  v.src = src;
  v.load();
  v.play().catch(() => {});
}

// Heron: två filmer (liggande + stående), CSS visar en. Vilken avgörs av dess computed display,
// så brytpunkten bor bara i CSS:en. Vrids telefonen startas den andra.
export function HeroFilmer({ klass, liggande, staende, poster, posterMobil }) {
  const ref = useRef(null);
  useEffect(() => {
    const figur = ref.current;
    if (!figur) return;
    const kolla = () => {
      figur.querySelectorAll('video').forEach((v) => {
        if (getComputedStyle(v).display !== 'none') starta(v, v.dataset.src);
      });
    };
    kolla();
    const mq = window.matchMedia('(orientation: portrait)');
    mq.addEventListener('change', kolla);
    return () => mq.removeEventListener('change', kolla);
  }, []);
  return (
    <figure ref={ref} className={klass.figur} aria-hidden="true">
      <video className={klass.liggande} autoPlay muted loop playsInline preload="none" poster={poster} data-src={liggande} />
      <video className={klass.staende} autoPlay muted loop playsInline preload="none" poster={posterMobil} data-src={staende} />
    </figure>
  );
}

// Filmer längre ner på sidan: källan sätts när filmen är 600 px från att synas.
export function LatFilm({ src, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!('IntersectionObserver' in window)) { starta(v, src); return undefined; }
    const io = new IntersectionObserver((poster) => {
      if (poster.some((p) => p.isIntersecting)) { starta(v, src); io.disconnect(); }
    }, { rootMargin: '600px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} autoPlay muted loop playsInline preload="none" {...props} />;
}
