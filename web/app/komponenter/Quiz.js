'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NYCKEL_KONTAKT } from '../formular';
import styles from './Quiz.module.css';

/* "Var läcker jobben?" (Mathias 2026-10-23): fem frågor utan att skriva något, ett svar
   per skärm, nästa fråga kommer av sig själv. Sist en diagnos i klartext och en knapp.
   Svaren följer med i förfrågan, så Mathias vet läget innan han ringer.

   Ärlighet: diagnosen beskriver vad svaren säger, den lovar inga siffror. Skickas med
   Web3Forms som JSON (ingen redirect i fetch-anropet, tacket visas på plats). */

const BRANSCHER = [
  { id: 'snickare', namn: 'Snickare', sida: '/hemsida-for-snickare/' },
  { id: 'elektriker', namn: 'Elektriker', sida: '/hemsida-for-elektriker/' },
  { id: 'rormokare', namn: 'Rörmokare', sida: '/hemsida-for-rormokare/' },
  { id: 'malare', namn: 'Målare', sida: '/hemsida-for-malerifirma/' },
  { id: 'tradgard', namn: 'Trädgård', sida: '/hemsida-for-tradgardsfirma/' },
  { id: 'bygg', namn: 'Byggfirma', sida: '/hemsida-for-byggfirma/' },
  { id: 'restaurang', namn: 'Restaurang', sida: '/hemsida-for-restaurang/' },
  { id: 'ehandel', namn: 'E-handel', sida: '/hemsida-for-e-handel/' },
];

const FRAGOR = [
  {
    id: 'bransch',
    fraga: 'Vad gör firman?',
    typ: 'bransch',
  },
  {
    id: 'kanal',
    fraga: 'Hur hittar nya kunder er i dag?',
    val: [
      { id: 'rek', text: 'Rekommendationer och gamla kunder' },
      { id: 'google', text: 'De googlar och hittar oss' },
      { id: 'social', text: 'Facebook eller Instagram' },
      { id: 'offert', text: 'Offertsajter som Offerta eller Servicefinder' },
      { id: 'vetej', text: 'Vet faktiskt inte' },
    ],
  },
  {
    id: 'google',
    fraga: 'Googla er bransch och er stad. Vad händer?',
    val: [
      { id: 'overst', text: 'Vi ligger överst' },
      { id: 'langtner', text: 'Vi finns, men långt ner' },
      { id: 'inte', text: 'Vi dyker inte upp' },
      { id: 'kollat', text: 'Har aldrig kollat' },
    ],
  },
  {
    id: 'sida',
    fraga: 'Hur ser hemsidan ut i dag?',
    val: [
      { id: 'ingen', text: 'Vi har ingen' },
      { id: 'gammal', text: 'Gammal, ingen har rört den på länge' },
      { id: 'tyst', text: 'Finns, men ger inga förfrågningar' },
      { id: 'bra', text: 'Bra, den ger jobb' },
    ],
  },
  {
    id: 'mal',
    fraga: 'Vad vill ni ha mer av?',
    val: [
      { id: 'fler', text: 'Fler förfrågningar' },
      { id: 'battre', text: 'Bättre betalda jobb' },
      { id: 'ratt', text: 'Rätt sorts kunder, färre prutare' },
      { id: 'tid', text: 'Mer tid, färre bortslösade samtal' },
    ],
  },
];

/* Diagnosen i klartext ur svaren. Inga siffror, inga löften. */
function diagnos(svar) {
  const osynlig = svar.sida === 'ingen' || svar.google === 'inte';
  const lacker = svar.sida === 'gammal' || svar.sida === 'tyst' || svar.kanal === 'offert' || svar.google === 'langtner';
  if (osynlig) {
    return {
      rubrik: 'Ni är osynliga där kunden letar.',
      text: 'Kunden googlar er bransch och er stad, och ringer den som syns. Just nu är det någon annan. Det första steget är en sida som finns på rätt sökning, med numret synligt i mobilen.',
      steg: ['En sida byggd runt orden kunden googlar', 'Google-profil med rätt kategori och område', 'Ringknapp på varje skärm'],
    };
  }
  if (lacker) {
    return {
      rubrik: 'Ni syns, men jobben läcker.',
      text: 'Kunden hittar er, men väljer någon annan eller fastnar i en sida som inte svarar på frågorna. Det är där förfrågningarna försvinner, och det går att täta.',
      steg: ['Egna sidor per tjänst, så rätt kund landar rätt', 'Riktiga bilder och omdömen där de syns', 'Offert med en tumme i mobilen'],
    };
  }
  return {
    rubrik: 'Ni ligger bra. Nu gäller det att hålla platsen.',
    text: 'Sidan ger jobb och ni syns. Det som avgör framåt är att Google-profilen sköts varje månad och att sidan växer med nya jobb och omdömen, så att ingen tar platsen.',
    steg: ['Google-profilen skött varje månad', 'Nya jobb och omdömen upp löpande', 'Mätning så ni ser var kunderna kommer ifrån'],
  };
}

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Quiz() {
  const [steg, setSteg] = useState(0);
  const [svar, setSvar] = useState({});
  const [riktning, setRiktning] = useState(1);
  const [skickat, setSkickat] = useState(false);
  const [fel, setFel] = useState('');
  const [skickar, setSkickar] = useState(false);
  const rot = useRef(null);
  const klar = steg >= FRAGOR.length;

  /* Varje ny skärm rullas in i bild om toppen hamnat ovanför rutan. scrollIntoView
     rullar närmaste rullbara förälder, så det funkar både på sidan och i popupen. */
  useEffect(() => {
    const r = rot.current;
    if (!r || steg === 0) return;
    if (r.getBoundingClientRect().top < 80) r.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [steg]);

  const valj = (id, varde) => {
    setSvar((s) => ({ ...s, [id]: varde }));
    setRiktning(1);
    /* Liten paus så att valet hinner synas innan nästa fråga glider in */
    window.setTimeout(() => setSteg((n) => n + 1), 220);
  };

  const tillbaka = () => {
    setRiktning(-1);
    setSteg((n) => Math.max(0, n - 1));
  };

  const skicka = async (e) => {
    e.preventDefault();
    setFel('');
    setSkickar(true);
    const f = new FormData(e.currentTarget);
    if (f.get('botcheck')) return;
    const bransch = BRANSCHER.find((b) => b.id === svar.bransch)?.namn || svar.bransch || '';
    const lasbart = FRAGOR.slice(1)
      .map((q) => `${q.fraga} ${q.val.find((v) => v.id === svar[q.id])?.text || '-'}`)
      .join('\n');
    const d = diagnos(svar);
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: NYCKEL_KONTAKT,
          subject: `Var läcker jobben: ${f.get('namn')} (${bransch})`,
          from_name: 'bahkobyra.se, quiz',
          namn: f.get('namn'),
          telefon: f.get('telefon'),
          epost: f.get('epost') || '',
          bransch,
          diagnos: d.rubrik,
          svar: lasbart,
        }),
      });
      const j = await r.json();
      if (!j.success) throw new Error(j.message || 'Kunde inte skicka');
      setSkickat(true);
    } catch (err) {
      setFel('Det gick inte att skicka. Ring oss i stället på 076-254 09 51.');
    } finally {
      setSkickar(false);
    }
  };

  const fraga = FRAGOR[steg];
  const d = klar ? diagnos(svar) : null;
  const nisch = BRANSCHER.find((b) => b.id === svar.bransch);

  return (
    <div ref={rot} className={styles.rot}>
      {/* Framsteg: fem streck, ett per fråga */}
      <div className={styles.framsteg} aria-hidden="true">
        {FRAGOR.map((q, i) => (
          <span key={q.id} className={i < steg || klar ? styles.gjord : i === steg ? styles.nu : ''} />
        ))}
      </div>
      <p className={styles.raknare}>
        {klar ? 'Ert resultat' : `Fråga ${steg + 1} av ${FRAGOR.length}`}
      </p>

      {!klar && (
        <div key={fraga.id} className={`${styles.skarm} ${riktning > 0 ? styles.inHoger : styles.inVanster}`}>
          <h2 className={styles.fraga}>{fraga.fraga}</h2>

          {fraga.typ === 'bransch' ? (
            <div className={styles.branscher}>
              {BRANSCHER.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`${styles.bransch} ${svar.bransch === b.id ? styles.vald : ''}`}
                  onClick={() => valj('bransch', b.id)}
                >
                  <span className={styles.marke}>
                    <img src={`/img/nischer/${b.id}-3d.webp`} alt="" width="640" height="640" loading="lazy" decoding="async" />
                  </span>
                  <span>{b.namn}</span>
                </button>
              ))}
              <button
                type="button"
                className={`${styles.bransch} ${styles.annat} ${svar.bransch === 'annat' ? styles.vald : ''}`}
                onClick={() => valj('bransch', 'annat')}
              >
                <span className={styles.marke}>
                  <span className={styles.plus}>+</span>
                </span>
                <span>Annat</span>
              </button>
            </div>
          ) : (
            <div className={styles.val}>
              {fraga.val.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`${styles.knapp} ${svar[fraga.id] === v.id ? styles.vald : ''}`}
                  onClick={() => valj(fraga.id, v.id)}
                >
                  {v.text}
                  <span className={styles.pil}>{PIL}</span>
                </button>
              ))}
            </div>
          )}

          {steg > 0 && (
            <button type="button" className={styles.tillbaka} onClick={tillbaka}>
              Tillbaka
            </button>
          )}
        </div>
      )}

      {klar && !skickat && (
        <div key="resultat" className={`${styles.skarm} ${styles.inHoger}`}>
          <h2 className={styles.diagnos}>{d.rubrik}</h2>
          <p className={styles.diagnosText}>{d.text}</p>
          <ul className={styles.steg}>
            {d.steg.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <form className={styles.form} onSubmit={skicka}>
            <p className={styles.formRubrik}>
              Vill ni se hur det skulle se ut för er? Ni får ett färdigt förslag inom 48 timmar, kostnadsfritt.
            </p>
            <div className={styles.falt}>
              <label>
                <span>Namn</span>
                <input name="namn" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Telefon</span>
                <input name="telefon" type="tel" autoComplete="tel" inputMode="tel" required />
              </label>
              <label className={styles.bred}>
                <span>E-post (frivilligt)</span>
                <input name="epost" type="email" autoComplete="email" />
              </label>
            </div>
            <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
            {fel && <p className={styles.fel}>{fel}</p>}
            <div className={styles.formKnappar}>
              <button type="submit" className="btn btn-primar" disabled={skickar}>
                {skickar ? 'Skickar …' : 'Visa hur min hemsida kan se ut'} {PIL}
              </button>
              <a href="tel:+46762540951" className={styles.ring}>
                Eller ring 076-254 09 51
              </a>
            </div>
            <p className={styles.finstilt}>Svaren följer med, så vi vet läget innan vi hör av oss. Ingen bindningstid, ni äger sidan.</p>
          </form>

          {nisch && (
            <p className={styles.nischLank}>
              Så bygger vi sidan för en {nisch.namn.toLowerCase()}:{' '}
              <Link href={nisch.sida}>läs mer {PIL}</Link>
            </p>
          )}
          <button type="button" className={styles.tillbaka} onClick={tillbaka}>
            Ändra ett svar
          </button>
        </div>
      )}

      {skickat && (
        <div key="tack" className={`${styles.skarm} ${styles.inHoger} ${styles.tack}`}>
          <h2 className={styles.diagnos}>Tack. Vi hör av oss inom 48 timmar.</h2>
          <p className={styles.diagnosText}>
            Förslaget bygger på era svar. Vill ni prata direkt går det bra att ringa 076-254 09 51.
          </p>
          <Link href="/" className="btn btn-sekundar">
            Till startsidan
          </Link>
        </div>
      )}
    </div>
  );
}
