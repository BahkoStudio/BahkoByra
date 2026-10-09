import { permanentRedirect } from 'next/navigation';

/* Valora heter nu Vantooro (Instagram @vantooro, tidigare @reel_innovations).
   Demon flyttade till /vantooro/ 2026-10-09. Länken /valora/ ska aldrig brytas,
   så den här routen skickar bara vidare (308). next.config.mjs är helig och
   rördes inte. */

export const metadata = { robots: { index: false, follow: false } };

export default function ValoraFlyttad() {
  permanentRedirect('/vantooro/');
}
