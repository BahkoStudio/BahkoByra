---
name: optimering
description: Använd när en kundsajt ska optimeras för Google, AI-svar eller konvertering — SEO, lokal SEO, GEO (generative engine optimization), AEO (answer engine optimization), schema markup, Google Företagsprofil, eller teknisk sajtgranskning. Trigga på "optimera sajten", "SEO för [kund]", "GEO/AEO", "schema markup", "ranka på Google", "synas i AI-svar", "Google Business Profile", "varför syns vi inte", eller när någon föreslår en SEO-åtgärd och du behöver kontrollera om den faktiskt fungerar eller är en myt.
argument-hint: [kund eller sajt, t.ex. "brommatradgardsservice"]
---

# Optimering — SEO, GEO, AEO och sajt

Den här skillen finns för att SEO-branschen är full av påståenden som upprepas tills de låter som fakta. Skillens värde ligger inte i en åtgärdslista, utan i att **skilja dokumenterat från spekulation** och i att veta vad man inte ska göra.

Underlaget kommer från en korsgranskad kartläggning (juli 2026): fyra parallella utredningar med källsökning, var och en granskad av en separat skeptiker med uppgift att hitta branschmyter. Detaljer, schema-mallar och full evidenstabell finns i [reference.md](reference.md).

## Grundregler

**1. White hat, utan undantag.** Ingen dold text, ingen cloaking, inget review-schema på egeninsamlade omdömen. Kundens sajt är kundens levebröd, en manuell åtgärd från Google kan slå ut den. Detta är också projektets stående regel (`workflows/local_seo_delivery.md`).

**2. Ange alltid evidensgrad.** Varje rekommendation märks:
- **Dokumenterat** — Google, schema.org eller plattformens egen dokumentation säger det
- **Sannolikt** — flera oberoende källor med faktisk data
- **Spekulation** — SEO-bloggar utan underlag, eller leverantörssiffror
- **Fel** — motsägs av dokumentation

Säg aldrig "det här ger 30 % mer trafik" utan att kunna peka på mätningen. De flesta sådana siffror kommer från verktygsleverantörer som säljer lösningen.

**3. Blockerare före finlir.** Om sajten ligger på fel domän, saknar egen URL eller inte är indexerbar är allt annat arbete preliminärt. Kolla det först, varje gång.

## Steg 1 — Kontrollera blockerarna

Kör dessa innan något annat. Om någon fallerar: åtgärda den först, resten är bortkastat.

1. **Egen domän?** Ligger sajten på kundens domän eller i en undermapp hos oss (`bahkobyra.se/cloud/...`)? Ingen egen domän = ingen egen entitet, oavsett hur bra schemat är.
2. **Indexerbar?** `noindex` borttagen, `robots.txt` tillåter, canonical pekar rätt.
3. **Canonical-konflikt?** Pekar canonical på en URL med annat innehåll? Då får Google motstridiga signaler.
4. **Innehåll i rå HTML?** Se Steg 2.

Vid domänflytt: 301 från gamla URL:en, ta bort raden ur vår `sitemap.xml`, uppdatera canonical, verifiera i Search Console.

## Steg 2 — Verifiera att maskiner ser innehållet

**Kritiskt faktum (dokumenterat):** de stora AI-crawlerna kör inte JavaScript. GPTBot, ClaudeBot, PerplexityBot och Bytespider laddar ibland ner JS-filer men exekverar dem aldrig (Vercel/MERJ, 500M+ crawls). Undantaget är Google/Gemini som använder Googlebots renderingsmotor.

För våra scroll-cinematic-sajter betyder det: **innehållet måste finnas i rå HTML.** GSAP som animerar `opacity` är OK, innehållet lämnar aldrig DOM:en. Men CSS som döljer sektioner statiskt är en gråzon.

Kör det här på filen:

```bash
python3 - <<'PY'
import re, pathlib
h = pathlib.Path('index.html').read_text()
body = h.split('<body>',1)[1]
body = re.sub(r'<script.*?</script>',' ',body,flags=re.S)
body = re.sub(r'<style.*?</style>',' ',body,flags=re.S)
text = re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',body)).strip()
print('ord utan JS:', len(text.split()))
for t in ['<nyckelfras 1>','<nyckelfras 2>']:
    print(('JA ' if t.lower() in text.lower() else 'NEJ'), t)
print('H1:',len(re.findall(r'<h1',h)),'H2:',len(re.findall(r'<h2',h)),'H3:',len(re.findall(r'<h3',h)))
PY
```

Under ~800 ord i rå HTML är ett problem. Saknas nyckelinnehåll är det ett större problem.

## Steg 3 — Åtgärder som ger faktisk effekt

Rangordnat. Gör uppifrån.

**1. Google Företagsprofil.** Primärkategorin är den enskilt viktigaste inställningen. Sätt den exakt, max tre underkategorier (fler späder ut). Komplett NAP, öppettider, tjänsteområden som orter, riktiga foton. *Dokumenterat.* Effekt: hög. Lokala AI-svar och Maps hämtar härifrån, inte från sajtens HTML.

**2. Recensioner.** Volym, färskhet och svar på varje. Detta är den enda kanal där stjärnor faktiskt visas för användaren, aldrig via eget schema. *Dokumenterat.* Effekt: hög.

> Vanligt läge hos våra kunder: de har många omdömen på en offertplattform (Offerta, Servicefinder) men få på Google. De påverkar inte Google alls. Att systematiskt flytta över nöjda kunder är ofta den billigaste stora hävstången i hela uppdraget.

**3. Egna URL:er per tjänst.** Bryt ut 3–5 sidor (en per huvudtjänst) från one-pagern. Tio ämnen på en URL späder ämnesfokus, och passage-retrieval fungerar bättre med fokuserade sidor. *Sannolikt.* Effekt: medel–hög. Gör det i samma veva som domänflytten, annars byter du URL två gånger.

**4. Områdessidor.** För service area businesses: dedikerade ortssidor är inte valfria. Bygg dem bara för orter där kunden faktiskt utfört jobb, och baka in det riktiga omdömet från den orten. *Sannolikt.* Ett överbrett tjänsteområde skadar aktivt.

**5. Komplettera schema.** Se [reference.md](reference.md) för mallar och fältlista. Effekt: medel, och det handlar om entitetsförtydligande, inte ranking.

**6. Bing Places + Bing Webmaster Tools.** ChatGPT Search lutar mot Bing-indexet. *Dokumenterat.* Effekt: medel, kostar en halvtimme.

**7. Mätplan innan, inte efter.** Serverloggar filtrerade på GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot, GA4-segment på referrals från chatgpt.com och perplexity.ai. Utan baslinje går det inte att veta om något fungerade.

## Steg 4 — Innehåll som AI faktiskt citerar

Tre kontrollerbara variabler: **struktur, färskhet, trovärdig källa.**

- **Svara på frågan först, utveckla sedan.** Innehåll som begraver svaret citeras inte.
- **Självbärande stycken.** Varje sektion ska gå att lyfta ut och fortfarande vara begriplig. Skriv ut företagsnamn och ort i stället för "vi" och "här".
- **Källhänvisa verifierbara påståenden.** Särskilt regler, priser och myndighetskrav. Det är också vad som gör innehållet svårt för konkurrenter att kopiera.
- **Konkreta siffror slår adjektiv.** "2 tons minigrävare" är citerbart, "modern maskinpark" är det inte.

**Guldregel för fakta:** slå upp regler i primärkällan innan de skrivs på en kundsajt. Skatteregler, branschkrav och avdrag är områden där de flesta konkurrenter har fel, och där en korrekt formulering blir ett säljargument. Exempel: rutavdrag gäller trädgårdsskötsel men inte nyanläggning, och vid häckbyte ger borttagningen avdrag medan planteringen inte gör det.

## Steg 5 — Konverteringsgranskning

SEO utan konvertering är trafik utan intäkt. Kontrollera alltid:

- **Syns telefonnumret på mobil utan att öppna menyn?** Vanligaste felet i vår egen mall, navigationen göms bakom hamburgaren och numret följer med.
- **Svarar sidan på "vad kostar det"?** Tystnad läser som "det blir dyrt". Går det inte att sätta pris, förklara varför och sälj in det kostnadsfria besöket.
- **Hur långt ner ligger första sociala beviset?** Mät i skärmhöjder på mobil. Ligger omdömena sju skärmar ner ser de flesta dem aldrig.
- **Finns en ring-CTA, inte bara formulär?** För hantverkstjänster är samtal ofta den konverterande handlingen.

## Svartlistan — gör aldrig

| Åtgärd | Varför |
|---|---|
| Dold text, cloaking, text bakom `visibility:hidden` för sökmotorer | Riktlinjebrott, riskerar manuell åtgärd |
| `Review`/`AggregateRating`-schema på egeninsamlade omdömen | Självbetjänande recensioner otillåtna sedan 2019 |
| `["Service","Product"]` för att tvinga fram stjärnor | Direkt spampolicybrott |
| Blockera GPTBot/ClaudeBot/PerplexityBot i robots.txt | Stänger dörren till AI-synlighet utan vinst |
| Blockera Google-Extended "för säkerhets skull" | Påverkar inte Search, men stänger Gemini |
| Wikidata-post för småföretag | Raderas rutinmässigt utan oberoende källor |
| Citera Whitespark-procent ("GBP = 32 % av vikten") som fakta | Åsiktsenkät bland konsulter, inte mätdata |

## Bortkastad tid (inte farligt, men gör annat)

- **Mer arbete på FAQPage-schema.** Rich results begränsade till myndighets- och hälsosajter sedan aug 2023, dokumentationen deprecerad maj 2026. Behåll befintlig markup, investera inte mer. Själva FAQ-*innehållet* är fortfarande värt att ha, det är schemat som inte ger något.
- **BreadcrumbList på one-pager.** Desktop-only sedan jan 2025, meningslös utan hierarki.
- **`WebSite`/`SearchAction`.** Dött sedan 21 nov 2024.
- **`Person`-schema med `hasCredential` för E-E-A-T.** E-E-A-T går inte att märka upp. Skriv i stället "Jens, 12 år i yrket" i brödtext med före/efter-bilder.
- **llms.txt.** Google stödjer det inte, OpenAI har inte adopterat det. Anthropic och Perplexity läser den. Mätningar visar att de allra flesta filer får noll requests. Gör den om kunden vill, den skadar inte, men sälj den aldrig som en åtgärd med effekt. Den måste ligga i **domänroten** för att hittas alls.
- **llms-full.txt, ai.txt, Cloudflare Content Signals.** Ingen dokumenterad effekt.

## Bolagsform-ändring (enskild firma → AB)

Nytt organisationsnummer är en ny juridisk entitet. Fel ordning kan slå ut etablerade signaler.

1. Bolagsverket klart först
2. Sajt, schema och footer
3. Google Företagsprofil — **byt namn på befintlig profil, skapa aldrig en ny.** Kan trigga omverifiering, planera till lågsäsong
4. Kataloger: hitta.se, Eniro
5. Sociala profiler

Behåll det gamla namnet som `alternateName` i schema i ungefär tolv månader. Allabolag och Ratsit matas automatiskt från Bolagsverket, redigera inte manuellt.

## Output

Leverera alltid som en **rangordnad lista** där varje punkt har:

1. Vad som ska göras, konkret
2. Evidensgrad (dokumenterat / sannolikt / spekulation)
3. Uppskattad effekt och varför
4. Om det kan göras nu eller är blockerat, och av vad

Separera tydligt "ger effekt", "billigt experiment" och "gör inte". Var brutalt ärlig om vad som inte är värt att göra, det är skillnadens mellan rådgivning och att sälja timmar.

## Noteringar

- Området rör sig snabbt. Är ett påstående i den här filen äldre än ett halvår och avgörande för beslutet: **verifiera om det**. Uppdatera sedan filen.
- Verifiera alltid mot den faktiska filen och renderingen, aldrig mot minnesbilden av hur sajten ser ut.
- Kan något inte mätas i sandboxen (laddtid, faktisk ranking, CDN-beroenden), säg det rakt ut och be om ögongranskning i stället för att gissa.
