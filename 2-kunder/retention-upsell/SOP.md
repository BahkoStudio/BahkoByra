# SOP: Retention & uppsälj

**Utgångspunkt:** ingen bindningstid. Kunden stannar bara så länge den ser värdet varje
månad. Retention är därför rapporten plus att vi hör av oss innan kunden hinner undra.

## Kontrollpunkterna

| När | Vad | Fråga till dig själv |
|---|---|---|
| Dag 90 (bara om avtalet har garanti) | Sökningen ur avtalet görs tillsammans med kunden, skärmbilden sparas i kundens avtalsmapp i OneDrive, eventuell återbetalning inom 14 dagar. Dag 90 räknas som avtalet säger: i nya avtal från dagen Google-profilen är verifierad (Proffsmaskiner: från live-dagen) | Är datumet inlagt i `atagande.json`? (en rad med samma `start` och `slutdatum`) |
| 30 dagar efter live | Samtal, 10 minuter | Ringer det mer? Något på sidan som ska ändras? |
| Månad 3 | Genomgång av tre rapporter | Går förfrågningarna upp? Är det dags för nästa steg på stegen? |
| Månad 3–6 | Har förfrågningarna ökat: be om ett Google-omdöme för Bahko och en referens, och fråga om sajten får visas som case | Har kunden sett resultat i sina egna siffror? |
| Månad 6 | Samtal + ett förslag | Vad skulle ge kunden flest nya jobb nästa halvår? |
| Månad 12 | Årsgenomgång | Vad har året gett, i förfrågningar och jobb? Vad gör vi år två? |

Lägg in nästa kontrollpunkt som "Nästa samtal" på kundens affär i Notion-CRM:et. Nästa
fakturadag står i ett eget fält, "Nästa faktura" (`4-ekonomi-admin/fakturering.md`).

## Stegen: vad som erbjuds efter vad

Nya kunder har hemsida plus SEO och underhåll från start. Ort- och tjänstesidor ingår i
månaden och säljs inte som uppsälj.

```
Hemsida + SEO och underhåll ──► Content (inlägg, reels) ──► Nya funktioner (webbshop, bokning)
```

| Kunden har | Erbjud när | Säg ungefär |
|---|---|---|
| Bara hemsida (äldre kunder utan månadsavgift) | Sidan har varit live en månad och fått sina första förfrågningar | Att sidan ska synas när folk i området söker, och att vi sköter det varje månad |
| Hemsida + SEO och underhåll | Förfrågningarna har ökat två rapporter i rad, OCH kunden lovar att skicka riktigt material varje vecka | Att fler ser dem i sociala medier också, med bilder från deras egna jobb. Lova aldrig räckvidd |
| Hemsida + SEO + content | Kunden vill kunna sälja eller boka direkt på sidan | En ny funktion, offererad separat |

**Bevis i uppsäljet:** bara kundens egna siffror ur rapporterna, och Brommas belagda bevis.
Aldrig en placering som löfte.

## Varningssignaler, agera samma vecka

- Kunden svarar inte på två rapporter i rad.
- Förfrågningarna sjunker två perioder i rad.
- Kunden frågar vad den betalar för, eller nämner en annan byrå.
- Fakturan betalas sent.

Åtgärd: ring (inte mejla), fråga hur det går för dem, visa vad som gjorts och föreslå en
konkret förbättring som ingår i månaden.

## Om kunden säger upp

Inga hinder, inga avgifter utöver avtalet. Kunden äger sida och domän: hjälp till med flytten
och lämna över allt material. Fråga varför, skriv svaret i kundens affär i Notion-CRM:et
(aldrig i repot). En kund som lämnar snyggt kan komma tillbaka och rekommendera oss.

**Avslutsrutinen:**

1. Bekräfta sista betalda period. Uppsägningen gäller från slutet av den månad som redan är betald.
2. Slutfaktura, och del 2 av hemsidan om den inte är betald.
3. Fristående export av sajten (kod och media), och en Web3Forms-nyckel som kunden själv äger.
4. Hjälp kunden peka om DNS till det nya webbhotellet, utan extra kostnad. Rör inte MX, SPF,
   DKIM eller DMARC.
5. Ta bort Bahko som ansvarig i Google Företagsprofil, GA4 och Search Console, eller lämna över
   ägandet till kunden.
6. Stäng åtagandena: `slutdatum` i `web/public/crm-f2822a6f3a/atagande.json`, kunden ut ur
   kommandocentralen, och Notion-affären flyttas från "Kund".
7. Färdig mejltext på högst två meningar som tackar och säger att dörren står öppen.
