# Bahko OS — kommandocentralen

**Adress:** `https://www.bahkobyra.se/cloud/os-4337c997e7/` (noindex, skyddad av
obskyr adress precis som CRM:et). Källa: `web/public/cloud/os-4337c997e7/index.html`,
en självbärande fil på sop-ringa-routerns mönster.

## Vad OS:et är

Operativsystemet för varumärke, content och leads, byggt på två ramverk:

- **Design-OS-idén:** ett Claude-byggt system med moduler som växer, där varje
  förmåga kodifieras till en skill (`/design-loop`, `/famous-reel-editor`,
  `/bahko-reel` är exempel).
- **Varumärket som spel:** publiken är huvudpersonen, content är questlinjen.
  Fienden (Osynligheten), huvudpersonen (Förstavalet), metoden
  (48-timmarsprototypen) och missionen (Inga fler förlorade jobb) bor i
  OS:ets Spelvärld, som är FILTRET för allt content. Knappen "Kopiera som
  AI-kontext" matar strategin till Claude-sessioner.

Modulerna: Kommandobryggan (dagens uppdrag, 15-minutersrutinen),
Spelvärlden, Säsongen (90 dagar, 13 veckokapitel), Instagram, YouTube,
LinkedIn, Manus (äger all kopierbar text), SOP:er, Kundverkstan.

## Data — var saker bor

| Nyckel | Innehåll | Karaktär |
|---|---|---|
| `bb_os_v1` | spelvärlden + säsongen | lågfrekvent, dyrt att förlora |
| `bb_os_logg_v1` | KPI-rader, dagens checklista, MVL-läge, idébanken | högfrekvent |

Båda är **formfrysta** när de tagits i bruk (Heligt-listan) och åker med i
CRM:ets backup (bb_-prefixet). OS:et har dessutom egen Export-knapp.
`bb_crm_v2` och `bahko_sop_dagslogg_v1` läses på sin höjd — **skrivs ALDRIG**
från OS:et. Korrupt data stashas som `<nyckel>_korrupt_<ts>` och nyckeln sås om.

**Origin-regeln:** datat bor på www.bahkobyra.se. OS:et redirectar självt bort
från bahkobyra.cloud (samma /cloud/-rewrite serverar båda värdarna).

## Rutinerna OS:et äger

- **Fredag 15:00:** veckans KPI skrivs in per kanal I OS:ET, alla tre —
  Instagram, YouTube, LinkedIn. Detta ersätter IG-loggen i Google Sheet V1
  (Mathias beslut 2026-08-27). Målet är 3 inkommande DEMO per vecka,
  **summerat över de tre kanalerna**, inte bara Instagrams DM-fält.
- **IG-veckocadence (beslut 2026-08-27):** 2 maskotreels (/bahko-reel) +
  2 karuseller (/ig-karusell — `/instagram-engine` är projektlokal och syns
  bara i den här sessionen, /ig-karusell är den globala som alltid går att
  köra) + 1 bildkort + 1 ansiktspost (/famous-reel-editor) + dagliga stories.
- **Publiceringen är en egen rutin, inte admin:** Kommandobryggans dagens
  uppdrag har en publiceringsrad utöver 15-minuters-taket, byggd ur samma
  veckoschema som SOP:ernas veckokort (`VECKOSCHEMA` i index.html), så de
  aldrig kan säga olika saker.
- **Kraschvecka:** endast tisdagens karusell + DM/kommentarer/story +
  betalt kundarbete (Bromma) körs. Allt annat väntar utan dåligt samvete.
- **Säsongsbyte efter vecka 13:** Export-knappen arkiverar JSON:en → skriv
  nytt tema och nya kapitel i Säsongen → uppdatera startdatum. OS:et vet
  själv om säsongen inte börjat, pågår, eller är slut (`sasongslage()`).

## Regler för agenter

1. Spelvärldens **kanalmatris är copy-lag**: Google-löften ENDAST på
   bahkobyra.se/offert, garantin aldrig i IG-poster, pris endast i offert.
2. Manus-modulen äger all kopierbar text — dubbleras aldrig i andra moduler
   eller dokument; ändras texten, ändras den där.
3. Nya moduler byggs i samma fil, samma BLAD-mönster, och kvalitetssäkras
   med `/design-loop` innan merge.
4. OS:et kräver 0 credits. Allt som kostar (soul-id, media) är beställningar.

## Kritikerloopens historik och läge (efter runda 10)

OS:et gick genom tio rundor av `/design-loop`: nio färska kritiker (tre bitar
× brief/system/craft) dömer renderat resultat, hårt, varje runda. PASS-antal
per runda: 0, 2, 1, 1, 1, 1, 0(2 tappade på sessionsgräns), 1, 1 av nio.
Mathias beslut efter runda 10: **detta är sista rundan.** Allt som kritikerna
dömde `blockerande` i runda 10 är fixat och verifierat mot regressionssviten
(`C:\Users\mathi\AppData\Local\Temp\claude\...\os-tester\regression.mjs`,
finns bara lokalt i skraptpad — flytta in i repot om loopen körs igen).
Två kritiker (A/craft, C/craft) dog på sessionsgränsen och hann aldrig döma
runda 10 — deras bitar (Kommandobryggan/Spelvärlden/Säsongen, craft-linsen)
är alltså inte independently craft-granskade i den sista rundan.

### Kvar att göra, inte blockerande

**Diagrammet (Instagram/YouTube/LinkedIn, KPI-kortet):**
- Tomt läge (`.stapel-nyckel`) förklarar ett diagram som inte finns på skärmen
  när ingen vecka är loggad — exakt läget just nu, säsongen har inte börjat.
  Snabbfix: dölj nyckeln med samma villkor som `st.hidden`.
- Mållinjens etikett "mål 3 totalt" har 4,18:1 kontrast (krav 4,5:1) pga
  `opacity:.65` på hela linjen som ärvs av texten.
- Staplarna är vänsterklumpade med `max-width:48px` medan mållinjen sträcker
  sig över hela kortets bredd — ser ojämnt ut med få loggade veckor.
- Instagram saknar dubbelräkningsregeln ("räkna en demo en gång, i den
  kanalen") som YouTube och LinkedIn redan har.
- Sammanfattningsraden under tabellen ("Vecka 2: 2 av kanalens bidrag...")
  är otydlig svenska, bör skrivas om till en hel mening.
- Sex av nio KPI-fält (Räckvidd, Sparningar, Prenumeranter, Visningar,
  Reaktioner) har inget riktmärke och ingen koppling till en åtgärd.

**Kommandobryggan / Säsongen:**
- Pre-säsong-checklistan (förbered kapitel 1) nollställs varje dag i stället
  för att komma ihåg vad som redan är gjort.
- Ingen åtgärdsrad kopplad till "under målet" — samma dagslista oavsett om
  veckan gav 0 eller 4 demo.
- Efter säsongsslut ber dagslistan ändå om "posta dagens story ur veckans
  pack" trots att inget pack finns i det läget.
- Tom veckoruta vid KPI-sparning: raden sparas ändå (utan vecka), ingen
  varning ges.

**Spelvärlden:** Kanalmatrisen har kolumner för "IG/DM/reels" och "Cold
email/samtal" men ingen för YouTube eller LinkedIn — två av de tre kanaler
som faktiskt mäts mot målet 3 DEMO/vecka.

**Manus:** JA-protokollets exempelfriktioner påstår sig komma från
Kundverkstans "Grundfel först" (stämmer inte, de är fristående). Länken "Se
kanalmatrisen" ligger inne i löptext i stället för i en `.lank-rad` som
resten av OS:et. Ingen genväg till YouTubes titelmallar (bara LinkedIns).

**SOP:er:** Månadsrutinens "Nyhetsbrevet ur content/email" pekar på en tom
mapp utan mall eller mottagarlista.

**Kundverkstan:** smamaleri.se:s uppsell-rad har varken datum eller pris.
Den döda CSS-klassen `las` på de tre farliga demolänkarna (ekstromsbygg,
k9maleri, svhus) sätter ingen faktisk visuell varning — de ser ut som vilken
mall-länk som helst trots rubriken "Visa aldrig offentligt".

**Formspråk (litet, konsekvent men odokumenterat femte mönster):** en fylld
smaragdknapp utan ram används för "Spara"/"Spara vecka", vid sidan om de fyra
formerna (tagg/kopiera/knapp--ram/mini-knapp) som står skrivna i CSS-
kommentaren. Fungerar konsekvent, bara inte nedskriven.

**Städning utan funktionell effekt:** 14–18 olika textstorlekar över hela
OS:et där flera ligger under en pixels skillnad — ingen ser det, men det
finns ingen fastslagen skala att bygga vidare på. Flödesraden i Instagram/
YouTube bryter till en udda tvårads-layout mellan ca 700–760px.
