import { Outfit } from 'next/font/google';
import './globals.css';
import Header from './komponenter/Header';
import Footer from './komponenter/Footer';
import Popup from './komponenter/Popup';

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
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
};

export const viewport = {
  themeColor: '#0A1628',
};

const organisationsSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': 'https://www.bahkobyra.se/#organization',
  name: 'Bahko Byrå',
  url: 'https://www.bahkobyra.se',
  logo: 'https://www.bahkobyra.se/brand/mark.svg',
  image: 'https://www.bahkobyra.se/brand/logo-raster-16x9.png',
  email: 'mathias@bahkobyra.se',
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
      </body>
    </html>
  );
}
