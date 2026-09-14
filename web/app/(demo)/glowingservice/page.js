import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './glowingservice.module.css';

/* ===========================================================================
   GLOWING SERVICE AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/glowingserviceab · Stockholm · ingen hemsida.
   Tredje versionen (2026-09-14): ombyggd på golvvision-kanon med modulerna
   och hero som före/efter-effekt. Ersätter SV Hus-versionen från 2026-08-19.
   Gamla /cloud/glowingservice/ pekas hit med redirect — bryts aldrig.

   Bakgrund: första demon byggdes som städfirma — fel nisch. Yoros eget svar
   i IG-chatten: "Hej vi städar inte målar bara." Måleri, inget annat.

   Bärande idé: nymålat som håller är underarbetet, inte färgen. Heron visar
   det: en flagnande gul trävilla som skrapas, tvättas och målas panel för
   panel tills den står antracitgrå med vita foder.

   VERIFIERAT (IG-konto + IG-chatt + profilbilden Mathias skickade, 2026-09-14):
   Firmanamn "Glowing Service AB" (kontonamnet "GLOWING SERVICE AB STOCKHOLM"
   och profilbilden) · ort Stockholm (samma källa — ersätter beslutet
   2026-08-19 att inte ange ort, som gällde en gissning) · enbart måleri
   (Yoros ord) · kontaktperson Yoro · Instagram @glowingserviceab, 89 inlägg.

   INTE verifierat, och finns därför inte på sidan: telefon (PLATSHÅLLARE
   070-123 45 67), e-post, org.nr (hitta.se:s "Glowing Service Stockholm AB"
   är en trolig men obekräftad träff — se lead-filen), historik, antal jobb,
   priser, Google-betyg. Fast pris, underarbete och en kontakt är
   ERBJUDANDE-löften i mallens form, inte historik.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; omdömen i exempelläge;
   ordmärke i stället för logotyp (profilbilden är 100 px); alla bilder är
   illustrationer, märkt en gång.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--gs-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--gs-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--gs-ui' });

export const metadata = {
  title: 'Glowing Service AB — måleri i Stockholm som håller',
  description:
    'Målare i Stockholm. Väggar, tak, fasader, fönster och snickerier. Underarbetet ingår alltid, fast pris innan start, en kontakt hela vägen. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '070-123 45 67';
const TEL_HREF = 'tel:0701234567';
const IG = 'https://www.instagram.com/glowingserviceab/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Glowing%20Service%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi målar' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  inne: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  ute: (<><path d="M20 100V44l80-30 80 30v56" /><path d="M20 100h160" /><path d="M56 60h20v20H56zM124 60h20v20h-20z" /><path d="M40 40v60M64 32v68M88 24v76M112 24v76M136 32v68M160 40v60" /></>),
  tapet: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 64c8-8 16 8 24 0M88 64c8-8 16 8 24 0M128 64c8-8 16 8 24 0M48 88c8-8 16 8 24 0M88 88c8-8 16 8 24 0M128 88c8-8 16 8 24 0" /></>),
  snickeri: (<><path d="M60 18h80v86H60z" /><path d="M72 30h56v28H72zM72 66h56v28H72z" /><path d="M128 44h8M128 80h8" /><path d="M40 110h120" /></>),
};

const TJANSTER = [
  { id: 'inne', ritning: 'inne', namn: 'Måleri inne', text: 'Väggar, tak och lister. Tvättat, spacklat och grundat innan en droppe färg. Det är underarbetet som avgör hur länge det håller.', punkter: ['Väggar och tak', 'Lister och foder', 'Underarbetet ingår alltid'] },
  { id: 'ute', ritning: 'ute', namn: 'Måleri ute', text: 'Fasader, fönster och detaljer. Skrapat, tvättat och grundat så färgen fäster, inte bara ett nytt lager ovanpå det gamla.', punkter: ['Fasader', 'Fönster och dörrar', 'Skrapning och grundning'] },
  { id: 'tapet', ritning: 'tapet', namn: 'Tapet och spackel', text: 'Släta väggar att tapetsera eller måla på. Vi lagar sprickor och hål i stället för att gömma dem.', punkter: ['Tapetsering', 'Bredspackling', 'Lagning av sprickor'] },
  { id: 'snickeri', ritning: 'snickeri', namn: 'Snickerimålning', text: 'Dörrar, karmar och köksluckor. De ytor man tar i varje dag, och där slarv syns först.', punkter: ['Dörrar och karmar', 'Köksluckor', 'Trappräcken'] },
];

const STEGRITNINGAR = {
  beratta: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  pris: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  underarbete: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M48 40l12 12M70 40l12 12M92 40l12 12" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  malning: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  genomgang: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Berätta om jobbet', ritning: 'beratta', text: 'Ring eller skriv några rader om vad som ska målas. Bilder räcker långt, du behöver inte kunna facktermerna.' },
  { nr: '2', namn: 'Fast pris innan start', ritning: 'pris', text: 'Du får priset skriftligt innan något börjar. Inga tillägg under jobbets gång.' },
  { nr: '3', namn: 'Underarbetet först', ritning: 'underarbete', text: 'Tvätt, spackel och grund. Vi täcker golv och möbler innan vi öppnar en burk.' },
  { nr: '4', namn: 'Vi målar klart', ritning: 'malning', text: 'Två strykningar, aldrig en. Vi lämnar rent efter oss varje dag, så att du kan bo som vanligt.' },
  { nr: '5', namn: 'Genomgång i dagsljus', ritning: 'genomgang', text: 'Vi synar ytorna tillsammans med dig innan vi packar ihop. Missat något? Då tar vi det direkt.' },
];

/* Löftesbaserad statsrad — ingen historik finns verifierad. */
const STATS = [
  { tal: 0, prefix: '', etikett: 'Kronor för offerten' },
  { tal: 0, prefix: '', etikett: 'Tillägg efter fast pris' },
  { tal: 2, prefix: '', etikett: 'Strykningar, aldrig en' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
];

const VARFOR = [
  'Underarbetet ingår alltid: tvätt, spackel och grund är inte tillval.',
  'Fast pris skriftligt innan start. Inga tillägg när vi väl är på plats.',
  'Samma person från första meddelandet till sista strykningen.',
  'Räcker det att tvätta fasaden säger vi det. Även när en ommålning hade gett oss mer betalt.',
];

/* Inga riktiga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Villa, Stockholm', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Lägenhet, Stockholm', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Radhus, Stockholm', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Vad kostar det att måla om?', a: 'Det beror på ytorna och skicket, så vi gissar inte i telefon. Skicka några bilder eller be oss titta. Du får ett fast pris skriftligt innan något börjar.' },
  { q: 'Hur går det till?', a: 'Berätta om jobbet, få fast pris, så gör vi underarbetet, målar klart och går igenom allt tillsammans i dagsljus innan vi packar ihop.' },
  { q: 'Måste jag flytta ut möblerna?', a: 'Nej. Vi täcker golv och möbler och flyttar det som behöver flyttas. Du ska kunna bo som vanligt medan vi målar.' },
  { q: 'Hur lång tid tar ett rum?', a: 'Det avgörs av underarbetet. Ett rum med fina väggar går fort, ett med sprickor och gammal tapet tar längre. Du får en tidsuppskattning tillsammans med priset.' },
  { q: 'Målar ni ute också?', a: 'Ja. Fasader, fönster och snickerier, med skrapning, tvätt och grundning innan färgen så att den fäster på riktigt.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Måleri i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
  { q: 'Vad händer om något blir fel?', a: 'Vi går igenom alla ytor tillsammans i dagsljus innan vi lämnar. Hittar du något efteråt hör du av dig till samma person du haft hela vägen.' },
  { q: 'Var arbetar ni?', a: 'Stockholm med omnejd. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function GlowingServiceDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Glowing Service</b><i>Måleri · Stockholm</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/glowingservice/media/poster-hero.jpg"><source src="/glowingservice/media/video-hero-fore-efter-villa.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/glowingservice/media/poster-hero-mobil.jpg"><source src="/glowingservice/media/video-hero-fore-efter-villa-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroOrdmarke}>Glowing Service AB</h1>
            <p className={styles.heroTjanster}>Måleri inne · Måleri ute</p>
            <p className={styles.heroOrt}>Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få fast pris</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här målar vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Väggar och tak</span><span>Fasader</span><span>Fönster och dörrar</span><span>Tapetsering</span><span>Spackling</span><span>Köksluckor</span><span>Lister och foder</span><span>Stockholm med omnejd</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Glowing Service i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Nymålat som håller är <em>underarbetet.</em></h2><p className={styles.sekLead}>Färgen är den sista timmen. Skrapningen, tvätten och grunden är resten av dagen. Det är därför det ser ut så här om fem år också.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/glowingservice/media/galleri-fore-villa-flagnande.jpg" alt="Gul trävilla med flagnande färg och gråa fläckar" width={1376} height={768} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/glowingservice/media/galleri-efter-villa-antracit.jpg" alt="Samma villa nymålad i antracitgrått med vita fönsterfoder" width={1376} height={768} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/glowingservice/media/galleri-makro-kant-mot-foder.jpg" alt="Närbild på den skarpa kanten mellan grå fasadfärg och vitt fönsterfoder" width={1200} height={1200} /><figcaption>Kanten som visar handen.</figcaption></figure>
            <figure><Image src="/glowingservice/media/galleri-detalj-skarpt-snitt.jpg" alt="Nymålad vit golvlist mot ljust trägolv, skarpt snitt" width={1920} height={1084} /><figcaption>Listen: skarpt snitt, ingen färg på golvet.</figcaption></figure>
            <figure><Image src="/glowingservice/media/galleri-nymalad-trafasad.jpg" alt="Nymålad grå träfasad med vita fönster i kvällsljus" width={928} height={1152} /><figcaption>Fasad, grundad och struken två gånger.</figcaption></figure>
            <figure><Image src="/glowingservice/media/galleri-nymalat-rum.jpg" alt="Nymålat vitt rum med fönster och trägolv" width={1920} height={1084} /><figcaption>Rummet, klart för inflyttning.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi målar</p><h2 className={styles.h2}>Inne och ute, <em>samma noggrannhet</em></h2><p className={styles.sekLead}>Måleri, inget annat. Från vägg och tak till fasad och köksluckor, med underarbetet som alltid ingår.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och priset är fast <em>i det andra</em></h2><p className={styles.sekLead}>Du ska kunna bo som vanligt medan vi målar. Så här enkelt är det.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Nytt, <em>inte nästan bra</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/glowingservice/media/poster-varfor.jpg" aria-label="Långsam åkning längs den nymålade panelen förbi ett vitt fönsterfoder"><source src="/glowingservice/media/video-varfor-panelen.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><svg className={styles.googleG} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.4 14a6 6 0 010-3.8V7.6H3.1a10 10 0 000 9l3.3-2.6z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.6L6.4 10c.8-2.3 3-4 5.6-4z" /></svg><span>Här står ert Google-betyg när profilen är på plats</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor tom /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Glowing+Service+AB+Stockholm" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Glowing Service på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/glowingservice/media/sociala-tackt-golv.jpg" alt="Täckt golv, färgburk och roller i ett rum som målas" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/glowingservice/media/sociala-maskerat-fonster.jpg" alt="Fönster maskerat med tejp och plast inför målning" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/glowingservice/media/sociala-stege-halvmalad-fasad.jpg" alt="Stege mot en fasad som är halvmålad i grått" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och möbler först, det praktiska sedan. Gäller det just ditt hem är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Yoro säger vad som gäller just dina ytor.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska målas,<br /><em>och när?</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader och bifoga bilder. Du får ett fast pris skriftligt innan något börjar.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <div className={styles.kontaktRad}><span>Kontakt</span><b>Yoro</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@glowingserviceab</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad ska målas?<select name="typ" defaultValue="Väggar och tak"><option>Väggar och tak</option><option>Fasad</option><option>Fönster och dörrar</option><option>Tapet och spackel</option><option>Köksluckor och snickerier</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska målas, ungefär hur stort, var du bor och när du vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Få fast pris</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobbet — då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Glowing Service AB</b><i>Måleri · Stockholm</i></span><p className={styles.ftrText}>Måleri inne och ute i Stockholm med omnejd. Underarbetet ingår alltid, fast pris innan start, en kontakt hela vägen.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={IG} target="_blank" rel="noopener">@glowingserviceab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Glowing Service AB · Stockholm</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Glowing Service"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Nymålat till helgen?</p><p className={styles.popupTxt}>Skicka några bilder så får du ett fast pris. Inga tillägg efteråt, och du bor kvar medan vi målar.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Glowing Service se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Glowing%20Service%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
