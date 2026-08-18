/* Egen rot-layout för kunddemos.
   Poängen med route-gruppen: en demo som ligger inne i Next.js-appen ska INTE
   ärva Bahkos header, footer och popup. Två rot-layouter är Next.js egen
   lösning på det — (sajt) bär marknadssajten, (demo) bär kunddemos. URL:erna
   påverkas inte av gruppnamnen.

   Här finns medvetet ingen delad CSS: varje demo äger sin egen typografi och
   palett, och ska inte dra in bahkobyra.se:s globala stilar. */

export default function DemoLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
