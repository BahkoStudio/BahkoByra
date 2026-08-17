/**
 * webb.mjs — minimal browserstyrning över Chrome DevTools Protocol.
 *
 * Noll beroenden: Node 24 har WebSocket inbyggt, Edge finns på maskinen.
 * CLI-vägen (--headless --screenshot) räcker inte — den kan varken scrolla,
 * emulera en telefon på riktigt, strypa nätverket eller läsa layout-shift.
 * Utan det kan grinden inte fånga iPhone-hoppet.
 *
 * DETERMINISM (Claude-of-Duty-lärdom): varje shot får en FÄRSK browserkontext.
 * Att återanvända en sida mellan shots var exakt det som gjorde att 10 av 11
 * bilder skilde sig mellan identiska körningar. Vi betalar ~200 ms per shot
 * för att slippa det.
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:net';

const BROWSERKANDIDATER = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

/** Fast tidpunkt så räknare, nudge-timers och animationer alltid står lika. */
export const FRYST_TID = 1755388800000; // 2025-08-17T00:00:00Z

export const ENHETER = {
  dator: { bredd: 1440, hojd: 900, dpr: 1, mobil: false, ua: null },
  mobil: {
    bredd: 390, hojd: 844, dpr: 2, mobil: true,
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 '
      + '(KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  },
};

function hittaBrowser() {
  const funnen = BROWSERKANDIDATER.find((p) => existsSync(p));
  if (!funnen) {
    throw new Error('Hittade varken Edge eller Chrome. Sökte i:\n  ' + BROWSERKANDIDATER.join('\n  '));
  }
  return funnen;
}

function ledigPort() {
  return new Promise((klar, fel) => {
    const s = createServer();
    s.on('error', fel);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => klar(port));
    });
  });
}

const sov = (ms) => new Promise((r) => setTimeout(r, ms));

async function vantaPaDevTools(port, maxMs = 20000) {
  const slut = Date.now() + maxMs;
  while (Date.now() < slut) {
    try {
      const svar = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (svar.ok) return (await svar.json()).webSocketDebuggerUrl;
    } catch { /* browsern har inte öppnat porten än */ }
    await sov(120);
  }
  throw new Error(`Browsern svarade inte på port ${port} inom ${maxMs} ms`);
}

/**
 * Starta en headless browser och returnera en styrenhet.
 * @returns {Promise<{nyFlik:Function, stang:Function, cdp:Function}>}
 */
export async function startaBrowser({ tyst = true } = {}) {
  const bin = hittaBrowser();
  const port = await ledigPort();
  const profil = mkdtempSync(join(tmpdir(), 'bahko-demo-qa-'));

  const proc = spawn(bin, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--font-render-hinting=none',   // samma text-rastrering varje körning
    '--disable-lcd-text',           // ingen subpixel-AA → pixeljämförelse blir stabil
    '--force-color-profile=srgb',
    '--disable-extensions',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--no-first-run',
    '--no-default-browser-check',
    '--mute-audio',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profil}`,
    'about:blank',
  ], { stdio: tyst ? 'ignore' : 'inherit', windowsHide: true });

  const wsUrl = await vantaPaDevTools(port);
  const ws = new WebSocket(wsUrl);
  await new Promise((klar, fel) => {
    ws.addEventListener('open', klar, { once: true });
    ws.addEventListener('error', () => fel(new Error('Kunde inte ansluta till browsern')), { once: true });
  });

  let nastaId = 1;
  const vantande = new Map();
  const lyssnare = new Map(); // "sessionId|method" -> Set<fn>

  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id !== undefined) {
      const v = vantande.get(m.id);
      if (!v) return;
      vantande.delete(m.id);
      if (m.error) v.fel(new Error(`${v.method}: ${m.error.message}`));
      else v.klar(m.result);
    } else if (m.method) {
      for (const nyckel of [`${m.sessionId || ''}|${m.method}`, `|${m.method}`]) {
        lyssnare.get(nyckel)?.forEach((fn) => fn(m.params, m.sessionId));
      }
    }
  });

  /**
   * Skicka ett CDP-kommando. ALLTID med tidsgräns: ett QA-verktyg som kan hänga
   * för evigt är värdelöst — det ska säga "det här tog för lång tid", inte tystna.
   */
  function cdp(method, params = {}, sessionId, { timeoutMs = 45000 } = {}) {
    const id = nastaId++;
    return new Promise((klar, fel) => {
      const klocka = setTimeout(() => {
        vantande.delete(id);
        fel(new Error(`${method} svarade inte inom ${timeoutMs} ms`));
      }, timeoutMs);
      vantande.set(id, {
        klar: (v) => { clearTimeout(klocka); klar(v); },
        fel: (e) => { clearTimeout(klocka); fel(e); },
        method,
      });
      ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    });
  }

  function pa(method, fn, sessionId = '') {
    const nyckel = `${sessionId}|${method}`;
    if (!lyssnare.has(nyckel)) lyssnare.set(nyckel, new Set());
    lyssnare.get(nyckel).add(fn);
    return () => lyssnare.get(nyckel).delete(fn);
  }

  /**
   * Ny isolerad flik. Egen browserkontext = egen cache, egna cookies, eget allt.
   * @param {object} val enhet ('dator'|'mobil'), cpuBroms, natverk ('4g'|null), iosLage
   */
  async function nyFlik(val = {}) {
    const {
      enhet = 'dator', cpuBroms = 1, natverk = null,
      iosLage = false, frysTid = true,
    } = val;
    const e = typeof enhet === 'string' ? ENHETER[enhet] : enhet;
    if (!e) throw new Error(`Okänd enhet: ${enhet}`);

    const { browserContextId } = await cdp('Target.createBrowserContext', { disposeOnDetach: true });
    const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', browserContextId });
    const { sessionId } = await cdp('Target.attachToTarget', { targetId, flatten: true });
    const s = (method, params) => cdp(method, params, sessionId);
    const paSess = (method, fn) => pa(method, fn, sessionId);

    await Promise.all([s('Page.enable'), s('Runtime.enable'), s('Network.enable'), s('DOM.enable')]);

    await s('Emulation.setDeviceMetricsOverride', {
      width: e.bredd, height: e.hojd, deviceScaleFactor: e.dpr, mobile: e.mobil,
      screenOrientation: { angle: 0, type: e.mobil ? 'portraitPrimary' : 'landscapePrimary' },
    });
    if (e.ua) await s('Emulation.setUserAgentOverride', { userAgent: e.ua });
    if (e.mobil) await s('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    if (cpuBroms > 1) await s('Emulation.setCPUThrottlingRate', { rate: cpuBroms });
    if (natverk === '4g') {
      // Slow 4G, samma profil som Lighthouse: annars laddar lazy-bilder på 20 ms
      // mot localhost och hoppet som drabbar en riktig telefon syns aldrig.
      await s('Network.emulateNetworkConditions', {
        offline: false, latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
      });
    }

    // Injiceras FÖRE all sidkod, i varje dokument.
    const forskript = [];
    if (frysTid) {
      forskript.push(`
        (() => {
          const T0 = ${FRYST_TID};
          const RiktigDate = Date;
          Date.now = () => T0;
          globalThis.Date = new Proxy(RiktigDate, {
            construct: (m, a) => (a.length ? new m(...a) : new m(T0)),
          });
          let f = 42;
          Math.random = () => ((f = (f * 16807) % 2147483647) / 2147483647);
        })();`);
    }
    if (iosLage) {
      forskript.push(`
        // iOS saknar Chromes scroll-förankring — därför SYNS hoppet på iPhone
        // men inte på datorn. Det här gör Chrome lika ärlig som Safari.
        document.documentElement.style.overflowAnchor = 'none';`);
    }
    for (const kalla of forskript) {
      await s('Page.addScriptToEvaluateOnNewDocument', { source: kalla });
    }

    // Nätverksräknare för "tyst nätverk"-villkoret
    let iFlykten = 0, sistAndrad = Date.now();
    paSess('Network.requestWillBeSent', () => { iFlykten++; sistAndrad = Date.now(); });
    const klarRequest = () => { iFlykten = Math.max(0, iFlykten - 1); sistAndrad = Date.now(); };
    paSess('Network.loadingFinished', klarRequest);
    paSess('Network.loadingFailed', klarRequest);

    const utvardera = async (uttryck, { awaitPromise = true, timeoutMs = 20000 } = {}) => {
      const r = await cdp('Runtime.evaluate', {
        expression: typeof uttryck === 'function' ? `(${uttryck})()` : uttryck,
        returnByValue: true, awaitPromise,
      }, sessionId, { timeoutMs });
      if (r.exceptionDetails) {
        throw new Error('Fel i sidan: ' + (r.exceptionDetails.exception?.description
          || r.exceptionDetails.text));
      }
      return r.result?.value;
    };

    /** Navigera och vänta tills sidan verkligen står still. Aldrig sleep. */
    async function gaTill(url, { tystMs = 500, maxMs = 30000, vantaBilder = true } = {}) {
      const laddad = new Promise((klar) => {
        const av = paSess('Page.loadEventFired', () => { av(); klar(); });
      });
      await s('Page.navigate', { url });
      await Promise.race([laddad, sov(maxMs)]);

      // Hoppmätningen MÅSTE hoppa över väntandet: väntar man ut bilderna först
      // har hoppet redan inträffat och mätningen blir alltid noll (verifierat
      // 2026-08-17 — grinden missade en planterad bugg just av detta skäl).
      if (!vantaBilder) return;

      // 1. nätverket tyst i tystMs
      const slut = Date.now() + maxMs;
      while (Date.now() < slut) {
        if (iFlykten === 0 && Date.now() - sistAndrad > tystMs) break;
        await sov(60);
      }
      // 2. alla bilder avkodade (inte bara laddade). Varje decode() kappas mot en
      //    egen klocka: en bild som aldrig laddar ger ett promise som ALDRIG löses,
      //    och då hänger hela grinden (verifierat 2026-08-17 mot en live-demo).
      await utvardera(`(async () => {
        const medTak = (p, ms) => Promise.race([p, new Promise(r => setTimeout(r, ms))]);
        await medTak(Promise.all([...document.images]
          .filter(i => i.decode)
          .map(i => medTak(i.decode().catch(() => {}), 4000))), 12000);
      })()`, { timeoutMs: 20000 });
      // 3. tre rAF-tick så entré-animationer hunnit sätta sig
      await utvardera(`new Promise(r => {
        const t = setTimeout(r, 3000);
        requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(
          () => { clearTimeout(t); r(); })));
      })`, { timeoutMs: 8000 });
    }

    /** Frys varje video på ruta 0 — annars ger autoplay en ny bild var 16:e ms. */
    const frysVideor = () => utvardera(`(async () => {
      const v = [...document.querySelectorAll('video')];
      v.forEach(x => { try { x.pause(); x.currentTime = 0; } catch {} });
      await new Promise(r => setTimeout(r, 60));
      return v.length;
    })()`);

    async function boxFor(selektor) {
      return utvardera(`(() => {
        const el = document.querySelector(${JSON.stringify(selektor)});
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x + scrollX, y: r.y + scrollY, bredd: r.width, hojd: r.height };
      })()`);
    }

    /**
     * Skärmbild. selektor → klipp mot elementet; helSida → hela dokumentet.
     * skala 0.5 på helsidesbilder håller base64-nyttolasten hanterbar.
     */
    async function skarmbild({ selektor = null, helSida = false, skala = 1 } = {}) {
      let clip;
      if (selektor) {
        const b = await boxFor(selektor);
        if (!b) throw new Error(`Hittade inget element för "${selektor}"`);
        clip = { x: b.x, y: b.y, width: b.bredd, height: b.hojd, scale: skala };
      } else if (helSida) {
        const m = await utvardera(`({
          b: document.documentElement.scrollWidth,
          h: document.documentElement.scrollHeight })`);
        clip = { x: 0, y: 0, width: m.b, height: Math.min(m.h, 16000), scale: skala };
      }
      const { data } = await s('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: Boolean(clip), ...(clip ? { clip } : {}),
      });
      return Buffer.from(data, 'base64');
    }

    /** Scrolla igenom hela sidan i steg — får lazy-bilder att laddas som för en besökare. */
    const scrollaIgenom = (steg = 60, pausMs = 40) => utvardera(`(async () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      for (let i = 0; i <= ${steg}; i++) {
        scrollTo(0, (h * i) / ${steg});
        await new Promise(r => setTimeout(r, ${pausMs}));
      }
      scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 120));
    })()`);

    return {
      sessionId, s, paSess, utvardera, gaTill, skarmbild, boxFor,
      frysVideor, scrollaIgenom,
      forInjicera: (kalla) => s('Page.addScriptToEvaluateOnNewDocument', { source: kalla }),
      stang: async () => {
        try { await cdp('Target.closeTarget', { targetId }); } catch {}
        try { await cdp('Target.disposeBrowserContext', { browserContextId }); } catch {}
      },
    };
  }

  async function stang() {
    try { await cdp('Browser.close'); } catch {}
    try { ws.close(); } catch {}
    try { proc.kill(); } catch {}
    // Windows släpper profilmappen sent; städa tyst.
    await sov(250);
    try { rmSync(profil, { recursive: true, force: true, maxRetries: 3 }); } catch {}
  }

  return { cdp, pa, nyFlik, stang, port };
}
