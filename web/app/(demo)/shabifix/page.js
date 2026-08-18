import Image from 'next/image';
import { Archivo } from 'next/font/google';
import styles from './shabifix.module.css';

/* ===========================================================================
   SHABIFIX — kostnadsfritt hemsideförslag från Bahko Byrå
   Omgjord 2026-08-18 enligt SV Hus-mallen (hemsidor-skillen), Mathias
   beställning: allt i Next.js, ta bara med det nödvändiga.

   Gamla adressen /cloud/shabifix/ är skickad till prospekt och pekas om hit
   med redirect i next.config.mjs — länken bryts aldrig.

   VERIFIERAT (allt sidan får påstå, ur ursprungsdemon):
   hantverksfirma i Västra Frölunda · bygg, snickeri och måleri i ett ·
   Göteborg med omnejd · fast pris skriftligt innan start, uppdelat per rum
   eller moment · en kontakt hela vägen · täcker och städar varje dag ·
   kostnadsfritt hembesök · hellre ett ärligt nej än ett halvfärdigt jobb.
   Telefonnumret är PLATSHÅLLARE (070-123 45 67) enligt skill-konventionen.
   Bilder/video är demomaterial — märkta Illustration, aldrig "våra projekt".

   Noll egen klient-JS, precis som förlagan: modal och mobilmeny via :target,
   popup via CSS-delay + checkbox, FAQ via <details name>. */

const ui = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--sh-ui',
});

export const metadata = {
  title: 'Shabifix — en hantverkare, hela jobbet. Bygg, snickeri och måleri i Göteborg',
  description:
    'Shabifix i Västra Frölunda tar bygg, snickeri och måleri i ett. Fast pris innan start, en kontakt hela vägen. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-123 45 67';
const TEL_HREF = 'tel:0701234567';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför Shabifix' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const TJANSTER = [
  { nr: '01', namn: 'Måleri', text: 'Väggar, tak och snickerier — tvättat, spacklat, grundat och målat, så det står sig.', punkter: ['Inne och ute', 'Underarbetet ingår alltid', 'Skarpa snitt'] },
  { nr: '02', namn: 'Snickeri', text: 'Lister, dörrar och inredning. Passning som syns — och som ingen behöver rätta till efteråt.', punkter: ['Lister och foder', 'Dörrar', 'Platsbyggd inredning'] },
  { nr: '03', namn: 'Bygg och renovering', text: 'Rum för rum: golv, väggar och ytskikt. Ett jobb i taget, och det görs klart.', punkter: ['Golv och väggar', 'Ytskikt', 'Rivning och underarbete'] },
  { nr: '04', namn: 'Montering', text: 'Kök och förvaring. Rakt, tyst och fastskruvat — första gången.', punkter: ['Kök', 'Garderober och förvaring', 'Vitvaror på plats'] },
];

const STEG = [
  { nr: '1', namn: 'Kostnadsfritt hembesök', text: 'Vi tittar, mäter och säger ärligt vad som behöver göras. Passar jobbet inte oss säger vi det på plats.' },
  { nr: '2', namn: 'Fast pris skriftligt', text: 'Priset innan vi börjar, uppdelat per rum eller moment. Inga tillägg under jobbets gång.' },
  { nr: '3', namn: 'Jobbet görs klart', text: 'Täckning, rivning och underarbete först — det är där ett hantverksjobb vinns eller förloras. Vi städar varje dag.' },
  { nr: '4', namn: 'Genomgång i dagsljus', text: 'Vi går igenom allt med dig innan vi packar ihop. Missat något? Då tar vi det.' },
];

const SKAL = [
  { rubrik: 'Fast pris innan start', text: 'Skriftligt och uppdelat per rum eller moment, innan vi börjar. Inga tillägg under jobbets gång.' },
  { rubrik: 'En kontakt hela vägen', text: 'Samma person från hembesöket till genomgången. Du behöver aldrig jaga tre firmor.' },
  { rubrik: 'Vi täcker och städar varje dag', text: 'Du bor kvar under jobbet. Då ska hemmet gå att leva i — varje kväll.' },
  { rubrik: 'Hellre ett ärligt nej', text: 'Passar jobbet inte oss säger vi det på plats. Ett halvfärdigt jobb är dyrare än ett ärligt besked.' },
];

const FRAGOR = [
  { q: 'Vad kostar det?', a: 'Det beror på rummet och skicket, och därför gissar vi aldrig i telefon. Hembesöket kostar ingenting, och du får ett fast pris skriftligt — uppdelat per rum eller moment — innan något börjar.' },
  { q: 'Blir det verkligen inga tillägg?', a: 'Priset du får innan start är priset du betalar. Dyker något oväntat upp bakom en vägg pratar vi om det innan något görs — du bestämmer, ingenting läggs på i efterhand.' },
  { q: 'Kan vi bo kvar under jobbet?', a: 'Ja, det är det vanligaste. Vi täcker och städar varje dag vi är hos dig, så hemmet går att leva i varje kväll.' },
  { q: 'Tar ni små jobb?', a: 'Ja. Ett rum, en dörr eller en lista är också ett jobb. Vi tar ett i taget och gör det klart.' },
  { q: 'Var jobbar ni?', a: 'Vi utgår från Västra Frölunda och tar jobb i Göteborg med omnejd.' },
];

export default function ShabifixDemo() {
  return (
    <div className={`${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <b>
              SHABIFIX<i>.</i>
            </b>
            <span>Västra Frölunda</span>
          </a>
          <nav className={styles.nav}>
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>
                {l.txt}
              </a>
            ))}
          </nav>
          <a className={styles.hdrTel} href={TEL_HREF}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {TEL}
          </a>
          <a className={styles.menyKnapp} href="#meny">
            Meny
          </a>
        </div>
      </header>

      {/* Mobilmenyn stänger sig själv: väljer man en sektion byter hashen och :target släpper */}
      <div className={styles.mnav} id="meny">
        <nav>
          {LANKAR.map((l) => (
            <a href={l.href} key={l.href}>
              {l.txt}
            </a>
          ))}
          <a href="#kontakt">Kontakt</a>
          <a className={styles.mnavStang} href="#stangd">
            Stäng menyn
          </a>
        </nav>
      </div>
      <span id="stangd" className={styles.stangdAnkare} />

      <section className={styles.hero} id="top">
        <div className={styles.heroIn}>
          <div>
            <p className={styles.eyebrow}>Bygg · Snickeri · Måleri — Göteborg</p>
            <h1 className={styles.h1}>
              Renovering brukar kräva tre firmor.
              <br />
              <em>Här räcker en.</em>
            </h1>
            <div className={styles.heroCta}>
              <a className={styles.btn} href={TEL_HREF}>
                Ring {TEL}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#kontakt">
                Be oss titta på jobbet
              </a>
            </div>
          </div>
          <figure className={styles.heroFilm}>
            <video autoPlay muted loop playsInline preload="metadata" poster="/shabifix/media/poster-efter-nymalat.jpg" width={1376} height={768}>
              <source src="/shabifix/media/video-forvandlingen.mp4" type="video/mp4" />
            </video>
            <figcaption className={styles.bildEtikett}>Illustration — era projektbilder läggs in här</figcaption>
          </figure>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här ingår">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Måleri</span>
              <span>Snickeri</span>
              <span>Bygg och renovering</span>
              <span>Montering</span>
              <span>Fast pris innan start</span>
              <span>En kontakt hela vägen</span>
              <span>Vi täcker och städar varje dag</span>
              <span>Kostnadsfritt hembesök</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>
              Från det här. <em>Till det här.</em>
            </h2>
            <p className={styles.sekLead}>
              Färg som släppt i söderläge, eller ett rum som tröttnat — vägen är densamma: tvätta, laga, grunda, måla. Och samma händer genom hela jobbet.
            </p>
          </div>
          <div className={styles.forvandling}>
            <figure>
              <Image src="/shabifix/media/galleri-fore-villa-flagnande.jpg" alt="Villa med flagnande färg, före arbetet" width={1376} height={860} />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image src="/shabifix/media/galleri-efter-villa-antracit.jpg" alt="Samma villa nymålad i antracit, efter arbetet" width={1376} height={860} />
              <figcaption>
                <b>Efter</b>
              </figcaption>
            </figure>
          </div>
          <p className={styles.illNot}>Illustrationsbilder — byts mot Shabifix egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              En hantverkare. <em>Hela jobbet.</em>
            </h2>
            <p className={styles.sekLead}>
              Du slipper jaga tre firmor och jämka tre tidplaner. Samma händer river, bygger, snickrar och målar tills rummet är klart.
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

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Så går det till</p>
            <h2 className={styles.h2}>
              Fyra steg, <em>inga överraskningar</em>
            </h2>
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

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.varforGrid}>
            <div>
              <p className={styles.eyebrow}>Varför Shabifix</p>
              <h2 className={styles.h2}>
                Samma händer, <em>från rivning till sista listen</em>
              </h2>
              <p className={styles.sekLead}>
                Vi tar ett jobb i taget och gör det klart. Du har samma kontakt från första besöket tills sista listen sitter, och vi täcker och städar varje dag vi är hos dig.
              </p>
              <figure className={styles.varforBild}>
                <Image src="/shabifix/media/galleri-detalj-skarpt-snitt.jpg" alt="Närbild på skarpt målat snitt mellan vägg och tak" width={1200} height={826} />
                <figcaption className={styles.bildEtikett}>Snittet — där man ser vem som tejpat</figcaption>
              </figure>
              <a className={styles.btn} href="#kontakt">
                Be oss titta på jobbet
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

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>
              Det du undrar <em>innan du ringer</em>
            </h2>
          </div>
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
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>
                Ring, <em>eller be oss titta.</em>
              </h2>
              <p className={styles.sekLead}>
                Vi kommer ut, tittar på jobbet och lämnar ett fast pris skriftligt. Kostar ingenting och förbinder dig inte till något.
              </p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Område</span>
                  <b>Göteborg med omnejd</b>
                </div>
                <div className={styles.kontaktRad}>
                  <span>Bas</span>
                  <b>Västra Frölunda</b>
                </div>
              </div>
            </div>
            <form className={styles.form} action="mailto:mathias@bahkobyra.se?subject=Shabifix%20-%20f%C3%B6rfr%C3%A5gan" method="post" encType="text/plain">
              <label>
                Namn
                <input type="text" name="namn" autoComplete="name" required />
              </label>
              <label>
                Telefon
                <input type="tel" name="telefon" autoComplete="tel" required />
              </label>
              <label>
                Vad gäller det?
                <select name="typ" defaultValue="Måleri">
                  <option>Måleri</option>
                  <option>Snickeri</option>
                  <option>Bygg och renovering</option>
                  <option>Montering</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om jobbet
                <textarea name="meddelande" rows={4} placeholder="Rum, ungefärlig storlek, när du vill börja" />
              </label>
              <button type="submit" className={styles.btn}>
                Skicka förfrågan
              </button>
              <p className={styles.formNot}>
                I det här förslaget går raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret till Shabifix egen inkorg.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div>
              <a className={styles.brand} href="#top">
                <b>
                  SHABIFIX<i>.</i>
                </b>
                <span>Bygg · Snickeri · Måleri</span>
              </a>
              <p className={styles.ftrText}>
                En hantverkare för hela jobbet. Fast pris innan start, en kontakt hela vägen, och vi täcker och städar varje dag. Västra Frölunda, Göteborg med omnejd.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => (
                <a href={l.href} key={l.href}>
                  {l.txt}
                </a>
              ))}
              <a href={TEL_HREF}>{TEL}</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>© 2026 Shabifix · Västra Frölunda · Demo</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* kontakt-popup: CSS-delay + checkbox, ingen JS */}
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Shabifix">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>
          ✕
        </label>
        <p className={styles.popupEyebrow}>Funderar du på ett jobb?</p>
        <p className={styles.popupTxt}>Be oss titta — hembesöket kostar ingenting och du får ett fast pris skriftligt innan något börjar.</p>
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
        <a className={styles.modalSkugga} href="#stangd" aria-label="Stäng" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Shabifix se ut</h3>
          <p>
            Det här är ett kostnadsfritt förslag. Ingen beställning, inget åtagande. Vill du se den skarpt med dina egna projektbilder och formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.
          </p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">
            Boka 15 min gratis samtal →
          </a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Shabifix%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
