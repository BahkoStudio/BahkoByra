import localFont from 'next/font/local';

/* Demomallens fyra typsnitt. Samma för alla demos — det är paletten och
   bilderna som gör sidan till kundens, inte ett nytt typsnitt per lead.
   Bebas Neue: firmanamnet i heron. Outfit: rubriker, meny, knappar.
   Fraunces kursiv: den bärande frasen i tvåtonsrubrikerna. Inter: brödtext. */
const hero = localFont({
  /* Bebas Neue, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/bebas-neue-normal-400.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--mall-hero',
});
const rubrik = localFont({
  /* Outfit, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '500', style: 'normal' },
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '600', style: 'normal' },
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '700', style: 'normal' },
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--mall-rubrik',
});
const kursiv = localFont({
  /* Fraunces italic, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/fraunces-italic-600.woff2', weight: '600', style: 'italic' },
  ],
  display: 'swap',
  preload: false,
  variable: '--mall-kursiv',
});
const text = localFont({
  /* Inter, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '500', style: 'normal' },
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--mall-text',
});

export const fontKlasser = `${hero.variable} ${rubrik.variable} ${kursiv.variable} ${text.variable}`;
