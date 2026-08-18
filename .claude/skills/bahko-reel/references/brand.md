# Varumärket i en Bahko-reel

Gäller när reelen är Mathias som pratar till publiken för @bahkostudio.
Allt nedan är låst av `brand.json` v2 eller av Mathias beslut i session.
**Beskriv aldrig varumärket ur minnet** — palett, typografi och maskotregler
läses ur `web/public/brand/brand.json`, som är enda källan.

## Kedjan

```
1  klipp klart videon          famous-reel-editor: transcribe -> EDL -> cutjoin -> silence_keep
2  brand.py grafik             palett + logga + maskotlager + Outfit + gsap ur brand.json
3  gen.py <cutF.json>          grafiklagret som ALFA, paneler ovanpå full video
4  hyperframes --format mov    alfa-rendering (mp4 = svart, täcker videon)
5  maskot.py / sfx.py / captions.py    efter Mathias val
6  compose.sh                  full video + grafik + valda lager
```

Steg 2 kopierar ur brand.json vid varje körning, så en varumärkesändring slår
igenom på nästa reel utan att något dupliceras in i skillen.

## Palett (ur brand.json — ändra där, inte här)

| Roll | Token | Värde |
|---|---|---|
| Accent | `A` | `primary_color` #10B981 |
| Ljus accent | `AB` | `accent_color` #34D399 |
| Botten | `BAS` | `background_color` #0A1628 |
| Kortyta | `YTA` | `surface_dark` #13233F |
| Sekundärtext | `TEXT2` | `text_secondary_dark` #94A7BF |

**CTA-regeln är inte kosmetik:** smaragdyta med marinblå text. Vit text på
smaragd är 2,54:1 och underkänt enligt WCAG. `gen_bahko.py` tar färgerna ur
`palett.json` (`CTA_YTA`/`CTA_TEXT`) just för att det inte ska kunna slarvas bort.

## Typografi

Outfit rakt igenom, wght 100–900. `brand.py` kopierar `assets/Outfit[wght].ttf` in i projektet eftersom grafiken
renderas i Chromium och `@font-face` måste peka på en fil i projektmappen.

`captions.py` i den här skillen tar Outfit i första hand (Montserrat finns kvar
som reserv via `CAPTION_FONT`). Guld/cream/Cormorant är utfasat ur eget material.

## Intro och outro

**Intron är avskalad** (Mathias 2026-08-18): inget märke, ingen figur, inget
varumärkespynt i öppningen. Hooken ska bära ensam — och den första sekunden är
det sämsta läget att ha en halvtom panel, så lägg hookens innehåll där från ruta 1.

**Outron bär varumärkeslåset.** Korttypen `outro` lägger ordmärket + adressen
sist. Alltid **`logo-dark.svg`** (vit text) — `logo.svg` har marinblå text
`#0A1628` och försvinner på det marinblå bandet. Mätt: 14,7 % nästan-vita pixlar
i logo-dark mot 5,0 % i logo.svg, där bara det vita B:et i märket lyser.

Ordmärket **bär redan taglinen**. Sätt `tagline` i beatens parametrar bara om du
vill ha en ANNAN rad under adressen, annars står ”SYNLIGHET SOM SÄLJER” dubbelt.

Loggan är alltid det **platta** materialet, aldrig 3D-rendern (beslut 2026-08-16).

## Tempo

Varje kort ska hinna **läsas**, inte bara visas. `gen_bahko.py` varnar för beats
under 1,4s, och listornas stagger skalas efter beatens längd. Sikta 3–5s per
kort. Blir det trångt: slå ihop beats eller stryk ett kort — fem kort som hinns
med slår nio som blinkar (Mathias 2026-08-18).

## Musik

Skillen syntetiserar **inte** musik. Ett påhittat spår låter påhittat (mätt
2026-08-18: "musiken är värdelös"). Lägg ett eget spår på `assets/musik.m4a` —
då används det automatiskt — eller peka med `MUSIC=`. Ett genererat spår är en
Higgsfield-beställning och kostar credits.

SFX följer däremot med: `sfx.py` syntetiserar dem lokalt ur `beats.json`, inga
credits. Rösten ska alltid dominera; hörs SFX:en som ett eget element är den
för hög.

## GSAP paketeras lokalt

Grafiklagret laddar `assets/gsap.min.js`, inte CDN:et. Är biblioteket
onåbart vid rendering blir `gsap` undefined och hyperframes renderar korten i
sitt slutläge — full bild, **noll animation** — med bara en mild varning.
`brand.py` kopierar in biblioteket och `gen.py` kastar högt om det saknas, så
felet inte kan gå tyst i produktion.

## Maskoten

**Regel 2026-08-18 (Mathias):** figuren står VID Mathias i nedre bandet som
assistent, supporter, kompis — i de fönster där hon **passar innehållet**, inte
tvingad genom hela klippet och inte låst till intro/outro. `brand.json` är
uppdaterad, så källan och praxis stämmer.

Fönstren sätts på compose-steget: `MASKOT=maskot MASKOT_FONSTER="4.2-8.6,22.0-27.4"`.
Utan `MASKOT` är hon inte med alls — det är Mathias val, inte skillens.

Konstruktion:

* Maskoten renderas separat av `maskot.py` och läggs på i `compose.sh`. Hon
  ligger inte i grafiklagret: hon ska stå i nedre delen där videon är, och
  grafiklagrets paneler hör till den övre säkra zonen.
* Figuren ritas i tre frilagda lager (kropp + två armar) som delar samma
  732×690-ram — samma lagerkontrakt som `web/app/komponenter/Maskot.js`.
  Gesten byggs genom att rotera ett armlager kring axeln.
* Bara en cykel renderas (sömlös), sen loopar ffmpeg den. 48 rutor räcker för
  en reel av vilken längd som helst.

Gester: `vinkar` (standard), `pekar`, `undersoker`, `dansar`, `stilla`.

QA mot kanon före leverans: exakt **ETT** öga, uppe till höger. B:et
vänsterställt. Inget stetoskop, ingen läkarrock.

## Mätta värden — ändra inte utan att mäta om

| Sak | Värde | Varför |
|---|---|---|
| Axel, höger arm | (598, 340) | armens inre kant; lagrets mitt ser ut som att armen lossnar |
| Axel, vänster arm | (138, 340) | dito |
| Rotationstecken | höger = **positiv**, vänster = **negativ** | PIL roterar moturs; fel tecken viker armen in över magen |
| Gestvinkel | 40–62° | armarna är korta droppar; under ~50° läses rörelsen som vobbling |
| Standardplacering | x=40, y=1920−höjd−150 | nedre vänster |

**Varför inte nedre höger:** Instagrams knapprad (gilla/kommentera/dela) ligger
längs högerkanten, grovt x>950 och y 1100–1750. En figur där blir delvis täckt
i flödet. Samma zon styr var panelerna får ligga.

## Positionering i copy

Front offer är **hemsidor** — på alla kanaler. ”Växa på Google”-copy hör bara
på www.bahkobyra.se, aldrig i reels eller DM. Local SEO är intern leverans och
uppsell efter levererad sajt, inte säljbudskapet i en reel.
