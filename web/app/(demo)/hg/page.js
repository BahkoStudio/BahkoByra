import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './hg.module.css';

/* ===========================================================================
   HG MASKINENTREPRENAD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/hgmaskinentreprenad · ingen hemsida · ingen ort angiven.
   Byggd på golvvision-kanon (via alltfix) med hero som före/efter-effekt.

   Bärande idé: deras egen bio säger att de "riktar sig främst mot
   företagskunder". En platschef köper inte en maskin, hen köper en dag som
   blir klar. Heron visar just det: en obruten tomt vid skogskanten som
   blir en plan, packad grusplan med dike, och maskinen parkerad vid kanten.

   VERIFIERAT (IG-profil och bio, skärmdump från Mathias 2026-09-18):
   Kontonamn "HG Maskinentreprenad" (@hgmaskinentreprenad) · kategori
   Entreprenör · bio ordagrant (avklippt i skärmdumpen): "HG
   Maskinentreprenad riktar sig främst mot företagskunder med fokus på
   maskinkörning och övriga entreprenad/markjobb" · 2 inlägg: en maskin på
   trailer och en hjullastare · 47 följare · logotypen är en rund svart/röd
   badge med "HG" och "ENTREPRENAD".

   INTE verifierat, och finns därför inte på sidan: org.nr (ingen
   registerträff på namnet), hemsida, telefon, e-post, ORT, maskinpark,
   priser, omdömen. Underpunkterna i tjänstekorten (schakt, planering,
   dränering) är vanliga exempel på "markjobb" — bekräfta med kunden.
   Statsraden är erbjudanden i mallens form, inte historik.

   FLAGGOR: ingen kontaktväg utom Instagram — knapparna går till formuläret
   och till Instagram. Ordmärke i stället för logotyp (profilbilden är
   100 px). Omdömen i exempelläge. Alla bilder är illustrationer.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--hg-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--hg-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--hg-ui' });

export const metadata = {
  title: 'HG Maskinentreprenad — maskinkörning och markarbeten för företag',
  description:
    'Maskinkörning, entreprenad och markjobb för företagskunder. Maskin med förare, en kontakt och ett jobb som blir klart. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const IG = 'https://www.instagram.com/hgmaskinentreprenad/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=HG%20Maskinentreprenad%20-%20f%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  maskin: (<><path d="M20 96h160" /><path d="M36 96V70h44l16-30h30l10 30h10v26" /><circle cx="56" cy="96" r="10" /><circle cx="126" cy="96" r="10" /><path d="M96 40l40-22 30 18" /><path d="M166 36l12 20-10 4" /></>),
  schakt: (<><path d="M14 60h60v40h52V60h60" /><path d="M14 110h172" /><path d="M86 70h28M86 84h28" /></>),
  plan: (<><path d="M20 84h160" /><path d="M20 84l18-20h124l18 20" /><path d="M40 96h120" /><path d="M56 74h16M92 74h16M128 74h16" /></>),
  foretag: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
};

const TJANSTER = [
  { id: 'maskin', ritning: 'maskin', namn: 'Maskinkörning', text: 'Maskin med förare på plats när ni behöver den. Ni beställer resultatet, inte bara timmarna.', punkter: ['Maskin med förare', 'Hjullastare', 'Korta och längre uppdrag'] },
  { id: 'schakt', ritning: 'schakt', namn: 'Mark och schakt', text: 'Markjobb som gör att nästa led kan börja på utsatt dag. Rätt nivå, rätt lutning, ingen omtagning.', punkter: ['Schakt', 'Dränering och diken', 'Återfyllnad'] },
  { id: 'plan', ritning: 'plan', namn: 'Planering och grus', text: 'Uppställningsytor, grusplaner och tillfartsvägar som är plana, packade och klara att använda.', punkter: ['Grusplaner', 'Tillfartsvägar', 'Packning'] },
  { id: 'foretag', ritning: 'foretag', namn: 'Entreprenad för företag', text: 'Vi riktar oss främst mot företagskunder: byggföretag, fastighetsägare och andra entreprenörer som behöver en pålitlig underentreprenör.', punkter: ['Underentreprenad', 'Ramavtal', 'En kontakt per uppdrag'] },
];

const STEGRITNINGAR = {
  forfragan: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  plats: (<><path d="M20 96h160" /><path d="M36 96c0-18 6-30 14-38M56 96c0-22 8-36 18-46M76 96c0-18 6-30 14-38" /><path d="M120 96V56h44v40z" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  jobb: (<><path d="M20 96h160" /><path d="M36 96V70h44l16-30h30l10 30h10v26" /><circle cx="56" cy="96" r="10" /><circle cx="126" cy="96" r="10" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Förfrågan', ritning: 'forfragan', text: 'Beskriv jobbet, platsen och när det ska vara klart. Ritning eller bilder räcker långt.' },
  { nr: '2', namn: 'Vi tittar på plats', ritning: 'plats', text: 'Vi ser på förutsättningarna så att rätt maskin kommer ut första gången.' },
  { nr: '3', namn: 'Offert', ritning: 'offert', text: 'Ni får pris och tidplan innan något startar. Offerten kostar ingenting.' },
  { nr: '4', namn: 'Utförande', ritning: 'jobb', text: 'Maskin och förare på plats på utsatt dag. Vi håller er uppdaterade om något ändras.' },
  { nr: '5', namn: 'Klart för nästa led', ritning: 'klart', text: 'Ytan lämnas plan, packad och redo. Nästa hantverkare kan börja direkt.' },
];

/* Löftesbaserad statsrad — ingen historik är verifierad. */
const STATS = [
  { tal: 0, prefix: '', etikett: 'Kronor för offerten' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson per uppdrag' },
  { tal: 1, prefix: '', etikett: 'Faktura, maskin och förare' },
  { tal: 0, prefix: '', etikett: 'Mellanhänder' },
];

const VARFOR = [
  'Vi riktar oss främst mot företagskunder. Vi vet vad en försenad markentreprenad kostar nästa led.',
  'Maskin och förare från samma ställe, med en kontakt som svarar.',
  'Offert och tidplan innan start, och besked direkt om något ändras.',
  'Räcker en mindre maskin för jobbet säger vi det. Även när en större hade gett oss mer betalt.',
];

/* Inga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Byggföretag', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Fastighetsägare', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Entreprenör', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Tar ni jobb åt privatpersoner?', a: 'Vi riktar oss främst mot företagskunder. Hör av dig ändå, så säger vi om vi kan hjälpa till.' },
  { q: 'Hyr ni ut maskin med förare?', a: 'Ja. Maskinkörning med förare är kärnan i det vi gör.' },
  { q: 'Vad kostar det?', a: 'Det beror på jobbet, maskinen och tiden. Offerten kostar ingenting, och ni får pris och tidplan innan start.' },
  { q: 'Hur snabbt kan ni komma ut?', a: 'Det beror på beläggningen. Beskriv jobbet och datumet så får ni ett rakt besked.' },
  { q: 'Kan vi få ramavtal?', a: 'Ja, för återkommande uppdrag går det att lägga upp ett ramavtal med fasta villkor.' },
  { q: 'Var arbetar ni?', a: 'Berätta var jobbet ligger, så säger vi om vi kan ta det.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function HgDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>HG Maskinentreprenad</b><i>Mark och maskin</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href="#kontakt" aria-label="Begär offert"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">Begär offert</span><span className={styles.hdrTelKort} aria-hidden="true">Offert</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/hg/media/poster-hero.jpg"><source src="/hg/media/video-hero-fore-efter-plan.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/hg/media/poster-hero-mobil.jpg"><source src="/hg/media/video-hero-fore-efter-plan-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroOrdmarke}>HG Maskinentreprenad</h1>
            <p className={styles.heroTjanster}>Maskinkörning · Markjobb</p>
            <p className={styles.heroOrt}>För företagskunder</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Begär offert</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={IG} target="_blank" rel="noopener">Skriv på Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Maskinkörning</span><span>Maskin med förare</span><span>Markarbeten</span><span>Schakt</span><span>Grusplaner</span><span>Dränering</span><span>Entreprenad</span><span>Företagskunder</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="HG Maskinentreprenad i korthet">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Ni köper inte en maskin. <em>Ni köper en dag som blir klar.</em></h2><p className={styles.sekLead}>Stenarna bort, marken planad, diket grävt. När maskinen parkerar vid kanten kan nästa led börja.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/hg/media/galleri-fore-obruten-tomt.jpg" alt="Obruten tomt vid skogskanten med sten, ris och ojämn mark" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/hg/media/galleri-efter-plan.jpg" alt="Samma tomt planad till en packad grusplan med dike och hjullastare vid kanten" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/hg/media/galleri-makro-skopa.jpg" alt="Närbild på skoptänder mot packat grus" width={1200} height={1200} /><figcaption>Planat till rätt nivå.</figcaption></figure>
            <figure><Image src="/hg/media/galleri-transport.jpg" alt="Grävmaskin lastad på trailer bakom en lastbil" width={1200} height={1200} /><figcaption>Maskinen på plats när den behövs.</figcaption></figure>
            <figure><Image src="/hg/media/galleri-dike.jpg" alt="Grävt dike med dräneringsrör längs en grusväg" width={1200} height={1200} /><figcaption>Dränering med raka väggar.</figcaption></figure>
            <figure><Image src="/hg/media/galleri-grusvag.jpg" alt="Ny packad grusväg in i skogen med diken på båda sidor" width={1200} height={1200} /><figcaption>Tillfartsväg, packad och klar.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Maskinkörning och <em>markjobb</em></h2><p className={styles.sekLead}>Vi riktar oss främst mot företagskunder, med fokus på maskinkörning och övriga entreprenad- och markjobb.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och ni har tidplanen <em>i det tredje</em></h2><p className={styles.sekLead}>Inga överraskningar på plats. Så här går ett uppdrag till.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Klart <em>på utsatt dag</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/hg/media/poster-varfor.jpg" aria-label="Långsam åkning längs kanten på en nyplanad grusplan"><source src="/hg/media/video-varfor-planen.mp4" type="video/mp4" /></video></figure>
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
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/HG+Maskinentreprenad" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="HG Maskinentreprenad på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hg/media/sociala-gryning.jpg" alt="Hjullastare med tända strålkastare på en grusplan i gryningen" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hg/media/sociala-hytten.jpg" alt="Grävmaskinens hytt på en byggarbetsplats" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hg/media/sociala-sten-och-grus.jpg" alt="Sorterad sten och krossgrus på en planad yta" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Kort och rakt, som på en byggarbetsplats.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar ni inte svaret?</h3><p>Beskriv jobbet så får ni ett rakt besked om maskin, tid och pris.</p><a className={`${styles.btn} ${styles.btnMork}`} href="#kontakt">Begär offert</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska göras,<br /><em>var och när?</em></h2>
              <p className={styles.sekLead}>Beskriv jobbet så återkommer vi med pris och tidplan. Offerten kostar ingenting.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@hgmaskinentreprenad</b></a>
                <div className={styles.kontaktRad}><span>Kunder</span><b>Främst företag</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Företag<input type="text" name="foretag" autoComplete="organization" required /></label>
              <label>Kontaktperson<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>Vad gäller det?<select name="typ" defaultValue="Maskinkörning"><option>Maskinkörning</option><option>Mark och schakt</option><option>Grusplan eller väg</option><option>Ramavtal</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Var jobbet ligger, vad som ska göras, ungefärlig omfattning och när det ska vara klart" /></label>
              <button className={styles.btn} type="submit">Begär offert</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={IG} target="_blank" rel="noopener">Eller skriv på Instagram</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobbet — då kan vi ge ett vettigt svar direkt. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>HG Maskinentreprenad</b><i>Mark och maskin</i></span><p className={styles.ftrText}>Maskinkörning och övriga entreprenad- och markjobb, främst för företagskunder.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={IG} target="_blank" rel="noopener">@hgmaskinentreprenad</a><a href="#kontakt">Begär offert</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>HG Maskinentreprenad</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta HG Maskinentreprenad"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Maskin till nästa vecka?</p><p className={styles.popupTxt}>Beskriv jobbet så får ni pris och tidplan. Offerten kostar ingenting.</p><a className={`${styles.btn} ${styles.popupCta}`} href="#kontakt">Begär offert</a><a className={styles.popupAlt} href={IG} target="_blank" rel="noopener">Eller skriv på Instagram →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan HG Maskinentreprenad se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna maskiner, er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=HG%20Maskinentreprenad%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
