const { chromium } = require('playwright');
const out = 'web/public/img/portfolj/';
const SAJTER = [
  ['smamaleri', 'http://localhost:8090/smamaleri/index.html'],
  ['bromma', 'http://localhost:8090/brommatradgardsservice/index.html'],
  ['maykaskitchen', 'http://localhost:8090/maykaskitchen/index.html'],
  ['vajjebygg', 'http://localhost:3000/cloud/vajjebygg/index.html'],
  ['granit', 'http://localhost:3000/cloud/bygg/index.html'],
  ['asmar', 'http://localhost:3000/cloud/asmar/index.html'],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const [namn, url] of SAJTER) {
    const p = await b.newPage({ viewport: { width: 1250, height: 1000 }, deviceScaleFactor: 0.64 });
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) { console.log(namn, 'goto:', e.message.split('\n')[0]); }
    await p.waitForTimeout(4000);
    // Bort med cookie-/popup-lager som annars hamnar i bild
    await p.evaluate(() => {
      // Fasta lager i nedre halvan (kakbanners, chattknappar) ska inte med i sidtoppen
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' && el.getBoundingClientRect().top > innerHeight * 0.5) el.remove();
      }
    });
    await p.evaluate(() => { document.querySelectorAll('[class*="cookie"],[id*="cookie"],[class*="kak"],[id*="kak"],[class*="samtycke"],[id*="samtycke"],[class*="popup"],[id*="popup"],[class*="consent"],[id*="consent"]').forEach(e => e.remove()); window.scrollTo(0, 0); });
    await p.waitForTimeout(800);
    await p.screenshot({ path: out + namn + '.jpg', clip: { x: 0, y: 0, width: 1250, height: 1000 }, type: 'jpeg', quality: 84 });
    console.log(namn, 'ok');
    await p.close();
  }
  await b.close();
})();
