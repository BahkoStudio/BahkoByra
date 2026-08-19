import Image from 'next/image';
import { Archivo } from 'next/font/google';
import styles from './glowingservice.module.css';

/* ===========================================================================
   GLOWING SERVICE — kostnadsfritt hemsideförslag från Bahko Byrå
   Recopy på SV Hus-mallen (demo-recopy-skillen), 2026-08-19.

   Bakgrund: den första demon byggdes som STÄDFIRMA — fel nisch. Yoros eget
   svar i IG-chatten: "Hej vi städar inte målar bara." Den här sidan är den
   utlovade, skräddarsydda ersättaren: måleri, inget annat.
   Gamla länken /cloud/glowingservice/ pekas hit med redirect — bryts aldrig.

   VERIFIERAT (allt sidan får påstå):
   företagsnamnet Glowing Service · enbart måleri (Yoros ord) · kontaktperson
   Yoro · Instagram-företagskonto. INGEN ort (gamla "Stockholm" var en gissning
   och är borttagen — Mathias beslut 2026-08-19), ingen historik, inga siffror.
   Telefonnumret är PLATSHÅLLARE (070-123 45 67) enligt skill-konventionen.
   Fast pris/en kontakt är ERBJUDANDE-förslag i mallens form, inte historik.
   Bilder/video är lånat demomaterial — märkta Illustration.

   Noll egen klient-JS: modal och mobilmeny via :target, popup via CSS-delay +
   checkbox, FAQ via <details name>. */

const ui = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--gs-ui',
});

export const metadata = {
  title: 'Glowing Service — måleri som känns nytt, inte nästan bra',
  description:
    'Glowing Service målar om — inne och ute. Fast pris innan start och en kontakt hela vägen. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-123 45 67';
const TEL_HREF = 'tel:0701234567';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi målar' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför Glowing' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const TJANSTER = [
  { nr: '01', namn: 'Måleri inne', text: 'Väggar, tak och lister. Tvättat, spacklat och grundat innan en droppe färg — det är underarbetet som avgör hur länge det håller.', punkter: ['Väggar och tak', 'Lister och foder', 'Underarbetet ingår alltid'] },
  { nr: '02', namn: 'Måleri ute', text: 'Fasader, fönster och detaljer. Skrapat, tvättat och grundat så färgen fäster — inte bara ett nytt lager ovanpå det gamla.', punkter: ['Fasader', 'Fönster och dörrar', 'Skrapning och grundning'] },
  { nr: '03', namn: 'Tapet och spackel', text: 'Släta väggar att tapetsera eller måla på. Vi lagar sprickor och hål i stället för att gömma dem.', punkter: ['Tapetsering', 'Bredspackling', 'Lagning av sprickor'] },
  { nr: '04', namn: 'Snickerimålning', text: 'Dörrar, karmar och köksluckor. De ytor man tar i varje dag — och där slarv syns först.', punkter: ['Dörrar och karmar', 'Köksluckor', 'Trappräcken'] },
];

const STEG = [
  { nr: '1', namn: 'Berätta om jobbet', text: 'Ring eller skriv några rader om vad som ska målas. Bilder räcker långt — du behöver inte kunna facktermerna.' },
  { nr: '2', namn: 'Fast pris innan start', text: 'Du får priset skriftligt innan något börjar. Inga tillägg under jobbets gång.' },
  { nr: '3', namn: 'Vi målar klart', text: 'Underarbetet först — tvätt, spackel, grund. Vi täcker golv och möbler och lämnar rent efter oss varje dag.' },
  { nr: '4', namn: 'Genomgång i dagsljus', text: 'Vi synar ytorna tillsammans med dig innan vi packar ihop. Missat något? Då tar vi det direkt.' },
];

const SKAL = [
  { rubrik: 'Fast pris innan start', text: 'Skriftligt innan vi börjar. Priset står sig — inga tillägg när vi väl är på plats.' },
  { rubrik: 'En kontakt hela vägen', text: 'Samma person från första meddelandet till sista strykningen. Du behöver aldrig jaga någon.' },
  { rubrik: 'Underarbetet ingår alltid', text: 'Tvätt, spackel och grund är inte tillval. Det är skillnaden mellan nymålat som håller och nymålat som flagnar.' },
  { rubrik: 'Vi täcker och lämnar rent', text: 'Golv, möbler och trösklar täcks innan vi öppnar en burk. Du ska kunna bo som vanligt.' },
];

const FRAGOR = [
  { q: 'Vad kostar det att måla om?', a: 'Det beror på ytorna och skicket, så vi gissar inte i telefon. Skicka några bilder eller be oss titta — du får ett fast pris skriftligt innan något börjar.' },
  { q: 'Måste jag flytta ut möblerna?', a: 'Nej. Vi täcker golv och möbler och flyttar det som behöver flyttas. Du ska kunna bo som vanligt medan vi målar.' },
  { q: 'Hur lång tid tar ett rum?', a: 'Det avgörs av underarbetet — ett rum med fina väggar går fort, ett med sprickor och gammal tapet tar längre. Du får en tidsuppskattning tillsammans med priset.' },
  { q: 'Målar ni ute också?', a: 'Ja. Fasader, fönster och snickerier — med skrapning, tvätt och grundning innan färgen, så den fäster på riktigt.' },
  { q: 'Vad händer om något blir fel?', a: 'Vi går igenom alla ytor tillsammans i dagsljus innan vi lämnar. Hittar du något efteråt hör du av dig till samma person du haft hela vägen.' },
];

export default function GlowingServiceDemo() {
  return (
    <div className={`${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <b>
              GLOWING<i>.</i>
            </b>
            <span>Måleri</span>
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
            <p className={styles.eyebrow}>Måleri — inne och ute</p>
            <h1 className={styles.h1}>
              Nymålat ska kännas nytt.
              <br />
              <em>Inte se nästan bra ut.</em>
            </h1>
            <div className={styles.heroCta}>
              <a className={styles.btn} href={TEL_HREF}>
                Ring {TEL}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#kontakt">
                Skicka bilder på jobbet
              </a>
            </div>
          </div>
          <figure className={styles.heroFilm}>
            <video autoPlay muted loop playsInline preload="metadata" poster="/glowingservice/media/poster-efter-nymalat.jpg" width={1920} height={1084}>
              <source src="/glowingservice/media/video-renoveringen.mp4" type="video/mp4" />
            </video>
            <figcaption className={styles.bildEtikett}>Illustration — era projektbilder läggs in här</figcaption>
          </figure>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här ingår">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Måleri inne</span>
              <span>Måleri ute</span>
              <span>Tapet och spackel</span>
              <span>Snickerimålning</span>
              <span>Fast pris innan start</span>
              <span>En kontakt hela vägen</span>
              <span>Underarbetet ingår alltid</span>
              <span>Vi täcker och lämnar rent</span>
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
              Slitna väggar, gamla spackelmärken, färg som tröttnat — vägen är densamma: tvätta, laga, grunda, måla. I den ordningen, varje gång.
            </p>
          </div>
          <div className={styles.forvandling}>
            <figure>
              <Image src="/glowingservice/media/poster-fore-sliten-vagg.jpg" alt="Rum med slitna väggar och gamla spackelmärken, före arbetet" width={1920} height={1084} />
              <figcaption>
                <b>Före</b>
              </figcaption>
            </figure>
            <figure>
              <Image src="/glowingservice/media/poster-efter-nymalat.jpg" alt="Samma rum nymålat, efter arbetet" width={1920} height={1084} />
              <figcaption>
                <b>Efter</b>
              </figcaption>
            </figure>
          </div>
          <p className={styles.illNot}>Illustrationsbilder — byts mot Glowing Services egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi målar</p>
            <h2 className={styles.h2}>
              Bara måleri. <em>Därför blir det rätt.</em>
            </h2>
            <p className={styles.sekLead}>
              Vi gör en sak och gör den ordentligt: underarbetet först, färgen sen. Det är därför resultatet håller.
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
              <p className={styles.eyebrow}>Varför Glowing Service</p>
              <h2 className={styles.h2}>
                Underarbetet syns inte. <em>Resultatet gör det.</em>
              </h2>
              <p className={styles.sekLead}>
                Skillnaden mellan ett måleri som håller och ett som flagnar avgörs innan färgen öppnas. Därför lägger vi tiden där — och synar allt med dig i dagsljus innan vi lämnar.
              </p>
              <figure className={styles.varforBild}>
                <Image src="/glowingservice/media/galleri-detalj-skarpt-snitt.jpg" alt="Närbild på skarpt målat snitt mellan vägg och tak" width={1920} height={1084} />
                <figcaption className={styles.bildEtikett}>Snittet — där man ser vem som tejpat</figcaption>
              </figure>
              <a className={styles.btn} href="#kontakt">
                Skicka bilder på jobbet
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
              Det du undrar <em>innan du hör av dig</em>
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
                Skicka några bilder, <em>så säger vi vad det kostar.</em>
              </h2>
              <p className={styles.sekLead}>
                Berätta vad som ska målas — bilder räcker långt. Du får ett fast pris skriftligt, och det förbinder dig inte till något.
              </p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Kontakt</span>
                  <b>Yoro</b>
                </div>
                <div className={styles.kontaktRad}>
                  <span>Instagram</span>
                  <b>@glowingservice</b>
                </div>
              </div>
            </div>
            <form className={styles.form} action="mailto:mathias@bahkobyra.se?subject=Glowing%20Service%20-%20f%C3%B6rfr%C3%A5gan" method="post" encType="text/plain">
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
                <select name="typ" defaultValue="Måleri inne">
                  <option>Måleri inne</option>
                  <option>Måleri ute</option>
                  <option>Tapet och spackel</option>
                  <option>Snickerimålning</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om jobbet
                <textarea name="meddelande" rows={4} placeholder="Rum eller fasad, ungefärlig storlek, när du vill börja" />
              </label>
              <button type="submit" className={styles.btn}>
                Skicka förfrågan
              </button>
              <p className={styles.formNot}>
                I det här förslaget går raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret till Glowing Services egen inkorg.
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
                  GLOWING<i>.</i>
                </b>
                <span>Måleri — inne och ute</span>
              </a>
              <p className={styles.ftrText}>
                Bara måleri, gjort ordentligt: underarbetet först, fast pris innan start och en kontakt hela vägen.
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
            <span>© 2026 Glowing Service · Demo</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Glowing Service">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>
          ✕
        </label>
        <p className={styles.popupEyebrow}>Dags att måla om?</p>
        <p className={styles.popupTxt}>Skicka några bilder på ytorna — du får ett fast pris skriftligt innan något börjar.</p>
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
          <h3 id="bahko-rubrik">Så här kan Glowing Service se ut</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt för måleri — inget annat. Ingen beställning, inget åtagande. Vill du se den skarpt med dina egna projektbilder och formulär som landar i din inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.
          </p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">
            Boka 15 min gratis samtal →
          </a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Glowing%20Service%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
