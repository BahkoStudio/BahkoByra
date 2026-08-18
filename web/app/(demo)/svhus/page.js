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
   - Server-renderad, INGEN EGEN klient-JS: modalen, menyn och dragspelet körs
     på :target och <details>, inte på script. (App Router-runtimen från Next
     följer däremot med sidan — ska de kilobyten bort är enda vägen att
     leverera SV Hus som statisk fil i web/public/cloud/svhus/ likt övriga demos.)
   - Fonterna självhostas av next/font — ingen extern förfrågan i kritisk väg.
     Kursiven ligger i en egen instans med preload: false: den används bara i
     ett par rubrikord och ska inte belasta första renderingen.
   - Rörelsen ligger i scroll-driven CSS (animation-timeline) med synligt
     utgångsläge, så sidan är komplett även där stödet saknas.
   =========================================================================== */

const display = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--sv-display',
});

/* Kursiven: egen instans, hämtas först när den behövs. */
const displayKursiv = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--sv-display-kursiv',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--sv-ui',
});

export const metadata = {
  title: 'SV Hus AB — ni bygger ett hus en gång',
  description:
    'SV Hus AB bygger och renoverar hus i hela Sverige. Vi ansvarar för allt: arkitekt, bygglov, byggnation och samordning av hantverkarna. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-448 59 28';
const TEL_HREF = 'tel:+46704485928';

/* En källa för navigationen: header, mobilmeny och footer läser samma lista. */
const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför SV Hus' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const TJANSTER = [
  {
    nr: '01',
    namn: 'Nybyggnation',
    text:
      'Nytt hus från tomt till nyckel. Vi håller ihop arkitekt, konstruktör, bygglov och alla yrkesgrupper, så att ni har en part som svarar för helheten.',
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
    text: 'Vi går igenom vad ni vill göra, vad tomten och huset tillåter och vad de olika delarna av bygget innebär. Ni behöver inga färdiga ritningar för att ta det samtalet.',
  },
  {
    nr: '2',
    namn: 'Ritning och kalkyl',
    text: 'Arkitekt och konstruktör tar fram handlingarna, och ni får se vad de olika delarna av bygget innebär innan något beslutas.',
  },
  {
    nr: '3',
    namn: 'Bygglov',
    text: 'Vi sammanställer och lämnar in handlingarna och sköter kontakten med kommunen och kontrollansvarig fram till startbesked.',
  },
  {
    nr: '4',
    namn: 'Byggnation',
    text: 'Vi bygger enligt svensk AMA-standard och samordnar alla yrkesgrupper. Eftersom samordningen är vår är det oss ni ringer när ni vill veta var bygget står.',
  },
  {
    nr: '5',
    namn: 'Överlämning',
    text: 'Besiktning, genomgång och dokumentation. Det som besiktningen tar upp går vi igenom med er, i stället för att ni ska upptäcka det efter inflytt.',
  },
];

const SKAL = [
  {
    rubrik: 'En part för hela bygget',
    text:
      'Från arkitekt och bygglov till byggnation och samordning av hantverkarna. Ni slipper vara projektledare för ert eget hus på kvällarna.',
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
    rubrik: 'Personlig service, inte växel',
    text:
      'Traditionellt byggande med moderna lösningar och personlig service. Ni pratar med den som håller i bygget, inte med en växel som lovar att någon ringer upp.',
  },
];

/* Ordningen är avsiktlig: pengar och risk först, administration sedan. Det är
   i den ordningen en familj som ska bygga faktiskt oroar sig. */
const FRAGOR = [
  {
    q: 'Vad kostar det att bygga nytt?',
    a: 'Det avgörs av tomten, storleken och vilken nivå ni vill ha på material och inredning. Därför börjar vi med ett samtal om tomt, storlek och materialnivå — innan någon siffra sätts.',
  },
  {
    q: 'Hur vet vi att kostnaden inte drar iväg?',
    a: 'Genom att en part ansvarar för hela kedjan. Det som brukar bli dyrt är inte hantverket, det är ändringar som upptäcks sent och yrkesgrupper som väntar på varandra. Vi går igenom tomt, hus och materialnivå innan bygget startar, och det som ändras under vägen tar vi upp med er innan det utförs.',
  },
  {
    q: 'Hur lång tid tar ett projekt?',
    a: 'En tillbyggnad räknas i veckor, ett nytt hus i månader, och bygglovet är ofta den del som styr starten mest. Ni får en tidplan när ritningarna är klara.',
  },
  {
    q: 'Kan vi bo kvar under en renovering?',
    a: 'Ofta ja vid en avgränsad del av huset, mer sällan vid en totalrenovering där stammar, el och ventilation byts. Vi säger rakt ut vilket av alternativen som gäller ert hus i stället för att ni får upptäcka det när köket är utrivet.',
  },
  {
    q: 'Sköter ni bygglovet?',
    a: 'Ja. Vi sammanställer handlingarna, lämnar in ansökan och håller kontakten med kommunen och kontrollansvarig fram till startbesked. Det ingår i vårt ansvar, det är inget tillval.',
  },
  {
    q: 'Vi har redan ritningar. Kan ni bygga efter dem?',
    a: 'Ja. Vi kan gå in som byggherrens förlängda arm och ta handlingar, upphandling, tidplan och byggnation från de ritningar ni har. Vi säger också till om vi ser något i konstruktionen som bör lösas annorlunda innan bygget startar.',
  },
  {
    q: 'Vem är min kontaktperson?',
    a: 'Eftersom vi samordnar alla hantverkare är det oss ni ringer, inte varje yrkesgrupp var för sig.',
  },
  {
    q: 'Arbetar ni utanför Stockholmsområdet?',
    a: 'Ja. Vi har vårt säte i Österåker och driver projekt över hela Sverige.',
  },
];

export default function SvHusDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
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
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>
                {l.txt}
              </a>
            ))}
          </nav>

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

        {/* Mobilmenyn: <details>, samma teknik som frågorna. Ingen klient-JS,
            och den finns i DOM även om CSS aldrig laddar. */}
        <details className={styles.mobilNav}>
          <summary>
            <span>Meny</span>
            <span className={styles.mobilNavIkon} aria-hidden="true" />
          </summary>
          <nav className={styles.mobilNavPanel}>
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>
                {l.txt}
              </a>
            ))}
            <a href="#kontakt">Kontakt</a>
          </nav>
        </details>
      </header>

      {/* ---------- hero ---------- */}
      <section className={styles.hero} id="top">
        {/* Ritningen bakom rubriken: husets sektion i linjer. Ren SVG, så den
            är skarp i alla upplösningar och väger ingenting. */}
        <svg className={styles.ritning} viewBox="0 0 900 620" fill="none" aria-hidden="true">
          {/* vector-effect sätts i CSS (den ärvs inte), så linjerna behåller
              sin tjocklek när ritningen skalas ner. */}
          <g stroke="currentColor" strokeWidth="1.6">
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
            Ni bygger ett hus en gång.
            <br />
            <em>Vi tar ansvaret för varje steg.</em>
          </h1>
          <p className={styles.heroLead}>
            Ett husprojekt har elva yrkesgrupper, en kommun och en kalkyl som ska hålla ihop. SV Hus
            tar arkitekt, bygglov, byggnation och samordningen av alla hantverkare — så att ni kan
            lägga tiden på hur huset ska bli, inte på att hålla ihop bygget.
          </p>
          <div className={styles.heroCta}>
            <a className={styles.btn} href={TEL_HREF}>
              Ring {TEL}
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#kontakt">
              Berätta om ert projekt
            </a>
          </div>
          <p className={styles.heroMikro}>
            Byggt enligt svensk AMA-standard · SV Hus AB, org.nr 559499-4062
          </p>
        </div>
      </section>

      {/* ---------- förtroenderad ---------- */}
      <div className={styles.remsa} role="group" aria-label="Det här ingår">
        <div className={styles.remsaIn}>
          <span>Arkitekt till nyckel</span>
          <span>Bygglov och kontrollansvarig</span>
          <span>Svensk AMA-standard</span>
          <span>Energieffektivt som syns på driftkostnaden</span>
          <span>Vi samordnar alla hantverkare</span>
        </div>
      </div>

      {/* ---------- tjänster ---------- */}
      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Vad är det ni vill <em>bygga?</em>
            </h2>
            <p className={styles.sekLead}>
              Fyra ingångar. Känner ni igen ert projekt i någon av dem har vi tagit den
              vägen förut, från första ritning till besiktning.
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
                Traditionellt byggande med moderna lösningar och personlig service. Vi
                väljer energieffektiva material och konstruktioner som ska hålla när huset
                har bytt ägare två gånger — och bygger enligt svensk AMA-standard, så att
                det som ligger bakom ytan är beskrivet och kontrollerbart.
              </p>

              {/* Samma linjespråk som heron, men en sektion genom vägg: det som
                  ligger bakom ytan. Ren SVG, inga bilder av kundens projekt. */}
              <svg className={styles.planritning} viewBox="0 0 460 150" fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="1.6">
                  <path d="M20 20h420M20 130h420" />
                  <path d="M20 20v110M120 20v110M240 20v110M440 20v110" />
                  <path d="M20 44h420M20 106h420" strokeDasharray="5 9" />
                  <path d="M60 44v62M180 44v62M300 44v62M380 44v62" strokeDasharray="5 9" />
                  <circle cx="120" cy="75" r="4" />
                  <circle cx="240" cy="75" r="4" />
                </g>
              </svg>

              <a className={styles.btn} href="#kontakt">
                Berätta om ert projekt
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
            <p className={styles.sekLead}>
              Åtta frågor vi får varje gång, i den ordning de brukar komma. Svaren är
              desamma som ni får i telefon.
            </p>
          </div>

          <div className={styles.fragorGrid}>
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

            <aside className={styles.fragaKort}>
              <h3>Hittar ni inte svaret?</h3>
              <p>Ring och fråga rakt ut. Vi svarar på vad som gäller just ert hus.</p>
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
                Berätta vad ni vill bygga.
                <br />
                <em>Vi säger vad som krävs.</em>
              </h2>
              <p className={styles.sekLead}>
                Ring, eller skriv några rader om projektet. Ju mer vi vet om tomt, hus och
                tidplan, desto konkretare kan första samtalet bli.
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

            {/* Formuläret har medvetet ingen action: vi har ingen verifierad
                e-postadress till SV Hus, och en knapp som tiger är värre än en
                knapp som säger vad som gäller. Kopplingen (inkorg eller CRM)
                sätts upp vid skarp leverans. Ingen submit-knapp = ingen tyst
                misslyckad inskickning, och telefonen är den aktiva vägen in. */}
            <form className={styles.form} aria-describedby="form-not">
              <label>
                Namn
                <input type="text" name="namn" autoComplete="name" />
              </label>
              <label>
                Telefon
                <input type="tel" name="telefon" autoComplete="tel" />
              </label>
              <label>
                E-post (valfritt)
                <input type="email" name="epost" autoComplete="email" />
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
              <a className={styles.btn} href={TEL_HREF}>
                Ring {TEL} — så hör vi av oss
              </a>
              <p className={styles.formNot} id="form-not">
                Skriv kort om tomt, hus och när ni vill börja — då kan vi ge ett vettigt
                svar direkt i första samtalet. Inga massutskick, ingen säljlista.
              </p>
              <p className={styles.formNot}>
                Obs: i det här förslaget är formuläret inte inkopplat. I den skarpa sajten
                landar det direkt i er inkorg. Fram till dess är telefonen vägen in.
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
      {/* Stängningsankaret. Det ligger fast i vyn (se .stangdAnkare), så när
          :target släpper flyttas inte skrollpositionen en pixel. */}
      <span className={styles.stangdAnkare} id="stangd" />
      <a className={styles.demoKnapp} href="#bahko-demo">
        Om det här förslaget
      </a>

      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">
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
