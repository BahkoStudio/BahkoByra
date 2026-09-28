# bar.md — uterumskonfiguratorn mäts mot det här

**Loop:** animering (Rörelse · Prestanda · Craft). Kundloopen hålls tillbaka.

**Baren, två källor:**
- *Referens:* Renson Outdoor Configurator (configurator.renson-outdoor.com, Algarve, fotad
  2026-09-28 headless). En av de största pergolatillverkarna i Europa.
- *Vår egen:* 3D-planlösningen, `docs/design/3d-planlosning-bar.md` (rörelsereglerna).

**Uppmätt hos Renson:** ett nytt mått (4 000 → 6 000 mm) och byte fristående → väggmonterad
syns i nästa bildruta utan övergång. Kameran står kvar, så en längre pergola skärs av i båda
bildkanterna. Måttlinjer i millimeter ritas längs modellens egna kanter, också höjden.

---

## Mekanismerna

**1. Ett val syns direkt, inom 150 ms, och ingenting tonar.**
Rensons styrka: modellen byts i nästa bildruta. En övergång som tonar mellan två uterum
säger ingenting om produkten och fördröjer svaret. Gäller mått, tak, partier, färg och glas.

**2. Kameran ramar om efter ett måttbyte, i en rörelse på 700–1100 ms.**
Rensons svaghet: modellen skärs av. Hos oss ska hela rummet, altanen och måttlinjerna alltid
rymmas i den fria ytan efter ett byte, och flytten börjar först när användaren släppt reglaget.

**3. En sak rör sig åt gången.**
Kameran och glaspartierna rör sig aldrig samtidigt. Panelen och solkortet står helt stilla.

**4. Vid sidladdning rör sig bara kameran, en gång, högst 1200 ms. Sedan total stillhet.**
Inget svävar, pulserar eller snurrar av sig självt.

**5. Varje rörelse löser ut åt ett håll.**
Ingen studs, ingen fjäder, kameran åker aldrig förbi målet. En och samma easing överallt.
Glaspartier glider eller viks i 1000–1600 ms: en rörelse som föreställer tunga glaspartier
får inte se ut som ett klick.

**6. Måtten syns i modellen, på dess egna kanter, med enhet.**
Bredd, djup och höjd som linjer med ändmarkeringar längs rummet, som hos Renson. Talen
är samma tal som byggde rummet. Etiketterna får aldrig ligga på varandra eller under panelen.

**7. Rummet är motivet: det tar minst 55 % av den fria ytans bredd i utifrånvyn och
nuddar aldrig panelen, knappraden eller solkortet.**

---

## Prestandagolv

- Ingen bildruta ritas när ingenting händer (0 bilder per sekund i vila).
- Inga nya shaderprogram efter laddskärmen, oavsett val.
- Ett måttbyte (bygga om rummet) tar under 16 ms på en fyrdubbelt strypt processor, så
  reglaget följer fingret.
- Ritanrop under 250 i alla lägen.
