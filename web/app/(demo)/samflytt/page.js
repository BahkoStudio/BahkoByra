import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './samflytt.module.css';

/* ===========================================================================
   SAM FLYTT OCH STÄD AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/sam_flytt_och_stad_ · Tranås (säte) · har hemsida
   (samflytt.se, WordPress) — förslaget är en förbättring, inte en första sida.
   Byggd på golvvision-kanon (modulerna 2026-09-06).

   Bärande idé: en flytt är två jobb — ut med sakerna, och lämna rent efter
   sig — och det är det andra som brukar spricka. Samma firma tar båda, till
   fast pris (deras egen formulering: "Alltid fast pris!").

   VERIFIERAT (och därmed allt vi får skriva):
   Bolagsregistret: "sam flytt & städ AB", org.nr 559428-9448, registrerat
   2023-04-03, Beckhemsvägen 23, 573 42 Tranås · samflytt.se (2026-09-07):
   firmanamn "Sam Flytt och Städ AB", telefon 010-214 66 95 (växel) och
   072-010 32 36, e-post info@samflytt.se, öppet vardagar 07–19, tjänster
   ordagrant: bohagsflytt, företagsflytt, packhjälp, flyttstäd, bärhjälp,
   pianoflytt, transport och tungtransporter, dödsbo, internationell flytt,
   snöröjning · områden ordagrant: Tranås, Mjölby, Nässjö, Eksjö, Aneby,
   Linköping, Motala, Jönköping, Finspång, Boxholm, Stockholm, Helsingborg ·
   sajten uppger trafiktillstånd, ansvarsförsäkring upp till 10 000 000 kr,
   Trygg Hansa, "Alltid fast pris!", "Vi är nöjda först när du är nöjd",
   tagline "Det är enkelt att flytta med oss" · Google-recensioner via
   Trustindex-widgeten på deras sajt: "UTMÄRKT", "Baserat på 137 recensioner",
   tio recensioner med namn, alla fem stjärnor — tre citeras ordagrant ·
   Google-profil: maps.app.goo.gl/NLpH8nVyAfZxZc3i8 (länkad från sajten) ·
   Facebook: facebook.com/profile.php?id=100083084452666 (länkad från sajten) ·
   Instagram @sam_flytt_och_stad_: 106 inlägg, 313 följare, "Flyttfirma",
   höjdpunkt "Helsingborg" (Mathias skärmdump 2026-09-07) · logotypen är deras
   egen (SAM.png från sajten, 266 px, uppskalad — be om vektor).

   INTE verifierat, och finns därför inte på sidan: antal anställda (registret
   säger 2, ett omdöme nämner 8 — vi skriver inget), RUT-avdrag, priser,
   magasinering, ledtider, garantier. Registret visar en betalningsanmärkning
   (v36 2025) — hör till Mathias pitchunderlag, inte till sidan.

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se; kundens e-post är verifierad
     och står i kontaktkortet.
   - Galleriet är genererade illustrationer (packat rum → tomt och städat,
     nycklar, kök, flyttbil). Märkt en gång. Sociala: ett eget foto från
     sajten + två illustrationer.
   - Logotypen är uppskalad från 266 px och har lätta konturartefakter i
     stor storlek. Be om originalfilen.
   =========================================================================== */

const display = Archivo({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--sf-display',
});

const displayKursiv = Archivo({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--sf-display-kursiv',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--sf-ui',
});

export const metadata = {
  title: 'Sam Flytt och Städ AB — flytt och flyttstäd i Tranås, Helsingborg och Linköping',
  description:
    'Bohagsflytt, företagsflytt, packhjälp och flyttstäd till fast pris. En flytt är två jobb: ut med sakerna och lämna rent. Vi tar båda. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '072-010 32 36';
const TEL_HREF = 'tel:+46720103236';
const VAXEL = '010-214 66 95';
const VAXEL_HREF = 'tel:+46102146695';
const EPOST = 'info@samflytt.se';
const ADRESS = 'Beckhemsvägen 23, 573 42 Tranås';
const IG = 'https://www.instagram.com/sam_flytt_och_stad_/';
const FB = 'https://www.facebook.com/profile.php?id=100083084452666';
const GOOGLE = 'https://maps.app.goo.gl/NLpH8nVyAfZxZc3i8';

const FORM_ACTION =
  'mailto:mathias@bahkobyra.se?subject=Sam%20Flytt%20och%20St%C3%A4d%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Linjeritningar i flyttens eget språk: lådor, bil, städ, piano. Bara <path>. */
const RITNINGAR = {
  lador: (
    <>
      <path d="M40 96V56h56v40z" />
      <path d="M96 96V56h56v40z" />
      <path d="M68 56V24h56v32z" />
      <path d="M40 76h56M96 76h56M68 40h56" />
      <path d="M40 108h112M40 104v8M152 104v8" />
    </>
  ),
  kontor: (
    <>
      <path d="M20 84h160" />
      <path d="M36 84V48h60v36" />
      <path d="M36 48l30-14 30 14" />
      <path d="M110 84V64h44v20M110 74h44" />
      <path d="M20 100h160M20 96v8M180 96v8" />
    </>
  ),
  stad: (
    <>
      <path d="M40 30h120v70H40z" />
      <path d="M100 30v70M40 65h120" />
      <path d="M52 44l14 14M60 44l14 14" />
      <path d="M118 88l8-8 8 8" />
      <path d="M40 112h120M40 108v8M160 108v8" />
    </>
  ),
  piano: (
    <>
      <path d="M40 40h120v52H40z" />
      <path d="M40 72h120" />
      <path d="M52 72v20M76 72v20M100 72v20M124 72v20M148 72v20" />
      <path d="M48 92v10M152 92v10" />
      <path d="M40 112h120M40 108v8M160 108v8" />
    </>
  ),
};

/* Fyra kort, alla ordagrant ur tjänstelistan på samflytt.se. */
const TJANSTER = [
  {
    id: 'bohag',
    ritning: 'lador',
    namn: 'Bohagsflytt',
    text:
      'Hela hemmet, från första lådan till sista. Vi packar om du vill, bär, kör och ställer in där det ska stå. Fast pris innan vi börjar, inte en timräkning efteråt.',
    punkter: ['Packhjälp och bärhjälp', 'Transport med eget trafiktillstånd', 'Fast pris'],
  },
  {
    id: 'foretag',
    ritning: 'kontor',
    namn: 'Företagsflytt',
    text:
      'Kontor, lager och butik, gärna på en helg så verksamheten inte står still. Vi märker, bär och ställer upp så att måndagen börjar på nya adressen.',
    punkter: ['Kontor och lager', 'Helg och kväll', 'Tungtransporter'],
  },
  {
    id: 'stad',
    ritning: 'stad',
    namn: 'Flyttstäd',
    text:
      'Den del av flytten som brukar spricka: städet som ska klara nästa hyresgästs besiktning. Vi städar när vi ändå är där, med samma folk och samma ansvar.',
    punkter: ['Flyttstäd efter bohagsflytt', 'Städ efter dödsbo', 'Kort varsel när det behövs'],
  },
  {
    id: 'piano',
    ritning: 'piano',
    namn: 'Piano och tungt',
    text:
      'Piano, kassaskåp och annat som inte går att bära hur som helst. Rätt utrustning och tillräckligt många händer, så varken trappan eller pianot tar stryk.',
    punkter: ['Pianoflytt', 'Kassaskåp och maskiner', 'Trappor och trånga passager'],
  },
];

const STEGRITNINGAR = {
  offert: (
    <>
      <path d="M28 18h144v84H28z" />
      <path d="M44 38h64M44 52h96M44 66h48" />
      <path d="M120 60h36v30h-36z" />
      <path d="M28 110h144M28 106v8M172 106v8" />
    </>
  ),
  packning: (
    <>
      <path d="M50 96V50h100v46z" />
      <path d="M50 50l50-18 50 18" />
      <path d="M100 32v64" />
      <path d="M50 70h100" />
      <path d="M50 108h100M50 104v8M150 104v8" />
    </>
  ),
  flyttdag: (
    <>
      <path d="M12 88h176" />
      <path d="M40 70h70l8-12h26v20H40z" />
      <path d="M56 70V56h32v14" />
      <path d="M52 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0M128 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0" />
      <path d="M12 104h176M12 100v8M188 100v8" />
    </>
  ),
  stad: (
    <>
      <path d="M40 30h120v70H40z" />
      <path d="M100 30v70M40 65h120" />
      <path d="M52 44l14 14M60 44l14 14" />
      <path d="M40 112h120M40 108v8M160 108v8" />
    </>
  ),
  nycklar: (
    <>
      <path d="M32 20h136v76H32z" />
      <path d="M32 66h136" />
      <path d="M58 40l16 16 32-34" />
      <path d="M54 82h92" />
      <path d="M32 108h136M32 104v8M168 104v8" />
    </>
  ),
};

const STEG = [
  {
    nr: '1',
    namn: 'Kostnadsfri offert',
    ritning: 'offert',
    text:
      'Ring eller skriv, så går vi igenom vad som ska flyttas, varifrån och vart, och om det ska städas efteråt. Du får ett fast pris, och det står fast.',
  },
  {
    nr: '2',
    namn: 'Packning',
    ritning: 'packning',
    text:
      'Packa själv, eller låt oss göra det. Vi kommer med lådor och material och packar rum för rum, märkt så att allt hamnar rätt på andra sidan.',
  },
  {
    nr: '3',
    namn: 'Flyttdagen',
    ritning: 'flyttdag',
    text:
      'Vi bär, lastar och kör. Möbler i filtar, lådor i ordning, bilen packad så att inget skaver. På nya adressen ställer vi in där du säger.',
  },
  {
    nr: '4',
    namn: 'Flyttstädet',
    ritning: 'stad',
    text:
      'När sista lådan är ute städar vi den gamla bostaden. Samma firma, samma ansvar, ingen andra leverantör att jaga när det ska vara klart.',
  },
  {
    nr: '5',
    namn: 'Genomgång och nycklar',
    ritning: 'nycklar',
    text:
      'Vi går igenom bostaden tillsammans innan nycklarna lämnas. Är något inte som det ska tar vi det då, inte efter besiktningen.',
  },
];

const STATS = [
  { tal: 2023, prefix: '', etikett: 'Grundat' },
  { tal: 137, prefix: '', etikett: 'Google-recensioner' },
  { tal: 10, prefix: '', etikett: 'MSEK i ansvarsförsäkring' },
  { tal: 12, prefix: '', etikett: 'Orter' },
];

const VARFOR = [
  'Alltid fast pris. Du vet vad flytten kostar innan första lådan lyfts.',
  'Flytt och flyttstäd i samma firma: en kontakt, ett ansvar, en faktura.',
  'Trafiktillstånd och ansvarsförsäkring upp till 10 miljoner kronor.',
  'Behöver ni bara bärhjälp säger vi det. Även när en hel flytt hade gett oss mer betalt.',
];

/* Tre av de tio Google-recensioner som visas via Trustindex på samflytt.se,
   ordagrant. Alla fem stjärnor där. */
const OMDOMEN = [
  {
    namn: 'Ulf Fischerström',
    text: 'Sams firma hjälpte mig när jag behövde det som mest. De flyttade och städade till stor belåtenhet. Jag kan verkligen rekommendera dem!!!!',
  },
  {
    namn: 'Stina Holmesson',
    text: 'Jag är jättenöjd. De kom med kort varsel då mitt andra flyttstäd blev sjuka. Bra städat, trevlig personal och flexibelt! Rekommenderar starkt! :)',
  },
  {
    namn: 'Mike Jensen',
    text: 'Vi ringde på en söndag och bad om stöd om städ och dom ringde direkt. Kom hit hjälpte oss löste våra problem Jag kan rekommendera dem till andra som behöver akut hjälp Är väldigt nöjd🙏',
  },
];

const FRAGOR = [
  {
    q: 'Vad kostar en flytt?',
    a: 'Det beror på hur mycket som ska flyttas, hur långt, och om det ska packas och städas. Därför börjar vi med en offert, och den är kostnadsfri. Priset du får är fast.',
  },
  {
    q: 'Vad betyder fast pris?',
    a: 'Att priset i offerten är det du betalar. Tar flytten längre tid än vi räknat är det vår sak, inte din. Ändrar du jobbet, till exempel lägger till städ, får du ett nytt fast pris innan vi gör det.',
  },
  {
    q: 'Är ni försäkrade?',
    a: 'Vi har trafiktillstånd och ansvarsförsäkring upp till 10 miljoner kronor. Skulle något gå sönder under flytten är det försäkrat, och vi säger det rakt ut om det händer.',
  },
  {
    q: 'Gör ni flyttstäd också?',
    a: 'Ja, och helst i samma uppdrag som flytten. Då är det samma personal som vet hur bostaden såg ut när sakerna stod kvar, och ett enda ansvar om besiktningen har synpunkter.',
  },
  {
    q: 'Kan ni komma med kort varsel?',
    a: 'Ofta. Säg vad det gäller och när, så säger vi rakt ut om vi kan. Vi lovar ingen tid vi inte kan hålla.',
  },
  {
    q: 'Flyttar ni piano?',
    a: 'Ja. Piano, kassaskåp och annat tungt kräver rätt utrustning och tillräckligt många händer. Säg vad det är och vilken våning, så planerar vi det.',
  },
  {
    q: 'Tar ni hand om dödsbo?',
    a: 'Ja. Vi tömmer, sorterar det som ska sparas från det som ska bort, och städar efteråt. Vi går igenom med dig först vad som gäller.',
  },
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Tranås, Mjölby, Nässjö, Eksjö, Aneby, Linköping, Motala, Jönköping, Finspång, Boxholm, Stockholm och Helsingborg. Ligger flytten någon annanstans får du säga var, så säger vi om vi kan ta den.',
  },
];

const Stjarnor = () => (
  <span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" key={i}>
        <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" />
      </svg>
    ))}
  </span>
);

const GoogleG = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" />
    <path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function SamflyttDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandTxt}>
              <b>Sam Flytt och Städ</b>
              <i>Tranås · Helsingborg</i>
            </span>
          </a>
          <nav className={styles.nav}>
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>
                {l.txt}
              </a>
            ))}
          </nav>
          <a className={styles.mobilNavKnapp} href="#meny">
            <span>Meny</span>
            <span className={styles.mobilNavIkon} aria-hidden="true" />
          </a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.hdrTelNr} aria-hidden="true">
              {TEL}
            </span>
            <span className={styles.hdrTelKort} aria-hidden="true">
              Ring
            </span>
          </a>
        </div>
      </header>

      {/* ---------- 1. lager-hero ---------- */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video
            className={styles.heroLiggande}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/samflytt/media/poster-hero.jpg"
          >
            <source src="/samflytt/media/video-hero-fpv-packat.mp4" type="video/mp4" />
          </video>
          <video
            className={styles.heroStaende}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/samflytt/media/poster-hero-mobil.jpg"
          >
            <source src="/samflytt/media/video-hero-fpv-packat-mobil.mp4" type="video/mp4" />
          </video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}>
              <Image
                src="/samflytt/media/logo-sam-flytt.png"
                alt="Sam Flytt och Städ AB"
                width={1400}
                height={636}
                priority
              />
            </h1>
            <p className={styles.heroTjanster}>Flytt · Flyttstäd</p>
            <p className={styles.heroOrt}>Tranås & Helsingborg</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">
                Begär kostnadsfri offert
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Bohagsflytt</span>
              <span>Företagsflytt</span>
              <span>Packhjälp</span>
              <span>Flyttstäd</span>
              <span>Bärhjälp</span>
              <span>Pianoflytt</span>
              <span>Dödsbo</span>
              <span>Alltid fast pris</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- statsrad ----------
          Alla fyra verifierade: registreringsar (bolagsregistret), 137
          Google-recensioner (Trustindex pa deras sajt), 10 MSEK
          ansvarsforsakring (deras egen uppgift), 12 orter (deras lista). */}
      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Sam Flytt och Städ i siffror">
          {STATS.map((s) => (
            <div className={styles.stat} role="listitem" key={s.etikett}>
              <b>
                {s.prefix}
                <span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" />
                <span className={styles.statStatisk}>{s.tal}</span>
              </b>
              <span>{s.etikett}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- förvandlingen ---------- */}
      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              En flytt är två jobb. <em>Vi tar båda.</em>
            </h2>
          </div>
          <div className={styles.forvandling}>
            <figure>
              <Image
                src="/samflytt/media/galleri-fore-packat-vardagsrum.jpg"
                alt="Vardagsrum fullt av packade flyttlådor och plastade möbler på flyttdagens morgon"
                width={1200}
                height={1200}
              />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/samflytt/media/galleri-efter-tomt-stadat.jpg"
                alt="Samma vardagsrum tomt och flyttstädat, golvet blankt och fönstret putsat"
                width={1200}
                height={1200}
              />
              <figcaption>
                <b>Efter</b>
              </figcaption>
            </figure>
          </div>
          <div className={styles.galleri}>
            <figure>
              <Image
                src="/samflytt/media/galleri-makro-nycklar.jpg"
                alt="Nyckelknippa på en nytorkad köksbänk i en tom lägenhet"
                width={1200}
                height={1200}
              />
              <figcaption>Nycklarna, när allt är klart.</figcaption>
            </figure>
            <figure>
              <Image
                src="/samflytt/media/galleri-flyttstad-kok.jpg"
                alt="Nystädat kök med tomma skåp och blank bänk"
                width={1200}
                height={1200}
              />
              <figcaption>Flyttstäd som klarar besiktningen.</figcaption>
            </figure>
            <figure>
              <Image
                src="/samflytt/media/galleri-flyttbil-lastad.jpg"
                alt="Flyttbilens lastutrymme med möbler i filtar och lådor spända med band"
                width={1200}
                height={1200}
              />
              <figcaption>Packat så att inget skaver.</figcaption>
            </figure>
            <figure>
              <Image
                src="/samflytt/media/galleri-sackkarra-dorr.jpg"
                alt="Säckkärra med flyttlådor i en lägenhetsdörr"
                width={1200}
                height={1200}
              />
              <figcaption>Lådorna på väg ut.</figcaption>
            </figure>
          </div>
          <p className={styles.forvandlingNot}>
            Illustrationsbilder — byts mot era egna bilder från flyttarna.
          </p>
        </div>
      </section>

      {/* ---------- tjänster ---------- */}
      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Från första lådan <em>till nycklarna</em>
            </h2>
            <p className={styles.sekLead}>
              Packa, bära, köra, ställa in och städa efter sig. Det är samma firma hela vägen, så
              det finns ingen andra leverantör att vänta på när flytten ska vara klar.
            </p>
          </div>
          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.id}>
                <svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">
                  {RITNINGAR[t.ritning]}
                </svg>
                <h3>{t.namn}</h3>
                <p>{t.text}</p>
                <ul>
                  {t.punkter.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Så går det till</p>
            <h2 className={styles.h2}>
              Fem steg, och priset sätts <em>i det första</em>
            </h2>
            <p className={styles.sekLead}>
              Det börjar med en offert som inte kostar något, och slutar med att vi går igenom
              bostaden tillsammans innan nycklarna lämnas.
            </p>
          </div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => (
              <input
                type="radio"
                name="steg"
                id={`steg-${s.nr}`}
                className={styles.stegRadio}
                defaultChecked={i === 0}
                key={`r-${s.nr}`}
              />
            ))}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">
              {STEG.map((s) => (
                <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}>
                  <span>{s.namn}</span>
                </label>
              ))}
            </div>
            <div className={styles.stegKort}>
              {STEG.map((s) => (
                <article className={styles.stegPanel} key={`p-${s.nr}`}>
                  <svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">
                    {STEGRITNINGAR[s.ritning]}
                  </svg>
                  <div>
                    <h3>{s.namn}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. varför oss ---------- */}
      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Varför oss</p>
            <h2 className={styles.h2}>
              Det ni lämnar efter er <em>är rent</em>
            </h2>
          </div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/samflytt/media/poster-varfor.jpg"
                aria-label="Kameran glider genom den tömda och flyttstädade lägenheten"
              >
                <source src="/samflytt/media/video-varfor-tomt-stadat.mp4" type="video/mp4" />
              </video>
            </figure>
            <ul className={styles.varforPunkter}>
              {VARFOR.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 3. omdömen (Google, riktiga) ---------- */}
      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Omdömen</p>
            <h2 className={styles.h2}>Vad kunderna säger</h2>
            <p className={styles.googleRad}>
              <GoogleG className={styles.googleG} />
              <span>Utmärkt · baserat på 137 Google-recensioner</span>
            </p>
          </div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o) => (
              <figure className={styles.recension} key={o.namn}>
                <div className={styles.recensionHuvud}>
                  <span className={styles.avatar} aria-hidden="true">
                    {o.namn[0]}
                  </span>
                  <figcaption>
                    <b>{o.namn}</b>
                    <span>Google</span>
                  </figcaption>
                  <GoogleG className={styles.recensionG} />
                </div>
                <Stjarnor />
                <blockquote>{o.text}</blockquote>
              </figure>
            ))}
          </div>
          <div className={styles.recensionerFot}>
            <p className={styles.recensionerNot}>
              Recensioner från Google, som de visas på samflytt.se.
            </p>
            <a className={`${styles.btn} ${styles.btnMork}`} href={GOOGLE} target="_blank" rel="noopener">
              Se alla recensioner
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 4. sociala ---------- */}
      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Sam Flytt och Städ på Instagram">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Sam Flytt och Städ på Facebook">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/samflytt/media/sociala-barhjalp-bord.jpg"
                  alt="Flyttare i Sam-tröja bär ett bord in genom en villadörr"
                  width={1200}
                  height={1200}
                />
              </a>
            </figure>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/samflytt/media/sociala-flyttbil-ramp.jpg"
                  alt="Flyttbil med nedfälld ramp och lådor i lastutrymmet"
                  width={1200}
                  height={1200}
                />
              </a>
            </figure>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/samflytt/media/sociala-piano-trapphus.jpg"
                  alt="Piano i flyttfiltar på en pianovagn i ett trapphus"
                  width={1200}
                  height={1200}
                />
              </a>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- frågor ---------- */}
      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>Det du brukar fråga först</h2>
            <p className={styles.sekLead}>
              Pengar och risk först, det praktiska sedan. Gäller det just din flytt är telefonen
              snabbare än en sida.
            </p>
          </div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>
              {FRAGOR.map((f) => (
                <details className={styles.fraga} name="faq" key={f.q}>
                  <summary>
                    {f.q}
                    <span className={styles.fragaIkon} aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <aside className={styles.fragaKort}>
              <h3>Hittar du inte svaret?</h3>
              <p>Ring och fråga rakt ut. Vi svarar vardagar 07–19.</p>
              <a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- kontakt ---------- */}
      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>
                Ska ni flytta?
                <br />
                <em>Börja med offerten.</em>
              </h2>
              <p className={styles.sekLead}>
                Ring, eller skriv några rader om flytten. Offerten kostar ingenting, och priset du
                får står fast.
              </p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Mobil</span>
                  <b>{TEL}</b>
                </a>
                <a className={styles.kontaktRad} href={VAXEL_HREF}>
                  <span>Växel</span>
                  <b>{VAXEL}</b>
                </a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}>
                  <span>E-post</span>
                  <b>{EPOST}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Adress</span>
                  <b>{ADRESS}</b>
                </div>
                <div className={styles.kontaktRad}>
                  <span>Öppet</span>
                  <b>Vardagar 07–19</b>
                </div>
              </div>
            </div>
            <form
              className={styles.form}
              action={FORM_ACTION}
              method="post"
              encType="text/plain"
              aria-describedby="form-not"
            >
              <label>
                Namn
                <input type="text" name="namn" autoComplete="name" required />
              </label>
              <label>
                Telefon
                <input type="tel" name="telefon" autoComplete="tel" required />
              </label>
              <label>
                E-post (valfritt)
                <input type="email" name="epost" autoComplete="email" />
              </label>
              <label>
                Vad handlar det om?
                <select name="typ" defaultValue="Bohagsflytt">
                  <option>Bohagsflytt</option>
                  <option>Företagsflytt</option>
                  <option>Flyttstäd</option>
                  <option>Piano eller tungt</option>
                  <option>Dödsbo</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om flytten
                <textarea
                  name="meddelande"
                  rows={4}
                  placeholder="Varifrån och vart, ungefärlig storlek på bostaden, vilken våning, om det ska packas och städas, och när"
                />
              </label>
              <button className={styles.btn} type="submit">
                Begär kostnadsfri offert
              </button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Eller ring {TEL}
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om flytten — då kan vi ge ett fast pris redan i första samtalet. Inga
                massutskick, ingen säljlista.
              </p>
              <p className={styles.formNot}>
                Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna
                till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er
                egen inkorg.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div>
              <span className={styles.brandTxt}>
                <b>Sam Flytt och Städ AB</b>
                <i>Flytt och flyttstäd</i>
              </span>
              <p className={styles.ftrText}>
                Bohagsflytt, företagsflytt, packhjälp och flyttstäd till fast pris. Tranås,
                Helsingborg, Linköping och Jönköping med omnejd.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => (
                <a href={l.href} key={l.href}>
                  {l.txt}
                </a>
              ))}
              <a href={TEL_HREF}>{TEL}</a>
              <a href={`mailto:${EPOST}`}>{EPOST}</a>
              <a href={IG} target="_blank" rel="noopener">
                @sam_flytt_och_stad_
              </a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Sam Flytt och Städ AB · Org.nr 559428-9448 · {ADRESS}</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny">
        <a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={styles.mobilMenyPanel} aria-label="Meny">
          {LANKAR.map((l) => (
            <a href={l.href} key={l.href}>
              {l.txt}
            </a>
          ))}
          <a href="#kontakt">Kontakt</a>
          <a className={styles.mobilMenyStang} href="#stangd">
            Stäng menyn
          </a>
        </nav>
      </div>
      <span className={styles.stangdAnkare} id="stangd" />

      <input
        type="checkbox"
        id="popup-bort"
        className={styles.popupBort}
        aria-hidden="true"
        tabIndex={-1}
      />
      <aside className={styles.popup} aria-label="Kontakta Sam Flytt och Städ">
        <label
          className={styles.popupX}
          htmlFor="popup-bort"
          role="button"
          aria-label="Stäng"
          tabIndex={0}
        >
          ✕
        </label>
        <p className={styles.popupEyebrow}>Flyttdatum spikat?</p>
        <p className={styles.popupTxt}>
          Offerten kostar ingenting och priset står fast. Ring, så säger vi om vi kan ta dagen.
        </p>
        <a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>
          Ring {TEL}
        </a>
        <a className={styles.popupAlt} href="#kontakt">
          Eller skriv några rader →
        </a>
      </aside>

      <a className={styles.demoKnapp} href="#bahko-demo">
        Om det här förslaget
      </a>

      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Sam Flytt och Städ se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på samflytt.se,
            Google och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era
            egna bilder och ett formulär som landar i inkorgen? Boka ett kostnadsfritt
            15-minuterssamtal med Mathias.
          </p>
          <a
            className={styles.modalCta}
            href="https://cal.eu/bahkobyra/15min"
            target="_blank"
            rel="noopener"
          >
            Boka 15 min gratis samtal →
          </a>
          <a
            className={styles.modalAlt}
            href="mailto:mathias@bahkobyra.se?subject=Sam%20Flytt%20och%20St%C3%A4d%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
