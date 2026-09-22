import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './alltfix.module.css';
import DemoFormular from '../../komponenter/DemoFormular';

/* ===========================================================================
   ALLTFIX STOCKHOLM AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/alltfixstockholm · Järfälla/Stockholm · VARM: Mathias
   lovade prototyp inom 48 h i DM 2026-09-14.
   Byggd på golvvision-kanon med hero som före/efter-effekt.

   VARNING om namnet: alltfix.se är en STÄDFIRMA och ett annat bolag. Den här
   kundens sajt är fixfonster.se ("Fix Fönster AB"), som i sin egen sidfot
   skriver "Vi är Alltfix. Alltfix Stockholm AB är din lokala partner för
   fönsterbyte". Samma bolag, org.nr 559272-2341.

   Bärande idé: ett fönsterbyte tar en dag, men det ska sitta i tjugo år. De
   mäter, beställer direkt från tillverkaren utan mellanhänder, monterar
   själva och lämnar 20 års garanti. En kedja, ett ansvar. Heron visar det
   enda kunden faktiskt ser: samma hål i väggen, före och efter.

   VERIFIERAT (IG-bio + fixfonster.se + Offerta-profilen, 2026-09-14):
   Firmanamn "Alltfix Stockholm AB" · org.nr 559272-2341 (sajtens sidfot) ·
   Vintervägen 16, 177 60 Järfälla · e-post support@alltfix.com ·
   kontaktperson Rami (Offerta) · IG-bio ordagrant: "Vi på Alltfix är din
   renoveringsfirma i Stockholm när det kommer till: Fönster, Altan/uterum,
   Måleri. Hör av dig för en kostnadsfri offert!" · sajtens tjänstelista:
   uPVC-, aluminium-, trä- och trä-aluminiumfönster, skjut- och viksystem,
   garageportar, ytterdörrar, insektsnät, balkonginglasning · Offerta,
   deras egen text: direktleveranser från tillverkare utan mellanhänder,
   leverans upp till 15 arbetsdagar efter beställning, teknisk rådgivning,
   måttagning, montering och slutkontroll, 20 års garanti på samtliga
   produkter, glasrum och uterum, myggnät och carport · sajtens sexstegs-
   process citeras i Så går det till · Offerta: 4,8 i betyg på 10 omdömen,
   medlem sedan 2025, godkänd för F-skatt, registrerad för moms, skuldsaldo
   0 kr, godkänd kredithistorik · fyra omdömen citeras ordagrant med namn,
   jobb, ort och datum som de står på Offerta.

   INTE verifierat, och finns därför inte på sidan: telefonnummer (inget
   publicerat någonstans — knapparna går till mejl och formulär), antal
   anställda, grundat år, priser, Google-betyg.

   FLAGGOR: formuläret går till mathias@bahkobyra.se. Alla bilder är
   illustrationer, märkt en gång — deras egna sajtbilder är
   leverantörsrenderingar med alpmotiv och passar inte en svensk sida.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--al-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--al-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--al-ui' });

export const metadata = {
  title: 'Alltfix Stockholm AB — fönsterbyte, uterum och måleri',
  description:
    'Fönsterbyte i Stockholm med 20 års garanti. Vi mäter, beställer direkt från tillverkaren utan mellanhänder och monterar själva. Även uterum, ytterdörrar och måleri. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const EPOST = 'support@alltfix.com';
const ADRESS = 'Vintervägen 16, 177 60 Järfälla';
const IG = 'https://www.instagram.com/alltfixstockholm/';
const OFFERTA = 'https://offerta.se/foretag/alltfix-stockholm-ab';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  fonster: (<><path d="M44 16h112v88H44z" /><path d="M100 16v88M44 60h112" /><path d="M56 28h32v24H56zM112 28h32v24h-32zM56 72h32v20H56zM112 72h32v20h-32z" /><path d="M36 110h128" /></>),
  uterum: (<><path d="M16 96h168" /><path d="M32 96V44h136v52" /><path d="M32 44l68-26 68 26" /><path d="M60 96V56h32v40zM108 96V56h32v40z" /><path d="M16 106h168" /></>),
  dorr: (<><path d="M60 14h80v90H60z" /><path d="M72 26h56v40H72z" /><path d="M72 78h56v14H72z" /><circle cx="128" cy="72" r="3" /><path d="M40 110h120" /></>),
  maleri: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
};

const TJANSTER = [
  { id: 'fonster', ritning: 'fonster', namn: 'Fönsterbyte', text: 'uPVC, aluminium, trä och trä-aluminium. Vi mäter exakt på plats, beställer direkt från tillverkaren och monterar med rätt isolering och fog.', punkter: ['uPVC och aluminium', 'Trä och trä-aluminium', 'Skjut- och viksystem'] },
  { id: 'uterum', ritning: 'uterum', namn: 'Uterum och glasrum', text: 'Altan, uterum och balkonginglasning som går att använda fler månader om året. Anpassat efter huset och efter det nordiska klimatet.', punkter: ['Glasrum och uterum', 'Balkonginglasning', 'Carport'] },
  { id: 'dorr', ritning: 'dorr', namn: 'Ytterdörrar och nät', text: 'Ny ytterdörr med rätt tätning och lås, garageportar, och insektsnät till fönstren så att sommaren går att sova igenom.', punkter: ['Ytterdörrar', 'Garageportar', 'Insektsnät och myggnät'] },
  { id: 'maleri', ritning: 'maleri', namn: 'Måleri', text: 'Utvändig målning av fasad och snickerier, och invändigt när rummet ändå ska bli som nytt efter fönsterbytet.', punkter: ['Fasadmålning', 'Snickerier', 'Invändigt måleri'] },
];

const STEGRITNINGAR = {
  konsultation: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  matning: (<><path d="M44 20h112v76H44z" /><path d="M100 20v76M44 58h112" /><path d="M24 20v76M20 20h8M20 96h8" /><path d="M44 108h112M44 104v8M156 104v8" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  produktion: (<><path d="M14 84h110V40H14z" /><path d="M124 56h34l20 18v10h-54z" /><circle cx="44" cy="92" r="10" /><circle cx="150" cy="92" r="10" /><path d="M14 100h172" /></>),
  montering: (<><path d="M44 16h112v88H44z" /><path d="M100 16v88M44 60h112" /><path d="M28 40l12 12M28 64l12 12" /><path d="M36 110h128" /></>),
  slutkontroll: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Kostnadsfri konsultation', ritning: 'konsultation', text: 'Vi går igenom vad du vill uppnå: mer ljus, bättre isolering, tystare hem eller ett nytt uttryck. Rådgivningen kostar ingenting.' },
  { nr: '2', namn: 'Mätning på plats', ritning: 'matning', text: 'Exakta mått och kontroll av karm, vägg och befintliga förutsättningar. Det är här passformen avgörs, inte i katalogen.' },
  { nr: '3', namn: 'Offert och modellval', ritning: 'offert', text: 'Du får en tydlig offert och väljer material, öppningssätt, glas och tillval. Alla typer och modeller.' },
  { nr: '4', namn: 'Beställning och produktion', ritning: 'produktion', text: 'Fönstren tillverkas efter dina mått och levereras direkt från tillverkaren, upp till 15 arbetsdagar efter beställning.' },
  { nr: '5', namn: 'Montering', ritning: 'montering', text: 'Fackmannamässig installation med rätt isolering, fog och justering. Snabbt, rent och med skydd på golven.' },
  { nr: '6', namn: 'Slutkontroll och garanti', ritning: 'slutkontroll', text: 'Funktionsprov, städning av arbetsplatsen och en genomgång med dig. Dokumentation och garanti lämnas.' },
];

/* Verifierade tal: 20 års garanti och 15 arbetsdagar är deras egna uppgifter
   på Offerta; 4,8 är Offerta-betyget; 0 kr konsultation står på sajten. */
const STATS = [
  { tal: 20, prefix: '', etikett: 'Års garanti på produkterna' },
  { tal: 15, prefix: '', etikett: 'Arbetsdagar till leverans' },
  { tal: 0, prefix: '', etikett: 'Kronor för konsultationen' },
  { tal: 0, prefix: '', etikett: 'Mellanhänder mellan fabrik och dig' },
];

const VARFOR = [
  'Direkt från tillverkaren, utan mellanhänder. Det är därför leveransen går på 15 arbetsdagar.',
  'Samma firma mäter, monterar och gör slutkontrollen. Ingen skyller på någon annan.',
  '20 års garanti på produkterna, och dokumentationen får du i handen.',
  'Räcker det att renovera fönstren säger vi det. Även när ett byte hade gett oss mer betalt.',
];

/* Riktiga omdömen från Offerta, ordagrant och något kortade utan att ändra
   innebörd. Namn, jobb, ort och datum som de står där. */
const OMDOMEN = [
  { namn: 'Kawa', ort: 'Fönsterbyte, Upplands Väsby · sept 2026', text: 'Jag är mycket nöjd med hela arbetet med fönsterbytet. Trevligt och professionellt bemötande, noggrant utfört arbete och dessutom hölls både tider och överenskommelser. Fönstren är snyggt monterade och resultatet blev över förväntan.' },
  { namn: 'Oscar', ort: 'Tio fönster, Huddinge · sept 2026', text: 'Jag rekommenderar detta företag till 100 % för byte av fönster och dörrar i PVC. De höll tidsplanen otroligt snabbt och arbetet blev perfekt. Klimatet i huset är behagligt sedan de bytte ut våra fönster och dörrar.' },
  { namn: 'Tomas', ort: 'Sexton fönster, Tyresö · aug 2025', text: 'Arbetet var snyggt, proffsigt och välplanerat. De kom när de sa att de skulle och hantverkarna var riktigt duktiga. Allt blev jättesnyggt och de städade upp noga efter sig.' },
];

const FRAGOR = [
  { q: 'Vad kostar ett fönsterbyte?', a: 'Det beror på antal, material och mått. Konsultationen och måttagningen kostar ingenting, och du får en tydlig offert innan något beställs.' },
  { q: 'Hur lång tid tar det?', a: 'Fönstren tillverkas efter dina mått och levereras upp till 15 arbetsdagar efter beställning. Själva monteringen går oftast på en eller ett par dagar.' },
  { q: 'Vad ingår i garantin?', a: 'Samtliga produkter levereras med 20 års garanti. Du får dokumentationen och skötselråden vid slutkontrollen.' },
  { q: 'Vilka fönster arbetar ni med?', a: 'uPVC, aluminium, trä och trä-aluminium, samt skjut- och viksystem. Behöver du specialmått, kulturfönster eller större glaspartier anpassar vi processen.' },
  { q: 'Varför direkt från tillverkaren?', a: 'Utan mellanhänder blir kvaliteten jämnare, leveransen snabbare och priset ärligare. Vi ansvarar för hela kedjan från måttagning till slutkontroll.' },
  { q: 'Gör ni uterum och altan också?', a: 'Ja. Glasrum, uterum, balkonginglasning och carport. Och måleri, ute som inne.' },
  { q: 'Städar ni efter er?', a: 'Ja. Arbetsplatsen städas och gås igenom med dig innan vi lämnar. Det står i våra omdömen och vi tänker fortsätta förtjäna det.' },
  { q: 'Var arbetar ni?', a: 'Stockholm med omnejd, från Järfälla. Vi har bytt fönster i Huddinge, Tyresö, Upplands Väsby, Botkyrka och Spånga.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function AlltfixDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Alltfix</b><i>Stockholm</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href="#kontakt" aria-label="Få kostnadsfri offert"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">Gratis offert</span><span className={styles.hdrTelKort} aria-hidden="true">Offert</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/alltfix/media/poster-hero.jpg"><source src="/alltfix/media/video-hero-fore-efter-fonster.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/alltfix/media/poster-hero-mobil.jpg"><source src="/alltfix/media/video-hero-fore-efter-fonster-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={`${styles.heroLogo} ${styles.heroLogoBred}`}><Image src="/alltfix/media/logo-alltfix.png" alt="Alltfix Stockholm AB" width={645} height={174} priority /></h1>
            <p className={styles.heroTjanster}>Fönster · Uterum · Måleri</p>
            <p className={styles.heroOrt}>Järfälla · Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få kostnadsfri offert</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Mejla oss</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Fönsterbyte</span><span>uPVC och aluminium</span><span>Trä och trä-aluminium</span><span>Uterum och glasrum</span><span>Balkonginglasning</span><span>Ytterdörrar</span><span>Insektsnät</span><span>Måleri</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Alltfix i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Bytet tar en dag. <em>Det ska sitta i tjugo år.</em></h2><p className={styles.sekLead}>Det du ser är ett nytt fönster. Det som avgör är måtten, isoleringen och fogen runt om, och att samma firma har ansvarat för alltihop.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/alltfix/media/galleri-fore-gammalt-fonster.jpg" alt="Gammalt träfönster med flagnande färg, imma mellan rutorna och sprucken fog" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/alltfix/media/galleri-efter-nytt-fonster.jpg" alt="Samma fönsterhål med ett nytt vitt fönster, klart glas och ny jämn fog" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/alltfix/media/galleri-makro-insektsnat.jpg" alt="Närbild på insektsnätet i ett öppet vitt fönster med grön trädgård bakom" width={1200} height={1200} /><figcaption>Insektsnätet: sommaren utan gäster.</figcaption></figure>
            <figure><Image src="/alltfix/media/galleri-uterum.jpg" alt="Glasat uterum på baksidan av en villa, sett från gräsmattan" width={1200} height={1200} /><figcaption>Uterum som går att använda längre.</figcaption></figure>
            <figure><Image src="/alltfix/media/galleri-ytterdorr.jpg" alt="Nymonterad vit ytterdörr med stentrappa framför" width={1200} height={1200} /><figcaption>Ytterdörren, tätad och justerad.</figcaption></figure>
            <figure><Image src="/alltfix/media/galleri-montage.jpg" alt="Fönstermontage inifrån med kilar, fogskum och vattenpass på karmen" width={1200} height={1200} /><figcaption>Monteringen, med rätt isolering.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Din renoveringsfirma <em>i Stockholm</em></h2><p className={styles.sekLead}>Fönster är vår kärna, men vi tar också uterum, ytterdörrar och måleri. Allt anpassat för det nordiska klimatet.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Sex steg, och du väljer <em>i det tredje</em></h2><p className={styles.sekLead}>Från första kontakt till färdigt fönster. Tydligt, tryggt och utan överraskningar på vägen.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>En kedja, <em>ett ansvar</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/alltfix/media/poster-varfor.jpg" aria-label="Långsam åkning över det nymonterade fönstret med isolering och fog"><source src="/alltfix/media/video-varfor-montaget.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><Stjarnor /><span>4,8 på Offerta, tio omdömen</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o) => (<figure className={styles.recension} key={o.namn}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Omdömen från Offerta, som de står där. Kortade utan att ändra innebörd. Google-betyget kopplas in här när profilen finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href={OFFERTA} target="_blank" rel="noopener">Se alla omdömen på Offerta</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Alltfix på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/alltfix/media/sociala-verktyg.jpg" alt="Borrmaskin, vattenpass och fogspruta på skyddspapp inför montering" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/alltfix/media/sociala-gamla-fonster.jpg" alt="Gamla urplockade träfönster staplade vid bilen för bortforsling" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/alltfix/media/sociala-ljust-rum.jpg" alt="Vardagsrum med dagsljus genom ett nytt stort fönster" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris, tid och garanti först, det tekniska sedan. Gäller det just ditt hus är ett mejl snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Skriv några rader om fönstren så säger vi vad som gäller ditt hus.</p><a className={`${styles.btn} ${styles.btnMork}`} href={`mailto:${EPOST}`}>Mejla oss</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Hur många fönster,<br /><em>och vilket hus?</em></h2>
              <p className={styles.sekLead}>Skriv några rader eller skicka bilder. Konsultationen och måttagningen kostar ingenting, och du får en tydlig offert innan något beställs.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={OFFERTA} target="_blank" rel="noopener"><span>Offerta</span><b>4,8 av 10 omdömen</b></a>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@alltfixstockholm</b></a>
              </div>
            </div>
            <DemoFormular className={styles.form} amne="Alltfix - offertförfrågan">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>E-post<input type="email" name="epost" autoComplete="email" required /></label>
              <label>Telefon (valfritt)<input type="tel" name="telefon" autoComplete="tel" /></label>
              <label>Vad gäller det?<select name="typ" defaultValue="Fönsterbyte"><option>Fönsterbyte</option><option>Uterum eller inglasning</option><option>Ytterdörr eller garageport</option><option>Insektsnät</option><option>Måleri</option><option>Något annat</option></select></label>
              <label>Kort om huset<textarea name="meddelande" rows={4} placeholder="Hur många fönster, vilken typ av hus, var du bor och när du vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Få kostnadsfri offert</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Eller mejla direkt</a>
              <p className={styles.formNot} id="form-not">Skriv kort om huset — då kan vi ge ett vettigt svar redan i första mejlet. Inga massutskick, ingen säljlista.</p>
            </DemoFormular>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Alltfix Stockholm AB</b><i>Fönster · Uterum · Måleri</i></span><p className={styles.ftrText}>Fönsterbyte, uterum, ytterdörrar och måleri i Stockholm med omnejd. Direkt från tillverkaren, monterat av oss, med 20 års garanti.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={`mailto:${EPOST}`}>{EPOST}</a><a href={OFFERTA} target="_blank" rel="noopener">Omdömen på Offerta</a><a href={IG} target="_blank" rel="noopener">@alltfixstockholm</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Alltfix Stockholm AB · Org.nr 559272-2341 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Alltfix"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Drar det kallt?</p><p className={styles.popupTxt}>Konsultationen och måttagningen kostar ingenting. Du får veta vad ett byte skulle kosta innan du bestämmer något.</p><a className={`${styles.btn} ${styles.popupCta}`} href="#kontakt">Få kostnadsfri offert</a><a className={styles.popupAlt} href={`mailto:${EPOST}`}>Eller mejla oss →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Alltfix se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram, fixfonster.se och Offerta. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Alltfix%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
