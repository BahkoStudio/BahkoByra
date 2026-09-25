// QA för demomallen v3.1 (ljus design, delad mall i web/app/(demo)/_mall/; hero = logotyp + ort + två tjänster, tjänsteband, resan).
// Playwright hittas bara inifrån web/, så: kopiera hit filen till web/qa.mjs, kör, ta bort före commit.
//   cp .claude/skills/hemsidor/qa.mjs web/qa.mjs && cd web
//   node qa.mjs <route> <port> "<början på firmanamnet i h1>" "<förbjudet regex>" <betyg: ja|nej|sajt> <instagram: inbaddat|kort|ingen>
// betyg: ja = verifierat Google-betyg · nej = exempelomdömen · sajt = riktiga omdömen från kundens sajt, utan betyg
// Exempel: node qa.mjs swedcro 3457 "Swedcro" "golvvision|rskompakt|lorem" ja inbaddat
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const [route, port, h1start, forbjudet, betyg = 'nej', instagram = 'inbaddat'] = process.argv.slice(2);
const BAS = `http://localhost:${port}`;
const SIDA = `${BAS}/${route}/`;
const UT = `../.tmp/${route}/qa`;
fs.mkdirSync(UT, { recursive: true });

const fel = [];
const ok = (v, t) => (v ? console.log('  OK  ', t) : (fel.push(t), console.log('  FEL ', t)));
const lum = (r, g, b) => { const c = [r, g, b].map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const kontrast = (fg, bg) => { const a = lum(...fg), b = lum(...bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
const tal = (s) => (s.match(/[\d.]+/g) || []).map(Number);
// color-mix() ger svar som "color(srgb 1 1 1)" (0–1), inte rgb(255 …). Läses det som rgb blir vitt svart.
const farg = (s) => (/^color\(srgb/.test(s) ? tal(s.replace('srgb', '')).slice(0, 3).map((v) => Math.round(v * 255)) : tal(s).slice(0, 3));
const medel = (f) => { const o = execSync(`ffmpeg -v error -i "${f}" -vf scale=1:1 -f rawvideo -pix_fmt rgb24 -`); return [o[0], o[1], o[2]]; };

// Text över film eller bild går inte att räkna ur CSS. Mät i stället: göm texten, ta en bild av
// rutan bakom, räkna mot medelfärgen. Görs på flera ställen i filmen — sämsta värdet gäller.
async function overFilm(page, sel, etikett, namn, tider) {
  const el = page.locator(sel).first();
  if (!(await el.count()) || !(await el.isVisible())) return;
  await el.scrollIntoViewIfNeeded();
  let samst = 99;
  for (const t of tider) {
    await page.evaluate((t) => document.querySelectorAll('video').forEach((v) => { v.pause(); v.currentTime = Math.min(t, (v.duration || 1) - 0.1); }), t);
    await page.waitForTimeout(350);
    const box = await el.boundingBox();
    const fg = farg(await el.evaluate((e) => getComputedStyle(e).color));
    var grans = await el.evaluate((e) => { const c = getComputedStyle(e); return parseFloat(c.fontSize) >= 24 || (parseFloat(c.fontSize) >= 18.66 && +c.fontWeight >= 700) ? 3 : 4.5; });
    // Bara texten görs osynlig — elementets egen bakgrund (glas, bricka) ska räknas med.
    await el.evaluate((e) => { e.dataset.qaFarg = e.style.color; e.style.setProperty('color', 'transparent', 'important'); e.querySelectorAll('*').forEach((b) => b.style.setProperty('color', 'transparent', 'important')); e.style.setProperty('text-shadow', 'none', 'important'); });
    const f = `${UT}/px-${namn}-${etikett}-${t}.png`;
    fs.writeFileSync(f, await page.screenshot({ clip: box }));
    await el.evaluate((e) => { e.style.color = e.dataset.qaFarg; e.style.removeProperty('text-shadow'); e.querySelectorAll('*').forEach((b) => b.style.removeProperty('color')); });
    samst = Math.min(samst, kontrast(fg, medel(f)));
  }
  ok(samst >= grans, `${etikett} över film: sämst ${samst.toFixed(2)}:1 (krav ${grans}:1)`);
}

const browser = await chromium.launch();

for (const [namn, vp, dev] of [['desktop', { width: 1440, height: 900 }, {}], ['mobil', { width: 390, height: 844 }, devices['iPhone 13']]]) {
  console.log(`\n== ${route} ${namn} ==`);
  const ctx = await browser.newContext({ ...dev, viewport: vp });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => fel.push(`pageerror ${namn}: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error' && !/net::ERR_|instagram|fbcdn|Permissions policy|Content Security Policy/i.test(m.text())) fel.push(`console ${namn}: ${m.text()}`); });
  await page.goto(SIDA, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  // Hero-entrén och popupen ska inte störa mätningarna.
  await page.addStyleTag({ content: '[class*="hero"] *{animation:none !important} aside[class*="popup"]{display:none !important}' });

  // --- grund ---
  const html = await page.content();
  ok(!new RegExp(forbjudet, 'i').test(html), 'inga spår av andra leads eller mallrester');
  ok(!/undefined|NaN|\[object/.test(await page.locator('body').innerText()), 'inga tomma datafält i texten (undefined/NaN)');
  ok((await page.locator('h1').count()) === 1, 'exakt en h1');
  // h1 är logotypen (alt = firmanamnet) eller, utan logotyp, firmanamnet i text.
  const h1Namn = await page.locator('h1').evaluate((e) => (e.querySelector('img')?.alt || e.innerText).replace(/\s+/g, ' ').trim());
  ok(h1Namn.toLowerCase().startsWith(h1start.toLowerCase()), `h1 = firmanamnet (${h1Namn})`);
  const ordning = await page.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => s.id));
  const vantad = ['top', 'tjanster', 'jobb', 'varfor', 'om', 'process', 'omdomen', 'instagram', 'fragor', 'kontakt'].filter((id) => ordning.includes(id));
  ok(JSON.stringify(ordning) === JSON.stringify(vantad) && ['top', 'tjanster', 'jobb', 'varfor', 'om', 'omdomen', 'fragor', 'kontakt'].every((id) => ordning.includes(id)), `sektionsordning (${ordning.join(' ')})`);
  ok((await page.locator('[class*="stat"]').count()) === 0, 'ingen siffer-rad (utdöd)');

  // --- header: genomskinlig högst upp, vit efter skroll, logotypen mitt i pillret ---
  const hdr = page.locator('header').first();
  const a0 = tal(await hdr.evaluate((e) => getComputedStyle(e).backgroundColor))[3] ?? 1;
  await page.evaluate(() => window.scrollTo(0, 400)); await page.waitForTimeout(400);
  const a1 = tal(await hdr.evaluate((e) => getComputedStyle(e).backgroundColor))[3] ?? 1;
  const hdrFarg = farg(await hdr.evaluate((e) => getComputedStyle(e).color));
  ok(a0 === 0, `header genomskinlig vid 0 (alfa ${a0})`);
  ok(a1 >= 0.8 && kontrast(hdrFarg, [255, 255, 255]) >= 7, `header vit med mörk text efter skroll (alfa ${a1})`);
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  if (namn === 'desktop') {
    const pos = await page.locator('nav[class*="hdrPiller"] > *').evaluateAll((els) => els.map((e) => (/hdrLogo/.test(e.className) ? 'LOGO' : 'a')));
    const i = pos.indexOf('LOGO');
    ok(i > 0 && i < pos.length - 1 && Math.abs(i - (pos.length - 1 - i)) <= 1, `logotypen mitt bland länkarna (${pos.join(' ')})`);
    const mitt = await page.locator('nav[class*="hdrPiller"]').evaluate((e) => { const r = e.getBoundingClientRect(); return Math.abs(r.left + r.width / 2 - innerWidth / 2); });
    ok(mitt <= 24, `pillret centrerat (${Math.round(mitt)} px från mitten)`);
  }

  // --- hero ---
  const vids = await page.locator('section[id="top"] video').evaluateAll((els) => els.filter((e) => getComputedStyle(e).display !== 'none').length);
  ok(vids === 1, `en synlig hero-film (${vids})`);
  // Heron bär bara logotyp, ort, två tjänster och knapparna (Mathias 2026-09-19). Ingen ingress, ingen bevisrad.
  const hero = await page.locator('section[id="top"]').evaluate((e) => ({
    logo: !!e.querySelector('h1 img'), h1font: getComputedStyle(e.querySelector('h1')).fontFamily, h1bredd: Math.round((e.querySelector('h1 img') || e.querySelector('h1')).getBoundingClientRect().width), h1plats: innerWidth - 32, h1spill: e.querySelector('h1 img') ? 0 : e.querySelector('h1').scrollWidth - e.querySelector('h1').clientWidth,
    tjanster: e.querySelector('[class*="heroTjanster"]')?.innerText || '', stycken: e.querySelectorAll('p').length, listor: e.querySelectorAll('ul').length,
    knappar: e.querySelectorAll('a[class*="btn"]').length, mitt: Math.abs(e.querySelector('h1').getBoundingClientRect().left + e.querySelector('h1').getBoundingClientRect().width / 2 - innerWidth / 2),
  }));
  ok(hero.logo || /bebas/i.test(hero.h1font), hero.logo ? 'heron bär logotypen' : 'heron bär firmanamnet i Bebas Neue (ingen logotypfil)');
  ok(hero.h1bredd <= hero.h1plats && hero.h1spill <= 1, `h1 ryms (${hero.h1bredd} px av ${hero.h1plats})`);
  ok(/^\S.* & .*\S\.$/.test(hero.tjanster.trim()), `två tjänster i heron (${hero.tjanster.trim()})`);
  ok(hero.stycken <= 2 && hero.listor === 0 && hero.knappar === 2, `heron är ren: ${hero.stycken} textrader, ${hero.listor} listor, ${hero.knappar} knappar`);
  ok(hero.mitt <= 12, `heron centrerad (${Math.round(hero.mitt)} px från mitten)`);
  const tider = [0, 3, 6, 9, 12];
  if (!hero.logo) await overFilm(page, 'h1', 'h1', namn, tider);
  await overFilm(page, 'p[class*="heroOrt"]', 'ort', namn, tider);
  await overFilm(page, 'p[class*="heroTjanster"]', 'tjänsterad', namn, tider);
  await overFilm(page, namn === 'desktop' ? 'nav[class*="hdrPiller"] a:not([class*="hdrLogo"])' : 'a[class*="mobilNavKnapp"] span', 'header', namn, tider);
  if (namn === 'desktop') await overFilm(page, 'a[class*="hdrTel"] span', 'headertelefon', namn, tider);
  await page.evaluate(() => document.querySelectorAll('video').forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); }));
  if (namn === 'mobil') {
    const b = await page.locator('section[id="top"] a[class*="btn"]').last().evaluate((el) => el.getBoundingClientRect().bottom);
    ok(b <= 844, `hero-knapparna inom första skärmen (${Math.round(b)})`);
  }

  // --- kontrast, hela sidan: varje synlig textnod mot närmaste täckande bakgrund ---
  const svaga = await page.evaluate(() => {
    const L = (c) => { const v = c.map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const rgb = (s) => { const n = (s.match(/[\d.]+/g) || []).map(Number); return /^color\(srgb/.test(s) ? [n[0] * 255, n[1] * 255, n[2] * 255, n[3] ?? 1] : n; };
    const ut = [];
    for (const el of document.querySelectorAll('main *, footer *, header *')) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      if (cs.visibility === 'hidden' || cs.display === 'none' || r.width < 2 || el.closest('[aria-hidden="true"]')) continue;
      if (el.closest('#top, #kontakt > div > div > div:first-child, header')) continue; // över film: mäts separat
      if (parseFloat(cs.webkitTextStrokeWidth) > 0) continue; // konturord i tjänstebandet: konturen bär ordet, fyllningen är bandets färg
      let e = el, bg = null, grad = false;
      while (e) { const b = getComputedStyle(e); if (/gradient/.test(b.backgroundImage)) { grad = true; break; } const c = rgb(b.backgroundColor); if (c.length && (c[3] ?? 1) > 0.95) { bg = c; break; } e = e.parentElement; }
      if (grad) continue; // gradientknappar mäts för hand i skillen
      bg = bg || [255, 255, 255];
      const fg = rgb(cs.color); const a = L(fg), b = L(bg); const k = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const stor = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
      if (k < (stor ? 3 : 4.5)) ut.push(`${k.toFixed(2)} "${el.textContent.trim().slice(0, 30)}"`);
    }
    return [...new Set(ut)];
  });
  ok(svaga.length === 0, `all text >= 4,5:1${svaga.length ? ' — ' + svaga.slice(0, 6).join(' | ') : ''}`);
  await overFilm(page, '#kontakt h2', 'kontaktrubrik', namn, [0, 2, 4]);
  await overFilm(page, '#kontakt p[class*="sekLead"]', 'kontaktingress', namn, [0, 2, 4]);

  // --- fokusringen: dubbel (mörk yttre + vit kärna) så den syns mot både film och vitt ---
  if (namn === 'desktop') {
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    await page.locator('section[id="top"] a[class*="btn"]').first().focus();
    await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab'); await page.waitForTimeout(500);
    const ring = await page.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { stil: cs.outlineStyle, bredd: parseFloat(cs.outlineWidth), farg: cs.outlineColor, skugga: cs.boxShadow }; });
    ok(ring.stil === 'solid' && ring.bredd >= 2 && /rgb\(15, 23, 42\)/.test(ring.farg) && /255, 255, 255/.test(ring.skugga), `fokusring dubbel mörk/vit (${ring.farg} + ${ring.skugga.slice(0, 30)})`);
  }

  // --- uppmaningar: minst tre + popup + sidflik ---
  const cta = await page.locator('main a[href="#kontakt"][class*="btn"]').count();
  ok(cta >= 3, `minst tre knappar till formuläret i innehållet (${cta})`);
  ok((await page.locator('aside[class*="popup"]').count()) === 1, 'popup finns');
  const flik = page.locator('a[class*="sidflik"]');
  if (namn === 'desktop') {
    const f = await flik.evaluate((e) => ({ skrift: getComputedStyle(e).writingMode, hoger: Math.round(innerWidth - e.getBoundingClientRect().right), synlig: getComputedStyle(e).display !== 'none' }));
    ok(f.synlig && f.skrift === 'vertical-rl' && f.hoger <= 1, `sidflik stående i högerkanten (${f.skrift}, ${f.hoger} px)`);
  } else {
    ok(!(await flik.isVisible()), 'sidflik dold på mobil');
    ok(await page.locator('header a[class*="hdrRing"], header a[class*="mobilNavKnapp"]').first().isVisible(), 'mobilheadern bär kontaktvägen');
    const sma = await page.locator('header a').evaluateAll((els) => els.filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).map((e) => e.textContent.trim()));
    ok(sma.length === 0, `tryckytor i headern >= 44 px${sma.length ? ': ' + sma.join(', ') : ''}`);
  }

  // --- tjänstebandet under heron: rullar åt vänster ---
  const tejp = page.locator('div[class*="tejp"] [class*="tejpSpar"]');
  ok((await tejp.count()) === 1 && (await page.evaluate(() => document.querySelector('main > section')?.nextElementSibling?.className || '')).includes('tejp'), 'tjänstebandet ligger direkt under heron');
  await page.evaluate(() => window.scrollTo({ top: document.querySelector('div[class*="tejp"]').offsetTop - 300, behavior: 'instant' })); await page.waitForTimeout(300);
  const t0 = await tejp.evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m41); await page.waitForTimeout(800);
  const t1 = await tejp.evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m41);
  ok(t1 < t0, `tjänstebandet rullar åt vänster (${(t1 - t0).toFixed(1)} px)`);
  ok((await page.locator('div[class*="tejp"] [class*="tejpGrupp"]:first-child span').count()) >= 6, 'minst sex ord i tjänstebandet');

  // --- så går det till: resan, utan ordningssiffror ---
  if (await page.locator('#process').count()) {
    const resa = await page.locator('#process').evaluate((e) => ({
      steg: e.querySelectorAll('li').length, ikoner: e.querySelectorAll('li svg').length,
      siffror: /\b0?[1-9]\b/.test([...e.querySelectorAll('li')].map((li) => li.innerText).join(' ').replace(/\d+ (timmar|dygn|arbetsdag|kr|%)/g, '')),
      raknare: [...e.querySelectorAll('li')].some((li) => !['none', 'normal', '""'].includes(getComputedStyle(li, '::before').content)),
    }));
    ok(resa.steg >= 3 && resa.ikoner === resa.steg, `resan: ${resa.steg} hållplatser med ikon`);
    ok(!resa.raknare, 'inga ordningssiffror (01, 02 …) i stegen');
  }
  ok((await page.locator('#varfor [class*="varforNot"]').count()) === 0, 'ingen illustrationsnot under Varför-filmen (Mathias 2026-09-19)');

  // --- tjänster: kort med bild ---
  const tj = await page.locator('#tjanster article').evaluateAll((els) => els.map((e) => ({ bild: !!e.querySelector('img'), lank: !!e.querySelector('a[href="#kontakt"]') })));
  ok(tj.length >= 3 && tj.every((x) => x.bild && x.lank), `tjänstekort med bild och länk (${tj.length})`);

  // --- jobb: två band åt var sitt håll ---
  await page.locator('#jobb').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  const xs = async () => page.locator('#jobb [class*="bandSpar"]').evaluateAll((els) => els.map((e) => new DOMMatrix(getComputedStyle(e).transform).m41));
  const x0 = await xs(); await page.waitForTimeout(900); const x1 = await xs();
  ok(x0.length === 2, `två band (${x0.length})`);
  ok(x1[0] < x0[0] && x1[1] > x0[1], `första bandet åt vänster, andra åt höger (${(x1[0] - x0[0]).toFixed(1)}, ${(x1[1] - x0[1]).toFixed(1)})`);

  // --- varför: mörk sektion, film som slutar med logotypen ---
  const vf = await page.locator('#varfor').evaluate((e) => getComputedStyle(e).backgroundColor);
  ok(lum(...tal(vf).slice(0, 3)) < 0.06, `Varför-sektionen är mörk (${vf})`);
  const film = page.locator('#varfor video');
  await film.scrollIntoViewIfNeeded();
  const langd = await film.evaluate(async (v) => { if (!(v.duration > 0)) await new Promise((r) => v.addEventListener('loadedmetadata', r, { once: true })); return v.duration; });
  ok(langd >= 5, `Varför-filmen ${langd.toFixed(1)} s`);
  await film.evaluate((v) => { v.pause(); v.currentTime = v.duration - 0.15; }); await page.waitForTimeout(500);
  await film.screenshot({ path: `${UT}/${namn}-varfor-slutbild.png` }); // TITTA: logotypen ska synas här
  // Logokortet är enfärgat: vitt för mörka logotyper, märkets mörka ton för ljusa. En bildruta ur själva filmen ligger mitt emellan.
  const slutLum = lum(...medel(`${UT}/${namn}-varfor-slutbild.png`));
  ok(slutLum > 0.35 || slutLum < 0.08, `filmen slutar på ett logokort (luminans ${slutLum.toFixed(2)}) — titta på bilden också`);

  // --- om oss och footer bär logotypen ---
  ok((await page.locator('#om [class*="omKort"] img, #om [class*="omOrd"]').count()) === 1, 'logotypen i Om oss');
  ok((await page.locator('footer [class*="ftrLogo"] img, footer [class*="ftrOrd"]').count()) === 1, 'logotypen i footern');

  // --- omdömen ---
  const omd = await page.locator('#omdomen').innerText();
  const exempel = await page.locator('#omdomen [class*="exempelTagg"]').count();
  const tomma = await page.locator('#omdomen [class*="stjarnorTomma"]').count();
  ok(exempel === tomma, `exempelomdömen har tomma stjärnor (${exempel}/${tomma})`);
  if (betyg === 'ja') ok((await page.locator('#omdomen [class*="betyg"]').count()) >= 1, 'betygsbrickan visas (verifierat betyg)');
  else {
    ok((await page.locator('#omdomen [class*="betygTal"]').count()) === 0 && !/\d[,.]\d\s*(av|\/)\s*5|\d+\s+(recensioner|omdömen|omtaler)/i.test(omd), 'inget påhittat betyg eller antal');
    if (betyg === 'sajt') ok(exempel === 0, 'riktiga omdömen från kundens sajt, inga exempelkort');
    else ok(exempel >= 1, 'overifierade omdömen märkta Exempel');
  }

  // --- instagram ---
  if (instagram === 'inbaddat') {
    const src = await page.locator('#instagram iframe').evaluateAll((els) => els.map((e) => e.src));
    ok(src.length >= 3 && src.every((u) => /^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/embed/.test(u)), `Instagram: ${src.length} riktiga inlägg inbäddade`);
    for (const u of src) { const r = await page.request.get(u); if (r.status() !== 200) fel.push(`instagram ${u} -> ${r.status()}`); }
  } else if (instagram === 'kort') {
    ok((await page.locator('#instagram a[class*="igInlagg"] img').count()) >= 3, 'Instagram: egna bilder i IG-ram');
    ok(!/\d+\s*(gilla|likes|kommentarer)/i.test(await page.locator('#instagram').innerText()), 'inga påhittade gilla-siffror');
  } else ok((await page.locator('#instagram').count()) === 0, 'ingen Instagram-sektion');

  // --- frågor och formulär ---
  const faq = await page.locator('#fragor details').evaluateAll((els) => els.map((e) => e.getAttribute('name')));
  ok(faq.length >= 5 && new Set(faq).size === 1 && faq[0], `frågor: ${faq.length} st, ett öppet åt gången`);
  // Formuläret postar via DemoFormular till Web3Forms (klientkomponent, ingen action i DOM:en).
  // Inget testinskick skickas: Web3Forms botskydd nekar automatiserade webblasare. Testa for hand.
  const form = await page.locator('#kontakt form').evaluate((f) => ({
    action: f.getAttribute('action'),
    kravs: f.querySelectorAll('[required]').length,
    honung: !!f.querySelector('input[name="botcheck"]'),
  }));
  ok(!form.action && form.honung && form.kravs >= 2, 'formuläret går via Web3Forms, honungsfälla finns, namn och telefon krävs');
  ok((await page.locator('#kontakt video').count()) === 1, 'suddig film bakom formuläret');

  // --- media: allt laddar, och ingen bild används i två sektioner ---
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
  const media = await page.evaluate(() => [...document.querySelectorAll('img, source, video')].flatMap((e) => [e.currentSrc || e.src || e.getAttribute('src'), e.poster]).filter(Boolean));
  for (const u of new Set(media)) { const r = await page.request.get(u.startsWith('http') ? u : BAS + u); if (r.status() !== 200) fel.push(`media ${u} -> ${r.status()}`); }
  ok(true, `${new Set(media).size} mediafiler kontrollerade`);
  const dubbla = await page.evaluate(() => {
    const fil = (img) => decodeURIComponent((img.currentSrc || img.src).match(/url=([^&]+)/)?.[1] || img.src);
    const per = {}; for (const img of document.querySelectorAll('main section img')) { const f = fil(img); if (/logo/i.test(f)) continue; (per[f] ||= new Set()).add(img.closest('section').id); }
    return Object.entries(per).filter(([, s]) => s.size > 1).map(([f, s]) => `${f} i ${[...s].join('+')}`);
  });
  ok(dubbla.length === 0, `varje bild i en enda sektion${dubbla.length ? ': ' + dubbla.join(' | ') : ''}`);

  // --- typografi och layout ---
  const versal = await page.evaluate(() => [...document.querySelectorAll('main *, footer *')].filter((e) => getComputedStyle(e).textTransform === 'uppercase' && e.children.length === 0 && !e.closest('h1')).map((e) => e.textContent.trim()).filter((t) => t.length > 35));
  ok(versal.length === 0, `inga versalrader > 35 tecken${versal.length ? ': ' + versal.join(' | ') : ''}`);
  ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= vp.width, 'ingen sidledsskroll');

  // --- helsidesbilder att titta på ---
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  await page.screenshot({ path: `${UT}/${namn}-hero.png` });
  for (const id of ['tjanster', 'jobb', 'varfor', 'om', 'omdomen', 'instagram', 'fragor', 'kontakt']) {
    if (!(await page.locator(`#${id}`).count())) continue;
    await page.locator(`#${id}`).evaluate((e) => window.scrollTo(0, e.offsetTop - 90)); await page.waitForTimeout(500);
    await page.screenshot({ path: `${UT}/${namn}-${id}.png` });
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(400);
  await page.screenshot({ path: `${UT}/${namn}-footer.png` });
  await ctx.close();
}

// --- mellanbredder: heron över filmen på surfplatta (768 gav 4,2:1 i design-loopen 2026-09-18) ---
for (const [namn, vp] of [['768', { width: 768, height: 1024 }], ['1100', { width: 1100, height: 800 }]]) {
  console.log(`
== ${route} ${namn} (hero) ==`);
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  await page.goto(SIDA, { waitUntil: 'load' }); await page.waitForTimeout(1200);
  await page.addStyleTag({ content: '[class*="hero"] *{animation:none !important} aside[class*="popup"]{display:none !important}' });
  const tider = [0, 3, 6, 9, 12, 15];
  for (const [sel, et] of [['p[class*="heroOrt"]', 'ort'], ['p[class*="heroTjanster"]', 'tjänsterad']]) await overFilm(page, sel, et, namn, tider);
  ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= vp.width, `${namn}: ingen sidledsskroll`);
  await ctx.close();
}

// --- minskad rörelse: banden står still och går att dra i sidled ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(SIDA, { waitUntil: 'load' });
  const b = await page.locator('#jobb [class*="bandSpar"]').first().evaluate((e) => getComputedStyle(e).animationName);
  const kopia = await page.locator('#jobb [class*="bandKopia"]').first().evaluate((e) => getComputedStyle(e).display);
  ok(b === 'none' && kopia === 'none', `minskad rörelse: banden stilla, kopian dold (${b}, ${kopia})`);
  await ctx.close();
}

// --- resten av appen lever ---
{
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  for (const s of ['/', '/om-oss/', '/swedcro/']) { const r = await page.request.get(BAS + s); if (r.status() !== 200) fel.push(`sajt ${s} -> ${r.status()}`); }
  ok(true, 'marknadssajten och kanon-demon svarar 200');
  await ctx.close();
}

await browser.close();
console.log('\n=====');
if (fel.length) { fel.forEach((f) => console.log(' - ' + f)); process.exit(1); }
console.log(`${route}: Allt grönt. Titta på bilderna i ${UT}/ — särskilt *-varfor-slutbild.png.`);
