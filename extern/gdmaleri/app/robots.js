// noindex står kvar i sidornas metadata tills Ghandi bekräftat (se content/kundarbete/gdmaleri/hemsida.md).
// robots.txt släpper ändå in crawlers, så att noindex läses och sitemapen hittas när den tas bort.
export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://gdmaleri.se/sitemap.xml' };
}
