# Veckorapport till GD Måleri Sthlm AB

Varje söndag får GD en PDF på en sida med tre saker: besök på gdmaleri.se, förfrågningar
(formulär, telefonklick, bokningsklick, mejlklick) och Google-statistik (klick, visningar,
sökord från Search Console). Allt jämförs med veckan före.

## Så kör du på söndagen (två kommandon)

Öppna en terminal i repo-mappen och kör:

```
node tools/gd-rapport/hamta.mjs
node tools/gd-rapport/bygg.mjs
```

Det första hämtar förra veckans siffror (måndag till söndag) från Google och sparar dem i
`tools/gd-rapport/data/`. Det andra gör PDF:en i `tools/gd-rapport/ut/`, till exempel
`ut/Rapport-v42-GD-Maleri-2026-10-18.pdf`. Mejla den PDF:en till GD.

Vill du ha en annan vecka än förra: lägg till `--vecka 2026-W42` på båda kommandona.

### Texten i rapporten

Rapporten har två textrutor, "Vad vi gjorde den här veckan" och "Nästa vecka". De fylls
från en liten textfil per vecka: `tools/gd-rapport/text/v42.md` (veckonumret med två siffror).
Kopiera `text/exempel.md`, döp om den och skriv om punkterna innan du kör `bygg.mjs`.
Saknas filen byggs rapporten ändå, men med en platshållare i rutorna.

Håll texten kort. Blir rapporten längre än en sida säger `bygg.mjs` till, och sidfoten
visar då "sida 2 av 2".

### Kontrollera innan du mejlar

`bygg.mjs` gör också en PNG-bild av sidan bredvid PDF:en. Öppna den eller PDF:en och titta
att siffrorna ser rimliga ut och att sidfoten "Bahko Byrå · bahkobyra.se" syns längst ned.

### Prova utan nycklar

```
node tools/gd-rapport/hamta.mjs --exempel
node tools/gd-rapport/bygg.mjs --exempel
```

Det ger en rapport med påhittade siffror och en röd stämpel "EXEMPELDATA". Skicka aldrig den
till kunden.

## Det som behövs en gång (engångsinstallation)

Verktyget loggar in hos Google med ett tjänstekonto (ett "robotkonto" med en nyckelfil).
Nyckelfilen ligger utanför repot, på
`C:\Users\mathi\OneDrive\Dokument\gd-rapport\tjanstekonto.json`. Repot är publikt, så lägg
aldrig nyckeln någonstans i repo-mappen.

1. Gå till Google Cloud Console (console.cloud.google.com), logga in med Bahkos Google-konto
   och skapa ett projekt, till exempel "gd-rapport".
2. Under "APIs & Services > Library": aktivera **Google Analytics Data API** och
   **Google Search Console API**.
3. Under "APIs & Services > Credentials": skapa ett **Service account** (tjänstekonto).
   Namnet spelar ingen roll. Öppna kontot, fliken "Keys", "Add key > Create new key > JSON".
   Filen laddas ned. Flytta den till sökvägen ovan och döp den till `tjanstekonto.json`.
4. Kopiera tjänstekontots e-postadress (slutar på `.iam.gserviceaccount.com`).
5. I **Google Analytics** för gdmaleri.se: Admin > Property access management > plus-knappen >
   klistra in adressen, roll **Viewer** (Läsare).
6. I **Search Console** för egendomen `sc-domain:gdmaleri.se`: Inställningar > Användare och
   behörigheter > Lägg till användare > klistra in adressen, behörighet **Fullständig** (eller
   Begränsad, båda räcker för att läsa).
7. Hitta GA4-propertyns id (siffror, står under Admin > Property > Property details, "Property ID")
   och skapa filen `tools/gd-rapport/konfig.local.json` med:

   ```
   { "ga4Property": "123456789" }
   ```

   Filen är gitignorerad. Det går också att sätta miljövariabeln `GD_GA4_PROPERTY` i stället.

Valfritt i samma fil: `"scSajt": "sc-domain:gdmaleri.se"` om egendomen heter något annat, och
`"nyckel": "C:\\annan\\sokvag\\fil.json"` om nyckeln ligger på ett annat ställe (miljövariabeln
`GD_RAPPORT_NYCKEL` gör samma sak).

Kör sedan `node tools/gd-rapport/hamta.mjs`. Går något fel står det på svenska vad som saknas
(nyckelfil, property-id eller åtkomst).

## Bra att veta

- **Search Console släpar två till tre dagar.** Körs rapporten på söndagskvällen saknas ofta
  fredag till söndag i Google-siffrorna. Vill du ha hela veckan: kör `hamta.mjs` på onsdagen
  efter med `--vecka` för den vecka som ska in, och bygg om.
- **GA4 mäts bara efter samtycke.** Besökare som tackar nej till kakor syns inte. Siffrorna
  är därför alltid något lägre än verkligheten.
- **Formulärtyp per förfrågan** (parametern `formular` på `generate_lead`) går att hämta
  först när parametern är registrerad som anpassad dimension i GA4 (Admin > Custom definitions).
  Innan dess hoppar verktyget tyst över den delen.
- **Google Företagsprofil** (visningar, samtal och vägbeskrivningar från Google Maps) går
  **inte** att hämta automatiskt. Googles API för det kräver en särskild ansökan och
  Googles godkännande. Titta i profilen för hand (business.google.com > Resultat) och skriv
  siffrorna i textrutan om de ska med.
- Inga npm-paket behövs. Allt är inbyggt i Node (version 24). PDF:en görs med Microsoft Edge,
  som redan finns på datorn.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `hamta.mjs` | hämtar siffrorna från Google och sparar JSON i `data/` |
| `bygg.mjs` | fyller mallen, skriver HTML, PDF och PNG till `ut/` |
| `rapport.html` | mallen för rapportsidan (GD:s färger, Outfit) |
| `vecka.mjs` | veckoräkning (ISO-veckor, måndag till söndag) |
| `text/exempel.md` | mall för veckans text, kopieras till `text/vNN.md` |
| `konfig.local.json` | property-id med mera, gitignorerad |
| `data/`, `ut/` | hämtad statistik och färdiga rapporter, gitignorerade |
