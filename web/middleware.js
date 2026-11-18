import { NextResponse } from 'next/server';

/* Kunddomäner i samma projekt (bahko-byra), ingen kopia per kund.
   kakel0413.se (Mathias 2026-10-23) och proffsmaskiner.se (kund 2026-10-28).
   Besök på <kunddomän>/<sökväg> serveras från /<mapp>/<sökväg> (startsidan från /<mapp>/kund/).
   Matchern nedan kräver en av kunddomänerna som host, så middleware körs INTE för bahkobyra.se,
   bahkobyra.cloud eller någon annan domän, utom för den interna sökvägen /<mapp>/kund/.
   next.config.mjs (🔒) är orörd. www-varianterna 308-omdirigeras till apex
   i Vercels domäninställningar. */
const KUNDER = {
  'kakel0413.se': {
    bas: '/kakel0413',
    // Öppnad igen (Mathias 2026-11-10). Var stängd 2026-10-23 till 2026-11-10 på Nuhs begäran.
    stangd: false,
    // /om-oss/ borttagen 2026-11-10 (omdirigeras till startsidan), därför inte i sitemapen.
    sidor: ['https://kakel0413.se/', 'https://kakel0413.se/kakelarbete-eslov/'],
    // Undersidor som bara finns på kunddomänen (statisk metadata med index och canonical), serveras
    // från /<mapp>/kund/<sida>/. kakelarbete-eslov: SEO 2026-11-18 (Mathias, "kakelarbete Eslöv").
    kundsidor: ['/kakelarbete-eslov'],
    // llms.txt och favicon i roten (filerna ligger under /kakel0413/), SEO 2026-11-17.
    rotfiler: true,
  },
  'proffsmaskiner.se': {
    bas: '/proffsmaskiner',
    stangd: false,
    sidor: ['https://proffsmaskiner.se/'],
    lastmod: '2026-11-17',
    rotfiler: true,
    // Enkelsida: gamla WordPress-adresser (/om-oss/, /maskiner/, /kontakt/, /hyra-snoskoter/)
    // och allt annat utan filändelse går med 301 till startsidan.
    enkelsida: true,
  },
};

// Kunddomänens startsida serveras från /<mapp>/kund/ (statisk metadata med index och canonical, så att
// den hamnar i <head>; SEO 2026-11-17). Den sökvägen ska bara nås via omskrivningen nedan: direkta
// besök på /<mapp>/kund/ (från vilken domän som helst) skickas till /<mapp>/ resp. kunddomänens /.
const KUNDSTART = '/kund';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0].replace(/^www\./, '');
  const kund = KUNDER[host];
  if (!kund) {
    // Andra domäner (bahkobyra.se m.fl.): matchern släpper bara igenom /<mapp>/kund/ hit.
    const mapp = Object.values(KUNDER).find((k) => pathname === `${k.bas}${KUNDSTART}` || pathname.startsWith(`${k.bas}${KUNDSTART}/`));
    if (!mapp) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `${mapp.bas}/`;
    url.search = '';
    return NextResponse.redirect(url, 308);
  }
  const BAS = kund.bas;

  if (kund.stangd) {
    if (pathname === '/robots.txt') return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    return new NextResponse('', { status: 503, headers: { 'retry-after': '86400', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' } });
  }
  // Egen robots.txt och sitemap för kunddomänen (annars visas bahkobyra.se:s).
  if (pathname === '/robots.txt') {
    return new NextResponse(`User-agent: *\nAllow: /\nSitemap: https://${host}/sitemap.xml\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  if (pathname === '/sitemap.xml') {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${kund.sidor.map((u) => `<url><loc>${u}</loc>${kund.lastmod ? `<lastmod>${kund.lastmod}</lastmod>` : ''}</url>`).join('')}</urlset>\n`;
    return new NextResponse(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
  }
  // llms.txt och favicon i roten (filerna ligger under /<mapp>/), för kunder med rotfiler.
  if (kund.rotfiler && pathname === '/llms.txt') {
    const url = req.nextUrl.clone();
    url.pathname = `${BAS}/llms.txt`;
    return NextResponse.rewrite(url);
  }
  if (kund.rotfiler && (pathname === '/favicon.ico' || pathname === '/icon.png' || pathname === '/apple-touch-icon.png')) {
    const url = req.nextUrl.clone();
    url.pathname = `${BAS}/media${pathname}`;
    return NextResponse.rewrite(url);
  }
  // Rena adresser: /<mapp>/<sida> → 308 till /<sida> på kunddomänen. Media och filer med ändelse
  // (t.ex. /<mapp>/media/logo.webp) lämnas orörda nedan.
  if ((pathname === BAS || pathname.startsWith(`${BAS}/`)) && !pathname.startsWith(`${BAS}/media/`) && !/\.[a-z0-9]+$/i.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(BAS.length) || '/';
    return NextResponse.redirect(url, 308);
  }
  // Redan under /<mapp> (t.ex. media, gamla länkar), Next-filer eller filer med ändelse: orört.
  if (pathname === BAS || pathname.startsWith(`${BAS}/`) || pathname.startsWith('/_next') || /\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }
  // /kund/ är bara en intern sökväg för startsidan, inte en egen sida på kunddomänen.
  if (pathname === KUNDSTART || pathname.startsWith(`${KUNDSTART}/`)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url, 308);
  }
  // Undersidor som bara finns på kunddomänen (se kundsidor ovan).
  const kundsida = (kund.kundsidor || []).find((p) => pathname === p || pathname === `${p}/`);
  if (kundsida) {
    const url = req.nextUrl.clone();
    url.pathname = `${BAS}${KUNDSTART}${kundsida}/`;
    return NextResponse.rewrite(url);
  }
  // Startsidan: den statiska kundsidan (se KUNDSTART ovan).
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `${BAS}${KUNDSTART}/`;
    return NextResponse.rewrite(url);
  }
  // Enkelsida: allt som inte är startsidan går till startsidan (gamla WordPress-länkar).
  if (kund.enkelsida && pathname !== '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url, 301);
  }
  const url = req.nextUrl.clone();
  url.pathname = `${BAS}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    { source: '/:path*', has: [{ type: 'host', value: '(www\\.)?(kakel0413|proffsmaskiner)\\.se' }] },
    // Den interna startsidan /<mapp>/kund/ på alla andra domäner (skickas vidare ovan).
    '/kakel0413/kund/:path*',
    '/proffsmaskiner/kund/:path*',
  ],
};
