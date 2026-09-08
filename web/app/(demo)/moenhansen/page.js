import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './moenhansen.module.css';

/* ===========================================================================
   MOEN HANSENS BYGG OG HÅNDVERKSTJENESTER — gratis nettsideforslag fra Bahko
   Lead: instagram.com/moenhansensbygg · Horten (Borre), Vestfold · INGEN
   nettside. SPRÅK: bokmål. Bygget på golvvision-kanon med hero som
   før/etter-effekt (start- og sluttbilde fra kjeden A → B).

   Bærende idé: svennebrev og tolv år i faget, i Horten. Én tømrer, ett
   ansvar — fra terrassen ute til badet inne.

   VERIFISERT (Brønnøysundregistrene + proff.no + Instagram, 2026-09-08):
   Firmanavn "MOEN HANSENS BYGG OG HÅNDVERKSTJENESTER" · org.nr 925 426 237 ·
   enkeltpersonforetak · registrert 2020-08-03 · Fogdeveien 37, 3184 Borre
   (Horten) · næringskode "Oppføring av bygninger" · innehaver Jørgen Moen
   Hansen (proff) · Instagram-bio ordrett: "Lokal håndverker med tilholdssted
   i Horten · Svennebrev i Tømrerfaget · 12 års erfaring innenfor faget" ·
   115 innlegg, 1 545 følgere · innleggene viser bad (flis, dusjvegg, servant),
   terrasser, kjøkken, vindusbytte, hagearbeid.

   IKKE verifisert, og derfor ikke på siden: telefon (tallene i profilbildet
   er ikke lesbare i sin helhet), e-post, omtaler (ingen funnet), priser,
   ansatte. Logo: profilbildet (tak + hammer, brunt/oransje) kan ikke lastes
   ned — siden bærer et ordmerke. Be om logofilen.

   PLASSHOLDERE: telefon 900 00 000 (oppdiktet), skjema til
   mathias@bahkobyra.se, omtaler i eksempelmodus, alt bildemateriale er
   illustrasjoner (merket). De har 115 innlegg med ekte bilder — be om dem.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--mh-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--mh-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--mh-ui' });

export const metadata = {
  title: 'Moen Hansens Bygg — tømrer i Horten: bad, terrasse, kjøkken og vinduer',
  description:
    'Lokal tømrer i Horten med svennebrev og tolv år i faget. Bad, terrasse, kjøkken og vindusbytte til fast pris. Gratis befaring. Nettsideforslag fra Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '900 00 000';
const TEL_HREF = 'tel:+4790000000';
const ADRESSE = 'Fogdeveien 37, 3184 Borre';
const IG = 'https://www.instagram.com/moenhansensbygg/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Moen%20Hansens%20Bygg%20-%20foresp%C3%B8rsel';

const LANKAR = [
  { href: '#tjenester', txt: 'Det vi gjør' },
  { href: '#prosess', txt: 'Slik går det' },
  { href: '#hvorfor', txt: 'Hvorfor oss' },
  { href: '#sporsmal', txt: 'Vanlige spørsmål' },
];

const RITNINGAR = {
  bad: (<><path d="M40 30h120v60H40z" /><path d="M100 30v60M40 60h120" /><path d="M52 44l14 14M60 44l14 14" /><path d="M118 80l8-8 8 8" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  terrasse: (<><path d="M20 78h160" /><path d="M36 78v-8h128v8" /><path d="M36 70v-22M164 70v-22M36 48h128" /><path d="M52 62h96" /><path d="M20 96h160M20 92v8M180 92v8" /></>),
  kjokken: (<><path d="M12 24h176v80H12z" /><path d="M70 24v80M130 24v80" /><path d="M58 60v10M82 60v10M118 60v10M142 60v10" /><path d="M12 112h176" /></>),
  vindu: (<><path d="M50 24h100v76H50z" /><path d="M100 24v76M50 62h100" /><path d="M42 24v76M158 24v76" /><path d="M50 112h100M50 108v8M150 108v8" /></>),
};

const TJANSTER = [
  { id: 'bad', ritning: 'bad', namn: 'Bad', text: 'Nytt bad fra membran til siste flis. Fall mot sluk, tett dusjvegg, flis som ligger rett. Det er underarbeidet som avgjør om badet holder.', punkter: ['Flislegging', 'Dusjvegg og servant', 'Membran og fall'] },
  { id: 'terrasse', ritning: 'terrasse', namn: 'Terrasse', text: 'Terrasse og platting tilpasset huset og tomten. Riktig fundament, riktig avstand mellom bordene, og rekkverk som står i mange vintre.', punkter: ['Terrasse og platting', 'Rekkverk og trapp', 'Utskifting av gammel terrasse'] },
  { id: 'kjokken', ritning: 'kjokken', namn: 'Kjøkken', text: 'Montering av kjøkken og skreddersydd snekring der det ferdigkjøpte ikke passer. Skapene i lodd, benkeplaten i vater, fugen mot veggen tett.', punkter: ['Kjøkkenmontering', 'Skreddersydde skap', 'Benkeplate og fuger'] },
  { id: 'vindu', ritning: 'vindu', namn: 'Vinduer og dører', text: 'Bytte av vinduer og dører, tettet og isolert riktig, så trekken forsvinner og karmen sitter rett i mange år.', punkter: ['Vindusbytte', 'Ytterdør', 'Tetting og isolering'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  befaring: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  tilbud: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  arbeid: (<><path d="M14 92h172" /><path d="M40 92h120v-10H40z" /><path d="M40 82h120v-10H40z" /><path d="M78 72V52h44v20M90 52V38h20v14" /><path d="M14 106h172M14 102v8M186 102v8" /></>),
  overlevering: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'kontakt', text: 'Fortell hva du vil gjøre. Ofte kan vi si allerede på telefon om det er en jobb for oss, og omtrent hva det handler om.' },
  { nr: '2', namn: 'Gratis befaring', ritning: 'befaring', text: 'Vi kommer hjem til deg og ser på badet, terrassen eller kjøkkenet. Du får høre hva som må gjøres, og hva som kan vente.' },
  { nr: '3', namn: 'Fast pris', ritning: 'tilbud', text: 'Prisen settes når vi har sett jobben, og den står. Finner vi råte eller fukt bak veggen, ringer vi før vi gjør noe med det.' },
  { nr: '4', namn: 'Arbeidet', ritning: 'arbeid', text: 'Én tømrer, ett ansvar. Vi rydder etter oss hver dag, og sier fra hvis noe tar lengre tid enn planen.' },
  { nr: '5', namn: 'Overlevering', ritning: 'overlevering', text: 'Vi går over jobben sammen før vi pakker. Sitter noe feil, tar vi det da, ikke etter en vinter.' },
];

const STATS = [
  { tal: 12, prefix: '', etikett: 'År i faget' },
  { tal: 2020, prefix: '', etikett: 'Registrert' },
  { tal: 0, prefix: '', etikett: 'Kroner for befaringen' },
  { tal: 1, prefix: '', etikett: 'Tømrer, ett ansvar' },
];

const VARFOR = [
  'Svennebrev i tømrerfaget og tolv år i faget.',
  'Lokal i Horten: kort vei til befaring, og vi møter deg på Kiwi etterpå.',
  'Fast pris når vi har sett jobben, og den står.',
  'Holder terrassen med nye bord og nytt rekkverk, sier vi det. Selv om en ny hadde gitt oss mer betalt.',
];

const OMDOMEN = [
  { namn: 'Eksempel', text: 'Slik ser en omtale ut når den står her: kort, med fornavn og sted, hentet fra Google-profilen.' },
  { namn: 'Eksempel', text: 'Kunden skriver hva som ble gjort, om prisen holdt og hvordan det ble. Det er den teksten som selger.' },
  { namn: 'Eksempel', text: 'Tre til fem ekte holder. En oppdiktet er verre enn ingen — derfor står det Eksempel her.' },
];

const FRAGOR = [
  { q: 'Hva koster et nytt bad?', a: 'Det avhenger av størrelsen, hva som ligger under det gamle, og hva du vil ha. Derfor starter vi med en gratis befaring før noen pris settes. Prisen du får, står.' },
  { q: 'Hvor lang tid tar det?', a: 'En terrasse tar gjerne noen dager, et bad noen uker fordi membran og lim må tørke. Du får en tidsplan i tilbudet, og vi sier fra hvis den endrer seg.' },
  { q: 'Må hele terrassen byttes?', a: 'Ikke alltid. Er bjelkelaget friskt, holder det ofte med nye bord og nytt rekkverk. Vi sier hva som gjelder for din etter befaringen.' },
  { q: 'Har dere svennebrev?', a: 'Ja, svennebrev i tømrerfaget og tolv år i faget.' },
  { q: 'Gjør dere våtrom etter forskriftene?', a: 'Vi legger membran og fall etter gjeldende krav, og dokumenterer det. Spør oss om detaljene for akkurat ditt bad ved befaringen.' },
  { q: 'Kan dere bytte bare vinduene?', a: 'Ja. Vindusbytte og dører gjør vi som egne jobber, tettet og isolert riktig, så trekken forsvinner.' },
  { q: 'Hvor jobber dere?', a: 'Horten og området rundt: Borre, Åsgårdstrand, Tønsberg, Holmestrand. Ligger jobben lenger unna, si hvor, så sier vi om vi kan ta den.' },
  { q: 'Hvordan kommer jeg i gang?', a: 'Ring, eller skriv noen linjer om hva du vil gjøre. Befaringen er gratis, og du får en fast pris før noe starter.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjerner">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);
const GoogleG = ({ className }) => (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" /><path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" /></svg>);

export default function MoenHansenDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`} lang="nb">
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Moen Hansens Bygg</b><i>Horten</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/moenhansen/media/poster-hero.jpg"><source src="/moenhansen/media/video-hero-foer-etter-terrasse.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/moenhansen/media/poster-hero-mobil.jpg"><source src="/moenhansen/media/video-hero-foer-etter-terrasse-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroOrdmarke}>Moen Hansens Bygg <span>Håndverkstjenester</span></h1>
            <p className={styles.heroTjanster}>Bad · Terrasse</p>
            <p className={styles.heroOrt}>Horten</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Bestill gratis befaring</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det vi gjør">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Bad og flis</span><span>Terrasse</span><span>Kjøkken</span><span>Vindusbytte</span><span>Dører</span><span>Snekring</span><span>Svennebrev</span><span>Horten og omegn</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Moen Hansens Bygg i tall">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Forvandlingen</p><h2 className={styles.h2}>Én tømrer. <em>Ett ansvar.</em></h2></div>
          <div className={styles.forvandling}>
            <figure><Image src="/moenhansen/media/galleri-foer-gammel-terrasse.jpg" alt="Gammel grå terrasse med råtne bord, mose og rustent rekkverk" width={1200} height={1200} /><figcaption><b>Før</b></figcaption></figure>
            <figure><Image src="/moenhansen/media/galleri-etter-ny-terrasse.jpg" alt="Samme terrasse bygget ny i impregnert furu med nytt rekkverk og trapp" width={1200} height={1200} /><figcaption><b>Etter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/moenhansen/media/galleri-makro-rekkverk.jpg" alt="Nærbilde av hjørnet der rekkverksstolpen møter håndlisten" width={1200} height={1200} /><figcaption>Hjørnet som viser håndverket.</figcaption></figure>
            <figure><Image src="/moenhansen/media/galleri-bad-nytt.jpg" alt="Nytt bad med store lyse fliser, dusjvegg i glass og eikeservant" width={1200} height={1200} /><figcaption>Badet, fra membran til siste flis.</figcaption></figure>
            <figure><Image src="/moenhansen/media/galleri-kjokken-montert.jpg" alt="Nymontert kjøkken med hvite fronter og eikebenkeplate" width={1200} height={1200} /><figcaption>Kjøkkenet i lodd og vater.</figcaption></figure>
            <figure><Image src="/moenhansen/media/galleri-flis-legging.jpg" alt="Store gulvfliser under legging med fliskryss og laserlinje" width={1200} height={1200} /><figcaption>Flisene, lagt etter laseren.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrasjonsbilder — byttes ut med deres egne prosjektbilder.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjenester">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Det vi gjør</p><h2 className={styles.h2}>Ute og inne, <em>samme hender</em></h2><p className={styles.sekLead}>Terrassen ute og badet inne, kjøkkenet og vinduene. Én tømrer med svennebrev, så du slipper å koordinere fire firmaer.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="prosess">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Slik går det</p><h2 className={styles.h2}>Fem steg, og prisen settes <em>i det tredje</em></h2><p className={styles.sekLead}>Det starter med en telefon og slutter med at vi går over jobben sammen.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Slik går det">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="hvorfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Hvorfor oss</p><h2 className={styles.h2}>Bord for bord, <em>ikke bare på overflaten</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/moenhansen/media/poster-hvorfor.jpg" aria-label="Terrassebordene legges ett etter ett på det nye bjelkelaget"><source src="/moenhansen/media/video-hvorfor-terrassebord.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omtaler</p><h2 className={styles.h2}>Det kundene sier</h2><p className={styles.googleRad}><GoogleG className={styles.googleG} /><span>Google-omtaler</span></p></div>
          <div className={styles.recensioner}>{OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>Byttes ut med en ekte omtale</span></figcaption><GoogleG className={styles.recensionG} /></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}</div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Eksempel — byttes ut med deres ekte Google-omtaler når profilen er på plass.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/search?q=Moen+Hansens+Bygg+Horten" target="_blank" rel="noopener">Se alle omtaler</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sosiale">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}><a href={IG} target="_blank" rel="noopener" aria-label="Moen Hansens Bygg på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a></div>
          <p className={styles.socialaTxt}>Følg arbeidet i hverdagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/moenhansen/media/sosiale-verktoy-terrasse.jpg" alt="Tømrerverktøy på nye terrassebord" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/moenhansen/media/sosiale-trelast.jpg" alt="Stabel med impregnerte terrassebord på plenen" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/moenhansen/media/sosiale-snekkerdetalj.jpg" alt="Gjæret hjørne på nytt rekkverk" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrasjonsbilder — byttes ut med deres egne.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="sporsmal">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanlige spørsmål</p><h2 className={styles.h2}>Det du pleier å spørre om først</h2><p className={styles.sekLead}>Pris og tid først, det praktiske etterpå. Gjelder det akkurat ditt hus, er telefonen raskere enn en nettside.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Finner du ikke svaret?</h3><p>Ring og spør rett ut. Vi sier hva som gjelder for ditt hus.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Skal noe bygges eller byttes?<br /><em>Start med befaringen.</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv noen linjer om jobben. Befaringen er gratis, og prisen du får, står.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@moenhansensbygg</b></a>
                <div className={styles.kontaktRad}><span>Adresse</span><b>{ADRESSE}</b></div>
                <div className={styles.kontaktRad}><span>Område</span><b>Horten og omegn</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Navn<input type="text" name="navn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valgfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Hva gjelder det?<select name="type" defaultValue="Bad"><option>Bad</option><option>Terrasse</option><option>Kjøkken</option><option>Vinduer eller dører</option><option>Snekring</option><option>Noe annet</option></select></label>
              <label>Kort om jobben<textarea name="melding" rows={4} placeholder="Hva som skal gjøres, hvor huset ligger, omtrent hvor stort, og når du vil ha det ferdig" /></label>
              <button className={styles.btn} type="submit">Bestill gratis befaring</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobben — da kan vi gi et fornuftig svar allerede i første samtale. Ingen masseutsendelser, ingen salgsliste.</p>
              <p className={styles.formNot}>Obs: i dette forslaget åpner knappen e-postprogrammet ditt og sender linjene til Bahko Byrå. På den ferdige nettsiden kobles skjemaet til deres egen innboks.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Moen Hansens Bygg og Håndverkstjenester</b><i>Tømrer i Horten</i></span><p className={styles.ftrText}>Bad, terrasse, kjøkken og vindusbytte i Horten og omegn. Svennebrev i tømrerfaget, tolv år i faget.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={IG} target="_blank" rel="noopener">@moenhansensbygg</a><a href="#top">Til toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Moen Hansens Bygg og Håndverkstjenester · Org.nr 925 426 237 · {ADRESSE}</span><span>Forslag laget av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Lukk menyen</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakt Moen Hansens Bygg"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Lukk" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Råtne terrassebord?</p><p className={styles.popupTxt}>Befaringen er gratis. Du får høre om bjelkelaget holder, eller om alt bør byttes, før du bestemmer deg.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv noen linjer →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om dette forslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Lukk">✕</a><span className={styles.modalBadge}>Forslag fra Bahko Byrå</span><h3 id="bahko-rubrik">Slik kan Moen Hansens Bygg se ut på nett</h3><p>Dette er et gratis forslag, bygget på det dere selv viser på Instagram. Ingen bestilling, ingen forpliktelse. Vil dere se den ferdig med deres egne bilder, logo og et skjema som lander i innboksen? Book en gratis 15-minutters samtale med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Book 15 min gratis samtale →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Moen%20Hansens%20Bygg%20-%20nettsideforslag">Eller send e-post → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som selger.</span></section></div>
    </div>
  );
}
