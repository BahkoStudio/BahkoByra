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
| Next-sajten och alla demos | `web/app/formular.js`, konstanten `NYCKEL` | Bahkos egen nyckel |
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

## Ny kund

Kunden skapar en nyckel på web3forms.com med **sin egen** mejladress. Skicka in den som
`web3nyckel` i demons data (mallen `_mall/DemoSida.js` skickar vidare den till formuläret),
så landar förfrågningarna direkt hos kunden i stället för hos oss. Utan `web3nyckel` används
Bahkos nyckel, vilket är rätt så länge sajten är ett förslag.

## Det här löser inte autosvaret

Automatiskt svarsmejl till den som fyllt i är en betald funktion hos Web3Forms (Pro).
Vill vi hålla löftet om "svar direkt" behöver vi bygga det själva: ett eget anrop på Vercel
plus en mejltjänst, till exempel Resend, som både svarar kunden, kopierar oss och sparar
förfrågan. Inte gjort än.
