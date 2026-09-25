// Exempel: Higgsfields officiella SDK, Seedance 2.5 text-to-video.
// Kör:  cd tools/hf-api && npm run exempel
//
// Nyckeln läses från tools/hf-api/.env.local (HF_CREDENTIALS=nyckel-id:hemlighet).
// Filen ignoreras av Git, och nyckeln skrivs aldrig ut.
// KÖR INTE: Seedance 2.5 är för dyr (Mathias 2026-09-23). Filen visar bara hur SDK:t används.
// Kontrollera nyckeln gratis med:  node tools/hf-api/hf.mjs test

import { config as laddaEnv } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config, higgsfield } from '@higgsfield/client/v2';

const HAR = dirname(fileURLToPath(import.meta.url));
laddaEnv({ path: join(HAR, '.env.local'), quiet: true });

const nyckel = process.env.HF_CREDENTIALS?.trim();
if (!nyckel || !/^[^:\s]+:[^:\s]+$/.test(nyckel)) {
  console.error('HF_CREDENTIALS saknas eller har fel format i tools/hf-api/.env.local (ska vara nyckel-id:hemlighet).');
  process.exit(2);
}
config({ credentials: nyckel });

const MODELL = 'bytedance/seedance-2.5/text-to-video';

try {
  const svar = await higgsfield.subscribe(MODELL, {
    input: {
      prompt: 'A cinematic scene at sunset',
      duration: 5,
      resolution: '720p',
      aspect_ratio: '16:9',
    },
    withPolling: true,
  });

  if (svar.status === 'completed' && svar.video?.url) {
    console.log(`Klar. request_id: ${svar.request_id}`);
    console.log(`Video: ${svar.video.url}`);
  } else if (svar.status === 'nsfw') {
    console.error(`Stoppad av moderering (nsfw). request_id: ${svar.request_id}. Ingen debitering.`);
    process.exit(1);
  } else if (svar.status === 'failed') {
    console.error(`Genereringen misslyckades. request_id: ${svar.request_id}. Ingen debitering.`);
    process.exit(1);
  } else {
    console.error(`Oväntat svar, status "${svar.status}", ingen video-URL. request_id: ${svar.request_id}`);
    process.exit(1);
  }
} catch (fel) {
  // SDK:t väntar inte in "canceled" — en avbruten förfrågan slutar som TimeoutError här.
  const namn = fel?.name || 'Fel';
  const status = fel?.response?.status ? ` (HTTP ${fel.response.status})` : '';
  const detalj = fel?.response?.data ? ` ${JSON.stringify(fel.response.data).slice(0, 300)}` : '';
  console.error(`${namn}${status}: ${fel?.message || fel}${detalj}`);
  process.exit(1);
}
