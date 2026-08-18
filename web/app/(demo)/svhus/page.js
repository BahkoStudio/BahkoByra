import { Newsreader, Inter } from 'next/font/google';
import styles from './svhus.module.css';

/* ===========================================================================
   SV HUS AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: svhus.se · Österåker · projekt i hela Sverige

   ALLT innehåll nedan kommer från kundens eget material (svhus.se) eller
   offentliga register. Inga påhittade projekt, priser, betyg eller referenser
   — en demo som ljuger om kunden går inte att skicka.
   Verifierat: org.nr 559499-4062, säte Österåker, 070-448 59 28, AMA-standard,
   "ansvarar för allt från arkitekt och bygglov till byggnation och koordinering
   av alla hantverkare", energieffektiva material, tidlös design.

   Teknik (Mathias krav: "allting optimerat och next.js"):
   - Server-renderad, NOLL klient-JS. Modalen körs på :target, inte på script.
   - Fonterna självhostas av next/font — ingen extern förfrågan i kritisk väg.
   - Rörelsen ligger i scroll-driven CSS (animation-timeline) med synligt
     utgångsläge, så sidan är komplett även där stödet saknas.
   =========================================================================== */

const display = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--sv-display',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--sv-ui',
});

export const metadata = {
  title: 'SV Hus AB — vi tar hela vägen från ritning till inflytt',
  description:
    'SV Hus AB bygger och renoverar hus i hela Sverige. Vi ansvarar för allt: arkitekt, bygglov, byggnation och samordning av hantverkarna. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-448 59 28';
const TEL_HREF = 'tel:+46704485928';

const TJANSTER = [
  {
    nr: '01',
    namn: 'Nybyggnation',
    text:
      'Nytt hus från tomt till nyckel. Vi håller ihop arkitekt, konstruktör, bygglov och alla yrkesgrupper, så att du har en part att ringa i stället för elva.',
    punkter: ['Arkitekt och konstruktion', 'Bygglov och kontrollansvarig', 'Grund till inflyttning'],
  },
  {
    nr: '02',
    namn: 'Totalrenovering',
    text:
      'Hela huset, planlösningen inräknad. Vi öppnar upp, bygger nytt bakom ytan och lämnar ett hus som fungerar för hur ni lever nu — inte för hur någon annan levde 1974.',
    punkter: ['Nya planlösningar', 'Kök och badrum', 'Stammar, el och ventilation'],
  },
  {
    nr: '03',
    namn: 'Till- och påbyggnad',
    text:
      'Ett rum mer, en våning till eller den uteplats som gör huset dubbelt så användbart. Vi räknar på vad konstruktionen tillåter innan vi ritar något.',
    punkter: ['Tillbyggnad och altan', 'Inredd övervåning', 'Garage och komplementhus'],
  },
  {
    nr: '04',
    namn: 'Projektledning och bygglov',
    text:
      'Har ni ritningarna men inte tiden? Vi tar rollen som byggherrens förlängda arm: handlingar, upphandling, tidplan och kontrollen av att det som byggs är det som beställdes.',
    punkter: ['Bygglovshandlingar', 'Upphandling av hantverkare', 'Tidplan och besiktning'],
  },
];

const STEG = [
  {
    nr: '1',
    namn: 'Första samtalet',
    text: 'Vi går igenom vad ni vill göra, vad tomten och huset tillåter, och vad det rimligen landar på. Kostar ingenting och binder ingenting.',
  },
  {
    nr: '2',
    namn: 'Ritning och kalkyl',
    text: 'Arkitekt och konstruktör tar fram handlingarna. Ni får en kalkyl som är uppdelad post för post, inte en klumpsumma.',
  },
  {
    nr: '3',
    namn: 'Bygglov',
    text: 'Vi sammanställer och lämnar in handlingarna och sköter kontakten med kommunen och kontrollansvarig fram till startbesked.',
  },
  {
    nr: '4',
    namn: 'Byggnation',
    text: 'Vi bygger enligt svensk AMA-standard och samordnar alla yrkesgrupper. Ni har en kontaktperson och en tidplan som hålls uppdaterad.',
  },
  {
    nr: '5',
    namn: 'Överlämning',
    text: 'Besiktning, genomgång och dokumentation. Vi lämnar över ett hus som är klart, inte ett hus med en lista över vad som återstår.',
  },
];

const SKAL = [
  {
    rubrik: 'En part för hela bygget',
    text:
      'Från arkitekt och bygglov till byggnation och samordning av hantverkarna. Du slipper vara projektledare för ditt eget hus på kvällarna.',
  },
  {
    rubrik: 'Byggt enligt AMA',
    text:
      'Vi bygger enligt svensk AMA-standard. Det är branschens beskrivningssystem, och det är skillnaden mellan att något ser färdigt ut och att det är rätt gjort.',
  },
  {
    rubrik: 'Material som håller',
    text:
      'Energieffektiva material och hållbara konstruktioner. Vi väljer det som står sig genom generationer framför det som är billigast i upphandlingen.',
  },
  {
    rubrik: 'Traditionellt hantverk, moderna lösningar',
    text:
      'Företaget började som ett litet team med stor passion för byggande. Det som har vuxit är projekten och räckvidden, inte avståndet till kunden.',
  },
];

const FRAGOR = [
  {
    q: 'Sköter ni bygglovet?',
    a: 'Ja. Vi sammanställer handlingarna, lämnar in ansökan och håller kontakten med kommunen och kontrollansvarig fram till startbesked. Det ingår i att vi ansvarar för hela vägen.',
  },
  {
    q: 'Vad kostar det att bygga nytt?',
    a: 'Det avgörs av tomten, storleken och vilken nivå ni vill ha på material och inredning. Därför börjar vi med ett samtal och en kalkyl som är uppdelad post för post, så att ni ser vad varje del kostar innan något är beslutat.',
  },
  {
    q: 'Hur lång tid tar ett projekt?',
    a: 'En tillbyggnad räknas i veckor, ett nytt hus i månader, och bygglovet är ofta den del som styr starten mest. Ni får en tidplan när ritningarna är klara, och den hålls uppdaterad under bygget.',
  },
  {
    q: 'Arbetar ni utanför Stockholmsområdet?',
    a: 'Ja. Vi har vårt säte i Österåker och driver projekt över hela Sverige.',
  },
  {
    q: 'Vem är min kontaktperson?',
    a: 'En och samma person genom hela projektet. Du behöver aldrig ringa runt bland yrkesgrupperna för att få veta var bygget står.',
  },
];

export default function SvHusDemo() {
  return (
    <div className={`${display.variable} ${ui.variable} ${styles.sida}`}>
      {/* ---------- header ---------- */}
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M4 15L16 5l12 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 14v13h18V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.brandTxt}>
              <b>SV Hus</b>
              <i>Österåker</i>
            </span>
          </a>

          <nav className={styles.nav}>
            <a href="#tjanster">Vad vi gör</a>
            <a href="#process">Så går det till</a>
            <a href="#varfor">Varför SV Hus</a>
            <a href="#fragor">Frågor</a>
          </nav>

          <a className={styles.hdrTel} href={TEL_HREF}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {TEL}
          </a>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className={styles.hero} id="top">
        {/* Ritningen bakom rubriken: husets sektion i linjer. Ren SVG, så den
            är skarp i alla upplösningar och väger ingenting. */}
        <svg className={styles.ritning} viewBox="0 0 900 620" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1">
            <path d="M90 470h720M90 470V250l360-170 360 170v220" />
            <path d="M170 470V300h180v170M170 300h180" />
            <path d="M470 470V330h250v140M470 400h250M595 330v140" />
            <path d="M450 80v390" strokeDasharray="6 10" />
            <path d="M90 250h720" strokeDasharray="6 10" />
            <circle cx="450" cy="80" r="5" />
            <path d="M60 470h-25M60 250h-25M35 250v220" />
          </g>
        </svg>

        <div className={styles.heroIn}>
          <p className={styles.eyebrow}>Österåker · projekt i hela Sverige</p>
          <h1 className={styles.h1}>
            Vi tar hela vägen
            <br />
            <em>från ritning till inflytt.</em>
          </h1>
          <p className={styles.heroLead}>
            SV Hus bygger och renoverar hus åt familjer som vill ha ett bygge som går att lita på. Vi
            ansvarar för allt: arkitekt, bygglov, byggnation och samordningen av alla hantverkare. Du
            har en part att ringa, och en tidplan som håller.
          </p>
          <div className={styles.heroCta}>
            <a className={styles.btn} href={TEL_HREF}>
              Ring {TEL}
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#kontakt">
              Boka ett platsbesök
            </a>
          </div>
          <p className={styles.heroMikro}>
            Kostnadsfritt första samtal · Byggt enligt svensk AMA-standard · SV Hus AB, org.nr
            559499-4062
          </p>
        </div>
      </section>

      {/* ---------- förtroenderad ---------- */}
      <div className={styles.remsa}>
        <div className={styles.remsaIn}>
          <span>Arkitekt till nyckel</span>
          <span>Bygglov och kontrollansvarig</span>
          <span>Svensk AMA-standard</span>
          <span>Energieffektiva material</span>
          <span>En kontaktperson hela vägen</span>
        </div>
      </div>

      {/* ---------- tjänster ---------- */}
      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Fyra sätt vi tar hand om <em>ett hus</em>
            </h2>
            <p className={styles.sekLead}>
              Vare sig det står färdigt om ett år eller behöver rivas ut i vår: samma
              ansvar, samma standard, samma kontaktperson.
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
              Det vanligaste som går fel i ett husprojekt är inte hantverket. Det är
              glappen mellan yrkesgrupperna. Därför står vi för hela kedjan.
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
              <p className={styles.eyebrow}>Varför SV Hus</p>
              <h2 className={styles.h2}>
                Hus som står sig <em>genom generationer</em>
              </h2>
              <p className={styles.sekLead}>
                SV Hus började med en enkel idé: att förena traditionellt byggande med
                moderna lösningar och personlig service. Våra projekt planeras med
                långsiktighet i fokus, och vi bygger relationer som är lika starka som
                husen vi uppför.
              </p>
              <a className={styles.btn} href="#kontakt">
                Prata med oss om ditt projekt
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
            <h2 className={styles.h2}>Det ni brukar fråga först</h2>
          </div>

          <div className={styles.fragor}>
            {FRAGOR.map((f) => (
              <details className={styles.fraga} key={f.q}>
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

      {/* ---------- kontakt ---------- */}
      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>
                Berätta vad ni vill bygga.
                <br />
                <em>Vi säger vad som krävs.</em>
              </h2>
              <p className={styles.sekLead}>
                Första samtalet kostar ingenting och binder ingenting. Ring, eller skriv
                några rader om projektet, så hör vi av oss.
              </p>

              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}>
                  <span>Telefon</span>
                  <b>{TEL}</b>
                </a>
                <div className={styles.kontaktRad}>
                  <span>Säte</span>
                  <b>Österåker</b>
                </div>
                <div className={styles.kontaktRad}>
                  <span>Organisationsnummer</span>
                  <b>559499-4062</b>
                </div>
              </div>
            </div>

            {/* Formuläret är avsiktligt inte kopplat i demon — den riktiga
                sajten får en e-post- eller CRM-koppling. */}
            <form className={styles.form} action={`mailto:info@svhus.se`} method="post">
              <label>
                Namn
                <input type="text" name="namn" autoComplete="name" required />
              </label>
              <label>
                Telefon
                <input type="tel" name="telefon" autoComplete="tel" required />
              </label>
              <label>
                Vad handlar det om?
                <select name="typ" defaultValue="Nybyggnation">
                  <option>Nybyggnation</option>
                  <option>Totalrenovering</option>
                  <option>Till- eller påbyggnad</option>
                  <option>Projektledning och bygglov</option>
                  <option>Något annat</option>
                </select>
              </label>
              <label>
                Kort om projektet
                <textarea name="meddelande" rows={4} placeholder="Tomt, hus, ungefärlig storlek, när ni vill börja" />
              </label>
              <button type="submit" className={styles.btn}>
                Skicka förfrågan
              </button>
              <p className={styles.formNot}>
                Vi svarar samma eller nästa arbetsdag. Inga massutskick, ingen säljlista.
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
                <b>SV Hus AB</b>
                <i>Nybyggnation och renovering</i>
              </span>
              <p className={styles.ftrText}>
                Vi ansvarar för hela vägen: arkitekt, bygglov, byggnation och samordning av
                hantverkarna. Säte i Österåker, projekt i hela Sverige.
              </p>
            </div>
            <div className={styles.ftrLankar}>
              <a href="#tjanster">Vad vi gör</a>
              <a href="#process">Så går det till</a>
              <a href="#varfor">Varför SV Hus</a>
              <a href="#fragor">Frågor</a>
              <a href={TEL_HREF}>{TEL}</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>© 2026 SV Hus AB · Org.nr 559499-4062</span>
            <span>
              Förslag byggt av{' '}
              <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">
                Bahko Byrå
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ---------- Bahko: demo-märkning, helt utan JS ----------
          Öppnas med :target. Ingen hydrering, inget script, fungerar även
          om allt annat fallerar. */}
      <a className={styles.demoKnapp} href="#bahko-demo">
        Om det här förslaget
      </a>

      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#top" aria-label="Stäng" />
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#top" aria-label="Stäng">
            ✕
          </a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan SV Hus se ut på nätet</h3>
          <p>
            Det här är ett kostnadsfritt förslag, byggt på ert eget material. Ingen
            beställning, inget åtagande. Vill ni se den skarpt med era egna projektbilder
            och formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal
            med Mathias.
          </p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">
            Boka 15 min gratis samtal →
          </a>
          <a
            className={styles.modalAlt}
            href="mailto:mathias@bahkobyra.se?subject=SV%20Hus%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida"
          >
            Eller mejla → mathias@bahkobyra.se
          </a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </div>
      </div>
    </div>
  );
}
