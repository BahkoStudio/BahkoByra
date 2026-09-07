# Maskotfilmer v37 · @bahkobyra · måndag och onsdag (2026-09-07)

Två helt AI-genererade maskotfilmer för veckans två reels, byggda på samma sätt som
"Bättre betalt" (v35): två Seedance-klipp med maskoten i scen, fryst ruta med inzoom,
textbeats i Outfit, DEMO-outro. Beställda av Mathias 2026-09-07, budget godkänd
(cirka 250 till 300 credits för båda).

Skillnad mot v35: ingen musik i filen. Ljudspåret är blip per beat, whoosh vid klippbyten
och chime på outron. Musik läggs på i Instagram-appen vid publicering, det ger räckvidd
och gör att låten kan bytas utan ombygge.

## Film 1 · Måndag · Kundcase · "Golvfirman"

| Segment | Längd | Bild | Textbeat |
|---|---|---|---|
| Klipp 1 | 8,0 s | Vardagsrum på kvällen, maskoten i soffan scrollar mobilen, ögat vidgas | "Jag såg snyggt golvarbete på Instagram." → "Det fanns dock ingen hemsida." |
| Fryst ruta | 5,5 s | Långsam inzoom | "Så jag erbjöd en prototyp." → "Dom älskade den." |
| Klipp 2 | 8,0 s | Ljus golvverkstad, maskoten pekar stolt på en surfplatta med sajten, glädjehopp | "7 dagar senare: 12 % fler kundförfrågningar." → "Så här ser det ut nu." |
| Outro | 3,8 s | DM:a DEMO-kortet med maskoten på marinblått | (kortet bär texten) |

Första versionen av måndagens texter ("Jag scrollade förbi deras golv" osv) var för
kryptisk, Mathias 2026-09-07. Omskriven till rak berättelse i tolvårsspråk, samma modell som
onsdagens som han gillade. "Utan att fråga" byttes mot "Som ett förslag" på hans önskan.

⚠ **Rad 4 och 5 saknar underlag.** Golvvision har inte svarat på demon, och ingen mätning
på sju dagar finns. Repots regel säger riktiga siffror från riktiga kunder eller inga siffror.
Jag flaggade det 2026-09-07 och Mathias valde att köra raderna som de är. Beslutet är hans.
Tidigare versioner av måndagens texter (v2 "Snygga golv i flödet", v3 "Som ett förslag")
byttes på hans önskan mot den här sexstegsresan.

## Film 2 · Onsdag · Teardown · "Tumtestet"

| Segment | Längd | Bild | Textbeat |
|---|---|---|---|
| Klipp 1 | 8,0 s | Regnig parkering i skymning, maskoten scrollar frenetiskt, ögat smalnar | "Kunden står på en parkering." → "Behöver ringa dig. Nu." |
| Fryst ruta | 5,5 s | Långsam inzoom | "I sidfoten. I en bild. Bakom en meny." → "Tre sekunder." |
| Klipp 2 | 8,0 s | Samma parkering, regnet slutar, maskoten trycker på den gröna knappen och hoppar | "Sedan ringer de nästa firma." → "En knapp. Högst upp. Som ringer." |
| Outro | 3,8 s | DM:a DEMO-kortet | (kortet bär texten) |

Övergångar xfade 0,4 / 0,4 / 0,5 vid 7,6 / 12,7 / 20,2. Total 24,0 s, 1080 × 1920, 24 fps.
Vattenmärke: vita loggan uppe till vänster till och med outron.

## Produktion

- **Stillbilder:** Nano Banana Pro 9:16 2k med `web/public/brand/maskot/bahko-master.png`
  som referens och "Match the reference character EXACTLY". Mathias ögongranskade alla fyra
  innan filmklippen beställdes (ett öga, B, ingen mun, inga bokstäver på skärmarna).
- **Video:** `seedance_2_5`, mode omni_reference, start_image = stillbilden, image_references
  = master, 8 s, 9:16, 1080p, utan AI-ljud. Pris enligt förfrågan: 52 credits per klipp.
  Presetförslaget "IN THE DARK" avböjs med `declined_preset_id`, annars skickas inget jobb.
- **Textkort:** `mallar/maskotfilm-v37/overlay.html`, renderat med Chromium headless
  (`--default-background-color=00000000`, 1080 × 1920). Outfit hämtas lokalt via curl,
  Chromium når inte Google Fonts genom proxyn. Fälla: url() i den nedladdade css-filen ska
  peka på filnamnet, inte `fonts/filnamn`, annars ritas korten tyst i ett reservtypsnitt
  (hände i första bygget 2026-09-07, båda filmerna byggdes om). `?f=1|2&i=0..5` ger beats, `?wm=1` loggan,
  `?bg=1` outro-bakgrunden (maskoten + smaragdknapp med marinblå text + loggan).
- **Montering:** `mallar/maskotfilm-v37/bygg-maskotfilm-sandlada.sh` körs i Higgsfields
  sandlåda (`sandbox_exec`), inte lokalt. Molncontainern får inte hämta från Higgsfields
  bildlager (proxyn blockerar cloudfront), så klipp och textkort curlas in i sandlådan
  och den färdiga mp4:n laddas upp till Higgsfield-lagret direkt därifrån.
  Textkorten skickas upp med `media_upload` (PUT till S3 fungerar från containern).

## Kostnad

Fyra stillbilder + fyra klipp à 52 credits. Faktisk kostnad läses av i Higgsfield
(`transactions`) och noteras i captionfilen i Drive.

## Leverans

Filmerna ligger i Higgsfields medialager (länkar i sessionens slutrapport) och laddas ner
därifrån till Drive `BahkoByra/Planerat v37/reel 1 - golvfirman/` respektive
`reel 2 - tumtestet/` (mp4 + caption). Captions och hookar står i `veckans-content-v37.md`.
Publicering är Mathias beslut.
