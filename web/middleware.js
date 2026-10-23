import { NextResponse } from 'next/server';

/* Kunddomän kakel0413.se (Mathias 2026-10-23): samma projekt (bahko-byra), ingen kopia.
   Besök på kakel0413.se/<sökväg> serveras från /kakel0413/<sökväg> (startsidan, /om-oss/ …).
   Matchern nedan kräver host kakel0413.se, så middleware körs INTE alls för
   bahkobyra.se, bahkobyra.cloud eller någon annan domän. next.config.mjs (🔒) är orörd.
   www.kakel0413.se 308-omdirigeras till apex i Vercels domäninställningar. */
const BAS = '/kakel0413';

// STÄNGD (Mathias 2026-10-23): Nuh vill ha sajten nere tills företaget öppnar. Sätt till false för att öppna igen.
const STANGD = true;

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (STANGD) {
    if (pathname === '/robots.txt') return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    return new NextResponse('', { status: 503, headers: { 'retry-after': '86400', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' } });
  }
  // Egen robots.txt och sitemap för kunddomänen (annars visas bahkobyra.se:s).
  if (pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nAllow: /\nSitemap: https://kakel0413.se/sitemap.xml\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  if (pathname === '/sitemap.xml') {
    const sidor = ['https://kakel0413.se/', 'https://kakel0413.se/om-oss/'];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sidor.map((u) => `<url><loc>${u}</loc></url>`).join('')}</urlset>\n`;
    return new NextResponse(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
  }
  // Rena adresser: /kakel0413/<sida> → 308 till /<sida> på kunddomänen. Media och filer med ändelse
  // (t.ex. /kakel0413/media/logo.webp) lämnas orörda nedan.
  if ((pathname === BAS || pathname.startsWith(`${BAS}/`)) && !pathname.startsWith(`${BAS}/media/`) && !/\.[a-z0-9]+$/i.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(BAS.length) || '/';
    return NextResponse.redirect(url, 308);
  }
  // Redan under /kakel0413 (t.ex. media, gamla länkar), Next-filer eller filer med ändelse: orört.
  if (pathname === BAS || pathname.startsWith(`${BAS}/`) || pathname.startsWith('/_next') || /\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = `${BAS}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [{ source: '/:path*', has: [{ type: 'host', value: '(www\\.)?kakel0413\\.se' }] }],
};
