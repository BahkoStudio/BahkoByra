/**
 * png.mjs — läsa, skriva, skala och jämföra PNG utan ett enda beroende.
 *
 * Varför egen kod i stället för sharp: web/node_modules är inte ens installerat
 * lokalt, och sharp ligger bara som transitiv/optionell dep till Next. Att bygga
 * QA-grinden på något Next kan släppa vid nästa major är att bygga på sand.
 * node:zlib gör jobbet på ~200 rader.
 *
 * Hanterar bitdjup 8, färgtyp 2 (RGB) och 6 (RGBA) — det Chrome producerar.
 */

import zlib from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

/**
 * Körs filen direkt, eller är den importerad?
 * pathToFileURL krävs på Windows: import.meta.url är file:///C:/... (tre snedstreck),
 * så en handrullad `file://` + sökväg matchar aldrig och CLI:t blir tyst dött.
 */
export const kordDirekt = (metaUrl) =>
  Boolean(process.argv[1]) && metaUrl === pathToFileURL(process.argv[1]).href;

const SIGNATUR = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

/* ---------------------------------------------------------- CRC32 (för skrivning) */

const CRC_TABELL = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABELL[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/* ---------------------------------------------------------------------- avkodning */

/** Paeth-prediktorn ur PNG-specen (RFC 2083 §6.6). */
function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/**
 * Avkoda PNG → { bredd, hojd, data } där data är RGBA, 4 byte per pixel.
 * @param {Buffer} buf
 */
export function avkoda(buf) {
  if (!buf.subarray(0, 8).equals(SIGNATUR)) throw new Error('Inte en PNG-fil');

  let pos = 8, bredd = 0, hojd = 0, bitdjup = 0, fargtyp = 0, interlace = 0;
  const idat = [];

  while (pos < buf.length) {
    const langd = buf.readUInt32BE(pos);
    const typ = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + langd);
    pos += 12 + langd; // längd + typ + data + crc

    if (typ === 'IHDR') {
      bredd = data.readUInt32BE(0);
      hojd = data.readUInt32BE(4);
      bitdjup = data[8];
      fargtyp = data[9];
      interlace = data[12];
    } else if (typ === 'IDAT') {
      idat.push(data);
    } else if (typ === 'IEND') {
      break;
    }
  }

  if (bitdjup !== 8) throw new Error(`Bitdjup ${bitdjup} stöds inte (bara 8)`);
  if (interlace !== 0) throw new Error('Interlacade PNG stöds inte');
  const kanaler = fargtyp === 6 ? 4 : fargtyp === 2 ? 3 : 0;
  if (!kanaler) throw new Error(`Färgtyp ${fargtyp} stöds inte (bara 2 och 6)`);

  const rat = zlib.inflateSync(Buffer.concat(idat));
  const radLangd = bredd * kanaler;
  const ut = Buffer.alloc(bredd * hojd * 4);
  const forra = Buffer.alloc(radLangd);
  const denna = Buffer.alloc(radLangd);

  let las = 0;
  for (let y = 0; y < hojd; y++) {
    const filter = rat[las++];
    rat.copy(denna, 0, las, las + radLangd);
    las += radLangd;

    // Avfiltrera in-place enligt PNG-specen.
    for (let i = 0; i < radLangd; i++) {
      const a = i >= kanaler ? denna[i - kanaler] : 0;
      const b = forra[i];
      const c = i >= kanaler ? forra[i - kanaler] : 0;
      switch (filter) {
        case 1: denna[i] = (denna[i] + a) & 0xff; break;
        case 2: denna[i] = (denna[i] + b) & 0xff; break;
        case 3: denna[i] = (denna[i] + ((a + b) >> 1)) & 0xff; break;
        case 4: denna[i] = (denna[i] + paeth(a, b, c)) & 0xff; break;
        default: break; // 0 = None
      }
    }

    for (let x = 0; x < bredd; x++) {
      const k = x * kanaler, u = (y * bredd + x) * 4;
      ut[u] = denna[k];
      ut[u + 1] = denna[k + 1];
      ut[u + 2] = denna[k + 2];
      ut[u + 3] = kanaler === 4 ? denna[k + 3] : 255;
    }
    denna.copy(forra);
  }

  return { bredd, hojd, data: ut };
}

/* ----------------------------------------------------------------------- kodning */

function chunk(typ, data) {
  const langd = Buffer.alloc(4);
  langd.writeUInt32BE(data.length);
  const kropp = Buffer.concat([Buffer.from(typ, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(kropp));
  return Buffer.concat([langd, kropp, crc]);
}

/** Koda RGBA → PNG-buffer. Filter 0 på alla rader; storleken spelar ingen roll här. */
export function koda({ bredd, hojd, data }) {
  const rat = Buffer.alloc(hojd * (1 + bredd * 4));
  for (let y = 0; y < hojd; y++) {
    const rad = y * (1 + bredd * 4);
    rat[rad] = 0;
    data.copy(rat, rad + 1, y * bredd * 4, (y + 1) * bredd * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(bredd, 0);
  ihdr.writeUInt32BE(hojd, 4);
  ihdr[8] = 8;  // bitdjup
  ihdr[9] = 6;  // RGBA
  return Buffer.concat([
    SIGNATUR,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(rat, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------ skalning + jämförelse */

/** Skala ned med box-sampling (medelvärde per målpixel). Skalar aldrig upp. */
export function skala(bild, malBredd) {
  if (bild.bredd <= malBredd) return bild;
  const f = bild.bredd / malBredd;
  const nb = malBredd, nh = Math.max(1, Math.round(bild.hojd / f));
  const ut = Buffer.alloc(nb * nh * 4);

  for (let y = 0; y < nh; y++) {
    const y0 = Math.floor(y * f), y1 = Math.min(bild.hojd, Math.ceil((y + 1) * f));
    for (let x = 0; x < nb; x++) {
      const x0 = Math.floor(x * f), x1 = Math.min(bild.bredd, Math.ceil((x + 1) * f));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * bild.bredd + xx) * 4;
          r += bild.data[i]; g += bild.data[i + 1]; b += bild.data[i + 2]; a += bild.data[i + 3];
          n++;
        }
      }
      const u = (y * nb + x) * 4;
      ut[u] = r / n; ut[u + 1] = g / n; ut[u + 2] = b / n; ut[u + 3] = a / n;
    }
  }
  return { bredd: nb, hojd: nh, data: ut };
}

/**
 * Jämför två bilder pixel för pixel.
 * @returns {{lika:boolean, andel:number, antal:number, total:number, diff:object|null, fel?:string}}
 *   diff är en RGBA-bild där skiljande pixlar målas röda över en urblekt bakgrund.
 */
export function jamfor(a, b, { troskel = 8, ritaDiff = true } = {}) {
  if (a.bredd !== b.bredd || a.hojd !== b.hojd) {
    return {
      lika: false, andel: 1, antal: -1, total: 0, diff: null,
      fel: `Olika storlek: ${a.bredd}x${a.hojd} mot ${b.bredd}x${b.hojd}`,
    };
  }
  const total = a.bredd * a.hojd;
  const diff = ritaDiff ? Buffer.alloc(total * 4) : null;
  let antal = 0;

  for (let i = 0; i < total; i++) {
    const p = i * 4;
    const d = Math.max(
      Math.abs(a.data[p] - b.data[p]),
      Math.abs(a.data[p + 1] - b.data[p + 1]),
      Math.abs(a.data[p + 2] - b.data[p + 2]),
      Math.abs(a.data[p + 3] - b.data[p + 3]),
    );
    const skiljer = d > troskel;
    if (skiljer) antal++;
    if (diff) {
      if (skiljer) {
        diff[p] = 255; diff[p + 1] = 32; diff[p + 2] = 32; diff[p + 3] = 255;
      } else {
        // urblekt original som bakgrund, så man ser VAR i bilden felet sitter
        const gra = (a.data[p] * 0.299 + a.data[p + 1] * 0.587 + a.data[p + 2] * 0.114);
        const l = 255 - (255 - gra) * 0.25;
        diff[p] = l; diff[p + 1] = l; diff[p + 2] = l; diff[p + 3] = 255;
      }
    }
  }

  return {
    lika: antal === 0,
    andel: antal / total,
    antal, total,
    diff: diff ? { bredd: a.bredd, hojd: a.hojd, data: diff } : null,
  };
}

export const las = (sokvag) => avkoda(readFileSync(sokvag));
export const spara = (sokvag, bild) => writeFileSync(sokvag, koda(bild));

/* --------------------------------------------------------------------------- CLI */

// Används bl.a. för att verifiera skillens regel "hero-postern = videons frame 0":
//   ffmpeg -i hero.mp4 -vframes 1 f0.png && node tools/demo/png.mjs diff poster.png f0.png
if (kordDirekt(import.meta.url)) {
  const [kommando, ...arg] = process.argv.slice(2);
  if (kommando === 'diff') {
    const [filA, filB, utFil] = arg;
    const r = jamfor(las(filA), las(filB), { ritaDiff: Boolean(utFil) });
    if (r.fel) {
      console.log(`OLIKA: ${r.fel}`);
      process.exit(1);
    }
    const procent = (r.andel * 100).toFixed(3);
    console.log(r.lika
      ? `LIKA: 0 skiljande pixlar av ${r.total}`
      : `SKILJER: ${r.antal} pixlar (${procent} %) av ${r.total}`);
    if (utFil && r.diff) { spara(utFil, r.diff); console.log(`Diffbild: ${utFil}`); }
    process.exit(r.lika ? 0 : 1);
  } else if (kommando === 'info') {
    const b = las(arg[0]);
    console.log(`${b.bredd}x${b.hojd} px`);
  } else {
    console.log('Användning:\n  png.mjs diff <a.png> <b.png> [ut-diff.png]\n  png.mjs info <fil.png>');
    process.exit(2);
  }
}
