import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './andrens.module.css';

/* ===========================================================================
   ANDRÉNS BYGG & FASTIGHETER AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/andrensbygg · Lilla Edet · har hemsida (andrensbygg.com,
   WordPress/Astra 2026) — förslaget är en förbättring, inte en första sida.
   Byggd på golvvision-kanon (modulerna 2026-09-06).

   Bärande idé: det är grannarna de bygger åt. Sajtens egen mening: "det är
   våra grannar vi bygger åt" — en firma i Lilla Edet kan inte gömma sig
   bakom ett dåligt jobb, för den möter kunden i affären veckan efter.

   VERIFIERAT (andrensbygg.com + IG-bio + allabolag, 2026-09-07):
   Firmanamn "Andréns Bygg & Fastigheter AB" · org.nr 559540-8526 (sajtens
   footer) · grundat 2025-04-29 (registret) · Göteborgsvägen 90, 463 33 Lilla
   Edet (sajten och IG-bion; registret säger Gamla Götavägen 15) · telefon
   073-354 64 12 · e-post info@andrensbygg.com · tjänster: renovering (kök,
   badrum, hela hus), fasad (panelbyte, fönsterbyte, fasadmålning),
   altan/trädäck, tillbyggnad, tak, nybyggnation · områden: Lilla Edet, Ale,
   Kungälv, Göteborg (sajten), "hela Västsverige" (IG) · sajten uppger:
   ROT dras på fakturan, ansvarsförsäkring, fast kontaktperson, offert inom
   en arbetsdag, kostnadsfri offert · Kvalitetspartner-certifierad, god
   kreditvärdighet (UC/Soliditet) · Facebook länkad från sajten · Instagram
   41 inlägg, 697 följare · logotypen är deras egen (vit, transparent, från
   sajten) · två foton i sociala-rutnätet är deras egna reel-omslag.

   INTE verifierat, och finns därför inte på sidan: antal anställda, antal
   projekt, Google-recensioner (inga hittade), garantier, exakta ledtider.
   Andréns Bygg & Kakel AB är ett ANNAT bolag — nämns aldrig.

   OMDÖMESMODULEN i exempelläge: tre kort märkta Exempel. Inget betyg.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; galleriet är
   illustrationer, märkt en gång; en av tre sociala-bilder är illustration;
   adressen skiljer sig mellan sajt och register.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--ab-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--ab-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--ab-ui' });

export const metadata = {
  title: 'Andréns Bygg & Fastigheter — byggfirma i Lilla Edet: tak, fasad, altan, renovering',
  description:
    'Byggfirma i Lilla Edet. Takbyte, panelbyte, altan, kök, badrum och tillbyggnad i Ale, Kungälv och Göteborg. Fast kontaktperson, kostnadsfri offert inom en arbetsdag. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '073-354 64 12';
const TEL_HREF = 'tel:+46733546412';
const EPOST = 'info@andrensbygg.com';
const ADRESS = 'Göteborgsvägen 90, 463 33 Lilla Edet';
const IG = 'https://www.instagram.com/andrensbygg/';
const FB = 'https://www.facebook.com/profile.php?id=61584340842923';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Andr%C3%A9ns%20Bygg%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  tak: (
    <>
      <path d="M20 70L100 22l80 48" />
      <path d="M34 62v40h132V62" />
      <path d="M20 70h160" />
      <path d="M120 30v14h12V38" />
      <path d="M20 112h160M20 108v8M180 108v8" />
    </>
  ),
  fasad: (
    <>
      <path d="M40 30h120v72H40z" />
      <path d="M56 30v72M72 30v72M88 30v72M104 30v72M120 30v72M136 30v72" />
      <path d="M40 30l60-14 60 14" />
      <path d="M40 112h120M40 108v8M160 108v8" />
    </>
  ),
  altan: (
    <>
      <path d="M20 78h160" />
      <path d="M36 78v-8h128v8" />
      <path d="M36 70v-22M164 70v-22M36 48h128" />
      <path d="M52 62h96" />
      <path d="M20 96h160M20 92v8M180 92v8" />
    </>
  ),
  tillbyggnad: (
    <>
      <path d="M24 100V44l44-24 44 24v56" />
      <path d="M112 100V62h64v38" />
      <path d="M112 62l32-14 32 14" />
      <path d="M24 100h152" />
      <path d="M24 112h152M24 108v8M176 108v8" />
    </>
  ),
};

/* Fyra kort, alla ur sajtens och IG-bions egna tjänstelista. */
const TJANSTER = [
  { id: 'tak', ritning: 'tak', namn: 'Tak och takbyte', text: 'Nytt tak när det gamla släpper in. Råspont, underlagstäckning, pannor eller plåt, och hängrännor som faktiskt leder bort vattnet. Vi säger om det räcker att lägga om delar.', punkter: ['Takbyte', 'Råspont och underlag', 'Hängrännor och plåt'] },
  { id: 'fasad', ritning: 'fasad', namn: 'Fasad och panelbyte', text: 'Panelbyte, fönsterbyte och fasadmålning. Rötskadade brädor byts, resten behålls, och det nya målas så att det inte syns var skarven går.', punkter: ['Panelbyte', 'Fönsterbyte', 'Fasadmålning'] },
  { id: 'altan', ritning: 'altan', namn: 'Altan och trädäck', text: 'Altaner och trädäck anpassade efter tomten och huset, från första skiss till sista skruven. Grunden görs rätt, så däcket inte lutar om tre vintrar.', punkter: ['Altan och trädäck', 'Räcken och trappor', 'Uterum'] },
  { id: 'renovering', ritning: 'tillbyggnad', namn: 'Renovering och tillbyggnad', text: 'Kök, badrum och hela hus. Och när familjen behöver mer plats: en tillbyggnad som smälter ihop med det som redan står där.', punkter: ['Kök och badrum', 'Tillbyggnad', 'Nybyggnation'] },
];

const STEGRITNINGAR = {
  samtal: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  besok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  bygge: (<><path d="M20 70L100 22l80 48" /><path d="M34 62v40h132V62" /><path d="M20 70h160" /><path d="M20 112h160M20 108v8M180 108v8" /></>),
  besiktning: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'samtal', text: 'Berätta vad du vill göra. Du får svar inom en arbetsdag, och ofta redan i telefon en känsla för vad det handlar om.' },
  { nr: '2', namn: 'Kostnadsfritt hembesök', ritning: 'besok', text: 'Vi kommer ut och tittar på huset, taket eller tomten. Du får höra vad som behöver göras och vad som kan vänta.' },
  { nr: '3', namn: 'Offert med fast pris', ritning: 'offert', text: 'Du vet vad som ingår och vad det kostar innan vi börjar. ROT-avdraget dras direkt på fakturan. Inga överraskningar.' },
  { nr: '4', namn: 'Bygget', ritning: 'bygge', text: 'Samma person genom hela projektet, en tidplan som håller, och en städad arbetsplats varje kväll.' },
  { nr: '5', namn: 'Slutbesiktning', ritning: 'besiktning', text: 'Vi går igenom allt tillsammans innan vi lämnar. Är något inte som det ska tar vi det då, inte om ett halvår.' },
];

const STATS = [
  { tal: 1, prefix: '', etikett: 'Arbetsdag till offert' },
  { tal: 0, prefix: '', etikett: 'Kronor för hembesöket' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
  { tal: 30, prefix: '', etikett: 'Procent ROT på arbetet', suffix: ' %' },
];

const VARFOR = [
  'Det är grannarna vi bygger åt. Vi möter kunden i affären veckan efter.',
  'Samma person från första samtalet till slutbesiktningen.',
  'Fast pris innan vi börjar, ROT-avdraget draget på fakturan.',
  'Räcker det att lägga om halva taket säger vi det. Även när ett helt hade gett oss mer betalt.',
];

const OMDOMEN = [
  { namn: 'Exempel', text: 'Så här ser ett omdöme ut när det står här: kort, med förnamn och ort, hämtat från er Google-profil.' },
  { namn: 'Exempel', text: 'Kunden skriver vad som gjordes, hur det gick och om tidplanen höll. Det är den sortens text som säljer.' },
  { namn: 'Exempel', text: 'Tre till fem riktiga räcker. Ett påhittat är värre än inget — därför står det Exempel här.' },
];

const FRAGOR = [
  { q: 'Vad kostar det att anlita er?', a: 'Det beror helt på projektet, därför börjar vi alltid med en kostnadsfri offert. Du får ett tydligt pris och en beskrivning av vad som ingår innan något arbete påbörjas.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Ja, för arbetskostnaden. Vi sköter administrationen och drar avdraget direkt på fakturan.' },
  { q: 'Hur lång tid tar ett projekt?', a: 'En altan tar ofta någon vecka, en större renovering eller tillbyggnad kan ta flera månader. Du får alltid en tidplan i offerten, och vi håller den.' },
  { q: 'Behöver jag byta hela taket?', a: 'Inte alltid. Vi tittar på råspont, underlag och pannor var för sig och säger vad som faktiskt behöver bytas. Ibland räcker delar, och då säger vi det.' },
  { q: 'Måste hela fasaden bytas om några brädor är ruttna?', a: 'Nej. Rötskadade brädor byts, det friska behålls, och det nya målas så att skarven inte syns. Vi säger vad som gäller ditt hus efter hembesöket.' },
  { q: 'Har ni försäkring?', a: 'Ja, vi har ansvarsförsäkring och arbetar enligt branschens regler och standarder.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Vi utgår från Lilla Edet och tar uppdrag i närområdet: Ale, Kungälv, Göteborg och orterna däromkring. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
  { q: 'Hur kommer jag igång?', a: 'Ring, eller skriv några rader om vad du vill göra. Du får svar inom en arbetsdag och ett kostnadsfritt hembesök när det passar dig.' },
];

const Stjarnor = () => (
  <span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>
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

export default function AndrensDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Andréns Bygg</b><i>Lilla Edet</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span>
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/andrens/media/poster-hero.jpg"><source src="/andrens/media/video-hero-fpv-huset.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/andrens/media/poster-hero-mobil.jpg"><source src="/andrens/media/video-hero-fpv-huset-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}><Image src="/andrens/media/logo-andrens-vit.png" alt="Andréns Bygg & Fastigheter AB" width={1920} height={498} priority /></h1>
            <p className={styles.heroTjanster}>Tak · Fasad · Altan</p>
            <p className={styles.heroOrt}>Lilla Edet</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Begär kostnadsfri offert</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Takbyte</span><span>Panelbyte</span><span>Fönsterbyte</span><span>Altan och trädäck</span><span>Kök och badrum</span><span>Tillbyggnad</span><span>Nybyggnation</span><span>Lilla Edet, Ale, Kungälv, Göteborg</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Andréns Bygg i siffror">
          {STATS.map((s) => (
            <div className={styles.stat} role="listitem" key={s.etikett}>
              <b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span>{s.suffix || ''}</b>
              <span>{s.etikett}</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>Det är grannarna <em>vi bygger åt.</em></h2>
          </div>
          <div className={styles.forvandling}>
            <figure><Image src="/andrens/media/galleri-fore-slitet-hus.jpg" alt="Rött trähus med flagnande panel, mossigt tak och hängande rännor före renovering" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/andrens/media/galleri-efter-nytt-tak-panel.jpg" alt="Samma hus med ny faluröd panel, nytt tak och vita fönsterfoder" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/andrens/media/galleri-makro-panelskarv.jpg" alt="Närbild på skarven mellan ny och gammal panel, målad så att den inte syns" width={1200} height={1200} /><figcaption>Skarven som inte syns.</figcaption></figure>
            <figure><Image src="/andrens/media/galleri-altan-tradack.jpg" alt="Nybyggt trädäck med glasräcke mot en villa" width={1200} height={1200} /><figcaption>Altanen, från skiss till sista skruven.</figcaption></figure>
            <figure><Image src="/andrens/media/galleri-panelbyte-pagar.jpg" alt="Panelbyte pågår: ny panel på halva väggen, gammal röd på andra halvan" width={1200} height={1200} /><figcaption>Panelbyte, halvvägs.</figcaption></figure>
            <figure><Image src="/andrens/media/galleri-kok-renoverat.jpg" alt="Nyrenoverat kök med vita luckor och ekbänk" width={1200} height={1200} /><figcaption>Köket, klart.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>Utsidan, insidan <em>och det som ska till</em></h2>
            <p className={styles.sekLead}>Tak, fasad och altan är det som syns från vägen. Kök, badrum och tillbyggnad är det som gör huset till ert. Vi gör båda, med samma person hela vägen.</p>
          </div>
          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.id}>
                <svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg>
                <h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Så går det till</p>
            <h2 className={styles.h2}>Fem steg, och samma person <em>i alla fem</em></h2>
            <p className={styles.sekLead}>Det börjar med ett samtal och slutar med en slutbesiktning där du får säga om något sitter fel.</p>
          </div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
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

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Varför oss</p>
            <h2 className={styles.h2}>Bräda för bräda, <em>inte hela väggen</em></h2>
          </div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}>
              <video autoPlay muted loop playsInline preload="metadata" poster="/andrens/media/poster-varfor.jpg" aria-label="Panelbyte: nya brädor sätts upp en efter en över den gamla fasaden">
                <source src="/andrens/media/video-varfor-panelbyte.mp4" type="video/mp4" />
              </video>
            </figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Omdömen</p>
            <h2 className={styles.h2}>Vad kunderna säger</h2>
            <p className={styles.googleRad}><GoogleG className={styles.googleG} /><span>Google-recensioner</span></p>
          </div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (
              <figure className={styles.recension} key={i}>
                <div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>Byts mot ett riktigt omdöme</span></figcaption><GoogleG className={styles.recensionG} /></div>
                <Stjarnor /><blockquote>{o.text}</blockquote>
              </figure>
            ))}
          </div>
          <div className={styles.recensionerFot}>
            <p className={styles.recensionerNot}>Exempel — byts mot era riktiga Google-recensioner när profilen är på plats.</p>
            <a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/search?q=Andr%C3%A9ns+Bygg+%26+Fastigheter+Lilla+Edet" target="_blank" rel="noopener">Se alla recensioner</a>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Andréns Bygg på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Andréns Bygg på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/andrens/media/sociala-projekt-takbyte.jpg" alt="Andréns reel: Projekt takbyte, rött hus med ställning och nytt tak" width={792} height={1406} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/andrens/media/sociala-bygg-tips.jpg" alt="Andréns reel: Bygg tips, rött hus med nytt tegeltak" width={941} height={1672} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/andrens/media/sociala-hantverk-detalj.jpg" alt="Närbild på hantverksdetalj i trä" width={1200} height={1200} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>Det du brukar fråga först</h2>
            <p className={styles.sekLead}>Pengar och risk först, det praktiska sedan. Gäller det just ditt hus är telefonen snabbare än en sida.</p>
          </div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi svarar inom en arbetsdag.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Redo att komma igång?<br /><em>Börja med offerten.</em></h2>
              <p className={styles.sekLead}>Berätta vad du vill göra, så återkommer vi inom en arbetsdag med en kostnadsfri offert. Vill du hellre prata direkt: ring.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@andrensbygg</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Tak"><option>Tak</option><option>Fasad eller panel</option><option>Altan eller trädäck</option><option>Kök eller badrum</option><option>Tillbyggnad</option><option>Något annat</option></select></label>
              <label>Kort om projektet<textarea name="meddelande" rows={4} placeholder="Vad du vill göra, var huset ligger, och när du vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Begär kostnadsfri offert</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om projektet — då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Andréns Bygg & Fastigheter AB</b><i>Byggfirma i Lilla Edet</i></span><p className={styles.ftrText}>Tak, fasad, altan, kök, badrum och tillbyggnad i Lilla Edet, Ale, Kungälv och Göteborg. Vi bygger mer än hus. Vi bygger förtroende.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@andrensbygg</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Andréns Bygg & Fastigheter AB · Org.nr 559540-8526 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny">
        <a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav>
      </div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Andréns Bygg">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label>
        <p className={styles.popupEyebrow}>Släpper taket in?</p>
        <p className={styles.popupTxt}>Hembesöket kostar ingenting, och du får höra om det räcker att lägga om delar. Svar inom en arbetsdag.</p>
        <a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a>
        <a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a>
      </aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Andréns Bygg se ut på nätet</h3>
          <p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på andrensbygg.com och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Andr%C3%A9ns%20Bygg%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
