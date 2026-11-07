# MAXIMUM PLATT ENTREPRENAD AB — lead

**Instagram:** [@maximum_platt_enterpernad_ab](https://www.instagram.com/maximum_platt_enterpernad_ab/) (handle stavat "enterpernad") — visningsnamn "Maximum Platt Entreprenad AB", 146 inlägg, 1 157 följare (skärmdump Mathias + embed 2026-10-17).
**Hemsida:** ingen hittad.
**Demo:** https://www.bahkobyra.se/maximumplatt/ (källa: `web/app/(demo)/maximumplatt/`). Gren `demo/maximumplatt`, committad lokalt, inte pushad.
**Status:** byggd 2026-10-17 på demomallen v3. Media 0,38 USD. Inte skickad. Mathias har lovat en prototyp i DM; kunden svarade "Bättre hitta mig projekt".

## Bärande idé

Bygg och våtrum från samma firma: ett badrum slutar sällan vid tröskeln, och kunden ska kunna lämna hela projektet till en kontakt. Sidan är byggd för att ge förfrågningar (svaret på "hitta mig projekt"): en handling ("Begär offert") på åtta ställen, formuläret direkt efter bockarna på mobil.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Maximum Platt Entreprenad AB (ur IG-namnet, **ingen registerträff**) | IG-profil |
| Bio | "Vi är specialiserade inom bygg och våtrum och med vår mångåriga och breda erfarenhet är vi din trygga partner för bygg- och renoveringsprojekt." | IG-profilens metabeskrivning, 2026-10-17 |
| Tjänster | Badrumsrenovering, Takrenovering, Husrenovering, Markarbete (exakt fyra) | Mathias 2026-10-17 |
| Bilder | Stillbilder ur egna reels DP1ea5PDAoL, DS3wlbwiJbE, DUkq9kXDAIn, DbMI2vit6P2 (1080×1920) och karusellen DPpHMjqDKox (1440×1920) | IG utan inloggning |
| IG-inlägg på sidan | DS3wlbwiJbE (badrum/kök), DUkq9kXDAIn (tvättstuga/dusch), DS3u-MVCGpL (villa: hall, kök, platsbyggt) | IG-embed |

## INTE verifierat — står inte på demon

Org.nr, ort, telefon, e-post, adress, Google-profil, omdömen, antal år, antal projekt, garantier, certifieringar (inget BKR/GVK/"behörig våtrumsbyggare"). Sökt 2026-10-17 i allabolag, merinfo, ratsit, proff, hitta, eniro och WebSearch: "Maximum Platt Entreprenad AB" finns inte. Underpunkterna i tjänstekorten är vad tjänsterna innebär i allmänhet. "Offert innan start" och "vi tittar på jobbet" är erbjudanden i förslagets form.

## Möjliga kopplingar (OBELAGDA, använd inte förrän Mathias bekräftat)

1. **Max Platt AB**, 559334-5530, Björkhagsvägen 1, 141 32 Huddinge, reg. 2021-09-13 (SNI byggnadssnickeri). Sajt maxplatt.se ("MaxPlatt AB", tel 070-055 00 65, Stockholm/Huddinge, platt & kakel, bygg, el, kök, måleri, badrum). Sajten länkar till instagram.com/maxplattab, som inte finns längre. Kopplingen kommer från Googles AI-översikt, inte från leadens kanaler.
2. **Känsligt (detaljerna gick till Mathias i leveransen, inte hit, repot är publikt):** i reelen DP1ea5PDAoL (ca 0:46) bär en hantverkare en varseljacka med ett annat "Maximum"-firmanamn och en turkos logotyp. Det bolaget har en registerhistorik som inte ska nämnas. Står inte på sidan, bildrutan används inte. **Nämn det inte i DM.**

Båda pekar mot södra Stockholm, men ingen ort står på demon.

### Om Mathias bekräftar Max Platt AB: fält att byta i `page.js`

- `namn`, `metadata.title/description`, `logo.alt`, `modal.rubrik`: "Max Platt AB" (eller det namn kunden vill använda)
- `kontakt.tel: '070-055 00 65'`, `kontakt.telHref: 'tel:+46700550065'`, `kontakt.orgnr: '559334-5530'` (Ring-knapparna kommer då tillbaka av sig själva)
- `hero.ort` och `om.kortRad`: "Huddinge" eller "Stockholm", som de själva skriver
- `logo`: deras egen fil (maxplatt.se/wp-content/uploads/2022/09/Logo-hemsida.png + MaxPlatt_logo_white.png som `ljus`) i stället för vår, och nytt `tema` ur den; Varför-filmens slutkort byggs om med deras logotyp
- FAQ "Var arbetar ni?" med deras område; VERIFIERAT-blocket med källorna

## Media (0,38 USD)

- **Egna:** 2 tjänstebilder (badrum med svart duschvägg, kök med köksö) och alla 14 jobbilder (7 våtrum, 7 bygg/renovering), Varför-filmen (deras foto av ett renoverat hus med kakelugn, långsam inzoomning + logokort, ffmpeg 0 kr).
- **Lånade (illustrationer, märkta i `jobb.not`):** `tjanst-tak.jpg` (från goldring, takläggning) och `tjanst-mark.jpg` (från hg, schakt). Kunden har inga tak- eller markbilder bland de tolv inlägg som syns utan inloggning — byt mot egna.
- **Genererat:** förvandlingen i heron = Qwen Image 3 A (slitet 80-talsbadrum, 0,075) → B (kaklat badrum med svart spröjsad duschvägg, ek-kommod, 0,075) → Kling 3.0 A→B 5 s (0,23). Illustration, inte deras badrum. Ingen not på sidan.
- Kontaktfilmen = heron suddad. Alla 28 filer unika (md5).

## Logotypen

**Logotypen är ett förslag från Bahko, kunden har ingen egen** (Mathias uppdrag 2026-10-17). Tak + 2×2 plattor (sista plattan i accent), "MAXIMUM PLATT" i Bebas Neue (PLATT i kobolt), "ENTREPRENAD AB" spärrat i Outfit 600. Text som konturer, ingen AI. Källfiler: `1-byran/intern-tillvaxt/leads/maximumplatt-logotyp/` (SVG mörk + ljus); PNG 1200×288 med alfa i mediamappen. Accenten går att byta om kunden vill ha en annan färg.

## Design

Tema ur logotypen: `mork #0A1020`, `accent #1D4ED8` (vit text 6,7:1), `accentText #1D4ED8` (6,1:1 mot kräm), `accentLjus #8FB0FF` (8,9:1 mot mörk). Hero: logotyp + "Badrum & Renovering." (ingen ort).

## Flaggor före utskick

- Firmanamnet obekräftat (inte i registret). Be kunden bekräfta namn och stavning.
- Ingen telefon på sidan: Ring-knapparna är Instagram + formuläret.
- Omdömen i exempelläge (Google-profil saknas).
- Formuläret går till mathias@bahkobyra.se (demonyckeln).
- Logotypen är vår, förvandlingen genererad, tak- och markbilderna lånade.
- Instagram-ringen visar den breda logotypen liten (mallen har ingen symbolvariant).

## DM-utkast (högst två meningar)

> Bror, här är prototypen: https://www.bahkobyra.se/maximumplatt/ — byggd på dina egna jobb från Instagram, med en offertknapp på varje skärm så att folk som söker badrum och renovering skickar förfrågan direkt till dig. Det är den som hittar projekten åt dig, säg till så kopplar vi den till din mejl och får upp den på Google.
