import Matning from './Matning';

// Rot-layout för brommatradgardsservice.se. Ikonerna och delningsbilden är samma filer som på den gamla sajten.
export const metadata = {
  metadataBase: new URL('https://brommatradgardsservice.se'),
  icons: { icon: [{ url: '/symbol.svg', type: 'image/svg+xml' }, { url: '/favicon.png', type: 'image/png' }], apple: '/apple-touch-icon.png' },
  openGraph: { type: 'website', locale: 'sv_SE', siteName: 'Bromma Trädgårdsservice', images: ['/og-image.png'] },
};

export default function Layout({ children }) {
  return (
    <html lang="sv">
      <body>
        {children}
        <Matning />
      </body>
    </html>
  );
}
