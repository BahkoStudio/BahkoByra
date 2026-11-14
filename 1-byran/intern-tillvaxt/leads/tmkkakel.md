# TMK Kakel AB (Trollhättan) · kakel och klinker, badrumsrenovering

**Hemsida:** [tmkkakel.se](https://www.tmkkakel.se/) (WordPress/Divi, start + /referenser/, lästa 2026-11-14) · **Instagram:** [@tmk_kakel](https://www.instagram.com/tmk_kakel/) ("TMK Kakel AB", 341 följare, 33 inlägg)
**Demo:** https://www.bahkobyra.se/tmkkakel/ (källa: `web/app/(demo)/tmkkakel/`, noindex, visas bara i DM).
**Status:** byggd 2026-11-14 på demomallen v3 med 3D-märken på tjänsterna. **Herofilmen är en platshållare** tills Mathias godkänt Wan 3.0 Prime (se Hero nedan). Inte skickad. Kontaktperson: **Tomi Määttä**, VD och grundare.

## Vem han är

Tomi Määttä äger och driver TMK Kakel AB i Trollhättan, ensam anställd. Kakel och klinker i badrum, WC, kök, hall och teknikrum, i hem och på arbetsplatser. Hela badrum från rivning till möbler, med samarbetspartners. Sajtens egna ord: "15 års erfarenhet av kakel- & klinkerarbeten" och "vi ger dig en offert på hela projektet". Instagram är mest verktygsreklam (Invictus Tools) och några jobbreels.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Bolag | TMK Kakel AB, org.nr 559156-7101, registrerat 2018-04-23, F-skatt och moms, SNI 43330, 1 anställd, ledamot Tomi Kristian Määttä | allabolag.se, merinfo.se, hitta.se, syna.se |
| Adress | Larstorpsvägen 16, 461 98 Trollhättan | sajten + registret |
| Telefon / e-post | 0739-87 36 34 · info@tmkkakel.se | tmkkakel.se, eniro.se, hantverkskollen.se |
| Erfarenhet | "15 års erfarenhet av kakel- & klinkerarbeten", "gedigen erfarenhet från olika många uppdrag och firmor" | tmkkakel.se (eniro: "över 15 års") |
| Tjänster | Kakel & klinker (kök, badrum, hallar, andra rum; hem och arbetsplats). Badrum/WC: rivning, plattsättning, snickeri, montage av badrumsmöbler "tillsammans med våra samarbetspartners" | tmkkakel.se |
| Löfte | "Med oss blir allt enkelt och vi ger dig en offert på hela projektet" | tmkkakel.se |
| Referenser | Badrum i Vargön, Egna hem, Skoftebyn (två), Sjuntorp, Varekil · Badrum och tegel bakom kamin i Kode · Teknikrum i Vänersnäs (2022) | tmkkakel.se/referenser |
| Instagram-jobb | DfaL3utI18N (dusch med nisch och bänk), DfB7A57oHgy ("Ghost Flush", infälld spolknapp i sten), DclnVTCCF_M (badrum i stenplatta) | embed 2026-11-14 |
| Bilder | Ca 70 egna jobbfoton i sajtens mediebibliotek (alla stående, 600 till 1200 px breda) | tmkkakel.se/wp-json/wp/v2/media |

## INTE verifierat, och står inte på demon

Google-profil och omdömen (inga hittade; Hantverkskollen "Inga omdömen än"), våtrumsbehörighet (GVK/BKR), garantier, priser, ledtider, att de sköter ROT åt kunden, VVS och el, arbetsområde utöver orterna i referenserna, Facebook.

## FLAGGOR

- **Herofilmen är en PLATSHÅLLARE** (gratis ffmpeg-zoom över deras foto WPGT7482). Kontaktfilmen är samma film suddad. Båda byts när Wan Prime-filmen är gjord. Filvägarna är desamma.
- **3D-märkena** (badrum, kakel, teknikrum, kamin) är genererade med GPT Image 2.5 (Sunburst, 1k, 4 st, ca 0,016 USD styck = ca 0,07 USD, ungefär 1 API-kredit). Teknikrum-märket visar tvättmaskin och varmvattenberedare: illustration, inte en tjänst vi påstår.
- **Bild till ort** på tjänstekorten (Sjuntorp, Skoftebyn, Kode, Vänersnäs) är läst ur ordningen på /referenser/. Låg risk, men be Tomi bekräfta.
- **Accenten** #0F766E (petrol) är vald av oss, loggan är gråskala. Ljus logovariant gjord av oss.
- **Omdömen dolda** (inga riktiga, och inga exempelkort).
- "Du pratar med ägaren / Tomi svarar själv": han är ende anställd och numret står under hans namn på sajten. Be honom bekräfta.
- Formuläret går till mathias@bahkobyra.se (demonyckeln).

## Hero (väntar på Mathias ja)

Förvandling A → B ur deras eget badrum i Sjuntorp (AFRU1268, 1200×1600, svart marmorklinker, vitt kakel):

1. **B (16:9)**: GPT Image 2.5 (`sunburst`, edit med `--ref AFRU1268.jpg --format 16:9 --upplosning 2k`), ca 0,02 USD:
   "Extend this portrait photo to a 16:9 landscape frame of the same bathroom. Continue the white wall tiles and the glossy black marble floor naturally to the left and right. Keep everything inside the original area identical. Documentary contractor photography, natural muted colors, no HDR, no people, no text, no logos."
2. **A (före)**: `sunburst` edit med `--ref B.png`, ca 0,02 USD:
   "Keep the geometry, position and perspective IDENTICAL to the reference, nothing added or removed anywhere else. The same bathroom before tiling: bare grey concrete floor with an open floor drain, walls covered in grey blue waterproofing membrane, pipe ends sticking out where the toilet and tap go, a little dust, no tiles. Documentary contractor photography, natural muted colors, no HDR, no people, no text, no logos."
3. **Film**: `node tools/hf-api/hf.mjs film --modell wan-prime --start A.png --slut B.png --res 1080p --sek 5 --format 16:9 --prompt-fil p-film.txt --ut forvandling.mp4`
   "Locked camera inside a bathroom under renovation. Large black marble floor tiles are laid one by one with a notched trowel, starting at the floor drain and spreading across the floor. White wall tiles go up row by row on the membrane. Grout lines are filled and wiped. The room ends exactly as the end frame: white wall tiles and a glossy black marble floor in soft daylight from the window. Only hands and tools visible, no faces. NO glowing lines, NO light effects, no crossfade, no morphing, locked camera."
4. Lokalt (gratis): 1,5 s stillbild på slutet, uppskalning, mobil = 9:16 utsnitt, kontaktfilm suddad, postrar.

**Kostnad:** Wan 3.0 Prime 5 s 1080p = **ca 1,40 USD (22,4 API-krediter)** enligt prisuppslaget vid Archer Knox och Brottom (2026-11-01/03). Bilderna ca 0,04 USD (under 1 kredit). **Totalt ca 1,45 USD ≈ 23 krediter.** Egen stående mobilkörning i 9:16 i stället för utsnitt: + ca 22,4 krediter. (Verktygets `pris` gav "NaN" 2026-11-14, prisuppslagets svar har bytt form, så siffran är från tidigare körningar.)

## Bärande idé

**En offert på hela badrummet, och du pratar med Tomi.** Ett badrum är rivning, underlag, plattor, snickeri och möbler. TMK tar allt i ett pris. Hans sajt säger det, men gömmer det under en rubrik om 15 år.

## Vad förslaget gör bättre än tmkkakel.se

- Hans egna jobbilder i två band och på tjänstekorten, i stället för små rutor på en undersida.
- "En offert på hela projektet" längst fram, i Varför och i formuläret.
- Ring-knapp alltid i bild på mobilen, formulär med Privatperson/Företag.
- Sökorden plattsättare, kakel och klinker, badrumsrenovering och Trollhättan i titel, rubriker och schema.

## Öppna frågor till Mathias

- Godkänn herofilmen (ca 23 krediter, eller ca 45 med egen mobilkörning).
- Stavning: "TMK Kakel AB" (registret och sajten). Ok.
- Vill du ha en annan accentfärg än petrol?

## DM-utkast (skickas av Mathias, inte av oss)

Hej Tomi! Såg badrummet i Sjuntorp med svart marmor på golvet. Snyggt jobb. Vi bygger sidor åt hantverkare, bland annat en kakelfirma i Skåne och en målare i Stockholm. Jag har gjort ett förslag åt TMK Kakel med dina egna bilder och "en offert på hela projektet" längst fram. Vill du se det?
