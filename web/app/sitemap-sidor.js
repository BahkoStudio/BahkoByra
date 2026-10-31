import { TJANSTER } from './data.js';
import { NISCHER } from './nischer.js';

/**
 * Sidorna i sitemapen. Delas av app/sitemap.js och scripts/sitemap-lastmod.mjs,
 * så att listan bara finns på ett ställe.
 * Ny fristående sida? Lägg dess sökväg i STATISKA så följer den med.
 * Tjänster och nischer följer med automatiskt via sina datafiler.
 */
export const STATISKA = [
  { stig: '/', prio: 1.0 },
  { stig: '/case/', prio: 0.8 },
  { stig: '/om-oss/', prio: 0.6 },
  { stig: '/kontakt/', prio: 0.7 },
  { stig: '/webbyra-jonkoping/', prio: 0.8 },
  { stig: '/vad-kostar-en-hemsida/', prio: 0.8 },
  { stig: '/kan-en-seo-expert-radda-min-hemsida/', prio: 0.7 },
  { stig: '/hardast-arbetande-seo-experten-i-sverige/', prio: 0.4 },
  { stig: '/basta-webbyran-i-sverige/', prio: 0.7 },
  { stig: '/hardast-arbetande-webbyran-i-sverige/', prio: 0.4 },
  { stig: '/var-lacker-jobben/', prio: 0.9 },
  { stig: '/forslag/', prio: 0.8 },
  { stig: '/sveriges-vardefullaste-hemsidor/', prio: 0.7 },
  { stig: '/foretag/gratis-granskning.html', prio: 0.9 },
  { stig: '/foretag/gratis-guide.html', prio: 0.8 },
  { stig: '/integritet/', prio: 0.2 },
];

/** Alla sidor: { stig, prio, kallor }. kallor = filerna (relativt web/) vars
 *  git-historik avgör sidans lastmod. Delad layout, header och footer räknas
 *  medvetet INTE, annars får alla sidor nytt datum så fort footern ändras. */
export function allaSidor() {
  const statisk = STATISKA.map(({ stig, prio }) => {
    if (stig === '/') {
      return { stig, prio, kallor: ['app/(sajt)/page.js', 'app/(sajt)/page.module.css', 'app/data.js'] };
    }
    if (stig.endsWith('.html')) return { stig, prio, kallor: [`public${stig}`] };
    return { stig, prio, kallor: [`app/(sajt)${stig.replace(/\/$/, '')}`] };
  });
  const tjanster = TJANSTER.map((t) => ({
    stig: `/tjanster/${t.slug}/`,
    prio: 0.8,
    kallor: ['app/(sajt)/tjanster/[slug]', 'app/data.js'],
  }));
  const nischer = NISCHER.map((n) => ({
    stig: `/${n.slug}/`,
    prio: 0.8,
    kallor: [`app/(sajt)/${n.slug}`, 'app/nischer.js'],
  }));
  return [...statisk, ...tjanster, ...nischer];
}
