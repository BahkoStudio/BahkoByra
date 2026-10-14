// Egen sitemap för gdmaleri.se. Sökvägarna = SLUGS i kopiera.mjs.
const DOMAN = 'https://gdmaleri.se';
const SIDOR = ['', 'fasad-malning', 'takmalning', 'malning-invandigt', 'golv', 'brf', 'tapetsering', 'snickerier-fonster-malning', 'fasadtvatt', 'taktvatt', 'basta-malare-stockholm'];
export default function sitemap() {
  return SIDOR.map((s) => ({ url: `${DOMAN}/${s ? `${s}/` : ''}`, changeFrequency: 'monthly', priority: s ? 0.8 : 1 }));
}
