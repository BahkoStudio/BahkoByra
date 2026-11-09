// Egen sitemap för brommatradgardsservice.se. Sökvägarna = SLUGS i kopiera.mjs.
const DOMAN = 'https://brommatradgardsservice.se';
const SIDOR = ['', 'snorojning', 'tradgardsskotsel-brf', 'tradgardsskotsel', 'hackklippning'];
export default function sitemap() {
  return SIDOR.map((s) => ({ url: `${DOMAN}/${s ? `${s}/` : ''}`, changeFrequency: 'monthly', priority: s ? 0.8 : 1 }));
}
