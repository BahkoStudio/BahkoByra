import { Kakel0413Sida, KUND_METADATA } from '../page';

/* kakel0413.se/ (SEO 2026-11-17). web/middleware.js skriver om kunddomänens startsida hit, så att
   metadatan kan vara statisk och hamna i <head> (index, canonical och Search Console-taggen).
   Samma innehåll som bahkobyra.se/kakel0413/, plus samtyckesruta och GA4.
   Direkta besök på /kakel0413/kund/ från andra domäner skickas av middleware till /kakel0413/. */

export const metadata = KUND_METADATA;

export default function Kakel0413Kunddoman() {
  return <Kakel0413Sida kund />;
}
