# Mall för en ny kund i `kundarbete/`

Kopiera detta mönster (fyra filer) när en ny kund läggs till. Använd de
befintliga kunderna som facit för hur mycket varje fil ska innehålla —
`bromma/` är fullt ifylld, `smamaleri/` och `maykaskitchen/` visar hur en
TODO-stub ser ut när uppgifter saknas.

## `hemsida.md`
Live-URL, källkod i repot (om sajten byggts av Bahko Byrå), Vercel-inställning
om relevant, 🔒-status, kort om vem som är kontaktperson.

## `struktur.md`
Sidlista byggd ur sajtens `sitemap.xml` + sidtitlar — inte gissad. Uppdateras
när sajten ändras.

## `drive.md`
Länken till kundens delade Drive-mapp (eller monterad sökväg) + mappstrukturen
inuti. Om ingen Drive-mapp finns än: skriv TODO, gissa aldrig fram en struktur.

## `seo-geo-aeo.md`
Kundens SEO/lokal-SEO/GEO/AEO-underlag — åtgärdspaket, tillväxtsidor,
Google Företagsprofil-status. Om inget finns än: skriv TODO.

## Regler
- Rör aldrig 🔒-märkt sajtkod (`docs/heligt.md`) — dessa filer REFERERAR till
  koden, de flyttar den aldrig.
- Hitta aldrig på uppgifter (Drive-länkar, kontaktpersoner, siffror) — TODO är
  alltid rätt svar när underlag saknas.
- Producerat content (inlägg, mallar, rapporter) får gärna ligga som egna
  undermappar bredvid de fyra filerna, som i `bromma/` — mallen ovan är ett
  golv, inte ett tak.
