# STOBY TAK — lead

**Instagram:** [@stobytak](https://www.instagram.com/stobytak/) — kategori Takläggare, bio "Takläggare från Stoby", 23 inlägg, 46 följare (skärmdump Mathias 2026-10-14).
**Hemsida:** [stobytak.se](https://stobytak.se/) (finns, verifierad 2026-10-14).
**Demo:** `bahkobyra.se/stobytak/` (källa: `web/app/(demo)/stobytak/`). Gren `stobytak`, ej committad.
**Status:** byggd 2026-10-14 på demomallen v3. 0 kr media. Inte skickad.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | STOBY TAK (versaler, som de själva skriver) | stobytak.se, IG |
| Bolag | Perna Consulting AB, org.nr 556967-6611, aktiebolag, reg. 2014-04-10, F-skatt, SNI 43412 | stobytak.se-footern + hitta.se |
| Ort | Stoby (Jägarevägen 3, 281 44 Stoby — adressen står inte på demon), arbetar främst i Hässleholms och Kristianstads kommuner | stobytak.se, hitta.se |
| Telefon / e-post | 0722 365 069 (alt. 0701 89 13 98) · info@stobytak.se | stobytak.se |
| Tjänster | Kompletta takbyten, plåtarbeten, rännor & avvattning, takfönster, papptak, skorstenar & detaljer | stobytak.se |
| Garanti | "materialgaranti upp till 30 år enligt tillverkarens villkor" | stobytak.se |
| Team | flera arbetslag: takläggare, plåtslagare, tätskiktsmontörer (svetsad takpapp); "samlad erfarenhet ... mer än tio år" | stobytak.se/om-oss |
| Process | besiktning → skriftlig offert → arbete → protokoll + garantidokument; kostnadsfri besiktning och offert; städat efter | stobytak.se |
| Omdömen | Slöjd kanalen, Vilma Johansson, Huibert Oostra (ordagrant, kortade) + "5,0 av 5 på Google" utan antal | stobytak.se startsida |
| IG-inlägg | Dcy1LBkiDR_ (300 m² Benders Candor), DdKHMqcnSOs (nockreparation), DcdllLLjS7Y (valmtak i Huaröd) | IG-embed |

## INTE verifierat — står inte på demon

Google-betygets antal (därför inget betyg, QA i läge `sajt`), "byter ditt tak på 3 dagar" (deras FAQ, utelämnat), priser, antal projekt, grundår för varumärket.

## Media

Allt är deras egna foton: stobytak.se/images (galleri) + bilder ur IG-embed. Hero = deras foto `gallery-1` (tegelvilla med svart tak) i långsam inzoomning (ffmpeg, 0 kr) — **ingen genererad förvandling**, Higgsfield-nyckeln (`tools/hf-api/.env.local`) saknas på lådan. Varför = deras IG-foto + logokort. Kontakt = heron suddad. Logotypen friställd ur stobytak.se/images/logo.png (svart + vit variant). Skärmdumpen från Mathias användes inte (behövdes inte).

## Design

Svart-vitt som logotypen (`mork #0B0B0C`), accent tegelröd `#B42318` ur deras egna röda tegeltak (skillen förbjuder grå/svart knappfärg vid svartvit logga). Hero: logga + "Stoby · Hässleholm" + "Takbyte & Plåt."

## Flaggor före utskick

- Formuläret går till mathias@bahkobyra.se (demonyckeln).
- Riktigt telefon, mejl och org.nr på sidan — visa INTE offentligt (noindex).
- Omdömena är från deras sajt (som säger att de är Google-omdömen); inte kontrollerade direkt på Google, därför inget G-märke.
- Hero är en lugn foto-film, inte förvandlingen. Kan ersättas med Kling-förvandling (~0,25–0,4 USD) när nyckeln finns.
- Jobbilderna ur IG-embed är 1080 px; `jobb-rott-tegeltak.jpg` är uppskalad från 776 px.

## DM-utkast (svenska, högst två meningar)

> Hej Sebastian! Vi har byggt ett kostnadsfritt förslag på ny hemsida för STOBY TAK med era egna takbilder och omdömen: bahkobyra.se/stobytak/ — säg till om du vill se den skarpt.
