// Hämtar demon från web/ före varje bygge — ingen egen kopia av sidan i repot.
// Se extern/README.md.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HAR, '..', '..', 'web');
const KUND = 'rolssons';

for (const mal of ['app/_mall', 'app/_sida', `public/${KUND}`]) rmSync(path.join(HAR, mal), { recursive: true, force: true });
mkdirSync(path.join(HAR, 'app/_sida'), { recursive: true });

// page.js importerar '../_mall/DemoSida' — därför ligger sidan i app/_sida/ och mallen i app/_mall/ (understreck = ingen egen route).
cpSync(path.join(WEB, 'app/(demo)/_mall'), path.join(HAR, 'app/_mall'), { recursive: true });
cpSync(path.join(WEB, 'app/(demo)', KUND, 'page.js'), path.join(HAR, 'app/_sida/page.js'));
cpSync(path.join(WEB, 'public', KUND), path.join(HAR, 'public', KUND), { recursive: true });
console.log(`kopierade mallen, ${KUND}/page.js och public/${KUND}`);
