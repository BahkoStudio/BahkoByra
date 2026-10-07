// Hämtar demon från web/ före varje bygge — ingen egen kopia av sidan i repot.
// Se extern/README.md.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HAR, '..', '..', 'web');
const KUND = 'rolssons';

for (const mal of ['app/_mall', 'app/_sida', 'typsnitt', 'komponenter', 'formular.js', `public/${KUND}`]) rmSync(path.join(HAR, mal), { recursive: true, force: true });
mkdirSync(path.join(HAR, 'app/_sida'), { recursive: true });

// page.js importerar '../_mall/DemoSida' — därför ligger sidan i app/_sida/ och mallen i app/_mall/ (understreck = ingen egen route).
cpSync(path.join(WEB, 'app/(demo)/_mall'), path.join(HAR, 'app/_mall'), { recursive: true });
// Mallens typsnitt laddas lokalt med sökvägen '../../typsnitt/' (web/app/typsnitt/, se LASMIG.md där).
// Från app/_mall/ här pekar samma sökväg på projektroten, så mappen kopieras dit.
cpSync(path.join(WEB, 'app/typsnitt'), path.join(HAR, 'typsnitt'), { recursive: true });
// Mallen importerar '../../komponenter/DemoFormular' (sedan #215, 2026-09-22). Utan den här raden föll
// varje bygge här, och HG och R. Olssons stod kvar på en version utan formuläret i 15 dagar.
cpSync(path.join(WEB, 'app/komponenter'), path.join(HAR, 'komponenter'), { recursive: true });
cpSync(path.join(WEB, 'app/formular.js'), path.join(HAR, 'formular.js'));   // DemoFormular importerar '../formular'
cpSync(path.join(WEB, 'app/(demo)', KUND, 'page.js'), path.join(HAR, 'app/_sida/page.js'));
cpSync(path.join(WEB, 'public', KUND), path.join(HAR, 'public', KUND), { recursive: true });
console.log(`kopierade mallen, typsnitten, komponenterna, ${KUND}/page.js och public/${KUND}`);
