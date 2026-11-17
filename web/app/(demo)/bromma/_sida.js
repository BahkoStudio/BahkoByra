import DemoSida from '../_mall/DemoSida';
import { bas, tjanstSchema, faqSchema, smulorSchema, navUndersida } from './_br';
import SynligHero from './_synlig-hero';

// Gemensam rendering för landningssidorna: startsidans bas + sidans egna fält.
export function Landning({ sida, schema }) {
  const data = { ...bas, nav: navUndersida, ...sida };
  // Samma bild ska inte synas både i tjänstekorten och i jobbslingan.
  const iKort = new Set((data.tjanster?.kort || []).map((k) => k.bild));
  data.jobb = { ...data.jobb, rad1: data.jobb.rad1.filter((b) => !iKort.has(b.src)), rad2: data.jobb.rad2.filter((b) => !iKort.has(b.src)) };
  return (
    <>
      <SynligHero />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tjanstSchema(schema)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(data.fragor.lista)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(smulorSchema(schema.slug, schema.namn)) }} />
      <DemoSida data={data} />
    </>
  );
}
