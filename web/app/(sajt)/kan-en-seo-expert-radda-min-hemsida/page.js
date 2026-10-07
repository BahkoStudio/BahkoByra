import Link from 'next/link';
import Faq from '../../komponenter/Faq';
import Maskot from '../../komponenter/Maskot';
import styles from '../vad-kostar-en-hemsida/prisguide.module.css';

export const metadata = {
  title: 'Kan en SEO-expert rädda min hemsida?',
  description:
    'Ja, om problemet är att ingen hittar sidan. Nej, om problemet är att de som hittar den inte ringer. Så ser du skillnaden, och vad en SEO-expert faktiskt gör för en hantverksfirma.',
  alternates: { canonical: '/kan-en-seo-expert-radda-min-hemsida/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* En riktig fråga som hantverkare ställer, till skillnad från stuntsidan
   /hardast-arbetande-seo-experten-i-sverige/. Svaret först, sedan skälen.
   Bromma-siffrorna är de belagda (se komponenter/BevisBromma.js). */

const RADDBAR = [
  {
    h: 'Kunderna ringer när de väl hittar er',
    p: 'Kommer det samtal från dem som besöker sidan, men för få besöker den, är det synligheten som brister. Det är precis det SEO-arbete löser.',
  },
  {
    h: 'Telefonnumret syns direkt i mobilen',
    p: 'De flesta som letar efter en hantverkare gör det i telefonen. Går numret att trycka på utan att öppna någon meny är grunden bra.',
  },
  {
    h: 'Varje tjänst kan förklaras på sidan',
    p: 'Kan sidan byggas ut med en egen sida per tjänst, till exempel takbyte, fasadmålning eller häckklippning, finns det något att ranka med.',
  },
];

const BYGGOM = [
  {
    h: 'Ingen ringer, trots besökare',
    p: 'Kommer det trafik men inga förfrågningar hjälper det inte att få fler besökare. Då är det sidan själv som behöver göras om.',
  },
  {
    h: 'Sidan går inte att ändra',
    p: 'Är sidan byggd så att varje ny text kräver en utvecklare, eller ligger den hos en leverantör som äger domänen, blir SEO-arbetet dyrt och långsamt.',
  },
  {
    h: 'Allt ligger på en enda sida',
    p: 'Tio tjänster på samma sida gör det svårt för Google att förstå vad ni är bäst på. Det går att rätta, men ofta är det enklare att bygga om strukturen från början.',
  },
];

const GOR = [
  {
    h: 'Google Företagsprofil',
    p: 'Rätt huvudkategori är den enskilt viktigaste inställningen för att synas i kartan. Öppettider, tjänsteområde och riktiga bilder från era jobb ska vara ifyllda. Kartan och AI-svaren hämtar härifrån.',
  },
  {
    h: 'Omdömen på Google',
    p: 'Omdömen på offertsajter syns inte i Google. En SEO-expert hjälper er att få nöjda kunder att lämna omdömet där det räknas, och svarar på varje omdöme.',
  },
  {
    h: 'En sida per tjänst',
    p: 'Den som söker på "fasadmålning Jönköping" ska landa på en sida om fasadmålning i Jönköping, inte på en startsida som räknar upp allt ni gör.',
  },
  {
    h: 'Text som maskiner kan läsa',
    p: 'ChatGPT och flera andra AI-tjänster läser bara den text som finns i sidans kod från början. Text som visas först när sidan körs syns inte för dem.',
  },
];

const FRAGOR = [
  {
    fraga: 'Hur lång tid tar det innan SEO märks?',
    svar:
      'För en lokal hantverksfirma brukar en uppstädad Google Företagsprofil märkas inom några veckor. Placeringar på vanliga sökningar tar oftare två till tre månader. Den som lovar resultat på några dagar säljer något annat än SEO.',
  },
  {
    fraga: 'Kan någon garantera första sidan på Google?',
    svar:
      'Ingen styr Google. En seriös garanti säger därför exakt vilken sökning som gäller, inom vilken tid, och vad som händer om den inte nås. Saknas de tre sakerna är det ett säljlöfte, inte en garanti.',
  },
  {
    fraga: 'Räcker det att skriva in sökord på sidan?',
    svar:
      'Nej. Sökorden behöver finnas, men det som avgör för en lokal firma är oftast Google Företagsprofil, omdömena och att varje tjänst har en egen sida som svarar på det kunden undrar.',
  },
  {
    fraga: 'Vad kostar det att få min hemsida granskad?',
    svar:
      'Hos Bahko Byrå är granskningen kostnadsfri. Ni får veta om sidan går att rädda med SEO eller om den behöver byggas om, och varför.',
  },
];

export default function SeoExpertRadda() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Kan en SEO-expert rädda min hemsida?</span>
          </nav>
          <h1>
            <Maskot pose="undersoker" stil="liten" alt="Bahko-maskoten granskar en hemsida" />{' '}
            Kan en SEO-expert rädda min hemsida?
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Ja, om problemet är att ingen hittar sidan. Nej, om problemet är att de som hittar den
            inte ringer. Då behöver sidan göras om, och ingen mängd SEO ändrar på det. Så här ser
            du vilket läge din hemsida är i.
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få din hemsida granskad gratis {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Går att rädda</span>
          <h2>Tecken på att SEO räcker</h2>
          <div className={styles.punktNat}>
            {RADDBAR.map((p) => (
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
          <span className="eyebrow">Behöver byggas om</span>
          <h2>Tecken på att SEO inte räcker</h2>
          <div className={styles.punktNat}>
            {BYGGOM.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vad en SEO-expert gör</span>
          <h2>Fyra saker som faktiskt flyttar en hantverksfirma på Google</h2>
          <div className={styles.punktNat}>
            {GOR.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <div>
              <h3>Så gick det för en trädgårdsfirma i Stockholm</h3>
              <p>
                Bahko Byrå byggde brommatradgardsservice.se, med telefonnumret synligt på varje
                skärm och en egen sida per tjänst. Den 30 juli 2026 låg firman först av sex i Googles kartresultat för
                trädgårdsservice i Stockholm och nämndes först när ChatGPT fick samma fråga. Från
                27 juli till 3 oktober kom minst 30 offertförfrågningar in via sidan.
              </p>
            </div>
            <Link href="/case/" className="btn btn-primar">
              Se kundcasen {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Raka svar om SEO för hantverkare</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR} />
          </div>
          <p style={{ marginTop: '2.4rem', color: 'var(--ink-3)', fontSize: '0.95rem' }}>
            Skriven av Mathias Bahko, grundare av Bahko Byrå och{' '}
            <Link href="/hardast-arbetande-seo-experten-i-sverige/">
              den hårdast arbetande SEO-experten i Sverige
            </Link>
            , åtminstone enligt honom själv.
          </p>
        </div>
      </section>
    </>
  );
}
