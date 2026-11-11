# Kakel 0413 AB — betalande kund (pågår)

**Sida:** `web/app/(demo)/kakel0413/` → `bahkobyra.se/kakel0413/` (efter merge; noindex)
**Byggd:** 2026-10-22 på demomallen v3 (nivå efter velebitmaleri)
**Status:** BETALANDE KUND UNDER UPPSTART. Nuh har valt **12 000 kr-paketet**. Bolaget startas nu:
**väntar på org.nr**. Tjänsteutbudet kan breddas senare (mallen är byggd för att lägga till kort).

## Verifierat (2026-10-22, kundens egen text via Mathias)

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Kakel 0413 AB | Mathias + logofilen |
| Ägare | Nuh | kundens text |
| Logotyp | NY 2026-11-11: K i silverram med marmortriangel, "KAKEL" vitt, "0413 AB" grått, orange linje (gamla guldloggan ersatt) | kundens fil → `web/public/kakel0413/media/logo-original.jpg` (visas oförändrad på vitt; ordmärke i text i header/hero/footer) |
| E-post | Nuh@kakel0413.se · Info@kakel0413.se (sidan visar info@) | Mathias |
| Tjänster | Badrumsrenovering, kakel- och klinkersättning (badrum, kök, hallar, trapphus), mindre arbeten | kundens text |
| Erfarenhet | 17+ år i byggbranschen, upp till sju stora projekt samtidigt, ca 800 nya toaletter, har arbetat med Skanska, NCC och Peab | kundens text |
| Texter | Intro (hero + Om Nuh) och "Så går det till" (intro + sex steg) ordagrant, lätta stavfel rättade | kundens text |

## Saknas — står INTE på sidan

- **Org.nr** (inte utfärdat) → ingen F-skatt-text, inget ROT-avdrag, inget org.nr i footern.
- Gatuadress (bara "Eslöv · hela Skåne" visas).
- Adress/ort, hemsida, Instagram, Facebook, priser, garantier, ledtider.
- **Omdömen** och **egna jobbfoton** → sektionerna Jobb och Omdömen är dolda (inget påhittat galleri eller exempelomdömen).

## Media (genererad — ILLUSTRATIV, inte Nuhs egna jobb)

- **Hero-filmen** (12,7 s, 3 klipp): gammalt 80-talsbadrum → kakelsättning pågår → färdigt badrum i vit marmor och borstad guld. Stillbilder: Qwen Image 3 (A + två redigeringar). Klipp: Higgsfield SDK, `alibaba/wan-3.0-prime/image-to-video`, 1080p, 5 s styck, utan ljud. **Det är en illustration, inte ett av Nuhs jobb.** Byts när egna före/efter-foton finns.
- Varför-filmen = klipp 3 + logokort (ffmpeg). Kontaktfilmen = heron suddad.
- Fyra tjänstebilder (Qwen Image 3, 1k), märkta som illustrationer i tjänsteingressen.
- **Kostnad:** 33,04 API-krediter ≈ 2,07 USD (bilder 6,16 krediter ≈ 0,39 USD, filmer 3 × 8,96 = 26,88 krediter = 1,68 USD).

## Öppna frågor till Mathias / Nuh

1. ~~Telefon~~ klart: 073-875 27 25.
2. Org.nr när det kommer → footern, ev. F-skatt och ROT-fråga i FAQ.
3. ~~Ort~~ klart: Eslöv, hela Skåne.
4. Egna jobbfoton (före/efter) → slå på jobbanden, byt tjänstebilder/hero.
5. Instagram/Facebook när de finns. Omdömen när de första jobben är klara.
6. Domän kakel0413.se: ska sidan flyttas dit (kund: true + egen Web3Forms-nyckel till info@)?
7. Fler tjänster som ska in.

## Revision 2026-10-22 (Mathias feedback)

- Hero enligt mallen: logotypen som h1, "Eslöv · Skåne", "Kakel & Badrum.", standardknappar. Kundens långa text ligger inte i heron.
- Telefon 073-875 27 25 (tel:+46738752725). Bas Eslöv, arbetar i hela Skåne (hero, FAQ, kontakt, meta).
- Logotyp: Mathias egen frilagda PNG (14:12) → `logo.webp` (1000 px, @2x) överallt: header, hero, footer, Om oss, slutkortet. SVG-versionen borttagen.
- Ny logotyp 2026-11-11 (Nuh via Mathias, WhatsApp-bild på skiffervägg): frilagd i två varianter, `logo-ljus.webp` över filmen och `logo.webp` med mörka toner på vit header/footer (topp: 'fri'). Varför-filmens slutkort är nu kundens bild med långsam zoom. Kundens bild = `logo-original.jpg`.
- Om Nuh bort från huvudsidan → egen sida `/kakel0413/om-oss/` (länk i footern), omskriven kortare text med samma fakta.
- Siffrorna (17+ år, upp till 7 projekt, ca 800 toaletter, Skanska/NCC/Peab) står som förtroendepunkter i Varför-sektionen och på Om oss.
- Hero-copy (Mathias 14:25): Nuhs egna två meningar ordagrant ("Att renovera ett badrum är ett stort beslut. Därför …") under Eslöv · Skåne, före "Kakel & Badrum." Ingen rubrik.

## 2026-11-03: Därför oss ny text + jobbgalleri (dolt)

- **Därför oss** (`data.varfor` i `web/app/(demo)/kakel0413/page.js`) ersatt med Nuhs text "Har du ett projekt på gång? Vi hjälper dig gärna!" ordagrant: tre stycken, fyra bockar från "Kostnadsfri offert", slutmeningen sist. Filmen ligger kvar.
- **Jobbgalleri "Våra jobb"** (`Galleri.js`) är byggt men DOLT: listan i `jobb.js` är tom, och då renderas ingenting. Mallens jobband (🔒 `_mall`) är kvar dolda.

### Så lägger du till ett jobb
1. Lägg Nuhs EGNA foton (aldrig stock eller AI) i `web/public/kakel0413/jobb/`, t.ex. `eslov-fore.jpg` + `eslov-efter.jpg` (samma format, gärna 4:3, ca 1600 px).
2. Lägg en post i listan i `web/app/(demo)/kakel0413/jobb.js`:
   - före/efter: `{ titel: 'Badrum i Eslöv', plats: 'Eslöv', typ: 'fore-efter', bilder: { fore: '/kakel0413/jobb/eslov-fore.jpg', efter: '/kakel0413/jobb/eslov-efter.jpg' }, alt: 'Badrum före och efter' }`
   - en bild: `{ titel: 'Trapphus i Lund', typ: 'bild', src: '/kakel0413/jobb/lund.jpg', alt: 'Nylagt klinker i trapphus' }`
   - valfritt `bredd`/`hojd` (proportioner, standard 4:3).
3. Sektionen dyker upp av sig själv före Vanliga frågor. Före/efter får ett dragreglage (touch + piltangenter) med etiketterna Före/Efter.
