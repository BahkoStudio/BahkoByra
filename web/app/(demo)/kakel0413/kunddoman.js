import { headers } from 'next/headers';

// Sant när besöket kommer på kunddomänen kakel0413.se eller www (se web/middleware.js).
export async function arKunddoman() {
  const host = ((await headers()).get('host') || '').toLowerCase().split(':')[0];
  return host === 'kakel0413.se' || host === 'www.kakel0413.se';
}
