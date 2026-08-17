'use client';

import { usePathname } from 'next/navigation';

/**
 * Skal — avgör om sidan ska bära Bahkos krom eller inte.
 *
 * En kunddemo under /demo/ är KUNDENS sajt, inte Bahkos. Den ska inte ha
 * Bahkos header, footer, popup, mätning eller Organization-schema — ett
 * prospekt som ser Bahkos meny på sin egen demo förstår inte vad det är,
 * och Googles strukturerade data skulle beskriva fel företag.
 *
 * Server-komponenter (Footer, schema-taggen) skickas in som element-props
 * i stället för att importeras här: då slipper hela kromet bli klientkod.
 *
 * usePathname är känd redan vid prerendering, så demosidor renderas utan krom
 * från första bildrutan — ingen blink.
 */
export default function Skal({ header, footer, popup, matning, schema, children }) {
  const arDemo = (usePathname() || '').startsWith('/demo/');

  if (arDemo) return <main id="innehall">{children}</main>;

  return (
    <>
      {schema}
      {header}
      <main id="innehall">{children}</main>
      {footer}
      {popup}
      {matning}
    </>
  );
}
