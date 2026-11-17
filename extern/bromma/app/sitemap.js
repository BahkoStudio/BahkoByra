// Egen sitemap för brommatradgardsservice.se. Sökvägarna = SLUGS i kopiera.mjs.
const DOMAN = 'https://brommatradgardsservice.se';
const SIDOR = ['', 'snorojning', 'tradgardsskotsel-brf', 'tradgardsskotsel', 'hackklippning'];
// lastmod = när sidornas metadata och struktur senast ändrades (SEO-uppdatering 2026-11-17).
const LASTMOD = new Date('2026-11-17');
export default function sitemap() {
  return SIDOR.map((s) => ({ url: `${DOMAN}/${s ? `${s}/` : ''}`, lastModified: LASTMOD, changeFrequency: 'monthly', priority: s ? 0.8 : 1 }));
}
