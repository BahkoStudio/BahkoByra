# Alltfix Stockholm AB — lead (VARM: prototyp utlovad i DM)

**Instagram:** [@alltfixstockholm](https://www.instagram.com/alltfixstockholm/) — 12 inlägg, 14 följare. Bio ordagrant: "Vi på Alltfix är din renoveringsfirma i Stockholm när det kommer till: -Fönster -Altan/uterum -Måleri. Hör av dig för en kostnadsfri offert!"
**DM 2026-09-14:** Mathias lovade prototyp inom 48 timmar och erbjöd ett introsamtal.
**Hemsida:** [fixfonster.se](https://fixfonster.se/) — "Fix Fönster AB – Din utsikt. Vår kvalitet." WordPress. Sidfoten säger "Vi är Alltfix. Alltfix Stockholm AB är din lokala partner för fönsterbyte" med org.nr 559272-2341.
**Offerta:** [offerta.se/foretag/alltfix-stockholm-ab](https://offerta.se/foretag/alltfix-stockholm-ab) — **4,8 i betyg på 10 omdömen**.
**Demo:** `bahkobyra.se/alltfix/` (källa: `web/app/(demo)/alltfix/`)
**Status:** demo byggd 2026-09-14 på golvvision-kanon med hero som före/efter-effekt. Inte skickad.

## ⚠️ Namnfälla

**alltfix.se är en STÄDFIRMA och ett helt annat bolag** (Almega-medlem, hemstäd och lokalvård, hej@alltfix.se). Förväxla inte. Den här kundens sajt är fixfonster.se och deras mejl är support@alltfix.com.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Firmanamn | Alltfix Stockholm AB | IG, sajt, Offerta |
| Org.nr | 559272-2341 | fixfonster.se sidfot |
| Adress | Vintervägen 16, 177 60 Järfälla | sajt + Offerta |
| E-post | support@alltfix.com | sajt + Offerta |
| Kontaktperson | Rami | Offerta |
| Betyg | **4,8 av 10 omdömen** på Offerta, medlem sedan 2025 | Offerta |
| Kvalitetsstämplar | godkänd för F-skatt, registrerad för moms, skuldsaldo 0 kr, godkänd kredithistorik | Offerta |
| Tjänster (sajten) | uPVC-, aluminium-, trä- och trä-aluminiumfönster, skjut- och viksystem, garageportar, ytterdörrar, insektsnät, balkonginglasning, bioclimatic pergolas | fixfonster.se |
| Tjänster (IG) | fönster, altan/uterum, måleri | IG-bio |
| Egna löften (Offerta) | direktleveranser från tillverkare **utan mellanhänder**, leverans **upp till 15 arbetsdagar**, teknisk rådgivning, måttagning, montering, slutkontroll, **20 års garanti** på samtliga produkter | Offerta |
| Process | sexstegsprocessen på demon är sajtens egen, ord för ord | fixfonster.se |
| Orter i omdömena | Huddinge, Tyresö, Upplands Väsby, Botkyrka, Spånga, Sundbyberg, Värmdö, Österåker | Offerta |

Tre omdömen citeras ordagrant på demon (Kawa, Oscar, Tomas) med namn, jobb, ort och datum som de står på Offerta.

## INTE verifierat

Antal anställda, grundat år, priser, Google-betyg. (Telefonnummer saknades 2026-09-14 men står sedan dess på alltfix.com, se nedan.)

## Media — 52,5 credits

| Slot | Källa | Credits |
|---|---|---|
| **Hero: före/efter-effekt** (gammalt träfönster → nytt vitt PVC-fönster i samma hål) | Seedance 2.5 `--start-image A --end-image B`, **720p** | 32,5 |
| Varför oss (åkning över fönstermontaget) | **ffmpeg-pan ur galleribild, 0 credits** | 0 |
| Före/efter | nano_banana_2, A→B | 4 |
| Galleri: insektsnät-makro, uterum, ytterdörr, montage | nano_banana_2 (nätbilden gjordes om — första blev ett gammalt träfönster) | 10 |
| Sociala: verktyg, gamla fönster vid bilen, ljust rum | nano_banana_2 | 6 |

**Logotypen är deras riktiga**, hämtad från sajten (215×58 med alfa) och uppskalad till 645 px. Accenten är deras exakta guld, mätt ur logotypfilen: RGB(218,177,53) = #DAB135.

## Säljargument att nämna

Deras nuvarande sajt använder AI-genererade bilder (filnamn `Gemini_Generated_Image_...`) och leverantörsrenderingar med **alpvyer** i fönstren — bergssjöar, inte svenska villaträdgårdar. Demon visar svenska motiv i stället. Det är en konkret sak att peka på.

## Flaggor före utskick

- Inget telefonnummer finns. Fråga efter det.
- Formuläret går till mathias@bahkobyra.se.
- Omdömena är riktiga från Offerta, källan står utskriven. Google-profil saknas.
- Bildmaterialet är illustrationer, märkt. De har 12 egna inlägg — be om bilderna.

## 2026-09-28: 3D-konfigurator för uterum

Mathias pratade med Rami. Han vill hellre ha en **3D-prototyp för uterum** än hemsidedemon, "typ i samma stil" som 3D-planlösningen för mäklare. Hans nuvarande konfigurator på [alltfix.com/customize](https://www.alltfix.com/customize) är en platt fönsterram (Three.js) med form, mått, material, färg och glas, och den laddar sin ljusmiljö från en extern GitHub-adress.

**Prototyp:** `bahkobyra.se/cloud/alltfix-uterum/` (källa: `web/public/cloud/alltfix-uterum/`). Samma teknik som `cloud/planlosning-3d/`, Three.js lokalt, inget hämtas utifrån utom typsnittet.

Vad kunden gör:
- Väljer bredd 3–7 m och djup 2–4,5 m. Golvytan räknas ur samma tal som bygger rummet.
- Väljer tak (lamelltak med vridbara lameller, eller glastak), glaspartier (skjut, vik eller öppet), profilfärg, klart eller tonat glas, LED och insektsnät.
- Öppnar och stänger partierna, vinklar lamellerna och ser rummet utifrån, inifrån och ovanifrån, mot en villa med altan.
- Drar solen över en sommardag och väljer väderstreck. En rad säger om solen lyser in, från sidan eller står bakom huset.
- Delar designen som länk (allt ligger i adressen) och bokar kostnadsfritt hembesök med designen bifogad.

### Nytt verifierat (alltfix.com, 2026-09-28)

| Uppgift | Värde | Källa |
|---|---|---|
| Ny sajt | alltfix.com — "Alltfix – Fönster, Dörrar & Garageportar i Stockholm", webbshop, Klarna, 3D-konfigurator | alltfix.com |
| Telefon | +46 735 19 23 33 och +46 737 77 37 48 | alltfix.com sidfot |
| Samma bolag | Alltfix Stockholm AB, Vintervägen 16 Järfälla, org.nr 5592722341 | alltfix.com sidfot |
| Löfte | "Kostnadsfri konsultation och hembesök för att hitta den perfekta lösningen" | alltfix.com startsida |
| Färger | marin #1C1C30, knappguld #C5A572 (mätta på sidan) | alltfix.com |

### Flaggor före utskick

- **Produktutbudet:** lamelltak (bioklimatisk pergola), skjut- och viksystem och insektsnät står på fixfonster.se. **Glastak är inte bekräftat** — fråga Rami.
- Färgerna är ett urval av paletten i hans egen konfigurator, inte RAL-koder.
- Förfrågan från formuläret går med Web3Forms demonyckel till mathias@bahkobyra.se. Skarp version: egen nyckel till support@alltfix.com.
- Inga priser på sidan. Rutan i formuläret säger att bilden är förenklad och att mått, utförande och pris bestäms vid hembesöket.
- Solen är en uppskattning för Stockholm en sommardag, inte en solstudie.
- Sidan är noindex och länkas bara i DM.

### DM-utkast

> Tja Rami! Här är 3D-prototypen för uterum: bahkobyra.se/cloud/alltfix-uterum/ — kunden väljer mått, lamell- eller glastak, skjut- eller viksystem och färg, ser rummet mot sitt hus och skickar designen direkt till dig när hen bokar hembesök 💪

