/** Portföljen på startsidan: tre kundsajter i drift och tre demos.
    Korttexterna är en rad var och säger vad sidan GÖR för firman, inte hur
    den ser ut. Inga siffror som inte är verifierade — case-sidan bär den
    längre berättelsen. */

export const PORTFOLJ = [
  {
    namn: 'Smålands Måleri',
    kategori: 'Måleri · Jönköping',
    typ: 'kund',
    url: 'https://smamaleri.se/',
    bild: '/img/demo-smalands-maleri.webp',
    rad: 'Offertflöde som funkar i mobilen och ROT-avdraget förklarat rätt.',
  },
  {
    namn: 'Bromma Trädgårdsservice',
    kategori: 'Trädgård · Stockholm',
    typ: 'kund',
    url: 'https://brommatradgardsservice.se/',
    bild: '/img/demo-bromma-tradgard.webp',
    // Verifierat 2026-08-15 (skärmdumpar i content/kundarbete/bromma/bevis/): plats 1 i
    // Googles lokala resultat och först i ChatGPT:s svar på 'trädgårdsservice i Stockholm'.
    rad: 'Plats 1 på Google och först i ChatGPT:s svar. Inom två veckor.',
  },
  {
    namn: "Mayka's Kitchen",
    kategori: 'Restaurang & catering',
    typ: 'kund',
    url: 'https://maykaskitchen.se',
    bild: '/img/maykaskitchen.jpg',
    rad: 'Meny, video och recept på två språk som får gästerna att komma tillbaka.',
  },
  {
    namn: 'Vajje Bygg',
    kategori: 'Nybyggnation & renovering',
    typ: 'demo',
    url: '/cloud/vajjebygg/',
    bild: '/img/demo-vajjebygg.webp',
    rad: 'Så här ser ett förslag ut när det landar hos er.',
  },
  {
    namn: 'GRANIT Bygg',
    kategori: 'Bygg & entreprenad',
    typ: 'demo',
    url: '/cloud/bygg/',
    bild: '/img/demo-granit-bygg.webp',
    rad: 'Förvandlingen från förfallet hus till drömhus, i scroll.',
  },
  {
    namn: 'Asmar Relining',
    kategori: 'Relining & VVS',
    typ: 'demo',
    url: '/cloud/asmar/',
    bild: '/img/demo-asmar-relining.webp',
    rad: 'Ett rör inifrån, före och efter, utan att gräva.',
  },
];
