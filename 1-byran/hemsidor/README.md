# Kvist: Hemsidor

Front offer: en ny hemsida åt ett lokalt företag. Priset står i offerten, aldrig här.

## Var saker bor

| Vad | Var |
|---|---|
| Bygga en kunddemo eller kundsajt | skillen `/hemsidor`, mallen v3 i `web/app/(demo)/_mall/DemoSida.js` |
| Ny lead i en nisch som redan har demo | `/demo-recopy` (0 credits), alltid först |
| Alla demolänkar som kan skickas | `1-byran/intern-tillvaxt/leads/demolankar.md` |
| Kundsajternas källkod | `bahkobyra/cloud/<kund>/` (🔒) och `extern/` |
| Ribban som demos granskas mot | `docs/design/bar.md` |
| Offert-PDF | mallen är Trestad-offerten (minnet: offert-pdf-mall) |

## Produktionschecklista, från ja till live

1. Avtal påskrivet och första betalningen inne (`2-kunder/onboarding-avtal/`).
2. Material från kunden: bilder, tjänstelista, domänhost, Google Företagsprofil.
3. Bygg på mallen v3, aldrig en egen variant i kundens fil.
4. Formulär via Web3Forms med kundens egen nyckel, testat med ett riktigt utskick.
5. QA: mobil, surfplatta och dator, inga döda länkar, sidtitlar och beskrivningar.
6. Kunden godkänner, domänen flyttas, sidan går live.
7. Kunden läggs in i `2-kunder/kunder/<kund>/` med de fyra filerna ur `_mall/`.
