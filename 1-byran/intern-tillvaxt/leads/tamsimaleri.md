# Tamsi Måleri AB · måleri i Stockholm och Södermanland

**Demo:** https://www.bahkobyra.se/tamsimaleri/ (källa: `web/app/(demo)/tamsimaleri/`, noindex, visas bara i DM eller mejl).
**Status:** byggd 2026-11-20 på demomallen v3, inte skickad. Lead från Mathias (tamsimaleri.se + Instagram @tamsimaleri). Mathias önskemål: "lägg med hans samarbeten, de som är Reco och sånt".
**Har redan hemsida:** tamsimaleri.se (ny och ganska bra, med priskalkylator och 20 ortssidor). Vår vinkel är därför form och bevis: film i heron, Reco-omdömena och utmärkelserna synliga, färre klick till hembesöket.

## Bärande idé

Tredje generationen målare som ger fast pris efter ett kostnadsfritt hembesök, innan något målas. Det är deras egen mening ("Du vet vad jobbet kostar innan vi börjar") och det kunderna skriver på Reco ("till överenskommen kostnad", "inte en massa tillkommande äta-kostnader").

## Verifierat (tamsimaleri.se och reco.se, hämtat 2026-11-20)

| Uppgift | Värde | Källa |
|---|---|---|
| Bolag | Tamsi Måleri AB, org.nr 556772-4504, F-skatt | tamsimaleri.se |
| Adress | Römora 30, 153 95 Järna | tamsimaleri.se/kontakt |
| Kontakt | Robin Tamsi (verksamhetsansvarig), telefon och e-post står på deras sajt | tamsimaleri.se/kontakt |
| Historia | Familjeföretag i tredje generationen, måleri sedan 2008, far och son i Gnesta och Södertälje, åtta anställda plus inhyrda | tamsimaleri.se/om-oss, loggan |
| Tjänster | Invändig målning, fasad (trä, puts, plåt), tapetsering, lackering, fönsterrenovering, våtrum, trapphus för BRF, mikrocement, färgsättning | tamsimaleri.se/tjanster |
| Löften | Kostnadsfritt hembesök, skriftlig offert med fast pris, ROT på fakturan, svar inom 24 timmar | tamsimaleri.se |
| Område | Stockholm och Södermanland, från Täby till Nyköping | tamsimaleri.se |
| Priser | Lackering: lådfront 180 kr, lucka 360 kr, stor lucka 540 kr, innerdörr 1 126 kr, tung innerdörr 1 638 kr (inkl. moms). Fasad 250–600 kr/kvm före ROT som riktmärke | tamsimaleri.se/priser |
| Reco | 4,7 av 5, 115 omdömen, trovärdighet "Mycket Bra". Rekommenderat företag 2019, 2021, 2022, 2024, 2025, 2026 och tre år i rad | reco.se/tamsi-maleri-ab |
| Utmärkelser | DI Gasell 2024 och 2025, UC Högsta kreditvärdighet (2025-12-27), Länets företagare 2023 (Stockholms län), UC Nordiskt tillväxtcertifikat (2023-12-01) | bildfiler på tamsimaleri.se |
| Sociala medier | Instagram @tamsimaleri (1 262 följare), Facebook /tamsimaleri | länkade från sajten |

Åtta Reco-omdömen står ordagrant på sidan med datum, stjärnor och länk till varje omdöme (id 3317780, 3269703, 3214582, 3208050, 3088186, 3020666, 2971273, 2747543). Ett av dem har fyra stjärnor. Det finns också omdömen med en stjärna på profilen. De visas inte som kort men räknas i snittet 4,7.

**Står inte på sidan, eftersom vi inte hittat belägg:** garantier, försäkring, ledtider, antal jobb, Google-betyg, färgmärken, branschmedlemskap.

## Flaggor

- **Hero-filmen är genererad** (Wan 3.0 Prime, 5 s). Slutbilden är deras eget foto av den gula villan i Järna (Instagram), startbilden är samma foto redigerat till flagnande färg (GPT Image 2.5). Huset är deras jobb, förfallet är påhittat. Säg det till Robin.
- **Logotypen är omritad** ur deras 276 px breda fil (GPT Image 2.5), eftersom originalet blev suddigt i stor storlek. Monogrammets seriffer skiljer sig lite. Be om originalfilen (SVG eller stor PNG).
- **Länets företagare-märket** finns bara i 150 px och är mjukt i bandet. Be om en skarp fil.
- 3D-märkena på tjänstekorten är genererade (sex stycken).
- Varför-filmen är en långsam inzoomning över deras egen bild av huset med skylten och firmabilen, slutar på logokortet.
- Alla foton i tjänstekorten och jobbanden är deras egna, från galleriet på tamsimaleri.se. Flera är mobilbilder i låg upplösning.
- Formuläret går till Mathias (demonyckeln). Riktiga kontaktuppgifter står på sidan, visa inte offentligt.
- QA-skriptet larmar "tjänstekort med bild och länk": lackeringskortet länkar med flit till prislistan (#priser) i stället för formuläret.

## Design

Mörk grönsvart (#101614) och deras röda (#B5282D) ur loggan. Sektioner: hero, tjänsteband, siffror, sex tjänster i tre kolumner, lackeringspriser, två jobbband, Varför, Om oss, resan i fyra steg, Reco-widgeten, Instagram (tre inlägg), frågor, kontakt, bandet "Utmärkelser" med nio märken (Reco tre år i rad, Reco 2024–2026, Gasell 2024–2025, UC, Länets företagare, Nordiskt tillväxtcertifikat).

## Media och kostnad

8 bilder med `sunburst` (logga, startbild, sex märken) och en film med `wan-prime` 720p 5 s. Prisuppslaget gav NaN, så siffran är skillens: ca 0,13 USD + ca 1,40 USD = **ca 1,5 USD**. Resten är byggt lokalt med ffmpeg och sharp.

## Mejlutkast (skickas inte av oss)

Hej Robin! Jag har byggt ett förslag på hur Tamsi Måleri kan se ut på nätet, med era egna jobb, Reco-omdömen och utmärkelser: https://www.bahkobyra.se/tamsimaleri/ Säg gärna vad du tycker, det kostar ingenting.
