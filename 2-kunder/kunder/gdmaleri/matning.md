# GD Måleri — mätning: GA4, Search Console och söndagsrapporten

Uppsatt 2026-10-13 (Mathias: "sätt upp analytics och gsc för gdmaleri … rapport varje söndag").
Koden är klar; det som står under "Cowork" görs i webbläsaren med Mathias Google-konto.

## Vad koden gör

| Del | Var | Så fungerar det |
|---|---|---|
| GA4 bakom samtycke | `web/public/gdmaleri/js/analytics.js` | Laddas av `extern/gdmaleri/app/layout.js` BARA när miljövariabeln `GDMALERI_GA_ID` finns i Vercel. Ruta "Får vi använda Google Analytics…" i GD:s färger, valet sparas i webbläsaren (`gd_consent`). Utan ja: inga cookies, ingen mätning. |
| Händelser i GA4 | samma fil | `generate_lead` (formulär skickat, nyckelhändelse), `form_forsok`, `tel_klick`, `mejl_klick`, `bokning_klick` (Cal.com), `offert_klick` (knapp till formuläret). |
| Integritetssida | `web/app/(demo)/gdmaleri/integritet/page.js` → gdmaleri.se/integritet/ | Sann text om Web3Forms, Cal.com, Instagram-inbäddningar och GA4. Länkad i footern på alla sidor tillsammans med "Cookieinställningar" (öppnar rutan igen). |
| Search Console-tagg | `extern/gdmaleri/app/layout.js` | Valfri: miljövariabeln `GDMALERI_GSC_META` skriver `<meta name="google-site-verification">`. Behövs bara om DNS-vägen inte går. |
| Söndagsrapporten | `tools/gd-rapport/` | Hämtar förra veckan från GA4 och Search Console med ett tjänstekonto, bygger PDF. Se README där. |

Inget mät-ID och ingen nyckel ligger i repot (det är publikt). Ett nytt värde i Vercel kräver en ny deploy (Deployments → Redeploy).

**Viktigt om siffrorna:** GA4 räknar bara besökare som sagt ja i rutan. Antalet förfrågningar
i rapporten ska därför tas från Web3Forms-panelen (Submissions) och Cal.com (Bookings), inte
från GA4. GA4 visar beteendet: vilka sidor, varifrån, hur många klick på numret.

## Cowork: gör en gång (ca 30 minuter)

Google-kontot är **bahkostudio@gmail.com** i alla steg (Mathias 2026-10-13). Den fullständiga Cowork-texten,
inklusive Företagsprofilen steg för steg, finns i `cowork-optimering.md`.

### 1. Google Analytics 4 (Mathias konto, Ghandi får läsrätt)
1. analytics.google.com → Admin (kugghjulet) → **Create property**. Namn `GD Måleri Sthlm AB`, tidszon Sverige, valuta SEK. Bransch "Home & garden", storlek liten.
2. **Create web data stream**: URL `https://gdmaleri.se`, namn `gdmaleri.se`. Enhanced measurement på (standard).
3. Kopiera **Measurement ID** (`G-XXXXXXXXXX`).
4. vercel.com → projektet **gdmaleri** → Settings → Environment Variables → `GDMALERI_GA_ID` = mät-ID:t, miljö Production → Save. Sedan Deployments → tre prickar på senaste → **Redeploy**.
5. Kontroll: öppna gdmaleri.se i inkognito, rutan ska synas längst ner. Tryck Okej. I GA4 → Reports → Realtime ska besöket synas inom en minut.
6. Admin → **Key events** → New key event → `generate_lead` (så räknas formuläret som konvertering).
7. Admin → Data settings → **Data retention** → 14 månader. Google Signals: av.
8. Admin → Property access management → lägg till `info@gdmaleri.se` som Viewer (om Ghandi vill se själv).

### 2. Search Console (Mathias konto)
1. search.google.com/search-console → Add property → **Domain** → `gdmaleri.se`.
2. Google visar en TXT-post. Det ligger redan en `google-site-verification`-TXT i DNS hos Hostinger (från gamla sajten, troligen Ghandis konto). Går verifieringen inte igenom: hPanel → Domains → gdmaleri.se → DNS Zone → **lägg till** en ny TXT på `@` med Googles värde (ta inte bort den gamla). Vänta några minuter, tryck Verify.
3. **Sitemaps** → `sitemap.xml` → Submit.
4. **URL-inspektion** → Request indexing, en i taget: `/`, `/fasad-malning/`, `/takmalning/`, `/malning-invandigt/`, `/golv/`, `/brf/`.
5. Settings → Users and permissions → lägg till `info@gdmaleri.se` (Full) om Ghandi vill se.
6. GA4 → Admin → Product links → **Search Console links** → koppla egendomen.
7. Spara utgångsläget: Performance → senaste 28 dagar → Export → spara i Drive-mappen för GD. (Search Console samlar bara från den dag egendomen lades till, så utgångsläget är dagens.)
8. Bonus: bing.com/webmasters → Import from GSC (ChatGPT Search använder Bings index).

### 3. Tjänstekonto för söndagsrapporten (så att rapporten kan hämtas automatiskt)
1. console.cloud.google.com → nytt projekt `bahko-rapporter`.
2. APIs & Services → Library → aktivera **Google Analytics Data API** och **Google Search Console API**.
3. IAM & Admin → Service accounts → Create → namn `gd-rapport` → Done. Öppna kontot → Keys → Add key → JSON → ladda ned.
4. Spara filen som `C:\Users\mathi\OneDrive\Dokument\gd-rapport\tjanstekonto.json` (utanför repot).
5. Kopiera tjänstekontots e-postadress (`gd-rapport@bahko-rapporter.iam.gserviceaccount.com` eller liknande):
   - GA4 → Admin → Property access management → Add → adressen → **Viewer**.
   - Search Console → Settings → Users and permissions → Add user → adressen → **Full**.
6. GA4 → Admin → Property details → kopiera **Property ID** (siffror) till `tools/gd-rapport/konfig.local.json` enligt README.

### 4. Google Företagsprofil (Ghandi)
- Ghandi loggar in på business.google.com → Users → lägger till `bahkostudio@gmail.com` som **Manager** (inte ägare).
- Statistiken (Performance: samtal, webbklick, vägbeskrivningar, sökord) går inte att hämta automatiskt utan Googles godkännande. Mathias läser av den en gång i månaden och skriver siffrorna i rapportens textfil.

### 5. Förfrågningar, så räknas de
- Web3Forms → web3forms.com → Dashboard → formuläret för gdmaleri.se → **Submissions** (antal per vecka).
- Cal.com → Bookings (Ghandis konto, eller Mathias om han får inloggning).
- Telefonsamtal syns bara som klick på numret i GA4 (`tel_klick`). Riktiga samtal vet bara Ghandi.

## Söndagsrutinen (när allt ovan är gjort)
1. `node tools/gd-rapport/hamta.mjs` (hämtar förra veckan).
2. Fyll i `tools/gd-rapport/text/vNN.md`: antal formulär (Web3Forms), bokningar (Cal.com), vad vi gjorde, nästa vecka.
3. `node tools/gd-rapport/bygg.mjs` → PDF i `tools/gd-rapport/ut/`.
4. Ögonläs PDF:en. Mathias mejlar den till info@gdmaleri.se med två meningar.
