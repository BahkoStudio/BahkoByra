import Image from 'next/image';
import { Zilla_Slab, Inter } from 'next/font/google';
import styles from './osterlunds.module.css';

/* ===========================================================================
   ÖSTERLUNDS JORDBYGGNAD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/osterlundsjordbyggnad · Oravais (Oravainen), Österbotten
   Ersätter den tidigare demon på /cloud/osterlunds/, som sålde villamark
   (husgrund, dränering, granitinfart) och därmed låg fel mot vad firman
   själv säger att den gör. Den länken redirectar hit.

   Bärande idé: ett markjobb stannar sällan för att jobbet är svårt — det
   stannar för att någon annan inte kommit än. Vi gräver, spränger och kör
   maskinen själva. Hela sidan argumenterar för den meningen.

   VERIFIERAT (och därmed allt vi får skriva):
   Instagram @osterlundsjordbyggnad · firmans egen bio, ordagrant:
   "#earthmoving #infra #blasting #transport #lowbed" — alltså schakt, infra,
   sprängning, transport och maskintransport på trailer, med firmans egna ord ·
   62 följare, 2 inlägg, ingen hemsida länkad · profilbilden visar en långgrävare
   som gräver dike längs ett infraprojekt · finskt företagsregister:
   "Österlunds Jordbyggnad", Oravainen (Oravais), verksamhetsbeskrivning
   "maarakennustöitä ja maansiirtotöitä" = mark- och jordtransportarbeten.

   INTE verifierat, och finns därför inte på sidan: FO-nummer, grundat år,
   antal maskiner, antal anställda, antal projekt, omdömen, ledtider, priser,
   garantier, försäkringar, sprängkort och behörigheter, exakt arbetsområde,
   och om de arbetar vintertid. Sidan lovar därför ingen tid, ingen siffra och
   ingen behörighet — bara sådant firman själv säger sig göra.

   PLATSHÅLLARE som måste bytas före utskick:
   - Telefonnumret 040 123 4567 är påhittat. Finskt format är valt medvetet
     (firman ligger i Finland), men inget nummer är verifierat.
   - Formuläret går till mathias@bahkobyra.se, inte till kunden. Den gamla
     demons info@osterlundsjordbyggnad.se var en GISSAD adress med fel
     landsdomän och är borttagen.
   - Ingen logotyp har gått att få fram: Instagram-profilbilden är ett foto av
     en grävmaskin, inte ett märke. Headern och sidfoten bär därför ett rent
     ordmärke i sidans display-typsnitt. Be kunden om logotypen.
   - "Oravais med omnejd" — orten är verifierad, radien är det inte.

   Bilderna är illustrationer och märks som det, en gång, under galleriet.
   Ingen sektion heter Våra projekt eller Referenser.
   =========================================================================== */

const display = Zilla_Slab({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--os-display',
});

/* Kursiven ligger i en egen instans och hämtas först när den behövs — den
   används i ett par rubrikord och ska inte belasta första renderingen. */
const displayKursiv = Zilla_Slab({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--os-display-kursiv',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--os-ui',
});

export const metadata = {
  title: 'Österlunds Jordbyggnad — jordbyggnad, sprängning och transport i Oravais',
  description:
    'Schakt, vägbyggen, bergsprängning och maskintransport i Oravais med omnejd. Vi gräver, spränger och kör maskinen själva, så bygget inte står och väntar. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Finskt format, eftersom firman ligger i Oravais. Numret är ändå påhittat —
   se platshållarlistan i toppkommentaren. */
const TEL = '040 123 4567';
const TEL_HREF = 'tel:+358401234567';

/* Ingen backend i förslaget: submit postar fälten som ren text via mailto till
   Bahko Byrå. Noten under knappen säger rakt ut vart det går. Vi har ingen
   verifierad e-postadress till kunden, så vår egen står här — aldrig en gissad.
   Den gamla demon gissade info@osterlundsjordbyggnad.se, med svensk domän på
   ett finskt bolag. */
const FORM_ACTION =
  'mailto:mathias@bahkobyra.se?subject=%C3%96sterlunds%20Jordbyggnad%20-%20f%C3%B6rfr%C3%A5gan';

/* En källa för navigationen: header, mobilmeny och footer läser samma lista. */
const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra måttsatta linjeritningar, en per tjänst, i markarbetets eget språk:
   sektioner och måttlinjer, som på en ritning. De ritar sig själva när kortet
   kommer i vy (stroke-dashoffset + animation-timeline: view()), och står
   färdigritade där stödet saknas — sidan ska vara komplett utan animationen.
   Bara <path>: CSS-regeln som sätter vector-effect träffar path, inte circle,
   och utan den blir linjen hårfin vid nedskalning. */
const RITNINGAR = {
  schakt: (
    <>
      <path d="M10 84h180" />
      <path d="M64 84l14 22h44l14-22" />
      <path d="M78 20h44l-7 26H85z" />
      <path d="M87 46l3 7M100 46v7M113 46l-3 7" />
      <path d="M10 112h180M10 108v8M190 108v8" />
    </>
  ),
  vag: (
    <>
      <path d="M10 78h16M174 78h16" />
      <path d="M46 78l12-16h84l12 16" />
      <path d="M58 62h84" />
      <path d="M26 78l10 14 10-14M154 78l10 14 10-14" />
      <path d="M10 106h180M10 102v8M190 102v8" />
    </>
  ),
  berg: (
    <>
      <path d="M14 96h172" />
      <path d="M40 96V52l16-10 16 12 18-14 18 12 20-8 18 10v42" />
      <path d="M58 46v44M86 48v42M114 42v48M142 48v42" />
      <path d="M96 96l14-8h50l10 8" />
      <path d="M14 110h172M14 106v8M186 106v8" />
    </>
  ),
  lowbed: (
    <>
      <path d="M8 92h184" />
      <path d="M34 74h84l8-14h28v22H34z" />
      <path d="M50 74V60h40v14M62 60V48h20v12" />
      <path d="M46 82a7 7 0 1 0 14 0a7 7 0 1 0-14 0M66 82a7 7 0 1 0 14 0a7 7 0 1 0-14 0M146 82a7 7 0 1 0 14 0a7 7 0 1 0-14 0" />
      <path d="M34 74l-14 10M20 84h14" />
      <path d="M8 106h184M8 102v8M192 102v8" />
    </>
  ),
};

/* Fyra kort. Varje moment står ordagrant i firmans egen Instagram-bio
   (earthmoving, infra, blasting, transport, lowbed) — inget är påhittat. */
const TJANSTER = [
  {
    id: 'schakt',
    ritning: 'schakt',
    namn: 'Schakt och massflyttning',
    text:
      'Grävning för grund, ledning och tomt, och massorna som ska bort eller läggas tillbaka. Det som avgör priset är sällan hålet: det är vad som ligger i det och vart det ska.',
    punkter: [
      'Grundschakt och tomtplanering',
      'Diken och dränering',
      'Massor bort och fyllning tillbaka',
    ],
  },
  {
    id: 'infra',
    ritning: 'vag',
    namn: 'Vägar och infra',
    text:
      'Vägbankar, diken och underbyggnad som ska bära när tjälen släpper. En väg som sätter sig kostar mer att göra om än den kostade att bygga rätt.',
    punkter: ['Vägbankar och underbyggnad', 'Dikning och avrinning', 'Grus- och krossmaterial'],
  },
  {
    id: 'berg',
    ritning: 'berg',
    namn: 'Bergsprängning',
    text:
      'Berget som ligger i vägen för ett schakt stoppar jobbet först när sprängningen ska bokas någon annanstans. Vi gör den biten själva, i samma jobb.',
    punkter: ['Bergsschakt', 'Sprängning i samma entreprenad', 'Krossat berg tillbaka som fyllning'],
  },
  {
    id: 'transport',
    ritning: 'lowbed',
    namn: 'Maskintransport',
    text:
      'Vi kör hit maskinen själva på lowbed. Du behöver inte boka en transportör, och du betalar ingen dag där bygget står stilla för att maskinen är på fel gård.',
    punkter: ['Egen lowbed', 'Maskin till och från platsen', 'Massor och material'],
  },
];

/* En ritning per steg, i samma linjespråk som tjänstekorten, men med egna
   motiv — samma bild två gånger på en sida läser som att vi tog slut. */
const STEGRITNINGAR = {
  platsbesok: (
    <>
      <path d="M14 92h172" />
      <path d="M60 92V34" />
      <path d="M60 34h34l-8 10 8 10H60" />
      <path d="M118 92l18-26 18 26" />
      <path d="M14 106h172M14 102v8M186 102v8" />
    </>
  ),
  massor: (
    <>
      <path d="M18 88h164" />
      <path d="M28 88l26-38 26 38z" />
      <path d="M116 88l22-30 22 30z" />
      <path d="M90 58h20M90 70h20" />
      <path d="M18 104h164M18 100v8M182 100v8" />
    </>
  ),
  transport: (
    <>
      <path d="M12 88h176" />
      <path d="M40 70h70l8-12h26v20H40z" />
      <path d="M56 70V54h32v16" />
      <path d="M52 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0M128 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0" />
      <path d="M12 104h176M12 100v8M188 100v8" />
    </>
  ),
  fyllning: (
    <>
      <path d="M14 92h172" />
      <path d="M40 92h120v-10H40z" />
      <path d="M40 82h120v-10H40z" />
      <path d="M78 72V52h44v20M90 52V38h20v14" />
      <path d="M14 106h172M14 102v8M186 102v8" />
    </>
  ),
  avsyning: (
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
    namn: 'Kostnadsfritt platsbesök',
    ritning: 'platsbesok',
    text:
      'Vi kommer ut och tittar på marken innan något sägs om pris. Du får höra vad som ligger under, vad som måste bort och vad som kan ligga kvar. Räcker det med dikning säger vi det.',
  },
  {
    nr: '2',
    namn: 'Massor och fast pris',
    ritning: 'massor',
    text:
      'Vi räknar vad som ska schaktas bort och vad som ska fyllas i, och sätter priset på den räkningen. Det står fast. Ändras förutsättningarna i marken ringer vi innan vi gör något åt det.',
  },
  {
    nr: '3',
    namn: 'Maskinen hit',
    ritning: 'transport',
    text:
      'Vi kör hit maskinen själva på egen lowbed. Ingen extern transportör som ska passa in dig mellan två andra jobb, och ingen tom dag på bygget medan maskinen står någon annanstans.',
  },
  {
    nr: '4',
    namn: 'Schakt, berg och fyllning',
    ritning: 'fyllning',
    text:
      'Vi gräver, spränger berget om det ligger i vägen och fyller igen med material som bär. Samma gäng hela vägen: ingen överlämning mitt i jobbet, ingen som väntar på någon annan.',
  },
  {
    nr: '5',
    namn: 'Genomgång på plats',
    ritning: 'avsyning',
    text:
      'Vi går igenom marken tillsammans innan maskinen lastas. Ligger något fel justerar vi det då, medan maskinen fortfarande står kvar. Efteråt är det en ny transport.',
  },
];

const SKAL = [
  {
    rubrik: 'Grävning, berg och transport i samma firma',
    text:
      'Berget som dyker upp mitt i ett schakt stoppar jobbet först när sprängaren är bokad någon annanstans. Vi gör båda momenten, så det blir en dag i stället för en vecka.',
  },
  {
    rubrik: 'Vi kör vår egen maskin hit',
    text:
      'Lowbeden är vår. Du behöver inte leta transportör, och du betalar inte för dagar där bygget står stilla för att maskinen ännu inte kommit fram.',
  },
  {
    rubrik: 'Fast pris efter massberäkning',
    text:
      'Priset sätts när vi har sett marken och räknat massorna, och sedan rör det sig inte. Det som brukar spränga budgeten i ett markjobb är sällan grävningen: det är massorna ingen räknade på.',
  },
  {
    rubrik: 'Vi spränger inte i onödan',
    text:
      'Går berget att gräva eller knacka bort säger vi det. Även när en sprängning hade gett oss mer betalt. Ett moment du inte behövde är inget vi vill fakturera.',
  },
];

/* Ordningen är avsiktlig: pengar och risk först, praktiska frågor sedan. Det är
   i den ordningen man faktiskt oroar sig. Inga svar lovar siffror, tider,
   behörigheter eller garantier — inget av det är verifierat. */
const FRAGOR = [
  {
    q: 'Vad kostar ett markjobb?',
    a: 'Det avgörs av massorna, av om det ligger berg under och av hur lätt det är att komma fram med maskin. Därför börjar vi med ett platsbesök innan någon siffra sätts. Besöket kostar ingenting.',
  },
  {
    q: 'Vad händer om det visar sig ligga berg?',
    a: 'Vi ringer och säger det innan vi gör något åt det, och du får höra vad det innebär för tid och pris. Sedan spränger vi det själva i samma entreprenad, i stället för att du ska boka in en till firma mitt i jobbet.',
  },
  {
    q: 'Hur vet jag att priset inte drar iväg?',
    a: 'Priset sätts efter platsbesöket och massberäkningen och står fast. Det som gör markjobb dyra i efterhand är nästan alltid massor som ingen räknade på från början, och det är just den räkningen vi gör först.',
  },
  {
    q: 'Måste jag ordna transport av maskinen?',
    a: 'Nej. Vi har egen lowbed och kör hit maskinen själva, och hem igen när jobbet är klart. Det är en av anledningarna till att vi kan säga när vi börjar och sedan hålla det.',
  },
  {
    q: 'Hur snabbt kan ni börja?',
    a: 'Det beror på vad som ligger före i kalendern, och vi säger vad som gäller ditt jobb när vi har sett det. Vi lovar ingen startdag vi inte kan hålla.',
  },
  {
    q: 'Hur går det till med sprängning?',
    a: 'Sprängning kräver anmälan och behörighet, och det ska vara ordnat innan första salvan. Säg redan vid platsbesöket att det kan bli berg, så tar vi den delen i planeringen i stället för mitt i jobbet.',
  },
  {
    q: 'Tar ni små jobb också?',
    a: 'Säg vad det gäller, så säger vi rakt ut om det är värt en maskintransport eller inte. Ibland är svaret nej, och då är det bättre att du hör det på telefon än efter en faktura.',
  },
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Oravais med omnejd. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.',
  },
];

export default function OsterlundsDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      {/* ---------- header ----------
          Ordmärke, inget ikonmärke: firmans egen logotyp har inte gått att få
          fram (Instagram-profilbilden är ett foto), och en ritad symbol som
          utges för att vara deras vore en fabrikation. Se toppkommentaren. */}
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandTxt}>
              <b>Österlunds Jordbyggnad</b>
              <i>Oravais</i>
            </span>
          </a>

          <nav className={styles.nav}>
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>
                {l.txt}
              </a>
            ))}
          </nav>

          {/* Mobilmenyns öppnare. Panelen ligger utanför headern (headerns
              backdrop-filter skapar containing block för fixed-barn) och styrs
              av :target — den stängs av sig själv så fort hashen byter till
              den sektion besökaren valde. */}
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

      {/* ---------- hero ----------
          Dronarshot over Oravais: hamnen, husen, grusplanen och vagarna. Allt
          i bilden star pa mark nagon har byggt, och det ar precis vad firman
          gor. Videon ager hela vyn och texten ligger over den: en enda rubrik,
          for filmen visar redan var vi ar. */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          {/* Tva element i stallet for ett script som byter kalla: sidan ska
              vara noll egen klient-JS, och <source media> fungerar inte for
              video i Chrome. CSS visar ratt element per orientering, och
              preload="metadata" gor att det som doljs bara kostar nagra kB. */}
          <video
            className={styles.heroLiggande}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/osterlunds/media/poster-dronare.jpg"
          >
            <source src="/osterlunds/media/video-dronare-oravais.mp4" type="video/mp4" />
          </video>
          <video
            className={styles.heroStaende}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/osterlunds/media/poster-dronare-mobil.jpg"
          >
            <source src="/osterlunds/media/video-dronare-oravais-mobil.mp4" type="video/mp4" />
          </video>
        </figure>

        <div className={styles.heroIn}>
          <div className={styles.heroTxt}>
            <p className={styles.eyebrow}>Jordbyggnad · Sprängning · Lowbed</p>
            <h1 className={styles.h1}>
              Ingenting börjar <em>förrän marken är klar</em>.
            </h1>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">
                Boka platsbesök
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- tjänste-tejpen ----------
          Rullar med ren CSS (translateX till -50 %, listan ligger dubblerad så
          loopen är sömlös). Kopian är aria-hidden — skärmläsare hör listan en
          gång, och prefers-reduced-motion stannar bandet. */}
      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Schakt och grävning</span>
              <span>Vägbankar och underbyggnad</span>
              <span>Diken och dränering</span>
              <span>Bergsprängning</span>
              <span>Grus och krossmaterial</span>
              <span>Massor bort och tillbaka</span>
              <span>Maskintransport på lowbed</span>
              <span>Oravais med omnejd</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- före / efter ----------
          Det starkaste ett markjobb kan visa är att sträckan bär efteråt. Två
          stillbilder räcker, och sidan förblir lätt. */}
      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              Samma sträcka. <em>Nu bär den.</em>
            </h2>
          </div>

          <div className={styles.forvandling}>
            <figure>
              <Image
                src="/osterlunds/media/galleri-fore-orord-vagstrackning.jpg"
                alt="Uppkörd och lerig vägsträckning genom granskog, med hjulspår, vattensamlingar och kvarliggande stubbar"
                width={1200}
                height={1200}
              />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/osterlunds/media/galleri-efter-fardig-grusvag.jpg"
                alt="Samma sträckning färdigbyggd som packad grusväg med öppna diken på båda sidor"
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
                src="/osterlunds/media/galleri-langgravare-dike.jpg"
                alt="Långgrävare som gräver ett dike längs en vägbank av krossat berg"
                width={1200}
                height={1200}
              />
              <figcaption>Dike längs vägbanken.</figcaption>
            </figure>
            <figure>
              <Image
                src="/osterlunds/media/galleri-bergsschakt-sprangmatta.jpg"
                alt="Nysprängd bergskärning med synliga borrhål i bergväggen och en sprängmatta över losshållet berg"
                width={1200}
                height={1200}
              />
              <figcaption>Bergsschakt med sprängmatta.</figcaption>
            </figure>
            <figure>
              <Image
                src="/osterlunds/media/galleri-lowbed-maskintransport.jpg"
                alt="Grävmaskin fastkedjad på en lowbed-trailer med uppfällda ramper på en grusväg"
                width={1200}
                height={1200}
              />
              <figcaption>Maskinen på egen lowbed.</figcaption>
            </figure>
            <figure>
              <Image
                src="/osterlunds/media/galleri-grund-formsattning.jpg"
                alt="Grävmaskin vid ett schakt för husgrund där formen är rest"
                width={1024}
                height={1024}
              />
              <figcaption>Schakt för husgrund.</figcaption>
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
              Fyra moment, <em>ett nummer</em>
            </h2>
            <p className={styles.sekLead}>
              Schakt, väg, berg och transport hänger ihop i samma jobb. Delas de upp på fyra
              firmor blir väntetiden mellan dem dyrare än momenten.
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
              Fem steg, och maskinen är <em>vår hela vägen</em>
            </h2>
            <p className={styles.sekLead}>
              Det börjar med ett platsbesök som inte kostar något, och slutar med att vi går
              igenom marken tillsammans innan maskinen lastas.
            </p>
          </div>

          {/* Klickbara steg utan en rad JavaScript: en dold radioknapp per
              steg, och :checked visar rätt panel. Radio ger dessutom
              piltangentsnavigering gratis, vilket en div med onClick inte gör. */}
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

      {/* ---------- varför ---------- */}
      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.varforGrid}>
            <div className={styles.varforText}>
              <p className={styles.eyebrow}>Varför oss</p>
              <h2 className={styles.h2}>
                Väntan är <em>det dyra</em>
              </h2>
              <p className={styles.sekLead}>
                Ett bygge kostar också de dagar ingenting händer. Och det som stoppar ett markjobb
                är sällan grävningen: det är berget ingen räknade med, transportören som inte kom,
                eller massorna som tog slut på fredagen. De bitarna har vi själva, och det är hela
                skillnaden mellan en dag och en vecka.
              </p>

              <figure className={styles.varforBild}>
                <Image
                  src="/osterlunds/media/om-oss-gravmaskin-kvallsljus.jpg"
                  alt="Grävmaskin som arbetar med markarbete i kvällsljus"
                  width={1200}
                  height={896}
                />
              </figure>

              <a className={styles.btn} href="#kontakt">
                Boka platsbesök
              </a>
            </div>

            <div className={styles.skal}>
              {SKAL.map((s) => (
                <article className={styles.skalItem} key={s.rubrik}>
                  <h3>{s.rubrik}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
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
              ordningen. Gäller det just din tomt är telefonen snabbare än en sida.
            </p>
          </div>

          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>
              {/* name-attributet gör dragspelet exklusivt: öppnas en fråga
                  stänger webbläsaren den förra själv. Ingen JS. I äldre
                  webbläsare ignoreras attributet och flera kan stå öppna. */}
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
              <p>Ring och fråga rakt ut. Vi säger vad som gäller just din mark.</p>
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
                Ska något bort ur marken?
                <br />
                <em>Börja med platsbesöket.</em>
              </h2>
              <p className={styles.sekLead}>
                Ring, eller skriv några rader om tomten. Platsbesöket kostar ingenting, och du får
                höra vad som ligger under och vad som krävs för att få bort det.
              </p>

              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <a
                  className={styles.kontaktRad}
                  href="https://www.instagram.com/osterlundsjordbyggnad/"
                  target="_blank"
                  rel="noopener"
                >
                  <span>Instagram</span>
                  <b>@osterlundsjordbyggnad</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Område</span>
                  <b>Oravais med omnejd</b>
                </div>
              </div>
            </div>

            {/* Formuläret har en riktig utgång: submit postar fälten som ren
                text via mailto, alltså utan backend och utan klient-JS. I den
                skarpa sajten byts action mot kundens egen inkorg — det står
                också i noten under knappen, så ingen tror något annat. */}
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
                <select name="typ" defaultValue="Schakt och grävning">
                  <option>Schakt och grävning</option>
                  <option>Väg, dike och underbyggnad</option>
                  <option>Bergsprängning</option>
                  <option>Maskintransport</option>
                  <option>Dränering</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om tomten
                <textarea
                  name="meddelande"
                  rows={4}
                  placeholder="Var marken ligger, vad som ska göras, om du vet att det är berg eller lera, och när det ska vara klart"
                />
              </label>
              <button className={styles.btn} type="submit">
                Boka platsbesök
              </button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Eller ring {TEL}
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om marken och ungefärlig yta — då kan vi ge ett vettigt svar redan i
                första samtalet. Inga massutskick, ingen säljlista.
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
                <b>Österlunds Jordbyggnad</b>
                <i>Schakt, berg och transport</i>
              </span>
              <p className={styles.ftrText}>
                Schakt, vägbyggen, bergsprängning och maskintransport i Oravais med omnejd. Vi
                gräver, spränger och kör maskinen själva.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => (
                <a href={l.href} key={l.href}>
                  {l.txt}
                </a>
              ))}
              <a href={TEL_HREF}>{TEL}</a>
              <a
                href="https://www.instagram.com/osterlundsjordbyggnad/"
                target="_blank"
                rel="noopener"
              >
                @osterlundsjordbyggnad
              </a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Österlunds Jordbyggnad · Oravais</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ---------- mobilmeny: :target-panel, ingen klient-JS ----------
          Ligger utanför headern eftersom headerns backdrop-filter annars blir
          containing block för position: fixed. Panelen är fixed, så :target
          kräver ingen skroll — och när besökaren väljer en länk byter hashen
          till sektionen, vilket i sig fäller in panelen. */}
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

      {/* Stängningsankaret. Det ligger fast i vyn (se .stangdAnkare), så när
          :target släpper flyttas inte skrollpositionen en pixel. Delas med
          mobilmenyn och Bahko-modalen. */}
      <span className={styles.stangdAnkare} id="stangd" />

      {/* ---------- kontakt-popup, helt utan JS ----------
          Entrén sköts av en CSS-animation med 14 sekunders fördröjning, och
          stängningen av checkbox-mönstret: :checked på inputen gömmer kortet.
          Vid prefers-reduced-motion visas popupen inte alls — en ruta som
          dyker upp av sig själv ÄR rörelse. */}
      <input
        type="checkbox"
        id="popup-bort"
        className={styles.popupBort}
        aria-hidden="true"
        tabIndex={-1}
      />
      <aside className={styles.popup} aria-label="Kontakta Österlunds Jordbyggnad">
        <label
          className={styles.popupX}
          htmlFor="popup-bort"
          role="button"
          aria-label="Stäng"
          tabIndex={0}
        >
          ✕
        </label>
        <p className={styles.popupEyebrow}>Ligger det berg i vägen?</p>
        <p className={styles.popupTxt}>
          Platsbesöket kostar ingenting. Du får höra vad som ligger under marken och vad som krävs
          för att få bort det, innan du bestämmer något.
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

      {/* Bahko-modalen: :target, ingen hydrering, inget script. Den är därför
          INTE märkt aria-modal — utan script finns ingen Escape och ingen
          fokusfälla, och en sida ska inte lova hjälpmedel något den inte gör.
          Stängkrysset ligger först i panelen, alltså först i tab-ordningen. */}
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Österlunds Jordbyggnad se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram.
            Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektbilder,
            er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt
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
            href="mailto:mathias@bahkobyra.se?subject=%C3%96sterlunds%20Jordbyggnad%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
