# Färga Tak — ny lead (takmålning, hela Sverige)

**Sida:** `web/app/(demo)/fargatak/` → `bahkobyra.se/fargatak/` (efter merge; noindex)
**Byggd:** 2026-10-22 på demomallen v3 (hero exakt som velebitmaleri, platshållare och dolda sektioner som kakel0413)
**Status:** NY LEAD. Ägaren startar AB vid årsskiftet → **inget org.nr än**. Enda tjänsten i dag: **takmålning**, i hela Sverige.

## Verifierat (Mathias 2026-10-22)

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Färga Tak | Mathias + logofilen |
| Logotyp | Marinblått "FÄRGA TAK" + korallröda takvinklar, slogan "VI MÅLAR TAK I HELA SVERGIE" (sic, står kvar i filen) | kundens PNG med alfa → `logo.png` (bara beskuren, 1488×629). `logo-ljus.png` = samma fil där marinblått/svart bytts mot vitt (korall orört), för heron och headern över filmen |
| Tjänst | Takmålning | Mathias |
| Område | Hela Sverige (i sidtexten stavat "Sverige") | logans slogan |
| Färger | marinblå ~#00347A, korall ~#FF5A52 | logotypen |

## Platshållare / antaganden på sidan

- **Telefon:** `07X-XXX XX XX`, länken går till `#kontakt` (går inte att ringa). Byt `kontakt.tel` + `telHref`.
- **E-post, ort/adress, Instagram, hemsida:** saknas → visas inte ("Hela Sverige" som adressrad).
- **Tjänstekorten** (Takmålning / Färgval / Ett tak som ser nytt ut) beskriver bara takmålningen. Rengöring står inte på sidan (Mathias 2026-10-22: enda tjänsten är takmålning).
- **Stegen och frågorna** är generella (kontakt → titta på taket → offert → planering → målning → genomgång). Ingen "kostnadsfri", inga priser, inga ledtider, inga garantier.
- **Dolda sektioner:** Jobb, Omdömen och Om oss (stilblock i page.js), som på kakel0413. Inget påhittat galleri, inga exempelomdömen, ingen ägartext.
- Inte på sidan: org.nr, F-skatt, ROT-avdrag, priser, garantier, omdömen, jobbfoton.

## Media (genererad, ILLUSTRATIV — inte kundens egna jobb)

- **Heron är en illustration.** 12 s, tre klipp: mossigt, blekt tak på en gul svensk 1,5-plansvilla (dolly in) → takmålare i sele sprutar svart takfärg (rörlig kamera) → samma hus med blankt nymålat tak i kvällssol (kranåkning). Stillbilder: Qwen Image 3 (A, målarbilden, B = redigering av A). Klipp: Higgsfield SDK, `alibaba/wan-3.0-prime/image-to-video`, 1080p, 4 + 5 + 4 s, utan ljud. Stående mobilversion = mittbeskärning 9:16.
- Varför-filmen = klipp 3 + logokort (ffmpeg). Kontaktfilmen = heron suddad. Tre tjänstebilder = beskurna stillbilder (målarbilden, B hel, B närbild).
- **Kostnad:** 26,90 API-krediter ≈ 1,68 USD (bilder 3 × 1,2 = 3,6 krediter, filmer 7,168 + 8,96 + 7,168 = 23,30 krediter). Budget 100 krediter.

## Öppna frågor till Mathias / ägaren

1. Telefonnummer (och vem som svarar)?
2. E-post för formuläret / Web3Forms?
3. Var utgår firman ifrån (ort), och stämmer "hela Sverige" fullt ut?
4. Ägarens namn och kort bakgrund (för Om oss)?
5. Vilka taktyper (betong, plåt, tegel) och vilka kulörer erbjuds?
6. Egna före/efter-foton → slå på jobbanden, byt hero och tjänstebilder.
7. Instagram/Facebook, domän, omdömen när de finns.
8. Org.nr när AB:t är registrerat → footern; först då ev. F-skatt och ROT i FAQ.
9. Vektorfil av logotypen? (Sloganen i filen är stavad "SVERGIE" — vill ägaren rätta den i logotypen?)

## DM-utkast (högst två meningar)

Hej! Jag har gjort ett förslag på hur Färga Tak kan se ut på nätet, med er logga och en film som visar ett tak före och efter målning: bahkobyra.se/fargatak/. Skicka telefon, e-post och gärna några egna jobbilder, så fyller jag i resten.

## Revision 2026-10-22 (Mathias feedback)

- Ortsraden "HELA SVERIGE" bort ur heron (logans slogan säger det redan). Tjänsteraden: "Takmålning & Nytt utseende."
- All rengöring bort (hero, kort, steg, FAQ, kontakt, meta, tejp). Kortet "Rengöring före målning" ersatt med "Färgval" (kulören bestäms tillsammans innan arbetet börjar).
- Heron behåller alla tre klippen: mittklippet visar färgsprutning (svart färg läggs på), inte tvätt.
