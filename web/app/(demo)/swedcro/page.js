import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './swedcro.module.css';

/* ===========================================================================
   SWEDCRO MÅLERI & FASAD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/swedcromaleri · Eskilstuna · HAR hemsida (swedcro.se,
   React-sajt med tjänster, galleri och omdömen) — förslaget är en förbättring.
   Byggd på golvvision-kanon (via rskompakt) med hero som före/efter-effekt.

   Bärande idé: fasaden är husets ansikte utåt (deras egen mening), och det
   som skiljer en fasad som håller från en som spricker om tre vintrar är
   förarbetet och sockeln. Heron visar exakt det: sprucken puts och fläckig
   sockel som blir ny akrylputs med mosaiksockel — samma hus, en tagning.

   VERIFIERAT (swedcro.se + IG-bio + hitta.se, 2026-09-09):
   Firmanamn "Swedcro Måleri & Fasad" · enskild firma i Eskilstuna,
   Hedevägen 22, 633 47 Eskilstuna (hitta.se) · telefon 072-271 74 41 ·
   e-post info@swedcro.se · öppet mån–fre 07–16 · tjänster i deras ord:
   måleri (väggar och tak, snickerier och dörrar, fasader, fönster),
   renovering (spackel och slipning, lister och foder, totalrenovering),
   tapetsering, akrylfasad med Rockwool-isolering, mosaik/sockelputs ·
   egna fraser: "Vi kommer hem till dig", "Hederligt hantverk, rena ytor och
   tydliga offerter", "Du betalar när du är 100 % nöjd", "Vi svarar oftast
   inom 24 timmar", "15+ års erfarenhet", "F-skatt & försäkrade" · Google:
   5,0 av 2 recensioner enligt sajtens egen Google-widget (Ivan Lukic, Stina
   Bergqvist, ordagrant) plus två sajt-omdömen (Yohanna Eskilstuna, Erik
   Västerås) · Facebook-sida länkad från sajten · IG 33 inlägg · 66 egna
   projektfoton via sajtens galleri — nio av dem används här · logotypen är
   deras egen (studiobakgrunden bortnycklad).

   INTE verifierat, och finns därför inte på sidan: org.nr, antal projekt,
   priser, garantier utöver "betala när du är nöjd". "15+ år" står som deras
   egen uppgift.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; före/efter-paret är
   illustration (märkt); galleri och sociala är deras egna foton.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--sw-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--sw-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--sw-ui' });

export const metadata = {
  title: 'Swedcro Måleri & Fasad — måleri, fasad och sockelputs i Eskilstuna',
  description:
    'Målare i Eskilstuna. Måleri, fasadrenovering, akrylputs, mosaik/sockelputs och tapetsering. Vi kommer hem till dig, fri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '072-271 74 41';
const TEL_HREF = 'tel:+46722717441';
const EPOST = 'info@swedcro.se';
const ADRESS = 'Hedevägen 22, 633 47 Eskilstuna';
const IG = 'https://www.instagram.com/swedcromaleri/';
const FB = 'https://www.facebook.com/people/Swedcro-M%C3%A5leri-Fasad/61590370362454/';
const GOOGLE = 'https://maps.google.com/?cid=17759085738304940273';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Swedcro%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  fasad: (<><path d="M20 100V44l80-30 80 30v56" /><path d="M20 100h160" /><path d="M20 84h160" /><path d="M56 60h20v20H56zM124 60h20v20h-20z" /><path d="M36 92h8M60 92h8M84 92h8M108 92h8M132 92h8M156 92h8" /></>),
  maleri: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  tapet: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 64c8-8 16 8 24 0M88 64c8-8 16 8 24 0M128 64c8-8 16 8 24 0M48 88c8-8 16 8 24 0M88 88c8-8 16 8 24 0M128 88c8-8 16 8 24 0" /></>),
  renovering: (<><path d="M28 24h144v80H28z" /><path d="M28 60h144" /><path d="M44 40h48M44 50h32" /><path d="M120 34l14 14M134 34l-14 14" /><path d="M44 76h112M44 88h80" /></>),
};

const TJANSTER = [
  { id: 'fasad', ritning: 'fasad', namn: 'Fasad och sockelputs', text: 'Din fasad är husets ansikte utåt. Akrylputs med Rockwool-isolering som skyddar mot fukt, vind och slitage, och en mosaiksockel som tål stötar och smuts utan underhåll.', punkter: ['Akrylfasad med isolering', 'Mosaik och sockelputs', 'Fasadmålning'] },
  { id: 'maleri', ritning: 'maleri', namn: 'Måleri inomhus', text: 'Väggar och tak, lister, foder och dörrar. Rätt förarbete och noggrann penselföring ger jämna ytor, skarpa kanter och en finish som håller.', punkter: ['Väggar och tak', 'Snickerier och dörrar', 'Fönstermålning'] },
  { id: 'tapet', ritning: 'tapet', namn: 'Tapetsering', text: 'Raka skarvar och mönsterpassning som stämmer. Vi tar bort den gamla tapeten, förbereder väggen och sätter den nya, mönstrad eller enfärgad.', punkter: ['Tapetborttagning', 'Förarbete av väggar', 'Mönster och enfärgat'] },
  { id: 'renovering', ritning: 'renovering', namn: 'Renovering', text: 'Helhetslösningar för ett rum eller hela hemmet, från spackling och slipning till färdig yta. En kontakt genom hela projektet.', punkter: ['Spackel och slipning', 'Lister och foder', 'Totalrenovering'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  hembesok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  arbete: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'kontakt', text: 'Berätta vad som ska göras. Vi svarar oftast inom 24 timmar med de första frågorna, så att vi förstår vad ni vill ha.' },
  { nr: '2', namn: 'Hembesök', ritning: 'hembesok', text: 'Vi kommer hem till dig, mäter, tittar på skicket och lyssnar på dina önskemål. Besöket kostar ingenting.' },
  { nr: '3', namn: 'Tydlig offert', ritning: 'offert', text: 'Ni får en offert som går att läsa: vad som ingår, vad det kostar och när vi kan börja. Inga dolda tillägg.' },
  { nr: '4', namn: 'Vi utför arbetet', ritning: 'arbete', text: 'Rätt material, skarp planering och ett hantverk som gör jobbet ordentligt. Vi håller er uppdaterade under vägen.' },
  { nr: '5', namn: 'Godkännande', ritning: 'klart', text: 'Vi går igenom resultatet tillsammans. Du betalar när du är 100 procent nöjd.' },
];

const STATS = [
  { tal: 15, prefix: '+', etikett: 'Års erfarenhet' },
  { tal: 0, prefix: '', etikett: 'Kronor för hembesök och offert' },
  { tal: 24, prefix: '', etikett: 'Timmar till första svar' },
  { tal: 100, prefix: '', etikett: 'Procent nöjd innan du betalar' },
];

const VARFOR = [
  'Vi kommer hem till dig, från första besiktning till sista penseldrag.',
  'F-skatt och försäkrade. Tydliga offerter utan dolda tillägg.',
  'Du betalar när du är 100 procent nöjd.',
  'Räcker det att måla om sockeln säger vi det. Även när en hel fasad hade gett oss mer betalt.',
];

/* Riktiga omdömen: två från Google (sajtens egen widget) och två från sajten, ordagrant. */
const OMDOMEN = [
  { namn: 'Stina Bergqvist', ort: 'Google', text: 'Målade om hela vårat radhus invändigt. Vi är otroligt nöjda med arbetet! Måleriet är utfört med hög kvalitet och resultatet blev över förväntan.' },
  { namn: 'Ivan Lukic', ort: 'Google', text: 'De spacklade väggarna efter tapetborttagning och målade hela bostaden med ett mycket professionellt resultat. Vi kan varmt rekommendera företaget till alla som söker en pålitlig och skicklig målare.' },
  { namn: 'Yohanna', ort: 'Eskilstuna', text: 'Jag är supernöjd med både arbetet och bemötandet! Fasaden blev jättefin och allt gick smidigt från början till slut. Mycket trevlig och professionell.' },
];

const FRAGOR = [
  { q: 'Vad kostar det?', a: 'Det beror på ytan, skicket och vad som ska göras. Därför börjar vi med ett hembesök och en offert, båda utan kostnad. Offerten har inga dolda tillägg.' },
  { q: 'Hur går det till?', a: 'Ring eller skriv. Vi kommer hem till dig, mäter och lyssnar, och skickar en tydlig offert. Godkänner du den bokar vi start, gör jobbet, och går igenom resultatet tillsammans innan du betalar.' },
  { q: 'Vad är mosaik och sockelputs?', a: 'En tålig puts av färgad sten som läggs på husets sockel. Den skyddar grunden mot fukt, smuts och stötar, är underhållsfri och ger en ren, rak kant mot fasaden.' },
  { q: 'Vad ingår i en akrylfasad?', a: 'Tilläggsisolering med obrännbara skivor från Rockwool och en flexibel, väderbeständig akrylputs i valfri kulör. Huset blir både varmare och snyggare.' },
  { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är försäkrade. Det står också i offerten.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Arbete i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
  { q: 'Gör ni tapetsering också?', a: 'Ja, med raka skarvar och mönsterpassning. Vi tar bort den gamla tapeten och förbereder väggen först, annars syns varje ojämnhet genom den nya.' },
  { q: 'Var arbetar ni?', a: 'Eskilstuna med omnejd. Vi har kunder i Västerås också. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function SwedcroDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Swedcro</b><i>Måleri &amp; Fasad</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/swedcro/media/poster-hero.jpg"><source src="/swedcro/media/video-hero-fore-efter-fasad.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/swedcro/media/poster-hero-mobil.jpg"><source src="/swedcro/media/video-hero-fore-efter-fasad-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={`${styles.heroLogo} ${styles.heroLogoBred}`}><Image src="/swedcro/media/logo-swedcro.png" alt="Swedcro Måleri & Fasad" width={870} height={355} priority /></h1>
            <p className={styles.heroTjanster}>Fasad · Måleri</p>
            <p className={styles.heroOrt}>Eskilstuna</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka gratis hembesök</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Fasadrenovering</span><span>Akrylputs</span><span>Mosaik och sockelputs</span><span>Måleri inne och ute</span><span>Tapetsering</span><span>Fönstermålning</span><span>Renovering</span><span>Eskilstuna med omnejd</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Swedcro i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Fasaden är husets <em>ansikte utåt.</em></h2><p className={styles.sekLead}>Det som skiljer en fasad som håller från en som spricker om tre vintrar är förarbetet och sockeln. Det är där vi lägger tiden.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/swedcro/media/galleri-fore-sprucken-puts.jpg" alt="Villa med sprucken gulnad puts, flagnande färg och fläckig betongsockel" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/swedcro/media/galleri-efter-ny-puts.jpg" alt="Samma villa med ny slät akrylputs, mosaiksockel och nymålade fönster" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Före/efter-paret är en illustration. Bilderna nedan är våra egna projekt.</p>
          <div className={styles.galleri}>
            <figure><Image src="/swedcro/media/galleri-makro-sockelputs.jpg" alt="Närbild på mosaiksockel i grå sten mot ljus fasad" width={1200} height={1200} /><figcaption>Mosaiksockeln på nära håll.</figcaption></figure>
            <figure><Image src="/swedcro/media/galleri-fasad-sockel.jpg" alt="Nyputsad villa med grå mosaiksockel och stenkant" width={1200} height={1200} /><figcaption>Ny fasad med sockelputs.</figcaption></figure>
            <figure><Image src="/swedcro/media/galleri-tapet.jpg" alt="Fondvägg med mönstrad tapet i blått och guld, golvet maskerat" width={1200} height={1200} /><figcaption>Tapet med mönsterpassning.</figcaption></figure>
            <figure><Image src="/swedcro/media/galleri-nymalat-rum.jpg" alt="Nymålat rum med snedtak, takfönster och nytt golv" width={1200} height={1200} /><figcaption>Nymålat, från tak till lister.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Allt under <em>samma tak</em></h2><p className={styles.sekLead}>Vi kommer hem till dig och tar hand om hela projektet, från första besiktning till sista penseldrag. Hederligt hantverk i Eskilstuna.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och du betalar <em>i det sista</em></h2><p className={styles.sekLead}>Från idé till färdigt resultat. Så här enkelt är det.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Hederligt hantverk, <em>rena ytor</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/swedcro/media/poster-varfor.jpg" aria-label="Långsam åkning längs den nya putsen ner till mosaiksockeln"><source src="/swedcro/media/video-varfor-putsen.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><svg className={styles.googleG} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.4 14a6 6 0 010-3.8V7.6H3.1a10 10 0 000 9l3.3-2.6z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.6L6.4 10c.8-2.3 3-4 5.6-4z" /></svg><Stjarnor /><span>5,0 på Google, två recensioner</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o) => (<figure className={styles.recension} key={o.namn}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Två från Google, ett från swedcro.se, som de står där. Kortade utan att ändra innebörd.</p><a className={`${styles.btn} ${styles.btnMork}`} href={GOOGLE} target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Swedcro på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Swedcro på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/swedcro/media/sociala-stallning.jpg" alt="Villa i byggställning under fasadrenovering, isolering på pall framför" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/swedcro/media/sociala-maskering.jpg" alt="Rum maskerat med papp och tejp inför målning" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/swedcro/media/sociala-villa-vinter.jpg" alt="Nyputsad vit villa i snö" width={1200} height={1200} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pengar och risk först, det praktiska sedan. Gäller det just ert hus är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi säger vad som gäller just ditt hus.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Få en fri offert<br /><em>redan idag.</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader. Vi kommer gärna hem till dig för en kostnadsfri besiktning, och svarar oftast inom 24 timmar.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Öppettider</span><b>Mån–fre 07–16</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@swedcromaleri</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Fasad och sockelputs"><option>Fasad och sockelputs</option><option>Måleri inomhus</option><option>Tapetsering</option><option>Renovering</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska göras, var huset står, ungefärlig yta, och när ni vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Boka gratis hembesök</button>
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
            <div><span className={styles.brandTxt}><b>Swedcro Måleri &amp; Fasad</b><i>Eskilstuna</i></span><p className={styles.ftrText}>Måleri, fasad, renovering och tapetsering. Vi kommer hem till dig. Hederligt hantverk, rena ytor och tydliga offerter.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@swedcromaleri</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Swedcro Måleri &amp; Fasad · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Swedcro"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Fasaden före vintern?</p><p className={styles.popupTxt}>Hembesöket kostar ingenting. Du får höra vad putsen och sockeln tål, och vad det kostar, innan du bestämmer något.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Swedcro se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på swedcro.se och Instagram, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Swedcro%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
