/**
 * palett.js — kundens färger, satta på Bahkos EGNA tokennamn.
 *
 * Nyckelbeslutet i hela kitet: vi inför inte ett eget namnrum (--d-accent) utan
 * skriver över --em, --bas, --text på demons rotelement. Då gäller allt som
 * globals.css redan definierar — .btn-primar, .mork, .eyebrow, :focus-visible —
 * utan att byggas om per demo.
 *
 * Viktigast: knappregeln blir strukturellt bevarad. .btn-primar är
 * "accentyta + basfärgad text", så varje demo får automatiskt mörk text på
 * accent i stället för vit (vit på smaragd är 2,54:1 och underkänt i WCAG).
 * Ingen behöver minnas regeln, och validatorn räknar kontrasten innan bygget.
 *
 * Custom properties ärvs nedåt, aldrig uppåt: en demopalett kan omöjligt läcka
 * ut på marknadssajten.
 */

export function paletCss(demo) {
  const p = demo.varumarke.palett;
  const r = demo.varumarke.radie || '10px';
  return `
[data-demo="${demo.slug}"]{
  --bas:${p.bas}; --sektion:${p.sektion}; --yta:${p.yta};
  --em:${p.accent}; --em-lt:${p.accentLjus}; --em-deep:${p.accentMork};
  --text:${p.text}; --text-lag:${p.textLag}; --dim:${p.textLag};
  --linje-mork:${p.linje}; --linje:${p.linje};
  --r:${r}; --r-lg:${r};
  --d-grad:linear-gradient(100deg,${p.accentLjus} 0%,${p.accent} 45%,${p.accentMork} 100%);
  /* GSAP:s power2.out = easeOutCubic. Samma känsla som gamla mallen, utan bibliotek. */
  --d-ease:cubic-bezier(.215,.61,.355,1);
  background:${p.bas}; color:${p.text};
}
/* Gummibandsscrollen på iOS visar ytan bakom sidan. Utan detta blinkar Bahkos
   ljusa bakgrund i över- och underkant på en mörk demo. */
html:has([data-demo="${demo.slug}"]), body:has([data-demo="${demo.slug}"]){
  background:${p.bas};
}`;
}
