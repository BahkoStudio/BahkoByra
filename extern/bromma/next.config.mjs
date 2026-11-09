/** @type {import('next').NextConfig} */
// 301:or från den gamla statiska sajten på brommatradgardsservice.se (sitemap och filer hämtade 2026-11-09).
// Startsidan och de tre undersidorna (tradgardsskotsel, hackklippning, tradgardsskotsel-brf) har samma URL
// som förut och behöver ingen regel. Här fångas bara index.html-varianterna och de gamla mediafilerna.
const BILDER = ['anlagd-tradgard-planteringar', 'efter-klippt-grasmatta-rabatter', 'fore-igenvuxen-tradgard', 'nyanlagd-grasmatta-skarpa-kanter', 'nyplanterad-hack-raka-linjer'];
const SAKERHETSHEADERS = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: SAKERHETSHEADERS }];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', statusCode: 301 },
      ...['tradgardsskotsel', 'hackklippning', 'tradgardsskotsel-brf'].map((s) => ({ source: `/${s}/index.html`, destination: `/${s}/`, statusCode: 301 })),
      // Demoadressens prefix, om någon länkat /bromma/... på domänen. Media ligger kvar under /bromma/media/.
      { source: '/bromma', destination: '/', statusCode: 301 },
      ...['snorojning', 'tradgardsskotsel', 'hackklippning', 'tradgardsskotsel-brf'].map((s) => ({ source: `/bromma/${s}/:rest*`, destination: `/${s}/`, statusCode: 301 })),
      // Gamla bilderna finns kvar som webp med samma namn.
      ...BILDER.map((b) => ({ source: `/media/${b}.jpg`, destination: `/bromma/media/${b}.webp`, statusCode: 301 })),
      { source: '/media/:fil*', destination: '/', statusCode: 301 },
    ];
  },
};

export default nextConfig;
