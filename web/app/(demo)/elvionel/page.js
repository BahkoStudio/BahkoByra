import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './elvionel.module.css';

/* ===========================================================================
   ELVION EL — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: elvionel.se (Sollentuna). Hittad via Instagram-kontot reel_innovations
   ("Valora", företagsförmedling) som länkar till sajten — kontot beskriver
   något annat än sajten, och sajtens egna Instagram-länk (@elvionelab) går
   inte att hitta. Mathias valde 2026-09-07 att demon gäller Elvion El.
   Byggd på golvvision-kanon (modulerna 2026-09-06).

   Bärande idé: felet i elen syns inte förrän det brinner, klickar eller
   slocknar — och det som skiljer en elfirma från en annan är vad den gör
   INNAN dess. Sajtens egen linje: "göra jobbet rätt från början".

   VERIFIERAT (elvionel.se 2026-09-07):
   Firmanamn "Elvion El" / "Elvion EL" · adress Edsviksvägen 32, 191 45
   Sollentuna · telefon 08-525 133 93 · e-post info@elvionel.se · tjänster
   ordagrant: felsökning och reparation, elinstallationer (nyproduktion,
   renovering), laddboxar, smarta hem, eljour, belysning · kunder:
   privatpersoner och företag · sajten uppger "auktoriserat elföretag" ·
   landningssidor för Sollentuna, Solna, Täby, Danderyd, Upplands Väsby ·
   Facebook-sida länkad från sajten (profile.php?id=61588261401239) ·
   logotypen är deras egen (EE med blixtar, vit och elblå på svart, 512 px
   favicon från sajten).

   INTE verifierat, och finns därför inte på sidan: org.nr (går inte att hitta
   under namnet), grundat år, antal anställda, antal jobb, omdömen (inga
   Google-recensioner hittade), ledtider, priser, ROT/grön teknik-avdrag,
   jourtider. "Auktoriserat elföretag" står som deras egen uppgift.
   Instagram: @elvionelab (sajtens länk) hittas inte; reel_innovations är
   inte firmans — ingen Instagram-ikon på sidan förrän ett konto är bekräftat.

   OMDÖMESMODULEN i exempelläge (Mathias regel 2026-09-06): tre kort märkta
   "Exempel", noten säger att de byts. Inget betyg, inget antal.

   SÄLJARGUMENT (i lead-filen): sajten (mars 2026, Divi) har kvar mallcopy
   om brunnsborrning på varje sida, bilderna är stockfoton och en
   ChatGPT-bild, och Instagram-länken är död.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; galleriet är
   genererade illustrationer, märkta en gång; sociala-rutnätet är
   illustrationer (inga egna bilder finns) och länkar till Facebook.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--ee-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--ee-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--ee-ui' });

export const metadata = {
  title: 'Elvion El — elektriker i Sollentuna: felsökning, elinstallation, laddbox och eljour',
  description:
    'Auktoriserat elföretag i Sollentuna. Felsökning, elinstallationer, laddboxar, smarta hem och eljour för hem och företag. Rätt från början. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '08-525 133 93';
const TEL_HREF = 'tel:+46852513393';
const EPOST = 'info@elvionel.se';
const ADRESS = 'Edsviksvägen 32, 191 45 Sollentuna';
const FB = 'https://www.facebook.com/profile.php?id=61588261401239';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Elvion%20El%20-%20f%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Linjeritningar i elens eget språk: central, laddbox, uttag, blixt. Bara <path>. */
const RITNINGAR = {
  central: (
    <>
      <path d="M40 24h120v72H40z" />
      <path d="M52 40h12v18H52zM72 40h12v18H72zM92 40h12v18H92zM112 40h12v18h-12zM132 40h12v18h-12z" />
      <path d="M52 72h92" />
      <path d="M40 108h120M40 104v8M160 104v8" />
    </>
  ),
  laddbox: (
    <>
      <path d="M70 20h60v70H70z" />
      <path d="M86 36h28v20H86z" />
      <path d="M100 90v14M100 104h30" />
      <path d="M130 104a8 8 0 1 0 16 0a8 8 0 1 0-16 0" />
      <path d="M40 116h120M40 112v8M160 112v8" />
    </>
  ),
  uttag: (
    <>
      <path d="M44 30h112v60H44z" />
      <path d="M72 60a14 14 0 1 0 28 0a14 14 0 1 0-28 0" />
      <path d="M80 56v8M92 56v8" />
      <path d="M116 44h28v32h-28z" />
      <path d="M44 104h112M44 100v8M156 100v8" />
    </>
  ),
  blixt: (
    <>
      <path d="M108 16L72 66h26l-10 38 40-54H102z" />
      <path d="M40 108h120" />
      <path d="M40 104v8M160 104v8" />
    </>
  ),
};

/* Fyra kort, alla ordagrant ur sajtens tjänstelista. */
const TJANSTER = [
  {
    id: 'felsokning',
    ritning: 'central',
    namn: 'Felsökning och reparation',
    text:
      'När en säkring går om och om igen, ett uttag är dött eller lampan flimrar. Vi hittar orsaken innan vi byter något, så det inte är samma fel nästa vecka.',
    punkter: ['Säkringar som löser ut', 'Döda uttag och flimmer', 'Gamla centraler'],
  },
  {
    id: 'installation',
    ritning: 'uttag',
    namn: 'Elinstallationer',
    text:
      'Nyproduktion, renovering och det där extra uttaget som saknas. Dragningar som sitter där de ska, dokumenterade så nästa elektriker slipper gissa.',
    punkter: ['Nyproduktion och renovering', 'Nya uttag och belysning', 'Byte av elcentral'],
  },
  {
    id: 'laddbox',
    ritning: 'laddbox',
    namn: 'Laddbox',
    text:
      'Laddbox hemma eller på företaget, dimensionerad efter fastighetens huvudsäkring, inte efter vad som råkar finnas i lager. Vi säger vilken effekt huset klarar innan du köper box.',
    punkter: ['Villa och radhus', 'Brf och företag', 'Lastbalansering'],
  },
  {
    id: 'jour',
    ritning: 'blixt',
    namn: 'Eljour',
    text:
      'När strömmen är borta och det inte kan vänta till måndag. Vi kommer, gör felet säkert och säger rakt ut vad som behöver göras sen, och vad som kan vänta.',
    punkter: ['Akuta fel', 'Säkra först, åtgärda sen', 'Hem och lokaler'],
  },
];

const STEGRITNINGAR = {
  samtal: (
    <>
      <path d="M40 30h120v60H40z" />
      <path d="M40 30l60 40 60-40" />
      <path d="M40 104h120M40 100v8M160 100v8" />
    </>
  ),
  besok: (
    <>
      <path d="M14 74h172v22H14z" />
      <path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" />
      <path d="M14 56h172M14 50v12M186 50v12" />
      <path d="M60 30h80" />
    </>
  ),
  pris: (
    <>
      <path d="M28 18h144v84H28z" />
      <path d="M44 38h64M44 52h96M44 66h48" />
      <path d="M120 60h36v30h-36z" />
      <path d="M28 110h144M28 106v8M172 106v8" />
    </>
  ),
  arbete: (
    <>
      <path d="M40 24h120v72H40z" />
      <path d="M52 40h12v18H52zM72 40h12v18H72zM92 40h12v18H92zM112 40h12v18h-12zM132 40h12v18h-12z" />
      <path d="M52 72h92" />
      <path d="M40 108h120M40 104v8M160 104v8" />
    </>
  ),
  kontroll: (
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
  { nr: '1', namn: 'Ring eller skriv', ritning: 'samtal', text: 'Berätta vad som händer: vad som slutat fungera, var i huset, och sedan när. Ofta kan vi säga redan i telefon om det är akut eller kan vänta.' },
  { nr: '2', namn: 'Kostnadsfritt hembesök', ritning: 'besok', text: 'Vid större jobb kommer vi ut och tittar på centralen, ledningarna och vad huset faktiskt klarar. Du får höra vad som behöver göras och vad som inte behöver det.' },
  { nr: '3', namn: 'Fast pris', ritning: 'pris', text: 'Priset sätts när vi har sett jobbet, och det står fast. Hittar vi något oväntat bakom väggen ringer vi innan vi gör något åt det.' },
  { nr: '4', namn: 'Arbetet', ritning: 'arbete', text: 'Vi gör jobbet i rätt ordning: spänningslöst, uppmärkt, dokumenterat. Vi städar efter oss och lämnar inget löst hängande.' },
  { nr: '5', namn: 'Kontroll och genomgång', ritning: 'kontroll', text: 'Innan vi åker provar vi allt och går igenom med dig vad som gjorts. Sitter något fel tar vi det då, inte efter en helg utan ström.' },
];

const VARFOR = [
  'Auktoriserat elföretag, enligt egen redovisning.',
  'Vi hittar felet innan vi byter något. Samma fel igen är inte en lösning.',
  'Fast pris när vi har sett jobbet, och det står fast.',
  'Räcker det med en ny säkring säger vi det. Även när en ny central hade gett oss mer betalt.',
];

/* EXEMPEL. Inga riktiga omdömen finns att hämta — korten är exempel, märkta
   som det, och byts mot kundens egna när de finns. */
const OMDOMEN = [
  { namn: 'Exempel', text: 'Så här ser ett omdöme ut när det står här. Kort, med förnamn och ort, hämtat från er Google-profil.' },
  { namn: 'Exempel', text: 'Kunden skriver vad som var trasigt, vad ni gjorde, och hur det gick. Det är den sortens text som säljer.' },
  { namn: 'Exempel', text: 'Tre till fem sådana, riktiga, räcker. Ett påhittat är värre än inget — därför står det Exempel på de här.' },
];

const STATS = [
  { tal: 5, prefix: '', etikett: 'Orter i norra Stockholm' },
  { tal: 0, prefix: '', etikett: 'Kronor för första samtalet' },
  { tal: 24, prefix: '', etikett: 'Timmars svar på jourärende', suffix: ' h' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
];

const FRAGOR = [
  { q: 'Vad kostar det att anlita en elektriker?', a: 'Det beror på jobbet. Små fel tar vi ofta på plats direkt; större jobb får ett fast pris efter ett hembesök som inte kostar något. Priset du får står fast.' },
  { q: 'Säkringen går hela tiden, vad gör jag?', a: 'Slå av det som var igång när den gick, och ring. Går den utan att något är igång ska det felsökas, inte bytas till en större säkring. Det är så bränder börjar.' },
  { q: 'Kan ni installera laddbox i ett radhus eller en brf?', a: 'Ja. Vi tittar först på huvudsäkring och matning, så boxen får rätt effekt utan att slå ut resten av huset. I en brf hjälper vi till med det underlag styrelsen brukar vilja ha.' },
  { q: 'Får jag använda ROT-avdrag?', a: 'Elarbeten i din bostad ger ofta rätt till avdrag. Vi säger vad som gäller ditt jobb när vi har sett det, och drar av direkt på fakturan där det går.' },
  { q: 'Har ni jour på kvällar och helger?', a: 'Ring så säger vi rakt ut om vi kan komma, och när. Är strömmen helt borta eller något luktar bränt: ring direkt, oavsett tid.' },
  { q: 'Gör ni smarta hem också?', a: 'Ja: belysningsstyrning, dimrar, laddning och det som ska prata med appen. Vi bygger det på en elinstallation som är rätt gjord i grunden, annars blir det smarta hemmet mest en dyr felkälla.' },
  { q: 'Är ni auktoriserade?', a: 'Vi är ett auktoriserat elföretag. Det betyder att arbetet får utföras och att det finns någon som ansvarar för att det gjorts rätt.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Sollentuna, Solna, Täby, Danderyd och Upplands Väsby. Ligger jobbet någon annanstans i Stockholm får du säga var, så säger vi om vi kan ta det.' },
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

export default function ElvionElDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandTxt}>
              <b>Elvion El</b>
              <i>Sollentuna</i>
            </span>
          </a>
          <nav className={styles.nav}>
            {LANKAR.map((l) => (
              <a href={l.href} key={l.href}>{l.txt}</a>
            ))}
          </nav>
          <a className={styles.mobilNavKnapp} href="#meny">
            <span>Meny</span>
            <span className={styles.mobilNavIkon} aria-hidden="true" />
          </a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span>
            <span className={styles.hdrTelKort} aria-hidden="true">Ring</span>
          </a>
        </div>
      </header>

      {/* ---------- 1. lager-hero ---------- */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/elvionel/media/poster-hero.jpg">
            <source src="/elvionel/media/video-hero-fpv-central.mp4" type="video/mp4" />
          </video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/elvionel/media/poster-hero-mobil.jpg">
            <source src="/elvionel/media/video-hero-fpv-central-mobil.mp4" type="video/mp4" />
          </video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}>
              <Image src="/elvionel/media/logo-elvion-el.png" alt="Elvion El" width={512} height={512} priority />
            </h1>
            <p className={styles.heroTjanster}>Elinstallation · Laddbox · Eljour</p>
            <p className={styles.heroOrt}>Sollentuna</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka kostnadsfritt hembesök</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Felsökning och reparation</span>
              <span>Elinstallationer</span>
              <span>Laddbox</span>
              <span>Smarta hem</span>
              <span>Belysning</span>
              <span>Byte av elcentral</span>
              <span>Eljour</span>
              <span>Sollentuna med omnejd</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- statsrad: loftesbaserad (inga verifierade historiksiffror finns) ---------- */}
      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Elvion El i siffror">
          {STATS.map((s) => (
            <div className={styles.stat} role="listitem" key={s.etikett}>
              <b>
                {s.prefix}
                <span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" />
                <span className={styles.statStatisk}>{s.tal}</span>
                {s.suffix || ''}
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
              Felet syns inte <em>förrän det slocknar.</em>
            </h2>
          </div>
          <div className={styles.forvandling}>
            <figure>
              <Image src="/elvionel/media/galleri-fore-gammal-central.jpg" alt="Gammal elcentral med skruvsäkringar, gulnade etiketter och trassliga ledningar" width={1200} height={1200} />
              <figcaption><b>Före</b></figcaption>
            </figure>
            <figure>
              <Image src="/elvionel/media/galleri-efter-ny-central.jpg" alt="Samma plats med ny elcentral, automatsäkringar, jordfelsbrytare och märkta grupper" width={1200} height={1200} />
              <figcaption><b>Efter</b></figcaption>
            </figure>
          </div>
          <div className={styles.galleri}>
            <figure>
              <Image src="/elvionel/media/galleri-makro-markta-grupper.jpg" alt="Närbild på märkta automatsäkringar i en ny elcentral" width={1200} height={1200} />
              <figcaption>Varje grupp märkt.</figcaption>
            </figure>
            <figure>
              <Image src="/elvionel/media/galleri-laddbox-villa.jpg" alt="Laddbox monterad på villavägg vid garaget" width={1200} height={1200} />
              <figcaption>Laddbox på villan.</figcaption>
            </figure>
            <figure>
              <Image src="/elvionel/media/galleri-uttag-renovering.jpg" alt="Nya vägguttag och strömbrytare i nyrenoverat rum" width={1200} height={1200} />
              <figcaption>Uttagen i linje.</figcaption>
            </figure>
            <figure>
              <Image src="/elvionel/media/galleri-kabeldragning-nybygge.jpg" alt="Kabeldragning längs reglar i ett nybygge" width={1200} height={1200} />
              <figcaption>Dragningen i nybygget.</figcaption>
            </figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna bilder från jobben.</p>
        </div>
      </section>

      {/* ---------- tjänster ---------- */}
      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>
              Rätt <em>från början</em>
            </h2>
            <p className={styles.sekLead}>
              Det billigaste elarbetet är det som inte behöver göras om. Därför börjar vi med att ta reda på varför, inte bara vad.
            </p>
          </div>
          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.id}>
                <svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg>
                <h3>{t.namn}</h3>
                <p>{t.text}</p>
                <ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul>
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
              Fem steg, och vi provar <em>innan vi åker</em>
            </h2>
            <p className={styles.sekLead}>Det börjar med ett samtal, och slutar med att allt är provat och genomgånget med dig.</p>
          </div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => (
              <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />
            ))}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">
              {STEG.map((s) => (
                <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>
              ))}
            </div>
            <div className={styles.stegKort}>
              {STEG.map((s) => (
                <article className={styles.stegPanel} key={`p-${s.nr}`}>
                  <svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg>
                  <div><h3>{s.namn}</h3><p>{s.text}</p></div>
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
              Det som gör att det <em>inte händer igen</em>
            </h2>
          </div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}>
              <video autoPlay muted loop playsInline preload="metadata" poster="/elvionel/media/poster-varfor.jpg" aria-label="Kameran går in mot den nya elcentralen och de märkta säkringarna">
                <source src="/elvionel/media/video-varfor-in-mot-central.mp4" type="video/mp4" />
              </video>
            </figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ---------- 3. omdömen — EXEMPELLÄGE ---------- */}
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
            {OMDOMEN.map((o, i) => (
              <figure className={styles.recension} key={i}>
                <div className={styles.recensionHuvud}>
                  <span className={styles.avatar} aria-hidden="true">E</span>
                  <figcaption><b>{o.namn}</b><span>Byts mot ett riktigt omdöme</span></figcaption>
                  <GoogleG className={styles.recensionG} />
                </div>
                <Stjarnor />
                <blockquote>{o.text}</blockquote>
              </figure>
            ))}
          </div>
          <div className={styles.recensionerFot}>
            <p className={styles.recensionerNot}>Exempel — byts mot era riktiga Google-recensioner när profilen är på plats.</p>
            <a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/search?q=Elvion+El+Sollentuna" target="_blank" rel="noopener">Se alla recensioner</a>
          </div>
        </div>
      </section>

      {/* ---------- 4. sociala: bara Facebook ar verifierad ---------- */}
      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={FB} target="_blank" rel="noopener" aria-label="Elvion El på Facebook">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" />
              </svg>
            </a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={FB} target="_blank" rel="noopener"><Image src="/elvionel/media/sociala-jourbil-kvall.jpg" alt="Servicebil parkerad utanför ett radhus i kvällsljus" width={1200} height={1200} /></a></figure>
            <figure><a href={FB} target="_blank" rel="noopener"><Image src="/elvionel/media/sociala-verktyg-central.jpg" alt="Elektrikerverktyg upplagda framför en öppen elcentral" width={1200} height={1200} /></a></figure>
            <figure><a href={FB} target="_blank" rel="noopener"><Image src="/elvionel/media/sociala-belysning-kok.jpg" alt="Nyinstallerad köksbelysning tänd i ett renoverat kök" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      {/* ---------- frågor ---------- */}
      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>Det du brukar fråga först</h2>
            <p className={styles.sekLead}>Pengar och risk först, det praktiska sedan. Gäller det just din el är telefonen snabbare än en sida.</p>
          </div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>
              {FRAGOR.map((f) => (
                <details className={styles.fraga} name="faq" key={f.q}>
                  <summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <aside className={styles.fragaKort}>
              <h3>Hittar du inte svaret?</h3>
              <p>Ring och fråga rakt ut. Luktar det bränt: ring direkt.</p>
              <a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a>
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
                Krånglar elen, eller ska något nytt in?
                <br />
                <em>Börja med ett samtal.</em>
              </h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader om vad som händer. Hembesöket kostar ingenting, och priset du får står fast.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <div className={styles.kontaktRad}><span>Område</span><b>Sollentuna, Solna, Täby, Danderyd, Upplands Väsby</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>
                Vad handlar det om?
                <select name="typ" defaultValue="Felsökning">
                  <option>Felsökning</option>
                  <option>Elinstallation</option>
                  <option>Laddbox</option>
                  <option>Byte av elcentral</option>
                  <option>Belysning eller smart hem</option>
                  <option>Akut: eljour</option>
                </select>
              </label>
              <label>
                Kort om vad som händer
                <textarea name="meddelande" rows={4} placeholder="Vad som slutat fungera eller vad som ska in, var i huset, och sedan när" />
              </label>
              <button className={styles.btn} type="submit">Boka kostnadsfritt hembesök</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om vad som händer — då kan vi ofta säga redan i första samtalet om det är akut. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div>
              <span className={styles.brandTxt}><b>Elvion El</b><i>Auktoriserat elföretag</i></span>
              <p className={styles.ftrText}>Felsökning, elinstallationer, laddboxar, smarta hem och eljour för hem och företag i Sollentuna med omnejd.</p>
            </div>
            <div className={styles.ftrLankar}>
              {LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
              <a href={TEL_HREF}>{TEL}</a>
              <a href={`mailto:${EPOST}`}>{EPOST}</a>
              <a href={FB} target="_blank" rel="noopener">Facebook</a>
              <a href="#top">Till toppen</a>
            </div>
          </div>
          <div className={styles.ftrBar}>
            <span>Elvion El · {ADRESS}</span>
            <span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span>
          </div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny">
        <a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={styles.mobilMenyPanel} aria-label="Meny">
          {LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}
          <a href="#kontakt">Kontakt</a>
          <a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a>
        </nav>
      </div>
      <span className={styles.stangdAnkare} id="stangd" />

      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Elvion El">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label>
        <p className={styles.popupEyebrow}>Går säkringen igen?</p>
        <p className={styles.popupTxt}>Byt inte till en större. Ring, så hittar vi varför. Hembesöket kostar ingenting.</p>
        <a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a>
        <a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a>
      </aside>

      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>

      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Elvion El se ut på nätet</h3>
          <p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på elvionel.se. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna bilder, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Elvion%20El%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
