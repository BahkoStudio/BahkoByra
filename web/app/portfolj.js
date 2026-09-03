/** Portföljen på startsidan: tre kundsajter i drift och tre demos.
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
    rad: 'Offertflöde som funkar i mobilen och ROT-avdraget förklarat rätt.',
  },
  {
    namn: 'Bromma Trädgårdsservice',
    kategori: 'Trädgård · Stockholm',
    kort: 'Trädgård',
    adress: 'brommatradgardsservice.se',
    typ: 'kund',
    url: 'https://brommatradgardsservice.se/',
    bild: '/img/portfolj/bromma.jpg',
    // Verifierat 2026-08-15 (skärmdumpar i content/kundarbete/bromma/bevis/): plats 1 i
    // Googles lokala resultat och först i ChatGPT:s svar på 'trädgårdsservice i Stockholm'.
    rad: 'Plats 1 på Google och först i ChatGPT:s svar. Inom två veckor.',
  },
  {
    namn: "Mayka's Kitchen",
    kategori: 'Restaurang & catering',
    kort: 'Restaurang',
    adress: 'maykaskitchen.se',
    typ: 'kund',
    url: 'https://maykaskitchen.se',
    bild: '/img/portfolj/maykaskitchen.jpg',
    rad: 'Meny, video och recept på två språk som får gästerna att komma tillbaka.',
  },
  {
    namn: 'Vajje Bygg',
    kategori: 'Nybyggnation & renovering',
    kort: 'Bygg',
    adress: 'bahkobyra.se/cloud/vajjebygg',
    typ: 'demo',
    url: '/cloud/vajjebygg/',
    bild: '/img/portfolj/vajjebygg.jpg',
    rad: 'Så här ser ett förslag ut när det landar hos er.',
  },
  {
    namn: 'GRANIT Bygg',
    kategori: 'Bygg & entreprenad',
    kort: 'Bygg',
    adress: 'bahkobyra.se/cloud/bygg',
    typ: 'demo',
    url: '/cloud/bygg/',
    bild: '/img/portfolj/granit.jpg',
    rad: 'Förvandlingen från förfallet hus till drömhus, i scroll.',
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
