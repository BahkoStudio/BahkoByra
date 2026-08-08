import { TJANSTER } from './data';
import { NISCHER } from './nischer';

const BAS = 'https://www.bahkobyra.se';

/**
 * Sitemapen genereras ur sidlistorna i stället för att underhållas för hand —
 * den gamla public/sitemap.xml hade 3 rader och missade alla nya sidor.
 * Tjänster och nischer följer med automatiskt via sina datafiler.
 * Ny fristående sida? Lägg dess sökväg i STATISKA så följer den med.
 */
const STATISKA = [
  { stig: '/', prio: 1.0 },
  { stig: '/case/', prio: 0.8 },
  { stig: '/om-oss/', prio: 0.6 },
  { stig: '/kontakt/', prio: 0.7 },
  { stig: '/webbyra-jonkoping/', prio: 0.8 },
  { stig: '/vad-kostar-en-hemsida/', prio: 0.8 },
  { stig: '/foretag/gratis-granskning.html', prio: 0.9 },
  { stig: '/foretag/gratis-guide.html', prio: 0.8 },
];

export default function sitemap() {
  const nu = new Date();
  const rad = (stig, prio) => ({
    url: `${BAS}${stig}`,
    lastModified: nu,
    changeFrequency: 'monthly',
    priority: prio,
  });

  return [
    ...STATISKA.map((s) => rad(s.stig, s.prio)),
    ...TJANSTER.map((t) => rad(`/tjanster/${t.slug}/`, 0.8)),
    ...NISCHER.map((n) => rad(`/${n.slug}/`, 0.8)),
  ];
}
