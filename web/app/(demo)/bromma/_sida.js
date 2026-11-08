import DemoSida from '../_mall/DemoSida';
import { bas, tjanstSchema, faqSchema, navUndersida } from './_br';

// Gemensam rendering för landningssidorna: startsidans bas + sidans egna fält.
export function Landning({ sida, schema }) {
  const data = { ...bas, nav: navUndersida, ...sida };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tjanstSchema(schema)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(data.fragor.lista)) }} />
      <DemoSida data={data} />
    </>
  );
}
