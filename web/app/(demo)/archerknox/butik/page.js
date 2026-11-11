import Image from 'next/image';
import { fontKlasser } from '../../_mall/fonter';
import { PRODUKTER } from '../butik-produkter';
import Kalkyl from './Kalkyl';
import Scen from './Scen';
import s from './butik.module.css';

/* ===========================================================================
   ARCHER KNOX · webbutiken som landningssida (2026-11-11, Mathias efter säljsamtalet:
   "skapa en e-handelssida på [demon] vi skapade, lägg den i footern som en undersida").
   Byggd enligt skillen ecome-hemsida, men för ett sortiment i stället för en produkt:
   första skärmen = BirdBlocker stort i två färger med produkten framför som ett lager,
   kundens köplänk på VARJE köpknapp, inga småtexter, bara riktiga bilder.

   Omgång 2 samma dag ("gör den bättre"): berättelsen om fåglarna under panelerna med
   deras egna foton, räknaren "Hur många meter?", foto vid varje avdelning, bildband
   från taken, frågor, och produkten som vrider sig när man skrollar.

   VERIFIERAT (2026-11-11): produkter, namn, priser och bilder ur archerknox.se/products.json
   och /collections/<kategori>/products.json (Shopify). Priserna visas som i webbutiken, i kr;
   butiken har en växel för inkl./exkl. moms, så sidan säger inte vilket. Fågelband BB125:
   87 kr per band om 0,5 m, 2 900 kr per kartong om 30 m (räknaren bygger bara på dem).
   Leverans 1–2 dagar, lagershop i Kungsängen, offert vid större order, BirdBlocker i lager,
   går att montera i efterhand, "skadar inte fåglarna", BB-Boxclip för boxframe, mässorna
   2026 (NordBygg, Nordiska Trädgårdar, Elmia Solar): se ../page.js VERIFIERAT. Fotona är deras
   egna från Instagram (samma som på startsidan). Omdömena: Judge.me i deras butik, ordagrant.
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
const pris = (h) => Object.values(PRODUKTER).flat().find((p) => p.h === h).pris;

const KATEGORIER = [
  { id: 'birdblocker', namn: 'BirdBlocker', rubrik: ['Fågelskydd', 'för solpaneler'], text: 'Fågelband som hindrar fåglar att häcka under panelerna. Går att sätta upp i efterhand och skadar inte fåglarna.', samling: 'birdblocker', foto: 'tjanst-birdblocker.jpg', alt: 'Fågelband från BirdBlocker längs kanten på solpaneler över ett tegeltak' },
  { id: 'nockband', namn: 'Nockband', rubrik: ['Nockband', 'och nocktätning'], text: 'Tätar nocken och skorstenen mot regn, snö och fåglar.', samling: 'nocktatning', foto: 'jobb-nockband-cv30.jpg', alt: 'Svart nockband monterat längs nocken på ett tegeltak' },
  { id: 'fagelband', namn: 'Fågelband', rubrik: ['Fågelband', 'och fågelstopp'], text: 'Håller fåglarna borta från takfot, nock och skorsten.', samling: 'fagelband-fagelstopp', foto: 'jobb-fagelstopp-tak.jpg', alt: 'Fågelstopp monterat vid takfoten på ett tak med tegelpannor' },
  { id: 'takmembran', namn: 'Takmembran', rubrik: ['Takmembran', 'och vindduk'], text: 'Diffusionsöppen underlagsduk för taket, vindduk och ångbroms för väggen.', samling: 'takmembran', foto: 'tjanst-takmembran.jpg', alt: 'Röd underlagsduk utlagd på ett tak med läkt, takläggare i arbete' },
  { id: 'taksakerhet', namn: 'Taksäkerhet', rubrik: ['Taksäkerhet', 'för sotaren och dig'], text: 'Takbrygga, taksteg och sotarbrygga.', samling: 'taksakerhet' },
  { id: 'tejp', namn: 'Tejp och butyl', rubrik: ['Tätningstejp', 'och butyl'], text: 'Flextejp, butyltejp och dubbelhäftande för tak och fasad.', samling: 'tatningstejp-butyl' },
];

const BERATTELSE = [
  { foto: 'jobb-duvor-pa-taket.jpg', alt: 'Två duvor sitter på kanten av en solpanel', rubrik: 'Fåglarna hittar panelerna', text: 'Under solpanelerna är det varmt och skyddat.' },
  { foto: 'jobb-fagelbo-under-panel.jpg', alt: 'Fågelbo av kvistar under en solpanel', rubrik: 'Boet växer där du inte ser det', text: 'Kvistar och smuts samlas under panelen.' },
  { foto: 'jobb-fagelband-solpanel.jpg', alt: 'Solpaneler med fågelband längs kanten mot tegelpannorna', rubrik: 'Fågelbandet stänger dem ute', text: 'Sätts längs kanten, på en ny eller befintlig anläggning. Skadar inte fåglarna.' },
];

const BAND = [
  ['jobb-birdblocker-villa.jpg', 'Fågelband under solpaneler på en villa med tegeltak'],
  ['jobb-fagelband-kant.jpg', 'Fågelband och fågelpiggar vid kanten av en solpanel'],
  ['jobb-nockband-koppar.jpg', 'Nockband PRO med koppar på en nock'],
  ['jobb-nockband-rullar.jpg', 'Rullar med nockband från Archer Knox'],
  ['jobb-birdblocker-takfot.jpg', 'Fågelband längs nedre kanten av solpaneler'],
  ['tjanst-nockband.jpg', 'Nockband utrullat längs nocken på ett tak'],
];

const FRAGOR = [
  { q: 'Hur snabbt får jag varorna?', a: 'Vi har produkterna i lager och levererar på en till två dagar i hela Sverige.' },
  { q: 'Kan jag hämta själv?', a: 'Ja, i lagershopen i Kungsängen efter överenskommelse.' },
  { q: 'Passar BirdBlocker mina solpaneler?', a: 'Det finns flera modeller och clips, bland annat BB-Boxclip för paneler med boxframe. Ring och berätta vilka paneler du har.' },
  { q: 'Kan fågelskyddet sättas upp i efterhand?', a: 'Ja. Det går lika bra på en befintlig anläggning som på en ny.' },
  { q: 'Säljer ni till företag?', a: 'Ja, till takläggare, solcellsföretag och andra proffs. Vid större order skickar vi offert.' },
];

const OMDOMEN = [
  { namn: 'Smart Takvård', vad: 'Fågelband BB200', text: 'Alltid kvalitetsprodukter, fantastisk service och kunnig samt lösningsorienterad personal! Rekommeras starkt!' },
  { namn: 'Lars-Anders Pettersson', vad: 'Nockband M', text: 'Funkar toppen snabbt och rätt.' },
  { namn: 'Anonym kund', vad: 'Nockband M', text: 'Mycket snabb och fin service! Återkommer gärna!!!' },
];

const Bokstaver = ({ ord, start }) => [...ord].map((b, i) => <span className={s.bokstav} style={{ '--i': start + i }} key={i}>{b}</span>);

const Kort = ({ p, prio }) => (
  <li className={s.kort}>
    <a className={s.kortBild} href={`${BUTIK}/products/${p.h}`} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
      <Image src={`${M}/butik/${p.h}.webp`} alt="" width={640} height={640} sizes="(max-width: 600px) 46vw, 260px" priority={prio} />
    </a>
    <h3>{p.namn}</h3>
    <p className={s.pris}>{p.fran ? <small>från </small> : null}{kr(p.pris)}</p>
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
        {/* Scenen: namnet stort i två färger, fågelbandet i 3D framför som ett lager, fyra vyer vid skroll
            (ecome-hemsida, som maykaskitchen.se). Utan 3D står första vyn kvar som en vanlig hero med fotot. */}
        <Scen klass={s}>
          <div className={`${s.vy} ${s.vy0}`} data-vy>
            <p className={s.eyebrow}>Webbutik · i lager · leverans på 1–2 dagar</p>
            <h1 className={s.namn} aria-label="BirdBlocker">
              <span aria-hidden="true"><Bokstaver ord="Bird" start={0} /></span>
              <span aria-hidden="true"><Bokstaver ord="Blocker" start={4} /></span>
            </h1>
            <div className={s.lager} aria-hidden="true">
              <Image src={`${M}/butik/fagelband-bb200.webp`} alt="" width={640} height={640} priority sizes="(max-width: 700px) 80vw, 560px" />
            </div>
            <div className={s.heroText}>
              <p className={s.ingress}>Fågelskydd för solpaneler. Hela sortimentet i lager, skickat i hela Sverige eller hämtat i Kungsängen.</p>
              <div className={s.knappar}>
                <a className={s.knapp} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
                <a className={`${s.knapp} ${s.knappLjus}`} href="#rakna">Räkna ut hur mycket</a>
              </div>
              <p className={s.heroPris}>Fågelband från <b>{kr(pris('kopia-av-fagelband-bb125'))}</b></p>
            </div>
          </div>

          <div className={`${s.vy} ${s.vyText} ${s.vyVanster} ${s.paFarg}`} data-vy>
            <div>
              <p className={s.vyNr}>01</p>
              <h2>Fåglarna <em>stannar ute</em></h2>
              <p>Fågelbandet stänger kanten runt panelerna, så att fåglar inte kan häcka under dem.</p>
              <a className={`${s.knapp} ${s.knappVit}`} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
            </div>
          </div>

          <div className={`${s.vy} ${s.vyText} ${s.vyHoger} ${s.paMork}`} data-vy>
            <div>
              <p className={s.vyNr}>02</p>
              <h2>På nya och <em>gamla anläggningar</em></h2>
              <p>Sätts upp när panelerna monteras, eller i efterhand på en anläggning som redan sitter på taket.</p>
              <a className={s.knapp} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
            </div>
          </div>

          <div className={`${s.vy} ${s.vyText} ${s.vyMitt}`} data-vy>
            <div>
              <p className={s.vyNr}>03</p>
              <h2>Skadar inte <em>fåglarna</em></h2>
              <p>De hålls ute. Inget mer än så.</p>
              <a className={s.knapp} href={`${BUTIK}/collections/birdblocker`} target="_blank" rel="noopener">Köp BirdBlocker</a>
            </div>
          </div>

          {[0, 1, 2].map((k) => (
            <svg className={s.fagel} data-fagel viewBox="0 0 64 40" aria-hidden="true" key={k}>
              <path d="M2 22c8-2 12-9 20-12 4-8 12-10 18-8-5 2-8 6-9 10 6 0 12 2 16 6 4 0 9 1 15 4-6 1-11 1-15 0-6 6-16 8-26 5-6 3-12 3-17 2 3-1 6-3 8-5-4 0-7-1-10-2z" />
            </svg>
          ))}
        </Scen>

        <ul className={s.loften} aria-label="Leverans">
          <li><b>1–2 dagar</b><span>Leverans i hela Sverige</span></li>
          <li><b>Lagershop</b><span>Hämta i Kungsängen</span></li>
          <li><b>Offert</b><span>Vid större order</span></li>
          <li><b>Proffs och privat</b><span>Vi säljer till båda</span></li>
        </ul>

        {/* Berättelsen: deras egna foton. */}
        <section className={s.sektion} aria-labelledby="varfor">
          <p className={s.eyebrow}>Därför fågelskydd</p>
          <h2 id="varfor" className={s.h2}>Det börjar med <em>två duvor</em></h2>
          <ol className={s.berattelse}>
            {BERATTELSE.map((b, i) => (
              <li key={b.foto}>
                <div className={s.berBild}><Image src={`${M}/${b.foto}`} alt={b.alt} width={960} height={720} sizes="(max-width: 800px) 92vw, 400px" /><span aria-hidden="true">{i + 1}</span></div>
                <h3>{b.rubrik}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Räknaren */}
        <section className={s.rakna} id="rakna" aria-labelledby="r-rakna">
          <div>
            <p className={s.eyebrow}>Räkna själv</p>
            <h2 id="r-rakna" className={s.h2}>Hur många <em>meter behöver du?</em></h2>
            <p className={s.lead}>Mät runt panelernas kanter. Fågelband BB125 finns styckvis om en halv meter och i kartong om 30 meter.</p>
          </div>
          <Kalkyl
            klass={s}
            styckPris={pris('kopia-av-fagelband-bb125')}
            kartongPris={pris('fagelband-bb125')}
            styckHref={`${BUTIK}/products/kopia-av-fagelband-bb125`}
            kartongHref={`${BUTIK}/products/fagelband-bb125`}
          />
        </section>

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
            <div className={k.foto ? `${s.sektionHuvud} ${s.medFoto}` : s.sektionHuvud}>
              <div>
                <p className={s.eyebrow}>{k.namn}</p>
                <h2 id={`r-${k.id}`} className={s.h2}>{k.rubrik[0]} <em>{k.rubrik[1]}</em></h2>
                <p className={s.lead}>{k.text}</p>
                <a className={s.alla} href={`${BUTIK}/collections/${k.samling}`} target="_blank" rel="noopener">Alla {k.namn.toLowerCase()} i butiken</a>
              </div>
              {k.foto ? <div className={s.katFoto}><Image src={`${M}/${k.foto}`} alt={k.alt} width={960} height={720} sizes="(max-width: 800px) 92vw, 460px" /></div> : null}
            </div>
            <ul className={s.rutnat}>{PRODUKTER[k.samling].map((p) => <Kort p={p} key={p.h} />)}</ul>
          </section>
        ))}

        {/* Bildband från taken */}
        <div className={s.band} aria-label="Bilder från taken">
          <div className={s.bandSpar}>
            {[false, true].map((kopia) => (
              <div className={s.bandGrupp} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
                {BAND.map(([fil, alt]) => <Image src={`${M}/${fil}`} alt={kopia ? '' : alt} width={480} height={360} sizes="320px" loading="lazy" key={fil} />)}
              </div>
            ))}
          </div>
        </div>

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
          <p className={s.massor}>På mässorna 2026: <b>NordBygg</b> · <b>Nordiska Trädgårdar</b> · <b>Elmia Solar</b></p>
        </section>

        <section className={`${s.sektion} ${s.mjuk}`} aria-labelledby="fr">
          <div className={s.fragor}>
            <div>
              <p className={s.eyebrow}>Frågor</p>
              <h2 id="fr" className={s.h2}>Innan du <em>beställer</em></h2>
              <a className={`${s.knapp} ${s.knappLjus}`} href={TELHREF}>Ring {TEL}</a>
            </div>
            <div>
              {FRAGOR.map((f, i) => (
                <details className={s.fraga} name="butik-faq" open={i === 0} key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
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
