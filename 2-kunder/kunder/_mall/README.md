# Mall för en ny kund i `2-kunder/kunder/`

Skapa de fyra filerna nedan när en ny kund läggs till. Använd de
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

## När kunden är upplagd
- Kundresan och SOP:erna: `2-kunder/README.md` (onboarding, leverans, rapporter, retention).
- `andringar.md` skapas vid kundens första ändringsönskan (datum, vad, status), se
  `2-kunder/leverans-support/SOP.md`.
- Rapportdagen läggs in i `web/public/crm-f2822a6f3a/atagande.json`.
