import Link from 'next/link';
import HeroVideo from '../komponenter/HeroVideo';
import Maskot from '../komponenter/Maskot';
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

const MARQUEE = [
  'Fler bokningar',
  'Google Ads',
  'Hemsidor som konverterar',
  'SEO som rankar',
  'Demo inom 48 timmar',
  'Synlighet som säljer',
];

const SIFFROR = [
  { v: '3', e: 'Leveranser i drift' },
  { v: '48h', e: 'Till färdigt förslag' },
  { v: '24h', e: 'Svar på kostnadsfri analys' },
  { v: '12%', e: 'Fler kundförfrågningar, kundcase' },
];

const CASE = [
  { namn: 'Smålands Måleri', bransch: 'Måleri · Jönköping', url: 'https://smamaleri.se/', bild: '/img/demo-smalands-maleri.webp' },
  { namn: 'Bromma Trädgård', bransch: 'Trädgårdsskötsel · Stockholm', url: 'https://brommatradgardsservice.se/', bild: '/img/demo-bromma-tradgard.webp' },
  { namn: "Mayka's Kitchen", bransch: 'Restaurang & catering', url: 'https://maykaskitchen.se', bild: '/img/maykaskitchen.jpg' },
];

export default function Start() {
  return (
    <>
      {/* ── HERO: rubrik → video → CTA, som på nuvarande sajt ── */}
      <section className={`mork ${styles.hero}`} id="top">
        <div className={`wrap ${styles.heroInner}`} data-trapp>
          <span className={styles.badge}>
            <i /> För lokala företag i Sverige
          </span>
          <h1>
            Hemsidor som ger hantverksfirmor <span className="accent">fler förfrågningar.</span>
          </h1>
          <p className={styles.heroLede}>
            Syns ni inte på Google går jobben till någon annan. Videon visar varför, och vad
            vi gör åt det. Två minuter, rakt på sak.
          </p>

          <HeroVideo />

          <div className={styles.heroKnappar}>
            <a href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få kostnadsfri analys {PIL}
            </a>
          </div>
          <p className={styles.heroMikro}>
            Kostnadsfri analys av er hemsida · Svar inom 24 timmar · Inga förpliktelser
          </p>
        </div>

        <div className={styles.scrollcue}>
          <span />
          Scrolla
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeSpar}>
          {[0, 1].map((k) => (
            <div key={k} className={styles.marqueeSet}>
              {MARQUEE.map((m) => (
                <span key={m}>
                  {m}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

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
          <span className={styles.siffrorMaskot}>
            <Maskot pose="pekar" stil="rund" alt="Bahko-maskoten pekar på siffrorna" />
          </span>
        </div>
      </section>

      {/* ── SEKTION 2: synlighetspanelen ── */}
      <section className={`mork ${styles.panelYta}`} id="synlighet">
        <div className={`wrap ${styles.panelInner}`} data-trapp>
          <div>
            <span className="eyebrow">Vad som händer</span>
            <h2>
              Från osedd till <span className="accent">hittad.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              De flesta hantverkssajter tappar kunden på tre ställen: numret syns inte i mobilen,
              det saknas ett enkelt sätt att begära offert, och sidan laddar för långsamt.
              Vi bygger bort alla tre.
            </p>
            <div className={styles.panelKnapp}>
              <Link href="/tjanster/hemsidor/" className="btn btn-sekundar">
                Så bygger vi {PIL}
              </Link>
            </div>
            <span className={styles.panelMaskot}>
              <Maskot pose="undersoker" stil="stor" alt="Bahko-maskoten undersöker vad som läcker kunder" />
            </span>
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
                Hemsidan är grunden. Resten bygger vi på när den står och fungerar.
              </p>
            </div>
            <video
              className={styles.tjanstFilm}
              src="/brand/maskot/bahko-bygger-loop.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Bahko-maskoten bygger en hemsida, panel för panel"
            />
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

      {/* ── PROCESS: horisontellt spår med scroll-knappar ── */}
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
            <Maskot pose="pekar" stil="flyt" alt="Bahko-maskoten pekar på knappen för kostnadsfri demo" />
            <Link href="/kontakt/" className="btn btn-primar">
              Se er kostnadsfria demo {PIL}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CASE ── */}
      <section id="case">
        <div className="wrap">
          <span className="eyebrow">Leveranser i drift</span>
          <h2>
            Riktiga sajter, <span className="accent">riktiga firmor.</span>
          </h2>

          <div className={styles.caseNat} data-trapp>
            {CASE.map((c) => (
              <a key={c.namn} href={c.url} target="_blank" rel="noopener" className={styles.caseKort}>
                <span className={styles.caseBild}>
                  <img src={c.bild} alt={`Förhandsvisning av ${c.namn}`} loading="lazy" />
                </span>
                <span className={styles.caseMeta}>
                  <span>
                    <strong>{c.namn}</strong>
                    <em>{c.bransch}</em>
                  </span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </a>
            ))}
          </div>

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
            <Maskot pose="vinkar" stil="rund" alt="Bahko-maskoten vinkar vid de kostnadsfria erbjudandena" />
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
