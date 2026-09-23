'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './RoiKalkyl.module.css';

/* Kalkylen som en resa: tre stationer längs en linje, målet längst ner.

   1. I dag får ni X jobb i månaden
   2. Ett jobb är värt Y kr
   3. Med ny hemsida får ni Z % fler kunder
   Målet: i dag bredvid med ny hemsida, och skillnaden i kronor.

   Linjen fylls i grönt och stationerna tänds en i taget när kortet kommer i bild.
   Talen rullar mjukt när besökaren drar i ett reglage.

   Standardvärdena renderas på servern, så sidan utan skript och sökmotorn ser ett
   färdigt räkneexempel. Aldrig pris här: kalkylen visar vad de kan tjäna, inte vad
   vi kostar. prefers-reduced-motion: allt syns direkt, inget rullar. */

const kr = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 });

const STEG = [
  { id: 'jobb', fraga: 'I dag får ni', min: 1, max: 40, steg: 1, start: 8, visa: (v) => `${v} jobb i månaden` },
  { id: 'varde', fraga: 'Ett jobb är värt i snitt', min: 2000, max: 150000, steg: 1000, start: 25000, visa: (v) => `${kr.format(v)} kr` },
  { id: 'okning', fraga: 'Med ny hemsida får ni', min: 5, max: 30, steg: 1, start: 12, visa: (v) => `${v} % fler kunder` },
];

/* Rullar ett tal mot målvärdet. Första renderingen visar målvärdet direkt (servern). */
function useRull(mal) {
  const [visat, setVisat] = useState(mal);
  const fran = useRef(mal);
  useEffect(() => {
    const dampad = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (dampad) { fran.current = mal; setVisat(mal); return undefined; }
    const start = performance.now();
    const a = fran.current;
    let id;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 450);
      const e = 1 - Math.pow(1 - p, 3);
      const v = a + (mal - a) * e;
      fran.current = v;
      setVisat(v);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [mal]);
  return visat;
}

export default function RoiKalkyl() {
  const [v, setV] = useState(() => Object.fromEntries(STEG.map((s) => [s.id, s.start])));
  const [igang, setIgang] = useState(false);
  const [aktiv, setAktiv] = useState(null);
  const rot = useRef(null);

  // Resan startar när kortet kommer i bild, en gång.
  useEffect(() => {
    const el = rot.current;
    if (!el || !('IntersectionObserver' in window)) { setIgang(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIgang(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const idag = v.jobb * v.varde;
  const ny = idag * (1 + v.okning / 100);
  const manad = ny - idag;

  const visManad = useRull(manad);
  const visAr = useRull(manad * 12);
  const visIdag = useRull(idag);
  const visNy = useRull(ny);

  const idagBredd = (idag / ny) * 100;

  return (
    <div ref={rot} className={`${styles.kort} ${igang ? styles.igang : ''}`}>
      <h2 className={styles.rubrik}>
        Vad kan en ny hemsida <span className={styles.accent}>ge er?</span>
      </h2>

      <ol className={styles.resa}>
        {STEG.map((s, i) => {
          const fyll = ((v[s.id] - s.min) / (s.max - s.min)) * 100;
          return (
            <li
              key={s.id}
              className={`${styles.station} ${aktiv === s.id ? styles.aktiv : ''}`}
              style={{ '--i': i }}
            >
              <span className={styles.nod} aria-hidden="true">{i + 1}</span>
              <div className={styles.innehall}>
                <label htmlFor={`roi-${s.id}`} className={styles.etikett}>
                  <span>{s.fraga}</span>
                  <output htmlFor={`roi-${s.id}`} className={styles.varde}>{s.visa(v[s.id])}</output>
                </label>
                <input
                  id={`roi-${s.id}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.steg}
                  value={v[s.id]}
                  onChange={(e) => setV((f) => ({ ...f, [s.id]: Number(e.target.value) }))}
                  onFocus={() => setAktiv(s.id)}
                  onBlur={() => setAktiv(null)}
                  onPointerDown={() => setAktiv(s.id)}
                  onPointerUp={() => setAktiv(null)}
                  className={styles.range}
                  style={{ '--fyll': `${fyll}%` }}
                />
              </div>
            </li>
          );
        })}

        {/* Målet: resans slut. */}
        <li className={`${styles.station} ${styles.mal}`} style={{ '--i': 3 }}>
          <span className={`${styles.nod} ${styles.malNod}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></svg>
          </span>
          <div className={styles.resultat} aria-live="polite">
            <div className={styles.staplar}>
              <div className={styles.stapel}>
                <span className={styles.stapelNamn}>I dag</span>
                <div className={styles.bana}><i style={{ width: `${idagBredd}%` }} /></div>
                <span className={styles.stapelTal}>{kr.format(visIdag)} kr/mån</span>
              </div>
              <div className={styles.stapel}>
                <span className={styles.stapelNamn}>Med ny hemsida</span>
                <div className={styles.bana}>
                  <i className={styles.nyBana} style={{ width: '100%' }}>
                    <em style={{ width: `${100 - idagBredd}%` }} />
                  </i>
                </div>
                <span className={`${styles.stapelTal} ${styles.stapelNy}`}>{kr.format(visNy)} kr/mån</span>
              </div>
            </div>

            <div className={styles.resGrid}>
              <div>
                <strong className={styles.resTal}>+{kr.format(visManad)} kr</strong>
                <span className={styles.resUnder}>mer i månaden</span>
              </div>
              <div>
                <strong className={styles.resTal}>+{kr.format(visAr)} kr</strong>
                <span className={styles.resUnder}>mer om året</span>
              </div>
            </div>
            <p className={styles.resAr}>Pengar som i dag går till en annan firma.</p>
          </div>
        </li>
      </ol>

      <div className={styles.fot}>
        <Link href="/kontakt/" className="btn btn-primar">
          Se er sida kostnadsfritt
        </Link>
        <p className={styles.finstilt}>Räkneexempel med era egna siffror, inget löfte.</p>
      </div>
    </div>
  );
}
