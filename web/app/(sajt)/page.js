import Link from 'next/link';
import HeroVideo from '../komponenter/HeroVideo';
import Maskot from '../komponenter/Maskot';
import MaskotScen from '../komponenter/MaskotScen';
import Marquee from '../komponenter/Marquee';
import RoiKalkyl from '../komponenter/RoiKalkyl';
import Portfolj from '../komponenter/Portfolj';
import BevisBromma, { BevisSiffror } from '../komponenter/BevisBromma';
import Nischer from '../komponenter/Nischer';
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

/* Tjänsterna: en rad var, i kundens ord */
const TJANSTTEXT = {
  hemsidor: { text: 'Kunden ser vad ni gör och hur man når er, redan på första skärmen i mobilen.', lank: 'Så gör vi hemsidan' },
  seo: { text: 'Ni kan komma upp när någon i er stad söker på det ni gör.', lank: 'Så syns ni i er stad' },
  'google-ads': { text: 'Annonser som kan ligga ovanför träffarna redan första veckan.', lank: 'Så fungerar annonserna' },
  reklamfilmer: { text: 'Film på ert arbete, så att kunden ser skillnaden innan priserna jämförs.', lank: 'Se en reklamfilm' },
  appar: { text: 'Bokning direkt på sidan, så att förfrågningarna inte drunknar bland samtalen.', lank: 'Så bokar kunden själv' },
};

/* Hur vi jobbar: fem steg med en ikon var, inga nummer (Mathias 2026-10-23).
   Rubrik på högst tre ord, en mening på högst tolv ord. */
const IKON = {
  prat: <path d="M4 5h16v10H9l-5 4z" />,
  skarm: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  tumme: <path d="M7 11v9H4v-9zM7 11l4-7c1.5 0 2.5 1 2.5 2.5V10H19a2 2 0 0 1 2 2l-1.5 6.5A2 2 0 0 1 17.5 20H7" />,
  raket: <><path d="M12 15 9 12c0-5 3-8 7-9 1 4-2 7-4 12z" /><path d="M9 12H6l2-3M12 15v3l3-2M7 17c-1 1-1 3-1 3s2 0 3-1" /></>,
  telefon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" />,
};

const RESAN = [
  { ikon: 'prat', h: 'Berätta om firman', p: 'Vad ni gör och var, det tar två minuter.' },
  { ikon: 'skarm', h: 'Se förslaget', p: 'Inom 48 timmar har ni ett färdigt förslag att klicka i.' },
  { ikon: 'tumme', h: 'Ja eller nej', p: 'Säger ni ja lägger vi in era bilder, nej kostar inget.' },
  { ikon: 'raket', h: 'Sidan går live', p: 'På er egen domän, normalt inom sju dagar.' },
  { ikon: 'telefon', h: 'Vi finns kvar', p: 'Underhåll, Google och ändringar när ni behöver dem.' },
];

export default function Start() {
  return (
    <>
      {/* ── HERO: text vänster, kalkylen "Räkna på jobben ni missar" till höger
             (Mathias 2026-10-23, ersätter B-videon). Mobil: text → knapp → kalkyl → siffror. ── */}
      <section className={`mork ${styles.heroBygge}`} id="top">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroText} data-trapp>
            {/* Rubriken talar till firman (Mathias 2026-09-23). Tjänst + ort ligger som första rad
                I H1 (Mathias 2026-10-01): synlig text, samma som Google-profilens kategori och ort. */}
            <h1>
              <span className="eyebrow" style={{ display: 'flex' }}>Webbdesign i Jönköping &amp; Huskvarna</span>
              Google ljuger aldrig.
              <br />
              <span className="accent">Våra kunder ligger etta.</span>
            </h1>
            <p className={styles.heroLede}>
              Vi bygger hemsidan och sköter Google åt snickare, målare, restauranger, e-handlare och
              andra lokala företag. Ni ser förslaget innan ni betalar en krona.
            </p>
            <div className={styles.heroKnappar}>
              <Link href="/kontakt/" className="btn btn-primar">
                Visa hur min hemsida kan se ut {PIL}
              </Link>
              <a href="/foretag/gratis-guide.html" className={styles.heroLank}>
                Eller hämta den kostnadsfria guiden {PIL}
              </a>
            </div>
          </div>

          <div className={styles.heroScen} id="rakna">
            <RoiKalkyl className={styles.heroKalkyl} kompakt />
          </div>

        </div>
      </section>

      {/* ── KUNDBÄLTET: alla kunder med logga, direkt efter heron (Mathias 2026-10-23) ── */}
      <Marquee />

      {/* ── 2. FILMEN: två minuter, rakt på sak ── */}
      <section className={`mork ${styles.videoYta}`} id="video">
        <div className={`wrap ${styles.videoInner}`} data-trapp>
          <h2>
            Därför ringer kunden <span className="accent">en annan firma.</span>
          </h2>
          <p className={`lede ${styles.videoLede}`}>
            Kunden googlar och ringer den som syns först. Syns ni inte där får ni köpa
            förfrågningar i stället, som nummer fem i kön. Och säljaren som lovade guld och gröna
            skogar binder er gärna i två år.
          </p>
          <HeroVideo />
        </div>
      </section>

      {/* ── 3. FÖR VEM: åtta branschkort ── */}
      <Nischer />

      {/* ── VÅRA TJÄNSTER: fem kort, hemsidan först ── */}
      <section id="vara-tjanster">
        <div className="wrap">
          <div className={styles.tjanstIntro} data-trapp>
            <div>
              <span className="eyebrow">Våra tjänster</span>
              <h2>
                Allt som får kunden <span className="accent">att ringa er.</span>
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }}>
                Börja med hemsidan. Resten lägger vi till när det lönar sig.
              </p>
            </div>
            <div className={styles.tjanstMaskot}>
              <MaskotScen
                src="/img/maskot-scener/ringer.webp"
                alt="Bahko-maskoten i bygghjälm håller upp en mobil som ringer"
                oga={{ x: 65.9, y: 38.4, rx: 4.7, ry: 3.7, gron: 'rgb(33,127,94)' }}
                index={2}
              />
            </div>
          </div>

          <div className={styles.tjanstNat} data-trapp>
            {TJANSTER.map((t) => (
              <Link key={t.slug} href={`/tjanster/${t.slug}/`} className={styles.tjanstKort}>
                <TjanstIkon slug={t.slug} />
                <h3>{t.namn}</h3>
                <p>{TJANSTTEXT[t.slug].text}</p>
                <span className={styles.tjanstFot}>
                  <span className={styles.tagg}>{TJANSTTEXT[t.slug].lank}</span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. KUNDCASE: Brommas skärmbilder från 30 juli ── */}
      <section className={`mork ${styles.panelYta}`} id="bevis">
        <div className={`wrap ${styles.panelInner}`} data-trapp>
          <div>
            <span className="eyebrow">Kundcase</span>
            <h2>
              Vår kund låg etta i Googles platslista, <span className="accent">före en firma med 117 omdömen.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              Vi sitter i Jönköping/Huskvarna och har kunder i hela Sverige, lokalt för dem. Vår kund Bromma
              Trädgårdsservice i Stockholm fick ny hemsida av oss. Så här såg det ut den
              30 juli, när man sökte på &quot;trädgårdsservice i Stockholm&quot;.
            </p>
            <BevisSiffror />
            <div className={styles.panelKnapp}>
              <Link href="/case/" className="btn btn-sekundar">
                Se sajten vi gjorde åt dem {PIL}
              </Link>
            </div>
            {/* Ögat sitter bakom luppen — Mathias egen render, som den är */}
            <MaskotScen
              className={styles.panelFigur}
              src="/img/maskot-scener/forstoringsglas.webp"
              alt="Bahko-maskoten granskar en mobil med ett förstoringsglas"
              index={1}
            />
          </div>
          <div className={styles.panelScen}>
            <BevisBromma />
          </div>
        </div>
      </section>

      {/* ── 6. KUNDER OCH DEMOS ── */}
      <section className={`mork ${styles.caseYta}`} id="case">
        <div className="wrap">
          <div data-trapp>
            <span className="eyebrow">Kunder och demos</span>
            <h2>
              Här är sidorna vi gjort. <span className="accent">Öppna dem i mobilen.</span>
            </h2>
          </div>

          <Portfolj />

          <div className={styles.caseMer}>
            <Link href="/case/" className="btn btn-sekundar">
              Se alla demos
            </Link>
          </div>
        </div>
      </section>

      {/* ── HUR VI JOBBAR: fem steg på en väg, ikoner i stället för nummer ── */}
      <section className={`mork ${styles.process}`} id="process">
        <div className="wrap">
          <span className="eyebrow">Hur vi jobbar</span>
          <h2>
            Fem steg. Ni ser sidan
            <br />
            innan ni bestämmer er.
          </h2>

          <ol className={styles.vag} data-trapp>
            {RESAN.map((r, i) => (
              <li key={r.ikon} className={`${styles.vagSteg} ${i === RESAN.length - 1 ? styles.vagMal : ''}`}>
                <span className={styles.vagNod} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {IKON[r.ikon]}
                  </svg>
                </span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </li>
            ))}
          </ol>

          <div className={styles.processCta} data-avsloja="upp">
            <div>
              <h3>Redo? Då tar vi fram förslaget.</h3>
              <p>Sidan och domänen är era, och vi jobbar utan bindningstid.</p>
            </div>
            <MaskotScen
              className={styles.processScen}
              src="/img/maskot-scener/visar-sajten.webp"
              alt="Bahko-maskoten visar upp ett hemsideförslag på en surfplatta"
              oga={{ x: 73.3, y: 38.9, rx: 6.45, ry: 5.0, gron: 'rgb(20,112,75)' }}
              index={3}
            />
            <Link href="/kontakt/" className={`btn btn-primar ${styles.processKnapp}`}>
              <span className={styles.langt}>Visa hur min hemsida kan se ut</span>
              <span className={styles.kortText}>Se mitt förslag</span> {PIL}
            </Link>
          </div>
        </div>
      </section>

      {/* ── GRATIS ANALYS + GRATIS GUIDE ── */}
      <section className={styles.gratisYta} id="gratis">
        <div className="wrap">
          <span className="eyebrow">Inte redo för ett förslag än?</span>
          <h2>
            Se först var <span className="accent">jobben läcker.</span>
          </h2>
          <p className={styles.gratisMaskot}>
            <span>Två vägar om ni vill titta innan ni ber om ett förslag.</span>
            <MaskotScen
              className={styles.gratisScen}
              src="/img/maskot-scener/fikar.webp"
              alt="Bahko-maskoten sitter på en hög plankor och fikar"
              oga={{ x: 72.7, y: 40.1, rx: 3.85, ry: 3.5, gron: 'rgb(28,147,96)' }}
              index={4}
            />
          </p>

          <div className={styles.gratisNat} data-trapp>
            <a href="/foretag/gratis-granskning.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri analys</span>
              <h3>10-punktsanalys av er hemsida</h3>
              <p>
                Ni får svaret på mejl, med det som kostar er flest kunder överst.
              </p>
              <span className={styles.gratisLank}>Få kostnadsfri analys {PIL}</span>
            </a>

            <a href="/foretag/gratis-guide.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri guide</span>
              <h3>3 saker som avgör vem kunden hittar på Google</h3>
              <p>
                Kort video och guide, gjord för den som inte jobbar med webb.
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
            Frågorna säljaren <span className="accent">slingrade sig runt.</span>
          </h2>
          <p className="lede" style={{ margin: '1rem 0 2.4rem' }}>
            Ställ dem till oss också.
          </p>
          <Faq frager={FRAGOR} />
        </div>
      </section>
    </>
  );
}
