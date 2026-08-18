# Bahko-läge — reels i BahkoByrås varumärke

Gäller när reelen är Mathias som pratar till publiken för @bahkostudio.
Allt nedan är låst av `brand.json` v2 eller av Mathias beslut i session.
**Beskriv aldrig varumärket ur minnet** — palett, typografi och maskotregler
läses ur `web/public/brand/brand.json`, som är enda källan.

## Kedjan

```
1  transcribe.py              råklippet -> ordtider
2  (EDL, cutjoin, silence_keep, re-transcribe)     som vanligt, se SKILL.md
3  bahko_assets.py cards      palett + märke + maskotlager + Outfit -> cards/assets/bahko/
4  gen_bahko.py <cutF.json>   kortlagret i Bahko-stil (övre bandet)
5  captions.py                karaoke-undertexter
6  maskot_frames.py           maskoten som sömlöst loopande PNG-sekvens
7  compose_bahko.sh           ansikte + kort + MASKOT + text + musik
```

Steg 3 kopierar ur brand.json vid varje körning, så en varumärkesändring slår
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

Outfit rakt igenom, wght 100–900. `bahko_assets.py` kopierar
`assets/fonts/Outfit[wght].ttf` in i projektet eftersom korten renderas i
Chromium och `@font-face` måste peka på en fil i projektmappen.

Undertexterna körs fortfarande i Montserrat Black — det är skillens
validerade karaoke-stil och sitter i `captions.py`. Vill du ha Outfit även
där: `CAPTION_FONT=<skill>/assets/fonts/"Outfit[wght].ttf"`.
Guld/cream/Cormorant är utfasat ur eget material.

## Loggan

Det **platta** 2D-märket (`mark.svg`), aldrig 3D-rendern — beslut 2026-08-16.
`gen_bahko.py` lägger det uppe till vänster i kortbandet.

## Maskoten

**Regel 2026-08-18 (Mathias):** figuren står VID Mathias i nedre bandet genom
hela reelen — assistent, supporter, kompis. Det ersätter den tidigare
doseringen i brand.json (”reels = endast intro/outro-overlay”, panelbeslut
2026-08-17, omprövas 2026-09-04). **brand.json är ännu inte uppdaterad** —
källan och praxis pekar isär tills den skrivs om.

Konstruktion:

* Maskoten kan **inte** ligga i kortlagret. `hyperframes render` ger yuv420p
  utan alpha, och kortbandet klipps till de övre 864 px. Den renderas därför
  separat av `maskot_frames.py` och läggs på i `compose_bahko.sh`, precis som
  undertexterna.
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
i flödet. Undertexterna landar kring y=778–900, så figuren måste också ligga
tydligt under dem. `compose_bahko.sh` varnar om `MASKOT_XY` ger y < 920.

## Positionering i copy

Front offer är **hemsidor** — på alla kanaler. ”Växa på Google”-copy hör bara
på www.bahkobyra.se, aldrig i reels eller DM. Local SEO är intern leverans och
uppsell efter levererad sajt, inte säljbudskapet i en reel.
