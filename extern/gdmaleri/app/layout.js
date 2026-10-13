/* Rot-layout för gdmaleri.se. Sidorna kommer från web/app/(demo)/gdmaleri/ (kopiera.mjs).

   Mätning (2026-10-13, Mathias: "sätt upp analytics och gsc för gdmaleri"):
   - GDMALERI_GA_ID   = GA4:s mät-ID (G-XXXXXXXXXX) från Vercel-miljön. Skrivs till
                        window.GD_GA_ID; /gdmaleri/js/analytics.js laddar GA4 först
                        när besökaren sagt ja i samtyckesrutan. Utan variabeln: ingen
                        ruta, inga cookies, ingen mätning.
   - GDMALERI_GSC_META = innehållet i Search Consoles meta-tagg (HTML-taggmetoden), om
                        domänverifieringen via DNS inte räcker. Valfri.
   Ingen av dem ligger i repot (publikt). Ett nytt värde kräver en ny deploy. */
const GA_ID = process.env.GDMALERI_GA_ID || '';
const GSC_META = process.env.GDMALERI_GSC_META || '';

export default function Layout({ children }) {
  return (
    <html lang="sv">
      <head>
        {GSC_META ? <meta name="google-site-verification" content={GSC_META} /> : null}
      </head>
      <body>
        {children}
        {GA_ID ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: `window.GD_GA_ID=${JSON.stringify(GA_ID)};` }} />
            <script src="/gdmaleri/js/analytics.js" defer />
          </>
        ) : null}
      </body>
    </html>
  );
}
