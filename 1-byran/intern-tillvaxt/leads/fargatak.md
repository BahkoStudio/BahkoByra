# Färga Tak — ny lead (takmålning, hela Sverige)

**Sida:** `web/app/(demo)/fargatak/` → `bahkobyra.se/fargatak/` (efter merge; noindex)
**Byggd:** 2026-10-22 på demomallen v3 (hero exakt som velebitmaleri, platshållare och dolda sektioner som kakel0413)
**Status:** NY LEAD. Ägaren startar AB vid årsskiftet → **inget org.nr än**. Enda tjänsten i dag: **takmålning**, i hela Sverige.

## Verifierat (Mathias 2026-10-22)

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Färga Tak | Mathias + logofilen |
| Logotyp (första, ersatt 2026-10-23) | Marinblått "FÄRGA TAK" + korallröda takvinklar, slogan "VI MÅLAR TAK I HELA SVERGIE" (sic, står kvar i filen) | kundens PNG med alfa → `logo.png` (bara beskuren, 1488×629). `logo-ljus.png` = samma fil där marinblått/svart bytts mot vitt (korall orört), för heron och headern över filmen |
| Tjänst | Takmålning | Mathias |
| Område | Hela Sverige (i sidtexten stavat "Sverige") | logans slogan |
| Telefon | 070-789 45 61 | kunden via Mathias 2026-10-23 |
| E-post | info@fargatak.se | kunden via Mathias 2026-10-23 |
| Logotyp (ny) | "FÄRGA TAK" + två korallröda takvinklar (#FE504F) på svart; på sidan svart text (`logo-mork.webp`) | kundens filer 2026-10-23 |
| Färger | svart, vitt, korall #FE504F (logga, detaljer), dämpad korall #B5433E (knappar) | nya logotypen + Philip 2026-11-09 |

## Platshållare / antaganden på sidan

- **Telefon och e-post** finns sedan 2026-10-23 (se ovan). **Ort/adress, Instagram, hemsida:** saknas → visas inte ("Hela Sverige" som adressrad).
- **Tjänstekorten** (Takmålning / Hela Sverige / Ett tak som ser nytt ut) beskriver bara takmålningen. Rengöring står inte på sidan (Mathias 2026-10-22), färgval är ingen egen tjänst (kundloopen 2026-11-09).
- **Stegen** (kontakt → vi tittar på taket → offert → målning) och **de fem frågorna** är allmän information utan åtaganden: inga pris-, metod-, planerings- eller genomgångslöften, inget "bara tak", inget "villor". Ingen "kostnadsfri", inga priser, inga ledtider, inga garantier.
- **Dolda sektioner:** Jobb, Omdömen och Om oss (stilblock i page.js), som på kakel0413. Inget påhittat galleri, inga exempelomdömen, ingen ägartext.
- Inte på sidan: org.nr, F-skatt, ROT-avdrag, priser, garantier, omdömen, jobbfoton.

## Media (genererad, ILLUSTRATIV — inte kundens egna jobb)

- **Sedan 2026-10-23/11-09:** heron visar en dragbar före/efter (`hero-fore.webp` / `hero-efter.webp`, GPT Image 2.5 Sunburst, märkt "Illustration"), tjänstekorten ikoner i stället för foton, Varför-filmen omgjord (Sunburst + Kling 4.0), kontaktfilmen visas inte längre (vit sektion). Hero-filmen nedan ligger kvar i media men visas inte.

- **Heron är en illustration.** 12 s, tre klipp: mossigt, blekt tak på en gul svensk 1,5-plansvilla (dolly in) → takmålare i sele sprutar svart takfärg (rörlig kamera) → samma hus med blankt nymålat tak i kvällssol (kranåkning). Stillbilder: Qwen Image 3 (A, målarbilden, B = redigering av A). Klipp: Higgsfield SDK, `alibaba/wan-3.0-prime/image-to-video`, 1080p, 4 + 5 + 4 s, utan ljud. Stående mobilversion = mittbeskärning 9:16.
- Varför-filmen = klipp 3 + logokort (ffmpeg). Kontaktfilmen = heron suddad. Tre tjänstebilder = beskurna stillbilder (målarbilden, B hel, B närbild).
- **Kostnad:** 26,90 API-krediter ≈ 1,68 USD (bilder 3 × 1,2 = 3,6 krediter, filmer 7,168 + 8,96 + 7,168 = 23,30 krediter). Budget 100 krediter.

## Öppna frågor till Mathias / ägaren

1. Vem svarar i telefon (namn till Om oss)?
2. Egen Web3Forms-nyckel till info@fargatak.se vid leverans (formuläret går till demonyckeln nu).
3. Var utgår firman ifrån (ort), och stämmer "hela Sverige" fullt ut?
4. Ägarens namn och kort bakgrund (för Om oss)?
5. Vilka taktyper (betong, plåt, tegel) och vilka kulörer erbjuds?
6. Egna före/efter-foton → slå på jobbanden, byt hero och tjänstebilder.
7. Instagram/Facebook, domän, omdömen när de finns.
8. Org.nr när AB:t är registrerat → footern; först då ev. F-skatt och ROT i FAQ.
9. Vektorfil av logotypen? (Sloganen i filen är stavad "SVERGIE" — vill ägaren rätta den i logotypen?)

## DM-utkast (högst två meningar)

Hej! Nu är förslaget vitt rakt igenom med lugnare knappar i loggans färg, utan neon, som ni bad om: bahkobyra.se/fargatak/. Skicka gärna några egna jobbilder när ni har dem, så byter jag ut illustrationerna.

## Revision 2026-10-22 (Mathias feedback)

- Ortsraden "HELA SVERIGE" bort ur heron (logans slogan säger det redan). Tjänsteraden: "Takmålning & Nytt utseende."
- All rengöring bort (hero, kort, steg, FAQ, kontakt, meta, tejp). Kortet "Rengöring före målning" ersatt med "Färgval" (kulören bestäms tillsammans innan arbetet börjar).
- Heron behåller alla tre klippen: mittklippet visar färgsprutning (svart färg läggs på), inte tvätt.

## Revision 2026-11-09 (Philip via Mathias, kundloop runda 1)

- **Vit bakgrund överallt:** kontaktsektionen vit (ingen film, ingen slöja), formuläret på vitt kort med tunn kant. Headern vit med mörk text från start.
- **Inga neonknappar, men loggans färg** (Mathias): alla fyllda knappar i dämpad, matt korall #B5433E (hover #9F3A36) med vit text (5,47:1), ingen glöd. Ljus korall #FE504F bara i loggan, takvinkeln före ögonbrynen och en tunn linje över footern.
- **Bandet under heron** ljusgrått (#F5F5F4) med svart text och tunna linjer, inte korall.
- Tjänsteikoner, processlinjen, före/efter-handtaget, Efter-lappen och sista steget svarta/vita i stället för korall.
- Före/efter märkt "Illustration" i bilden och i alt-texterna. Reglaget flyttas bara av vågräta drag.
- Popupen avstängd på den här sidan (den låg över formuläret). Mobilmenyn: Kontakt som egen rad, ingen dubblett.
- Copyn rensad från löften utanför VERIFIERAT (se Platshållare ovan).
