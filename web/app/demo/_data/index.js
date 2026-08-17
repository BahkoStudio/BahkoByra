/**
 * Registret över demos. Att lägga till en ny demo = en datafil, en import
 * och en rad i listan. Ingenting annat.
 */

import shabifix from './shabifix.js';

export const DEMOS = [shabifix];

export const hamta = (slug) => DEMOS.find((d) => d.slug === slug);
