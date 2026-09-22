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

## Demosidorna (hemsideförslagen)

**Beslut (Mathias, 2026-09-22): förslagen kopplas in, men mot vår egen inkorg.**
Alla tjugo förslag delar nyckeln `DEMO_NYCKEL` i `web/app/formular.js` och landar hos
mathias@bahkobyra.se med firmans namn i ämnesraden. Autosvar är AV på den nyckeln: ett förslag
ser ut som kundens egen sajt, och ett autosvar signerat Bahko Byrå avslöjar upplägget.

Formuläret är klientkomponenten `web/app/komponenter/DemoFormular.js`. Den skickar med fetch
och visar kvittensen **på plats**. Besökaren lämnar aldrig sidan, för en omdirigering till
bahkobyra.se eller till Web3Forms egen sida skulle avslöja att det inte är firmans sajt.
Går anropet inte igenom visas ett fel. Kvittensen påstår aldrig att något skickats när det inte
gjorde det.

Den gamla texten under formuläret ("knappen öppnar ditt e-postprogram") är borttagen på alla
sidor, eftersom den inte längre stämmer.

**Blir förslaget en kund:** kunden skapar en egen nyckel med sin egen mejladress. Byt nyckeln på
just den sidan (skicka in den som prop till `DemoFormular`), slå på autosvar i deras röst, klart.

## Web3Forms kräver en webbläsare

Anrop från en server nekas på gratisplanen: *"This method is not allowed. Use our API in client
side"*. Därför är formuläret en klientkomponent och inte ett serveranrop.

Deras API ligger dessutom bakom Cloudflares botskydd. Ett automatiserat testinskick från en
headless webbläsare på den här datorn får därför `Failed to fetch`, precis som bahkobyra.se
403:ar härifrån (se minnesnoten om botspärren). Nyckeln i sig är verifierad: ett inskick med
vanliga webbläsarheaders gick igenom med `success: true` den 2026-09-22. Sista kontrollen i en
riktig webbläsare måste göras av Mathias, lokalt eller efter deploy.

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
