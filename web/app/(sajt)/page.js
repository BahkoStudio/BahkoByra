import Link from 'next/link';
import HeroBygge from '../komponenter/HeroBygge';
import HeroVideo from '../komponenter/HeroVideo';
import Maskot from '../komponenter/Maskot';
import MaskotFilm from '../komponenter/MaskotFilm';
import Marquee from '../komponenter/Marquee';
import Rakna from '../komponenter/Rakna';
import Portfolj from '../komponenter/Portfolj';
import SynlighetsPanel from '../komponenter/SynlighetsPanel';
import ProcessRail from '../komponenter/ProcessRail';
import TjanstIkon from '../komponenter/TjanstIkon';
import Faq from '../komponenter/Faq';
import { TJANSTER, FRAGOR } from '../data';
import styles from './page.module.css';

/* Startsidan nås som /, med parametrar och via www-varianter — den behöver
   peka ut sig själv. Undersidorna har redan canonical via sina metadata. */
export const metadata = {
  alternates: { canonical: '/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SPELA = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
);


/* Räknarna tickar upp när kortet är i bild; slutvärdet står i markupen. */
const SIFFROR = [
  { v: <Rakna till={3} />, e: 'Leveranser i drift' },
  { v: <Rakna till={48} suffix="h" />, e: 'Till färdigt förslag' },
  { v: <Rakna till={24} suffix="h" />, e: 'Svar på kostnadsfri analys' },
  { v: <Rakna till={12} suffix="%" />, e: 'Fler kundförfrågningar, kundcase' },
];

export default function Start() {
  return (
    <>
      {/* ── HERO "Bygget live": text vänster, maskoten bygger till höger.
             Höjden kommer ur innehållet; filmen spelar på alla skärmar.
             Mobil: text → knappar → scen → siffror. ── */}
      <section className={`mork ${styles.heroBygge}`} id="top">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroText} data-trapp>
            <span className="eyebrow">Byrån för bygg &amp; hantverk</span>
            <h1>
              Hemsidor som ger hantverkare <span className="accent">fler jobb.</span>
            </h1>
            <p className={styles.heroLede}>
              Färdigt förslag på 48 timmar. Ni tittar först och bestämmer sen.
              Det kostar ingenting.
            </p>
            <div className={styles.heroKnappar}>
              <Link href="/kontakt/" className="btn btn-primar">
                Se er sida kostnadsfritt {PIL}
              </Link>
              <a href="#video" className={`btn btn-sekundar ${styles.videoKnapp}`}>
                {SPELA} Se videon · 2 min
              </a>
            </div>
          </div>

          <div className={styles.heroScen}>
            <HeroBygge />
          </div>

          <div className={styles.heroSiffror} data-trapp>
            <div>
              <strong>48h</strong>
              <span>Till färdigt förslag</span>
            </div>
            <div>
              <strong>0 kr</strong>
              <span>Tills ni säger ja</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Kontaktperson, hela vägen</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEVISREMSAN: står still tills man scrollat ── */}
      <Marquee />

      {/* ── SIFFROR ── */}
      <section className={`mork ${styles.siffrorYta}`}>
        <div className={`wrap ${styles.siffrorRad}`}>
          <div className={styles.siffror} data-trapp>
            {SIFFROR.map((s) => (
              <div key={s.e}>
                <strong>{s.v}</strong>
                <span>{s.e}</span>
              </div>
            ))}
          </div>
          {/* Riktig film (Seedance 2.5 → ark med alfa): andas, blinkar, pekar */}
          <MaskotFilm
            className={styles.siffrorScen}
            still="/img/maskot-film/pekar-stoppur-still.webp"
            ark={{ src: '/img/maskot-film/pekar-stoppur.webp', fps: 24, ramar: 121, kolumner: 13, bredd: 300, hojd: 403 }}
            alt="Bahko-maskoten i bygghjälm pekar på siffrorna med ett stoppur i handen"
          />
        </div>
      </section>

      {/* ── VIDEON: två minuter, rakt på sak ── */}
      <section className={`mork ${styles.videoYta}`} id="video">
        <div className={`wrap ${styles.videoInner}`} data-trapp>
          <span className="eyebrow">Två minuter, rakt på sak</span>
          <h2>
            Därför syns inte <span className="accent">ert företag på Google.</span>
          </h2>
          <HeroVideo />
        </div>
      </section>

      {/* ── SYNLIGHETSPANELEN ── */}
      <section className={`mork ${styles.panelYta}`} id="synlighet">
        <div className={`wrap ${styles.panelInner}`} data-trapp>
          <div>
            <span className="eyebrow">Vad som händer</span>
            <h2>
              Från osedd till <span className="accent">hittad.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              Numret syns inte i mobilen. Offertknappen saknas. Sidan laddar för långsamt.
              Tre läckor som kostar jobb. Vi täpper alla tre.
            </p>
            <div className={styles.panelKnapp}>
              <Link href="/tjanster/hemsidor/" className="btn btn-sekundar">
                Så bygger vi {PIL}
              </Link>
            </div>
            <MaskotFilm
              className={styles.panelFigur}
              still="/img/maskot-film/forstoringsglas-still.webp"
              ark={{ src: '/img/maskot-film/forstoringsglas.webp', fps: 24, ramar: 121, kolumner: 11, bredd: 300, hojd: 300 }}
              alt="Bahko-maskoten granskar en mobil med ett förstoringsglas"
            />
          </div>
          <div className={styles.panelScen}>
            <SynlighetsPanel />
          </div>
        </div>
      </section>

      {/* ── TJÄNSTER: klickbara kort med ikoner ── */}
      <section id="tjanster">
        <div className="wrap">
          <div className={styles.tjanstIntro} data-trapp>
            <div>
              <span className="eyebrow">Vad vi gör</span>
              <h2>
                Allt som får kunden <span className="accent">att höra av sig.</span>
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }}>
                Hemsidan först. Resten bygger vi på när den står och ringer.
              </p>
            </div>
            <div className={styles.tjanstMaskot}>
              <MaskotFilm
                still="/img/maskot-film/ringer-still.webp"
                ark={{ src: '/img/maskot-film/ringer.webp', fps: 24, ramar: 121, kolumner: 13, bredd: 300, hojd: 403 }}
                alt="Bahko-maskoten i bygghjälm håller upp en mobil som ringer"
              />
            </div>
          </div>

          <div className={styles.tjanstNat} data-trapp>
            {TJANSTER.map((t) => (
              <Link key={t.slug} href={`/tjanster/${t.slug}/`} className={styles.tjanstKort}>
                <TjanstIkon slug={t.slug} />
                <h3>{t.namn}</h3>
                <p>{t.kort}</p>
                <span className={styles.tjanstFot}>
                  <span className={styles.tagg}>{t.tagg}</span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS: horisontellt spår styrt av scrollen ── */}
      <section className={`mork ${styles.process}`} id="process">
        <div className="wrap">
          <span className="eyebrow">Hur vi jobbar</span>
          <h2>
            Från första samtal
            <br />
            till <span className="accent">färdig hemsida.</span>
          </h2>

          <div data-avsloja="upp">
            <ProcessRail />
          </div>

          <div className={styles.processCta} data-avsloja="upp">
            <div>
              <h3>Se er nya hemsida innan ni bestämmer er.</h3>
              <p>Komplett förslag inom 48 timmar. Det kostar ingenting att titta.</p>
            </div>
            <MaskotFilm
              className={styles.processScen}
              still="/img/maskot-film/visar-sajten-still.webp"
              ark={{ src: '/img/maskot-film/visar-sajten.webp', fps: 24, ramar: 121, kolumner: 13, bredd: 300, hojd: 403 }}
              alt="Bahko-maskoten visar upp ett hemsideförslag på en surfplatta"
            />
            <Link href="/kontakt/" className="btn btn-primar">
              Se er sida kostnadsfritt {PIL}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFÖLJEN: riktiga sajter och demos i ett rutnät ── */}
      <section className={`mork ${styles.caseYta}`} id="case">
        <div className="wrap">
          <div data-trapp>
            <span className="eyebrow">Leveranser i drift</span>
            <h2>
              Riktiga sajter. <span className="accent">Riktiga firmor.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1rem' }}>
              Tre kunder som tar emot jobb varje dag, och tre demos som väntar på sin firma.
              Klicka in, allt är på riktigt.
            </p>
          </div>

          <Portfolj />

          <div className={styles.caseMer}>
            <Link href="/case/" className="btn btn-sekundar">
              Se fler leveranser och demos
            </Link>
          </div>
        </div>
      </section>

      {/* ── GRATIS ANALYS + GRATIS GUIDE ── */}
      <section className={styles.gratisYta} id="gratis">
        <div className="wrap">
          <span className="eyebrow">Kostnadsfritt att börja</span>
          <h2>
            Två kostnadsfria sätt <span className="accent">att börja.</span>
          </h2>
          <p className={styles.gratisMaskot}>
            <span>Båda är kostnadsfria. Ni behöver inte bestämma något idag.</span>
            <MaskotFilm
              className={styles.gratisScen}
              still="/img/maskot-film/fikar-still.webp"
              ark={{ src: '/img/maskot-film/fikar.webp', fps: 24, ramar: 121, kolumner: 13, bredd: 300, hojd: 403 }}
              alt="Bahko-maskoten sitter på en hög plankor och fikar"
            />
          </p>

          <div className={styles.gratisNat} data-trapp>
            <a href="/foretag/gratis-granskning.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri analys</span>
              <h3>10-punktsanalys av er hemsida</h3>
              <p>
                Vi granskar er hemsida på tio punkter och skickar en personlig rapport:
                mobilanpassning, synlighet på Google och vad som kostar er kunder. Svar inom 24 timmar.
              </p>
              <span className={styles.gratisLank}>Få kostnadsfri analys {PIL}</span>
            </a>

            <a href="/foretag/gratis-guide.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri guide</span>
              <h3>3 sätt att ranka högre på Google</h3>
              <p>
                Guide och kort video som visar hur ett lokalt företag når topp 3 på Google
                och i Maps. Inga tekniska förkunskaper behövs.
              </p>
              <span className={styles.gratisLank}>Hämta guiden {PIL}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ: en fråga öppen i taget ── */}
      <section className={styles.faq} id="fragor">
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>
            <Maskot pose="undersoker" stil="liten" alt="Bahko-maskoten undersöker frågorna" />{' '}
            Vanliga frågor, <span className="accent">raka svar.</span>
          </h2>
          <p className="lede" style={{ margin: '1rem 0 2.4rem' }}>
            Det här undrar de flesta firmor som hör av sig.
          </p>
          <Faq frager={FRAGOR} />
        </div>
      </section>
    </>
  );
}
