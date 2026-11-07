import { NextResponse } from 'next/server';

/* Kunddomäner i samma projekt (bahko-byra), ingen kopia per kund.
   kakel0413.se (Mathias 2026-10-23) och proffsmaskiner.se (kund 2026-10-28).
   Besök på <kunddomän>/<sökväg> serveras från /<mapp>/<sökväg>. Matchern nedan kräver en av
   kunddomänerna som host, så middleware körs INTE alls för bahkobyra.se, bahkobyra.cloud eller
   någon annan domän. next.config.mjs (🔒) är orörd. www-varianterna 308-omdirigeras till apex
   i Vercels domäninställningar. */
const KUNDER = {
  'kakel0413.se': {
    bas: '/kakel0413',
    // STÄNGD (Mathias 2026-10-23): Nuh vill ha sajten nere tills företaget öppnar. Sätt till false för att öppna igen.
    stangd: true,
    sidor: ['https://kakel0413.se/', 'https://kakel0413.se/om-oss/'],
  },
  'proffsmaskiner.se': {
    bas: '/proffsmaskiner',
    stangd: false,
    sidor: ['https://proffsmaskiner.se/'],
    // Enkelsida: gamla WordPress-adresser (/om-oss/, /maskiner/, /kontakt/, /hyra-snoskoter/)
    // och allt annat utan filändelse går med 301 till startsidan.
    enkelsida: true,
  },
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0].replace(/^www\./, '');
  const kund = KUNDER[host];
  if (!kund) return NextResponse.next();
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
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${kund.sidor.map((u) => `<url><loc>${u}</loc></url>`).join('')}</urlset>\n`;
    return new NextResponse(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
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
  matcher: [{ source: '/:path*', has: [{ type: 'host', value: '(www\\.)?(kakel0413|proffsmaskiner)\\.se' }] }],
};
