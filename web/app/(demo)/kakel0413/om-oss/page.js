import { permanentRedirect } from 'next/navigation';
import { arKunddoman } from '../kunddoman';

/* Kakel 0413 AB: Om oss borttagen (Mathias 2026-11-10, "Allt detta skulle bort").
   Gamla länkar ska inte ge 404, så sidan skickar vidare permanent (308) till startsidan:
   kakel0413.se/om-oss/ → kakel0413.se/ och bahkobyra.se/kakel0413/om-oss/ → /kakel0413/. */

export const metadata = { robots: { index: false, follow: true } };

export default async function OmOss() {
  permanentRedirect((await arKunddoman()) ? '/' : '/kakel0413/');
}
