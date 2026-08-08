import Link from 'next/link';
import Faq from '../komponenter/Faq';
import styles from './prisguide.module.css';

export const metadata = {
  title: 'Vad kostar en hemsida?',
  description:
    'Ärligt svar på vad en hemsida kostar för en hantverksfirma: vad som avgör priset, vilka fällor du ska se upp med och hur du får ett exakt fast pris utan att betala något.',
  alternates: { canonical: '/vad-kostar-en-hemsida/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* Sidan svarar på frågan utan att publicera priser: prislistan hör hemma i
   offerten enligt positioneringen. Det här är förklaringen av VAD som avgör,
   plus vägen till ett exakt pris som inte kostar något att få. */

const AVGOR = [
  {
    h: 'Hur mycket som redan finns',
    p: 'Har ni bilder från riktiga jobb, texter och en logga går bygget fort. Ska allt tas fram från noll är det mer arbete, och det är oftast innehållet som avgör tiden, inte tekniken.',
  },
  {
    h: 'Antal sidor och tjänster',
    p: 'En firma med tre tjänster i en stad behöver färre sidor än en med åtta tjänster i tre kommuner. Varje tjänst som ska kunna hittas på Google behöver sin egen sida.',
  },
  {
    h: 'Vad sidan ska göra',
    p: 'Ett offertformulär och en ringknapp är standard. Bokningskalender, priskalkylator eller kundportal är egna byggen som kostar mer, och som bara ska byggas när de faktiskt behövs.',
  },
  {
    h: 'Löpande eller engångs',
    p: 'Hos oss är priset ett engångspris och sidan blir er, med domän och innehåll. Månadsabonnemang kan se billigt ut men blir dyrare för varje år som går, och ni äger ofta ingenting den dag ni vill lämna.',
  },
];

const FALLOR = [
  {
    h: 'Månadsavgiften som aldrig tar slut',
    p: 'En låg månadskostnad låter tryggt, men räkna på tre år. Fråga alltid vad som händer med sidan, domänen och innehållet om ni säger upp avtalet. Är svaret att allt försvinner betalar ni hyra, inte pris.',
  },
  {
    h: 'Ni äger inte er egen domän',
    p: 'Registrerar leverantören domänen i sitt namn sitter de på er adress den dag ni vill byta. Domänen ska stå på er firma. Alltid, oavsett vem som bygger.',
  },
  {
    h: 'Gratis tills det inte är det',
    p: 'Gratisverktygen tar betalt i annat: reklam på er sida, en adress ni inte äger och timmarna ni själva lägger. För en firma som lever på förfrågningar är en sida som inte hittas dyrast av allt.',
  },
  {
    h: 'Priset utan innehåll',
    p: 'Ett lågt pris som inte inkluderar texter och bildhantering är inte lågt. Fråga vad som ingår och vem som gör vad, annars jämför ni två offerter som inte går att jämföra.',
  },
];

const FRAGOR_PRIS = [
  {
    fraga: 'Varför står det inget pris här?',
    svar:
      'För att ett pris utan att ha sett er firma vore en gissning, och gissningar brukar sluta med tillägg på fakturan. Ni får ett exakt fast pris i det kostnadsfria förslaget i stället, och det priset gäller. Inga månadsavgifter, ingen bindningstid.',
  },
  {
    fraga: 'Vad ingår i priset hos er?',
    svar:
      'Design, texter, bilder ni skickat inlagda, domän kopplad, publicering och att sidan funkar i mobilen. Ni äger sidan och domänen när den är klar. Det som kostar extra säger vi innan, aldrig efter.',
  },
  {
    fraga: 'Hur får jag veta exakt vad det kostar för oss?',
    svar:
      'Begär det kostnadsfria förslaget. Inom 48 timmar får ni se ett färdigt förslag på er nya sida tillsammans med ett exakt fast pris, innan ni bestämmer er. Gillar ni det inte kostar det ingenting och ni slipper tjat.',
  },
  {
    fraga: 'Är en dyrare hemsida alltid bättre?',
    svar:
      'Nej. En sida som visar era jobb, förklarar rätt avdrag och gör det lätt att ringa slår en dubbelt så dyr sida som saknar det. Betala för det som ger förfrågningar, inte för det som ser mest påkostat ut.',
  },
];

export default function Prisguide() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Vad kostar en hemsida?</span>
          </nav>
          <h1>Vad kostar en hemsida?</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Ärligt svar: det beror på fyra saker, och den som säger en siffra innan de sett er
            firma gissar. Här är vad som avgör priset, vilka fällor ni ska se upp med, och hur
            ni får ett exakt fast pris utan att betala något.
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Få exakt pris i gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Det som avgör</span>
          <h2>Fyra saker styr priset</h2>
          <div className={styles.punktNat}>
            {AVGOR.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fallYta}>
        <div className="wrap">
          <span className="eyebrow">Se upp med</span>
          <h2>Fällorna som gör billigt dyrt</h2>
          <div className={styles.punktNat}>
            {FALLOR.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <div>
              <h3>Så får ni ert pris, svart på vitt</h3>
              <p>
                Bahko Byrå bygger ett färdigt förslag på er nya sida inom 48 timmar, med exakt
                fast pris. Engångspris, inga månadsavgifter, ingen bindningstid. Kostar
                ingenting att se, och ni bestämmer sen.
              </p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Raka svar om pris</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR_PRIS} />
          </div>
        </div>
      </section>
    </>
  );
}
