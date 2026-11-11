'use client';

import { useEffect, useRef, useState } from 'react';

/* Sifferradens tal (data: siffror). Mathias 2026-11-11: "siffrorna ska liksom gå uppåt som en rörelse".
   Servern skriver slutsiffran, så sidan stämmer utan JavaScript. I webbläsaren räknar talet upp från noll
   på 1,8 s när raden skrollas in (en gång), och glider samtidigt upp på plats. Vid minskad rörelse rörs
   ingenting. Skärmläsare får alltid slutsiffran (aria-label). */
export default function Raknare({ tal, efter = '', klassIn }) {
  const ref = useRef(null);
  const [varde, setVarde] = useState(tal);
  const [inne, setInne] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    setVarde(0);
    setInne(false);
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setInne(true);
      const start = performance.now();
      const tid = 1800;
      const steg = (nu) => {
        const t = Math.min(1, (nu - start) / tid);
        setVarde(Math.round(tal * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(steg);
      };
      raf = requestAnimationFrame(steg);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [tal]);

  return (
    <span ref={ref} className={inne ? klassIn : undefined} aria-label={`${tal}${efter}`} style={inne ? undefined : { opacity: 0 }}>
      <span aria-hidden="true">{varde}{efter}</span>
    </span>
  );
}
