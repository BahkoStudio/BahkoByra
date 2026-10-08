import Image from 'next/image';
import { fontKlasser } from './fonter';
import s from './mall.module.css';
import DemoFormular from '../../komponenter/DemoFormular';
import { googleOmdomen, recoOmdomen, instagramInlagg, kortaText } from './levande';

/* ===========================================================================
   DEMOMALLEN v3 — en serverkomponent, noll eget klient-JS.
   Varje demo (app/(demo)/<kund>/page.js) exporterar metadata och skickar ett
   data-objekt hit. Sektionsordningen är fast:
   1 hero · 2 tjänster (kort med bild) · 3 jobb (två band) · 4 varför (mörk,
   förvandlingsfilm med logotypen i slutet) · 5 om oss (med logotypen) ·
   6 så går det till · 7 omdömen (Google-stil) · 8 Instagram · 9 frågor ·
   10 kontakt (formulär över suddig film) · 11 footer (med logotypen).
   Runt om: glaspiller-header med logotypen mitt bland länkarna, sidflik,
   popup, Bahkos demo-knapp och modal.

   Fältbeskrivning och regler: ~/.claude/skills/hemsidor/SKILL.md
   =========================================================================== */

const T = {
  sv: {
    meny: 'Meny', stang: 'Stäng menyn', ring: 'Ring', kontakt: 'Kontakt', tillToppen: 'Till toppen',
    exempel: 'Exempel', femStjarnor: 'Fem stjärnor', exempelStjarnor: 'Exempelomdöme, inget betyg',
    folj: 'Följ på Instagram', foljFb: 'Följ på Facebook', inlagg: 'Instagram-inlägg från',
    namn: 'Namn', telefon: 'Telefon', epost: 'E-post (valfritt)', typ: 'Vad gäller det?', annat: 'Något annat',
    meddelande: 'Kort om jobbet', ellerRing: 'Eller ring', kundtyp: 'Förfrågan från',
    telRad: 'Telefon', epostRad: 'E-post', oppetRad: 'Öppettider', igRad: 'Instagram', adressRad: 'Adress',
    sidan: 'Sidan', tjanster: 'Tjänster', kontaktuppg: 'Kontaktuppgifter',
    byggd: 'Förslag byggt av', omForslaget: 'Om det här förslaget', stangKort: 'Stäng',
    modalBadge: 'Förslag av Bahko Byrå', modalCta: 'Boka 15 min kostnadsfritt samtal →', modalAlt: 'Eller mejla → mathias@bahkobyra.se',
    modalFot: 'Bahko Byrå · Synlighet som säljer.', ellerSkriv: 'Eller skriv några rader →', orgnr: 'Org.nr',
    // Bara de levande flödena (levande.js) använder raderna nedan.
    stjarnorAv: 'av 5 stjärnor', omdomenAntal: 'omdömen', lasGoogle: 'Läs alla på Google', igBild: 'Instagram-inlägg',
    notGoogle: 'Google-omdömena hämtas direkt från vår profil, i den ordning Google rankar dem som mest relevanta. Bara omdömen med text visas.',
    notReco: 'Reco-omdömena hämtas direkt från Reco.se.',
  },
  nb: {
    meny: 'Meny', stang: 'Lukk menyen', ring: 'Ring', kontakt: 'Kontakt', tillToppen: 'Til toppen',
    exempel: 'Eksempel', femStjarnor: 'Fem stjerner', exempelStjarnor: 'Eksempelomtale, ingen vurdering',
    folj: 'Følg på Instagram', foljFb: 'Følg på Facebook', inlagg: 'Instagram-innlegg fra',
    namn: 'Navn', telefon: 'Telefon', epost: 'E-post (valgfritt)', typ: 'Hva gjelder det?', annat: 'Noe annet',
    meddelande: 'Kort om jobben', ellerRing: 'Eller ring', kundtyp: 'Forespørsel fra',
    telRad: 'Telefon', epostRad: 'E-post', oppetRad: 'Åpningstider', igRad: 'Instagram', adressRad: 'Adresse',
    sidan: 'Siden', tjanster: 'Tjenester', kontaktuppg: 'Kontaktinformasjon',
    byggd: 'Forslag laget av', omForslaget: 'Om dette forslaget', stangKort: 'Lukk',
    modalBadge: 'Forslag fra Bahko Byrå', modalCta: 'Book 15 min gratis samtale →', modalAlt: 'Eller send e-post → mathias@bahkobyra.se',
    modalFot: 'Bahko Byrå · Synlighet som selger.', ellerSkriv: 'Eller skriv noen linjer →', orgnr: 'Org.nr',
    stjarnorAv: 'av 5 stjerner', omdomenAntal: 'omtaler', lasGoogle: 'Les alle på Google', igBild: 'Instagram-innlegg',
    notGoogle: 'Google-omtalene hentes direkte fra profilen vår, i den rekkefølgen Google rangerer dem som mest relevante. Bare omtaler med tekst vises.',
    notReco: 'Reco-omtalene hentes direkte fra Reco.se.',
  },
};

// Mörka nog för vit initial med marginal (#1A73E8 låg på 4,51:1).
const AVATARFARGER = ['#1967D2', '#B45309', '#188038', '#8E24AA', '#C5221F', '#00796B'];

const Tel = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Bock = () => (<svg className={s.bock} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" /><path d="M7.8 12.3l2.9 2.9 5.6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Brev = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Nal = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6.1 7-11.5A7 7 0 005 9.500C5 14.900 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9.500" r="2.500" stroke="currentColor" strokeWidth="1.8" /></svg>);
const Klocka = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Kalender = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>);
const IgIkon = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg>);
const FbIkon = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.500V4.500H14c-2.200 0-3.500 1.500-3.500 3.600V10H8v3.300h2.500V21h3.400v-7.700h2.600l.5-3.300h-3.100V8.500c0-.3.2-.5.6-.5z" fill="currentColor" /></svg>);
const GoogleG = ({ className }) => (<svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.400-.2-2H12v3.900h5.400a4.600 4.600 0 01-2 3v2.500h3.200c1.900-1.700 3-4.300 3-7.400z" /><path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.400l-3.200-2.500c-.9.6-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.400 14a6 6 0 010-3.800V7.600H3.100a10 10 0 000 9l3.300-2.600z" /><path fill="#EA4335" d="M12 6c1.500 0 2.800.5 3.800 1.500l2.900-2.900A10 10 0 003.100 7.600L6.400 10c.8-2.300 3-4 5.600-4z" /></svg>);
// Resans hållplatser. Ett steg väljer ikon med `ikon`, annars efter plats: kontakt, besök, offert, arbete, plan — och sist alltid klart.
const RESEIKONER = {
  kontakt: <path d="M8 11h32v21H23l-9 7v-7H8z" />,
  besok: <><path d="M7 24L24 9l17 15" /><path d="M12 21v18h24V21" /><path d="M20 39V29h8v10" /></>,
  offert: <><path d="M13 6h15l8 8v28H13z" /><path d="M28 6v8h8" /><path d="M18 23h12M18 29h12M18 35h7" /></>,
  arbete: <><path d="M9 39l17-17" /><path d="M23 13l9-5 8 8-5 9-7-2-3-3z" /></>,
  plan: <><rect x="8" y="10" width="32" height="30" rx="3" /><path d="M8 19h32M16 6v8M32 6v8" /><path d="M16 28l5 5 10-10" /></>,
  klart: <path d="M12 25l8 8 16-18" />,
};
const RESESTANDARD = ['kontakt', 'besok', 'offert', 'arbete', 'plan'];

const STJARNA = 'M12 2.500l2.900 6.100 6.600.8-4.900 4.600 1.300 6.500L12 17.300l-5.900 3.200 1.300-6.500L2.500 9.400l6.600-.8z';
const Stjarnor = ({ tomma, etikett, antal }) => (<span className={`${s.stjarnor} ${tomma ? s.stjarnorTomma : ''}`} role="img" aria-label={etikett}>{[0, 1, 2, 3, 4].map((i) => (<svg className={antal != null && i >= antal ? s.stjarnaTom : undefined} viewBox="0 0 24 24" aria-hidden="true" key={i}><path d={STJARNA} /></svg>))}</span>);

const Rubrik = ({ r, mork }) => (
  <div className={`${s.sekHuvud} ${mork ? s.paMork : ''}`}>
    <p className={s.eyebrow}>{r.eyebrow}</p>
    <h2 className={s.h2}>{r.rubrik[0]}{r.rubrik[1] ? <> <em>{r.rubrik[1]}</em></> : null}{r.rubrik[2] || null}</h2>
    {r.lead ? <p className={s.sekLead}>{r.lead}</p> : null}
  </div>
);

function Logo({ logo, ordmarke, klass, priority }) {
  if (!logo) return <span className={klass === 'ftr' ? s.ftrOrd : klass === 'om' ? s.omOrd : s.hdrOrd}>{ordmarke}</span>;
  return <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} priority={priority} sizes={klass === 'om' ? '340px' : klass === 'ftr' ? '250px' : '150px'} />;
}

// Headerns logotyp. topp: 'fri' (valfritt) = ingen bricka eller rundel bakom: den ljusa varianten över
// filmen tonar över till loggans egna färger när headern blivit vit. Annars som förut.
function HdrLogo({ d, priority }) {
  if (d.logo?.topp === 'fri' && d.logo.ljus) {
    return (
      <span className={s.logoFriPar}>
        <Image className={s.logoFriLjus} src={d.logo.ljus} alt="" width={d.logo.w} height={d.logo.h} priority={priority} sizes="150px" />
        <Image className={s.logoFriEgen} src={d.logo.src} alt="" width={d.logo.w} height={d.logo.h} priority={priority} sizes="150px" />
      </span>
    );
  }
  return <Logo logo={d.logo && { ...d.logo, alt: '' }} ordmarke={d.ordmarke} priority={priority} />;
}

// En grupp måste vara bredare än skärmen för att loopen ska vara sömlös (7 kort ≈ 2 640 px).
// Har kunden färre bilder fylls gruppen ut med samma bilder igen — hellre det än ett hål i bandet.
const fyllUt = (rad) => { const ut = [...rad]; while (ut.length < 7) ut.push(...rad.map((j) => ({ ...j, utfyllnad: true }))); return ut; };

const Band = ({ rad: kort, hoger, tid }) => { const rad = fyllUt(kort); return (
  <div className={`${s.band} ${hoger ? s.bandHoger : ''}`}>
    <div className={s.bandSpar} style={tid ? { '--bandtid': tid } : undefined}>
      {[false, true].map((kopia) => (
        <div className={`${s.bandGrupp} ${kopia ? s.bandKopia : ''}`} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
          {rad.map((j, i) => (
            <figure className={s.jobbKort} key={`${j.src}-${i}`} aria-hidden={(!kopia && j.utfyllnad) || undefined}>
              <Image src={j.src} alt={kopia || j.utfyllnad ? '' : j.alt} width={480} height={360} sizes="(max-width: 900px) 240px, 360px" loading="lazy" />
              {j.txt ? <figcaption>{j.txt}</figcaption> : null}
            </figure>
          ))}
        </div>
      ))}
    </div>
  </div>
); };

// 7. Omdömen. `levande` = { g, r } från levande.js (null = statiskt läge, exakt som förut).
function Omdomen({ d, t, levande }) {
  const g = levande?.g;
  const r = levande?.r;
  const lista = levande
    ? [...(g?.lista || []), ...(r ? r.lista : d.omdomen.lista)].slice(0, d.omdomen.levande.max || 6)
    : d.omdomen.lista;
  const not = levande
    ? [g?.lista?.length ? t.notGoogle : null, r ? t.notReco : d.omdomen.not].filter(Boolean).join(' ')
    : d.omdomen.not;
  const fmt = (v) => v.toLocaleString(d.sprak === 'nb' ? 'nb-NO' : 'sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (
    <section className={`${s.sek} ${s.sekMjuk}`} id="omdomen">
      <div className={s.wrap}>
        <div className={s.omdHuvud}>
          <Rubrik r={d.omdomen} />
          {g?.betyg ? (
            <a className={s.betyg} href={g.uri} target="_blank" rel="noopener">
              <GoogleG />
              <span className={s.betygTal}>{fmt(g.betyg)}</span>
              <span className={s.betygTxt}><Stjarnor antal={Math.round(g.betyg)} etikett={`${fmt(g.betyg)} ${t.stjarnorAv}`} /><span>{g.antal} {t.omdomenAntal} · <span className={s.googleMaps}>Google Maps</span></span></span>
            </a>
          ) : d.omdomen.betyg ? (
            <div className={s.betyg}>
              <GoogleG />
              <span className={s.betygTal}>{d.omdomen.betyg.varde}</span>
              <span className={s.betygTxt}><Stjarnor etikett={t.femStjarnor} /><span>{d.omdomen.betyg.text}</span></span>
            </div>
          ) : null}
        </div>
        <div className={s.recensioner}>
          {lista.map((o, i) => (
            <figure className={s.recension} key={o.id || o.namn}>
              <div className={s.recensionHuvud}>
                {/* Google kräver författarens bild, namn och länk till profilen när den finns. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className={s.avatar} style={{ '--av': AVATARFARGER[i % AVATARFARGER.length] }} aria-hidden="true">{o.foto ? <img src={o.foto} alt="" width={44} height={44} loading="lazy" referrerPolicy="no-referrer" /> : o.namn[0]}</span>
                <figcaption>
                  <b>{o.profil ? <a href={o.profil} target="_blank" rel="noopener">{o.namn}</a> : o.namn}</b>
                  {o.lank
                    ? <a className={s.recensionKalla} href={o.lank} target="_blank" rel="noopener">{o.kalla}{o.maps ? <> · <span className={s.googleMaps}>Google Maps</span></> : null}</a>
                    : <span>{o.kalla}</span>}
                </figcaption>
                {o.google ? <GoogleG className={s.recensionG} /> : null}
              </div>
              {/* stjarnor: false = omdömet har inget betyg i källan (t.ex. ett citat på kundens sajt). Rita inga stjärnor då. */}
              {o.stjarnor === false ? null : (
                <div className={s.recensionRad}>
                  {typeof o.betyg === 'number'
                    ? <Stjarnor antal={o.betyg} etikett={`${o.betyg} ${t.stjarnorAv}`} />
                    : <Stjarnor tomma={o.exempel} etikett={o.exempel ? t.exempelStjarnor : t.femStjarnor} />}
                  {o.exempel ? <span className={s.exempelTagg}>{t.exempel}</span> : null}
                </div>
              )}
              <blockquote>{o.text}</blockquote>
            </figure>
          ))}
        </div>
        <div className={s.recensionerFot}>
          <p className={s.recensionerNot}>{not}</p>
          <div className={s.recensionerKnappar}>
            {g?.uri ? <a className={`${s.btn} ${s.btnLjus}`} href={g.uri} target="_blank" rel="noopener">{t.lasGoogle}</a> : null}
            {d.omdomen.lank ? <a className={`${s.btn} ${s.btnLjus}`} href={d.omdomen.lank.href} target="_blank" rel="noopener">{d.omdomen.lank.txt}</a> : null}
            <a className={`${s.btn} ${s.btnMork}`} href="#kontakt">{d.cta.txt}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Hämtar på servern; svarar ingen källa ritas det statiska läget oförändrat.
async function OmdomenLevande({ d, t }) {
  const [g, r] = await Promise.all([googleOmdomen(d.omdomen.levande.google), recoOmdomen(d.omdomen.levande.reco)]);
  return <Omdomen d={d} t={t} levande={g || r ? { g, r } : null} />;
}

const IgKortIkoner = () => (
  <div className={s.igKortIkoner} aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M12 20.500s-7.500-4.600-7.500-10A4.300 4.300 0 0112 7.800a4.300 4.300 0 017.500 2.700c0 5.400-7.500 10-7.500 10z" /></svg>
    <svg viewBox="0 0 24 24"><path d="M20.500 11.500a8.500 8.500 0 01-12.600 7.400L3.500 20.500l1.600-4.300A8.500 8.500 0 1120.500 11.500z" /></svg>
    <svg viewBox="0 0 24 24"><path d="M21 3L10.500 13.500M21 3l-6.500 18-4-7.500L3 9.500z" /></svg>
  </div>
);

// 8. Instagram. `inlagg` = levande inlägg från levande.js (null = statiskt läge, exakt som förut).
function Instagram({ d, t, inlagg }) {
  const k = d.kontakt;
  return (
    <section className={s.sek} id="instagram">
      <div className={s.wrap}>
        <Rubrik r={d.instagram} />
        <div className={s.igStapel}>
          <div className={s.igProfil}>
            <span className={s.igRing} aria-hidden="true"><span>{d.logo ? <Image src={d.logo.src} alt="" width={d.logo.w} height={d.logo.h} sizes="56px" /> : d.namn[0]}</span></span>
            <div><b>{k.igHandle}</b><small>{d.instagram.bio}</small></div>
          </div>
          <div className={s.igKnappar}>
            <a className={s.igKnapp} href={k.ig} target="_blank" rel="noopener"><IgIkon />{t.folj}</a>
            {k.fb ? <a className={`${s.igKnapp} ${s.fbKnapp}`} href={k.fb} target="_blank" rel="noopener"><FbIkon />{t.foljFb}</a> : null}
          </div>
        </div>
        <div className={s.igRutnat}>
          {inlagg
            ? inlagg.map((p) => (
              <a className={s.igInlagg} href={p.lank} target="_blank" rel="noopener" key={p.id}>
                <div className={s.igKortHuvud}><span className={s.igRing} aria-hidden="true"><span>{d.logo ? <Image src={d.logo.src} alt="" width={d.logo.w} height={d.logo.h} sizes="38px" /> : d.namn[0]}</span></span>{k.igHandle}</div>
                {/* Extern bild (Beholds eller Instagrams CDN): vanlig img, så att next.config inte behöver röras. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className={s.igKortBild}><img src={p.bild} alt={`${t.igBild}: ${kortaText(p.text, 100) || k.igHandle}`} width={800} height={800} loading="lazy" decoding="async" /></div>
                <IgKortIkoner />
                <p className={s.igKortTxt}><b>{k.igHandle}</b>{kortaText(p.text)}</p>
              </a>
            ))
            : d.instagram.koder
              ? d.instagram.koder.map((kod, i) => (
                <div className={s.igInlagg} key={kod}>
                  <iframe src={`https://www.instagram.com/p/${kod}/embed/captioned/`} title={`${t.inlagg} ${k.igHandle} (${i + 1})`} loading="lazy" allow="encrypted-media" />
                </div>
              ))
              : d.instagram.kort.map((ko) => (
                <a className={s.igInlagg} href={k.ig} target="_blank" rel="noopener" key={ko.bild}>
                  <div className={s.igKortHuvud}><span className={s.igRing} aria-hidden="true"><span>{d.namn[0]}</span></span>{k.igHandle}</div>
                  <div className={s.igKortBild}><Image src={ko.bild} alt={ko.alt} width={800} height={800} sizes="(max-width: 700px) 92vw, 380px" /></div>
                  <IgKortIkoner />
                  <p className={s.igKortTxt}><b>{k.igHandle}</b>{ko.text}</p>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}

async function InstagramLevande({ d, t }) {
  const inlagg = await instagramInlagg(d.instagram.levande);
  return <Instagram d={d} t={t} inlagg={inlagg} />;
}

export default function DemoSida({ data: d }) {
  const t = T[d.sprak || 'sv'];
  const k = d.kontakt;
  const harTel = Boolean(k.tel);
  const logoKlass = d.logo ? (d.logo.topp === 'bricka' ? s.logoBricka : d.logo.topp === 'vit' ? s.logoVit : d.logo.topp === 'fri' ? s.logoFri : '') : '';
  const lankar = [...d.nav.vanster, ...d.nav.hoger];
  // Utan logotyp är h1 firmanamnet i text. Längsta raden i stora tecken (en liten rad är 0,62 av höjden) styr storleken i CSS.
  const h1Rader = d.hero.h1 || [d.namn];
  const h1Tecken = Math.max(...h1Rader.map((rad) => (rad.txt ? rad.txt.length * (rad.liten ? 0.62 : 1) : rad.length))).toFixed(1);
  // Bandet under heron: egna ord i d.tejp, annars tjänsternas namn och punkter.
  const tejp = d.tejp || [...new Set(d.tjanster.kort.flatMap((tj) => [tj.namn, ...(tj.punkter || [])]))].slice(0, 10);
  const tema = {
    '--mork': d.tema.mork,
    '--accent': d.tema.accent,
    '--accent-hover': d.tema.accentHover,
    '--accent-text': d.tema.accentText,
    '--accent-ljus': d.tema.accentLjus,
    '--pa-accent': d.tema.paAccent || '#fff',
  };
  const andraVag = harTel
    ? { href: k.telHref, txt: `${t.ring} ${k.tel}`, ikon: <Tel /> }
    : { href: k.ig, txt: t.folj, ikon: <IgIkon />, ny: true };

  return (
    <div className={`${fontKlasser} ${s.sida}`} style={tema}>
      <header className={s.hdr}>
        <div className={s.hdrIn}>
          {harTel
            ? <a className={s.hdrTel} href={k.telHref} aria-label={`${t.ring} ${k.tel}`}><Tel /><span aria-hidden="true">{k.tel}</span></a>
            : <a className={s.hdrTel} href={k.ig} target="_blank" rel="noopener" aria-label={`${d.namn} Instagram`}><IgIkon /><span aria-hidden="true">{k.igHandle}</span></a>}
          <a className={`${s.hdrMobilLogo} ${logoKlass}`} href="#top" aria-label={d.namn}><HdrLogo d={d} /></a>
          <nav className={s.hdrPiller} aria-label={t.meny}>
            {d.nav.vanster.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
            <a className={`${s.hdrLogo} ${logoKlass}`} href="#top" aria-label={`${d.namn} – ${t.tillToppen.toLowerCase()}`}><HdrLogo d={d} priority /></a>
            {d.nav.hoger.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
          </nav>
          <div className={s.hdrHoger}>
            <a className={`${s.btn} ${s.hdrCta}`} href="#kontakt">{d.cta.kort}</a>
            {harTel ? <a className={s.hdrRing} href={k.telHref} aria-label={`${t.ring} ${k.tel}`}><Tel /><span aria-hidden="true">{t.ring}</span></a> : null}
            <a className={s.mobilNavKnapp} href="#meny"><span>{t.meny}</span><span className={s.mobilNavIkon} aria-hidden="true" /></a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero */}
        <section className={s.hero} id="top">
          <figure className={s.heroFilm} aria-hidden="true">
            <video className={s.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster={d.hero.poster}><source src={d.hero.video} type="video/mp4" /></video>
            <video className={s.heroStaende} autoPlay muted loop playsInline preload="metadata" poster={d.hero.posterMobil}><source src={d.hero.videoMobil} type="video/mp4" /></video>
          </figure>
          <div className={s.wrap}>
            <div className={s.heroIn}>
              <h1 className={s.h1} style={{ '--h1-tecken': h1Tecken }}>
                {d.logo
                  ? <Image className={d.logo.ljus ? undefined : d.logo.topp === 'vit' ? s.heroLogoVit : d.logo.topp === 'bricka' ? s.heroLogoSken : undefined} src={d.logo.ljus || d.logo.src} alt={d.namn} width={d.logo.w} height={d.logo.h} style={{ '--logo-ar': (d.logo.w / d.logo.h).toFixed(3) }} priority sizes="460px" />
                  : h1Rader.map((rad, i) => <span className={rad.liten ? s.h1Liten : undefined} key={i}>{rad.txt || rad}</span>)}
              </h1>
              {d.hero.ort ? <p className={s.heroOrt}>{d.hero.ort}</p> : null}
              <p className={s.heroTjanster}>{d.hero.tjanster[0]} &amp; {d.hero.tjanster[1]}.</p>
              <div className={s.heroCta}>
                <a className={s.btn} href="#kontakt">{d.cta.txt}</a>
                <a className={`${s.btn} ${s.btnKontur}`} href={andraVag.href} {...(andraVag.ny ? { target: '_blank', rel: 'noopener' } : {})}>{andraVag.ikon}{andraVag.txt}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Tjänstebandet: rullar åt vänster */}
        <div className={s.tejp} role="group" aria-label={t.tjanster}>
          <div className={s.tejpSpar}>
            {[false, true].map((kopia) => (
              <div className={`${s.tejpGrupp} ${kopia ? s.tejpKopia : ''}`} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
                {[...tejp, ...(tejp.length % 2 ? tejp : [])].map((ord, i) => <span key={`${ord}-${i}`}>{ord}</span>)}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Tjänster: kort med bild */}
        <section className={`${s.sek} ${s.sekMjuk}${d.tjanster.lattKort ? ` ${s.lattKort}` : ''}`} id="tjanster">
          <div className={s.wrap}>
            <Rubrik r={d.tjanster} />
            <div className={`${s.tjanster}${d.tjanster.kolumner === 3 ? ` ${s.tjKol3}` : ''}`}>
              {d.tjanster.kort.map((tj) => (
                <article className={s.tjanst} key={tj.id}>
                  <div className={s.tjanstBild}>
                    <div className={s.tjanstBildIn}><Image src={tj.bild} alt={tj.alt} width={800} height={600} sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 300px" /></div>
                    {tj.ritning ? <span className={s.tjanstIkon} aria-hidden="true"><svg viewBox="0 0 200 120">{tj.ritning}</svg></span> : null}
                  </div>
                  <div className={s.tjanstTxt}>
                    <h3>{tj.namn}</h3>
                    <p>{tj.text}</p>
                    {tj.punkter?.length ? <ul>{tj.punkter.map((p) => <li key={p}><Bock />{p}</li>)}</ul> : null}
                    {/* Valfritt tj.lank { href, txt }: kortet leder till tjänstens egen sida i stället för formuläret. */}
                    {tj.lank
                      ? <a className={s.pilLank} href={tj.lank.href}>{tj.lank.txt}</a>
                      : <a className={s.pilLank} href="#kontakt" aria-label={`${d.cta.lank} – ${tj.namn}`}>{d.cta.lank}</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Jobb: två band, första åt vänster, andra åt höger */}
        <section className={`${s.sek} ${s.jobb}`} id="jobb">
          <div className={s.wrap}><Rubrik r={d.jobb} /></div>
          <Band rad={d.jobb.rad1} tid={d.jobb.tid} />
          <Band rad={d.jobb.rad2} tid={d.jobb.tid} hoger />
          <div className={s.wrap}>
            <div className={s.jobbFot}>
              <p className={s.jobbNot}>{d.jobb.not}</p>
              <a className={s.btn} href="#kontakt">{d.cta.txt}</a>
            </div>
          </div>
        </section>

        {/* 4. Varför: mörk sektion, förvandlingsfilm med logotypen i slutet */}
        <section className={`${s.sek} ${s.varfor}`} id="varfor">
          <div className={s.wrap}>
            <div className={s.varforGrid}>
              <div>
                <Rubrik r={d.varfor} mork />
                <ul className={s.varforPunkter}>{d.varfor.punkter.map((p) => <li key={p.rubrik}><Bock /><span><b>{p.rubrik}</b>{p.text}</span></li>)}</ul>
                <div className={s.varforCta}>
                  <a className={s.btn} href="#kontakt">{d.cta.txt}</a>
                  {harTel ? <a className={`${s.btn} ${s.btnKontur}`} href={k.telHref}><Tel />{t.ring} {k.tel}</a> : null}
                </div>
              </div>
              <div className={s.varforMedia}>
                <figure className={s.varforFilm}>
                  <video autoPlay muted loop playsInline preload="metadata" poster={d.varfor.poster} aria-label={d.varfor.videoAlt}><source src={d.varfor.video} type="video/mp4" /></video>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Om oss: historien, med logotypen */}
        <section className={`${s.sek} ${s.sekKram}`} id="om">
          <div className={s.wrap}>
            <div className={s.omGrid}>
              <div className={`${s.omKort}${d.om.utanKort ? ` ${s.omKortFri}` : ''}`}>
                {/* Valfritt om.bild { src, w, h, alt, rundad? } i stället för logotypen (t.ex. ett märke). rundad = bilden är ett eget kort: hela bilden, 18 px radie och kortskugga. */}
                {d.om.bild ? <Image className={d.om.bild.rundad ? s.omBildRundad : undefined} src={d.om.bild.src} alt={d.om.bild.alt} width={d.om.bild.w} height={d.om.bild.h} sizes={d.om.bild.rundad ? '(max-width: 900px) 92vw, 440px' : '340px'} /> : <Logo logo={d.logo} ordmarke={d.ordmarke} klass="om" />}
                {d.om.kortRad ? <p className={s.omOrt}>{d.om.kortRad}</p> : null}
              </div>
              <div className={s.omTxt}>
                <p className={s.eyebrow}>{d.om.eyebrow}</p>
                <h2 className={s.h2}>{d.om.rubrik[0]}{d.om.rubrik[1] ? <> <em>{d.om.rubrik[1]}</em></> : null}</h2>
                <div className={s.stycken}>{d.om.stycken.map((st) => <p key={st.slice(0, 24)}>{st}</p>)}</div>
                {d.om.bevis?.length ? <div className={s.omBevis}>{d.om.bevis.map((b) => <div key={b.ord}><b>{b.ord}</b><span>{b.text}</span></div>)}</div> : null}
                <a className={s.pilLank} href="#kontakt">{d.cta.lank}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Så går det till (valfri: utelämna d.steg så försvinner sektionen) */}
        {d.steg ? (
          <section className={s.sek} id="process">
            <div className={s.wrap}>
              <Rubrik r={d.steg} />
              <ol className={s.resa} style={{ '--n': d.steg.lista.length }}>
                {d.steg.lista.map((st, i) => (
                  <li className={s.resaSteg} key={st.namn}>
                    <span className={s.resaNod} aria-hidden="true"><svg viewBox="0 0 48 48">{RESEIKONER[st.ikon || (i === d.steg.lista.length - 1 ? 'klart' : RESESTANDARD[i] || 'arbete')]}</svg></span>
                    <h3>{st.namn}</h3>
                    <p>{st.text}</p>
                  </li>
                ))}
              </ol>
              <div className={s.stegFot}><a className={s.btn} href="#kontakt">{d.cta.txt}</a></div>
            </div>
          </section>
        ) : null}

        {/* 7. Omdömen i Google-stil — levande från Google/Reco om data slår på det, annars statiska */}
        {d.omdomen.levande ? <OmdomenLevande d={d} t={t} /> : <Omdomen d={d} t={t} />}

        {/* 8. Instagram: riktiga inlägg som inbäddningar, annars egna bilder i IG-ram — eller levande flöde */}
        {d.instagram ? (d.instagram.levande ? <InstagramLevande d={d} t={t} /> : <Instagram d={d} t={t} />) : null}

        {/* 9. Frågor */}
        <section className={`${s.sek} ${s.sekKram}`} id="fragor">
          <div className={s.wrap}>
            <div className={s.fragorGrid}>
              <div className={s.fragorSida}>
                <Rubrik r={d.fragor} />
                <aside className={s.fragaKort}>
                  <h3>{d.fragor.kort.rubrik}</h3>
                  <p>{d.fragor.kort.text}</p>
                  <a className={s.btn} href={harTel ? k.telHref : '#kontakt'}>{harTel ? <><Tel />{t.ring} {k.tel}</> : d.cta.txt}</a>
                  {d.bokning?.kortTxt ? (d.bokning.inbaddad ? <a className={s.pilLank} href="#boka">{d.bokning.kortTxt}</a> : <a className={s.pilLank} href={d.bokning.url} target="_blank" rel="noopener">{d.bokning.kortTxt}</a>) : null}
                </aside>
              </div>
              <div className={s.fragor}>{d.fragor.lista.map((f) => <details className={s.fraga} name="faq" key={f.q}><summary>{f.q}<span className={s.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            </div>
          </div>
        </section>

        {/* 9b. Valfritt d.bokning.inbaddad { eyebrow, rubrik, lead, titel, src? }: bokningskalendern (Cal.com) inbäddad som <iframe>,
            som Instagram-inläggen: ingen embed-JS, noll egen klient-JS. src utelämnad = bokning.url + ?embed=true&theme=light
            (theme=light: annars blir kalendern mörk hos besökare med mörkt läge). GD Måleri 2026-10-08. */}
        {d.bokning?.inbaddad ? (
          <section className={s.sek} id="boka">
            <div className={s.wrap}>
              <Rubrik r={d.bokning.inbaddad} />
              <div className={s.bokaRam}>
                <iframe src={d.bokning.inbaddad.src || `${d.bokning.url}${d.bokning.url.includes('?') ? '&' : '?'}embed=true&theme=light`} title={d.bokning.inbaddad.titel} loading="lazy" />
              </div>
              {d.bokning.ringUrl ? <p className={s.bokaFot}><a className={s.pilLank} href={d.bokning.ringUrl} target="_blank" rel="noopener">{d.bokning.ringTxt}</a></p> : null}
            </div>
          </section>
        ) : null}

        {/* 10. Kontakt: formulär över suddig film */}
        <section className={s.kontakt} id="kontakt">
          <figure className={s.kontaktFilm} aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata" poster={d.kontaktSektion.poster}><source src={d.kontaktSektion.video} type="video/mp4" /></video>
          </figure>
          <div className={s.wrap}>
            <div className={s.kontaktGrid}>
              <div className={`${s.paMork} ${s.kontaktVanster}`}>
                <p className={s.eyebrow}>{d.kontaktSektion.eyebrow}</p>
                <h2 className={s.h2}>{d.kontaktSektion.rubrik[0]}{d.kontaktSektion.rubrik[1] ? <> <em>{d.kontaktSektion.rubrik[1]}</em></> : null}</h2>
                <p className={s.sekLead}>{d.kontaktSektion.lead}</p>
                <ul className={s.kontaktCheckar}>{d.kontaktSektion.checkar.map((c) => <li key={c}><Bock />{c}</li>)}</ul>
                {/* Valfritt d.bokning { url, txt, not?, ringUrl?, ringTxt?, kortTxt? }: vanliga länkar till en bokningssida (t.ex. Cal.com), ny flik. Formuläret förblir huvudvägen.
                    Med bokning.inbaddad står kalendern i egen sektion strax ovanför, och länkarna här utgår. */}
                {d.bokning && !d.bokning.inbaddad ? (
                  <div className={s.kontaktBokning}>
                    <a className={`${s.btn} ${s.btnKontur}`} href={d.bokning.url} target="_blank" rel="noopener"><Kalender />{d.bokning.txt}</a>
                    {d.bokning.not ? <p className={s.bokningNot}>{d.bokning.not}</p> : null}
                    {d.bokning.ringUrl ? <a className={s.bokningRing} href={d.bokning.ringUrl} target="_blank" rel="noopener">{d.bokning.ringTxt}</a> : null}
                  </div>
                ) : null}
                <div className={s.kontaktRader}>
                  {harTel ? <a className={s.kontaktRad} href={k.telHref}><span>{t.telRad}</span><b>{k.tel}</b></a> : null}
                  {k.epost ? <a className={s.kontaktRad} href={`mailto:${k.epost}`}><span>{t.epostRad}</span><b>{k.epost}</b></a> : null}
                  {k.oppet ? <div className={s.kontaktRad}><span>{t.oppetRad}</span><b>{k.oppet}</b></div> : null}
                  {k.ig ? <a className={s.kontaktRad} href={k.ig} target="_blank" rel="noopener"><span>{t.igRad}</span><b>{k.igHandle}</b></a> : null}
                </div>
              </div>
              {/* Valfritt d.formular { nyckel, amne, fran, kvittens: [rubrik, text] }: kundens egen Web3Forms-nyckel och egna rader.
                  amne: null / fran: null = inga sådana fält i anropet; då gäller kundens inställningar i Web3Forms-panelen. */}
              <DemoFormular
                className={s.form}
                amne={d.formular && 'amne' in d.formular ? d.formular.amne : `${d.namn}: ny förfrågan från förslaget`}
                {...(d.formular?.nyckel ? { nyckel: d.formular.nyckel } : {})}
                {...(d.formular && 'fran' in d.formular ? { fran: d.formular.fran } : {})}
                {...(d.formular?.kvittens ? { kvittens: <><p style={{ fontWeight: 700, fontSize: '1.15rem' }}>{d.formular.kvittens[0]}</p><p>{d.formular.kvittens[1]}</p></> } : {})}
              >
                <p className={s.formRubrik}>{d.kontaktSektion.formRubrik}</p>
                {/* Valfritt kontaktSektion.kundtyp: ['Privatperson', 'Företag', 'BRF'] = obligatoriskt val, följer med som fältet kundtyp. */}
                {d.kontaktSektion.kundtyp?.length ? (
                  <fieldset className={s.kundtyp}>
                    <legend>{t.kundtyp}</legend>
                    <div className={s.kundtypVal}>{d.kontaktSektion.kundtyp.map((v) => <label key={v}><input type="radio" name="kundtyp" value={v} required />{v}</label>)}</div>
                  </fieldset>
                ) : null}
                <div className={s.formRad}>
                  <label>{t.namn}<input type="text" name="namn" autoComplete="name" required /></label>
                  <label>{t.telefon}<input type="tel" name="telefon" autoComplete="tel" required /></label>
                </div>
                {/* Valfritt kontaktSektion.epostNamn: fältnamnet för e-post, t.ex. 'email' (Web3Forms autosvar går bara till fältet email). */}
                <label>{t.epost}<input type="email" name={d.kontaktSektion.epostNamn || 'epost'} autoComplete="email" /></label>
                <label>{t.typ}<select name="typ" defaultValue={d.tjanster.kort[0].namn}>{d.tjanster.kort.map((tj) => <option key={tj.id}>{tj.namn}</option>)}<option>{t.annat}</option></select></label>
                <label>{t.meddelande}<textarea name="meddelande" rows={4} placeholder={d.kontaktSektion.placeholder} /></label>
                <button className={s.btn} type="submit">{d.cta.txt}</button>
                {harTel ? <a className={`${s.btn} ${s.btnLjus}`} href={k.telHref}><Tel />{t.ellerRing} {k.tel}</a> : null}
                <p className={s.formNot} id="form-not">{d.kontaktSektion.formNotBock ? <Bock /> : null}{d.kontaktSektion.formNot}</p>
              </DemoFormular>
            </div>
          </div>
        </section>
      </main>

      {/* 11. Footer: ljus, med logotypen */}
      <footer className={s.ftr}>
        <div className={s.wrap}>
          <div className={s.ftrGrid}>
            <div>
              <a className={s.ftrLogo} href="#top" aria-label={`${d.namn} – ${t.tillToppen.toLowerCase()}`}><Logo logo={d.logo && { ...d.logo, alt: '' }} ordmarke={d.ordmarke} klass="ftr" /></a>
              <p className={s.ftrText}>{d.footer.text}</p>
              <div className={s.ftrSociala}>
                {k.ig ? <a href={k.ig} target="_blank" rel="noopener" aria-label={`${d.namn} Instagram`}><IgIkon /></a> : null}
                {k.fb ? <a href={k.fb} target="_blank" rel="noopener" aria-label={`${d.namn} Facebook`}><FbIkon /></a> : null}
              </div>
            </div>
            <nav className={s.ftrKol} aria-label={t.sidan}>
              <h3>{t.sidan}</h3>
              <ul>{lankar.map((l) => <li key={l.href}><a href={l.href}>{l.txt}</a></li>)}<li><a href="#kontakt">{t.kontakt}</a></li></ul>
            </nav>
            <div className={s.ftrKol}>
              <h3>{t.tjanster}</h3>
              {/* Valfritt footer.tjanster [{ href, txt }]: egna länkar (t.ex. tjänstesidorna) i stället för korten. */}
              <ul>{d.footer.tjanster
                ? d.footer.tjanster.map((l) => <li key={l.href}><a href={l.href}>{l.txt}</a></li>)
                : d.tjanster.kort.map((tj) => <li key={tj.id}><a href="#tjanster">{tj.namn}</a></li>)}</ul>
            </div>
            <div className={s.ftrKol}>
              <h3>{t.kontaktuppg}</h3>
              <ul>
                {harTel ? <li><a href={k.telHref}><Tel />{k.tel}</a></li> : null}
                {k.epost ? <li><a href={`mailto:${k.epost}`}><Brev />{k.epost}</a></li> : null}
                {k.adress ? <li><span><Nal />{k.adress}</span></li> : null}
                {k.oppet ? <li><span><Klocka />{k.oppet}</span></li> : null}
                {!harTel && k.ig ? <li><a href={k.ig} target="_blank" rel="noopener"><IgIkon />{k.igHandle}</a></li> : null}
              </ul>
            </div>
          </div>
          <div className={s.ftrBar}>
            <span>© {new Date().getFullYear()} {d.namn}{k.orgnr ? ` · ${t.orgnr} ${k.orgnr}` : ''}</span>
            <span>{t.byggd} <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span>
          </div>
        </div>
      </footer>

      {/* Sidflik: stående uppmaning i högerkanten (dold på mobil, där bär headern Ring-knappen) */}
      <a className={s.sidflik} href={harTel ? k.telHref : '#kontakt'}>{harTel ? <><Tel />{t.ring} {k.tel}</> : d.cta.kort}</a>

      <div className={s.mobilMenyLager} id="meny">
        <a className={s.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={s.mobilMenyPanel} aria-label={t.meny}>
          {lankar.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
          {/* Valfritt nav.extra [{ href, txt }]: fler länkar bara i mobilmenyn (pillret rymmer två plus två). */}
          {d.nav.extra?.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
          <a href="#fragor">{d.fragor.eyebrow}</a>
          <a className={s.btn} href="#kontakt">{d.cta.txt}</a>
          <a className={s.mobilMenyStang} href="#stangd">{t.stang}</a>
        </nav>
      </div>
      <span className={s.stangdAnkare} id="stangd" />

      <input type="checkbox" id="popup-bort" className={s.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={s.popup} aria-label={`${t.kontakt} ${d.namn}`}>
        <label className={s.popupX} htmlFor="popup-bort" role="button" aria-label={t.stangKort} tabIndex={0}>✕</label>
        <p className={s.popupEyebrow}>{d.popup.rubrik}</p>
        <p className={s.popupTxt}>{d.popup.text}</p>
        <a className={`${s.btn} ${s.popupCta}`} href={harTel ? k.telHref : '#kontakt'}>{harTel ? `${t.ring} ${k.tel}` : d.cta.txt}</a>
        {harTel ? <a className={s.popupAlt} href="#kontakt">{t.ellerSkriv}</a> : null}
      </aside>

      <a className={s.demoKnapp} href="#bahko-demo">{t.omForslaget}</a>
      <div className={s.modalLager} id="bahko-demo">
        <a className={s.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={s.modal} aria-labelledby="bahko-rubrik">
          <a className={s.modalX} href="#stangd" aria-label={t.stangKort}>✕</a>
          <span className={s.modalBadge}>{t.modalBadge}</span>
          <h3 id="bahko-rubrik">{d.modal.rubrik}</h3>
          <p>{d.modal.text}</p>
          <a className={s.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">{t.modalCta}</a>
          <a className={s.modalAlt} href={`mailto:mathias@bahkobyra.se?subject=${encodeURIComponent(`${d.namn} - förslag på hemsida`)}`}>{t.modalAlt}</a>
          <span className={s.modalFot}>{t.modalFot}</span>
        </section>
      </div>
    </div>
  );
}
