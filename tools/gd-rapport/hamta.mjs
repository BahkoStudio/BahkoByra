#!/usr/bin/env node
// Hämtar veckostatistik för gdmaleri.se från Google Analytics 4 och Search Console
// och sparar som JSON i tools/gd-rapport/data/vNN-ÅÅÅÅ.json.
//
//   node tools/gd-rapport/hamta.mjs                 förra veckan (måndag till söndag)
//   node tools/gd-rapport/hamta.mjs --vecka 2026-W42
//   node tools/gd-rapport/hamta.mjs --exempel       skriver påhittade siffror, ingen nyckel behövs
//
// Inga npm-paket. Node 24. Nyckeln ligger UTANFÖR repot (se README.md).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { veckaFranArg, veckaFore, formateraVeckaId } from './vecka.mjs';

const HAR = dirname(fileURLToPath(import.meta.url));
const DATA = join(HAR, 'data');

const STANDARD_NYCKEL = 'C:\\Users\\mathi\\OneDrive\\Dokument\\gd-rapport\\tjanstekonto.json';
const SC_SAJT_STANDARD = 'sc-domain:gdmaleri.se';
const HANDELSER = ['generate_lead', 'tel_klick', 'mejl_klick', 'bokning_klick', 'offert_klick'];
const AI_KALLOR = ['chatgpt.com', 'perplexity.ai', 'gemini.google.com', 'copilot.microsoft.com'];
const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
];

// ---------- argument ----------
const arg = process.argv.slice(2);
const exempel = arg.includes('--exempel');
const veckaArg = arg.includes('--vecka') ? arg[arg.indexOf('--vecka') + 1] : null;

// Fel kastas och fångas längst ned i main(), så att Node får stänga sina anslutningar
// i lugn och ro (process.exit mitt i ett fetch-anrop ger en libuv-assertion på Windows).
function fel(text) {
  throw new Error(text);
}

let vecka;
let fore;
let propertyId;
let scSajt;
let nyckel;

function lasKonfig() {
  const sokvag = join(HAR, 'konfig.local.json');
  if (!existsSync(sokvag)) return {};
  try {
    return JSON.parse(readFileSync(sokvag, 'utf8'));
  } catch {
    fel('konfig.local.json går inte att läsa som JSON.');
  }
}

async function main() {
  vecka = veckaFranArg(veckaArg);
  fore = veckaFore(vecka);

  // ---------- exempeldata ----------
  if (exempel) {
    mkdirSync(DATA, { recursive: true });
    const ut = join(DATA, `exempel-${formateraVeckaId(vecka)}.json`);
    writeFileSync(ut, JSON.stringify(exempeldata(vecka, fore), null, 2) + '\n', 'utf8');
    console.log('Exempeldata (påhittade siffror) skriven till ' + ut);
    return;
  }

  // ---------- konfig ----------
  const konfig = lasKonfig();
  propertyId = process.env.GD_GA4_PROPERTY || konfig.ga4Property;
  scSajt = process.env.GD_SC_SAJT || konfig.scSajt || SC_SAJT_STANDARD;
  const nyckelSokvag = process.env.GD_RAPPORT_NYCKEL || konfig.nyckel || STANDARD_NYCKEL;

  if (!propertyId) {
    fel(
      'Property-id för GA4 saknas.\n' +
        'Sätt miljövariabeln GD_GA4_PROPERTY eller skapa tools/gd-rapport/konfig.local.json med\n' +
        '  { "ga4Property": "123456789" }\n' +
        'Siffran står i GA4 under Admin > Property > Property details ("Property ID").',
    );
  }
  if (!existsSync(nyckelSokvag)) {
    fel(
      'Hittar inte nyckelfilen för tjänstekontot: ' + nyckelSokvag + '\n' +
        'Ladda ned JSON-nyckeln från Google Cloud Console och lägg den där,\n' +
        'eller peka ut en annan sökväg med miljövariabeln GD_RAPPORT_NYCKEL. Se README.md.',
    );
  }
  try {
    nyckel = JSON.parse(readFileSync(nyckelSokvag, 'utf8'));
  } catch {
    fel('Nyckelfilen går inte att läsa som JSON: ' + nyckelSokvag);
  }
  if (!nyckel.client_email || !nyckel.private_key) {
    fel('Nyckelfilen saknar client_email eller private_key. Är det rätt fil (tjänstekontots JSON-nyckel)?');
  }

  // ---------- hämta ----------
  console.log(`Hämtar ${vecka.id} (${vecka.start} till ${vecka.slut}) och ${fore.id} för jämförelse ...`);
  const token = await hamtaToken();

  const ga4Denna = await hamtaGa4Vecka(token, vecka);
  const ga4Fore = await hamtaGa4Vecka(token, fore);
  const scDenna = await hamtaScVecka(token, vecka);
  const scFore = await hamtaScVecka(token, fore);

  const resultat = {
    exempel: false,
    skapad: new Date().toISOString(),
    sajt: 'https://gdmaleri.se',
    kund: 'GD Måleri Sthlm AB',
    ga4Property: String(propertyId),
    scSajt,
    vecka,
    veckaFore: fore,
    ga4: { denna: ga4Denna, fore: ga4Fore },
    sc: { denna: scDenna, fore: scFore },
  };

  mkdirSync(DATA, { recursive: true });
  const utfil = join(DATA, `${formateraVeckaId(vecka)}.json`);
  writeFileSync(utfil, JSON.stringify(resultat, null, 2) + '\n', 'utf8');
  console.log(
    `Klart. ${ga4Denna.sessioner} besök, ${ga4Denna.handelser.generate_lead} formulär, ${scDenna.klick} Google-klick. ` +
      'Sparat i ' + utfil,
  );
}

// ---------- autentisering: JWT RS256 -> access token ----------
function base64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hamtaToken() {
  const nu = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: nyckel.client_email,
      scope: SCOPES.join(' '),
      aud: nyckel.token_uri || 'https://oauth2.googleapis.com/token',
      iat: nu,
      exp: nu + 3600,
    }),
  );
  const signer = createSign('RSA-SHA256');
  signer.update(header + '.' + claims);
  const signatur = base64url(signer.sign(nyckel.private_key));
  const jwt = `${header}.${claims}.${signatur}`;

  const svar = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!svar.ok) {
    fel('Kunde inte byta nyckeln mot en access token (' + svar.status + '): ' + (await svar.text()));
  }
  return (await svar.json()).access_token;
}

// ---------- API-anrop ----------
async function postJson(url, body, token, vad) {
  const svar = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (svar.status === 403) {
    fel(
      `Google svarade 403 (åtkomst nekad) för ${vad}.\n` +
        `Tjänstekontot ${nyckel.client_email} saknar troligen åtkomst.\n` +
        (vad.startsWith('GA4')
          ? `Lägg till adressen som Läsare (Viewer) på GA4-propertyn ${propertyId}: Admin > Property access management.\n` +
            'Kontrollera också att "Google Analytics Data API" är aktiverat i Google Cloud-projektet.'
          : `Lägg till adressen som användare på Search Console-egendomen ${scSajt}: Inställningar > Användare och behörigheter.\n` +
            'Kontrollera också att "Google Search Console API" är aktiverat i Google Cloud-projektet.'),
    );
  }
  if (!svar.ok) {
    fel(`Google svarade ${svar.status} för ${vad}:\n` + (await svar.text()));
  }
  return svar.json();
}

const GA4_URL = () => `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

async function ga4(token, body, vad) {
  return postJson(GA4_URL(), body, token, 'GA4 ' + vad);
}

function ga4Rader(svar) {
  return (svar.rows || []).map((r) => ({
    d: (r.dimensionValues || []).map((v) => v.value),
    m: (r.metricValues || []).map((v) => Number(v.value) || 0),
  }));
}

async function hamtaGa4Vecka(token, v) {
  const dateRanges = [{ startDate: v.start, endDate: v.slut }];
  const namn = v.id;

  const totalt = ga4Rader(
    await ga4(
      token,
      {
        dateRanges,
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'newUsers' }, { name: 'screenPageViews' }],
      },
      'totalt ' + namn,
    ),
  )[0] || { m: [0, 0, 0, 0] };

  const sidor = ga4Rader(
    await ga4(
      token,
      {
        dateRanges,
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 25,
      },
      'sidor ' + namn,
    ),
  ).map((r) => ({ sida: r.d[0], visningar: r.m[0], sessioner: r.m[1] }));

  const handelserRader = ga4Rader(
    await ga4(
      token,
      {
        dateRanges,
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: { filter: { fieldName: 'eventName', inListFilter: { values: HANDELSER } } },
      },
      'händelser ' + namn,
    ),
  );
  const handelser = Object.fromEntries(HANDELSER.map((h) => [h, 0]));
  for (const r of handelserRader) handelser[r.d[0]] = r.m[0];

  // Formulärtyp per generate_lead kräver att parametern "formular" är registrerad som
  // anpassad dimension i GA4 (Admin > Custom definitions). Saknas den svarar API:et 400,
  // och då hoppar vi tyst över den här delen.
  let formular = null;
  try {
    const svar = await fetch(GA4_URL(), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges,
        dimensions: [{ name: 'customEvent:formular' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } },
      }),
    });
    if (svar.ok) {
      formular = {};
      for (const r of ga4Rader(await svar.json())) formular[r.d[0] || '(okänt)'] = r.m[0];
    }
  } catch {
    formular = null;
  }

  const kallor = ga4Rader(
    await ga4(
      token,
      {
        dateRanges,
        dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 30,
      },
      'källor ' + namn,
    ),
  ).map((r) => ({ kalla: r.d[0], medium: r.d[1], sessioner: r.m[0], ai: arAi(r.d[0]) }));

  const enheter = ga4Rader(
    await ga4(
      token,
      { dateRanges, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }] },
      'enheter ' + namn,
    ),
  ).map((r) => ({ enhet: r.d[0], sessioner: r.m[0] }));

  return {
    sessioner: totalt.m[0],
    anvandare: totalt.m[1],
    nya: totalt.m[2],
    sidvisningar: totalt.m[3],
    sidor,
    handelser,
    formular,
    kallor,
    enheter,
  };
}

function arAi(kalla) {
  const k = String(kalla || '').toLowerCase();
  return AI_KALLOR.some((a) => k === a || k.endsWith('.' + a) || k.includes(a));
}

async function hamtaScVecka(token, v) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(scSajt)}/searchAnalytics/query`;
  const bas = { startDate: v.start, endDate: v.slut };

  const tot = (await postJson(url, { ...bas }, token, 'Search Console totalt ' + v.id)).rows?.[0] || {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  };
  const sokord =
    (await postJson(url, { ...bas, dimensions: ['query'], rowLimit: 10 }, token, 'Search Console sökord ' + v.id)).rows || [];
  const sidor =
    (await postJson(url, { ...bas, dimensions: ['page'], rowLimit: 10 }, token, 'Search Console sidor ' + v.id)).rows || [];

  const rad = (r) => ({ klick: r.clicks, visningar: r.impressions, ctr: r.ctr, position: r.position });
  return {
    ...rad(tot),
    sokord: sokord.map((r) => ({ sokord: r.keys[0], ...rad(r) })),
    sidor: sidor.map((r) => ({ sida: r.keys[0].replace(/^https?:\/\/[^/]+/, '') || '/', ...rad(r) })),
  };
}

main().catch((e) => {
  console.error('\nFEL: ' + e.message + '\n');
  process.exitCode = 1;
});

// ---------- exempeldata (påhittad, bara för att prova kedjan) ----------
function exempeldata(v, f) {
  return {
    exempel: true,
    skapad: new Date().toISOString(),
    sajt: 'https://gdmaleri.se',
    kund: 'GD Måleri Sthlm AB',
    ga4Property: '000000000',
    scSajt: SC_SAJT_STANDARD,
    vecka: v,
    veckaFore: f,
    ga4: {
      denna: {
        sessioner: 86,
        anvandare: 71,
        nya: 64,
        sidvisningar: 204,
        sidor: [
          { sida: '/', visningar: 92, sessioner: 70 },
          { sida: '/fasad-malning/', visningar: 38, sessioner: 24 },
          { sida: '/malning-invandigt/', visningar: 29, sessioner: 17 },
          { sida: '/brf/', visningar: 21, sessioner: 12 },
          { sida: '/takmalning/', visningar: 14, sessioner: 9 },
          { sida: '/golv/', visningar: 8, sessioner: 5 },
          { sida: '/integritet/', visningar: 2, sessioner: 2 },
        ],
        handelser: { generate_lead: 3, tel_klick: 7, mejl_klick: 1, bokning_klick: 2, offert_klick: 9 },
        formular: { kontakt: 2, brf: 1 },
        kallor: [
          { kalla: 'google', medium: 'organic', sessioner: 48, ai: false },
          { kalla: '(direct)', medium: '(none)', sessioner: 21, ai: false },
          { kalla: 'chatgpt.com', medium: 'referral', sessioner: 4, ai: true },
          { kalla: 'facebook.com', medium: 'referral', sessioner: 3, ai: false },
          { kalla: 'bing', medium: 'organic', sessioner: 3, ai: false },
          { kalla: 'instagram.com', medium: 'referral', sessioner: 2, ai: false },
          { kalla: 'hitta.se', medium: 'referral', sessioner: 2, ai: false },
          { kalla: 'perplexity.ai', medium: 'referral', sessioner: 1, ai: true },
          { kalla: 'eniro.se', medium: 'referral', sessioner: 1, ai: false },
          { kalla: 'gemini.google.com', medium: 'referral', sessioner: 1, ai: true },
        ],
        enheter: [
          { enhet: 'mobile', sessioner: 57 },
          { enhet: 'desktop', sessioner: 26 },
          { enhet: 'tablet', sessioner: 3 },
        ],
      },
      fore: {
        sessioner: 73,
        anvandare: 61,
        nya: 55,
        sidvisningar: 171,
        sidor: [
          { sida: '/', visningar: 81, sessioner: 60 },
          { sida: '/fasad-malning/', visningar: 27, sessioner: 18 },
          { sida: '/malning-invandigt/', visningar: 25, sessioner: 15 },
          { sida: '/brf/', visningar: 15, sessioner: 9 },
          { sida: '/takmalning/', visningar: 12, sessioner: 8 },
          { sida: '/golv/', visningar: 9, sessioner: 6 },
          { sida: '/integritet/', visningar: 2, sessioner: 2 },
        ],
        handelser: { generate_lead: 2, tel_klick: 5, mejl_klick: 0, bokning_klick: 1, offert_klick: 6 },
        formular: { kontakt: 2 },
        kallor: [
          { kalla: 'google', medium: 'organic', sessioner: 41, ai: false },
          { kalla: '(direct)', medium: '(none)', sessioner: 19, ai: false },
          { kalla: 'facebook.com', medium: 'referral', sessioner: 4, ai: false },
          { kalla: 'chatgpt.com', medium: 'referral', sessioner: 2, ai: true },
          { kalla: 'bing', medium: 'organic', sessioner: 2, ai: false },
          { kalla: 'instagram.com', medium: 'referral', sessioner: 2, ai: false },
          { kalla: 'hitta.se', medium: 'referral', sessioner: 2, ai: false },
          { kalla: 'eniro.se', medium: 'referral', sessioner: 1, ai: false },
        ],
        enheter: [
          { enhet: 'mobile', sessioner: 46 },
          { enhet: 'desktop', sessioner: 24 },
          { enhet: 'tablet', sessioner: 3 },
        ],
      },
    },
    sc: {
      denna: {
        klick: 41,
        visningar: 1860,
        ctr: 0.022,
        position: 14.3,
        sokord: [
          { sokord: 'målare stockholm', klick: 9, visningar: 410, ctr: 0.022, position: 11.2 },
          { sokord: 'gd måleri', klick: 8, visningar: 31, ctr: 0.258, position: 1.1 },
          { sokord: 'fasadmålning stockholm', klick: 6, visningar: 285, ctr: 0.021, position: 9.8 },
          { sokord: 'måla trapphus brf', klick: 4, visningar: 96, ctr: 0.042, position: 6.4 },
          { sokord: 'takmålning pris', klick: 3, visningar: 142, ctr: 0.021, position: 12.7 },
          { sokord: 'målare bromma', klick: 3, visningar: 118, ctr: 0.025, position: 8.9 },
          { sokord: 'måla fasad kostnad', klick: 2, visningar: 167, ctr: 0.012, position: 15.1 },
          { sokord: 'målningsfirma stockholm', klick: 2, visningar: 133, ctr: 0.015, position: 17.6 },
          { sokord: 'golvmålning garage', klick: 2, visningar: 54, ctr: 0.037, position: 7.3 },
          { sokord: 'invändig målning pris per kvm', klick: 1, visningar: 88, ctr: 0.011, position: 19.4 },
        ],
        sidor: [
          { sida: '/', klick: 19, visningar: 740, ctr: 0.026, position: 12.1 },
          { sida: '/fasad-malning/', klick: 9, visningar: 520, ctr: 0.017, position: 13.9 },
          { sida: '/brf/', klick: 6, visningar: 210, ctr: 0.029, position: 9.7 },
          { sida: '/takmalning/', klick: 4, visningar: 230, ctr: 0.017, position: 16.2 },
          { sida: '/malning-invandigt/', klick: 2, visningar: 120, ctr: 0.017, position: 18.8 },
          { sida: '/golv/', klick: 1, visningar: 40, ctr: 0.025, position: 14.0 },
        ],
      },
      fore: {
        klick: 34,
        visningar: 1610,
        ctr: 0.021,
        position: 15.6,
        sokord: [
          { sokord: 'målare stockholm', klick: 7, visningar: 380, ctr: 0.018, position: 12.4 },
          { sokord: 'gd måleri', klick: 7, visningar: 27, ctr: 0.259, position: 1.2 },
          { sokord: 'fasadmålning stockholm', klick: 5, visningar: 240, ctr: 0.021, position: 10.9 },
          { sokord: 'takmålning pris', klick: 3, visningar: 130, ctr: 0.023, position: 13.1 },
          { sokord: 'måla trapphus brf', klick: 3, visningar: 80, ctr: 0.038, position: 7.0 },
          { sokord: 'målare bromma', klick: 2, visningar: 100, ctr: 0.02, position: 9.5 },
          { sokord: 'måla fasad kostnad', klick: 2, visningar: 150, ctr: 0.013, position: 15.8 },
          { sokord: 'målningsfirma stockholm', klick: 2, visningar: 120, ctr: 0.017, position: 18.2 },
          { sokord: 'golvmålning garage', klick: 1, visningar: 48, ctr: 0.021, position: 8.1 },
          { sokord: 'måla tak själv', klick: 1, visningar: 70, ctr: 0.014, position: 21.0 },
        ],
        sidor: [
          { sida: '/', klick: 16, visningar: 650, ctr: 0.025, position: 13.0 },
          { sida: '/fasad-malning/', klick: 8, visningar: 460, ctr: 0.017, position: 14.6 },
          { sida: '/brf/', klick: 4, visningar: 180, ctr: 0.022, position: 10.3 },
          { sida: '/takmalning/', klick: 4, visningar: 210, ctr: 0.019, position: 16.9 },
          { sida: '/malning-invandigt/', klick: 2, visningar: 110, ctr: 0.018, position: 19.5 },
        ],
      },
    },
  };
}
