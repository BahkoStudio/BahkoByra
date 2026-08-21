import Image from 'next/image';
import { Fraunces, Inter } from 'next/font/google';
import styles from './nordicsnickare.module.css';

/* ===========================================================================
   NORDIC SNICKARE — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/nordicsnickare · Stockholm · ingen hemsida, jobb via DM

   Bärande idé: färdigköpt passar inga snedtak, därför bygger vi på plats.
   Hela sidan argumenterar för den meningen, och hero-videon visar den.

   VERIFIERAT (och därmed allt vi får skriva):
   Instagram @nordicsnickare, profilens egen rubrik "Woodwork & Renovation" ·
   snickeri, renovering och gipsarbeten · Stockholm · 225 följare, 21 inlägg ·
   ingen hemsida, uppdrag kommer via DM · har enligt egen uppgift mycket att
   göra just nu · vill kunna ta mer betalt per jobb (deras egen fråga i DM:
   "vad är det exakt ni gör som kan hjälpa mig att öka mina intäkter?").

   INTE verifierat, och finns därför inte på sidan: organisationsnummer,
   registreringsår, antal projekt, omdömen, ledtider, priser, garantier,
   försäkringar, F-skatt, antal anställda, exakt stadsdel.

   PLATSHÅLLARE som måste bytas före utskick:
   - Telefonnummer 070-123 45 67 (inget nummer är verifierat)
   - Firmanamnet "Nordic Snickare" är läst ur handlet nordicsnickare.
     Profilen säger bara "Woodwork & Renovation", och firman finns inte i
     register under det namnet. Stavningen ska bekräftas av kunden.
   - Formuläret går till mathias@bahkobyra.se, inte till kunden.

   Bilderna är illustrationer ur vårt eget demobibliotek och märks som det.
   Ingen sektion heter Våra projekt eller Referenser.
   =========================================================================== */

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--ns-display',
});

/* Kursiven ligger i en egen instans och hämtas först när den behövs — den
   används i ett par rubrikord och ska inte belasta första renderingen. */
const displayKursiv = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--ns-display-kursiv',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--ns-ui',
});

export const metadata = {
  title: 'Nordic Snickare — platsbyggt snickeri i Stockholm',
  description:
    'Platsbyggda garderober, kök, hyllor och gips i Stockholm. Färdigköpt passar inga snedtak — vi mäter hemma hos dig och bygger på plats. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-123 45 67';
const TEL_HREF = 'tel:+46701234567';

/* Ingen backend i förslaget: submit postar fälten som ren text via mailto till
   Bahko Byrå. Noten under knappen säger rakt ut vart det går. Vi har ingen
   verifierad e-postadress till kunden, så vår egen står här — aldrig en gissad. */
const FORM_ACTION =
  'mailto:mathias@bahkobyra.se?subject=Nordic%20Snickare%20-%20f%C3%B6rfr%C3%A5gan';

/* En källa för navigationen: header, mobilmeny och footer läser samma lista. */
const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi bygger' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför platsbyggt' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra kort, alla inom det verifierade: snickeri, renovering och gips. */
const TJANSTER = [
  {
    nr: '01',
    namn: 'Platsbyggda garderober',
    text:
      'Förvaring som följer rummets egna vinklar, även in i ett snedtak. Måttet tas hemma hos dig, inte i en katalog, och skåpen skruvas upp i rummet de ska sitta i.',
    punkter: ['Snedtak och vindsvåning', 'Nischer och skrymslen', 'Golv till tak'],
  },
  {
    nr: '02',
    namn: 'Kök och luckor',
    text:
      'Sitter stommarna bra behöver du inget nytt kök. Nya luckor, fronter och bänkskiva ger samma känsla som ett köksbyte, till en helt annan nota.',
    punkter: ['Nya luckor och fronter', 'Bänkskivor', 'Kök som renoveras, inte rivs'],
  },
  {
    nr: '03',
    namn: 'Hyllor och bokväggar',
    text:
      'Byggda in i rummet i stället för ställda mot det. En bokvägg som går vägg till vägg och tak till golv ser ut som en del av huset, för det är den.',
    punkter: ['Vägg till vägg', 'Runt dörrar och fönster', 'Måttbeställt i plywood eller lönn'],
  },
  {
    nr: '04',
    namn: 'Gips, lister och renovering',
    text:
      'Väggarna som ska bli raka och listverket som avslutar rummet. Vi tar också renoveringen rum för rum när det är mer än snickeriet som ska göras.',
    punkter: ['Gips och slätspackling', 'Lister och foder', 'Renovering rum för rum'],
  },
];

const STEG = [
  {
    nr: '1',
    namn: 'Kostnadsfri mätning',
    text:
      'Vi kommer hem, mäter och tittar på vinklarna. Du får höra vad som går att göra med ytan och vad det kostar. Räcker en hyllsektion säger vi det.',
  },
  {
    nr: '2',
    namn: 'Ritning och fast pris',
    text:
      'Du ser hur det kommer att sitta innan något beställs, och priset sätts innan vi börjar. Hittar vi något oväntat bakom gipsen ringer vi först.',
  },
  {
    nr: '3',
    namn: 'Tillverkning',
    text:
      'Delarna tillverkas efter dina mått. Det är därför de passar mot ett tak som lutar och en vägg som inte är rak någonstans.',
  },
  {
    nr: '4',
    namn: 'Montering',
    text:
      'Vi monterar på plats och skär till mot taket där det behövs. Vi städar efter oss varje dag, inte bara den sista.',
  },
  {
    nr: '5',
    namn: 'Genomgång',
    text:
      'Vi går igenom allt tillsammans innan vi åker. Sitter en lucka emot justerar vi den då, inte om en månad.',
  },
];

const SKAL = [
  {
    rubrik: 'Måttet tas i ditt rum',
    text:
      'En färdigköpt garderob är byggd för ett rum som inte finns. Den lämnar en springa mot taket, några centimeter mot väggen och en översta hylla du aldrig kommer åt.',
  },
  {
    rubrik: 'Fast pris innan vi börjar',
    text:
      'Priset sätts när vi har sett rummet och rör sig inte sen. Det som brukar bli dyrt i ett snickerijobb är sällan hantverket, det är ändringarna som upptäcks sent.',
  },
  {
    rubrik: 'Samma person hela vägen',
    text:
      'Den som mäter är den som monterar. Du behöver inte förklara ditt hus två gånger, och du vet vem du ringer.',
  },
  {
    rubrik: 'Vi säljer inte platsbyggt i onödan',
    text:
      'Räcker det med en hyllsektion säger vi det. Även när en hel vägg hade gett oss mer betalt. Ett jobb du inte behövde är inget vi vill ha.',
  },
];

/* Ordningen är avsiktlig: pengar och risk först, praktiska frågor sedan. Det är
   i den ordningen man faktiskt oroar sig. Inga svar lovar siffror, tider eller
   garantier — de finns inte verifierade. */
const FRAGOR = [
  {
    q: 'Vad kostar en platsbyggd garderob?',
    a: 'Det avgörs av ytan, vinklarna och vad som ska finnas inuti. Därför börjar vi med en mätning hemma hos dig, innan någon siffra sätts. Mätningen kostar ingenting.',
  },
  {
    q: 'Varför inte bara köpa en färdig garderob?',
    a: 'Gör det, om väggen är rak och måtten stämmer. Det gör de sällan i en äldre lägenhet eller under ett snedtak. Skillnaden du betalar för är att ytan används helt i stället för till åttio procent.',
  },
  {
    q: 'Hur vet jag att priset inte drar iväg?',
    a: 'Priset sätts efter mätningen och står fast. Om vi hittar något bakom gipsen som ändrar förutsättningarna ringer vi och säger det innan vi gör något åt det.',
  },
  {
    q: 'Hur lång tid tar det?',
    a: 'Det beror på omfattningen, och vi säger vad som gäller ditt jobb när vi har sett det. Vi lovar ingen tid vi inte kan hålla.',
  },
  {
    q: 'Kan ni bygga under ett snedtak?',
    a: 'Det är precis där platsbyggt gör mest skillnad. Skåpen skärs till efter takets vinkel, ända upp i toppen, så ytan som annars står tom blir förvaring.',
  },
  {
    q: 'Måste jag flytta ut medan arbetet görs?',
    a: 'Oftast inte. Vi arbetar i ett rum i taget och städar efter oss varje dag. Gäller det en större renovering säger vi rakt ut vad som gäller innan vi börjar.',
  },
  {
    q: 'Gör ni gips och målning också?',
    a: 'Gips och slätspackling gör vi. Ska väggen bli rak innan hyllan sätts upp är det samma jobb för oss, inte två hantverkare som ska samordnas.',
  },
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Stockholm med omnejd. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.',
  },
];

export default function NordicSnickareDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      {/* ---------- header ---------- */}
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark} aria-hidden="true">
              {/* Vinkelhake — snickarens verktyg, och samma vinkel som ett snedtak. */}
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M5 27L27 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M5 27h9M5 27v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path
                  d="M5 27L27 5v9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.brandTxt}>
              <b>Nordic Snickare</b>
              <i>Stockholm</i>
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

      {/* ---------- hero ---------- */}
      <section className={styles.hero} id="top">
        <div className={styles.heroIn}>
          <div className={styles.heroTxt}>
            <p className={styles.eyebrow}>Snickeri · Renovering · Gips</p>
            <h1 className={styles.h1}>
              <span className={styles.h1Setup}>Färdigköpt passar inga snedtak.</span>
              <em>Byggt på plats.</em>
            </h1>
            <p className={styles.heroLead}>
              Vi arbetar i Stockholm med omnejd. Vi mäter hemma hos dig, tillverkar efter dina
              mått och monterar i rummet det ska sitta i. Fast pris innan vi börjar, och samma person hela vägen.
            </p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">
                Boka kostnadsfri mätning
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </div>
          </div>

          {/* Videon är ren HTML (autoplay muted loop playsinline) — ingen
              klient-JS, och postern gör att ytan aldrig är tom. Rutan är
              ratio-styrd, så klippet fyller den i varje bredd och behöver
              ingen egen mobilvariant. Illustration ur vårt demobibliotek,
              inte kundens eget jobb: därav bildtexten. */}
          <figure className={styles.heroFilm}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/nordicsnickare/media/poster-fore-tom-vagg.jpg"
              width={1280}
              height={720}
            >
              <source src="/nordicsnickare/media/video-garderoben-byggs.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </section>

      {/* ---------- tjänste-tejpen ----------
          Rullar med ren CSS (translateX till -50 %, listan ligger dubblerad så
          loopen är sömlös). Kopian är aria-hidden — skärmläsare hör listan en
          gång, och prefers-reduced-motion stannar bandet. */}
      <div className={styles.tejp} role="group" aria-label="Det här bygger vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Platsbyggda garderober</span>
              <span>Snedtak och vindsvåning</span>
              <span>Kök och luckor</span>
              <span>Hyllor och bokväggar</span>
              <span>Gips och slätspackling</span>
              <span>Lister och foder</span>
              <span>Renovering rum för rum</span>
              <span>Stockholm med omnejd</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- före / efter ----------
          Det starkaste ett snickeri kan visa är förvandlingen. Två stillbilder
          räcker, och sidan förblir lätt. */}
      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              Samma vägg. <em>Nu är den förvaring.</em>
            </h2>
            <p className={styles.sekLead}>
              Väggen på bilden har två takfall som möts i en topp. Ingen färdig möbel i någon
              katalog är byggd för den formen — men ett skåp som skärs till på plats är det.
            </p>
          </div>

          <div className={styles.forvandling}>
            <figure>
              <Image
                src="/nordicsnickare/media/galleri-fore-tom-vagg.jpg"
                alt="Tom putsad vägg under två takfall i ett äldre sovrum, före arbetet"
                width={1200}
                height={678}
              />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/nordicsnickare/media/galleri-efter-platsbyggd-garderob.jpg"
                alt="Platsbyggd garderob i ljus lönn som följer takfallen från golv till tak"
                width={1200}
                height={678}
              />
              <figcaption>
                <b>Efter</b>
              </figcaption>
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
            <p className={styles.eyebrow}>Vad vi bygger</p>
            <h2 className={styles.h2}>
              Snickare, <em>inte möbelmontörer</em>
            </h2>
            <p className={styles.sekLead}>
              Vi tar jobben där måtten inte finns i någon katalog: snedtaket på vinden, nischen
              vid skorstenen, väggen som inte är rak någonstans.
            </p>
          </div>

          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.nr}>
                <span className={styles.tjanstNr}>{t.nr}</span>
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
              Fem steg, och vi håller i <em>alla fem</em>
            </h2>
            <p className={styles.sekLead}>
              Det börjar med en mätning som inte kostar något, och slutar med en genomgång där du
              får säga om något sitter emot.
            </p>
          </div>

          <ol className={styles.steg}>
            {STEG.map((s) => (
              <li className={styles.stegItem} key={s.nr}>
                <span className={styles.stegNr}>{s.nr}</span>
                <div>
                  <h3>{s.namn}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- varför ---------- */}
      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.varforGrid}>
            <div className={styles.varforText}>
              <p className={styles.eyebrow}>Varför platsbyggt</p>
              <h2 className={styles.h2}>
                Millimetern är <em>hela skillnaden</em>
              </h2>
              <p className={styles.sekLead}>
                Det syns inte på en färdig garderob att den nästan passar. Det syns på springan
                mot taket, på centimetrarna mot väggen och på hyllan du inte når. Platsbyggt har
                inga sådana ställen, för varje del är skuren efter just ditt rum.
              </p>

              <figure className={styles.varforBild}>
                <Image
                  src="/nordicsnickare/media/galleri-fogen-mot-snedtaket.jpg"
                  alt="Närbild på fogen där skåpsluckan möter det sneda taket"
                  width={1200}
                  height={678}
                />
              </figure>

              <a className={styles.btn} href="#kontakt">
                Boka kostnadsfri mätning
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
              ordningen. Gäller det just ditt rum är telefonen snabbare än en sida.
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
              <p>Ring och fråga rakt ut. Vi säger vad som gäller just ditt rum.</p>
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
                Har du en vägg som står tom?
                <br />
                <em>Börja med mätningen.</em>
              </h2>
              <p className={styles.sekLead}>
                Ring, eller skriv några rader om rummet. Mätningen tar tjugo minuter och kostar
                ingenting — och du får höra vad som går att göra med ytan.
              </p>

              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <a
                  className={styles.kontaktRad}
                  href="https://www.instagram.com/nordicsnickare/"
                  target="_blank"
                  rel="noopener"
                >
                  <span>Instagram</span>
                  <b>@nordicsnickare</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Område</span>
                  <b>Stockholm med omnejd</b>
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
                <select name="typ" defaultValue="Platsbyggd garderob">
                  <option>Platsbyggd garderob</option>
                  <option>Kök och luckor</option>
                  <option>Hyllor och bokvägg</option>
                  <option>Gips och lister</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om rummet
                <textarea
                  name="meddelande"
                  rows={4}
                  placeholder="Vilket rum, ungefärliga mått, snedtak eller rak vägg, när du vill ha det klart"
                />
              </label>
              <button className={styles.btn} type="submit">
                Boka kostnadsfri mätning
              </button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Eller ring {TEL}
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om rummet och måtten — då kan vi ge ett vettigt svar redan i första
                samtalet. Inga massutskick, ingen säljlista.
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
                <b>Nordic Snickare</b>
                <i>Snickeri, renovering och gips</i>
              </span>
              <p className={styles.ftrText}>
                Platsbyggda garderober, kök, hyllor och gips i Stockholm. Vi mäter hemma hos dig
                och bygger efter dina mått.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => (
                <a href={l.href} key={l.href}>
                  {l.txt}
                </a>
              ))}
              <a href={TEL_HREF}>{TEL}</a>
              <a href="https://www.instagram.com/nordicsnickare/" target="_blank" rel="noopener">
                @nordicsnickare
              </a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Nordic Snickare · Stockholm</span>
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
      <aside className={styles.popup} aria-label="Kontakta Nordic Snickare">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>
          ✕
        </label>
        <p className={styles.popupEyebrow}>Står en vägg tom?</p>
        <p className={styles.popupTxt}>
          Mätningen tar tjugo minuter och kostar ingenting. Du får höra vad som går att göra med
          ytan innan du bestämmer något.
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
          <h3 id="bahko-rubrik">Så här kan Nordic Snickare se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram. Ingen
            beställning, inget åtagande. Vill ni se den skarpt med era egna projektbilder och ett
            formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.
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
            href="mailto:mathias@bahkobyra.se?subject=Nordic%20Snickare%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
