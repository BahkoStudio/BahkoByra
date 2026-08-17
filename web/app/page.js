import Link from 'next/link';
import HeroVideo from './komponenter/HeroVideo';
import Maskot from './komponenter/Maskot';
import SynlighetsPanel from './komponenter/SynlighetsPanel';
import ProcessRail from './komponenter/ProcessRail';
import TjanstIkon from './komponenter/TjanstIkon';
import Faq from './komponenter/Faq';
import { TJANSTER, FRAGOR } from './data';
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
  { v: '24h', e: 'Svar på gratis analys' },
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
        <div className={`wrap ${styles.heroInner}`}>
          <span className={styles.badge}>
            <i /> För lokala företag i Sverige
          </span>
          <h1>
            Vi fyller din kalender med <span className="accent">nya kunder.</span>
          </h1>
          <p className={styles.heroLede}>
            Är ditt företag osynligt på Google? Se den korta videon. Den visar varför du inte
            ligger topp 3 när kunder i din stad söker.
          </p>

          <HeroVideo />

          <div className={styles.heroKnappar}>
            <a href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få gratis analys {PIL}
            </a>
          </div>
          <p className={styles.heroMikro}>
            Kostnadsfri analys av er hemsida · Svar inom 24 timmar · Inga krav
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
        <div className="wrap">
          <div className={styles.siffror}>
            {SIFFROR.map((s) => (
              <div key={s.e}>
                <strong>{s.v}</strong>
                <span>{s.e}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEKTION 2: synlighetspanelen ── */}
      <section className={`mork ${styles.panelYta}`} id="synlighet">
        <div className={`wrap ${styles.panelInner}`}>
          <div>
            <span className="eyebrow">Vad som händer</span>
            <h2>
              Från osedd till <span className="accent">hittad.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              De flesta hantverkarsajter tappar kunden på tre ställen: numret syns inte i mobilen,
              det finns inget enkelt sätt att begära offert, och sidan laddar för långsamt. Vi bygger
              bort alla tre.
            </p>
            <div className={styles.panelKnapp}>
              <Link href="/tjanster/hemsidor/" className="btn btn-sekundar">
                Så bygger vi {PIL}
              </Link>
            </div>
          </div>
          <div className={styles.panelScen}>
            <SynlighetsPanel />
            <span className={styles.panelMaskot}>
              <Maskot pose="gar" stil="flyt" alt="Bahko-maskoten går fram till synlighetspanelen och pekar på grafen" />
            </span>
          </div>
        </div>
      </section>

      {/* ── TJÄNSTER: klickbara kort med ikoner ── */}
      <section id="tjanster">
        <div className="wrap">
          <span className="eyebrow">Vad vi gör</span>
          <h2>
            Allt som får kunden <span className="accent">att höra av sig.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Hemsidan är grunden. Resten bygger vi på när den står och fungerar.
          </p>

          <div className={styles.tjanstNat}>
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
            till <span className="accent">fulla kalendrar.</span>
          </h2>

          <ProcessRail />

          <div className={styles.processCta}>
            <Maskot pose="dansar" stil="flyt" alt="Bahko-maskoten dansar vid knappen för gratis förslag" />
            <div>
              <h3>Vill ni se hur er sida skulle se ut?</h3>
              <p>Vi bygger förslaget först. Ni bestämmer sen.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
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

          <div className={styles.caseNat}>
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
            Två sätt att komma <span className="accent">igång direkt.</span>
          </h2>

          <div className={styles.gratisNat}>
            <a href="/foretag/gratis-granskning.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Gratis analys</span>
              <h3>10-punktsanalys av er hemsida</h3>
              <p>
                Vi granskar sidan och skickar en personlig rapport: mobilanpassning, synlighet på
                Google, kontaktflöde och vad som läcker kunder. Svar inom 24 timmar.
              </p>
              <span className={styles.gratisLank}>Få gratis analys {PIL}</span>
            </a>

            <a href="/foretag/gratis-guide.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Gratis guide</span>
              <h3>3 sätt att ranka högre på Google</h3>
              <p>
                Guiden plus en kort video som visar exakt hur du tar ditt lokala företag till topp 3
                på Google och i Maps. Inga tekniska kunskaper behövs.
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
            Raka svar, <span className="accent">inga säljtrick.</span>{' '}
            <Maskot pose="vinkar" stil="liten" alt="Bahko-maskoten" />
          </h2>
          <p className="lede" style={{ margin: '1rem 0 2.4rem' }}>
            Det här undrar de flesta bygg- och hantverksfirmor som hör av sig.
          </p>
          <Faq frager={FRAGOR} />
        </div>
      </section>
    </>
  );
}
