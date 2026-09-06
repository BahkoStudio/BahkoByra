import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './golvvision.module.css';

/* ===========================================================================
   GOLVVISION STOCKHOLM AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/golvvisionstockholm · Älvsjö, Stockholm · har hemsida
   (golvvision.se, WordPress) — förslaget är en förbättring, inte en första sida.

   FÖRSTA DEMON PÅ MODULERNA (Mathias spec 2026-09-06): lager-hero utan
   rubrik med genomskinlig header som tonar in vid skroll, Varför oss som
   film + punkter, recensioner, sociala. Ny mall-kanon.

   Bärande idé: golvet blir aldrig bättre än det som ligger under. Firmans egen
   sajt säger "från underarbete till färdigt ytskikt" och "vikten av noggrant
   underarbete" — avjämningen ÄR deras argument. Varför oss-filmen visar den.

   VERIFIERAT (och därmed allt vi får skriva) — källa golvvision.se 2026-09-06
   om inget annat sägs:
   Firmanamn "Golvvision Stockholm AB" · adress Varuvägen 15, 125 30 Älvsjö ·
   telefon 073-391 52 17 · e-post info@golvvision.se · tjänster ordagrant:
   mattläggning, mattläggning (våtrum), golvläggning, golvslipning,
   golvavjämning, fallspackling, flytspackling, plattsättning · kunder:
   byggföretag, arkitekter, inredningsdesigners och privatpersoner ·
   arbetsområde Stockholm; sajten nämner Sollentuna, Lidingö, Bromma ·
   sajten uppger GVK, ID06, BKR och Byggföretagen · tre kundomdömen ordagrant
   från sajtens "Nöjda kunder" (Birgitta/Sollentuna, Cecilia/Lidingö,
   Peter/Bromma) · Instagram @golvvisionstockholm: 147 inlägg, 802 följare,
   profilnamn "GOLVVISION STOCKHOLM AB", bio "Mattläggning/Plattsättning/
   Golvavjämning/Parkett · Baserade i Älvsjö med Storstockholm och omnejd som
   arbetsområde" (Mathias skärmdump 2026-09-06) · logotypen är deras egen
   (ram-wordmark, hämtad från golvvision.se, inverterad till vit för mörk
   canvas — samma märke, bara vit).

   Siffrorna i statsraden — grundat 2020, +3300 avslutade projekt, +15
   anställda, +23 MSEK — står på golvvision.se (Mathias skärmdump 2026-09-06;
   textläsningen såg fälten tomma eftersom de animeras med JS där).

   INTE verifierat, och finns därför inte på sidan: org.nr, garantier,
   ledtider, priser, Google-betyg (Mathias: inga Google-recensioner finns). Sajten länkar till Instagram-handlet golvvisionsthlm, skärmdumpen
   visar golvvisionstockholm — vi använder det Mathias verifierat och flaggar.

   RECENSIONSMODULEN: Mathias bad om ett exempel eftersom Google-recensioner
   saknas. Vi fann tre RIKTIGA omdömen på firmans egen sajt och använder dem i
   stället, med källan utskriven. Stjärnorna följer sajtens egen presentation
   (fem stjärnor per omdöme). Inget samlat betyg, inget antal — det finns inte.

   PLATSHÅLLARE / FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se. Kundens e-post är verifierad
     och står i kontaktkortet, men demoformuläret ska inte landa i deras
     inkorg oanmält.
   - Galleriet blandar genererade illustrationer (kontorslokal före/efter,
     mattskarv) och lånade parkettbilder ur biblioteket. Märkt en gång.
   - Sociala-rutnätet är deras EGNA tre foton från golvvision.se (bilen,
     mattskärning, avjämning). Inte platshållare.
   - Deras sajts Instagram-flöde är trasigt: de signerade bildlänkarna i
     sidans cache gick ut i augusti 2026 och flödet visar tomma rutor.
     Säljargument, inte något vi bygger här.
   =========================================================================== */

const display = Archivo({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--gv-display',
});

const displayKursiv = Archivo({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--gv-display-kursiv',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--gv-ui',
});

export const metadata = {
  title: 'Golvvision Stockholm AB — golvavjämning, mattläggning och plattsättning i Stockholm',
  description:
    'Golvavjämning, mattläggning, plattsättning och parkett i Stockholm. Golvet blir aldrig bättre än det som ligger under — därför börjar vi med underarbetet. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Verifierade uppgifter från golvvision.se. */
const TEL = '073-391 52 17';
const TEL_HREF = 'tel:+46733915217';
const EPOST = 'info@golvvision.se';
const ADRESS = 'Varuvägen 15, 125 30 Älvsjö';
const IG = 'https://www.instagram.com/golvvisionstockholm/';

/* Demoformuläret postar till Bahko Byrå. Kundens adress är verifierad och
   visas i kontaktkortet — men ett demoformulär ska inte landa hos dem oanmält.
   I den skarpa sajten byts action mot info@golvvision.se. */
const FORM_ACTION =
  'mailto:mathias@bahkobyra.se?subject=Golvvision%20Stockholm%20-%20f%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra måttsatta linjeritningar i golvets eget språk: sektioner, lager,
   skarvar. Bara <path> — CSS-regeln som sätter vector-effect träffar path. */
const RITNINGAR = {
  avjamning: (
    <>
      <path d="M12 84h176" />
      <path d="M12 84l14-6 18 8 22-10 20 6 24-8 18 6 22-8 18 6 20-4" />
      <path d="M12 62h176" />
      <path d="M12 62v22M188 62v22" />
      <path d="M12 104h176M12 100v8M188 100v8" />
    </>
  ),
  matta: (
    <>
      <path d="M14 88h172" />
      <path d="M14 88v-8h100v8" />
      <path d="M114 80a18 18 0 0 1 36 0a18 18 0 0 1-36 0" />
      <path d="M114 80h-6" />
      <path d="M14 104h172M14 100v8M186 100v8" />
    </>
  ),
  platt: (
    <>
      <path d="M22 26h156v72H22z" />
      <path d="M74 26v72M126 26v72" />
      <path d="M22 50h156M22 74h156" />
      <path d="M100 14h0M60 14h80M60 10v8M140 10v8" />
      <path d="M22 110h156M22 106v8M178 106v8" />
    </>
  ),
  parkett: (
    <>
      <path d="M20 40l40-24 40 24-40 24z" />
      <path d="M60 64l40-24 40 24-40 24z" />
      <path d="M100 40l40-24 40 24-40 24z" />
      <path d="M20 88h160" />
      <path d="M20 104h160M20 100v8M180 100v8" />
    </>
  ),
};

/* Fyra kort, alla inom det verifierade: tjänsterna står ordagrant på sajten. */
const TJANSTER = [
  {
    id: 'avjamning',
    ritning: 'avjamning',
    namn: 'Golvavjämning',
    text:
      'Flytspackling och fallspackling som gör plattan jämn innan något läggs på den. Det är steget ingen ser efteråt, och det steget som avgör om golvet håller sig plant.',
    punkter: ['Flytspackling', 'Fallspackling i våtrum', 'Underarbete inför alla ytskikt'],
  },
  {
    id: 'matta',
    ritning: 'matta',
    namn: 'Mattläggning',
    text:
      'Heltäckningsmatta, linoleum, vinyl och våtrumsmatta. Skarvarna är det som syns om det görs slarvigt, och det som ingen lägger märke till när det görs rätt.',
    punkter: ['Heltäckningsmatta och linoleum', 'Vinyl och plastmatta', 'Våtrumsmatta'],
  },
  {
    id: 'platt',
    ritning: 'platt',
    namn: 'Plattsättning',
    text:
      'Kakel och klinker för kök, badrum och offentliga ytor. Fallet mot brunnen sätts i spacklet innan första plattan, inte i fogen efteråt.',
    punkter: ['Kakel och klinker', 'Badrum och våtrum', 'Entréer och trapphus'],
  },
  {
    id: 'parkett',
    ritning: 'parkett',
    namn: 'Parkett och golvslipning',
    text:
      'Nytt trägolv, eller slipning och ytbehandling av det som redan ligger. Räcker det med en slipning säger vi det, även när ett nytt golv hade gett oss mer betalt.',
    punkter: ['Golvläggning', 'Golvslipning', 'Fiskben och stav'],
  },
];

const STEGRITNINGAR = {
  matning: (
    <>
      <path d="M14 74h172v22H14z" />
      <path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" />
      <path d="M14 56h172M14 50v12M186 50v12" />
      <path d="M60 30h80" />
    </>
  ),
  offert: (
    <>
      <path d="M28 18h144v84H28z" />
      <path d="M44 38h64M44 52h96M44 66h48" />
      <path d="M120 60h36v30h-36z" />
      <path d="M28 110h144M28 106v8M172 106v8" />
    </>
  ),
  underarbete: (
    <>
      <path d="M14 92h172" />
      <path d="M40 92h120v-10H40z" />
      <path d="M40 82h120v-10H40z" />
      <path d="M78 72V52h44v20M90 52V38h20v14" />
      <path d="M14 106h172M14 102v8M186 102v8" />
    </>
  ),
  laggning: (
    <>
      <path d="M16 90h168" />
      <path d="M16 90v-8h120v8" />
      <path d="M136 82a14 14 0 0 1 28 0a14 14 0 0 1-28 0" />
      <path d="M40 82v-30M40 52h60" />
      <path d="M16 104h168M16 100v8M184 100v8" />
    </>
  ),
  genomgang: (
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
    namn: 'Kostnadsfri mätning',
    ritning: 'matning',
    text:
      'Vi kommer ut, mäter ytan och tittar på underlaget. Du får höra vad som ligger under, vad det tål och vad som behöver göras innan ett golv kan läggas.',
  },
  {
    nr: '2',
    namn: 'Offert med fast pris',
    ritning: 'offert',
    text:
      'Priset sätts när vi har sett underlaget, och det står fast. Det som brukar bli dyrt i ett golvjobb är sällan golvet: det är spacklet som ingen räknade på.',
  },
  {
    nr: '3',
    namn: 'Underarbetet',
    ritning: 'underarbete',
    text:
      'Avjämning, fall och torktid. Det tar sin tid, och vi kortar den inte. Ett golv som läggs på ett spackel som inte torkat blir ett golv som släpper.',
  },
  {
    nr: '4',
    namn: 'Läggningen',
    ritning: 'laggning',
    text:
      'Matta, platta eller parkett läggs på ett underlag som är plant. Skarvar och sockellinjer avslutas samma dag som ytan är klar, inte veckan efter.',
  },
  {
    nr: '5',
    namn: 'Genomgång',
    ritning: 'genomgang',
    text:
      'Vi går igenom golvet tillsammans innan vi lämnar. Sitter en skarv fel justerar vi den då, medan verktygen fortfarande står kvar.',
  },
];

/* Statsraden. Alla fyra star pa golvvision.se, verifierade via Mathias
   skarmdump 2026-09-06 (textlasningen sag dem tomma: de animeras med JS dar).
   Prefixet ar deras eget. */
const STATS = [
  { tal: 2020, prefix: '', etikett: 'Grundat' },
  { tal: 3300, prefix: '+', etikett: 'Avslutade projekt' },
  { tal: 15, prefix: '+', etikett: 'Anställda' },
  { tal: 23, prefix: '+', etikett: 'MSEK' },
];

/* Varför oss: max fyra punkter, alla inom det verifierade. Riskreverseringen
   (att avstå försäljning) bor här. */
const VARFOR = [
  'Underarbetet först. Golvet blir aldrig jämnare än plattan under det.',
  'Byggföretag, arkitekter och privatpersoner: samma noggrannhet i alla tre.',
  'GVK, ID06, BKR och Byggföretagen, enligt vår egen redovisning.',
  'Räcker det med en slipning säger vi det. Även när ett nytt golv hade gett oss mer betalt.',
];

/* Tre riktiga omdömen, ordagrant från golvvision.se ("Nöjda kunder"). Namn
   och ort som de står där. Ingen Google-koppling finns — därför inget betyg
   och inget antal, bara omdömena och källan. */
const OMDOMEN = [
  {
    namn: 'Birgitta',
    ort: 'Sollentuna',
    text: 'Jag är väldigt nöjd med resultatet av mitt nya golv i köket. Från offert till utfört arbete så gick det hela väldigt smidigt och snabbt!',
  },
  {
    namn: 'Cecilia',
    ort: 'Lidingö',
    text: 'Golvvision slipade vårt parkettgolv inför att vi flyttade in i vår nya lägenhet. Det gick snabbt & vi fick det precis som vi önskade.',
  },
  {
    namn: 'Peter',
    ort: 'Bromma',
    text: 'Vi fick hjälp av Golvvision att lägga in heltäckningsmatta i vår nyrenoverade villa ute i Bromma.',
  },
];

const FRAGOR = [
  {
    q: 'Vad kostar ett nytt golv?',
    a: 'Det avgörs av ytan, av vilket golv du vill ha och av hur underlaget ser ut. Därför börjar vi med en mätning innan någon siffra sätts. Mätningen kostar ingenting.',
  },
  {
    q: 'Varför måste golvet spacklas först?',
    a: 'För att golvet du lägger ovanpå tar formen av det som ligger under. En ojämn platta ger en matta som buktar och en parkett som knarrar. Avjämningen är det som gör att ytan blir plan, och stannar plan.',
  },
  {
    q: 'Hur vet jag att priset inte drar iväg?',
    a: 'Priset sätts efter mätningen, när vi har sett underlaget, och står fast. Hittar vi något oväntat under det gamla golvet ringer vi och säger det innan vi gör något åt det.',
  },
  {
    q: 'Hur lång tid tar det?',
    a: 'Det beror på ytan och på torktiden för spacklet, och den kortar vi inte. Vi säger vad som gäller just ditt golv när vi har sett det, och lovar ingen tid vi inte kan hålla.',
  },
  {
    q: 'Kan ni lägga golv i badrum och våtrum?',
    a: 'Ja: våtrumsmatta, fallspackling och plattsättning. Fallet mot brunnen sätts i spacklet innan ytskiktet, det är där ett tätt badrum avgörs.',
  },
  {
    q: 'Tar ni jobb åt byggföretag?',
    a: 'Ja. Byggföretag, arkitekter och inredningsdesigners är en stor del av det vi gör, och det är samma arbete och samma noggrannhet som i en privat bostad.',
  },
  {
    q: 'Kan ni slipa i stället för att byta?',
    a: 'Ofta. Är träet friskt och tjockt nog är en slipning och ny ytbehandling både billigare och snabbare än ett byte. Vi säger vilket som gäller ditt golv.',
  },
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Stockholm med omnejd, utgående från Älvsjö. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.',
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

/* Googles G i fyra farger — presentationen ska lasas som Google-recensioner
   (Mathias 2026-09-06). Markt sager var betyget kommer att sta, inte att det
   redan finns dar: inget samlat betyg, inget antal. */
const GoogleG = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" />
    <path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function GolvvisionDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      {/* ---------- header ---------- */}
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandTxt}>
              <b>Golvvision</b>
              <i>Stockholm AB</i>
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

      {/* ---------- 1. lager-hero ----------
          Lagret ar sidans forsta vy: logotyp, tva tjanster, ort, knapparna.
          Ingen rubrik, ingen slogan. Filmen (FPV genom en fardig lokal) ligger
          bakom lagret fran start. Headern ar genomskinlig nar sidan oppnas och
          far sin bakgrund forst nar besokaren borjar skrolla (CSS, se .hdr). */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video
            className={styles.heroLiggande}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/golvvision/media/poster-hero.jpg"
          >
            <source src="/golvvision/media/video-hero-fpv-mattplattor.mp4" type="video/mp4" />
          </video>
          <video
            className={styles.heroStaende}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/golvvision/media/poster-hero-mobil.jpg"
          >
            <source src="/golvvision/media/video-hero-fpv-mattplattor-mobil.mp4" type="video/mp4" />
          </video>
        </figure>

        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            {/* h1 omsluter logotypen: heron har ingen rubrik, sidan maste ha en. */}
            <h1 className={styles.heroLogo}>
              <Image
                src="/golvvision/media/logo-golvvision-vit.png"
                alt="Golvvision Stockholm AB"
                width={718}
                height={718}
                priority
              />
            </h1>
            <p className={styles.heroTjanster}>Golvavjämning · Mattläggning</p>
            <p className={styles.heroOrt}>Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">
                Boka kostnadsfri mätning
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- tjänste-tejpen ---------- */}
      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Golvavjämning</span>
              <span>Flytspackling och fallspackling</span>
              <span>Mattläggning</span>
              <span>Våtrumsmatta</span>
              <span>Plattsättning</span>
              <span>Parkett och golvläggning</span>
              <span>Golvslipning</span>
              <span>Stockholm med omnejd</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- statsrad ----------
          Siffrorna star pa golvvision.se (verifierat via Mathias skarmdump
          2026-09-06; var textlasning sag dem tomma eftersom de animeras med
          JS dar). Har raknas de upp vid skroll med ren CSS; utan stod visas
          den statiska siffran. */}
      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Golvvision i siffror">
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

      {/* ---------- förvandlingen ----------
          Barande iden bor har, eftersom heron inte langre har nagon rubrik. */}
      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              Golvet blir aldrig bättre <em>än det som ligger under.</em>
            </h2>
          </div>

          <div className={styles.forvandling}>
            <figure>
              <Image
                src="/golvvision/media/galleri-fore-betongplatta.jpg"
                alt="Tom kontorslokal med sprucken betongplatta, limrester och kritlinje före arbetet"
                width={1200}
                height={1200}
              />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/golvvision/media/galleri-efter-mattplattor.jpg"
                alt="Samma lokal med avjämnat golv och nylagda grå mattplattor"
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
                src="/golvvision/media/galleri-makro-mattskarv.jpg"
                alt="Närbild på skarven mellan två mattplattor, tät och rak"
                width={1200}
                height={1200}
              />
              <figcaption>Skarven som inte syns.</figcaption>
            </figure>
            <figure>
              <Image
                src="/golvvision/media/galleri-fiskbensparkett.jpg"
                alt="Fiskbensparkett i ek lagd i ett ljust rum"
                width={896}
                height={1200}
              />
              <figcaption>Fiskbensparkett i ek.</figcaption>
            </figure>
            <figure>
              <Image
                src="/golvvision/media/galleri-rum-nytt-ekgolv.jpg"
                alt="Rum med nylagt ekgolv"
                width={1200}
                height={678}
              />
              <figcaption>Nylagt ekgolv.</figcaption>
            </figure>
            <figure>
              <Image
                src="/golvvision/media/galleri-adringen.jpg"
                alt="Närbild på ådringen i ett nyslipat trägolv"
                width={1200}
                height={678}
              />
              <figcaption>Ådringen efter slipning.</figcaption>
            </figure>
          </div>
          <p className={styles.forvandlingNot}>
            Illustrationsbilder — byts mot era egna projektfoton.
          </p>
        </div>
      </section>

      {/* ---------- tjänster ---------- */}
      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Från underarbete <em>till färdigt ytskikt</em>
            </h2>
            <p className={styles.sekLead}>
              Vi gör hela vägen: plattan som ska bli plan, och mattan, plattan eller parketten som
              ska ligga på den. Det är samma firma i båda stegen, så ingen kan skylla på den andre.
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
              Fem steg, och det tredje <em>är det viktigaste</em>
            </h2>
            <p className={styles.sekLead}>
              Det börjar med en mätning som inte kostar något, och slutar med en genomgång där du
              får säga om något sitter fel.
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

      {/* ---------- 2. varför oss: film + punkter ----------
          Filmen visar avjamningsmassan som flyter over den spruckna plattan —
          arbetet, inte en crossfade. Ingen musik: loopen ar mutad. */}
      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Varför oss</p>
            <h2 className={styles.h2}>
              Det som <em>ingen ser efteråt</em>
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
                poster="/golvvision/media/poster-varfor.jpg"
                aria-label="Avjämningsmassa som flyter ut över en sprucken betongplatta och gör den plan"
              >
                <source src="/golvvision/media/video-varfor-avjamning.mp4" type="video/mp4" />
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

      {/* ---------- 3. recensioner ----------
          Tre riktiga omdomen fran golvvision.se. Inget samlat Google-betyg:
          det finns inte, och vi hittar inte pa det. */}
      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Omdömen</p>
            <h2 className={styles.h2}>Vad kunderna säger</h2>
            <p className={styles.googleRad}>
              <GoogleG className={styles.googleG} />
              <span>Google-recensioner</span>
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
                    <span>{o.ort}</span>
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
              Omdömen från golvvision.se. Google-betyget kopplas in här när profilen finns.
            </p>
            <a
              className={`${styles.btn} ${styles.btnMork}`}
              href="https://www.google.com/search?q=Golvvision+Stockholm+AB"
              target="_blank"
              rel="noopener"
            >
              Se alla recensioner
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 4. sociala medier ----------
          Bara Instagram: ingen Facebook-profil har hittats, sa ingen ikon.
          Rutnatet ar deras EGNA tre foton fran golvvision.se. */}
      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Golvvision på Instagram">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
            </a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/golvvision/media/sociala-bilen-och-teamet.jpg"
                  alt="Golvvisions firmabil med teamet vid sidan"
                  width={1200}
                  height={1200}
                />
              </a>
            </figure>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/golvvision/media/sociala-mattskarning.jpg"
                  alt="Hand som skär en plastmatta med mattkniv"
                  width={1200}
                  height={1200}
                />
              </a>
            </figure>
            <figure>
              <a href={IG} target="_blank" rel="noopener">
                <Image
                  src="/golvvision/media/sociala-avjamning-blandare.jpg"
                  alt="Golvläggare i Golvvision-jacka blandar avjämningsmassa"
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
              Pengar och risk först, det praktiska sedan — frågorna kommer oftast i den
              ordningen. Gäller det just ditt golv är telefonen snabbare än en sida.
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
              <p>Ring och fråga rakt ut. Vi säger vad som gäller just ditt golv.</p>
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
                Ska golvet bytas, eller bara bli plant?
                <br />
                <em>Börja med mätningen.</em>
              </h2>
              <p className={styles.sekLead}>
                Ring, eller skriv några rader om ytan. Mätningen kostar ingenting, och du får höra
                vad som ligger under innan du bestämmer något.
              </p>

              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}>
                  <span>E-post</span>
                  <b>{EPOST}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Adress</span>
                  <b>{ADRESS}</b>
                </div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener">
                  <span>Instagram</span>
                  <b>@golvvisionstockholm</b>
                </a>
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
                <select name="typ" defaultValue="Golvavjämning">
                  <option>Golvavjämning</option>
                  <option>Mattläggning</option>
                  <option>Plattsättning</option>
                  <option>Parkett eller golvläggning</option>
                  <option>Golvslipning</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om ytan
                <textarea
                  name="meddelande"
                  rows={4}
                  placeholder="Vilket rum eller vilken lokal, ungefärlig yta, vad som ligger där i dag, och när det ska vara klart"
                />
              </label>
              <button className={styles.btn} type="submit">
                Boka kostnadsfri mätning
              </button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Eller ring {TEL}
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om ytan och vad som ligger där i dag — då kan vi ge ett vettigt svar
                redan i första samtalet. Inga massutskick, ingen säljlista.
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

      {/* ---------- footer ---------- */}
      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div>
              <span className={styles.brandTxt}>
                <b>Golvvision Stockholm AB</b>
                <i>Golv, mattor och plattor</i>
              </span>
              <p className={styles.ftrText}>
                Golvavjämning, mattläggning, plattsättning och parkett i Stockholm. Från underarbete
                till färdigt ytskikt.
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
                @golvvisionstockholm
              </a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Golvvision Stockholm AB · {ADRESS}</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ---------- mobilmeny ---------- */}
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

      {/* ---------- popup ---------- */}
      <input
        type="checkbox"
        id="popup-bort"
        className={styles.popupBort}
        aria-hidden="true"
        tabIndex={-1}
      />
      <aside className={styles.popup} aria-label="Kontakta Golvvision">
        <label
          className={styles.popupX}
          htmlFor="popup-bort"
          role="button"
          aria-label="Stäng"
          tabIndex={0}
        >
          ✕
        </label>
        <p className={styles.popupEyebrow}>Buktar golvet?</p>
        <p className={styles.popupTxt}>
          Mätningen kostar ingenting. Du får höra vad som ligger under och vad som krävs för att
          det ska bli plant, innan du bestämmer något.
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

      {/* ---------- Bahko-modalen ---------- */}
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Golvvision se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på golvvision.se och
            Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna
            projektbilder, Instagram-flödet inkopplat och ett formulär som landar i inkorgen? Boka
            ett kostnadsfritt 15-minuterssamtal med Mathias.
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
            href="mailto:mathias@bahkobyra.se?subject=Golvvision%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
