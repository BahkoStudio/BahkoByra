import localFont from 'next/font/local';
import Script from 'next/script';
import '../globals.css';
import Header from '../komponenter/Header';
import Footer from '../komponenter/Footer';
import Rorelse from '../komponenter/Rorelse';
import Popup from '../komponenter/Popup';
import StickyBokning from '../komponenter/StickyBokning';

const outfit = localFont({
  /* Outfit, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '300', style: 'normal' },
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '500', style: 'normal' },
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '600', style: 'normal' },
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '700', style: 'normal' },
    { path: '../typsnitt/outfit-normal-variabel.woff2', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://www.bahkobyra.se'),
  title: {
    default: 'Webbdesign i Jönköping & Huskvarna | Hemsidor för hantverkare | Bahko Byrå',
    template: '%s | Bahko Byrå',
  },
  description:
    'Webbyrå i Huskvarna, Jönköping. Vi bygger hemsidor åt hantverkare och lokala företag. Ni får ett färdigt förslag inom 48 timmar och ser sidan innan ni bestämmer er.',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Bahko Byrå',
    images: ['/brand/logo-raster-16x9.png'],
  },
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
};

export const viewport = {
  themeColor: '#0A1628',
};

/* NAP-regeln: adress och nummer nedan ska vara tecken för tecken samma som i
   Google Företagsprofilen. Ändras det ena ändras det andra samma dag.
   Geo är geokodat från gatuadressen (Nominatim 2026-08-08). */
const organisationsSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://www.bahkobyra.se/#organization',
  name: 'Bahko Byrå',
  url: 'https://www.bahkobyra.se',
  logo: 'https://www.bahkobyra.se/brand/mark.svg',
  image: 'https://www.bahkobyra.se/brand/logo-raster-16x9.png',
  email: 'mathias@bahkobyra.se',
  telephone: '+46762540951',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kungsängsvägen 27',
    postalCode: '561 51',
    addressLocality: 'Huskvarna',
    addressRegion: 'Jönköpings län',
    addressCountry: 'SE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 57.78257,
    longitude: 14.24873,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '22:00',
  },
  description:
    'Webbyrå i Huskvarna, Jönköping, som bygger hemsidor åt hantverkare och lokala företag.',
  hasMap: 'https://g.page/r/CY8e778hr3z7EAE',
  knowsAbout: ['Webbdesign', 'Hemsidor för hantverkare', 'Lokal SEO', 'Google Företagsprofil', 'Google Ads'],
  slogan: 'Synlighet som säljer.',
  areaServed: [
    { '@type': 'City', name: 'Jönköping' },
    { '@type': 'City', name: 'Huskvarna' },
    { '@type': 'Country', name: 'Sverige' },
  ],
  sameAs: [
    'https://g.page/r/CY8e778hr3z7EAE',
    'https://www.instagram.com/bahkobyra1/',
    'https://www.instagram.com/bahkostudio/',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" className={outfit.variable}>
      <body style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationsSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-rorelse');" +
              "setTimeout(function(){var n=document.querySelectorAll('[data-avsloja],[data-trapp]');" +
              "for(var i=0;i<n.length;i++){n[i].classList.add('synlig')}},2500)",
          }}
        />
        <Rorelse />
        <Header />
        <main id="innehall">{children}</main>
        <Footer />
        <Popup />
        <StickyBokning />
        {/* GA4 med samtyckesbanner — samma fil som de statiska leadsidorna
            laddar, så mätningen bor på ett enda ställe. */}
        <Script src="/js/analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
