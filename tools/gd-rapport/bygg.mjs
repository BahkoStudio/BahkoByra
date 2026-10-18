#!/usr/bin/env node
// Bygger veckorapporten: läser data/vNN-ÅÅÅÅ.json + text/vNN.md, fyller rapport.html,
// skriver ut/Rapport-vNN-GD-Maleri-ÅÅÅÅ-MM-DD.html och gör PDF + PNG med Edge (headless).
//
//   node tools/gd-rapport/bygg.mjs                 förra veckan
//   node tools/gd-rapport/bygg.mjs --vecka 2026-W42
//   node tools/gd-rapport/bygg.mjs --exempel       använder exempeldata och text/exempel.md
//   node tools/gd-rapport/bygg.mjs --ingen-pdf     bara HTML, startar inte Edge
//
// Inga npm-paket. Node 24.

import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { veckaFranArg, formateraVeckaId, datumintervall } from './vecka.mjs';

const HAR = dirname(fileURLToPath(import.meta.url));
const ROT = join(HAR, '..', '..');
const UT = join(HAR, 'ut');
const TYPSNITT = join(ROT, 'web', 'app', 'typsnitt', 'outfit-normal-variabel.woff2');
const EDGE_SOKVAGAR = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

// A4 i 96 dpi, används för skärmdumpen.
const A4_BREDD = 794;
const A4_HOJD = 1123;

const arg = process.argv.slice(2);
const exempel = arg.includes('--exempel');
const ingenPdf = arg.includes('--ingen-pdf');
const veckaArg = arg.includes('--vecka') ? arg[arg.indexOf('--vecka') + 1] : null;

function fel(text) {
  console.error('\nFEL: ' + text + '\n');
  process.exit(1);
}

let vecka;
try {
  vecka = veckaFranArg(veckaArg);
} catch (e) {
  fel(e.message);
}
const veckaId = formateraVeckaId(vecka); // v41-2026
const veckaKort = `v${String(vecka.nr).padStart(2, '0')}`; // v41

// ---------- läs data ----------
const datafil = join(HAR, 'data', (exempel ? 'exempel-' : '') + veckaId + '.json');
if (!existsSync(datafil)) {
  fel(
    'Hittar ingen datafil: ' + datafil + '\n' +
      (exempel
        ? 'Kör först:  node tools/gd-rapport/hamta.mjs --exempel' + (veckaArg ? ' --vecka ' + veckaArg : '')
        : 'Kör först:  node tools/gd-rapport/hamta.mjs' + (veckaArg ? ' --vecka ' + veckaArg : '')),
  );
}
const data = JSON.parse(readFileSync(datafil, 'utf8'));
if (data.exempel && !exempel) {
  fel('Datafilen är märkt som exempeldata. Kör med --exempel, eller hämta riktiga siffror med hamta.mjs.');
}

// ---------- läs text ----------
const textfil = exempel ? join(HAR, 'text', 'exempel.md') : join(HAR, 'text', veckaKort + '.md');
let text;
if (existsSync(textfil)) {
  text = tolkaText(readFileSync(textfil, 'utf8'));
} else {
  console.warn('OBS: ingen textfil ' + textfil + '. Rapporten får en platshållare. Kopiera text/exempel.md dit och skriv om.');
  text = {
    gjorde: '<p class="tom">Ingen text ännu. Skriv i text/' + veckaKort + '.md under rubriken "Vad vi gjorde den här veckan".</p>',
    nasta: '<p class="tom">Ingen text ännu. Skriv i text/' + veckaKort + '.md under rubriken "Nästa vecka".</p>',
  };
}

// Enkel markdown: "## Vad vi gjorde ..." och "## Nästa vecka". Rader med "- " blir punktlista,
// tomma rader ger nytt stycke. Allt annat ignoreras.
function tolkaText(md) {
  const delar = { gjorde: [], nasta: [] };
  let nuvarande = null;
  for (const rad of md.split(/\r?\n/)) {
    const h = /^##\s+(.*)$/.exec(rad);
    if (h) {
      const r = h[1].toLowerCase();
      nuvarande = r.startsWith('vad vi gjorde') ? 'gjorde' : r.startsWith('nästa vecka') ? 'nasta' : null;
      continue;
    }
    if (nuvarande) delar[nuvarande].push(rad);
  }
  return { gjorde: tillHtml(delar.gjorde), nasta: tillHtml(delar.nasta) };
}

function tillHtml(rader) {
  const ut = [];
  let stycke = [];
  let lista = [];
  const tomStycke = () => {
    if (stycke.length) ut.push('<p>' + esc(stycke.join(' ')) + '</p>');
    stycke = [];
  };
  const tomLista = () => {
    if (lista.length) ut.push('<ul>' + lista.map((l) => '<li>' + esc(l) + '</li>').join('') + '</ul>');
    lista = [];
  };
  for (const r of rader) {
    const t = r.trim();
    if (!t) {
      tomStycke();
      tomLista();
    } else if (/^[-*]\s+/.test(t)) {
      tomStycke();
      lista.push(t.replace(/^[-*]\s+/, ''));
    } else {
      tomLista();
      stycke.push(t);
    }
  }
  tomStycke();
  tomLista();
  return ut.length ? ut.join('') : '<p class="tom">Ingen text.</p>';
}

// ---------- hjälpfunktioner ----------
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const svTal = new Intl.NumberFormat('sv-SE');
function tal(n) {
  return svTal.format(Math.round(Number(n) || 0));
}
function decimal(n, antal = 1) {
  return new Intl.NumberFormat('sv-SE', { minimumFractionDigits: antal, maximumFractionDigits: antal }).format(Number(n) || 0);
}
function procent(andel) {
  return decimal((Number(andel) || 0) * 100, 1) + ' %';
}

// Pil och procentändring mot veckan före. lagreArBattre: true för snittposition på Google.
function andring(nu, fore, { lagreArBattre = false, somTal = false } = {}) {
  nu = Number(nu) || 0;
  fore = Number(fore) || 0;
  if (nu === fore) return '<span class="noll">±0</span>';
  const battre = lagreArBattre ? nu < fore : nu > fore;
  const klass = battre ? 'upp' : 'ned';
  const pil = nu > fore ? '▲' : '▼';
  let text;
  if (somTal || fore === 0) {
    const diff = nu - fore;
    text = (diff > 0 ? '+' : '') + (Number.isInteger(diff) ? tal(diff) : decimal(diff));
    if (fore === 0 && !somTal) text += ' (nytt)';
  } else {
    const p = Math.round(((nu - fore) / fore) * 100);
    text = (p > 0 ? '+' : '') + p + ' %';
  }
  return `<span class="${klass}">${pil} ${text}</span>`;
}

const SIDNAMN = {
  '/': 'Startsidan',
  '/fasad-malning': 'Fasadmålning',
  '/takmalning': 'Takmålning',
  '/malning-invandigt': 'Målning invändigt',
  '/golv': 'Golv',
  '/brf': 'BRF',
  '/integritet': 'Integritet',
  '/tapetsering': 'Tapetsering',
  '/snickerier-fonster-malning': 'Fönster och snickerier',
  '/fasadtvatt': 'Fasadtvätt',
  '/taktvatt': 'Taktvätt',
  '/basta-malare-stockholm': 'Guiden: bästa målaren',
  '/fasadmalning-bromma': 'Bromma',
  '/fasadmalning-taby': 'Täby',
  '/malare-sodertalje': 'Södertälje',
  '/fasadmalning-lidingo': 'Lidingö',
  '/fasadmalning-sollentuna': 'Sollentuna',
  '/fasadmalning-huddinge': 'Huddinge',
  '/fasadmalning-danderyd': 'Danderyd',
};
function normSida(s) {
  let p = String(s || '/').split('?')[0].split('#')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}
function sidnamn(p) {
  return SIDNAMN[p] || p;
}

const KALLNAMN = [
  ['google', 'organic', 'Google (sök)'],
  ['google', 'cpc', 'Google-annons'],
  ['(direct)', null, 'Direkt (skrev adressen)'],
  ['bing', null, 'Bing'],
  ['facebook.com', null, 'Facebook'],
  ['m.facebook.com', null, 'Facebook'],
  ['l.facebook.com', null, 'Facebook'],
  ['instagram.com', null, 'Instagram'],
  ['l.instagram.com', null, 'Instagram'],
  ['linkedin.com', null, 'LinkedIn'],
  ['chatgpt.com', null, 'ChatGPT'],
  ['perplexity.ai', null, 'Perplexity'],
  ['gemini.google.com', null, 'Gemini'],
  ['copilot.microsoft.com', null, 'Copilot'],
];
function kallnamn(k) {
  const kalla = String(k.kalla || '').toLowerCase();
  const medium = String(k.medium || '').toLowerCase();
  for (const [s, m, namn] of KALLNAMN) if (kalla === s && (m === null || medium === m)) return namn;
  if (kalla === 'google') return 'Google (' + medium + ')';
  return k.kalla + (medium && medium !== 'referral' && medium !== '(none)' ? ' / ' + medium : '');
}
const ENHETSNAMN = { mobile: 'Mobil', desktop: 'Dator', tablet: 'Surfplatta', smarttv: 'TV' };

// ---------- bygg värden ----------
const g = data.ga4.denna;
const gf = data.ga4.fore;
const s = data.sc.denna;
const sf = data.sc.fore;

const forfragningar = (h) => (h.generate_lead || 0) + (h.tel_klick || 0) + (h.bokning_klick || 0) + (h.mejl_klick || 0);
const h = g.handelser;
const hf = gf.handelser;

const forfragDetalj = [
  `${tal(h.generate_lead)} formulär`,
  `${tal(h.tel_klick)} telefonklick`,
  `${tal(h.bokning_klick)} bokningsklick`,
  `${tal(h.mejl_klick)} mejlklick`,
].join(' · ') + `<br>${tal(h.offert_klick)} klick på Begär offert`;

// Sidor: slå ihop denna vecka och veckan före per normaliserad sökväg.
const sidMap = new Map();
for (const r of g.sidor || []) {
  const p = normSida(r.sida);
  sidMap.set(p, { nu: (sidMap.get(p)?.nu || 0) + r.visningar, fore: sidMap.get(p)?.fore || 0 });
}
for (const r of gf.sidor || []) {
  const p = normSida(r.sida);
  const e = sidMap.get(p) || { nu: 0, fore: 0 };
  e.fore += r.visningar;
  sidMap.set(p, e);
}
const sidRader = [...sidMap.entries()]
  .sort((a, b) => b[1].nu - a[1].nu)
  .slice(0, 9)
  .map(
    ([p, v]) =>
      `<tr><td class="k">${esc(sidnamn(p))}${SIDNAMN[p] ? `<span class="sti">${esc(p)}</span>` : ''}</td>` +
      `<td class="h">${tal(v.nu)}</td><td class="h">${tal(v.fore)}</td><td class="h">${andring(v.nu, v.fore)}</td></tr>`,
  );
if (!sidRader.length) sidRader.push('<tr><td colspan="4" class="tom">Inga sidvisningar registrerade.</td></tr>');

const sokRader = (s.sokord || [])
  .slice(0, 10)
  .map(
    (r) =>
      `<tr><td class="k">${esc(r.sokord)}</td><td class="h">${tal(r.klick)}</td>` +
      `<td class="h">${tal(r.visningar)}</td><td class="h">${decimal(r.position)}</td></tr>`,
  );
if (!sokRader.length) sokRader.push('<tr><td colspan="4" class="tom">Inga sökord ännu. Search Console släpar ofta några dagar.</td></tr>');

// Källor: slå ihop per visningsnamn, AI-källor markeras.
const kallMap = new Map();
for (const k of g.kallor || []) {
  const namn = kallnamn(k);
  const e = kallMap.get(namn) || { n: 0, ai: false };
  e.n += k.sessioner;
  e.ai = e.ai || !!k.ai;
  kallMap.set(namn, e);
}
const kallChips = [...kallMap.entries()]
  .sort((a, b) => b[1].n - a[1].n)
  .slice(0, 12)
  .map(([namn, v]) => `<span class="chip${v.ai ? ' ai' : ''}"><b>${tal(v.n)}</b> ${esc(namn)}${v.ai ? '<small>AI</small>' : ''}</span>`);
const aiNu = (g.kallor || []).filter((k) => k.ai).reduce((a, k) => a + k.sessioner, 0);
const aiFore = (gf.kallor || []).filter((k) => k.ai).reduce((a, k) => a + k.sessioner, 0);
if (!kallChips.length) kallChips.push('<span class="tom">Inga besök registrerade.</span>');

const enhTot = (g.enheter || []).reduce((a, e) => a + e.sessioner, 0) || 1;
const enheter = (g.enheter || [])
  .sort((a, b) => b.sessioner - a.sessioner)
  .map((e) => `${ENHETSNAMN[e.enhet] || e.enhet} ${Math.round((e.sessioner / enhTot) * 100)} %`)
  .join(' · ');

const sondag = new Date(vecka.slut + 'T00:00:00Z');
const sondagText = `${sondag.getUTCDate()} ${['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'][sondag.getUTCMonth()]} ${sondag.getUTCFullYear()}`;

const varden = {
  titel: `Veckorapport ${veckaKort} · GD Måleri Sthlm AB`,
  stampel: data.exempel ? '<div class="stampel">Exempeldata</div>' : '',
  vecka_kort: veckaKort,
  sondag: 'söndag ' + sondagText,
  datumintervall: datumintervall(vecka),
  datumintervall_fore: datumintervall(data.veckaFore),
  typsnitt_url: existsSync(TYPSNITT)
    ? `"data:font/woff2;base64,${readFileSync(TYPSNITT).toString('base64')}"`
    : '"outfit-saknas.woff2"',

  besok: tal(g.sessioner),
  besok_andring: andring(g.sessioner, gf.sessioner),
  besok_detalj: `${tal(g.anvandare)} personer, ${tal(g.nya)} nya<br>${tal(g.sidvisningar)} sidvisningar (${tal(gf.sidvisningar)} veckan före)`,

  forfragningar: tal(forfragningar(h)),
  forfragningar_andring: andring(forfragningar(h), forfragningar(hf), { somTal: true }),
  forfragningar_detalj: forfragDetalj,

  klick: tal(s.klick),
  klick_andring: andring(s.klick, sf.klick),
  klick_detalj:
    `${tal(s.visningar)} visningar (${tal(sf.visningar)} veckan före)<br>` +
    `snittplats ${decimal(s.position)} (${decimal(sf.position)}) · klickandel ${procent(s.ctr)}`,

  sidor_rader: sidRader.join('\n        '),
  sokord_rader: sokRader.join('\n        '),
  kallor_chips: kallChips.join(''),
  enheter:
    (enheter ? 'Enheter: ' + enheter + '. ' : '') +
    `Besök från AI-tjänster: ${tal(aiNu)}` +
    (aiFore !== aiNu ? ` (${tal(aiFore)} veckan före).` : '.'),

  text_gjorde: text.gjorde,
  text_nasta: text.nasta,
  sida_nr: '1',
  sidor_totalt: '1',
};

// ---------- fyll mallen ----------
const mall = readFileSync(join(HAR, 'rapport.html'), 'utf8');
function rendera(v) {
  return mall.replace(/\{\{(\w+)\}\}/g, (hel, nyckel) => {
    if (!(nyckel in v)) {
      console.warn('OBS: mallen har {{' + nyckel + '}} som saknar värde.');
      return '';
    }
    return v[nyckel];
  });
}

mkdirSync(UT, { recursive: true });
const basnamn = `${data.exempel ? 'EXEMPEL-' : ''}Rapport-${veckaKort}-GD-Maleri-${vecka.slut}`;
const htmlFil = join(UT, basnamn + '.html');
const pdfFil = join(UT, basnamn + '.pdf');
const pngFil = join(UT, basnamn + '.png');

writeFileSync(htmlFil, rendera(varden), 'utf8');
console.log('HTML: ' + htmlFil);

if (ingenPdf) process.exit(0);

// ---------- Edge headless: PDF + PNG ----------
const edge = EDGE_SOKVAGAR.find((p) => existsSync(p));
if (!edge) {
  fel('Hittar inte Microsoft Edge (msedge.exe) på någon av:\n  ' + EDGE_SOKVAGAR.join('\n  ') + '\nHTML-filen finns ändå: ' + htmlFil);
}

function korEdge(extra, vad) {
  const profil = mkdtempSync(join(tmpdir(), 'gd-rapport-'));
  const r = spawnSync(
    edge,
    [
      '--headless',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--virtual-time-budget=3000',
      '--user-data-dir=' + profil,
      ...extra,
      pathToFileURL(htmlFil).href,
    ],
    { encoding: 'utf8', timeout: 90000 },
  );
  try {
    rmSync(profil, { recursive: true, force: true });
  } catch {}
  if (r.error) fel('Edge kunde inte startas för ' + vad + ': ' + r.error.message);
}

function antalPdfSidor(fil) {
  // Edge/Skia skriver sidobjekten okomprimerade, så "/Type /Page" (inte /Pages) går att räkna.
  const buf = readFileSync(fil).toString('latin1');
  const n = (buf.match(/\/Type\s*\/Page(?!s)/g) || []).length;
  return n || 1;
}

korEdge(['--print-to-pdf=' + pdfFil, '--no-pdf-header-footer'], 'PDF');
if (!existsSync(pdfFil)) fel('Edge skrev ingen PDF. Prova att öppna HTML-filen i Edge och skriva ut till PDF för hand: ' + htmlFil);

let sidor = antalPdfSidor(pdfFil);
if (sidor > 1) {
  // Sidfoten ligger sist i flödet och hamnar på sista sidan, så den får säga "sida N av N".
  console.warn(`OBS: rapporten blev ${sidor} sidor. Korta texten i ${textfil} om den ska rymmas på en sida.`);
  writeFileSync(htmlFil, rendera({ ...varden, sida_nr: String(sidor), sidor_totalt: String(sidor) }), 'utf8');
  korEdge(['--print-to-pdf=' + pdfFil, '--no-pdf-header-footer'], 'PDF');
  sidor = antalPdfSidor(pdfFil);
}
console.log(`PDF:  ${pdfFil} (${sidor} ${sidor === 1 ? 'sida' : 'sidor'})`);

korEdge(['--screenshot=' + pngFil, `--window-size=${A4_BREDD},${A4_HOJD * sidor}`], 'skärmdump');
if (existsSync(pngFil)) console.log('PNG:  ' + pngFil + ' (ögonkontroll: syns sidfoten "Bahko Byrå · bahkobyra.se" längst ned?)');
else console.warn('OBS: ingen PNG skrevs, PDF:en finns ändå.');

console.log('\nKlart. Mejla PDF:en till GD Måleri.');
