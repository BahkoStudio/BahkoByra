/**
 * Routingkontraktet från gamla vercel.json, portat rakt av.
 * Varje regel här motsvarar en URL som redan finns ute i världen (demolänkar i
 * prospekts inkorgar, kunddomäner, gamla kliniker-länkar). Ändra inget utan att
 * först läsa "Heligt" i CLAUDE.md.
 */

const SAKERHETSHEADERS = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const CLOUD_VARDAR = [
  { type: 'host', value: 'bahkobyra.cloud' },
  { type: 'host', value: 'www.bahkobyra.cloud' },
];

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Repo-roten har en egen package-lock.json for de gamla verktygen. Utan detta
// gissar Next.js att workspace-roten ligger dar och sparfoljer fel filer.
const HAR = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: HAR,
  trailingSlash: true,
  poweredByHeader: false,

  async headers() {
    return [{ source: '/:path*', headers: SAKERHETSHEADERS }];
  },

  async redirects() {
    return [
      // Kliniker-eran: sidorna bytte katalog, länkarna lever kvar.
      { source: '/kliniker/gratis-granskning.html', destination: '/foretag/gratis-granskning.html', permanent: true },
      { source: '/kliniker/gratis-guide.html', destination: '/foretag/gratis-guide.html', permanent: true },
      // Kundsajterna bor på egna domäner. Den lokala kopian får aldrig serveras
      // som duplicate content bredvid kundens riktiga sajt.
      { source: '/cloud/brommatradgardsservice', destination: 'https://brommatradgardsservice.se/', permanent: true },
      { source: '/cloud/brommatradgardsservice/:path*', destination: 'https://brommatradgardsservice.se/', permanent: true },
      { source: '/cloud/smamaleri', destination: 'https://smamaleri.se/', permanent: true },
      { source: '/cloud/smamaleri/:path*', destination: 'https://smamaleri.se/', permanent: true },
      // Shabifix byggdes om som Next.js-route 2026-08-18 (Mathias beslut: alla
      // demo-recopy/hemsidor-demos i Next.js). Gamla länken är skickad till
      // prospektet och får aldrig brytas — den pekas om hit.
      { source: '/cloud/shabifix', destination: '/shabifix/', permanent: true },
      { source: '/cloud/shabifix/:path*', destination: '/shabifix/', permanent: true },
      // Glowing Service byggdes om som måleri-demo 2026-08-19 (första var fel
      // nisch — städ). Gamla länken är skickad till Yoro och pekas om hit.
      // Statiska filen ligger kvar som scroll-cinematic-kodreferens men serveras
      // aldrig: redirects körs före filsystemet.
      { source: '/cloud/glowingservice', destination: '/glowingservice/', permanent: true },
      { source: '/cloud/glowingservice/:path*', destination: '/glowingservice/', permanent: true },
      // Raderad förpivot-artefakt.
      { source: '/pitchdeck.html', destination: '/', permanent: true },
    ];
  },

  async rewrites() {
    return {
      // Körs före filsystemet: värdbaserad routing för bahkobyra.cloud.
      beforeFiles: [
        ...CLOUD_VARDAR.map((has) => ({ source: '/', has: [has], destination: '/cloud/bygg/index.html' })),
        ...CLOUD_VARDAR.map((has) => ({
          source: '/elara-klinik-demo-v2.html',
          has: [has],
          destination: '/cloud/bygg/index.html',
        })),
        { source: '/cloud/elara-klinik-demo-v2.html', destination: '/cloud/bygg/index.html' },
        { source: '/cloud', destination: '/cloud/bygg/index.html' },
      ],
      // Körs efter filsystemet, så riktiga filer (css, bilder, js) serveras direkt.
      // Först när en katalogsökväg inte matchar någon fil pekas den mot sin index.html.
      afterFiles: [
        { source: '/cloud/:path*', destination: '/cloud/:path*/index.html' },
        { source: '/crm-f2822a6f3a', destination: '/crm-f2822a6f3a/index.html' },
        { source: '/crm-f2822a6f3a/:path*', destination: '/crm-f2822a6f3a/:path*/index.html' },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
