import { notFound } from 'next/navigation';

/* Catch-all för okända adresser. Sajten har två rotlayouter (route-grupperna
   (sajt) och (demo)) och därmed ingen global not-found — den här routen fångar
   allt som inte matchat en riktig sida och skickar det till (sajt)/not-found.js,
   så 404:an får header, footer och maskoten i stället för Nexts tomma standardsida.
   Statiska filer i public/ (cloud/, brand/, img/) serveras före routing och
   påverkas inte. */
export default function Saknas() {
  notFound();
}
