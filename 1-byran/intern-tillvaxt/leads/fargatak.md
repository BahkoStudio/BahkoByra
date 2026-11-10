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
- **Tjänstesektionen** är synlig igen (Philip via Mathias 2026-11-10): tre kort med runda linjeikoner i samma anda som bahkobyra.se. Korten är Takmålning, Färgval och Ett tak som ser nytt ut (ur sidans historia). Ingen ny tjänst.
- **Varför-sektionen** visar bara filmen och knapparna. Texten togs bort 2026-11-10 (Mathias): leaden "Sol och regn bleker färgen år för år, och mossan tar resten. Ett blekt tak drar ner hela huset. Det syns från gatan.", rubriken "Taket är det första man ser av huset" och kortet "Ny firma".
- **Stegen** (Ring eller skriv → Berätta om taket → Offert) och **de tre frågorna** (pris, Norrland, bilder) är allmän information utan åtaganden: inga pris-, metod-, besiktnings- eller planeringslöften, inget "bara tak", inget "villor". Ingen "kostnadsfri", inga priser, inga ledtider, inga garantier.
- **Dolda sektioner:** Jobb, Omdömen och Om oss (stilblock i page.js). Inget påhittat galleri, inga exempelomdömen, ingen ägartext.
- Inte på sidan: org.nr, F-skatt, ROT-avdrag, priser, garantier, omdömen, jobbfoton.

## FLAGGOR (läs före leverans)

- **Sidan är byggd som kundens egen hemsida** (`kund: true`, Mathias 2026-11-09: "ta bort detta är ett förslag, gör det som en kund som ska ha hemsida"): ingen Bahko-knapp, ingen förslagsruta, footern säger "Hemsida skapad av bahkobyra.se".
- **Bilderna och filmen är GENERERADE ILLUSTRATIONER, inte Färga Taks egna jobb:** före/efter-bilden i heron (`hero-fore.webp` / `hero-efter.webp`) och filmen i Takmålning-blocket (`video-varfor.mp4`, villa med nymålat svart tak). Det står INTE som synlig text på sidan (Mathias: "filmen ska vara kvar utan illustration text"), bara i alt- och aria-texterna ("Illustration: …"). **Kunden ska byta till egna jobbfoton** så snart de finns, och det ska sägas till kunden vid leverans.
- Formuläret går fortfarande till demonyckeln (landar hos Mathias, ämne "Färga Tak: ny förfrågan från hemsidan"). Vid leverans: kundens egen Web3Forms-nyckel i `formular.nyckel`.

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

Hej! Nu är sidan kortare och vit rakt igenom, med lugna knappar i loggans färg och telefonnumret ett tryck bort överallt: bahkobyra.se/fargatak/. Skicka några egna jobbilder när ni har dem, så byter jag ut bilderna och filmen.

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

## Revision 2026-11-09 (kundloop runda 3, alla tre kritiker + Mathias)

- **Kortare sida, varje sak sägs en gång.** Ordning: hero → band → Takmålning (Varför-sektionen med filmen) → Så går det till (3 steg) → Frågor (3) → Kontakt → footer. Tjänstesektionen dold.
- **Hero:** h1 "Takmålning i hela Sverige" i stället för "Takmålning & Nytt utseende."; den stora loggan i heron dold (headern bär loggan). Ingen synlig "Illustration"-lapp på före/efter (bara i alt).
- **Bandet:** Takmålning · Hela Sverige · Färga Tak.
- **Kund i stället för förslag:** `kund: true`, `skapadAv`, modalen borttagen, popupen fortsatt av.
- **Mobilmenyn:** egen rad "Ring 070-789 45 61" (tel-länk), raderna Kontakt och Vanliga frågor bort (Begär offert och Frågor når samma mål).
- **Footern:** kolumnen Tjänster bort (Takmålning stod två gånger), Kontakt en gång. Sidfliken på datorn vit med mörk text och tunn kant.
- Text enligt `design-loop/references/skriv-som-en-manniska.md`: inga tankstreck, inga garderingar, "du".

## Revision 2026-11-10 (Philip via Mathias: tjänster med ikoner, och två texter bort)

- Tjänstesektionen visad igen. Tre kort med runda linjeikoner, i samma anda som tjänstekorten på bahkobyra.se, anpassade till den vita sidan. Korten är Takmålning, Färgval och Ett tak som ser nytt ut.
- Borttaget ur Varför-sektionen: leaden om sol, regn och mossa, rubriken "Taket är det första man ser av huset", och kortet "Ny firma". Filmen är kvar, centrerad, med knapparna under.
- Menyn: Tjänster pekar på tjänstesektionen. Länken till #varfor är bort.
