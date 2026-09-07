# Bahko-stilen — specifikation, mallar och prompter

Implementationsdel för ig-karusell-skillen. Allt visuellt utgår från varumärke v2
(källa: `web/public/brand/brand.json` i Bahko-repot — beskriv aldrig varumärket ur minnet om repot finns tillgängligt).

## Varumärkestokens (v2, rebrand 2026-08-05)

| Token | Värde | Användning |
|-------|-------|------------|
| Bas | `#0A1628` | mörk bakgrund |
| Yta | `#13233F` | paneler/kort på mörk bas |
| Ljus bas | `#F8FAFC` | ljus bakgrund (ljus variant) |
| Accent | `#10B981` | huvudaccent, knappar, markerade ord |
| Accent ljus | `#34D399` | markerade ord på mörk bas |
| Accent på ljust | `#047857` | markerade ord på ljus bas |
| Text mörk bas | `#FFFFFF` + `#94A7BF` (sekundär) | |
| Text ljus bas | `#0A1628` | |
| Typsnitt | Outfit (500/700/800) | allt |
| Logga | smaragd rundad kvadrat + vitt fett B | topp av varje slide |
| KNAPP-REGEL | smaragd yta med MARINBLÅ text | aldrig vit text på smaragd (underkänd kontrast) |

Handtag i sidfot: **@bahkobyra** (vänster) + sidnummer `N/6` (höger) + "svep →" (mitten, ej sista sliden).

## Två varianter inom varumärket (välj EN per karusell)

- **Mörk** (standard): bas `#0A1628`, subtil smaragd-glow (radial gradient) i ett hörn. Seriös, premium. Bäst för insikter, jämförelser, granskningar.
- **Ljus**: bas `#F8FAFC`, marinblå text, accent `#047857`/`#10B981`. Luftig, tillgänglig. Bäst för listor, tips, "spara denna".

---

## BRAND-LÄGE (HTML → Edge, 0 kr)

Samma pipeline som karusell 4–5 (verifierad 2026-08-14). Gör så här:

1. Skriv ETT PowerShell-skript som genererar alla slides-HTML från mallen nedan + renderar dem.
2. **Spara skriptet med UTF-8 BOM** — annars blir åäö mojibake (hänt: 2026-08-14).
3. Rendera: `msedge --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$env:TEMP\edge-karusell" --window-size=1080,1350 --virtual-time-budget=8000 --screenshot=<png> <file-url>` med 2 s paus mellan körningar. Enstaka renderingar misslyckas tyst — kontrollera att varje PNG finns, kör om saknade med ny user-data-dir.
4. Läs minst en PNG visuellt innan batchen godkänns.

### HTML-mall per slide (mörk variant)

```html
<!DOCTYPE html>
<html lang="sv"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1080px; height:1350px; background:#0A1628; font-family:'Outfit',sans-serif;
  display:flex; flex-direction:column; padding:100px 96px; position:relative; overflow:hidden; }
.glow { position:absolute; width:900px; height:900px; border-radius:50%;
  background:radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%); top:-320px; right:-320px; }
.top { display:flex; justify-content:space-between; align-items:center; }
.mark { width:84px; height:84px; border-radius:20px; background:#10B981;
  display:flex; align-items:center; justify-content:center; font-weight:800; font-size:50px; color:#FFFFFF; }
.eyebrow { font-weight:700; font-size:30px; letter-spacing:0.14em; color:#34D399; text-transform:uppercase; }
.main { flex:1; display:flex; flex-direction:column; justify-content:center; }
.main h1 { font-weight:800; font-size:82px; line-height:1.13; color:#FFFFFF; }
.main h1 .em { color:#34D399; }
.body { margin-top:44px; font-weight:500; font-size:44px; line-height:1.35; color:#94A7BF; }
.fix { margin-top:52px; font-weight:700; font-size:40px; color:#0A1628; background:#10B981;
  padding:30px 40px; border-radius:16px; align-self:flex-start; }
.cta { display:inline-block; margin-top:60px; align-self:flex-start; background:#10B981; color:#0A1628;
  font-weight:800; font-size:52px; padding:32px 60px; border-radius:18px; }
.footer { display:flex; justify-content:space-between; align-items:center; font-weight:700; font-size:30px; }
.footer .handle { color:#34D399; } .footer .page { color:#94A7BF; font-weight:500; } .footer .swipe { color:#FFFFFF; }
</style></head>
<body>
<div class="glow"></div>
<div class="top"><div class="mark">B</div><div class="eyebrow">{EYEBROW}</div></div>
<div class="main"><h1>{RUBRIK med <span class="em">markerat ord</span>}</h1>
<div class="body">{BRÖDTEXT}</div>{VALFRI .fix}{VALFRI .cta}</div>
<div class="footer"><span class="handle">@bahkobyra</span><span class="swipe">svep &#8594;</span><span class="page">{N}/6</span></div>
</body></html>
```

Ljus variant: byt bakgrund till `#F8FAFC`, h1-färg `#0A1628`, .em `#047857`, body-text `#3D4E63`, glow-opacity 0.08, footer-handle `#047857`, swipe `#0A1628`.

Omslaget (slide 1): ingen eyebrow, rubrik uppåt 100–110 px, gärna 2–3 rader, sista raden med markerat ord. Ingen body om hooken bär själv.

---

## CINEMATISKT LÄGE (Higgsfield CLI via higgsfield-generate-skillen)

Kräver: Higgsfield CLI installerad och inloggad (`higgsfield auth login`; installerad 2026-08-15), ~6–12 credits, uttryckligt ja från användaren INNAN första genereringen. Kör genereringarna genom att invoka skillen `higgsfield-generate` — den äger modellval och CLI-syntax. Karusellens krav: Nano Banana Pro-familjen, 4:5, omslaget som referensbild för slides 2–6.

### Bahkos bildvärld (ersätter originalets "daylight"/"hacker-desk")

- **Miljö:** svensk byggarbetsplats/villakvarter i tidigt morgonljus, mjuk dis, premium-känsla. Alternativt ren studio-miljö i marinblå (#0A1628) med smaragdljus.
- **MASKOTEN "Bahko-maskoten" (kanon 2026-08-24, Mathias korrigering av den felskrivna v2-texten):** blank genomskinlig smaragdgrön GELÉKUB med vitt fett "B" **CENTRERAT PÅ FRAMSIDAN**, och **exakt ETT litet runt öga uppe till höger om B:et, på samma framsida**. **INGEN mun**, inga tillbehör, små knubbiga genomskinliga armar och ben. Masterbilden `bahko-master.png` har alltid haft det så — det var den skrivna texten som sa fel ("B på vänstra sidoytan") och kostade omtag 2026-08-24.
  - **Master-referens:** Drive `H:\Min enhet\BahkoByrå\BahkoByra\Brand\maskot\bahko-master` + repo `tools/assets/mascot-sheet.png` (karaktärsark) och `web/public/brand/maskot/bahko-master.webp`. (Higgsfield-moln-id:n förfaller efter ~30 dagar — använd lokala filer.)
  - **Regel:** skicka ALLTID med masterbilden som `--image`-referens och skriv "Match the reference character EXACTLY: glossy translucent emerald jelly cube, big white letter B centered on the FRONT face, ONE small round eye on the front face to the upper right of the B, NO mouth, no accessories". QA: exakt ETT öga, B fram, ögat uppe till höger om B:et.
  - **DOSERING (panelbeslut 2026-08-17):** karuseller = maskot ENDAST på omslaget + CTA-sliden, aldrig slide 2–5 där beviset bor; reels = endast intro/outro; ALDRIG maskot i kundbevis/före-efter-innehåll.
- **Typografi i bild:** Outfit-liknande geometrisk sans, fet. Vit text på mörka ytor, marinblå på ljusa. Markerade ord i smaragd (#10B981).
- **Aldrig:** terracotta, guld/cream (utfasat gamla varumärket), voxel/Minecraft-stil, engelska ord i slide-copy, maskot utan öga/stetoskop.

### Flöde

1. **Omslag:** generera via higgsfield-generate (Nano Banana Pro, 4:5). Prompt: bildvärlden ovan + hook-rubriken (ange EXAKT svensk text i citattecken, be modellen rendera texten korrekt) + maskoten + @bahkobyra diskret i botten. Spara resultatbilden/id:t.
2. **Slides 2–6:** varje generering använder omslaget som referensbild, och prompten börjar: "Match the cover EXACTLY: same environment, same lighting, same mascot, same typography style." + slidens innehåll.
3. Ladda ner alla sex till disk innan leverans.
4. AI-text i bild blir ofta fel på svenska — kontrollera varje slide visuellt; regenerera slides med trasig text (kostar extra credits, fråga först).

---

## Caption-regler (båda lägena)

- Rad 1: hooken (annan formulering än omslaget)
- 2–3 konkreta värderader — undervisa, sälj inte
- CTA: mjuk som standard ("Spara den här" / "Följ @bahkobyra för mer"), hård (DM:a DEMO → kostnadsfri demo) bara när ämnet leder dit. Alltid "kostnadsfri", aldrig "gratis". Aldrig ordet SAJT som DM-ord.
- **Captionen slutar alltid med EN enkel/binär fråga till nischen** (före hashtags) — det är frågan som driver kommentarer. Spara-CTA motiveras alltid med ett användningstillfälle ("spara till nästa offert").
- I postinfo: påminn om den fästa kommentaren: "Vill du se hur det här skulle se ut för din firma? DM:a DEMO."
- 5 nischade hashtags (#bygg #hantverkare #byggföretag + 2 ämnesspecifika)
- Enkel svenska, korta meningar, inga tankstreck, inga superlativ-staplingar

## Leveransstruktur (Drive)

```
H:\Min enhet\BahkoByrå\BahkoByra\Karusell <N>\
  ├── 1.png ... 6.png
  └── Karusell <N> - Caption och postinfo.txt
```

Postinfo i txt-filen: slide-ordning, föreslagen publiceringsdag, CTA-ord om hård CTA används, ev. "räkneexempel-markering" om siffror förekommer.
