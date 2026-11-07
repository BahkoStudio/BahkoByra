#!/usr/bin/env node
/**
 * Skriver app/sitemap-lastmod.json: sökväg → senaste commit-datum (ISO, UTC) för
 * sidans egna källfiler (listan i app/sitemap-sidor.js). sitemap.js läser filen,
 * så lastmod visar när sidans innehåll senast ändrades, inte när Vercel byggde.
 *
 * Varför en incheckad fil: Vercels bygge klonar med kort historik, så git log
 * fungerar inte pålitligt där. Därför körs skriptet lokalt och resultatet checkas in.
 *
 * Kör från web/ EFTER att innehållsändringen är committad (osparade ändringar syns inte):
 *   node scripts/sitemap-lastmod.mjs
 * och committa sedan app/sitemap-lastmod.json.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allaSidor } from '../app/sitemap-sidor.js';

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: WEB, encoding: 'utf8' }).trim();

if (git('rev-parse', '--is-shallow-repository') === 'true') {
  console.error('Klonen har kort historik (shallow). Kör `git fetch --unshallow` först.');
  process.exit(1);
}

const ut = {};
for (const { stig, kallor } of allaSidor()) {
  // -- och :(literal) så att (sajt) och [slug] inte tolkas som mönster
  const datum = git('log', '-1', '--format=%cI', '--', ...kallor.map((k) => `:(literal)${k}`));
  if (!datum) {
    console.warn(`Ingen historik för ${stig} (${kallor.join(', ')}), hoppar över. Committa sidan och kör igen.`);
    continue;
  }
  ut[stig] = new Date(datum).toISOString().replace(/\.000Z$/, 'Z');
}

const fil = path.join(WEB, 'app/sitemap-lastmod.json');
writeFileSync(fil, JSON.stringify(ut, null, 2) + '\n');
console.log(`Skrev ${Object.keys(ut).length} datum till ${path.relative(WEB, fil)}`);
