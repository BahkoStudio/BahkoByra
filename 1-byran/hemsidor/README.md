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
| Offert-PDF | mallen är Trestad-offerten (minnet: offert-pdf-mall). Den har priser och ska aldrig in i repot |

## Produktionschecklista, från ja till live

1. Avtal påskrivet och första betalningen inne (`2-kunder/onboarding-avtal/`).
2. Material från kunden: bilder, tjänstelista, domänhost, Google Företagsprofil.
3. Bygg på mallen v3, aldrig en egen variant i kundens fil.
4. Formulär via Web3Forms med kundens egen nyckel, testat med ett riktigt utskick.
5. QA: mobil, surfplatta och dator, inga döda länkar, sidtitlar och beskrivningar.
   - 5a. Kontrollera kundens nuvarande DNS. Skriv upp MX, SPF, DKIM, DMARC och verifierings-TXT
     och rör dem aldrig, annars slutar kundens e-post fungera. Byt bara A/AAAA och www.
   - 5b. 301 från varje gammal adress, eller behåll de gamla sluggarna. Parkera den gamla sajten.
   - 5c. Samtyckesruta, integritetssida, GA4 bakom samtycket och Search Console med sitemap.
6. Kunden godkänner, DNS pekas om (domänen stannar hos kunden), sidan går live.
7. Faktura del 2 skickas samma dag (`4-ekonomi-admin/fakturering.md`). Har avtalet en garanti:
   lägg in dag 90 i `web/public/crm-f2822a6f3a/atagande.json` (se `2-kunder/retention-upsell/SOP.md`).
8. Fyll i live-URL och datum i `2-kunder/kunder/<kund>/hemsida.md`. Kundmappen skapades redan i
   onboardingens steg 9, med de fyra filerna som beskrivs i `2-kunder/kunder/_mall/README.md`.
