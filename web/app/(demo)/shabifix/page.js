import Image from 'next/image';
import { Archivo, Space_Grotesk } from 'next/font/google';
import styles from './shabifix.module.css';

/* ===========================================================================
   SHABIFIX — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: hantverksfirma i Västra Frölunda · Göteborg med omnejd

   Byggd om 2026-08-21 på den nya mallen (referens:
   web/app/(demo)/nordicsnickare/): fullskärmsvideo i heron, EN rubrik,
   linjeritningar i tjänstekorten, klickbara steg utan JavaScript.

   Bärande idé: en renovering brukar kräva tre firmor — här räcker en.
   Det är samma sak varje sektion argumenterar för.

   VERIFIERAT (allt sidan får påstå, ur ursprungsdemon):
   hantverksfirma i Västra Frölunda · bygg, snickeri och måleri i ett ·
   Göteborg med omnejd · fast pris skriftligt innan start, uppdelat per rum
   eller moment · en kontakt hela vägen · täcker och städar varje dag ·
   kostnadsfritt hembesök · hellre ett ärligt nej än ett halvfärdigt jobb.

   INTE verifierat, och finns därför inte på sidan: organisationsnummer,
   registreringsår, antal projekt, omdömen, ledtider i veckor, garantier,
   försäkringar, antal anställda.

   PLATSHÅLLARE som måste bytas före utskick:
   - Telefonnummer 070-123 45 67 (inget nummer är verifierat)
   - Formuläret går till mathias@bahkobyra.se, inte till kunden.

   Bilder och video är demomaterial, märkta som illustration en gång per sida.
   Ingen sektion heter Våra projekt eller Referenser.

   Noll egen klient-JS: modal och mobilmeny via :target, popup via
   CSS-delay + checkbox, FAQ via <details name>, stegen via radio + :checked.
   =========================================================================== */

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--sh-display',
});

const ui = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--sh-ui',
});

export const metadata = {
  title: 'Shabifix — en hantverkare, hela jobbet. Bygg, snickeri och måleri i Göteborg',
  description:
    'Shabifix i Västra Frölunda tar bygg, snickeri och måleri i ett. Fast pris skriftligt innan start, en kontakt hela vägen. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-123 45 67';
const TEL_HREF = 'tel:0701234567';

/* Ingen backend i förslaget: submit postar fälten som ren text via mailto till
   Bahko Byrå. Noten under knappen säger rakt ut vart det går. */
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Shabifix%20-%20f%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför Shabifix' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra måttsatta linjeritningar, en per tjänst. De ritar sig själva när kortet
   kommer i vy, och står färdigritade där stödet saknas. vector-effect sitter på
   formerna, inte på svg:n — den ärvs inte, och utan den blir linjerna hårfina
   när ritningen skalas ner. */
const RITNINGAR = {
  maleri: (
    <>
      <path d="M18 22h164v58H18z" />
      <path d="M18 52h164" />
      <path d="M132 80v18h22V80" />
      <path d="M136 98h14v10h-14z" />
      <path d="M18 108h96M18 104v8M114 104v8" />
    </>
  ),
  snickeri: (
    <>
      <path d="M22 96V40h18v56" />
      <path d="M40 40h34l14 14v42" />
      <path d="M88 96h90" />
      <path d="M88 82h90" />
      <path d="M22 108h156M22 104v8M178 104v8" />
    </>
  ),
  bygg: (
    <>
      <path d="M20 100V34h160v66" />
      <path d="M20 100h160" />
      <path d="M20 86h160" />
      <path d="M76 100V52h48v48" />
      <path d="M76 66h48" />
      <path d="M20 24h160" />
    </>
  ),
  montering: (
    <>
      <path d="M26 26h148v54H26z" />
      <path d="M100 26v54" />
      <path d="M84 50h8M108 50h8" />
      <path d="M26 80h148v20H26z" />
      <path d="M100 108v-8M92 108h16" />
    </>
  ),
};

const TJANSTER = [
  {
    nr: '01',
    ritning: 'maleri',
    namn: 'Måleri',
    text: 'Väggar, tak och snickerier — tvättat, spacklat, grundat och målat, så det står sig.',
    punkter: ['Inne och ute', 'Underarbetet ingår alltid', 'Skarpa snitt'],
  },
  {
    nr: '02',
    ritning: 'snickeri',
    namn: 'Snickeri',
    text: 'Lister, dörrar och inredning. Passning som syns — och som ingen behöver rätta till efteråt.',
    punkter: ['Lister och foder', 'Dörrar', 'Platsbyggd inredning'],
  },
  {
    nr: '03',
    ritning: 'bygg',
    namn: 'Bygg och renovering',
    text: 'Rum för rum: golv, väggar och ytskikt. Ett jobb i taget, och det görs klart.',
    punkter: ['Golv och väggar', 'Ytskikt', 'Rivning och underarbete'],
  },
  {
    nr: '04',
    ritning: 'montering',
    namn: 'Montering',
    text: 'Kök och förvaring. Rakt, tyst och fastskruvat — första gången.',
    punkter: ['Kök', 'Garderober och förvaring', 'Vitvaror på plats'],
  },
];

/* En ritning per steg, samma linjespråk som tjänstekorten. */
const STEGRITNINGAR = {
  hembesok: (
    <>
      <path d="M32 100V52l68-30 68 30v48" />
      <path d="M32 100h136" />
      <path d="M84 100V70h32v30" />
      <path d="M32 112h136M32 108v8M168 108v8" />
    </>
  ),
  pris: (
    <>
      <path d="M40 16h120v88H40z" />
      <path d="M56 40h72M56 56h88M56 72h48" />
      <path d="M112 72h32v20h-32z" />
      <path d="M40 112h120M40 108v8M160 108v8" />
    </>
  ),
  jobbet: (
    <>
      <path d="M22 34h156v52H22z" />
      <path d="M22 60h156" />
      <path d="M100 86v22" />
      <path d="M86 108h28" />
      <path d="M60 22l16 12M140 22l-16 12" />
    </>
  ),
  genomgang: (
    <>
      <path d="M46 20h108v72H46z" />
      <path d="M100 20v72M46 56h108" />
      <path d="M62 108l16 14 34-36" />
      <path d="M124 108h34" />
    </>
  ),
};

const STEG = [
  {
    nr: '1',
    ritning: 'hembesok',
    namn: 'Kostnadsfritt hembesök',
    text: 'Vi tittar, mäter och säger ärligt vad som behöver göras. Passar jobbet inte oss säger vi det på plats.',
  },
  {
    nr: '2',
    ritning: 'pris',
    namn: 'Fast pris skriftligt',
    text: 'Priset innan vi börjar, uppdelat per rum eller moment. Inga tillägg under jobbets gång.',
  },
  {
    nr: '3',
    ritning: 'jobbet',
    namn: 'Jobbet görs klart',
    text: 'Täckning, rivning och underarbete först — det är där ett hantverksjobb vinns eller förloras. Vi städar varje dag.',
  },
  {
    nr: '4',
    ritning: 'genomgang',
    namn: 'Genomgång i dagsljus',
    text: 'Vi går igenom allt med dig innan vi packar ihop. Missat något? Då tar vi det.',
  },
];

const SKAL = [
  {
    rubrik: 'Fast pris innan start',
    text: 'Skriftligt och uppdelat per rum eller moment, innan vi börjar. Inga tillägg under jobbets gång.',
  },
  {
    rubrik: 'En kontakt hela vägen',
    text: 'Samma person från hembesöket till genomgången. Du behöver aldrig jaga tre firmor.',
  },
  {
    rubrik: 'Vi täcker och städar varje dag',
    text: 'Du bor kvar under jobbet. Då ska hemmet gå att leva i — varje kväll.',
  },
  {
    rubrik: 'Hellre ett ärligt nej',
    text: 'Passar jobbet inte oss säger vi det på plats. Ett halvfärdigt jobb är dyrare än ett ärligt besked.',
  },
];

/* Pengar och risk först, praktiska frågor sedan. Inga svar lovar siffror,
   tider eller garantier — de finns inte verifierade. */
const FRAGOR = [
  {
    q: 'Vad kostar det?',
    a: 'Det beror på rummet och skicket, och därför gissar vi aldrig i telefon. Hembesöket kostar ingenting, och du får ett fast pris skriftligt — uppdelat per rum eller moment — innan något börjar.',
  },
  {
    q: 'Blir det verkligen inga tillägg?',
    a: 'Priset du får innan start är priset du betalar. Dyker något oväntat upp bakom en vägg pratar vi om det innan något görs — du bestämmer, ingenting läggs på i efterhand.',
  },
  {
    q: 'Kan vi bo kvar under jobbet?',
    a: 'Ja, det är det vanligaste. Vi täcker och städar varje dag vi är hos dig, så hemmet går att leva i varje kväll.',
  },
  {
    q: 'Tar ni små jobb?',
    a: 'Ja. Ett rum, en dörr eller en lista är också ett jobb. Vi tar ett i taget och gör det klart.',
  },
  {
    q: 'Vem kommer hem till mig?',
    a: 'Samma person som du pratar med i telefonen, och samma person som gör genomgången när jobbet är klart. Du behöver inte förklara ditt hem två gånger.',
  },
  {
    q: 'Var jobbar ni?',
    a: 'Vi utgår från Västra Frölunda och tar jobb i Göteborg med omnejd.',
  },
];

export default function ShabifixDemo() {
  return (
    <div className={`${display.variable} ${ui.variable} ${styles.sida}`}>
      {/* ---------- header ---------- */}
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark} aria-hidden="true">
              {/* Vinkelhake och pensel — bygg, snickeri och måleri i ett märke. */}
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M5 27h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M5 27V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path
                  d="M12 22l9-13 5 3-9 13z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.brandTxt}>
              <b>Shabifix</b>
              <i>Göteborg</i>
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
              av :target — den stängs av sig själv så fort hashen byter. */}
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
          Videon äger hela vyn och texten ligger över den. En enda rubrik:
          filmen visar redan förvandlingen, texten behöver inte upprepa den. */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          {/* Två element i stället för ett script som byter källa: sidan ska
              vara noll egen klient-JS, och <source media> fungerar inte för
              video i Chrome. CSS visar rätt element per orientering, och
              selektorerna har två klasser för att vinna över elementregeln. */}
          <video
            className={styles.heroLiggande}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/shabifix/media/poster-fore-sliten-vagg.jpg"
          >
            <source src="/shabifix/media/video-forvandlingen.mp4" type="video/mp4" />
          </video>
          <video
            className={styles.heroStaende}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/shabifix/media/poster-fore-sliten-vagg-mobil.jpg"
          >
            <source src="/shabifix/media/video-forvandlingen-mobil.mp4" type="video/mp4" />
          </video>
        </figure>

        <div className={styles.heroIn}>
          <div className={styles.heroTxt}>
            <p className={styles.eyebrow}>Bygg · Snickeri · Måleri</p>
            <h1 className={styles.h1}>
              Du behöver bara ringa <em>en</em>.
            </h1>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">
                Boka kostnadsfritt hembesök
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Ring {TEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- tjänste-tejpen ----------
          Rullar med ren CSS (translateX till -50 %, listan dubblerad så loopen
          är sömlös). Kopian är aria-hidden, och prefers-reduced-motion stannar
          bandet. */}
      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Måleri inne och ute</span>
              <span>Lister och dörrar</span>
              <span>Golv och väggar</span>
              <span>Köksmontering</span>
              <span>Platsbyggd inredning</span>
              <span>Fast pris innan start</span>
              <span>En kontakt hela vägen</span>
              <span>Göteborg med omnejd</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- före / efter ---------- */}
      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              Samma hus. <em>Ett jobb.</em>
            </h2>
          </div>

          <div className={styles.forvandling}>
            <figure>
              <Image
                src="/shabifix/media/galleri-fore-villa-flagnande.jpg"
                alt="Fasad med flagnande färg före arbetet"
                width={1280}
                height={717}
              />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/shabifix/media/galleri-efter-villa-antracit.jpg"
                alt="Samma fasad ommålad i antracit efter arbetet"
                width={1280}
                height={717}
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
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Fyra yrken, <em>en firma</em>
            </h2>
            <p className={styles.sekLead}>
              Det som brukar bli dyrt i en renovering är sällan hantverket. Det är glappen mellan
              hantverkarna.
            </p>
          </div>

          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.nr}>
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
              Fyra steg, och vi håller i <em>alla fyra</em>
            </h2>
            <p className={styles.sekLead}>
              Det börjar med ett hembesök som inte kostar något, och slutar med en genomgång i
              dagsljus.
            </p>
          </div>

          {/* Klickbara steg utan en rad JavaScript: en dold radioknapp per steg,
              och :checked visar rätt panel. Radio ger dessutom
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
              <p className={styles.eyebrow}>Varför Shabifix</p>
              <h2 className={styles.h2}>
                Underarbetet är <em>hela jobbet</em>
              </h2>
              <p className={styles.sekLead}>
                Ett hantverksjobb vinns eller förloras innan färgen är öppnad: i täckningen, i
                rivningen, i spacklet. Det syns inte på bilder, men det är det du märker om två år.
              </p>

              <figure className={styles.varforBild}>
                <Image
                  src="/shabifix/media/galleri-detalj-skarpt-snitt.jpg"
                  alt="Närbild på ett skarpt målningssnitt mot lister"
                  width={1280}
                  height={717}
                />
              </figure>

              <a className={styles.btn} href="#kontakt">
                Boka kostnadsfritt hembesök
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
          </div>

          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>
              {/* name-attributet gör dragspelet exklusivt: öppnas en fråga
                  stänger webbläsaren den förra själv. Ingen JS. */}
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
              <p>Ring och fråga rakt ut. Vi säger vad som gäller just ditt jobb.</p>
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
                Berätta vad som ska göras.
                <br />
                <em>Vi säger vad det kräver.</em>
              </h2>
              <p className={styles.sekLead}>
                Hembesöket kostar ingenting. Du får ett ärligt besked och ett fast pris skriftligt
                innan något börjar.
              </p>

              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Utgår från</span>
                  <b>Västra Frölunda</b>
                </div>
                <div className={styles.kontaktRad}>
                  <span>Område</span>
                  <b>Göteborg med omnejd</b>
                </div>
              </div>
            </div>

            {/* Formuläret har en riktig utgång: submit postar fälten som ren
                text via mailto, alltså utan backend och utan klient-JS. I den
                skarpa sajten byts action mot kundens egen inkorg. */}
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
                <select name="typ" defaultValue="Måleri">
                  <option>Måleri</option>
                  <option>Snickeri</option>
                  <option>Bygg och renovering</option>
                  <option>Montering</option>
                  <option>Flera saker</option>
                </select>
              </label>
              <label>
                Kort om jobbet
                <textarea
                  name="meddelande"
                  rows={4}
                  placeholder="Vilket rum eller vilka rum, ungefärlig yta, när du vill ha det klart"
                />
              </label>
              <button className={styles.btn} type="submit">
                Boka kostnadsfritt hembesök
              </button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>
                Eller ring {TEL}
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om rummet och skicket — då kan vi ge ett vettigt svar redan i första
                samtalet. Inga massutskick, ingen säljlista.
              </p>
              <p className={styles.formNot}>
                Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till
                Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen
                inkorg.
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
                <b>Shabifix</b>
                <i>Bygg, snickeri och måleri</i>
              </span>
              <p className={styles.ftrText}>
                En hantverkare för hela jobbet. Fast pris skriftligt innan start, och samma kontakt
                från hembesök till genomgång.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => (
                <a href={l.href} key={l.href}>
                  {l.txt}
                </a>
              ))}
              <a href={TEL_HREF}>{TEL}</a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Shabifix · Västra Frölunda, Göteborg</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ---------- mobilmeny: :target-panel, ingen klient-JS ---------- */}
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

      {/* Stängningsankaret ligger fast i vyn, så när :target släpper flyttas
          inte skrollpositionen en pixel. Delas med mobilmenyn och modalen. */}
      <span className={styles.stangdAnkare} id="stangd" />

      {/* ---------- kontakt-popup, helt utan JS ----------
          Entrén är en CSS-animation med fördröjning, stängningen ett
          checkbox-mönster. Vid prefers-reduced-motion visas den inte alls — en
          ruta som dyker upp av sig själv ÄR rörelse. */}
      <input
        type="checkbox"
        id="popup-bort"
        className={styles.popupBort}
        aria-hidden="true"
        tabIndex={-1}
      />
      <aside className={styles.popup} aria-label="Kontakta Shabifix">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>
          ✕
        </label>
        <p className={styles.popupEyebrow}>Ska något göras hemma?</p>
        <p className={styles.popupTxt}>
          Hembesöket kostar ingenting. Du får ett ärligt besked om vad jobbet kräver innan du
          bestämmer något.
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
          fokusfälla, och en sida ska inte lova hjälpmedel något den inte gör. */}
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Shabifix se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag. Ingen beställning, inget åtagande. Vill ni se den
            skarpt med era egna projektbilder och ett formulär som landar i inkorgen? Boka ett
            kostnadsfritt 15-minuterssamtal med Mathias.
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
            href="mailto:mathias@bahkobyra.se?subject=Shabifix%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
