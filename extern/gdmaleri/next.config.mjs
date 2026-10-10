/** @type {import('next').NextConfig} */
// 301:or från den gamla WordPress-sajten på gdmaleri.se (sitemap hämtad 2026-10-10).
// Tjänstesidorna fasad-malning, takmalning och malning-invandigt finns kvar på samma slug.
// Den gamla WordPress-installationen flyttas till v1.gdmaleri.se — en ANNAN host, så
// reglerna här (som bara gäller gdmaleri.se/www) krockar inte med den.
const till = (mal) => (sokvagar) => sokvagar.map((s) => ({ source: `/${s}/`, destination: mal, permanent: true }));
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      ...till('/')(['vara-tjanster', 'offert', 'kontakta-oss', 'om-oss', 'galleri', 'utforda-arbeten']),
      ...till('/malning-invandigt/')(['tapetsering', 'bredspackling-tapetborttagning']),
      // Ortssidorna: ingen egen sida än (se content/leads/gdmaleri.md punkt 6) — till fasadsidan tills vidare.
      ...till('/fasad-malning/')(['snickerier-fonster-malning', 'fasadmalning-bromma', 'fasadmalning-taby', 'fasadmalning-danderyd', 'fasadmalning-huddinge', 'fasadmalning-lidingo', 'fasadmalning-sollentuna']),
      // WordPress-filer och flöden som kan vara länkade/indexerade.
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: 'https://v1.gdmaleri.se/wp-admin/:path*', permanent: false },
      { source: '/feed/', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
