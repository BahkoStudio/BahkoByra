#!/usr/bin/env node
/**
 * validera.mjs — allt som går att kontrollera utan att starta en browser.
 *
 *   node tools/demo/validera.mjs            alla demos
 *   node tools/demo/validera.mjs shabifix   en demo
 *
 * Kör den FÖRE push. Bygget självt är avsiktligt förlåtande (en trasig demo
 * filtreras bort i generateStaticParams så att bahkobyra.se fortsätter
 * uppdateras) — det här verktyget är den högljudda halvan av det kontraktet:
 * fail loud här, fail soft i bygget.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { validera, arPl, text } from '../../web/app/demo/_data/_schema.js';

/**
 * Sha256 för web/next.config.mjs. Filen bär ALLA 20 statiska demos genom en
 * enda rewrite-rad plus host-routingen för bahkobyra.cloud. Larmet ska gå före
 * pushen, inte efter incidenten. Ändras filen med avsikt: uppdatera värdet här
 * i samma commit, så att ändringen blir ett aktivt beslut.
 */
const NEXT_CONFIG_SHA = '6a2734a6a00876a98d4312135a5417f2a8768511dcc0a164a5bd8ebb5d5f0538';

const DATA = 'web/app/demo/_data';
const KIT = 'web/app/demo/_kit';
const MEDIA = 'web/public/demo';

const fel = [];
const varn = [];

/* ------------------------------------------------- kontroller på repo-nivå */

function heligaFiler() {
  const sokvag = 'web/next.config.mjs';
  if (!existsSync(sokvag)) { fel.push(`${sokvag} SAKNAS — den bär alla /cloud-demos`); return; }
  const sha = createHash('sha256').update(readFileSync(sokvag)).digest('hex');
  if (sha !== NEXT_CONFIG_SHA) {
    fel.push(`web/next.config.mjs har ändrats (sha ${sha.slice(0, 12)}…).\n`
      + '     Den filen routar alla 20 statiska demos och bahkobyra.cloud.\n'
      + '     Är ändringen avsiktlig: uppdatera NEXT_CONFIG_SHA i detta skript i samma commit.');
  }
}

function skuggningsfallan() {
  // En fil på web/public/demo/<kund>/index.html serveras FÖRE React-sidan och
  // skuggar den tyst. Next kör public/ i steg 4, dynamiska routes i steg 6.
  if (!existsSync(MEDIA)) return;
  for (const d of readdirSync(MEDIA)) {
    if (existsSync(join(MEDIA, d, 'index.html'))) {
      fel.push(`${MEDIA}/${d}/index.html skuggar React-sidan /demo/${d}/ — ta bort filen`);
    }
  }
  if (existsSync('web/app/cloud')) {
    fel.push('web/app/cloud/ finns — den kolliderar med rewriten för de statiska demos');
  }
}

/* ------------------------------------------------------ kontroller per demo */

async function kollaDemo(slug) {
  const filsokvag = join(DATA, `${slug}.js`);
  if (!existsSync(filsokvag)) { fel.push(`${filsokvag} finns inte`); return; }

  let demo;
  try {
    demo = (await import(pathToFileURL(filsokvag).href)).default;
  } catch (e) {
    fel.push(`${slug}: datafilen går inte att läsa — ${e.message}`);
    return;
  }

  const r = validera(demo);
  r.fel.forEach((f) => fel.push(`${slug}: ${f}`));
  r.varningar.forEach((v) => varn.push(`${slug}: ${v}`));

  if (demo.slug !== slug) fel.push(`${slug}: slug i filen är "${demo.slug}" men filen heter ${slug}.js`);

  // Kit-versionen måste finnas. Ett fryst kit skyddar levererade demos från
  // ändringar som görs för en ny lead.
  if (demo.kit && !existsSync(join(KIT, demo.kit))) {
    fel.push(`${slug}: kit "${demo.kit}" finns inte i ${KIT}/`);
  }

  // Alla mediasökvägar ska finnas på disk. En trasig bildlänk i en demo som
  // skickas till ett prospekt är värre än ett byggfel.
  const media = [];
  const samla = (o) => {
    for (const v of Object.values(o || {})) {
      const s = arPl(v) ? text(v) : v;
      if (typeof s === 'string' && s.startsWith('/demo/')) media.push(s);
      else if (Array.isArray(s)) s.forEach((x) => (typeof x === 'object' ? samla(x) : null));
      else if (s && typeof s === 'object') samla(s);
    }
  };
  samla(demo);
  for (const m of media) {
    const p = join('web/public', m);
    if (!existsSync(p)) fel.push(`${slug}: ${m} finns inte på disk`);
    else if (statSync(p).size > 1024 * 1024 && /\.(jpg|jpeg|png|webp)$/i.test(m)) {
      varn.push(`${slug}: ${m} är ${(statSync(p).size / 1048576).toFixed(1)} MB — bilder bör vara under 300 kB`);
    }
  }

  // Före/efter ska ligga först i galleriet: den jämförelsen är hantverkarens
  // starkaste säljbild och ska inte behöva letas fram.
  if (Array.isArray(demo.galleri) && demo.galleri.length >= 2) {
    const forsta = (demo.galleri[0].bildtext || '').toLowerCase();
    if (!forsta.startsWith('före')) {
      varn.push(`${slug}: första galleribilden börjar inte med "Före" — före/efter ska ligga först`);
    }
  }
}

/* --------------------------------------------------------------------- kör */

const valdSlug = process.argv[2];
heligaFiler();
skuggningsfallan();

const slugs = valdSlug ? [valdSlug]
  : existsSync(DATA)
    ? readdirSync(DATA).filter((f) => f.endsWith('.js') && !f.startsWith('_') && f !== 'index.js')
      .map((f) => f.replace(/\.js$/, ''))
    : [];

for (const s of slugs) await kollaDemo(s);

console.log(`Kontrollerade ${slugs.length} demo(s): ${slugs.join(', ') || '(inga)'}\n`);
if (varn.length) {
  console.log('VARNINGAR');
  varn.forEach((v) => console.log(`  ${v}`));
  console.log('');
}
if (fel.length) {
  console.log('FEL — dessa måste åtgärdas före push');
  fel.forEach((f) => console.log(`  ${f}`));
  console.log(`\n${fel.length} fel, ${varn.length} varningar.`);
  process.exit(1);
}
console.log(`Allt grönt. ${varn.length} varningar.`);
