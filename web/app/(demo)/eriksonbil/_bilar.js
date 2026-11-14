/* ===========================================================================
   ERIKSON BIL · kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: Peter Winqvist (Mathias 2026-11-14). Peter och en kompanjon startar bilförsäljning
   och verkstad som sidoprojekt. Firman är INTE startad, ingen hemsida, ingen verkstad än.
   Peters svar 2026-11-14: övre medelklass, 3 till 4 bilar åt gången, Sollentuna.
   Loggan: Peters egen (guldsköld med EB), omritad som SVG av Bahko Byrå 2026-11-14.

   ALLT PÅ SIDAN ÄR EXEMPEL utom namnet Erikson Bil, loggan och orten Sollentuna:
   - De tre bilarna, deras årsmodell, miltal, pris, specifikationer, utrustning och
     servicehistorik är påhittade. Varje bil bär märket "Exempelbil".
   - Månadskostnaden är ett räkneexempel med påhittade villkor (20 % kontant, 72 mån,
     6,95 % ränta, annuitet, inga avgifter).
   - Verkstadens tjänster och "från"priser och öppettiderna är påhittade. Gatuadress
     finns inte än, sidan säger bara Sollentuna.
   - Punkterna på bilbilden (punkter: x, y och etikettens höjd i procent av 16:9-bilden)
     är handsatta per bild. Byts bilden måste de sättas om.
   - Telefon och e-post finns inte än. Inget tel: och inget mailto: på sidan.
   - Formulären skickar ingenting (se _form.js).
   - Alla bilder är genererade illustrationer (GPT Image via Higgsfield, 2026-11-14).
     Bilarna liknar riktiga modeller, men är inga foton av riktiga bilar.
   =========================================================================== */

export const BAS = '/eriksonbil';
export const MEDIA = '/eriksonbil/media';

// Räkneexempel: 20 % kontant, 72 månader, 6,95 % ränta (annuitet). Påhittade villkor.
export const LANEVILLKOR = 'Räkneexempel: 20 % kontant, 72 månader och 6,95 % ränta. Villkoren är påhittade.';

export const BILAR = [
  {
    slug: 'volvo-xc60-2021',
    bild: 'bil1',
    marke: 'Volvo',
    modell: 'XC60',
    version: 'Recharge T6 AWD Inscription',
    ar: 2021,
    mil: '6 240',
    pris: '389 900',
    kontant: '77 980',
    manad: '5 310',
    farg: 'Onyxsvart metallic',
    alt: 'Svart Volvo XC60 på blank asfalt framför en mörk betongbyggnad i skymning',
    ingress: 'Laddhybriden för dig som pendlar på el i veckan och drar husvagnen till fjällen i juli. Fyrhjulsdrift, dragkrok och vinterhjul på fälg som följer med.',
    specar: [
      ['Årsmodell', '2021'],
      ['Miltal', '6 240 mil'],
      ['Drivmedel', 'Laddhybrid (bensin och el)'],
      ['Effekt', '340 hk'],
      ['Växellåda', 'Automat'],
      ['Drivning', 'Fyrhjulsdrift'],
      ['Färg', 'Onyxsvart metallic'],
      ['Kaross', 'SUV'],
      ['Ägare', '2 st'],
      ['Besiktigad', 'Oktober 2026'],
    ],
    ute: ['Dragkrok, elektrisk', 'Vinterhjul på fälg', 'Panoramatak'],
    inne: ['Adaptiv farthållare', 'Backkamera', 'Värmare med app'],
    teknik: 'Laddhybrid med fyrhjulsdrift. El i veckan, bensin när det blir långt.',
    punkter: [
      { id: 'teknik', x: 38, y: 54, etikett: 20 },
      { id: 'interior', x: 64, y: 46, etikett: 14 },
      { id: 'exterior', x: 30, y: 66, etikett: 92 },
      { id: 'historik', x: 73, y: 69, etikett: 92 },
    ],
    service: [
      ['Augusti 2026', '6 100 mil', 'Service och bromsvätska. Volvoverkstad.'],
      ['September 2025', '4 600 mil', 'Service. Volvoverkstad.'],
      ['Augusti 2024', '3 000 mil', 'Service och nya torkarblad. Volvoverkstad.'],
      ['Juli 2023', '1 500 mil', 'Första service. Volvoverkstad.'],
    ],
  },
  {
    slug: 'audi-a6-avant-2020',
    bild: 'bil2',
    marke: 'Audi',
    modell: 'A6 Avant',
    version: '40 TDI quattro S line',
    ar: 2020,
    mil: '8 910',
    pris: '279 900',
    kontant: '55 980',
    manad: '3 812',
    farg: 'Daytonagrå pärleffekt',
    alt: 'Mörkgrå Audi A6 Avant parkerad vid röda granitklippor på västkusten i solnedgång',
    ingress: 'Kombin som äter mil. Diesel, quattro och en bagagelucka som rymmer en hel IKEA-tur. 8 910 mil låter mycket tills du ser servicehäftet.',
    specar: [
      ['Årsmodell', '2020'],
      ['Miltal', '8 910 mil'],
      ['Drivmedel', 'Diesel'],
      ['Effekt', '204 hk'],
      ['Växellåda', 'Automat'],
      ['Drivning', 'Fyrhjulsdrift'],
      ['Färg', 'Daytonagrå pärleffekt'],
      ['Kaross', 'Kombi'],
      ['Ägare', '1 st'],
      ['Besiktigad', 'Augusti 2026'],
    ],
    ute: ['S line exteriör', 'Matrix LED', 'Dragkrok', 'Nya sommardäck 2026'],
    inne: ['S line interiör', 'Sätesvärme fram och bak', 'Apple CarPlay'],
    teknik: 'Diesel och quattro. Byggd för att äta mil.',
    punkter: [
      { id: 'interior', x: 34, y: 52, etikett: 20 },
      { id: 'teknik', x: 64, y: 61, etikett: 14 },
      { id: 'historik', x: 26.5, y: 70, etikett: 92 },
      { id: 'exterior', x: 66, y: 72, etikett: 92 },
    ],
    service: [
      ['Juni 2026', '8 800 mil', 'Service och bromsklossar bak. Audiverkstad.'],
      ['Maj 2025', '7 100 mil', 'Service och bromsskivor fram. Audiverkstad.'],
      ['April 2024', '5 200 mil', 'Service. Audiverkstad.'],
      ['Mars 2023', '3 300 mil', 'Service. Audiverkstad.'],
      ['Mars 2022', '1 600 mil', 'Första service. Audiverkstad.'],
    ],
  },
  {
    slug: 'bmw-330e-touring-2021',
    bild: 'bil3',
    marke: 'BMW',
    modell: '330e Touring',
    version: 'M Sport',
    ar: 2021,
    mil: '5 480',
    pris: '314 900',
    kontant: '62 980',
    manad: '4 289',
    farg: 'Alpinvit',
    alt: 'Vit BMW 330e Touring på en blöt kullerstensgata i en gammal stadskärna på natten',
    ingress: 'Den roliga kombin. Bakhjulsdrift, laddhybrid och en ratt som faktiskt känns. Vi har kört den. Den är rolig.',
    specar: [
      ['Årsmodell', '2021'],
      ['Miltal', '5 480 mil'],
      ['Drivmedel', 'Laddhybrid (bensin och el)'],
      ['Effekt', '292 hk'],
      ['Växellåda', 'Automat'],
      ['Drivning', 'Bakhjulsdrift'],
      ['Färg', 'Alpinvit'],
      ['Kaross', 'Kombi'],
      ['Ägare', '1 st'],
      ['Besiktigad', 'Juni 2026'],
    ],
    ute: ['M Sport paket', 'Parkeringssensorer runt om', 'Vinterhjul på fälg'],
    inne: ['Sportstolar med värme', 'Head up display', 'Laddkabel typ 2'],
    teknik: 'Laddhybrid med bakhjulsdrift. Tyst i stan, pigg på landsvägen.',
    punkter: [
      { id: 'teknik', x: 38, y: 57, etikett: 20 },
      { id: 'interior', x: 62, y: 52, etikett: 14 },
      { id: 'exterior', x: 31, y: 71, etikett: 92 },
      { id: 'historik', x: 67.5, y: 69, etikett: 92 },
    ],
    service: [
      ['Maj 2026', '5 300 mil', 'Service och bromsvätska. BMW-verkstad.'],
      ['April 2025', '3 900 mil', 'Service. BMW-verkstad.'],
      ['Mars 2024', '2 400 mil', 'Service. BMW-verkstad.'],
    ],
  },
];

export function hittaBil(slug) {
  return BILAR.find((b) => b.slug === slug);
}

export const TJANSTER = [
  { namn: 'Service', text: 'Olja, filter och en koll av allt annat. Du får en lista på vad vi såg.', pris: 'från 1 995 kr' },
  { namn: 'Bromsar', text: 'Klossar, skivor och bromsvätska. Gnisslar det kör du hit.', pris: 'från 1 495 kr' },
  { namn: 'Däckbyte', text: 'Skifte och balansering. Hotell för hjulen finns.', pris: 'från 495 kr' },
  { namn: 'Felsökning', text: 'Lampa i instrumentet? Vi läser av felkoden och säger vad det betyder.', pris: 'från 695 kr' },
  { namn: 'Besiktningsfel', text: 'Fick du anmärkning? Vi fixar den och du kör till ombesiktning.', pris: 'pris efter koll' },
  { namn: 'Koll före köp', text: 'Ska du köpa en bil någon annanstans? Ta hit den först.', pris: 'från 995 kr' },
];
