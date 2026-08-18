import { Outfit } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import Header from '../komponenter/Header';
import Footer from '../komponenter/Footer';
import Popup from '../komponenter/Popup';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://www.bahkobyra.se'),
  title: {
    default: 'Bahko Byrå — hemsidor som ger bygg- och hantverksfirmor fler jobb',
    template: '%s | Bahko Byrå',
  },
  description:
    'Vi bygger hemsidor för bygg- och hantverksfirmor i Sverige. Du får ett färdigt förslag inom 48 timmar och ser sidan innan du bestämmer dig.',
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
  '@type': ['Organization', 'LocalBusiness'],
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
    opens: '09:00',
    closes: '18:00',
  },
  description:
    'Digital byrå som bygger hemsidor för bygg- och hantverksfirmor i Sverige.',
  slogan: 'Synlighet som säljer.',
  areaServed: 'SE',
  sameAs: [
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
        <Header />
        <main id="innehall">{children}</main>
        <Footer />
        <Popup />
        {/* GA4 med samtyckesbanner — samma fil som de statiska leadsidorna
            laddar, så mätningen bor på ett enda ställe. */}
        <Script src="/js/analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
