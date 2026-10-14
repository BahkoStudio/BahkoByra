// Egen sitemap för gdmaleri.se. Sökvägarna = SLUGS i kopiera.mjs.
const DOMAN = 'https://gdmaleri.se';
const SIDOR = ['', 'fasad-malning', 'takmalning', 'malning-invandigt', 'golv', 'brf', 'tapetsering', 'snickerier-fonster-malning', 'fasadtvatt', 'taktvatt', 'basta-malare-stockholm',
  // Ortssidorna (2026-10-14).
  'fasadmalning-bromma', 'fasadmalning-taby', 'malare-sodertalje', 'fasadmalning-lidingo', 'fasadmalning-sollentuna', 'fasadmalning-huddinge', 'fasadmalning-danderyd'];
export default function sitemap() {
  return SIDOR.map((s) => ({ url: `${DOMAN}/${s ? `${s}/` : ''}`, changeFrequency: 'monthly', priority: s ? 0.8 : 1 }));
}
