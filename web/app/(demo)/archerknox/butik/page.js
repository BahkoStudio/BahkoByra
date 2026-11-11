import Image from 'next/image';
import { fontKlasser } from '../../_mall/fonter';
import { PRODUKTER } from '../butik-produkter';
import s from './butik.module.css';

/* ===========================================================================
   ARCHER KNOX · webbutiken som landningssida (2026-11-11, Mathias efter säljsamtalet:
   "skapa en e-handelssida på [demon] vi skapade, lägg den i footern som en undersida").
   Byggd enligt skillen ecome-hemsida, men för ett sortiment i stället för en produkt:
   första skärmen = BirdBlocker stort i två färger med produkten framför som ett lager,
   kundens köplänk på VARJE köpknapp, inga småtexter, bara riktiga bilder.

   VERIFIERAT (2026-11-11): produkter, namn, priser och bilder ur archerknox.se/products.json
   och /collections/<kategori>/products.json (Shopify). Priserna visas som i webbutiken, i kr;
   butiken har en växel för inkl./exkl. moms, så sidan säger inte vilket. Leverans 1–2 dagar,
   lagershop i Kungsängen, offert vid större order, BirdBlocker-sortimentet i lager och "skadar
   inte fåglarna": se ../page.js VERIFIERAT. Omdömena: Judge.me i deras butik, ordagrant.
   Köpknapparna går till produktsidan på archerknox.se (den riktiga butiken och kassan).
   =========================================================================== */

export const metadata = {
  title: 'Webbutik | Archer Knox · BirdBlocker, nockband och takprodukter',
  description: 'Köp BirdBlocker fågelskydd för solpaneler, nockband, takmembran, taksäkerhet och tätningstejp. I lager, leverans på 1–2 dagar i hela Sverige eller hämta i Kungsängen.',
  robots: { index: false, follow: false },
  icons: { icon: '/archerknox/media/icon-archerknox.png', apple: '/archerknox/media/apple-icon-archerknox.png' },
};

const M = '/archerknox/media';
const BUTIK = 'https://archerknox.se';
const TEL = '070 560 55 38';
const TELHREF = 'tel:+46705605538';
const kr = (n) => `${Math.round(n).toLocaleString('sv-SE')} kr`;

const KATEGORIER = [
  { id: 'birdblocker', namn: 'BirdBlocker', rubrik: ['Fågelskydd', 'för solpaneler'], text: 'Fågelband som hindrar fåglar att häcka under panelerna. Går att sätta upp i efterhand och skadar inte fåglarna.', samling: 'birdblocker' },
  { id: 'nockband', namn: 'Nockband', rubrik: ['Nockband', 'och nocktätning'], text: 'Tätar nocken och skorstenen mot regn, snö och fåglar.', samling: 'nocktatning', data: 'nocktatning' },
  { id: 'fagelband', namn: 'Fågelband', rubrik: ['Fågelband', 'och fågelstopp'], text: 'Håller fåglarna borta från takfot, nock och skorsten.', samling: 'fagelband-fagelstopp', data: 'fagelband-fagelstopp' },
  { id: 'takmembran', namn: 'Takmembran', rubrik: ['Takmembran', 'och vindduk'], text: 'Diffusionsöppen underlagsduk för taket, vindduk och ångbroms för väggen.', samling: 'takmembran' },
  { id: 'taksakerhet', namn: 'Taksäkerhet', rubrik: ['Taksäkerhet', 'för sotaren och dig'], text: 'Takbrygga, taksteg och sotarbrygga.', samling: 'taksakerhet' },
  { id: 'tejp', namn: 'Tejp och butyl', rubrik: ['Tätningstejp', 'och butyl'], text: 'Flextejp, butyltejp och dubbelhäftande för tak och fasad.', samling: 'tatningstejp-butyl', data: 'tatningstejp-butyl' },
];

const OMDOMEN = [
  { namn: 'Smart Takvård', vad: 'Fågelband BB200', text: 'Alltid kvalitetsprodukter, fantastisk service och kunnig samt lösningsorienterad personal! Rekommeras starkt!' },
  { namn: 'Lars-Anders Pettersson', vad: 'Nockband M', text: 'Funkar toppen snabbt och rätt.' },
  { namn: 'Anonym kund', vad: 'Nockband M', text: 'Mycket snabb och fin service! Återkommer gärna!!!' },
];

const Kort = ({ p, prio }) => (
  <li className={s.kort}>
    <a className={s.kortBild} href={`${BUTIK}/products/${p.h}`} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
      <Image src={`${M}/butik/${p.h}.webp`} alt="" width={640} height={640} sizes="(max-width: 600px) 46vw, 260px" priority={prio} />
    </a>
    <h3>{p.namn}</h3>
    <p className={s.pris}>{p.fran ? 'från ' : ''}{kr(p.pris)}</p>
    <a className={s.kop} href={`${BUTIK}/products/${p.h}`} target="_blank" rel="noopener">Köp nu<span className={s.sr}> – {p.namn}</span></a>
  </li>
);

export default function ArcherKnoxButik() {
  return (
    <div className={`${fontKlasser} ${s.sida}`}>
      <header className={s.topp}>
        <a href="/archerknox/" className={s.logo} aria-label="Archer Knox, till startsidan">
          <Image src={`${M}/logo-archerknox.png`} alt="Archer Knox" width={819} height={162} priority sizes="170px" />
        </a>
        <nav className={s.meny} aria-label="Kategorier">
          {KATEGORIER.slice(0, 4).map((k) => <a href={`#${k.id}`} key={k.id}>{k.namn}</a>)}
        </nav>
        <a className={s.ring} href={TELHREF}>Ring {TEL}</a>
      </header>

      <main>
        {/* Första skärmen: namnet stort i två färger, produkten framför som ett lager (ecome-hemsida). */}
        <section className={s.hero}>
          <p className={s.eyebrow}>Webbutik · i lager · leverans på 1–2 dagar</p>
          <h1 className={s.namn}><span>Bird</span><span>Blocker</span></h1>
          <div className={s.lager} aria-hidden="true">
            <Image src={`${M}/butik/fagelband-bb200.webp`} alt="" width={640} height={640} priority sizes="(max-width: 700px) 80vw, 520px" />
          </div>
          <div className={s.heroText}>
            <p className={s.ingress}>Fågelskydd för solpaneler. Hela sortimentet i lager, skickat i hela Sverige eller hämtat i Kungsängen.</p>
            <div className={s.knappar}>
              <a className={s.knapp} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
              <a className={`${s.knapp} ${s.knappLjus}`} href="#sortiment">Se hela sortimentet</a>
            </div>
          </div>
        </section>

        <ul className={s.loften} aria-label="Leverans">
          <li><b>1–2 dagar</b><span>Leverans i hela Sverige</span></li>
          <li><b>Lagershop</b><span>Hämta i Kungsängen</span></li>
          <li><b>Offert</b><span>Vid större order</span></li>
          <li><b>Proffs och privat</b><span>Vi säljer till båda</span></li>
        </ul>

        <section className={s.sektion} aria-labelledby="bast">
          <p className={s.eyebrow}>Bästsäljare</p>
          <h2 id="bast" className={s.h2}>Det här <em>köper flest</em></h2>
          <ul className={s.rutnat}>{PRODUKTER.bastsaljare.map((p, i) => <Kort p={p} prio={i < 2} key={p.h} />)}</ul>
        </section>

        <nav className={s.chips} id="sortiment" aria-label="Sortiment">
          {KATEGORIER.map((k) => <a href={`#${k.id}`} key={k.id}>{k.namn}</a>)}
        </nav>

        {KATEGORIER.map((k, i) => (
          <section className={`${s.sektion} ${i % 2 ? s.mjuk : ''}`} id={k.id} key={k.id} aria-labelledby={`r-${k.id}`}>
            <div className={s.sektionHuvud}>
              <div>
                <p className={s.eyebrow}>{k.namn}</p>
                <h2 id={`r-${k.id}`} className={s.h2}>{k.rubrik[0]} <em>{k.rubrik[1]}</em></h2>
                <p className={s.lead}>{k.text}</p>
              </div>
              <a className={s.alla} href={`${BUTIK}/collections/${k.samling}`} target="_blank" rel="noopener">Alla {k.namn.toLowerCase()} i butiken</a>
            </div>
            <ul className={s.rutnat}>{PRODUKTER[k.data || k.samling].map((p) => <Kort p={p} key={p.h} />)}</ul>
          </section>
        ))}

        <section className={s.sektion} aria-labelledby="omd">
          <p className={s.eyebrow}>Omdömen från butiken</p>
          <h2 id="omd" className={s.h2}>Snabbt, rätt <em>och kunnigt</em></h2>
          <ul className={s.omdomen}>
            {OMDOMEN.map((o) => (
              <li key={o.namn}>
                <span className={s.stjarnor} role="img" aria-label="5 av 5 stjärnor">★★★★★</span>
                <blockquote>{o.text}</blockquote>
                <p><b>{o.namn}</b> · {o.vad}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.slut}>
          <div>
            <h2 className={s.h2}>Större order? <em>Vi skickar offert.</em></h2>
            <p className={s.lead}>Takläggare, solcellsföretag och föreningar: berätta vad ni behöver, så får ni pris.</p>
          </div>
          <div className={s.knappar}>
            <a className={s.knapp} href="/archerknox/#kontakt">Begär offert</a>
            <a className={`${s.knapp} ${s.knappLjus}`} href={TELHREF}>Ring {TEL}</a>
          </div>
        </section>
      </main>

      <footer className={s.fot}>
        <a href="/archerknox/" className={s.fotLogo} aria-label="Archer Knox, till startsidan">
          <Image src={`${M}/logo-archerknox-ljus.png`} alt="Archer Knox" width={819} height={162} sizes="200px" />
        </a>
        <nav aria-label="Sidan">
          <a href="/archerknox/">Startsida</a>
          <a href="#sortiment">Sortiment</a>
          <a href="/archerknox/#kontakt">Kontakt</a>
          <a href={`${BUTIK}/collections/alla-produkter`} target="_blank" rel="noopener">Alla produkter</a>
        </nav>
        <p>Archer Knox AB · Örtugsvägen 15, 196 32 Kungsängen · <a href={TELHREF}>{TEL}</a> · <a href="mailto:info@archerknox.se">info@archerknox.se</a></p>
      </footer>

      <a className={s.mobilKop} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
    </div>
  );
}
