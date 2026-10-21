import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   VELEBIT MÅLERI AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/velebitmaleri + velebitmaleri.se · måleri invändigt
   och utvändigt, tapetsering, fasad, för privat, företag och BRF i Stockholm.
   Byggd 2026-10-21 på demomallen v3 (struktur och nivå efter ckmaleri).

   Bärande idé: ett måleri som håller avgörs innan penseln kommer fram.
   Tvätt, skrapning, skydd och torkning är en del av jobbet (deras egen text).
   Hero-filmen visar det på ett av deras egna fasadjobb: slitet → tvättat →
   målat → klart.

   VERIFIERAT (2026-10-21):
   - Instagram @velebitmaleri (skärmbild från Mathias + embed utan inloggning):
     "Velebit Måleri AB", 324 inlägg, 13,5k följare (embed: 13 528). Bio:
     "Måleri där detaljerna gör skillnaden", "Privat • Företag • BRF",
     "Stockholm", "4,9/5 av våra kunder", "Tel: 0702020212",
     velebitmaleri.se, Facebook "velebitmaleri". Höjdpunkter: Omdömen
     (Reco-märket "Sveriges bästa målerifirma Topp 10 2023"), 2026,
     Fasadmålning, Tapetsering.
   - Inlägg (alla bilder på sidan kommer härifrån): Dd6rxuSDKg5 (fasad med
     ställning: slitet → tvätt → ljusgrönt), DdPGV1TjJhY (röd fasad + förråd),
     Dcy3zfyDIlE (vit/svart villa + glasrum), DeUUu0WDLJr (lägenhet: före,
     arbete, klart), Dc_4IDwjPFt (tapet i tak, målare i arbete),
     DeZXRp5DCkD (stor fototapet i en lokal). Inga bildtexter gick att läsa
     utan inloggning: bildtexterna på sidan beskriver bara vad som syns.
   - velebitmaleri.se (WebFetch): "Din målare i Stockholm", fast pris eller
     per timme, målarna har över 15 års erfarenhet, stucco lustro, marmorering,
     schablonmålning, fasad- och golvmålning, "tydlig projektledning med direkt
     kommunikation", "garanti på alla våra arbeten", kostnadsfri offert,
     beredning/skydd/isolering/torkning, "lämna rent efter utfört arbete",
     tjänstelistan (invändigt + utvändigt, bostadsrätter till föreningar),
     miljötexten (ingen färg i avloppet, källsortering), ROT upp till 30 %
     av arbetskostnaden. info@velebitmaleri.se · 070-20 20 212 · 072-92 12 651.
   - Reco (reco.se/velebit-maleri-ab, hämtad 2026-10-21): 100 omdömen,
     snittbetyg 5.0, 97 % tillfrågade, trovärdighet Mycket Bra, på Reco sedan
     2020, märken Rekommenderat företag 2020–2025. Omdömena nedan ordagranna
     (Martin W kortat utan ändrad innebörd), utan stjärnor per kort.
   - Bolagsregister (hitta.se, krafman.se, alltombolag.se): Velebit Måleri AB,
     org.nr 559233-3495, registrerat 2019, F-skatt och moms registrerade.

   INTE verifierat, och finns därför inte på sidan: priser, ledtider,
   garantitidens längd, antal projekt, öppettider, Google-betyg, exakt
   Facebook-URL. Adressen skiljer sig mellan källorna (Bandhagen, Brandbergen,
   Rönninge): sidan säger bara "Stockholm". Reco-märket Topp 10 2023 syns bara
   i IG-höjdpunkten (ingen fil i användbar storlek): nämns inte som bild.
   IG-bion säger 4,9/5, Reco visar 5.0 av 100 i dag: sidan använder Recos.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln).
   HERO-FILMEN är GENERERAD (Higgsfield Wan 3.0 Prime bild-till-film, 1080p,
   utan ljud) ur deras egna foton av SAMMA hus (inlägget Dd6rxuSDKg5):
   1) den slitna fasaden under ställningen, 2) högtryckstvätt, 3) rollern
   över de bruna brädorna, 4) det färdiga ljusgröna huset. Huset är deras,
   rörelsen och personerna i rörelse är genererade.
   LOGOTYP SAKNAS i användbar storlek (profilbilden är 100 px): ordmärke i
   text, även på slutkortet. Be om originalfilen.
   =========================================================================== */

export const metadata = {
  title: 'Velebit Måleri — målare i Stockholm för privat, företag och BRF',
  description:
    'Invändig och utvändig målning, fasad och tapetsering i Stockholm. Fast pris eller per timme, garanti och kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/velebitmaleri/media';
const RECO = 'https://www.reco.se/velebit-maleri-ab';

const data = {
  namn: 'Velebit Måleri',
  ordmarke: 'Velebit Måleri',
  tema: {
    mork: '#0B1B33',
    accent: '#1D4ED8',
    accentHover: '#1E40AF',
    accentText: '#1D4ED8',
    accentLjus: '#93B4FF',
    paAccent: '#fff',
  },
  kontakt: {
    tel: '070-202 02 12',
    telHref: 'tel:+46702020212',
    epost: 'info@velebitmaleri.se',
    adress: 'Stockholm',
    ig: 'https://www.instagram.com/velebitmaleri/',
    igHandle: '@velebitmaleri',
    orgnr: '559233-3495',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    h1: ['Velebit', { txt: 'Måleri', liten: true }],
    ort: 'Stockholm',
    tjanster: ['Måleri', 'Fasad'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Fasadmålning', 'Invändigt', 'Tapetsering', 'Snickerier', 'Trapphus', 'BRF', 'Företag', 'Stockholm'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Från vardagsrummet', 'till hela fasaden'],
    lead: 'Vi målar och tapetserar för privatpersoner, företag och bostadsrättsföreningar i Stockholm, från en vägg till en hel fasad.',
    kort: [
      { id: 'fasad', namn: 'Fasadmålning', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad röd träfasad med vita knutar och fönster', text: 'Hus, radhus, sommarstugor och fritidshus. Vi tvättar fasaden och skyddar det runt omkring innan färgen kommer på.', punkter: ['Villa och radhus', 'Fönster och dörrar', 'Balkong, altan och staket'], ritning: (<><path d="M30 100V55l70-35 70 35v45" /><path d="M50 100V62M70 100V52M90 100V45M110 100V45M130 100V52M150 100V62" /><path d="M20 100h160" /></>) },
      { id: 'invandig', namn: 'Invändig målning', bild: `${M}/tjanst-invandig.jpg`, alt: 'Ljust nymålat rum i en lägenhet med vita dörrar och ljust golv', text: 'Väggar, tak, snickerier och köksluckor, även badrum och våtrum. Vi lämnar rent efter oss.', punkter: ['Väggar och tak', 'Snickerier och köksluckor', 'Badrum och våtrum'], ritning: (<><path d="M40 20h90v26H40z" /><path d="M130 33h20v30H85v20" /><path d="M78 83h14v24H78z" /></>) },
      { id: 'tapet', namn: 'Tapetsering', bild: `${M}/tjanst-tapet.jpg`, alt: 'Mönstrad tapet med blad i ett tak, med ljusgrå väggar och hyllor', text: 'Vi tapetserar väggar och tak, och gör specialtekniker som stucco lustro, marmorering och schablonmålning.', punkter: ['Väggar och tak', 'Stucco lustro och marmorering', 'Schablonmålning'], ritning: (<><path d="M50 20h60v85H50z" /><path d="M110 20h40v85h-40" /><path d="M65 40c10 8 20 8 30 0M65 65c10 8 20 8 30 0" /></>) },
      { id: 'foretag', namn: 'Företag & BRF', bild: `${M}/tjanst-foretag.jpg`, alt: 'Stor fototapet med fiskar på en vägg i en lokal under arbete', text: 'Trapphus, entréer, lokaler och föreningens hus. En kontakt och direkt besked under hela jobbet.', punkter: ['Trapphus och grovingångar', 'Lokaler', 'Bostadsrättsföreningar'], ritning: (<><path d="M40 105V25h60v80M100 105V50h60v55" /><path d="M55 40h10M75 40h10M55 60h10M75 60h10M55 80h10M75 80h10M115 65h10M135 65h10M115 85h10M135 85h10" /><path d="M25 105h150" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Våra egna jobb,', 'fotade på plats'],
    lead: 'Fasader, lägenheter och lokaler, som vi visar dem på Instagram.',
    not: 'Alla bilder är från våra egna jobb på Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-villa-svartvit.jpg`, alt: 'Villa i vit och svart panel med altandäck och stora fönster', txt: 'Villa i två kulörer' },
      { src: `${M}/jobb-rott-hus.jpg`, alt: 'Röd träfasad med vita fönster sedd nära marken', txt: 'Röd fasad' },
      { src: `${M}/jobb-villa-stege.jpg`, alt: 'Vit villa med stege mot fasaden och ett förråd framför', txt: 'Fasad under arbete' },
      { src: `${M}/jobb-glasrum.jpg`, alt: 'Inglasat uterum i svart med träaltan och krukväxt', txt: 'Uterummet' },
      { src: `${M}/jobb-rott-tradgard.jpg`, alt: 'Rött hus med vita knutar sett från trädgården', txt: 'Hela huset klart' },
      { src: `${M}/jobb-villa-svart.jpg`, alt: 'Svartmålad villa med vita fönsterkarmar mot blå himmel', txt: 'Svart panel' },
      { src: `${M}/jobb-forrad.jpg`, alt: 'Rött förråd med vita dubbeldörrar i en trädgård', txt: 'Förrådet med' },
    ],
    rad2: [
      { src: `${M}/jobb-lagenhet-fore.jpg`, alt: 'Rum med mörkgröna väggar och spacklade fläckar före målning', txt: 'Före: spacklat' },
      { src: `${M}/jobb-lagenhet-arbete.jpg`, alt: 'Lägenhet mitt i jobbet med färghinkar och verktyg på golvet', txt: 'Mitt i jobbet' },
      { src: `${M}/jobb-kok-klart.jpg`, alt: 'Ljust nymålat kök med svart bänkskiva', txt: 'Köket klart' },
      { src: `${M}/jobb-hall-klar.jpg`, alt: 'Lång ljus hall med nymålade väggar och garderobsdörrar', txt: 'Hallen klar' },
      { src: `${M}/jobb-tak-malare.jpg`, alt: 'Målare arbetar vid fönstret under ett tapetserat tak', txt: 'Tapet i taket' },
      { src: `${M}/jobb-alkov.jpg`, alt: 'Alkov med dekorerad vägg och en målare i dörröppningen', txt: 'Detaljerna' },
      { src: `${M}/jobb-fototapet.jpg`, alt: 'Stor vägg i en lokal förberedd för fototapet, med ställning', txt: 'Lokal före tapet' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Velebit Måleri',
    rubrik: ['Färgen syns,', 'förarbetet håller'],
    lead: 'Ett bra måleri avgörs innan penseln kommer fram. Beredning, skydd och torkning är en del av jobbet hos oss, inte ett tillägg.',
    punkter: [
      { rubrik: 'Fast pris eller timme', text: 'Du väljer själv om du vill betala ett fast pris eller per timme.' },
      { rubrik: 'Direkt kontakt', text: 'Tydlig projektledning, och du pratar direkt med oss medan jobbet pågår.' },
      { rubrik: 'Garanti på arbetet', text: 'Vi lämnar garanti på alla våra arbeten.' },
      { rubrik: 'Rent när vi går', text: 'Vi städar efter oss, och ingen färg hamnar i avloppet.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över en nymålad villa i vit och svart panel mot blå himmel. Filmen slutar med namnet Velebit Måleri.',
  },

  om: {
    eyebrow: 'Om Velebit Måleri',
    rubrik: ['Måleri där detaljerna', 'gör skillnaden'],
    kortRad: 'Stockholm · Privat, företag, BRF',
    stycken: [
      'Velebit Måleri är ett måleriföretag i Stockholm med hantverkare som har över 15 års erfarenhet. Vi har gjort alla typer av måleriarbeten, från fasad och golv till stucco lustro, marmorering och schablonmålning.',
      'Vi vill att du ska känna dig trygg när du anlitar oss. Därför får du tydlig projektledning, direkt kontakt under arbetets gång och garanti på det vi gör.',
    ],
    bevis: [
      { ord: '15+ år', text: 'erfarenhet hos våra målare' },
      { ord: 'Garanti', text: 'på alla våra arbeten' },
      { ord: 'Sedan 2019', text: 'som Velebit Måleri AB' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till nymålat'],
    lead: 'Fyra hållplatser, och du vet vad som händer i varje.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skicka några rader om vad som ska målas, och var.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri offert', text: 'Vi går igenom jobbet och du får en offert som inte kostar något.', ikon: 'offert' },
      { namn: 'Fast pris eller timme', text: 'Du väljer hur du vill betala, och vi planerar jobbet.', ikon: 'plan' },
      { namn: 'Vi målar och städar', text: 'Förarbete, målning och städning, tills det är klart.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    recoBetyg: { varde: 5.0, antal: 100, href: RECO },
    lista: [
      { namn: 'Martin W', kalla: 'Reco · vardagsrum med pappspänt tak', lank: RECO, stjarnor: false, text: 'Kommunikationen fungerade smidigt, och Velebit var hela tiden lyhörda för våra önskemål och frågor. Målarna var trevliga och städade ordentligt efter sig. Arbetet blev klart enligt tidsplanen, till och med något snabbare, och inom budget. Resultatet blev mycket bra, inte minst taket.' },
      { namn: 'My H', kalla: 'Reco · villa', lank: RECO, stjarnor: false, text: 'Velebit målade vår villa i somras. Trevliga målare, mycket prisvärt och jobbet som vi räknat med skulle ta minst två veckor (beroende på väder) gick på bara en vecka. Skulle absolut rekommendera.' },
      { namn: 'Oscar C', kalla: 'Reco · invändigt', lank: RECO, stjarnor: false, text: 'Målning av nästan hela huset invändigt skedde enligt tidplan med utmärkt kvalitet. Enkla att kommunicera med och bryr sig om detaljer och slutresultatet. Högsta betyg, kommer använda samma firma igen nästa gång!' },
      { namn: 'Martin S', kalla: 'Reco · tak, väggar och snickerier', lank: RECO, stjarnor: false, text: 'Rivning av tapet, bredspackling, slipning och målning av tak, väggar, snickerier samt en garderob. Blev superfint! Rajko och gänget är grymma.' },
      { namn: 'Johanna H', kalla: 'Reco · tak och väggar', lank: RECO, stjarnor: false, text: 'Målning av tak och väggar i vardagsrum. Allt var toppen, bokning, kommunikation och utförande!' },
      { namn: 'Per S', kalla: 'Reco · upphandling', lank: RECO, stjarnor: false, text: 'Utmärkt upphandling och genomförande enl. plan. Fint resultat' },
    ],
    not: 'Omdömena är hämtade från Reco, där Velebit Måleri har 100 omdömen.',
    lank: { href: RECO, txt: 'Läs alla på Reco' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Måleri där detaljerna gör skillnaden · Privat • Företag • BRF · Stockholm',
    koder: ['Dd6rxuSDKg5', 'DdPGV1TjJhY', 'DeUUu0WDLJr'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller för just ditt jobb.' },
    lista: [
      { q: 'Vad kostar det att måla?', a: 'Det beror på ytan, underlaget och hur mycket förarbete som behövs. Du väljer om du vill betala ett fast pris eller per timme, och du får en offert på just ditt jobb.' },
      { q: 'Kostar offerten något?', a: 'Nej, offerten är kostnadsfri. Ring eller använd formuläret.' },
      { q: 'Kan jag använda ROT-avdrag?', a: (<>Ja, som privatperson. Avdraget är upp till 30 procent av arbetskostnaden och dras direkt på fakturan. Villkoren står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Lämnar ni garanti?', a: 'Ja, vi lämnar garanti på alla våra arbeten.' },
      { q: 'Målar ni åt bostadsrättsföreningar och företag?', a: 'Ja. Vi målar hus och trapphus åt föreningar och lokaler åt företag, och privata hem förstås.' },
      { q: 'Gör ni specialtekniker?', a: 'Ja, bland annat stucco lustro, marmorering och schablonmålning, och tapetsering av väggar och tak.' },
      { q: 'Vad händer med färgresterna?', a: 'Ingen färg hamnar i avloppet. Avfallet källsorteras: återanvändning, återvinning, energiutvinning och sist deponering.' },
      { q: 'Var arbetar ni?', a: 'I Stockholm med omnejd.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta vad som ska målas,', 'offerten kostar inget'],
    lead: 'Skicka några rader om jobbet och var det ligger, eller ring. Du får en offert på just ditt jobb.',
    checkar: ['Kostnadsfri offert', 'Fast pris eller per timme', 'Privat, företag och BRF'],
    kundtyp: ['Privatperson', 'Företag', 'BRF'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Ort, vad som ska målas (fasad, rum, trapphus …) och ungefär hur stor yta',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Dags att måla om?',
    text: 'Offerten kostar ingenting, och du väljer fast pris eller per timme.',
  },

  footer: {
    text: 'Invändig och utvändig målning, fasad och tapetsering i Stockholm, för privatpersoner, företag och BRF.',
  },

  modal: {
    rubrik: 'Så här kan Velebit Måleri se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram, på velebitmaleri.se och på Reco, med era egna jobbfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function VelebitMaleriDemo() {
  return <DemoSida data={data} />;
}
