'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './RoiKalkyl.module.css';

/* Räkna själv: vad kostar en hemsida som inte säljer?

   Besökaren fyller i sina egna siffror. Vi hittar inte på något: ökningen
   står som standard på 12 %, som är vad en av våra kunder fick, och det sägs
   rakt ut under reglaget. Resten är besökarens egna tal.

   Standardvärdena renderas på servern, så sidan utan skript och sökmotorn ser
   ett färdigt räkneexempel med riktiga siffror, inte tomma rutor.

   Aldrig pris här. Kalkylen visar vad de förlorar, inte vad vi kostar. */

const kr = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 });

const REGLAGE = [
  {
    id: 'jobb',
    etikett: '1. I dag får ni',
    min: 1,
    max: 40,
    steg: 1,
    start: 8,
    visa: (v) => `${v} jobb i månaden`,
  },
  {
    id: 'varde',
    etikett: '2. Ett jobb är värt i snitt',
    min: 2000,
    max: 150000,
    steg: 1000,
    start: 25000,
    visa: (v) => `${kr.format(v)} kr`,
  },
  {
    id: 'okning',
    etikett: '3. Med ny hemsida får ni',
    min: 5,
    max: 30,
    steg: 1,
    start: 12,
    visa: (v) => `${v} % fler kunder`,
  },
];

export default function RoiKalkyl() {
  const [v, setV] = useState(() =>
    Object.fromEntries(REGLAGE.map((r) => [r.id, r.start]))
  );

  const extraJobb = (v.jobb * v.okning) / 100;
  const manad = extraJobb * v.varde;
  const ar = manad * 12;

  return (
    <div className={styles.kort}>
      <p className={styles.eyebrow}>Räkna själv</p>
      <h2 className={styles.rubrik}>
        Vad kan en ny hemsida <span className={styles.accent}>ge er?</span>
      </h2>

      <div className={styles.reglage}>
        {REGLAGE.map((r) => (
          <div key={r.id} className={styles.rad}>
            <label htmlFor={`roi-${r.id}`} className={styles.etikett}>
              <span>{r.etikett}</span>
              <output htmlFor={`roi-${r.id}`} className={styles.varde}>
                {r.visa(v[r.id])}
              </output>
            </label>
            <input
              id={`roi-${r.id}`}
              type="range"
              min={r.min}
              max={r.max}
              step={r.steg}
              value={v[r.id]}
              onChange={(e) => setV((f) => ({ ...f, [r.id]: Number(e.target.value) }))}
              className={styles.range}
            />
            {r.not ? <p className={styles.not}>{r.not}</p> : null}
          </div>
        ))}
      </div>

      {/* Svaret: vad steg 1 till 3 ger i kronor, per månad och per år. */}
      <div className={styles.resultat} aria-live="polite">
        <p className={styles.resEtikett}>Så mycket mer kan ni tjäna</p>
        <div className={styles.resGrid}>
          <div>
            <strong className={styles.resTal}>+{kr.format(manad)} kr</strong>
            <span className={styles.resUnder}>mer i månaden</span>
          </div>
          <div>
            <strong className={styles.resTal}>+{kr.format(ar)} kr</strong>
            <span className={styles.resUnder}>mer om året</span>
          </div>
        </div>
        <p className={styles.resAr}>Pengar som i dag går till en annan firma.</p>
      </div>

      <div className={styles.fot}>
        <Link href="/kontakt/" className="btn btn-primar">
          Se er sida kostnadsfritt
        </Link>
        <p className={styles.finstilt}>
          Räkneexempel med era egna siffror, inget löfte.
        </p>
      </div>
    </div>
  );
}
