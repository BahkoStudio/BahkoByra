/** @type {import('next').NextConfig} */
// 301:or från den gamla WordPress-sajten på gdmaleri.se (sitemap hämtad 2026-10-10).
// Tjänstesidorna fasad-malning, takmalning, malning-invandigt, tapetsering och
// snickerier-fonster-malning finns kvar på samma slug (de två sista egna sidor igen sedan 2026-10-13).
// Den gamla WordPress-installationen flyttas till v1.gdmaleri.se — en ANNAN host, så
// reglerna här (som bara gäller gdmaleri.se/www) krockar inte med den.
const till = (mal) => (sokvagar) => sokvagar.map((s) => ({ source: `/${s}/`, destination: mal, permanent: true }));
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      ...till('/')(['vara-tjanster', 'offert', 'kontakta-oss', 'om-oss', 'galleri', 'utforda-arbeten']),
      // Bredspackling och tapetborttagning bor på tapetseringssidan.
      ...till('/tapetsering/')(['bredspackling-tapetborttagning']),
      // Ortssidorna (/fasadmalning-bromma/, -taby/, -danderyd/, -huddinge/, -lidingo/, -sollentuna/) är egna
      // sidor igen sedan 2026-10-14 (Search Console: visningar på plats 8–15); 308:orna till /fasad-malning/ borttagna.
      // WordPress-filer och flöden som kan vara länkade/indexerade.
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: 'https://v1.gdmaleri.se/wp-admin/:path*', permanent: false },
      { source: '/feed/', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
