import { allaSidor } from './sitemap-sidor';
import LASTMOD from './sitemap-lastmod.json';

const BAS = 'https://www.bahkobyra.se';

/**
 * Sitemapen genereras ur sidlistan i sitemap-sidor.js (den gamla
 * public/sitemap.xml hade 3 rader och missade alla nya sidor).
 *
 * lastmod = när sidans innehåll senast ändrades, ur sitemap-lastmod.json.
 * Förut fick alla sidor byggtiden, så datumet ändrades vid varje deploy och
 * Google slutar då lita på det (SEO-disken 2026-10-27).
 *
 * UPPDATERA DATUMEN efter att en sida ändrats och committats, från web/:
 *   node scripts/sitemap-lastmod.mjs
 * och committa app/sitemap-lastmod.json. (Vercel bygger med kort git-historik,
 * därför räknas datumen lokalt och checkas in i stället för vid bygget.)
 * Sida som saknas i filen (t.ex. helt ny) får det senaste datumet i filen.
 */
const DATUM = Object.values(LASTMOD).sort();
const RESERV = DATUM[DATUM.length - 1] || '2026-10-27T00:00:00Z';

export default function sitemap() {
  return allaSidor().map(({ stig, prio }) => ({
    url: `${BAS}${stig}`,
    lastModified: LASTMOD[stig] || RESERV,
    changeFrequency: 'monthly',
    priority: prio,
  }));
}
