// Hämtar GD Måleris sajt från web/ före varje bygge — ingen egen kopia av sidorna i repot.
// Se extern/README.md och content/kundarbete/gdmaleri/hemsida.md.
//
// Källan är fortfarande demon i web/app/(demo)/gdmaleri/ (den serveras kvar på
// bahkobyra.se/gdmaleri/ tills domänen är live). Här skrivs sökvägarna om till
// gdmaleri.se: /gdmaleri/ → /, och tjänstesidorna får WordPress-sajtens gamla
// slugs så att indexerade URL:er behålls (Mathias 2026-10-10).
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HAR, '..', '..', 'web');
const KALLA = path.join(WEB, 'app/(demo)/gdmaleri');
const GRUPP = path.join(HAR, 'app/(gd)');

// demo-mapp → sökväg på gdmaleri.se ('' = startsidan)
// 2026-10-13: fyra nya tjänstesidor. tapetsering och snickerier-fonster-malning är WordPress-sajtens gamla slugs
// (301:orna i next.config.mjs borttagna), fasadtvatt och taktvatt är nya.
// 2026-10-14: guidesidan basta-malare-stockholm ("Så väljer du målare"), ny.
// 2026-10-14: sju ortssidor, demo-mapp = slug. Sex är WordPress-sajtens gamla ortsslugs (308:orna till
// /fasad-malning/ i next.config.mjs borttagna), malare-sodertalje är ny.
export const SLUGS = { '': '', 'fasad': 'fasad-malning', 'tak': 'takmalning', 'invandig-malning': 'malning-invandigt', 'golv': 'golv', 'brf': 'brf', 'integritet': 'integritet', 'tapetsering': 'tapetsering', 'snickerier-fonster-malning': 'snickerier-fonster-malning', 'fasadtvatt': 'fasadtvatt', 'taktvatt': 'taktvatt', 'basta-malare-stockholm': 'basta-malare-stockholm', 'fasadmalning-bromma': 'fasadmalning-bromma', 'fasadmalning-taby': 'fasadmalning-taby', 'malare-sodertalje': 'malare-sodertalje', 'fasadmalning-lidingo': 'fasadmalning-lidingo', 'fasadmalning-sollentuna': 'fasadmalning-sollentuna', 'fasadmalning-huddinge': 'fasadmalning-huddinge', 'fasadmalning-danderyd': 'fasadmalning-danderyd' };

for (const mal of ['app/_mall', 'app/(gd)', 'typsnitt', 'komponenter', 'formular.js', 'public/gdmaleri']) rmSync(path.join(HAR, mal), { recursive: true, force: true });

// Mallen i app/_mall/ och sidorna i route-gruppen app/(gd)/ — samma inbördes läge som i web/app/(demo)/,
// så sidornas '../_mall' och mallens '../../typsnitt' / '../../komponenter' pekar rätt utan ändringar.
cpSync(path.join(WEB, 'app/(demo)/_mall'), path.join(HAR, 'app/_mall'), { recursive: true });
cpSync(path.join(WEB, 'app/typsnitt'), path.join(HAR, 'typsnitt'), { recursive: true });
cpSync(path.join(WEB, 'app/komponenter'), path.join(HAR, 'komponenter'), { recursive: true });
cpSync(path.join(WEB, 'app/formular.js'), path.join(HAR, 'formular.js'));
cpSync(path.join(WEB, 'public/gdmaleri'), path.join(HAR, 'public/gdmaleri'), { recursive: true });

// /gdmaleri/<demo-mapp>/ → /<slug>/ (längsta först, så att '/gdmaleri/' tas sist). Media (/gdmaleri/media/) rörs inte.
const byten = Object.entries(SLUGS).filter(([d]) => d).map(([d, s]) => [`/gdmaleri/${d}/`, `/${s}/`]);
byten.push([`'/gdmaleri/'`, `'/'`], ['`/gdmaleri/`', '`/`'], ['"/gdmaleri/"', '"/"']); // dubbla citattecken: integritet/page.js gav 404 på gdmaleri.se (auditen 2026-10-27)
const skrivOm = (txt, slug) => {
  for (const [fran, till] of byten) txt = txt.split(fran).join(till);
  // Indexering på (Mathias ja 2026-10-11): bara här, demon på bahkobyra.se 301:as bort. Self-canonical per sida.
  const ren = "robots: { index: false, follow: false },";
  if (slug !== undefined && txt.includes(ren)) txt = txt.split(ren).join(`alternates: { canonical: 'https://gdmaleri.se/${slug ? `${slug}/` : ''}' },`);
  // Schemats bild-URL:er pekar på bahkobyra.se så länge sajten bor där; här bor filerna på gdmaleri.se.
  return txt.split("const FILBAS = 'https://www.bahkobyra.se'").join("const FILBAS = 'https://gdmaleri.se'");
};

mkdirSync(GRUPP, { recursive: true });
for (const f of readdirSync(KALLA)) {
  const fil = path.join(KALLA, f);
  if (statSync(fil).isDirectory()) {
    if (!(f in SLUGS)) throw new Error(`okänd undersida ${f}: lägg till den i SLUGS`);
    mkdirSync(path.join(GRUPP, SLUGS[f]), { recursive: true });
    for (const g of readdirSync(fil)) writeFileSync(path.join(GRUPP, SLUGS[f], g), skrivOm(readFileSync(path.join(fil, g), 'utf8'), g === 'page.js' ? SLUGS[f] : undefined));
  } else writeFileSync(path.join(GRUPP, f), skrivOm(readFileSync(fil, 'utf8'), f === 'page.js' ? '' : undefined));
}
if (readdirSync(GRUPP, { recursive: true }).some((f) => f.endsWith('page.js') && readFileSync(path.join(GRUPP, f), 'utf8').includes('index: false'))) throw new Error('noindex kvar i en sida');
console.log('kopierade mallen, typsnitten, komponenterna, gdmaleri-sidorna (', Object.values(SLUGS).map((s) => `/${s}`).join(' '), ') och public/gdmaleri');
