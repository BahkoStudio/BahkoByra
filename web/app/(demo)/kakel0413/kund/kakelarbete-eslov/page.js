import { fontKlasser } from '../../../_mall/fonter';
import Matning from '../../Matning';

/* ===========================================================================
   KAKEL 0413 AB: undersidan kakel0413.se/kakelarbete-eslov/ (2026-11-18).
   Mathias: "kakelarbete Eslöv och eller kakel Eslöv se till att han rankar för det. /optimering".
   Byggd enligt General SEO SOP 2026-11-16 (Quick win, steg C: frasen i title, H1, URL, beskrivning,
   brödtext och alt-text) och optimering-SKILL.md. Frasen, ordagrant: "kakelarbete i Eslöv".
   Startsidan tar "Kakelsättare i Eslöv och Skåne" (H1) och "kakel i Eslöv" (title), den här sidan
   den exakta frasen kakelarbete i Eslöv.

   FINNS BARA PÅ KUNDDOMÄNEN: web/middleware.js skriver om kakel0413.se/kakelarbete-eslov/ hit
   (KUNDER['kakel0413.se'].kundsidor). Direkta besök på /kakel0413/kund/... från andra domäner
   skickas av middleware till /kakel0413/. Därför statisk metadata med index och canonical.

   FAKTA, bara sådant som redan står på startsidan (page.js, Referenser.js) eller i llms.txt:
   utgår från Eslöv och arbetar i hela Skåne (orterna i frågan Var arbetar ni?), privatpersoner och
   företag, mindre uppdrag och större entreprenadprojekt, tjänsterna i tjänstekorten, de sex stegen,
   kostnadsfri genomgång på plats, tydlig offert, ROT upp till 50 000 kr per person och år (Nuhs
   formulering), ägarens tidigare arbete med Skanska, NCC, MVB, Peab och Tornstaden. Inga priser,
   inga omdömen, inga antal jobb, inget namn på en skribent. Bilden är en illustration och märks så.
   =========================================================================== */

const DOMAN = 'https://kakel0413.se';
const SOKVAG = '/kakelarbete-eslov/';
const M = '/kakel0413/media';

const TITLE = 'Kakelarbete i Eslöv: Kakel 0413 AB';
const BESKRIVNING = 'Kakelarbete i Eslöv för privatpersoner och företag: badrum, kök, hallar, trapphus och tvättstugor. Kostnadsfri genomgång på plats och tydlig offert.';

export const metadata = {
  title: TITLE,
  description: BESKRIVNING,
  metadataBase: new URL(DOMAN),
  alternates: { canonical: `${DOMAN}${SOKVAG}` },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: `${M}/icon.png`, type: 'image/png' }, { url: `${M}/favicon.ico` }],
    apple: `${M}/apple-touch-icon.png`,
  },
  openGraph: {
    title: TITLE,
    description: BESKRIVNING,
    url: `${DOMAN}${SOKVAG}`,
    siteName: 'Kakel 0413 AB',
    locale: 'sv_SE',
    type: 'website',
    images: [{ url: `${M}/og.jpg`, width: 1200, height: 630, alt: 'Illustration: färdigt badrum i ljus marmor med duschvägg i glas och mässingsdetaljer' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: BESKRIVNING, images: [`${M}/og.jpg`] },
};

const FRAGOR = [
  { q: 'Gör ni kakelarbete i Eslöv?', a: 'Ja. Vi utgår från Eslöv och tar jobb här, från ett helt badrum till ett mindre kakeljobb.' },
  { q: 'Kommer ni ut och tittar?', a: 'Ja, vi kommer alltid ut och tittar på plats. Genomgången är kostnadsfri.' },
  { q: 'Vet jag vad det kostar innan ni börjar?', a: 'Ja. Efter genomgången får du en tydlig offert, och vi går igenom vad som ingår innan arbetet börjar.' },
  { q: 'Tar ni mindre kakeljobb?', a: 'Ja. Inget jobb är för litet.' },
  { q: 'Kan jag skicka bilder först?', a: 'Gärna. Då får vi en bättre bild av jobbet redan från början.' },
  { q: 'Jobbar ni utanför Eslöv?', a: 'Ja, i hela Skåne, bland annat i Malmö, Lund, Helsingborg, Landskrona, Höör, Hörby, Svalöv, Trelleborg och Kristianstad.' },
];

const TJANSTER = [
  ['Badrumsrenovering', 'Hela badrummet, från genomgång och offert till färdigt badrum. Kakel på vägg och klinker på golv.'],
  ['Kakel i kök', 'Kakel och klinker i köket, till exempel kakel ovanför bänkskivan.'],
  ['Hallar och trapphus', 'Kakel och klinker i hallar och trapphus.'],
  ['Tvättstuga', 'Kakel på vägg och klinker på golv.'],
  ['Mindre arbeten', 'Inget jobb är för litet.'],
];

const STEG = [
  ['Kontakt', 'Du ringer eller skriver och berättar kort vad du vill ha gjort. Skicka gärna bilder.'],
  ['Kostnadsfri genomgång', 'Vi kommer ut och tittar på plats, och du kan ställa alla dina frågor.'],
  ['Offert', 'Du får en tydlig offert och vet vad som ingår innan arbetet börjar.'],
  ['Planering', 'Vi bestämmer tillsammans när vi börjar och hur arbetet ska göras.'],
  ['Arbetet utförs', 'Vi arbetar noggrant och håller dig informerad.'],
  ['Genomgång', 'När jobbet är klart går vi igenom resultatet med dig.'],
];

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAN}${SOKVAG}#webpage`,
    name: 'Kakelarbete i Eslöv',
    description: BESKRIVNING,
    url: `${DOMAN}${SOKVAG}`,
    inLanguage: 'sv-SE',
    dateModified: '2026-11-18',
    about: { '@id': `${DOMAN}/#business` },
    publisher: { '@id': `${DOMAN}/#business` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Kakel 0413 AB', item: `${DOMAN}/` },
        { '@type': 'ListItem', position: 2, name: 'Kakelarbete i Eslöv', item: `${DOMAN}${SOKVAG}` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FRAGOR.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

const MORK = '#151719';
const ACCENT = '#F86E09';
const ACCENT_TEXT = '#B54A00';
const RUBRIK = { fontFamily: 'var(--mall-rubrik), system-ui, sans-serif', fontWeight: 700, lineHeight: 1.15, color: MORK };
const H2 = { ...RUBRIK, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '2.6rem 0 0.9rem' };
const SEKTION = { maxWidth: '44rem', marginInline: 'auto', padding: '0 1.25rem' };
const KNAPP = { display: 'inline-block', padding: '0.85rem 1.3rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--mall-rubrik), system-ui, sans-serif' };
const LANK = { color: ACCENT_TEXT, textDecoration: 'underline', textUnderlineOffset: '0.2em' };

export default function KakelarbeteEslov() {
  return (
    <div className={fontKlasser} style={{ fontFamily: 'var(--mall-text), system-ui, sans-serif', color: '#2A2D31', background: '#fff', fontSize: '1.0625rem', lineHeight: 1.65 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <header style={{ borderBottom: '1px solid #E6E7E9' }}>
        <div style={{ ...SEKTION, maxWidth: '68rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBlock: '0.8rem' }}>
          <a href="/" aria-label="Kakel 0413 AB, till startsidan"><img src={`${M}/logo.webp`} width={1000} height={265} alt="Kakel 0413 AB" style={{ height: '40px', width: 'auto', display: 'block' }} /></a>
          <a href="tel:+46738752725" style={{ ...KNAPP, padding: '0.6rem 1rem', background: ACCENT, color: '#141414' }}>Ring 073-875 27 25</a>
        </div>
      </header>

      <section style={{ position: 'relative', background: MORK, color: '#F3F4F5', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline poster={`${M}/poster-hero.jpg`} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}>
          <source src={`${M}/video-hero-mobil.mp4`} type="video/mp4" media="(max-width: 700px)" />
          <source src={`${M}/video-hero.mp4`} type="video/mp4" />
        </video>
        <div style={{ ...SEKTION, position: 'relative', paddingBlock: 'clamp(3.5rem, 10vh, 6rem)' }}>
          <nav aria-label="Brödsmulor" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
            <a href="/" style={{ color: '#F3F4F5' }}>Startsida</a> <span aria-hidden="true">/</span> Kakelarbete i Eslöv
          </nav>
          <h1 style={{ ...RUBRIK, color: '#fff', fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', margin: 0 }}>Kakelarbete i Eslöv</h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', margin: '1rem 0 1.6rem', maxWidth: '34rem' }}>
            Kakel 0413 AB utgår från Eslöv. Vi gör kakelarbete i Eslöv åt privatpersoner och företag, från ett helt badrum till ett mindre jobb.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            <a href="tel:+46738752725" style={{ ...KNAPP, background: ACCENT, color: '#141414' }}>Ring 073-875 27 25</a>
            <a href="/#kontakt" style={{ ...KNAPP, border: '1px solid rgba(243,244,245,.5)', color: '#F3F4F5' }}>Skicka förfrågan</a>
          </div>
        </div>
      </section>

      <main style={{ paddingBottom: '3rem' }}>
        <div style={SEKTION}>
          <p style={{ marginTop: '2.4rem' }}>
            Du ringer, vi kommer ut och tittar, och du får en tydlig offert innan något börjar. Genomgången är kostnadsfri.
            Vi tar både mindre uppdrag och större entreprenadprojekt inom kakel och klinker.
          </p>

          <h2 style={H2}>Kakel och klinker i Eslöv, från golv till tak</h2>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {TJANSTER.map(([namn, text]) => <li key={namn} style={{ marginBottom: '0.5rem' }}><strong>{namn}.</strong> {text}</li>)}
          </ul>
          <figure style={{ margin: '1.8rem 0 0' }}>
            <img src={`${M}/tjanst-badrum.jpg`} width={960} height={720} loading="lazy" alt="Illustration till kakelarbete i Eslöv: ljust kaklat badrum med duschvägg i glas och mässingsblandare" style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }} />
            <figcaption style={{ fontSize: '0.95rem', marginTop: '0.5rem', color: '#4A4E54' }}>Bilden är en illustration, inte ett av våra jobb.</figcaption>
          </figure>

          <h2 style={H2}>Så går ett kakelarbete till</h2>
          <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {STEG.map(([namn, text]) => <li key={namn} style={{ marginBottom: '0.5rem' }}><strong>{namn}.</strong> {text}</li>)}
          </ol>

          <h2 style={H2}>Vem gör jobbet?</h2>
          <p>
            Bakom Kakel 0413 finns många års erfarenhet i branschen. Ägaren har tidigare arbetat med flera av Sveriges ledande byggföretag,
            bland annat Skanska, NCC, MVB, Peab och Tornstaden.
          </p>

          <h2 style={H2}>ROT-avdrag</h2>
          <p>
            Som privatperson kan du få ROT-avdrag enligt gällande regler. Det sänker arbetskostnaden med upp till 50 000 kr per person och år.
          </p>

          <h2 style={H2}>Vanliga frågor om kakelarbete i Eslöv</h2>
          {FRAGOR.map((f) => (
            <div key={f.q} style={{ marginBottom: '1.1rem' }}>
              <h3 style={{ ...RUBRIK, fontSize: '1.15rem', margin: '0 0 0.25rem' }}>{f.q}</h3>
              <p style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}

          <h2 style={H2}>Berätta vad du vill göra</h2>
          <p>
            Ring 073-875 27 25 eller mejla <a href="mailto:info@kakel0413.se" style={LANK}>info@kakel0413.se</a>. Du kan också
            {' '}<a href="/#kontakt" style={LANK}>skicka en förfrågan med bilder</a>. Läs mer om oss som{' '}
            <a href="/" style={LANK}>kakelsättare i Eslöv och Skåne</a>.
          </p>
        </div>
      </main>

      <footer style={{ background: MORK, color: '#F3F4F5', fontSize: '0.98rem' }}>
        <div style={{ ...SEKTION, paddingBlock: '2rem' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Kakel 0413 AB</p>
          <p style={{ margin: '0.3rem 0 0' }}>Eslöv · hela Skåne</p>
          <p style={{ margin: '0.3rem 0 0' }}><a href="tel:+46738752725" style={{ color: '#F3F4F5' }}>073-875 27 25</a> · <a href="mailto:info@kakel0413.se" style={{ color: '#F3F4F5' }}>info@kakel0413.se</a></p>
          <p style={{ margin: '1rem 0 0' }}><a href="/" style={{ color: '#F3F4F5' }}>Startsida</a> · <a href="#cookieval" style={{ color: '#F3F4F5' }}>Cookieinställningar</a></p>
        </div>
      </footer>
      <Matning />
    </div>
  );
}
