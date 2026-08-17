#!/usr/bin/env node
/**
 * bilder.mjs — skärmbilder av en demo (eller vilken URL som helst).
 *
 *   node tools/demo/bilder.mjs --demo shabifix
 *   node tools/demo/bilder.mjs --demo shabifix --enhet mobil --shot galleri
 *   node tools/demo/bilder.mjs --url https://exempel.se/ --namn forlaga-1
 *
 * Används av kolla.mjs, facit.mjs och av blindtestet mot förlagan.
 * Bilderna hamnar i .tmp/demo-qa/<namn>/<enhet>-<shot>.png
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { startaBrowser, ENHETER } from './webb.mjs';
import { kordDirekt } from './png.mjs';

export const UTBAS = '.tmp/demo-qa';

/**
 * Sektionerna som fotograferas. Pekar på data-qa-attribut, inte CSS-klasser:
 * klassnamn ändras vid varje omdesign, data-qa är ett kontrakt.
 * Faller tillbaka på gamla HTML-demornas id:n så grinden kan köras mot dem också.
 */
export const SHOTS = {
  hel: null, // hela sidan
  hero: ['[data-qa=hero]', '.hero-standalone'],
  projekt: ['[data-qa=projekt]', '.section-projects'],
  galleri: ['[data-qa=galleri]', '#galleri'],
  kontakt: ['[data-qa=kontakt]', '#kontakt'],
};

export function argv(args = process.argv.slice(2)) {
  const ut = { _: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const nyckel = args[i].slice(2);
      const varde = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
      ut[nyckel] = varde;
    } else ut._.push(args[i]);
  }
  return ut;
}

/** Var ligger demon? Ny Next-demo, gammal HTML-demo, eller rå URL. */
export function demoUrl(namn, bas = process.env.DEMO_BAS || 'http://localhost:4321') {
  if (existsSync(join('web/app/demo/_data', `${namn}.js`))) return `${bas}/demo/${namn}/`;
  if (existsSync(join('web/public/cloud', namn, 'index.html'))) return `${bas}/cloud/${namn}/`;
  return null;
}

/** Första selektorn som faktiskt finns på sidan. */
async function forstaTraffen(flik, kandidater) {
  for (const s of [].concat(kandidater)) {
    if (await flik.boxFor(s)) return s;
  }
  return null;
}

/**
 * Fotografera en sida.
 * @returns {Promise<Array<{shot:string, enhet:string, fil:string|null, saknas?:boolean}>>}
 */
export async function fotografera({
  url, namn, enheter = ['dator', 'mobil'], shots = Object.keys(SHOTS),
  browser = null, utkatalog = null, skalaHel = 0.5,
}) {
  const egenBrowser = !browser;
  const b = browser || await startaBrowser();
  const ut = utkatalog || join(UTBAS, namn);
  mkdirSync(ut, { recursive: true });
  const resultat = [];

  try {
    for (const enhet of enheter) {
      // Färsk flik per enhet; shots inom samma enhet delar sida men fotograferas
      // efter att sidan stått still — det som läckte i Claude-of-Duty var
      // partikelålder och exponering över tid, vilket vi eliminerat med frysta
      // klockor och pausade videor.
      const flik = await b.nyFlik({ enhet });
      try {
        await flik.gaTill(url);
        await flik.frysVideor();

        for (const shot of shots) {
          const kandidater = SHOTS[shot];
          const filnamn = join(ut, `${enhet}-${shot}.png`);
          try {
            if (kandidater === null) {
              writeFileSync(filnamn, await flik.skarmbild({ helSida: true, skala: skalaHel }));
            } else {
              const sel = await forstaTraffen(flik, kandidater);
              if (!sel) { resultat.push({ shot, enhet, fil: null, saknas: true }); continue; }
              writeFileSync(filnamn, await flik.skarmbild({ selektor: sel }));
            }
            resultat.push({ shot, enhet, fil: filnamn });
          } catch (e) {
            resultat.push({ shot, enhet, fil: null, fel: e.message });
          }
        }
      } finally {
        await flik.stang();
      }
    }
  } finally {
    if (egenBrowser) await b.stang();
  }
  return resultat;
}

/* --------------------------------------------------------------------------- CLI */

if (kordDirekt(import.meta.url)) {
  const a = argv();
  const namn = a.namn || a.demo;
  const url = a.url || (a.demo ? demoUrl(a.demo) : null);

  if (!url || !namn) {
    console.log(`Användning:
  bilder.mjs --demo <kund> [--enhet dator|mobil] [--shot <namn>]
  bilder.mjs --url <adress> --namn <namn> [--enhet mobil]

Shots: ${Object.keys(SHOTS).join(', ')}
Bas-URL styrs med DEMO_BAS (standard http://localhost:4321).`);
    process.exit(2);
  }

  const enheter = a.enhet ? [a.enhet] : ['dator', 'mobil'];
  const shots = a.shot ? [a.shot] : Object.keys(SHOTS);
  console.log(`Fotograferar ${namn} — ${url}`);

  const r = await fotografera({ url, namn, enheter, shots });
  for (const x of r) {
    if (x.fil) console.log(`  ${x.enhet.padEnd(6)} ${x.shot.padEnd(9)} ${x.fil}`);
    else if (x.saknas) console.log(`  ${x.enhet.padEnd(6)} ${x.shot.padEnd(9)} — sektionen finns inte på sidan`);
    else console.log(`  ${x.enhet.padEnd(6)} ${x.shot.padEnd(9)} FEL: ${x.fel}`);
  }
}
