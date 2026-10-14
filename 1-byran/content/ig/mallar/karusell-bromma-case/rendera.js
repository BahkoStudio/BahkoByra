const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const bas = require('url').pathToFileURL(path.resolve('slide.html')).href;
  const vilka = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [0, 1, 2, 3, 4, 5];
  for (const i of vilka) {
    await p.goto(bas + '?i=' + i, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${i + 1}.png` });
    console.log('skrev', `${i + 1}.png`);
  }
  await b.close();
})();
