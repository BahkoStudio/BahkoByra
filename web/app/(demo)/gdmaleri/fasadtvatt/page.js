import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, footerLankar, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida FASADTVÄTT (/gdmaleri/fasadtvatt/), 2026-10-13.
   Mathias 2026-10-13: "varje tjänst ska ha en undersida/landningssida". Slug på
   gdmaleri.se: /fasadtvatt/ (ny, fanns inte på WordPress-sajten). Fasadmålningen
   stannar på fasad/ (/fasad-malning/), där fasadtvätt också är ett kort.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).

   VERIFIERAT (2026-10-13), utöver huvudsidans VERIFIERAT-block:
   Fasadtvätt som egen tjänst: Ghandi via Mathias 2026-10-08 (kortet "Fasadtvätt
   och fasadmålning" på huvudsidan). gdmaleri.se/vara-tjanster/ fasadmålning
   (leadfilen): "träfasad, puts, tegel eller plåt", "noggrann analys av fasadens
   skick, inklusive tvättning, skrapning av lös färg och nödvändig reparation".
   Huvudsidans Varför-punkt (ur sajten): "förarbete som tvätt och skrapning"
   ingår i offerten. Belagda fasadjobb (IG, ordagrant): Dd-zVd3ggOI "Årets sista
   Fasad på 234 kvm 2026 är avklarad i Bromma", Dc1IM7Pgpeh "Exklusiv
   Fasadmålning klar 350 kvm i Täby kyrkby"; Handen 2025 och Värmdö 2026 enligt
   leadfilen. Reco (RECO_LISTA), femmor från verifierade kunder, ordagrant:
   Lovisa B 2026-09-07 ("slipa och måla vår stora fasad"), Susanne J 2026-07-22
   (fasaden på vårt hus), Bo M 2026-08-28 (två fritidshus och en sjöstuga).
   Google (GOOGLE_OMDOMEN): Marianne L (fasadmålning), Per (hus utvändigt).
   Skatteverket (hämtat live 2026-10-13, SKV_ROT + "Så fungerar rotavdraget"):
   30 procent av arbetskostnaden, högst 50 000 kr per person och år, du ska äga
   bostaden, material och resor ger inget avdrag. Småhus: "rengöra altandäck,
   fasader, tak, takpannor, hängrännor och solceller" ger rotavdrag. Bostadsrätt:
   rengöring av fasader ger inget avdrag, "gemensamma ytor, till exempel tak,
   fasader, trapphus och entréer" ger inget.

   INTE verifierat, och finns därför inte på sidan: tvättmetod och medel
   (högtryck, lågtryck, alg- och mögelmedel, kemikalier), hur ofta en fasad bör
   tvättas, priser, ledtider, antal tvättar, ställning/lift, garanti på tvätt
   (ett års garanti gäller måleriarbetet och står bara i Varför-sektionen).
   FLAGGOR: INGEN BILD VISAR EN PÅGÅENDE TVÄTT. fasad-fore-efter.webp (Bromma,
   234 kvm) är enligt Mathias 2026-10-08 före och efter fasadtvätt, men fasad/
   page.js beskriver samma bild som före (flagnande färg, ställning) och efter
   (nymålad); bildtexten här säger "före och efter jobbet" (tvätt, skrapning och
   målning) och påstår inte att högerhalvan visar enbart en tvättad fasad.
   Kortet "Fasadtvätt" visar samma gavel i kortbeskärning, kortet "Tvätt inför
   målning" en färdigmålad fasad vid en altan. Alla bilder är GD:s egna foton.
   Omdömena är fasta, inte levande, så att de handlar om fasader.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema. Raden robots: index:false
   byts av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/fasadtvatt/.
   =========================================================================== */

export const metadata = {
  title: 'Fasadtvätt i Stockholm | GD Måleri Sthlm AB',
  description:
    'Fasadtvätt i Stockholm: smuts, alger och lös färg bort från trä, puts, tegel och plåt, som egen tjänst eller inför målning. Kostnadsfri offert, ROT på småhus och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadtvätt i Stockholm',
  typ: 'Fasadtvätt',
  beskrivning: 'Rengöring av fasader i trä, puts, tegel och plåt i Stockholm, som egen tjänst eller som förarbete inför fasadmålning. ROT på småhus dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/fasadtvatt/') },

  hero: { ...hero, ort: 'Fasadtvätt i Stockholm', tjanster: ['Tvätt', 'Förarbete'] },
  tejp: ['Fasadtvätt', 'Trä, puts, tegel och plåt', 'Tvätt för sig', 'Eller inför målning', 'Skrapning av lös färg', 'ROT på småhus', '4,9 av 5 på Reco', 'Kostnadsfri offert'],

  tjanster: {
    eyebrow: 'Fasadtvätt',
    rubrik: ['Smutsen bort,', 'fasaden fräsch'],
    lead: 'En fasad som tvättas blir ren och ser nyare ut. Ska den målas sedan är tvätten det förarbete som får färgen att fästa. Vi tvättar trä, puts, tegel och plåt.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'fasadtvatt', namn: 'Fasadtvätt för sig', bild: `${M}/fasad-fore-efter-kortbild.webp`, alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva flagnande grå färg och byggställning, höger halva nymålad ljusgrå panel', text: 'Smuts och alger bort, utan målning efteråt.', punkter: ['Trä, puts, tegel och plåt', 'Kostnadsfri offert', 'ROT på småhus'], ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M60 64c6 8 6 14 0 20M92 58c6 8 6 14 0 20M124 64c6 8 6 14 0 20" /></>) },
      { id: 'forarbete', namn: 'Tvätt inför målning', bild: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan, resultatet efter tvätt, skrapning och målning', text: 'Vi tittar på fasadens skick, tvättar, skrapar lös färg och lagar.', punkter: ['Tvätt och skrapning', 'Lagning där det behövs', 'Ingår i måleriofferten'], ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M56 70h88M56 84h88" /><path d="M72 56l8 8M100 50l8 8M128 56l-8 8" /></>) },
      { id: 'fasadmalning', namn: 'Fasadmålning efteråt', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Efter tvätten kan fasaden målas om, med fönster och vindskivor.', punkter: ['Färg från Flügger', 'Vindskivor och takfot', 'Samma offert'], lank: { href: '/gdmaleri/fasad/', txt: 'Allt om fasadmålning i Stockholm' }, ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M44 56v44M68 50v50M92 44v56M116 44v56M140 50v50M164 56v44" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Fasader vi har', 'tvättat och målat'],
    lead: 'Senast 234 kvm i Bromma, och innan dess 350 kvm i Täby kyrkby. Alla bilder är från våra egna projekt.',
    not: 'Före/efter-bilden är två foton av samma gavel, tagna före och efter jobbet (tvätt, skrapning och målning) och satta ihop på mitten. Fler jobb finns på vårt Instagram.',
    utvalda: [
      { src: `${M}/fasad-fore-efter.webp`, w: 900, h: 1200, etikett: 'Före och efter', txt: 'Bromma, 234 kvm. Samma gavel: vänster halva före, höger halva efter jobbet.', alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva visar smutsig, flagnande grå färg och en byggställning, höger halva den rena, nymålade ljusgrå panelen med vita fönster', lank: { href: 'https://www.instagram.com/p/Dd-zVd3ggOI/', txt: 'Se jobbet på Instagram' } },
      { src: `${M}/jobb-taby-1.webp`, w: 900, h: 1200, etikett: 'Täby kyrkby, 350 kvm', txt: 'Träfasad i grått, klar i september 2026.', alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus med altan och utemöbler i Täby kyrkby', lank: { href: 'https://www.instagram.com/p/Dc1IM7Pgpeh/', txt: 'Se jobbet på Instagram' } },
    ],
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-bromma-altan.webp`, alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck', txt: 'Bromma: väggar och fönsterkarmar' },
      { src: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', txt: 'Panel och fönster målade' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-taby-2.webp`, alt: 'Samma nymålade grå träfasad i Täby kyrkby, sedd från tomten med tallar och berghällar', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
    ],
    rad2: [
      { src: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', txt: 'Tak före tvätt' },
      { src: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', txt: 'Tak efter tvätt' },
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', txt: 'Täby kyrkby, från tomten' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'sina fasader'],
    betyg: GOOGLE_BETYG,
    lista: [
      { namn: 'Lovisa B', kalla: 'Verifierad kund · Reco', text: 'Vi fick ett väldigt trevligt och kunnigt bemötande. De gjorde ett bra jobb med att slipa och måla vår stora fasad och blev klara i tid. Lätta att kommunicera med och väldigt trevliga.' },
      { namn: 'Susanne J', kalla: 'Verifierad kund · Reco', text: 'Målade om fasaden på vårt hus. Jättebra bemötande från offertförfrågan till färdigt resultat. Alltid lätt att få kontakt med företagsägare Ghandhi. Målarna som kom var super duktiga, lätta att ha och göra med. Kan varmt rekommendera GD Måleri Sthlm AB.' },
      { namn: 'Bo M', kalla: 'Verifierad kund · Reco', text: 'GD Måleri målade om två fritidshus och en sjöstuga. Allt gick jätte snabbt från offert till igångsättning (< 1vecka). Arbetet utfördes snabbt och resultatet var det jag förväntade mej. (bra jobbat).' },
      GOOGLE_OMDOMEN.marianne,
      GOOGLE_OMDOMEN.per,
    ],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09, antalet 2026-10-13.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Vanliga frågor om fasadtvätt',
    rubrik: ['Det ni brukar', 'fråga om tvätten'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om fasaden, så svarar vi på just ditt hus.' },
    lista: [
      { q: 'Vad kostar fasadtvätt?', a: 'Det beror på fasadens yta, material och hur smutsig den är. Därför börjar GD Måleri Sthlm AB med en offert, och den är kostnadsfri. Offerten tar med arbete, material, städning och bortforsling, så att det inte kommer något extra.' },
      { q: 'Får jag ROT-avdrag för fasadtvätt?', a: <>På ett småhus, ja: Skatteverket räknar rengöring av fasader som rotarbete, och GD Måleri Sthlm AB drar av det direkt på fakturan. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller dig som äger och bor i huset. Materialet ger inget avdrag. I en bostadsrättsförening är fasaden en gemensam yta och ger inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan jag beställa bara fasadtvätt, utan målning?', a: 'Ja. Fasadtvätt går att beställa för sig hos GD Måleri Sthlm AB. Vill du måla fasaden senare är tvätten redan gjord.' },
      { q: 'Måste fasaden tvättas innan den målas?', a: <>Ja. Innan vi målar går vi igenom fasadens skick: tvätt, skrapning av lös färg och de lagningar som behövs. Det är det förarbetet som gör att färgen fäster, och det ingår i offerten för <a href="/gdmaleri/fasad/">fasadmålning i Stockholm</a>.</> },
      { q: 'Vilka fasader tvättar ni?', a: 'Trä, puts, tegel och plåt, samma fasader som GD Måleri Sthlm AB målar.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har GD Måleri Sthlm AB bland annat gjort fasader i Bromma, Täby kyrkby och på Värmdö, och förra året i Handen.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på fasadtvätten'],
    lead: 'Ring, eller skriv några rader om huset. Du får en kostnadsfri offert där allt ingår, bara tvätt eller tvätt och målning.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om fasaden',
    placeholder: 'Trä, puts, tegel eller plåt, ungefärlig yta, bara tvätt eller tvätt och målning, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Dags att tvätta fasaden?',
    text: 'Berätta om huset så får du en offert som inte kostar något. På småhus dras ROT direkt på fakturan.',
  },

  footer: {
    text: 'Fasadtvätt i Stockholm: trä, puts, tegel och plåt, för sig eller inför målning. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Integritet och Cookieinställningar, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  samarbeten,
};

export default function GdMaleriFasadtvatt() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
