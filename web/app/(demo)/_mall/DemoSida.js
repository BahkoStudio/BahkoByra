import Image from 'next/image';
import { fontKlasser } from './fonter';
import s from './mall.module.css';

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
    meddelande: 'Kort om jobbet', ellerRing: 'Eller ring',
    formDemo: 'Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten landar formuläret direkt i er egen inkorg.',
    telRad: 'Telefon', epostRad: 'E-post', oppetRad: 'Öppettider', igRad: 'Instagram', adressRad: 'Adress',
    sidan: 'Sidan', tjanster: 'Tjänster', kontaktuppg: 'Kontaktuppgifter',
    byggd: 'Förslag byggt av', omForslaget: 'Om det här förslaget', stangKort: 'Stäng',
    modalBadge: 'Förslag av Bahko Byrå', modalCta: 'Boka 15 min gratis samtal →', modalAlt: 'Eller mejla → mathias@bahkobyra.se',
    modalFot: 'Bahko Byrå · Synlighet som säljer.', ellerSkriv: 'Eller skriv några rader →', orgnr: 'Org.nr',
  },
  nb: {
    meny: 'Meny', stang: 'Lukk menyen', ring: 'Ring', kontakt: 'Kontakt', tillToppen: 'Til toppen',
    exempel: 'Eksempel', femStjarnor: 'Fem stjerner', exempelStjarnor: 'Eksempelomtale, ingen vurdering',
    folj: 'Følg på Instagram', foljFb: 'Følg på Facebook', inlagg: 'Instagram-innlegg fra',
    namn: 'Navn', telefon: 'Telefon', epost: 'E-post (valgfritt)', typ: 'Hva gjelder det?', annat: 'Noe annet',
    meddelande: 'Kort om jobben', ellerRing: 'Eller ring',
    formDemo: 'Obs: i dette forslaget åpner knappen e-postprogrammet ditt og sender linjene til Bahko Byrå. På den ferdige siden havner skjemaet rett i deres egen innboks.',
    telRad: 'Telefon', epostRad: 'E-post', oppetRad: 'Åpningstider', igRad: 'Instagram', adressRad: 'Adresse',
    sidan: 'Siden', tjanster: 'Tjenester', kontaktuppg: 'Kontaktinformasjon',
    byggd: 'Forslag laget av', omForslaget: 'Om dette forslaget', stangKort: 'Lukk',
    modalBadge: 'Forslag fra Bahko Byrå', modalCta: 'Book 15 min gratis samtale →', modalAlt: 'Eller send e-post → mathias@bahkobyra.se',
    modalFot: 'Bahko Byrå · Synlighet som selger.', ellerSkriv: 'Eller skriv noen linjer →', orgnr: 'Org.nr',
  },
};

// Mörka nog för vit initial med marginal (#1A73E8 låg på 4,51:1).
const AVATARFARGER = ['#1967D2', '#B45309', '#188038', '#8E24AA', '#C5221F', '#00796B'];

const Tel = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Bock = () => (<svg className={s.bock} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" /><path d="M7.8 12.3l2.9 2.9 5.6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Brev = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Nal = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6.1 7-11.5A7 7 0 005 9.500C5 14.900 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9.500" r="2.500" stroke="currentColor" strokeWidth="1.8" /></svg>);
const Klocka = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IgIkon = () => (<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg>);
const FbIkon = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.500V4.500H14c-2.200 0-3.500 1.500-3.500 3.600V10H8v3.300h2.500V21h3.400v-7.700h2.600l.5-3.300h-3.100V8.500c0-.3.2-.5.6-.5z" fill="currentColor" /></svg>);
const GoogleG = ({ className }) => (<svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.400-.2-2H12v3.900h5.400a4.600 4.600 0 01-2 3v2.500h3.200c1.900-1.700 3-4.300 3-7.400z" /><path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.400l-3.200-2.500c-.9.6-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.400 14a6 6 0 010-3.800V7.600H3.100a10 10 0 000 9l3.300-2.600z" /><path fill="#EA4335" d="M12 6c1.500 0 2.800.5 3.800 1.500l2.900-2.900A10 10 0 003.100 7.600L6.400 10c.8-2.300 3-4 5.600-4z" /></svg>);
const STJARNA = 'M12 2.500l2.900 6.100 6.600.8-4.900 4.600 1.300 6.500L12 17.300l-5.900 3.200 1.300-6.500L2.500 9.400l6.600-.8z';
const Stjarnor = ({ tomma, etikett }) => (<span className={`${s.stjarnor} ${tomma ? s.stjarnorTomma : ''}`} role="img" aria-label={etikett}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d={STJARNA} /></svg>))}</span>);

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

export default function DemoSida({ data: d }) {
  const t = T[d.sprak || 'sv'];
  const k = d.kontakt;
  const harTel = Boolean(k.tel);
  const logoKlass = d.logo ? (d.logo.topp === 'bricka' ? s.logoBricka : d.logo.topp === 'vit' ? s.logoVit : '') : '';
  const lankar = [...d.nav.vanster, ...d.nav.hoger];
  // Längsta H1-raden, räknad i stora tecken (en liten rad är 0,62 av höjden) — styr H1-storleken i CSS.
  const h1Tecken = Math.max(...d.hero.h1.map((rad) => (rad.txt ? rad.txt.length * (rad.liten ? 0.62 : 1) : rad.length))).toFixed(1);
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
          <a className={`${s.hdrMobilLogo} ${logoKlass}`} href="#top" aria-label={d.namn}><Logo logo={d.logo && { ...d.logo, alt: '' }} ordmarke={d.ordmarke} /></a>
          <nav className={s.hdrPiller} aria-label={t.meny}>
            {d.nav.vanster.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
            <a className={`${s.hdrLogo} ${logoKlass}`} href="#top" aria-label={`${d.namn} – ${t.tillToppen.toLowerCase()}`}><Logo logo={d.logo && { ...d.logo, alt: '' }} ordmarke={d.ordmarke} priority /></a>
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
              {d.hero.marke ? <p className={s.heroMarke}>{d.hero.marke}</p> : null}
              <h1 className={s.h1} style={{ '--h1-tecken': h1Tecken }}>{d.hero.h1.map((rad, i) => <span className={rad.liten ? s.h1Liten : undefined} key={i}>{rad.txt || rad}</span>)}</h1>
              <p className={s.heroIngress}>{d.hero.ingress}</p>
              <div className={s.heroCta}>
                <a className={s.btn} href="#kontakt">{d.cta.txt}</a>
                <a className={`${s.btn} ${s.btnKontur}`} href={andraVag.href} {...(andraVag.ny ? { target: '_blank', rel: 'noopener' } : {})}>{andraVag.ikon}{andraVag.txt}</a>
              </div>
              {d.hero.bevis?.length ? <ul className={s.heroBevis}>{d.hero.bevis.map((b) => <li key={b}><Bock />{b}</li>)}</ul> : null}
            </div>
          </div>
        </section>

        {/* 2. Tjänster: kort med bild */}
        <section className={`${s.sek} ${s.sekMjuk}`} id="tjanster">
          <div className={s.wrap}>
            <Rubrik r={d.tjanster} />
            <div className={s.tjanster}>
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
                    <a className={s.pilLank} href="#kontakt" aria-label={`${d.cta.lank} – ${tj.namn}`}>{d.cta.lank}</a>
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
                {d.varfor.not ? <p className={s.varforNot}>{d.varfor.not}</p> : null}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Om oss: historien, med logotypen */}
        <section className={`${s.sek} ${s.sekKram}`} id="om">
          <div className={s.wrap}>
            <div className={s.omGrid}>
              <div className={s.omKort}>
                <Logo logo={d.logo} ordmarke={d.ordmarke} klass="om" />
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
              <ol className={s.steg}>{d.steg.lista.map((st) => <li className={s.stegItem} key={st.namn}><h3>{st.namn}</h3><p>{st.text}</p></li>)}</ol>
              <div className={s.stegFot}><a className={s.btn} href="#kontakt">{d.cta.txt}</a></div>
            </div>
          </section>
        ) : null}

        {/* 7. Omdömen i Google-stil */}
        <section className={`${s.sek} ${s.sekMjuk}`} id="omdomen">
          <div className={s.wrap}>
            <div className={s.omdHuvud}>
              <Rubrik r={d.omdomen} />
              {d.omdomen.betyg ? (
                <div className={s.betyg}>
                  <GoogleG />
                  <span className={s.betygTal}>{d.omdomen.betyg.varde}</span>
                  <span className={s.betygTxt}><Stjarnor etikett={t.femStjarnor} /><span>{d.omdomen.betyg.text}</span></span>
                </div>
              ) : null}
            </div>
            <div className={s.recensioner}>
              {d.omdomen.lista.map((o, i) => (
                <figure className={s.recension} key={o.namn}>
                  <div className={s.recensionHuvud}>
                    <span className={s.avatar} style={{ '--av': AVATARFARGER[i % AVATARFARGER.length] }} aria-hidden="true">{o.namn[0]}</span>
                    <figcaption><b>{o.namn}</b><span>{o.kalla}</span></figcaption>
                    {o.google ? <GoogleG className={s.recensionG} /> : null}
                  </div>
                  <div className={s.recensionRad}>
                    <Stjarnor tomma={o.exempel} etikett={o.exempel ? t.exempelStjarnor : t.femStjarnor} />
                    {o.exempel ? <span className={s.exempelTagg}>{t.exempel}</span> : null}
                  </div>
                  <blockquote>{o.text}</blockquote>
                </figure>
              ))}
            </div>
            <div className={s.recensionerFot}>
              <p className={s.recensionerNot}>{d.omdomen.not}</p>
              <div className={s.recensionerKnappar}>
                {d.omdomen.lank ? <a className={`${s.btn} ${s.btnLjus}`} href={d.omdomen.lank.href} target="_blank" rel="noopener">{d.omdomen.lank.txt}</a> : null}
                <a className={`${s.btn} ${s.btnMork}`} href="#kontakt">{d.cta.txt}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Instagram: riktiga inlägg som inbäddningar, annars egna bilder i IG-ram */}
        {d.instagram ? (
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
                {d.instagram.koder
                  ? d.instagram.koder.map((kod, i) => (
                    <div className={s.igInlagg} key={kod}>
                      <iframe src={`https://www.instagram.com/p/${kod}/embed/captioned/`} title={`${t.inlagg} ${k.igHandle} (${i + 1})`} loading="lazy" allow="encrypted-media" />
                    </div>
                  ))
                  : d.instagram.kort.map((ko) => (
                    <a className={s.igInlagg} href={k.ig} target="_blank" rel="noopener" key={ko.bild}>
                      <div className={s.igKortHuvud}><span className={s.igRing} aria-hidden="true"><span>{d.namn[0]}</span></span>{k.igHandle}</div>
                      <div className={s.igKortBild}><Image src={ko.bild} alt={ko.alt} width={800} height={800} sizes="(max-width: 700px) 92vw, 380px" /></div>
                      <div className={s.igKortIkoner} aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M12 20.500s-7.500-4.600-7.500-10A4.300 4.300 0 0112 7.800a4.300 4.300 0 017.500 2.700c0 5.400-7.500 10-7.500 10z" /></svg>
                        <svg viewBox="0 0 24 24"><path d="M20.500 11.500a8.500 8.500 0 01-12.600 7.400L3.500 20.500l1.600-4.300A8.500 8.500 0 1120.500 11.500z" /></svg>
                        <svg viewBox="0 0 24 24"><path d="M21 3L10.500 13.500M21 3l-6.500 18-4-7.500L3 9.500z" /></svg>
                      </div>
                      <p className={s.igKortTxt}><b>{k.igHandle}</b>{ko.text}</p>
                    </a>
                  ))}
              </div>
            </div>
          </section>
        ) : null}

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
                </aside>
              </div>
              <div className={s.fragor}>{d.fragor.lista.map((f) => <details className={s.fraga} name="faq" key={f.q}><summary>{f.q}<span className={s.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            </div>
          </div>
        </section>

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
                <div className={s.kontaktRader}>
                  {harTel ? <a className={s.kontaktRad} href={k.telHref}><span>{t.telRad}</span><b>{k.tel}</b></a> : null}
                  {k.epost ? <a className={s.kontaktRad} href={`mailto:${k.epost}`}><span>{t.epostRad}</span><b>{k.epost}</b></a> : null}
                  {k.oppet ? <div className={s.kontaktRad}><span>{t.oppetRad}</span><b>{k.oppet}</b></div> : null}
                  {k.ig ? <a className={s.kontaktRad} href={k.ig} target="_blank" rel="noopener"><span>{t.igRad}</span><b>{k.igHandle}</b></a> : null}
                </div>
              </div>
              <form className={s.form} action={d.formAction} method="post" encType="text/plain" aria-describedby="form-not">
                <p className={s.formRubrik}>{d.kontaktSektion.formRubrik}</p>
                <div className={s.formRad}>
                  <label>{t.namn}<input type="text" name="namn" autoComplete="name" required /></label>
                  <label>{t.telefon}<input type="tel" name="telefon" autoComplete="tel" required /></label>
                </div>
                <label>{t.epost}<input type="email" name="epost" autoComplete="email" /></label>
                <label>{t.typ}<select name="typ" defaultValue={d.tjanster.kort[0].namn}>{d.tjanster.kort.map((tj) => <option key={tj.id}>{tj.namn}</option>)}<option>{t.annat}</option></select></label>
                <label>{t.meddelande}<textarea name="meddelande" rows={4} placeholder={d.kontaktSektion.placeholder} /></label>
                <button className={s.btn} type="submit">{d.cta.txt}</button>
                {harTel ? <a className={`${s.btn} ${s.btnLjus}`} href={k.telHref}><Tel />{t.ellerRing} {k.tel}</a> : null}
                <p className={s.formNot} id="form-not">{d.kontaktSektion.formNot}</p>
                <p className={s.formNot}>{t.formDemo}</p>
              </form>
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
              <ul>{d.tjanster.kort.map((tj) => <li key={tj.id}><a href="#tjanster">{tj.namn}</a></li>)}</ul>
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
