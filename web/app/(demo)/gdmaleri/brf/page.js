import DemoSida from '../../_mall/DemoSida';
import { formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, menyExtra, samarbeten, GOOGLE_BETYG, GOOGLE_OMDOMEN } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — undersida för bostadsrättsföreningar (/gdmaleri/brf/)
   Byggd 2026-10-08 på demomallen v3. OMBYGGD 2026-10-09 till mallens andra
   layout, layout: 'styrelse' (Mathias: "två olika strukturer för BRF och
   vanliga demon", förebild alviksmaleri.se:s BRF-sida fast lugnare och utan
   dess upprepningar; ingen text är kopierad). Samma tema, logotyp, kontakt,
   formulär och bokning som huvudsidan (../_gd.js).

   STRUKTUREN (styrelse-layouten): 1 lugn delad hero utan film: rubrik för
   styrelsen, ingress, Boka offertbesök + Ring, bevisrad, stillbild ur deras
   egen film med Reco-kortet som litet lager · 2 Så går ett BRF-jobb till,
   fem numrerade steg · 3 Tjänster som rader (bild/text omväxlande) · 4 Därför
   väljer en styrelse GD Måleri · 5 Omdömen (privatkunder) med Reco-betyget
   som bricka · 6 Frågor från styrelser · 7 Boka offertbesök (Cal.com) +
   kontakt med BRF förvalt i formuläret · footer. Inget tjänsteband, inga
   jobbband, ingen Varför-film, inget Om oss, ingen Instagram.

   GHANDIS BESKED (via Mathias 2026-10-08): han har främst jobbat åt
   privatkunder och vill nu börja ta BRF-uppdrag. Enda arbetet åt en
   fastighetsägare/förening, ordagrant från Ghandi samma dag: "Referenser har
   jag från en Brf Holmströmsgruppen AB där vi målade deras 4 lägenheter".
   Kontroll (WebSearch 2026-10-08, mfn.se/Holmströmgruppens årsredovisning
   2022): Holmströmgruppen AB är ett fastighetsbolag i Stockholm (moderbolag
   till Holmström Fastigheter Holding AB (publ), bostads- och
   samhällsfastigheter i Mälardalen och Örnsköldsvik), INTE en
   bostadsrättsförening. NAMNGIVNING GODKÄND av Ghandi via Mathias
   2026-10-08 ("Holmströmsgruppen godkänner att namnges som referens").
   Sidan säger därför "fyra lägenheter åt fastighetsbolaget
   Holmströmgruppen" — bolagets egen stavning (utan s; Ghandi skrev
   "Holmströmsgruppen AB") — utan ort, yta, år eller omdöme. Vinkeln i övrigt:
   GD Måleri tar nu uppdrag åt bostadsrättsföreningar, och beviset är hur de
   jobbar åt privatkunder (Reco, samma upplägg). Sidan säger rakt ut att
   omdömena kommer från privatkunder.

   VARIANT UTAN NAMN (om godkännandet dras tillbaka): byt
   "fastighetsbolaget Holmströmgruppen" mot "en fastighetsägare" i
   Lägenheter-raden och FAQ:n, och stryk "som också är vår referens".

   HERO-BILDEN (brf-hero.jpg, 1440×1080): bildruta 6,4 s ur hans EGEN herofilm
   (Omslag-hemsida-2.mp4 från gdmaleri.se, samma klipp som i video-hero.mp4):
   drönarbild av en målare på stege vid balkongen på ett vitt hus. Beskuren till
   4:3 med ffmpeg, ingen generering. Ingen ort är belagd för huset, så sidan
   påstår ingen. Lagret är Recos egen märkesbild (reco-kort.png, hela kortet,
   säger 44 recos medan Reco nu visar 45), som på huvudsidans Om oss.

   Bärande idé: en offert styrelsen kan fatta beslut på. Allt med i offerten,
   inget extra utan föreningens ja, fakturan när jobbet är klart, F-skatt och
   försäkring. Allt ur gdmaleri.se. Står i h1:ans kursiv ("Allt i offerten,
   inget i förskott"), bevisraden, processen och Därför-blocket.

   VERIFIERAT (2026-10-08), utöver allt i huvudsidans VERIFIERAT-block:
   gdmaleri.se/vara-tjanster/: "Vi utför uppdrag åt företag, BRF &
   privatpersoner" (under varje tjänst) · invändig målning "för både
   privatpersoner, företag och bostadsrättsföreningar" · takmålning:
   "Oavsett om det gäller en lägenhet, villa, kontorslokal eller trapphus",
   "bred erfarenhet av både klassiska och moderna trapphusmålningar",
   "förberedelserna görs korrekt med spackling, slipning och grundmålning",
   "hjälpa till med färgval och designförslag" · fasadmålning: "träfasad,
   puts, tegel eller plåt", "noggrann analys av fasadens skick, inklusive
   tvättning, skrapning av lös färg och nödvändig reparation" · fönster:
   "skrapar bort gammal färg … slipning och grundmålning", "träfönster,
   metallfönster" · Övriga tjänster: bl.a. dörrmålning och underhållsmålning.
   Offertbesök: Cal.com-bokningen cal.com/gdmaleri/offert (kostnadsfri offert,
   45 min besök på plats, vardagar 08–17; Mathias 2026-10-08).
   Skatteverket (hämtat 2026-10-08): rotavdrag ges bara till privatpersoner,
   i bostadsrätt bara för arbete inne i bostaden där bostadsrättshavaren har
   underhållsansvaret enligt stadgarna; "Inget avdrag ges för arbete på
   gemensamma ytor, till exempel tak, fasader, trapphus och entréer".
   Källor: skatteverket.se/foretag/skatterochavdrag/rotochrut/
   gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html och
   skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/
   safungerarrotavdraget.4.5947400c11f47f7f9dd80004014.html
   Reco-omdömen här (femmor från verifierade kunder, ordagrant, Nils F kortat
   med …): Nils F 2024-09-22 (20-talslägenhet, "rekommenderade av en granne"),
   Pia T 2025-11-11 (lägenhet), Anders F 2025-12-19 (hall, trapphus och
   vardagsrum, "enligt överenskommen tidsplan"; samma utdrag som huvudsidan).
   Reco-betyget 4,9 av 5 av 45 omdömen (reco.se/gd-maleri-sthlm) står som
   bricka i omdömessektionen (omdomen.recoBetyg) — utan Googles G.
   GOOGLE (2026-10-09, se ../_gd.js GOOGLE_OMDOMEN): Google-betyget 4,8 av 5 av
   18 recensioner som bricka med Googles G bredvid Reco-brickan, båda länkade,
   och tre Google-kort utan stjärnor: Jenny E (tydlig offert, extradebitering,
   tidplanen höll), Daniel N (snabb offert, klart inom en vecka) och Therese G
   (anlitat flera gånger) — det en styrelse frågar efter.

   INTE verifierat, och finns därför inte på sidan: något jobb åt en BRF —
   det finns inget (Ghandis besked; inget Reco-omdöme, IG-inlägg eller foto är
   ett BRF-uppdrag; gdmaleri.se:s "Vi utför uppdrag åt företag, BRF &
   privatpersoner" är ett erbjudande, inte en referens, och citeras inte;
   "trapphus" i Anders F:s omdöme är en trappa i ett hem), referenser från
   föreningar, besiktning före offert som löfte (bara ett offertbesök, som
   Cal.com-bokningen säger), skriftligt underlag/beslutsunderlag till
   styrelsen utöver offerten, AVISERING/information till de boende (steg 2 i
   processen heter därför "Styrelsens ja", inte "Avisering av de boende" —
   fråga Ghandi), arbetstider, ledtider, källare, garage, ramavtal, priser.

   FLAGGOR: BRF är ett NYTT område för honom. GENERERADE BILDER (Higgsfield
   API, Qwen Image 3, 2k, 4:3, 2026-10-08, 0,075 USD styck) — raderna
   Trapphus (brf-trapphus.jpg), Entréer och dörrar (brf-entre.jpg) och Fasad
   och fönster (brf-fasad.jpg). De är illustrationer, inte GD:s jobb:
   alt-texten börjar med "Illustrationsbild" och tjanster.not säger det på
   sidan (jobbanden med jobb.not finns inte i den här layouten). Lägenheter
   har ett eget foto (jobb-sekelskifte.jpg). Planen för att vinna BRF-jobb
   står i content/leads/gdmaleri.md.
   gdmaleri.se:s FAQ säger att ROT gäller "För privatpersoner & företag … upp
   till 75 000 kr" — fel enligt Skatteverket (bara privatpersoner, högst
   50 000 kr rot av totalt 75 000 kr rot + rut). Sidan här säger det rätta.

   FORMULÄR OCH MENY (2026-10-08, som huvudsidan): Ghandis egen Web3Forms-nyckel
   (data.formular i ../_gd.js), kundtyp Privatperson/Företag/BRF med BRF
   förvalt (kontaktSektion.kundtypVald, 2026-10-09), "Vi återkommer inom 24
   timmar" (Mathias på Ghandis vägnar 2026-10-08). Footerns Tjänster-kolumn
   länkar till tjänstesidorna och mobilmenyn får dem (nav.extra). Kalendern
   (data.bokning, inbäddad) och "Boka att GD Måleri Sthlm AB ringer upp" som
   huvudsidan; ingressen under kalendern är omskriven för föreningen.

   OMARBETNING 2026-10-09 (Mathias: "mer professionell och trovärdig BRF-sida,
   strukturen ska se annorlunda ut, som de bästa måleri-/renoveringsfirmornas
   BRF-sidor"). Förebilder för STRUKTUREN (inte texten):
   andresmaleri.se/tjanster/brf-underhall, /trapphusmalning-stockholm och
   /kunskap/trapphusrenovering/trapphusrenovering-101-for-styrelse (checklista
   för styrelsen, offert specificerad per moment, namngiven kontakt,
   slutbesiktning) · vimalar.se/brf-maleri-stockholm (beslutsunderlag,
   tidsplan, kontaktperson) · certapro.com HOA/condo-sidorna (jämförbara
   anbud "apples-to-apples", skriftlig garanti, steg för steg för styrelsen).
   Nytt: mallsektionen d.styrelse (#styrelse, "Beslutsunderlaget": vad
   styrelsen ska kräva av en offert → så gör GD Måleri, referenskortet
   Holmströmgruppen och Ghandi som namngiven kontaktperson), Varför blir
   "Garanti och trygghet", Så går det till blir sex steg från styrelsens
   första samtal till garantin, Reco-widgeten och partnerbandet som på
   huvudsidan, Instagram borttaget här (styrelser beslutar inte på IG).
   Varje svar i tabellen är ur huvudsidans VERIFIERAT-block eller ovan;
   kraven i vänsterkolumnen är allmänna råd (förebilderna ovan), inga
   påståenden om GD. Offertbesöket: Cal.com-händelsen "offert", hembesök
   45 min (../_gd.js bokning). Inget nytt om referenser, ledtider, priser,
   boendeinformation eller projektledare — det finns inte på sidan.

   OPTIMERING: egen titel och beskrivning, JSON-LD Service som pekar på samma
   HousePainter-entitet (@id gdmaleri.se/#business), inget betygsschema,
   noindex KVAR som på huvudsidan tills flytten till gdmaleri.se.
   =========================================================================== */

export const metadata = {
  title: 'Målare för BRF i Stockholm – trapphus och fasad | GD Måleri Sthlm AB',
  description:
    'GD Måleri Sthlm AB tar uppdrag åt bostadsrättsföreningar i Stockholm: trapphus, entréer, fasader och fönster. Rekommenderat företag på Reco tre år i rad, 4,9 av 5. Kostnadsfri offert med allt inräknat.',
  robots: { index: false, follow: false },
};

const M = '/gdmaleri/media';
const DOMAN = 'https://gdmaleri.se';

/* Service-post som pekar på samma entitet som huvudsidans HousePainter.
   Inget AggregateRating/Review (svartlistan). */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Målning för bostadsrättsföreningar: trapphus, entréer, fasader och fönster',
  serviceType: 'Måleri för bostadsrättsföreningar',
  description: 'Målning av trapphus, entréer, fasader och fönster åt bostadsrättsföreningar i Stockholm. Kostnadsfri offert där material, förarbete, städning och bortforsling ingår.',
  provider: { '@type': 'HousePainter', '@id': `${DOMAN}/#business`, name: 'GD Måleri Sthlm AB', url: `${DOMAN}/`, telephone: '+46737298889' },
  areaServed: [{ '@type': 'City', name: 'Stockholm' }, { '@type': 'AdministrativeArea', name: 'Stockholms län' }],
  audience: { '@type': 'Audience', audienceType: 'Bostadsrättsföreningar' },
};

const data = {
  namn: 'GD Måleri Sthlm AB',
  // Mallens andra sidstruktur, för en styrelse (se DemoSida.js, StyrelseMain).
  layout: 'styrelse',
  tema: {
    mork: '#0D1B2A',
    accent: '#D42E44',
    accentHover: '#B82237',
    accentText: '#B82237',
    accentLjus: '#FF8E9A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-gdmaleri.png`, ljus: `${M}/logo-gdmaleri-ljus.png`, w: 1400, h: 1315, alt: 'GD Måleri Sthlm AB', topp: 'fri' },
  kontakt: {
    tel: '073-729 88 89',
    telHref: 'tel:+46737298889',
    epost: 'info@gdmaleri.se',
    ig: 'https://www.instagram.com/gdmaleristhlm/',
    igHandle: '@gdmaleristhlm',
    fb: 'https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/',
    orgnr: '559468-2444',
    oppet: 'Vardagar 08–17',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  formular,
  // Kalendern som på huvudsidan; raden under rubriken är skriven för föreningen.
  bokning: { ...bokning, inbaddad: { ...bokning.inbaddad, lead: 'Välj en tid som passar, så kommer vi ut till föreningen och tittar på ytorna. Vardagar 08–17.' } },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '/gdmaleri/', txt: 'Startsida' }],
    extra: menyExtra('/gdmaleri/brf/'),
  },

  hero: {
    eyebrow: 'För styrelser i Stockholm',
    // Mjukt bindestreck i det långa ordet, så att rubriken ryms på 390 px utan att spilla.
    h1: ['Målning för bostadsrätts­föreningar.', 'Allt i offerten, inget i förskott.'],
    ingress: 'Trapphus, entréer, fasader och fönster, med förarbetet gjort ordentligt. Styrelsen får en kostnadsfri offert där material, förarbete, städning och bortforsling ingår, och fakturan kommer när jobbet är klart.',
    knapp: { href: '#boka', txt: 'Boka offertbesök' },
    bevis: ['4,9 av 5 på Reco', 'Rekommenderat tre år i rad', 'F-skatt och Trygg-Hansa'],
    bild: { src: `${M}/brf-hero.jpg`, w: 1440, h: 1080, alt: 'En målare på stege målar vid balkongen på ett vitt hus, sett uppifrån, ur GD Måleris egen film' },
    lager: { src: `${M}/reco-kort.png`, w: 827, h: 845, alt: 'Reco: GD Måleri Sthlm AB, rekommenderat företag tre år i rad, 4,9 av 5' },
  },

  steg: {
    eyebrow: 'Så går ett BRF-jobb till',
    rubrik: ['Fem steg, från offertbesök', 'till faktura'],
    lead: 'Styrelsen vet vad som ingår innan något börjar, och betalar när jobbet är klart.',
    lista: [
      { namn: 'Offertbesök och offert till styrelsen', text: 'Vi kommer ut och tittar på ytorna. Styrelsen får en kostnadsfri offert där material, arbete, förarbete, städning och bortforsling ingår.' },
      { namn: 'Styrelsens ja', text: 'Inget startar förrän offerten är godkänd. Dyker något oväntat upp under jobbet hör vi av oss, och inget extra görs utan ert ja.' },
      { namn: 'Tvätt och underarbete', text: 'Ute: fasadtvätt och skrapning av lös färg. Inne: spackling och slipning. Förarbetet gör vi själva.' },
      { namn: 'Målning', text: 'Allt som inte ska målas täcks med plast eller papper och golven skyddas. Vi grundmålar där det behövs och målar med färg från Flügger.' },
      { namn: 'Slutbesiktning och faktura', text: 'Vi går igenom resultatet tillsammans. Fakturan kommer efter det, utan förskottsbetalning. På jobb över 500 kvm betalas halva arbetskostnaden vid halva jobbet.' },
    ],
  },

  tjanster: {
    eyebrow: 'Tjänster för föreningen',
    rubrik: ['Trapphus, entréer, fasader', 'och lägenheter'],
    lead: 'Nu tar vi även uppdrag åt bostadsrättsföreningar. Våra privatkunder har gjort oss till Rekommenderat företag på Reco tre år i rad, med 4,9 av 5 i snitt från 45 omdömen.',
    not: 'Bilderna på trapphus, entré och fasad är illustrationsbilder. Lägenhetsbilden är från ett eget projekt. Fler egna jobb, med ort och yta, finns på vårt Instagram.',
    kort: [
      { id: 'trapphus', namn: 'Trapphus', bild: `${M}/brf-trapphus.jpg`, alt: 'Illustrationsbild: en målare bakifrån rollar en ljus trapphusvägg ovanför en grön nederdel, golvet täckt med papper', text: 'Väggar och tak i trapphuset, med spackling och slipning gjord innan färgen går på.', punkter: ['Spackling och slipning', 'Grundmålning och färdigmålning', 'Hjälp med färgval'], ritning: (<><path d="M30 104h28V82h28V60h28V38h28V16h28" /><path d="M30 104h140" /><path d="M44 78l70-56" /></>) },
      { id: 'entre', namn: 'Entréer och dörrar', bild: `${M}/brf-entre.jpg`, alt: 'Illustrationsbild: nymålade gröna entrédörrar med glasrutor i ett ljust putsat flerbostadshus', text: 'Entrén är det första de boende och besökarna ser. Dörrar, foder, väggar och tak.', punkter: ['Entrédörrar och foder', 'Väggar och tak i entrén', 'Skrapning och grundmålning'], ritning: (<><path d="M40 104V20h120v84" /><path d="M64 104V44h72v60" /><path d="M100 44v60" /><path d="M90 76h4M106 76h4" /><path d="M30 104h140" /></>) },
      { id: 'fasad', namn: 'Fasad och fönster', bild: `${M}/brf-fasad.jpg`, alt: 'Illustrationsbild: nymålad gul putsfasad på ett trevåningshus från 1950-talet, med vita fönster och björkar', text: 'Fasadtvätt, skrapning och målning av trä, puts, tegel eller plåt, och fönstren med karmar.', punkter: ['Fasadtvätt', 'Skrapning och nödvändiga lagningar', 'Fönster och karmar'], ritning: (<><path d="M30 104V24h140v80" /><path d="M24 104h152" /><path d="M50 40h20v18H50zM90 40h20v18H90zM130 40h20v18h-20zM50 72h20v18H50zM130 72h20v18h-20z" /><path d="M90 104V74h20v30" /></>) },
      { id: 'lagenhet', namn: 'Lägenheter', bild: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', text: 'Fyra lägenheter åt fastighetsbolaget Holmströmgruppen är vår referens. Målar en medlem om inne i sin lägenhet kan medlemmen få ROT.', punkter: ['Väggar och tak', 'Dörrar och snickerier', 'ROT för medlemmen, inte föreningen'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M84 60h32v24H84z" /></>) },
    ],
  },

  varfor: {
    eyebrow: 'Därför GD Måleri',
    rubrik: ['Fyra saker styrelsen', 'kan räkna med'],
    lead: 'GD Måleri är en målerifirma i Stockholm. De flesta av våra jobb har varit åt privatkunder, och föreningen får samma upplägg.',
    punkter: [
      { rubrik: 'Allt med i offerten', text: 'Material, arbete, förarbete som tvätt och skrapning, städning och bortforsling räknas in från början. Offerten är kostnadsfri.' },
      { rubrik: 'Inget extra utan ert ja', text: 'Dyker något oväntat upp hör vi av oss direkt. Vi gör inga extraarbeten utan styrelsens godkännande.' },
      { rubrik: 'Ett års garanti', text: 'Behöver något åtgärdas under det första året gör vi det utan extra kostnad. Vi har F-skatt och är försäkrade via Trygg-Hansa.' },
      { rubrik: 'Faktura när jobbet är klart', text: 'Ingen förskottsbetalning. Vi går igenom resultatet tillsammans innan fakturan kommer.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad våra privatkunder', 'säger'],
    lead: 'Omdömena är från privatkunder på Google och Reco. Det är så vi har jobbat hittills, och så jobbar vi åt föreningen.',
    // Google-betyget (4,8 av 5, 18 recensioner, 2026-10-09) och Reco-betyget (2026-10-08) som två brickor sida vid sida.
    betyg: GOOGLE_BETYG,
    recoBetyg: { varde: 4.9, antal: 45, href: 'https://www.reco.se/gd-maleri-sthlm' },
    lista: [
      GOOGLE_OMDOMEN.jenny,
      GOOGLE_OMDOMEN.daniel,
      GOOGLE_OMDOMEN.therese,
      { namn: 'Nils F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri för att åtgärda taket i vår 20-talslägenhet, som hade stora sprickor på flera ställen. Vi fick dem rekommenderade av en granne och förstår verkligen varför. … När vissa områden behövde en andra omgång, kom de snabbt tillbaka och fixade det utan problem.' },
      { namn: 'Anders F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri Sthlm AB för att måla om hall, trapphus och vardagsrum, och är mycket nöjda med resultatet. Arbetet håller riktigt hög kvalitet, utfördes med stor erfarenhet och noggrannhet, och levererades helt enligt överenskommen tidsplan. …' },
      { namn: 'Pia T', kalla: 'Verifierad kund · Reco', text: 'Väggarna i min lägenhet blev fint målade precis med den färg som jag önskade. Likaså gick det snabbt! Bra kommunikation o bästa samarbete. Tack - jag är så nöjd!' },
    ],
    not: 'Från privatkunder på Google (4,8 av 5, 18 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09; två av dem kortade där det står …',
    lank: { href: 'https://www.reco.se/gd-maleri-sthlm', txt: 'Läs alla på Reco' },
    // Levande omdömen (mallens levande.js). Utan nycklar i miljön visas listan ovan oförändrad.
    // Google: GOOGLE_PLACES_KEY i Vercel. placeId saknas än: Text Search på namnet, och cid
    // kontrolleras mot profilen (maps.google.com/?cid=13566570836618556636). Sätt placeId när det är känt.
    // Reco: hela API-URL:en från Reco (med nyckel) i GDMALERI_RECO_URL. Utan den: Reco-citaten ovan.
    levande: {
      google: { sok: 'GD Måleri Sthlm AB', cid: '13566570836618556636' },
      reco: { urlEnv: 'GDMALERI_RECO_URL' },
      max: 6,
    },
  },

  fragor: {
    eyebrow: 'Frågor från styrelser',
    rubrik: ['Det styrelsen', 'brukar fråga'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Sitter du i styrelsen?', text: 'Ring och berätta vilka ytor det gäller, så får ni en offert att ta ställning till.' },
    lista: [
      { q: 'Vad kostar det för föreningen?', a: 'Det beror på ytorna, skicket och vad som ska göras. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som tvätt och skrapning, städning och bortforsling.' },
      { q: 'Har ni jobbat åt fastighetsägare eller föreningar förut?', a: 'Ja. Vi har målat fyra lägenheter åt fastighetsbolaget Holmströmgruppen, som också är vår referens. Annars har vi mest målat åt privatkunder i villor och lägenheter, och nu tar vi även uppdrag åt bostadsrättsföreningar. Det styrelsen kan kontrollera är hur vi har jobbat: 45 omdömen på Reco med 4,9 av 5 i snitt, och Rekommenderat företag tre år i rad.' },
      { q: 'Kan föreningen få ROT-avdrag?', a: 'Nej. ROT är en skattereduktion för privatpersoner, och Skatteverket ger inget avdrag för arbete på gemensamma ytor som tak, fasader, trapphus och entréer. Räkna därför med hela arbetskostnaden i budgeten. Målar en medlem om inne i sin egen lägenhet, där medlemmen har underhållsansvaret enligt stadgarna, kan medlemmen få ROT, och då drar vi det direkt på fakturan.' },
      { q: 'När betalar föreningen?', a: 'Ni får fakturan när arbetet är klart, ingen förskottsbetalning. På stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då hör vi av oss direkt och föreslår en lösning. Vi gör inga extraarbeten utan ert godkännande.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är fullt försäkrade via Trygg-Hansa. Skulle något gå fel under arbetet är föreningen skyddad.' },
      { q: 'Hur påverkas de boende?', a: 'Allt som inte ska målas täcks med plast eller papper, och golven skyddas innan vi börjar. Städning och bortforsling ingår i offerten.' },
      { q: 'Vem är vår kontaktperson?', a: 'Samma person hela vägen: den som gör offertbesöket och offerten är er kontakt under hela jobbet, så styrelsen har ett nummer att ringa: 073-729 88 89, vardagar 08–17.' },
      { q: 'Vilken färg använder ni, och hjälper ni till med kulörer?', a: 'Vi målar med färg från Flügger. Vi hjälper gärna till med färgval och design, till exempel för ett trapphus.' },
      { q: 'Hur lång tid tar det?', a: 'Det beror på hur stora ytorna är och i vilket skick de är, så det går inte att säga utan att veta vad som ska göras. Ring och berätta om ert hus, så kan vi svara på just det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'till styrelsen'],
    lead: 'Ring, eller skriv några rader om föreningen och vilka ytor det gäller. Offerten är kostnadsfri och tar med allt, från förarbete till bortforsling.',
    checkar: ['Vi återkommer inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'Inget extra utan ert godkännande'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om föreningen',
    placeholder: 'Föreningen och var i Stockholm, vilka ytor (trapphus, fasad, fönster) och ungefärlig storlek',
    kundtyp,
    // BRF förbockat från start på den här sidan; går att byta.
    kundtypVald: 'BRF',
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Sitter du i styrelsen?',
    text: 'Berätta vilka ytor det gäller, så får föreningen en offert som inte kostar något.',
  },

  footer: {
    text: 'Målare för bostadsrättsföreningar i Stockholm: trapphus, fasader, fönster och dörrar. Kostnadsfri offert och faktura när jobbet är klart.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  // Samarbeten: rullande band sist på sidan, före footern: se _gd.js.
  samarbeten,
};

export default function GdMaleriBrf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
