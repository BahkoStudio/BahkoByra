import { ProffsmaskinerSida, KUND_METADATA } from '../page';

/* proffsmaskiner.se/ (SEO 2026-11-17). web/middleware.js skriver om kunddomänens startsida hit, så att
   metadatan kan vara statisk och hamna i <head> (index, canonical och Search Console-taggen).
   Samma innehåll som bahkobyra.se/proffsmaskiner/, plus cookielänk, samtyckesruta och GA4.
   Direkta besök på /proffsmaskiner/kund/ från andra domäner skickas av middleware till /proffsmaskiner/. */

export const metadata = KUND_METADATA;

export default function ProffsmaskinerKunddoman() {
  return <ProffsmaskinerSida kund />;
}
