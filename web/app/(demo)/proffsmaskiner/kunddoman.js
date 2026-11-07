import { headers } from 'next/headers';

// Sant när besöket kommer på kunddomänen proffsmaskiner.se eller www (se web/middleware.js).
export async function arKunddoman() {
  const host = ((await headers()).get('host') || '').toLowerCase().split(':')[0];
  return host === 'proffsmaskiner.se' || host === 'www.proffsmaskiner.se';
}
