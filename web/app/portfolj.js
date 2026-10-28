/** Portföljen på startsidan: fem kundsajter och två demos. Ortsangivelsen är
    KUNDENS ort; byrån sitter i Huskvarna, nära Jönköping, och har kunder i hela Sverige.
    Vajje Bygg togs bort 2026-09-23: en riktig firma som tackat nej ska inte stå som portfölj.
    Korttexterna är en rad var och säger vad sidan GÖR för firman, inte hur
    den ser ut. Inga siffror som inte är verifierade — case-sidan bär den
    längre berättelsen.

    `bild` är sidans riktiga topp, 800×640, tagen med Playwright ur källkoden
    (tools/demo/sidtoppar.cjs). `kort` är kategorin på en rad för mobilen,
    `adress` det som står i kortets adressrad. */

export const PORTFOLJ = [
  {
    namn: 'Smålands Måleri',
    kategori: 'Måleri · Jönköping',
    kort: 'Måleri',
    adress: 'smamaleri.se',
    typ: 'kund',
    url: 'https://smamaleri.se/',
    bild: '/img/portfolj/smamaleri.jpg',
    rad: 'Offertformulär som funkar i mobilen och ROT-avdraget förklarat rätt.',
  },
  {
    namn: 'Bromma Trädgårdsservice',
    kategori: 'Trädgård · kund i Stockholm',
    kort: 'Trädgård',
    adress: 'brommatradgardsservice.se',
    typ: 'kund',
    url: 'https://brommatradgardsservice.se/',
    bild: '/img/portfolj/bromma.jpg',
    // Rapport 1, 30 juli 2026 (skärmbilder i 2-kunder/kunder/bromma/bevis/): plats 1 i
    // Googles Platser-flik och först i ChatGPT:s svar på 'trädgårdsservice i Stockholm'.
    rad: 'Hemsida med en egen sida för BRF-kunder.',
  },
  {
    namn: 'GD Måleri',
    kategori: 'Måleri · kund i Stockholm',
    kort: 'Måleri',
    adress: 'gdmaleri.se',
    typ: 'kund',
    url: 'https://gdmaleri.se/',
    // Bild: beskuren ur sajtens egen hero-poster (web/public/gdmaleri/media/poster-hero.jpg).
    bild: '/img/portfolj/gdmaleri.jpg',
    rad: 'Egna sidor för fasad, tak, invändigt, golv och BRF, och ROT på fakturan.',
  },
  {
    namn: 'Proffsmaskiner',
    kategori: 'Maskinuthyrning · kund i Sollentuna',
    kort: 'Maskiner',
    adress: 'proffsmaskiner.se',
    typ: 'kund',
    // Kund sedan 2026-10-28. Pekar på bahkobyra.se/proffsmaskiner/ tills DNS för proffsmaskiner.se
    // är omlagt till Vercel; byt då till 'https://proffsmaskiner.se/'.
    url: '/proffsmaskiner/',
    bild: '/img/portfolj/proffsmaskiner.jpg',
    rad: 'Rätt maskin levererad till arbetsplatsen, med offert i mobilen.',
  },
  {
    namn: "Mayka's Kitchen",
    kategori: 'Kokbok · Säljsida',
    kort: 'Kokbok',
    adress: 'maykagulo.se',
    typ: 'kund',
    url: 'https://maykagulo.se',
    bild: '/img/portfolj/maykaskitchen.jpg',
    rad: 'Säljsida för kokboken Maykas gröna kök, med boken i 3D och köpknapp.',
  },
  {
    namn: 'GRANIT Bygg',
    kategori: 'Bygg & entreprenad',
    kort: 'Bygg',
    adress: 'bahkobyra.se/cloud/bygg',
    typ: 'demo',
    url: '/cloud/bygg/',
    bild: '/img/portfolj/granit.jpg',
    rad: 'Från förfallet hus till drömhus medan man bläddrar ner.',
  },
  {
    namn: 'Asmar Relining',
    kategori: 'Relining & VVS',
    kort: 'VVS',
    adress: 'bahkobyra.se/cloud/asmar',
    typ: 'demo',
    url: '/cloud/asmar/',
    bild: '/img/portfolj/asmar.jpg',
    rad: 'Ett rör inifrån, före och efter, utan att gräva.',
  },
];
