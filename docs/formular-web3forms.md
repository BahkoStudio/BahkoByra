# Formulären: Web3Forms

Alla formulär på bahkobyra.se och i demosidorna skickas med Web3Forms sedan 2026-09-22
(tidigare Formspree, som hade 50 inskick i månaden på gratisnivån och krävde ett formulär
per sajt i vårt konto). Kundsajterna Smålands Måleri och Bromma Trädgårdsservice har kört
Web3Forms sedan 2026-07-27, var och en med kundens egen nyckel.

## Nyckeln

Access key är **publik med flit**. Den säger bara vilken inkorg svaret går till och ger
ingen åtkomst till något. Lägg den aldrig i en miljövariabel: sidorna är statiska och
formuläret slutar då fungera.

| Var | Fil | Vad som ska in |
|---|---|---|
| Kontaktsidan | `web/app/formular.js`, konstanten `NYCKEL` | nyckeln för Kontakt |
| Kostnadsfri analys | `web/public/foretag/gratis-granskning.html` | ersätt `BAHKO_WEB3FORMS_NYCKEL` |
| Kostnadsfri guide | `web/public/foretag/gratis-guide.html` | ersätt `BAHKO_WEB3FORMS_NYCKEL` |

Kopiorna under `bahkobyra/foretag/` är den gamla statiska sajten som inte serveras. De hålls
i synk ändå, så de inte pekar åt olika håll om någon råkar öppna dem.

## Så beter sig formulären

- **Nyckel ifylld:** inskicket går till Web3Forms, som mejlar innehållet, och besökaren
  landar på `/tack/` i stället för på Web3Forms egen kvittenssida.
- **Nyckel tom eller kvar som platshållare:** allt faller tillbaka på `mailto:`, precis som
  förut. Ingen besökare möter ett dött formulär och ingenting påstår att något skickats när
  det inte gjorde det. Samma princip som i Smålands Måleris sajt.

Skräppostskyddet är Web3Forms honungsfälla: ett kryssfält som heter `botcheck` och är dolt.
Robotar fyller i det, människor ser det inte.

## Demosidorna kopplas inte

**Beslut (Mathias, 2026-09-22): bara vår egen sajt och riktiga kunder kopplas till Web3Forms.**
Demosidorna behåller sitt `mailto:`-formulär. En demo är ett förslag, inte en sajt i drift, och
ett förslag ska inte skicka riktiga förfrågningar någonstans.

Först när en demo blir en skarp kundsajt kopplas formuläret in, och då med **kundens egen**
nyckel (web3forms.com, kundens mejladress) så att förfrågningarna landar hos dem, precis som
för Smålands Måleri och Bromma Trädgårdsservice.

## Autosvar

Autosvar till den som fyllt i är påslaget i Web3Forms dashboard på alla tre formulären
(Mathias, 2026-09-22). Skrivna i hans röst: "Hejsan!", vad som händer härnäst, telefonnumret,
"Vänliga hälsningar / Mathias Bahko", loggan överst, inga tankstreck. Kontakt och granskning
skickar med en kopia av det kunden fyllde i. Guidens autosvar innehåller en länk som låser upp
guiden direkt, även på en annan enhet.

Autosvaret sätts alltså i Web3Forms, inte i koden. En tidigare version av den här filen påstod
att funktionen krävde Pro. Det stämde inte.

## Tre nycklar, inte en

Dashboarden har ett formulär per sida, alla till mathias@bahkobyra.se med eget ämne i inkorgen:
Kontakt (hemsideförslag), Gratis guide och Gratis granskning. Varje sida använder alltså sin
egen nyckel. Demosidorna delar Bahkos kontaktnyckel tills en kund får en egen.
