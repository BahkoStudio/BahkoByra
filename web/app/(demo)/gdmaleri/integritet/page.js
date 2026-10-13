import { M, kontakt, tema } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — integritet och cookies (/gdmaleri/integritet/ → gdmaleri.se/integritet/).
   Skriven 2026-10-13 när GA4 sattes upp (Mathias: "sätt upp analytics och gsc för gdmaleri").
   Enkel textsida utanför mallen: ingen hero, ingen film, bara det som är sant om sajten.
   Håll den sann: byts formulärtjänst, bokning, mätning eller inbäddningar ändras texten
   samma dag.

   VERIFIERAT (ur koden 2026-10-13):
   - Formuläret skickas via Web3Forms till GD:s e-post (formular.nyckel i _gd.js).
   - Bokningen är Cal.com, inbäddad som iframe (bokning.inbaddad i _gd.js).
   - Instagram-inlägg bäddas in som iframe från instagram.com (mallen, instagram.koder).
   - GA4 laddas bara efter ja i samtyckesrutan (public/gdmaleri/js/analytics.js, 'gd_consent').
   - Omdömen från Reco och Google är statisk text på sidan, inga skript från dem.
   =========================================================================== */
export const metadata = {
  title: 'Integritet och cookies | GD Måleri Sthlm AB',
  description: 'Så hanterar GD Måleri Sthlm AB uppgifterna du lämnar i formuläret och bokningen på gdmaleri.se, och vilka cookies sidan använder.',
  robots: { index: false, follow: false },
};

const stil = {
  sida: { margin: 0, background: '#FBF8F3', color: tema.mork, fontFamily: 'Outfit, system-ui, -apple-system, "Segoe UI", sans-serif', lineHeight: 1.6 },
  topp: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem clamp(1rem, 4vw, 3rem)', borderBottom: '1px solid rgba(13,27,42,.1)', background: '#fff' },
  logo: { height: 60, width: 'auto', display: 'block' },
  tillbaka: { color: tema.accentText, textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 600, padding: '0.6rem 0' },
  inner: { maxWidth: 720, margin: '0 auto', padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem) 5rem' },
  eyebrow: { color: tema.accentText, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.8rem' },
  h1: { fontSize: 'clamp(1.9rem, 5vw, 2.8rem)', lineHeight: 1.1, margin: '.4rem 0 1rem', letterSpacing: '-.01em' },
  lede: { fontSize: '1.15rem', margin: '0 0 2rem' },
  h2: { fontSize: '1.25rem', margin: '2rem 0 .5rem' },
  p: { margin: '0 0 .9rem' },
  a: { color: tema.accentText, textDecoration: 'underline', textUnderlineOffset: 3 },
  fot: { marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid rgba(13,27,42,.1)', fontSize: '.9rem', color: 'rgba(13,27,42,.7)' },
};

export default function GdMaleriIntegritet() {
  const k = kontakt;
  return (
    <div style={stil.sida}>
      <header style={stil.topp}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/gdmaleri/" aria-label="GD Måleri Sthlm AB – till startsidan"><img src={`${M}/logo-gdmaleri.png`} alt="GD Måleri Sthlm AB" style={stil.logo} /></a>
        <a href="/gdmaleri/" style={stil.tillbaka}>Till startsidan</a>
      </header>
      <main style={stil.inner}>
        <span style={stil.eyebrow}>Integritet</span>
        <h1 style={stil.h1}>Så hanterar vi dina uppgifter</h1>
        <p style={stil.lede}>
          Kort version: det du skriver i formuläret eller bokningen använder vi bara för att svara dig
          och lämna en offert. Vi säljer inget vidare och skickar inga nyhetsbrev. Statistik från
          Google Analytics används bara om du säger ja.
        </p>

        <h2 style={stil.h2}>Vem som ansvarar</h2>
        <p style={stil.p}>
          GD Måleri Sthlm AB, org.nr {k.orgnr}. Frågor om dina uppgifter:{' '}
          <a style={stil.a} href={`mailto:${k.epost}`}>{k.epost}</a> eller{' '}
          <a style={stil.a} href={k.telHref}>{k.tel}</a> ({k.oppet.toLowerCase()}).
        </p>

        <h2 style={stil.h2}>Formuläret</h2>
        <p style={stil.p}>
          Namn, telefon, e-post, vilken typ av kund du är och ditt meddelande skickas via tjänsten
          Web3Forms till vår e-post. Vi använder uppgifterna för att återkomma till dig, oftast
          inom 24 timmar, och för att lämna offert. De sparas i vår e-post så länge ärendet pågår
          och enligt bokföringslagen om det blir ett uppdrag.
        </p>

        <h2 style={stil.h2}>Bokningen</h2>
        <p style={stil.p}>
          Kalendern på sidan kommer från Cal.com. När du bokar ett hembesök eller ett samtal lämnar
          du namn, e-post och telefon till Cal.com, som skickar bokningen till oss. Cal.com hanterar
          uppgifterna enligt sin egen integritetspolicy.
        </p>

        <h2 style={stil.h2}>Cookies och statistik</h2>
        <p style={stil.p}>
          Sidan använder Google Analytics för att se hur många som besöker den och vilka sidor
          som leder till förfrågningar. Det sätter cookies och laddas bara om du har tryckt
          Okej i rutan längst ner. Du kan ändra dig när som helst via länken{' '}
          <a style={stil.a} href="#cookieval">Cookieinställningar</a> i sidfoten. Ditt val sparas i din
          webbläsare.
        </p>
        <p style={stil.p}>
          Inlägg från Instagram bäddas in direkt från instagram.com. När de visas kan Instagram
          (Meta) sätta egna cookies enligt sin policy. Omdömena från Reco och Google är vanlig text
          på sidan och laddar inget från dem.
        </p>

        <h2 style={stil.h2}>Dina rättigheter</h2>
        <p style={stil.p}>
          Du kan be oss visa, rätta eller radera de uppgifter vi har om dig. Skriv till{' '}
          <a style={stil.a} href={`mailto:${k.epost}`}>{k.epost}</a>. Är du missnöjd med hur vi
          hanterar dina uppgifter kan du vända dig till Integritetsskyddsmyndigheten (IMY).
        </p>

        <p style={stil.fot}>Uppdaterad 13 oktober 2026.</p>
      </main>
    </div>
  );
}
