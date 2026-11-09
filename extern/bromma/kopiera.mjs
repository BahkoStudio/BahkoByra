// Hämtar Bromma Trädgårdsservices sajt från web/ före varje bygge, samma upplägg som extern/gdmaleri.
// Ingen egen kopia av sidorna i repot. Redigera alltid i web/app/(demo)/bromma/.
//
// Sökvägarna skrivs om till brommatradgardsservice.se: /bromma/ blir /, och undersidorna behåller
// samma slugs som den gamla statiska sajten (tradgardsskotsel, hackklippning, tradgardsskotsel-brf),
// så att indexerade URL:er finns kvar. Mediasökvägen /bromma/media/ behålls.
// Den gamla statiska sajten i bahkobyra/cloud/brommatradgardsservice/ rörs inte. Härifrån läses bara
// logotyper, ikoner och llms.txt, så att länkar till dem (Google-profilen, mejl) fortsätter fungera.
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HAR, '..', '..', 'web');
const GAMMAL = path.join(HAR, '..', '..', 'bahkobyra/cloud/brommatradgardsservice');
const KALLA = path.join(WEB, 'app/(demo)/bromma');
const GRUPP = path.join(HAR, 'app/(br)');
export const DOMAN = 'https://brommatradgardsservice.se';

// Demo-mapp = sökväg på domänen. En ny undersida i web/ som inte står här får bygget att faila med flit.
export const SLUGS = ['', 'snorojning', 'tradgardsskotsel', 'hackklippning', 'tradgardsskotsel-brf'];
// Filer ur den gamla sajten som ska ligga kvar i domänroten.
const ROTFILER = ['favicon.png', 'apple-touch-icon.png', 'og-image.png', 'logo.svg', 'logo-ljus.svg', 'logo.png', 'logo-ljus.png', 'symbol.svg', 'llms.txt'];

for (const mal of ['app/_mall', 'app/gdmaleri', 'app/(br)', 'typsnitt', 'komponenter', 'formular.js', 'public']) rmSync(path.join(HAR, mal), { recursive: true, force: true });

// Samma inbördes läge som i web/app/(demo)/, så att importerna fungerar orörda.
cpSync(path.join(WEB, 'app/(demo)/_mall'), path.join(HAR, 'app/_mall'), { recursive: true });
mkdirSync(path.join(HAR, 'app/gdmaleri'), { recursive: true });
cpSync(path.join(WEB, 'app/(demo)/gdmaleri/_gd.js'), path.join(HAR, 'app/gdmaleri/_gd.js'));
cpSync(path.join(WEB, 'app/typsnitt'), path.join(HAR, 'typsnitt'), { recursive: true });
cpSync(path.join(WEB, 'app/komponenter'), path.join(HAR, 'komponenter'), { recursive: true });
cpSync(path.join(WEB, 'app/formular.js'), path.join(HAR, 'formular.js'));
cpSync(path.join(WEB, 'public/bromma'), path.join(HAR, 'public/bromma'), { recursive: true });
for (const f of ROTFILER) cpSync(path.join(GAMMAL, f), path.join(HAR, 'public', f));

const byten = SLUGS.filter(Boolean).map((s) => [`/bromma/${s}/`, `/${s}/`]);
byten.push([`'/bromma/'`, `'/'`], ['`/bromma/`', '`/`']);
const skrivOm = (txt, slug) => {
  for (const [fran, till] of byten) txt = txt.split(fran).join(till);
  // Indexering på bara här (Mathias "Byt domän" 2026-11-09). Demon på bahkobyra.se har kvar noindex.
  const ren = 'robots: { index: false, follow: false },';
  if (slug !== undefined && txt.includes(ren)) txt = txt.split(ren).join(`alternates: { canonical: '${DOMAN}/${slug ? `${slug}/` : ''}' },`);
  // Schemats bild-URL:er pekar på bahkobyra.se så länge sajten bor där.
  return txt.split("const FILBAS = 'https://www.bahkobyra.se'").join(`const FILBAS = '${DOMAN}'`);
};

mkdirSync(GRUPP, { recursive: true });
for (const f of readdirSync(KALLA)) {
  const fil = path.join(KALLA, f);
  if (statSync(fil).isDirectory()) {
    if (!SLUGS.includes(f)) throw new Error(`okänd undersida ${f}: lägg till den i SLUGS (och i sitemap.js)`);
    mkdirSync(path.join(GRUPP, f), { recursive: true });
    for (const g of readdirSync(fil)) writeFileSync(path.join(GRUPP, f, g), skrivOm(readFileSync(path.join(fil, g), 'utf8'), g === 'page.js' ? f : undefined));
  } else writeFileSync(path.join(GRUPP, f), skrivOm(readFileSync(fil, 'utf8'), f === 'page.js' ? '' : undefined));
}
const sidor = readdirSync(GRUPP, { recursive: true }).filter((f) => f.endsWith('page.js'));
if (sidor.some((f) => readFileSync(path.join(GRUPP, f), 'utf8').includes('index: false'))) throw new Error('noindex kvar i en sida');
if (sidor.some((f) => !readFileSync(path.join(GRUPP, f), 'utf8').includes('canonical'))) throw new Error('en sida saknar canonical');
if (readdirSync(GRUPP, { recursive: true }).some((f) => f.endsWith('.js') && /['"`]\/bromma\/(?!media\b)/.test(readFileSync(path.join(GRUPP, f), 'utf8')))) throw new Error('en länk till /bromma/ finns kvar');
console.log('kopierade mallen, bromma-sidorna (', SLUGS.map((s) => `/${s}`).join(' '), '), public/bromma och rotfilerna');
