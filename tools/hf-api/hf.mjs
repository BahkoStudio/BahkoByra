#!/usr/bin/env node
// Higgsfield API — bilder och film till demos, betalt per generering i dollar.
// Ersätter higgsfield-CLI:t (krediter) sedan 2026-09-23: abonnemangskrediterna är slut
// och Mathias köper inte större plan. Ingen extern modul — bara Node 24 (fetch).
//
// NYCKELN LIGGER ALDRIG I REPOT (repot är publikt). Läses i den här ordningen:
//   0. HF_CREDENTIALS=nyckel-id:hemlighet i tools/hf-api/.env.local (Git ignorerar filen)
//   1. miljövariablerna HF_API_KEY_ID och HF_API_KEY_SECRET
//   2. filen %USERPROFILE%\.higgsfield\api.env  med raderna  HF_API_KEY_ID=...  HF_API_KEY_SECRET=...
// Skapa nyckeln på https://console.higgsfield.ai (Organisation → API keys).
//
// Användning (kör från repots rot):
//   node tools/hf-api/hf.mjs bild --modell qwen --prompt-fil p.txt --ref A.png --format 16:9 --ut B.png
//   node tools/hf-api/hf.mjs film --modell kling --start A.png --slut B.png --prompt-fil p.txt --sek 5 --ut film.mp4
//   node tools/hf-api/hf.mjs pris film --modell wan --start A.png --slut B.png --res 1080p --sek 5   (kostar inget)
//   node tools/hf-api/hf.mjs ra <endpoint> '<json>' --ut fil      (valfri modell, rå JSON)
//   node tools/hf-api/hf.mjs modeller
//   node tools/hf-api/hf.mjs test                                (gratis: kontrollerar att nyckeln fungerar)
//
// Lokala filer laddas upp automatiskt (presignerad URL), webbadresser skickas som de är.
// Varje körning skriver pris (uppskattning) före och request_id efter, så inget sker i blindo.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { homedir } from 'node:os';

const BAS = 'https://api.higgsfield.ai';

// ---------- modeller ----------
// Film: bara modeller som tar både startbild och slutbild (förvandlingen A → B).
// Priser per sekund enligt open.higgsfield.ai 2026-09-23, inkl. då gällande rabatt.
const FILM = {
  kling: { ep: 'kling-video/v3.0/std/image-to-video', slut: 'last_image_url', ljud: (p) => ({ sound: p ? 'on' : 'off' }), res: false, format: false, not: 'Kling 3.0 Standard · ~$0,23 per 5 s utan ljud (debiterat 2026-09-25) · 3–15 s · billigast' },
  'kling-pro': { ep: 'kling-video/v3.0/pro/image-to-video', slut: 'last_image_url', ljud: (p) => ({ sound: p ? 'on' : 'off' }), res: false, format: false, not: 'Kling 3.0 Pro · $0,48 per 5 s utan ljud · högre kvalitet · 3–15 s' },
  wan: { ep: 'alibaba/wan-3.0/image-to-video', slut: 'end_image_url', ljud: (p) => ({ generate_audio: p }), res: ['480p', '720p', '1080p'], format: ['16:9', '4:3', '1:1', '3:4', '9:16', 'adaptive'], not: 'Wan 3.0 · 480p $0,05 · 720p $0,10 · 1080p $0,20 per s · 2–30 s' },
  'wan-prime': { ep: 'alibaba/wan-3.0-prime/image-to-video', slut: 'end_image_url', ljud: (p) => ({ generate_audio: p }), res: ['480p', '720p', '1080p'], format: ['16:9', '4:3', '1:1', '3:4', '9:16', 'adaptive'], not: 'Wan 3.0 Prime · 2–30 s' },
  minimax: { ep: 'minimax/h3/image-to-video', slut: 'end_image_url', ljud: () => ({}), res: false, format: ['auto', 'adaptive', '21:9', '16:9', '4:3', '1:1', '3:4', '9:16'], not: 'MiniMax H3 · $0,55 per 5 s · 5–15 s · 2K' },
  seedance2: { ep: 'bytedance/seedance-2.0/image-to-video', slut: 'end_image_url', ljud: (p) => ({ generate_audio: p }), res: ['480p', '720p', '1080p', '4k'], format: false, not: 'Seedance 2.0 · dyr (~$0,21/s i 720p) · 4–15 s' },
};
// Bild: med --ref redigeras referensbilden (A → B), utan --ref skapas en ny bild.
const BILD = {
  qwen: { ny: 'alibaba/qwen-image-3/text-to-image', red: 'alibaba/qwen-image-3/edit', refFalt: 'image_urls', extra: (a) => ({ resolution: a.upplosning || '2k', aspect_ratio: a.format || '16:9' }), not: 'Qwen Image 3 · $0,075 i 2k, $0,04 i 1k (--upplosning 1k) · skapar och redigerar' },
  grok: { ny: 'xai/grok-imagine-image-2.0', red: 'xai/grok-imagine-image-2.0', refFalt: 'image_urls', extra: (a) => ({ resolution: a.upplosning || '2k', aspect_ratio: a.format || '16:9', quality: 'medium' }), not: 'Grok Imagine 2.0 · $0,08 i 2k, $0,06 i 1k · skapar och redigerar' },
  ideogram: { ny: 'ideogram/v4.0', red: 'ideogram/v4.0', refFalt: 'image_url', enRef: true, extra: (a) => ({ aspect_ratio: a.format || '16:9', rendering_speed: 'QUALITY', ...(a.ref ? { image_weight: Number(a.vikt || 70) } : {}) }), not: 'Ideogram 4.0 · $0,03 · bra på text i bild' },
  soul: { ny: 'higgsfield-ai/soul/v2/standard', red: null, extra: () => ({}), not: 'Soul 2 · $0,003 · bara nya bilder, billigast' },
  'z-turbo': { ny: 'alibaba/z-image/turbo', red: null, extra: () => ({}), not: 'Z-Image Turbo · $0,015 · bara nya bilder' },
};

// ---------- nyckel ----------
function nyckel() {
  // 1. HF_CREDENTIALS (nyckel-id:hemlighet) i miljön eller i tools/hf-api/.env.local — samma fil som SDK-exemplet.
  let hel = process.env.HF_CREDENTIALS?.trim();
  const lokal = new URL('./.env.local', import.meta.url);
  if (!hel && existsSync(lokal)) {
    const m = readFileSync(lokal, 'utf8').match(/^[ \t]*HF_CREDENTIALS[ \t]*=[ \t]*"?([^"\s]+)"?[ \t]*$/m); // [ \t], inte \s: \s hoppar till nästa rad
    if (m) hel = m[1];
  }
  if (hel && /^[^:\s]+:[^:\s]+$/.test(hel)) return `Key ${hel}`;
  // 2. Äldre upplägg: HF_API_KEY_ID + HF_API_KEY_SECRET i miljön eller i ~/.higgsfield/api.env.
  let id = process.env.HF_API_KEY_ID, hemlig = process.env.HF_API_KEY_SECRET;
  const fil = join(homedir(), '.higgsfield', 'api.env');
  if ((!id || !hemlig) && existsSync(fil)) {
    for (const rad of readFileSync(fil, 'utf8').split(/\r?\n/)) {
      const m = rad.match(/^\s*(HF_API_KEY_ID|HF_API_KEY_SECRET)\s*=\s*"?([^"\s]+)"?\s*$/);
      if (m && m[1] === 'HF_API_KEY_ID') id ||= m[2];
      if (m && m[1] === 'HF_API_KEY_SECRET') hemlig ||= m[2];
    }
  }
  if (!id || !hemlig) {
    console.error('Ingen API-nyckel. Lägg HF_CREDENTIALS=nyckel-id:hemlighet i tools/hf-api/.env.local.');
    process.exit(2);
  }
  return `Key ${id}:${hemlig}`;
}

async function api(metod, sokvag, kropp) {
  const url = sokvag.startsWith('http') ? sokvag : `${BAS}/${sokvag.replace(/^\//, '')}`;
  for (let forsok = 1; ; forsok++) {
    const r = await fetch(url, { method: metod, headers: { Authorization: nyckel(), 'Content-Type': 'application/json' }, body: kropp ? JSON.stringify(kropp) : undefined });
    const text = await r.text();
    let data; try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
    // 400 "Maximum number of concurrent requests" och 5xx: vänta och försök igen, max 6 gånger.
    const upptagen = r.status === 400 && /concurrent/i.test(text);
    if ((upptagen || r.status >= 500) && forsok < 6) { await sov(forsok * 5000); continue; }
    if (!r.ok) throw new Error(`${metod} ${url} → ${r.status}: ${text.slice(0, 400)}`);
    return data;
  }
}
const sov = (ms) => new Promise((l) => setTimeout(l, ms));

// ---------- media ----------
const TYPER = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
async function ladda(fil) {
  if (/^https?:\/\//.test(fil)) return fil;
  const typ = TYPER[extname(fil).toLowerCase()];
  if (!typ) throw new Error(`Filtypen stöds inte: ${fil} (jpg, png, webp, gif)`);
  const u = await api('POST', 'files/generate-upload-url', { content_type: typ });
  // Presignerad lagrings-URL: skicka ALDRIG API-nyckeln hit, bara de headers API:t gav.
  const r = await fetch(u.upload_url, { method: 'PUT', headers: u.upload_headers || { 'Content-Type': typ }, body: readFileSync(fil) });
  if (!r.ok) throw new Error(`Uppladdningen misslyckades (${r.status}) för ${fil}`);
  return u.public_url;
}

async function hamta(url, ut) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Kunde inte hämta ${url} (${r.status})`);
  writeFileSync(ut, Buffer.from(await r.arrayBuffer()));
}

// ---------- körning ----------
async function kor(ep, kropp, ut, baraPris) {
  const pris = await api('POST', `estimate/${ep}`, kropp).catch((e) => ({ fel: e.message }));
  if (pris.fel) console.log(`pris: kunde inte uppskattas (${pris.fel.slice(0, 120)})`);
  else console.log(`pris: $${Number(pris.usd).toFixed(3)} (${pris.credits} API-krediter) · ${ep}`);
  if (baraPris) return;
  const start = await api('POST', ep, kropp);
  console.log(`request_id: ${start.request_id}`);
  let s = start;
  for (let i = 0; !['completed', 'failed', 'nsfw', 'canceled'].includes(s.status); i++) {
    await sov(Math.min(4000 + i * 1000, 15000));
    s = await api('GET', start.status_url || `requests/${start.request_id}/status`);
    process.stdout.write(`\r${s.status}…            `);
  }
  process.stdout.write('\n');
  if (s.status !== 'completed') throw new Error(`Genereringen blev "${s.status}": ${JSON.stringify(s.error || s).slice(0, 300)} (misslyckade debiteras inte)`);
  const url = s.video?.url || s.images?.[0]?.url || s.audio?.url;
  if (!url) throw new Error(`Inget resultat i svaret: ${JSON.stringify(s).slice(0, 300)}`);
  if (ut) { await hamta(url, ut); console.log(`sparad: ${ut}`); }
  else console.log(`url: ${url}`);
  // Fler bilder i svaret (vissa modeller ger flera): spara med löpnummer.
  if (ut && s.images?.length > 1) for (let i = 1; i < s.images.length; i++) {
    const f = ut.replace(/(\.[a-z0-9]+)$/i, `-${i + 1}$1`); await hamta(s.images[i].url, f); console.log(`sparad: ${f}`);
  }
}

function argument(lista) {
  const a = { _: [] };
  for (let i = 0; i < lista.length; i++) {
    const x = lista[i];
    if (x.startsWith('--')) { const k = x.slice(2); const v = lista[i + 1] && !lista[i + 1].startsWith('--') ? lista[++i] : true; a[k] = v; }
    else a._.push(x);
  }
  if (a['prompt-fil']) a.prompt = readFileSync(a['prompt-fil'], 'utf8').trim();
  return a;
}

async function film(a, baraPris) {
  const m = FILM[a.modell || 'kling'];
  if (!m) throw new Error(`Okänd filmmodell "${a.modell}". Välj: ${Object.keys(FILM).join(', ')}`);
  if (!a.start) throw new Error('--start <bild> krävs');
  const kropp = { image_url: await ladda(a.start), duration: Number(a.sek || 5), ...m.ljud(a.ljud === 'pa' || a.ljud === 'på') };
  if (a.slut) kropp[m.slut] = await ladda(a.slut);
  if (a.prompt) kropp.prompt = a.prompt;
  if (m.res && a.res) { if (!m.res.includes(a.res)) throw new Error(`${a.modell}: upplösning ${a.res} finns inte (${m.res.join(', ')})`); kropp.resolution = a.res; }
  if (m.format && a.format) kropp.aspect_ratio = a.format;
  await kor(m.ep, kropp, a.ut, baraPris);
}

async function bild(a, baraPris) {
  const m = BILD[a.modell || 'qwen'];
  if (!m) throw new Error(`Okänd bildmodell "${a.modell}". Välj: ${Object.keys(BILD).join(', ')}`);
  if (!a.prompt) throw new Error('--prompt eller --prompt-fil krävs');
  const refs = a.ref ? String(a.ref).split(',') : [];
  if (refs.length && !m.red) throw new Error(`${a.modell} kan inte redigera bilder — välj qwen, grok eller ideogram`);
  const kropp = { prompt: a.prompt, ...m.extra({ ...a, ref: refs.length }) };
  if (refs.length) {
    const urls = [];
    for (const r of refs) urls.push(await ladda(r));
    kropp[m.refFalt] = m.enRef ? urls[0] : urls;
  }
  await kor(refs.length ? m.red : m.ny, kropp, a.ut, baraPris);
}

const [, , kommando, ...rest] = process.argv;
try {
  if (kommando === 'modeller') {
    console.log('FILM (start + slutbild):'); for (const [k, v] of Object.entries(FILM)) console.log(`  ${k.padEnd(10)} ${v.not}`);
    console.log('BILD (--ref = redigera):'); for (const [k, v] of Object.entries(BILD)) console.log(`  ${k.padEnd(10)} ${v.not}`);
  } else if (kommando === 'test') {
    // Gratis nyckeltest: ett prisuppslag kräver giltig nyckel (401 annars) men kostar inget.
    const p = await api('POST', 'estimate/alibaba/qwen-image-3/text-to-image', { prompt: 'test', resolution: '1k', aspect_ratio: '1:1' });
    console.log(`Nyckeln fungerar. (Prisuppslag gav $${p.usd} för en Qwen-bild — inget debiterades.)`);
  } else if (kommando === 'film') await film(argument(rest), false);
  else if (kommando === 'bild') await bild(argument(rest), false);
  else if (kommando === 'pris') {
    const a = argument(rest.slice(1));
    if (rest[0] === 'film') await film(a, true); else if (rest[0] === 'bild') await bild(a, true); else throw new Error('pris film|bild …');
  } else if (kommando === 'ra') {
    const a = argument(rest);
    await kor(a._[0], JSON.parse(a._[1] || '{}'), a.ut, !!a['bara-pris']);
  } else {
    console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').filter((r) => r.startsWith('//')).map((r) => r.slice(3)).join('\n'));
  }
} catch (e) {
  console.error(`FEL: ${e.message}`);
  process.exit(1);
}
