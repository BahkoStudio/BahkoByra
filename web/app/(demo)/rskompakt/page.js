import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './rskompakt.module.css';

/* ===========================================================================
   RS KOMPAKT AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/rs_kompakt_ab · Norsborg (Botkyrka), Stockholm · har
   hemsida (rskompakt.com, WordPress) — förslaget är en förbättring.
   Byggd på golvvision-kanon med hero som före/efter-effekt (A → B).

   Bärande idé: en firma som gör både ute och inne — altanen med badtunnan,
   friggeboden, och hallen med de grå dörrarna — med fast pris och ett
   hembesök som inte kostar något. Deras egen process i tre steg
   (formulär → offert → startdatum) är stommen i sidans "Så går det till".

   VERIFIERAT (rskompakt.com + IG-bio + allabolag + offerta.se, 2026-09-08):
   Firmanamn "RS Kompakt AB" · org.nr 559427-6742 (sajtens footer),
   registrerat 2023-03-24, säte Botkyrka · Havrevägen 15, 145 68 Norsborg ·
   telefon 076-218 29 21 · e-post info@rskompakt.com (båda i sajt och IG-bio)
   · tjänster ordagrant: snickeri, måleri inne och ute, badrumsrenovering,
   köksrenovering, golvläggning, kakel/klinkersättning, altan, fasad ·
   kunder: privatpersoner och företag · "kostnadsfri offert", "gratis
   hembesök", "Stolt partner till Offerta" · Offerta: 5 stjärnor, 4 omdömen
   med namn och datum — tre citeras ordagrant · Offerta-badges: F-skatt,
   ansvarsförsäkring FORA upp till 5 MSEK, ID06, Byggnads · Facebook länkad
   från sajten · IG 237 inlägg, 1 891 följare · logotypen är deras egen
   (vit, transparent, från sajten).

   INTE verifierat, och finns därför inte på sidan: Google-betyg (inga
   hittade — Offerta används med källan utskriven), garantier, ledtider,
   priser, antal projekt. "Ett av Stockholms ledande" är deras egen fras
   och står inte här.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; galleriet och sociala
   är illustrationer (sajtens enda egna foto svarade 403), märkt en gång.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--rs-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--rs-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--rs-ui' });

export const metadata = {
  title: 'RS Kompakt AB — altan, kök, badrum och måleri i Stockholm',
  description:
    'Byggfirma i Norsborg. Altaner, badrum, kök, golv, måleri och snickeri för privatpersoner och företag i Stockholm. Fast pris, gratis hembesök. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '076-218 29 21';
const TEL_HREF = 'tel:+46762182921';
const EPOST = 'info@rskompakt.com';
const ADRESS = 'Havrevägen 15, 145 68 Norsborg';
const IG = 'https://www.instagram.com/rs_kompakt_ab/';
const FB = 'https://www.facebook.com/share/1BNc4Lpwjb/';
const OFFERTA = 'https://offerta.se/foretag/rs-kompakt-ab';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=RS%20Kompakt%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  altan: (<><path d="M20 78h160" /><path d="M36 78v-8h128v8" /><path d="M36 70v-22M164 70v-22M36 48h128" /><path d="M52 62h96" /><path d="M20 96h160M20 92v8M180 92v8" /></>),
  badrum: (<><path d="M40 30h120v60H40z" /><path d="M100 30v60M40 60h120" /><path d="M52 44l14 14M60 44l14 14" /><path d="M118 80l8-8 8 8" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  kok: (<><path d="M12 24h176v80H12z" /><path d="M70 24v80M130 24v80" /><path d="M58 60v10M82 60v10M118 60v10M142 60v10" /><path d="M12 112h176" /></>),
  maleri: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
};

const TJANSTER = [
  { id: 'altan', ritning: 'altan', namn: 'Altan och uteplats', text: 'Altan, trädäck, insynsskydd och plats för badtunnan. Byggt på tomten ni har, med grunden gjord rätt så däcket inte lutar om tre vintrar.', punkter: ['Altan och trädäck', 'Insynsskydd och räcke', 'Friggebod och förråd'] },
  { id: 'badrum', ritning: 'badrum', namn: 'Badrum', text: 'Från inspiration till färdigt badrum. Tätskikt, fall mot brunnen, kakel och klinker som ligger rakt. Vi hjälper till genom hela processen.', punkter: ['Badrumsrenovering', 'Kakel och klinker', 'Tätskikt och fall'] },
  { id: 'kok', ritning: 'kok', namn: 'Kök', text: 'Nytt kök eller ett som ska bli mer funktionellt. Planering, montering och färdigställande, med snickeri där det färdigköpta inte räcker.', punkter: ['Köksrenovering', 'Montering', 'Platsbyggt snickeri'] },
  { id: 'maleri', ritning: 'maleri', namn: 'Måleri och golv', text: 'Färg och tapet inne, fasadmålning ute, och golv som ger rummet ett nytt uttryck. Noggrant utfört, med rätt material för varje miljö.', punkter: ['Måleri inne och ute', 'Golvläggning', 'Tapet'] },
];

const STEGRITNINGAR = {
  formular: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  hembesok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  start: (<><path d="M14 92h172" /><path d="M40 92h120v-10H40z" /><path d="M40 82h120v-10H40z" /><path d="M78 72V52h44v20M90 52V38h20v14" /><path d="M14 106h172M14 102v8M186 102v8" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Fyll i formuläret', ritning: 'formular', text: 'Eller slå oss en signal. Berätta vilket projekt ni vill genomföra, så ställer vi de frågor som behövs för att förstå vad ni vill ha.' },
  { nr: '2', namn: 'Gratis hembesök', ritning: 'hembesok', text: 'Vid större jobb kommer vi ut och tittar. Ni får höra vad som behöver göras, vad som kan vänta, och vad som är värt pengarna.' },
  { nr: '3', namn: 'Kostnadsfri offert', ritning: 'offert', text: 'När vi har en klar bild skickar vi en offert utan dolda avgifter. Ni tittar igenom den i lugn och ro och väljer om ni vill gå vidare.' },
  { nr: '4', namn: 'Startdatum och arbete', ritning: 'start', text: 'Godkänner ni offerten hittar vi ett startdatum. På avtalad dag kommer vi, och vi håller er uppdaterade under arbetet.' },
  { nr: '5', namn: 'Klart, kom och titta', ritning: 'klart', text: 'Så fort vi är färdiga hör vi av oss så att ni kan komma och ta en titt. Sitter något fel tar vi det då.' },
];

const STATS = [
  { tal: 2023, prefix: '', etikett: 'Grundat' },
  { tal: 5, prefix: '', etikett: 'MSEK i ansvarsförsäkring' },
  { tal: 0, prefix: '', etikett: 'Kronor för hembesöket' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
];

const VARFOR = [
  'Ute och inne från samma firma: altanen, badrummet, köket och målningen.',
  'F-skatt, ID06 och ansvarsförsäkring upp till fem miljoner via FORA.',
  'Offert utan dolda avgifter, och ett startdatum som håller.',
  'Räcker det att olja om altanen säger vi det. Även när en ny hade gett oss mer betalt.',
];

/* Tre av fyra riktiga Offerta-omdömen, ordagrant (namn och datum som de står). */
const OMDOMEN = [
  { namn: 'Katrin', ort: 'Sollentuna · juli 2026', text: 'Vi är mycket nöjda med både resultatet och hela processen. Kommunikation, planering och utförande har fungerat mycket bra.' },
  { namn: 'Par', ort: 'Tyresö · januari 2026', text: 'RS Kompakt AB är den bästa byggmästare från Stockholm. Jag är väldigt nöjd med resultatet.' },
  { namn: 'Kristian', ort: 'Tyresö · juli 2026', text: 'Bygga altan 20 kvm i Tyresö. Fem stjärnor.' },
];

const FRAGOR = [
  { q: 'Vad kostar det att anlita er?', a: 'Det beror på projektet. Därför börjar vi med en kostnadsfri offert, och vid större jobb ett hembesök som inte kostar något. Offerten har inga dolda avgifter.' },
  { q: 'Hur går det till?', a: 'Fyll i formuläret eller ring. Vi ställer de frågor som behövs, skickar en offert, och godkänner ni den hittar vi ett startdatum. Så fort vi är klara hör vi av oss så ni kan komma och titta.' },
  { q: 'Bygger ni altan med plats för badtunna?', a: 'Ja. Grunden dimensioneras för vikten, och insynsskyddet byggs som en del av altanen, inte som en eftertanke.' },
  { q: 'Är ni försäkrade?', a: 'Vi har F-skatt, ID06 och ansvarsförsäkring upp till fem miljoner kronor via FORA, och vi är medlemmar i Byggnads.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Arbete i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
  { q: 'Gör ni både badrum och kök?', a: 'Ja, och golv, måleri och snickeri. Fördelen är att samma firma gör hela renoveringen, så ingen väntar på nästa hantverkare.' },
  { q: 'Hur lång tid tar det?', a: 'En altan tar ofta någon vecka, ett badrum några veckor eftersom tätskiktet måste torka. Ni får en tidplan med offerten.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Stockholm med omnejd, utgående från Norsborg. Vi har byggt i Tyresö, Sollentuna och Botkyrka. Ligger jobbet längre bort får ni säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function RsKompaktDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>RS Kompakt</b><i>Stockholm</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/rskompakt/media/poster-hero.jpg"><source src="/rskompakt/media/video-hero-fore-efter-altan.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/rskompakt/media/poster-hero-mobil.jpg"><source src="/rskompakt/media/video-hero-fore-efter-altan-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}><Image src="/rskompakt/media/logo-rs-kompakt-vit.png" alt="RS Kompakt AB" width={1248} height={794} priority /></h1>
            <p className={styles.heroTjanster}>Altan · Badrum · Kök</p>
            <p className={styles.heroOrt}>Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka gratis hembesök</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Altan och trädäck</span><span>Badrumsrenovering</span><span>Köksrenovering</span><span>Golvläggning</span><span>Kakel och klinker</span><span>Måleri inne och ute</span><span>Snickeri</span><span>Stockholm med omnejd</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="RS Kompakt i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Ute och inne. <em>Samma firma.</em></h2></div>
          <div className={styles.forvandling}>
            <figure><Image src="/rskompakt/media/galleri-fore-sliten-altan.jpg" alt="Sliten grå altan med spruckna brädor och alger, ogräs runt om" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/rskompakt/media/galleri-efter-ny-altan.jpg" alt="Samma plats med ny altan i furu, insynsskydd och plats för badtunna" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/rskompakt/media/galleri-makro-altanhorn.jpg" alt="Närbild på altanhörnet där brädorna möter räckesstolpen" width={1200} height={1200} /><figcaption>Hörnet som visar hantverket.</figcaption></figure>
            <figure><Image src="/rskompakt/media/galleri-hall-renoverad.jpg" alt="Renoverad hall med nyslipat furugolv och grågröna dörrar" width={1200} height={1200} /><figcaption>Hallen: golv, dörrar och färg.</figcaption></figure>
            <figure><Image src="/rskompakt/media/galleri-kok-renoverat.jpg" alt="Nyrenoverat kök med vita luckor och ekbänk" width={1200} height={1200} /><figcaption>Köket, från plan till klart.</figcaption></figure>
            <figure><Image src="/rskompakt/media/galleri-badrum-renoverat.jpg" alt="Nyrenoverat badrum med stora ljusa plattor och duschvägg i glas" width={1200} height={1200} /><figcaption>Badrummet, tätskiktet först.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Hela hemmet, <em>utan att byta firma</em></h2><p className={styles.sekLead}>Altanen och friggeboden ute, badrummet, köket, golven och färgen inne. Snickeri, måleri och plattsättning från samma händer.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och ni bestämmer <em>i det tredje</em></h2><p className={styles.sekLead}>Att anlita experter ska förenkla vardagen, inte skapa problem. Så här enkelt är det.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Bräda för bräda, <em>ingen genväg</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/rskompakt/media/poster-varfor.jpg" aria-label="Altanbrädorna läggs en efter en på det nya bjälklaget"><source src="/rskompakt/media/video-varfor-altanbradorna.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><Stjarnor /><span>Fem stjärnor på Offerta, fyra omdömen</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o) => (<figure className={styles.recension} key={o.namn}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Omdömen från Offerta, som de står där. Google-betyget kopplas in här när profilen finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href={OFFERTA} target="_blank" rel="noopener">Se alla omdömen på Offerta</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="RS Kompakt på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="RS Kompakt på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rskompakt/media/sociala-friggebod.jpg" alt="Nybyggd röd friggebod med vita foder" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rskompakt/media/sociala-altanbygge.jpg" alt="Altan under bygge, halva däcket lagt" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rskompakt/media/sociala-badtunna.jpg" alt="Badtunna nedsänkt i ny altan med insynsskydd" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pengar och risk först, det praktiska sedan. Gäller det just ert hem är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar ni inte svaret?</h3><p>Ring och fråga rakt ut. Vi säger vad som gäller just ert projekt.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Ta första steget<br /><em>mot ert drömprojekt.</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader om projektet. Hembesöket kostar ingenting, och offerten har inga dolda avgifter.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@rs_kompakt_ab</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Altan"><option>Altan</option><option>Badrum</option><option>Kök</option><option>Golv</option><option>Måleri</option><option>Något annat</option></select></label>
              <label>Kort om projektet<textarea name="meddelande" rows={4} placeholder="Vad ni vill göra, var ni bor, ungefärlig storlek, och när ni vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Boka gratis hembesök</button>
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
            <div><span className={styles.brandTxt}><b>RS Kompakt AB</b><i>Bygg och renovering</i></span><p className={styles.ftrText}>Altan, badrum, kök, golv, måleri och snickeri för privatpersoner och företag i Stockholm med omnejd.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@rs_kompakt_ab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>RS Kompakt AB · Org.nr 559427-6742 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta RS Kompakt"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Altan till sommaren?</p><p className={styles.popupTxt}>Hembesöket kostar ingenting. Ni får höra vad tomten tål och vad det kostar, innan ni bestämmer något.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan RS Kompakt se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på rskompakt.com, Offerta och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=RS%20Kompakt%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
