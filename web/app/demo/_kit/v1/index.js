/**
 * Kit v1 — demomallens enda entré.
 *
 * FRYSNINGSREGELN: den dag första demon byggd på v1 skickas till ett prospekt
 * fryses den här mappen. Behöver mall nummer två ändras layoutmässigt kopieras
 * v1 till v2 och arbetet görs där; varje demo pinnar sin version i datafilen.
 * Det ger samma skydd som den gamla "kopiera hela index.html"-modellen, men
 * betalas en gång per generation i stället för en gång per lead.
 *
 * Undantag som får ändra ett fryst kit: säkerhet, tillgänglighet, trasig CTA.
 * Aldrig layout, aldrig copy-defaults, aldrig prop-namn.
 *
 * REGEL: en kit-komponent får ALDRIG ha innehåll som default. Saknas data ska
 * sektionen inte renderas. Defaults är hur en formulering smyger in i mallen
 * och gör två kunders demos beroende av varandra.
 */

export { default as Sida } from './Sida.js';
export { paletCss } from './palett.js';

export const VERSION = 'v1';
