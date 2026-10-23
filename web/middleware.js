import { NextResponse } from 'next/server';

/* Kunddomän kakel0413.se (Mathias 2026-10-23): samma projekt (bahko-byra), ingen kopia.
   Besök på kakel0413.se/<sökväg> serveras från /kakel0413/<sökväg> (startsidan, /om-oss/ …).
   Matchern nedan kräver host kakel0413.se, så middleware körs INTE alls för
   bahkobyra.se, bahkobyra.cloud eller någon annan domän. next.config.mjs (🔒) är orörd.
   www.kakel0413.se 308-omdirigeras till apex i Vercels domäninställningar. */
const BAS = '/kakel0413';

export function middleware(req) {
  const { pathname } = req.nextUrl;
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
