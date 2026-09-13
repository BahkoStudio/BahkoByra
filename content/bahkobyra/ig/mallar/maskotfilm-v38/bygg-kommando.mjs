// Skriver sandlådekommandot för en film: skriptet (base64) + argument. node bygg-kommando.mjs <1|2> <clip1-url> <clip2-url>
import { readFileSync, writeFileSync } from 'node:fs';
const [n, c1, c2] = process.argv.slice(2);
const k = JSON.parse(readFileSync('uppladdningar.json', 'utf8'));
const skript = readFileSync('bygg-maskotfilm-sandlada.sh', 'utf8').replace(/\r\n/g, '\n');
const b64 = Buffer.from(skript).toString('base64');
const T = [0, 1, 2, 3, 4, 5].map((i) => k[`f${n}-t${i}`].url);
const args = [n, c1, c2, ...T, k['wm'].url, k['outro-bg'].url, k[`reel${n}.mp4`].upload_url].map((a) => `'${a}'`).join(' ');
const cmd = `echo ${b64} | base64 -d > /home/user/bygg.sh && chmod +x /home/user/bygg.sh && /home/user/bygg.sh ${args} > /home/user/bygg${n}.log 2>&1; tail -5 /home/user/bygg${n}.log`;
writeFileSync(`kommando-${n}.txt`, cmd);
console.log('kommando-' + n + '.txt', cmd.length, 'tecken');
