import Link from 'next/link';
import Faq from '../../komponenter/Faq';
import Maskot from '../../komponenter/Maskot';
import styles from '../vad-kostar-en-hemsida/prisguide.module.css';

/* Guide för sökningen "bästa webbyrå i Sverige". Sidan påstår ALDRIG att Bahko
   Byrå är bäst: ett superlativ måste kunna styrkas enligt marknadsföringslagen,
   och en stuntsida hade dessutom varit chanslös mot topplistorna. I stället
   svarar den på det den som söker vill veta, hur man väljer, för lokala
   företagare (Mathias 2026-10-07). Bromma-siffrorna är belagda (BevisBromma.js). */

export const metadata = {
  title: 'Bästa webbyrå i Sverige? Så väljer du rätt som lokal företagare',
  description:
    'Det finns ingen bästa webbyrå i Sverige för alla. För en lokal företagare är den bästa byrån den som får telefonen att ringa. Sju saker att kontrollera innan du väljer.',
  alternates: { canonical: '/basta-webbyran-i-sverige/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const KOLLA = [
  {
    h: 'Riktiga kunder, med namn och länk',
    p: 'Snygga bilder bevisar ingenting. Be om sajter som är live, gärna inom din bransch, och fråga vad de gav: placering på Google, antal förfrågningar, samtal.',
  },
  {
    h: 'Du får se något innan du betalar',
    p: 'En byrå som tror på sitt arbete visar ett förslag först. Ska du betala innan du sett hur din sida kan se ut, köper du på hopp.',
  },
  {
    h: 'Domänen och sidan står på dig',
    p: 'Fråga vem som äger domänen och vad som händer med sidan om ni slutar samarbeta. Svaret ska vara att allt är ditt och att byrån hjälper dig flytta.',
  },
  {
    h: 'Byggd för mobilen och för att ringa',
    p: 'De flesta som letar efter ett lokalt företag gör det i telefonen. Numret ska gå att trycka på direkt, utan att öppna någon meny.',
  },
  {
    h: 'De kan lokal synlighet',
    p: 'För ett lokalt företag avgörs mycket i Google Företagsprofil och kartan, inte bara på själva hemsidan. Fråga hur byrån arbetar med den.',
  },
  {
    h: 'Priset räknat på tre år',
    p: 'Ett lågt startpris med en hög månadsavgift kan bli dyrast i längden. Lägg ihop allt du betalar under tre år och jämför då.',
  },
  {
    h: 'Du pratar med den som bygger',
    p: 'Går varje fråga via en säljare och en projektledare tar allt längre tid. Fråga vem du har kontakt med och hur snabbt du får svar.',
  },
];

const VARNING = [
  {
    h: 'Förstaplats utan villkor',
    p: 'Ingen styr Google. Ett seriöst löfte säger vilken sökning det gäller, inom vilken tid och vad som händer om det inte nås.',
  },
  {
    h: 'Topplistor du inte vet vem som gjort',
    p: 'Kolla vem som står bakom en lista över bästa webbyråer i Sverige och om byråerna betalat för att vara med. En lista utan förklaring av urvalet säger lite.',
  },
  {
    h: 'Allt för alla',
    p: 'En byrå som bygger webbshoppar, appar och banksajter vet sällan vad en lokal kund söker på innan den ringer en rörmokare eller en frisör.',
  },
];

const FRAGOR = [
  {
    fraga: 'Vilken är den bästa webbyrån i Sverige?',
    svar:
      'Det finns ingen som är bäst för alla. Ett stort e-handelsföretag och en lokal målerifirma behöver helt olika saker. Den bästa webbyrån för dig är den som kan visa resultat för företag som liknar ditt, och som låter dig se ett förslag innan du betalar.',
  },
  {
    fraga: 'Ska jag välja en stor eller en liten byrå?',
    svar:
      'En stor byrå passar när projektet är stort och har många inblandade. För ett lokalt företag är en mindre byrå ofta snabbare, eftersom du pratar direkt med den som bygger sidan.',
  },
  {
    fraga: 'Vad kostar det att anlita en webbyrå?',
    svar: (
      <>
        Det beror på hur mycket som redan finns, hur många tjänster sidan ska visa och vad den
        ska göra. Läs mer i <Link href="/vad-kostar-en-hemsida/">vad kostar en hemsida</Link>.
      </>
    ),
  },
  {
    fraga: 'Behöver jag en webbyrå alls?',
    svar:
      'Inte om du har tid att bygga och sköta sidan själv, och den redan ger förfrågningar. Kommer det inga samtal via sidan är det oftast värt att låta någon granska varför, och det kan göras utan kostnad.',
  },
];

export default function BastaWebbyran() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Bästa webbyrå i Sverige</span>
          </nav>
          <h1>
            <Maskot pose="pekar" stil="liten" alt="Bahko-maskoten visar vägen" /> Bästa webbyrå i
            Sverige? Så väljer du rätt som lokal företagare
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Det finns ingen bästa webbyrå i Sverige för alla. För en lokal företagare är den bästa
            byrån den som får telefonen att ringa, och som låter dig se arbetet innan du betalar.
            Här är sju saker att kontrollera.
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Se ett förslag innan du bestämmer dig {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Kontrollera</span>
          <h2>Sju saker att kolla innan du väljer webbyrå</h2>
          <div className={styles.punktNat}>
            {KOLLA.map((p) => (
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
          <h2>Tre varningssignaler</h2>
          <div className={styles.punktNat}>
            {VARNING.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <div>
              <h3>Så här gör Bahko Byrå</h3>
              <p>
                Du får ett färdigt förslag på din nya hemsida inom 48 timmar, innan du betalar
                något. För Bromma Trädgårdsservice gav sidan plats 1 i Googles kartresultat för
                trädgårdsservice i Stockholm den 30 juli 2026, och minst 30 offertförfrågningar från
                27 juli till 3 oktober.
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
          <h2>Raka svar om att välja webbyrå</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR} />
          </div>
          <p style={{ marginTop: '2.4rem', color: 'var(--ink-3)', fontSize: '0.95rem' }}>
            Bahko Byrå säger inte att vi är den bästa webbyrån i Sverige. Vi säger att vi är{' '}
            <Link href="/hardast-arbetande-webbyran-i-sverige/">
              den hårdast arbetande webbyrån i Sverige
            </Link>
            , och det kan vi visa.
          </p>
        </div>
      </section>
    </>
  );
}
