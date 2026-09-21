// Lägger textlagret (transparent PNG 1080x1350) över AI-bakgrunden (skalad och beskuren till 1080x1350).
// node komponera.mjs <bakgrund.png|url> <textlager.png> <ut.png>
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const [bak, lager, ut] = process.argv.slice(2);
const till64 = async (p) => {
  if (/^https?:\/\//.test(p)) { const r = await fetch(p); if (!r.ok) throw new Error('hämtning ' + r.status + ' ' + p); return 'data:image/png;base64,' + Buffer.from(await r.arrayBuffer()).toString('base64'); }
  return 'data:image/png;base64,' + readFileSync(p).toString('base64');
};
const [b, l] = await Promise.all([till64(bak), till64(lager)]);
const browser = await chromium.launch(); const page = await browser.newPage();
const png = await page.evaluate(async ([b, l]) => {
  const ladda = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const [bi, li] = await Promise.all([ladda(b), ladda(l)]);
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350; const ctx = c.getContext('2d');
  const s = Math.max(1080 / bi.naturalWidth, 1350 / bi.naturalHeight); const w = bi.naturalWidth * s, h = bi.naturalHeight * s;
  ctx.drawImage(bi, (1080 - w) / 2, (1350 - h) / 2, w, h); ctx.drawImage(li, 0, 0, 1080, 1350);
  return c.toDataURL('image/png').split(',')[1];
}, [b, l]);
writeFileSync(ut, Buffer.from(png, 'base64')); console.log('skrev', ut); await browser.close();
