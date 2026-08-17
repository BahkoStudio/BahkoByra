#!/usr/bin/env node
/**
 * hopp.mjs — hittar layouthopp och trasiga bildlådor.
 *
 *   node tools/demo/hopp.mjs --demo shabifix
 *   node tools/demo/hopp.mjs --demo shabifix --enhet mobil
 *   node tools/demo/hopp.mjs --alla-cloud          (validera grinden mot befintliga demos)
 *
 * Två lager, i den ordningen:
 *
 *  1. LÅDKOLLEN (statisk) — varje img/video jämförs mot sin deklarerade
 *     aspect-ratio, och lazy-bilder utan styrd låda flaggas. Fångar
 *     galleribuggen på nolltid, utan en enda skärmbild.
 *
 *  2. LAYOUT-SHIFT (dynamisk) — sidan körs under Slow 4G + CPU-broms, scrollas
 *     igenom, och varje förskjutning mäts med PerformanceObserver.
 *     `overflow-anchor:none` gör Chrome lika ärlig som iOS, som saknar
 *     scroll-förankring — det är därför hoppet syns på iPhone men inte i datorn.
 *
 * Rapporterat mått är VÄRSTA ENSKILDA hoppet, inte summan: ett medelvärde
 * döljer precis det användaren känner.
 */

import { startaBrowser } from './webb.mjs';
import { argv, demoUrl } from './bilder.mjs';
import { kordDirekt } from './png.mjs';

/** Hopp ≥ detta utan användarinput = stoppfel. Strängare än Googles 0,1. */
export const HOPPGRANS = 0.010;

/* --------------------------------------------------------------- 1. lådkollen */

const LADKOLL_KALLA = `(() => {
  const kort = (el) => {
    const t = el.tagName.toLowerCase();
    const src = (el.currentSrc || el.src || '').split('/').pop().split('?')[0];
    const kl = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
    return t + (src ? ' ' + src : kl);
  };
  const tolkaRatio = (v) => {
    if (!v || v === 'auto') return null;
    const m = String(v).match(/^\\s*([\\d.]+)\\s*(?:\\/\\s*([\\d.]+))?/);
    if (!m) return null;
    const a = parseFloat(m[1]), b = m[2] ? parseFloat(m[2]) : 1;
    return b ? a / b : null;
  };

  const fel = [];
  for (const el of document.querySelectorAll('img, video, iframe')) {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 2 || s.display === 'none') continue;
    const ar = tolkaRatio(s.aspectRatio);

    // (a) deklarerad ratio som inte hålls => attributhöjden har vunnit
    if (ar) {
      const vantad = r.width / ar;
      if (vantad > 0 && Math.abs(r.height - vantad) / vantad > 0.02) {
        fel.push({
          typ: 'ratio-ignorerad', el: kort(el),
          renderad: Math.round(r.height), vantad: Math.round(vantad),
          orsak: el.hasAttribute('height') && s.height !== 'auto'
            ? 'height-attributet (' + el.getAttribute('height') + ') vinner över aspect-ratio; CSS saknar height:auto'
            : 'okänd orsak — kontrollera CSS-höjden (' + s.height + ')',
        });
      }
    }

    // (b) lazy-bild utan styrd låda => den KOMMER hoppa när den laddar.
    // OBS: kolla ALDRIG getComputedStyle().height mot 'auto' — den returnerar
    // alltid den använda höjden i pixlar för ett renderat element, så villkoret
    // blir aldrig sant (buggen som gjorde att grinden missade en planterad bugg
    // 2026-08-17). Styrd låda = aspect-ratio ELLER ett height-attribut.
    if (el.loading === 'lazy' && !ar && !el.hasAttribute('height')) {
      fel.push({
        typ: 'lazy-utan-lada', el: kort(el),
        orsak: 'lazy-laddad utan aspect-ratio och utan height-attribut: lådan saknar höjd tills bilden kommit',
      });
    }
  }
  return fel;
})()`;

/* ------------------------------------------------- 2. layout-shift-observatören */

const SHIFT_OBSERVATOR = `
  window.__hopp = [];
  new PerformanceObserver((lista) => {
    for (const e of lista.getEntries()) {
      if (e.hadRecentInput) continue;   // användarens egen scroll räknas inte
      window.__hopp.push({
        varde: e.value,
        tid: Math.round(e.startTime),
        kallor: (e.sources || []).slice(0, 3).map((s) => ({
          namn: s.node ? (() => {
            const el = s.node.nodeType === 1 ? s.node : s.node.parentElement;
            if (!el) return 'okänd';
            const src = (el.currentSrc || el.src || '').split('/').pop().split('?')[0];
            return el.tagName.toLowerCase() + (src ? ' ' + src
              : el.id ? '#' + el.id
              : el.className && typeof el.className === 'string'
                ? '.' + el.className.trim().split(/\\s+/)[0] : '');
          })() : 'okänd',
          fore: s.previousRect ? Math.round(s.previousRect.y) : null,
          efter: s.currentRect ? Math.round(s.currentRect.y) : null,
        })),
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });`;

/* -------------------------------------------- 3. iOS-viewporttestet (vh-fällan) */

/**
 * På iPhone krymper adressfältet när man scrollar, och viewporthöjden växer.
 * Varje `vh`-baserad höjd räknas då om. Har sidan en hög vh-container (t.ex.
 * `#scroll-container{height:620vh}`) växer dokumentet med hundratals pixlar mitt
 * i scrollningen — och sitter sektionerna dessutom på JS-uträknade `top`-värden
 * flyttar de sig allihop. Det syns som ett ryck, och det syns BARA på telefon.
 *
 * Chrome rapporterar inte detta som layout-shift (viewportändringar undantas),
 * så det måste mätas direkt: jämför dokumenthöjden vid två viewporthöjder.
 *
 * Verifierat 2026-08-17 mot /cloud/shabifix/: 11526 → 12044 px (+518) när
 * viewporten gick 844 → 916. Det är hero 100vh (+72) plus 620vh-containern (+447).
 *
 * `svh`/`dvh` och innehållsdrivna höjder ger ~0 skillnad och passerar.
 */
export async function kollaViewportfallan(flik, { bas = 844, vaxt = 916 } = {}) {
  const mat = async (h) => {
    await flik.s('Emulation.setDeviceMetricsOverride', {
      width: 390, height: h, deviceScaleFactor: 2, mobile: true,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    });
    await flik.utvardera('new Promise(r => setTimeout(r, 500))');
    return flik.utvardera('document.documentElement.scrollHeight');
  };
  const h1 = await mat(bas);
  const h2 = await mat(vaxt);
  await mat(bas); // återställ

  const viewportDelta = vaxt - bas;
  const dokDelta = h2 - h1;
  // Ren innehållshöjd ändras inte alls; ett hero i vh ändras med exakt deltat.
  // Mer än dubbla deltat betyder att stora vh-block räknas om mitt i scrollen.
  return {
    fore: h1, efter: h2, delta: dokDelta, viewportDelta,
    fel: dokDelta > viewportDelta * 2,
  };
}

/* --------------------------------------------------------------------- körning */

/**
 * Kör båda lagren mot en URL.
 * @returns {Promise<{lada:Array, hopp:Array, varsta:number, summa:number, enhet:string}>}
 */
export async function kollaHopp({ url, enhet = 'mobil', browser = null, strypt = true }) {
  const egen = !browser;
  const b = browser || await startaBrowser();
  try {
    const flik = await b.nyFlik({
      enhet,
      natverk: strypt ? '4g' : null,
      cpuBroms: strypt ? 4 : 1,
      iosLage: true,
    });
    try {
      await flik.forInjicera(SHIFT_OBSERVATOR);

      // Vänta INTE in bilderna: hoppet sker medan de laddar. Vi scrollar
      // igenom sidan direkt efter load, precis som en besökare gör.
      await flik.gaTill(url, { vantaBilder: false });
      await flik.frysVideor();
      await flik.scrollaIgenom(60, 60);

      // Först NU står sidan still — då är lådkollen meningsfull.
      const lada = await flik.utvardera(LADKOLL_KALLA);
      const hopp = await flik.utvardera('window.__hopp || []');
      const viewport = enhet === 'mobil' ? await kollaViewportfallan(flik) : null;

      hopp.sort((a, x) => x.varde - a.varde);
      return {
        enhet, lada, hopp, viewport,
        varsta: hopp.length ? hopp[0].varde : 0,
        summa: hopp.reduce((s, h) => s + h.varde, 0),
      };
    } finally {
      await flik.stang();
    }
  } finally {
    if (egen) await b.stang();
  }
}

export function skrivRapport(namn, r) {
  const rader = [];
  rader.push(`${namn} · ${r.enhet}`);

  if (r.lada.length) {
    rader.push(`  LÅDOR: ${r.lada.length} fel`);
    for (const f of r.lada.slice(0, 6)) {
      rader.push(`    ${f.el}`);
      if (f.typ === 'ratio-ignorerad') {
        rader.push(`      renderas ${f.renderad} px, borde vara ${f.vantad} px`);
      }
      rader.push(`      ${f.orsak}`);
    }
  } else {
    rader.push('  LÅDOR: ok');
  }

  const stopp = r.varsta >= HOPPGRANS;
  rader.push(`  HOPP: värsta ${r.varsta.toFixed(4)} (gräns ${HOPPGRANS}) ${stopp ? '— STOPP' : '— ok'}`);
  for (const h of r.hopp.slice(0, 3)) {
    if (h.varde < 0.001) break;
    const k = h.kallor[0];
    const flytt = k && k.fore !== null && k.efter !== null ? `, flyttade ${Math.abs(k.efter - k.fore)} px` : '';
    rader.push(`    ${h.varde.toFixed(4)} vid ${(h.tid / 1000).toFixed(2)} s — ${k ? k.namn : 'okänd'}${flytt}`);
  }

  if (r.viewport) {
    const v = r.viewport;
    rader.push(`  iOS-VIEWPORT: dokumentet ${v.fore} → ${v.efter} px (+${v.delta}) när adressfältet krymper `
      + `${v.fel ? '— STOPP' : '— ok'}`);
    if (v.fel) {
      rader.push('    Sidan bygger höjd på vh-enheter. På iPhone växer viewporten mitt i');
      rader.push('    scrollningen, allt räknas om och innehållet rycker till.');
    }
  }
  return rader.join('\n');
}

/* --------------------------------------------------------------------------- CLI */

if (kordDirekt(import.meta.url)) {
  const a = argv();
  const bas = process.env.DEMO_BAS || 'https://www.bahkobyra.se';

  if (a['alla-cloud']) {
    // Validering av grinden: den ska hitta kända fel i befintliga demos.
    // Hittar den ingenting är grinden trasig, inte demos perfekta.
    const { readdirSync, existsSync } = await import('node:fs');
    const demos = readdirSync('web/public/cloud')
      .filter((d) => existsSync(`web/public/cloud/${d}/index.html`))
      .filter((d) => !['prismotor', 'sop-ringa'].includes(d)); // inte demos
    const b = await startaBrowser();
    let fel = 0;
    try {
      for (const d of demos) {
        try {
          const r = await kollaHopp({ url: `${bas}/cloud/${d}/`, enhet: 'mobil', browser: b });
          console.log(skrivRapport(d, r));
          if (r.lada.length || r.varsta >= HOPPGRANS || r.viewport?.fel) fel++;
        } catch (e) {
          console.log(`${d} · FEL: ${e.message}`);
        }
        console.log('');
      }
    } finally { await b.stang(); }
    console.log(`${fel} av ${demos.length} demos har fel.`);
    process.exit(0);
  }

  const namn = a.demo;
  const url = a.url || (namn ? demoUrl(namn, bas) : null);
  if (!url) {
    console.log('Användning: hopp.mjs --demo <kund> [--enhet mobil|dator] | --alla-cloud');
    process.exit(2);
  }
  const enheter = a.enhet ? [a.enhet] : ['mobil'];
  const b = await startaBrowser();
  let stopp = false;
  try {
    for (const e of enheter) {
      const r = await kollaHopp({ url, enhet: e, browser: b });
      console.log(skrivRapport(namn || url, r));
      if (r.lada.length || r.varsta >= HOPPGRANS || r.viewport?.fel) stopp = true;
    }
  } finally { await b.stang(); }
  process.exit(stopp ? 1 : 0);
}
