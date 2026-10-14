# Kvist: Strategi & vidIQ-data

Här bor siffrorna om kanalen och konkurrenterna, och besluten om vart kanalen ska.
Reglerna står i `../youtube.md` och vinner om något här säger annat.

| Fil | Vad |
|---|---|
| `kanalen.md` | Siffrorna, topp- och bottenvideor, vad 464k-videon faktiskt var |
| `konkurrenter.md` | 48 konkurrenter, filtrerade på långform. Vilka som är Shorts i förklädnad |
| `utliggare-att-modellera.md` | Tio utliggare värda att modellera, plus stopplistan |
| `panelens-beslut.md` | Kolla-over-panelens 15 beslut, tre videor att göra först, vad som skjuts upp |
| `medlemsstrategi-cowork.md` | Kanalmedlemmarna: faktabankerna som medlemsförmån |

## vidIQ-rutinen

vidIQ är kopplat som MCP-server på användarnivå och läser kanalen direkt. **Varje anrop
kostar 5 credits**, så hämta det du behöver en gång och skriv in svaret i rätt fil.

| Vill du veta | Anrop |
|---|---|
| Kanalens siffror | `vidiq_channel_stats` |
| Kanalens senaste långformsvideo (CTA-målet) | `vidiq_channel_videos({ videoFormat: 'long', popular: false })` |
| Utliggare hos konkurrenterna | `vidiq_outliers` (se nedan) |
| Om en idé redan är gjord | `vidiq_youtube_search`, sorterat på visningar |
| Vad en video faktiskt säger | `vidiq_video_transcript` |

Siffror hämtas, de gissas aldrig.

## Mät på median, aldrig på snitt

81,5 procent av kanalens livstidsvisningar sitter i en enda nyhetsvåg (Colossals
varghybrider, mars 2026). Snittet beskriver vågen, inte kanalen. Samma fälla gäller
konkurrenterna: deras snitt mäter hur många videor de släppt, inte hur bra de är.
Siffrorna och resonemanget: `../youtube.md`, avsnittet "Det viktigaste att veta".

## Utliggarribban

**3 000–5 000 visningar.** Under ribban är varje ny video ett test av ett nytt format.
Över ribban identifieras formatet och man dubblar ner en gång i taget och mäter. Hela
beslutet står i `../youtube.md` ("Testa eller dubbla ner") och i
`../reference/testa-vs-dubbla-ner.md`. Uppföljningen per video görs i
`../publicering/README.md`.

## Så hittas nya utliggare

1. Ta konkurrentlistan i `konkurrenter.md`.
2. Börja med alla kanaler **under 50 000 prenumeranter**, leta utliggare att modellera
   (ju nyare desto bättre).
3. Gå sedan upp till **150 000**.

        vidiq_outliers({ channelIds: [...], contentType: 'long',
                         maxSubscribers: 50000, publishedWithin: 'threeMonths',
                         sort: 'breakoutScore' })

4. **Kolla format och genre innan en titel plockas.** Breakout-talet mäter avvikelse från
   kanalens eget snitt, inte om videon går att kopiera. De två högsta talen i en tidigare
   körning var en filmtrailer och en riktig naturfilmsdokumentär.
5. Skriv in fynden i `utliggare-att-modellera.md`. Idéer som ska prövas går vidare till
   `../ideer/`.

## Känd konflikt att ha koll på

`panelens-beslut.md`, beslut 4 (2026-08-22), ville lägga 70 procent av videorna på ett nytt
spår utan de-extinction. Utfallet i september motbevisade det: vardagsfrågorna floppade och
moa-faktavideon (de-extinction med ett ikoniskt djur) var enda träffen. I första hand gäller
därför de-extinction och istid med ett ikoniskt djur i titeln. Vardagsfrågor bara som
undantag. Mät dag 30 innan ett format döms.
