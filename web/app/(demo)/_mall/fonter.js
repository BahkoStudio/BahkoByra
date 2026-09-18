import { Bebas_Neue, Outfit, Fraunces, Inter } from 'next/font/google';

/* Demomallens fyra typsnitt. Samma för alla demos — det är paletten och
   bilderna som gör sidan till kundens, inte ett nytt typsnitt per lead.
   Bebas Neue: firmanamnet i heron. Outfit: rubriker, meny, knappar.
   Fraunces kursiv: den bärande frasen i tvåtonsrubrikerna. Inter: brödtext. */
const hero = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--mall-hero' });
const rubrik = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--mall-rubrik' });
const kursiv = Fraunces({ subsets: ['latin'], weight: ['600'], style: ['italic'], display: 'swap', preload: false, variable: '--mall-kursiv' });
const text = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--mall-text' });

export const fontKlasser = `${hero.variable} ${rubrik.variable} ${kursiv.variable} ${text.variable}`;
