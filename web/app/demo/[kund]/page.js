import { DEMOS, hamta } from '../_data/index.js';
import { validera } from '../_data/_schema.js';
import { Sida, paletCss } from '../_kit/v1/index.js';

/* Statiskt byggda, och en okänd slug ger 404 i stället för rendering vid
   anrop — ingen ska kunna gissa sig till en demo som inte finns. */
export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * Bara demos som validerar byggs.
 *
 * Det här är den mjuka halvan av "fail loud i verktyget, fail soft i bygget":
 * en trasig datafil ska ALDRIG kunna fälla `next build` och därmed stoppa
 * uppdateringar av bahkobyra.se. Den högljudda halvan är
 * `node tools/demo/validera.mjs`, som körs före push och skriker.
 */
export function generateStaticParams() {
  return DEMOS
    .filter((d) => {
      const r = validera(d);
      if (!r.ok) {
        console.warn(`[demo] "${d.slug}" hoppas över i bygget:\n  ${r.fel.join('\n  ')}`);
      }
      return r.ok;
    })
    .map((d) => ({ kund: d.slug }));
}

export async function generateMetadata({ params }) {
  const { kund } = await params;
  const d = hamta(kund);
  if (!d) return {};
  return {
    // absolute bryter rot-layoutens "%s | Bahko Byrå" — demon är kundens sajt.
    title: { absolute: d.seo.titel },
    description: d.seo.beskrivning,
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: null },
    openGraph: { title: d.seo.titel, description: d.seo.beskrivning, images: [d.hero.poster] },
  };
}

export async function generateViewport({ params }) {
  const { kund } = await params;
  return { themeColor: hamta(kund)?.varumarke.palett.bas || '#0A1628', colorScheme: 'dark' };
}

export default async function DemoSida({ params }) {
  const { kund } = await params;
  const demo = hamta(kund);
  return (
    <>
      {/* Kundens palett skriver över Bahkos tokens, scopat till demons rot. */}
      <style href={`palett-${demo.slug}`} precedence="high">{paletCss(demo)}</style>
      <Sida demo={demo} />
    </>
  );
}
