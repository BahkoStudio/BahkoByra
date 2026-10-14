# SOP: Löpande leverans & support

**När:** från att sidan är live, så länge kunden är kvar. **Mål:** kunden får det månaden
lovar utan att behöva fråga, och varje ändringsönskan blir klar snabbt och syns i loggen.

## Kanalerna

| Kanal | Används till | Svar senast |
|---|---|---|
| Mejl till mathias@bahkobyra.se | Ändringar, frågor, material | Nästa vardag |
| Telefon | Det som brådskar (sidan nere, fel nummer på sidan) | Samma dag |
| Rapporten | Vår månads- eller veckoavstämning | Enligt rapportdagen |

Säg samma sak till alla kunder vid uppstarten. Sms, WhatsApp och DM tas emot men flyttas till mejlen,
så att inget försvinner.

## Ett ärende, från önskan till klart

1. **Ta emot:** svara kunden direkt att ärendet är mottaget och när det blir klart. Ändringen
   är klar inom två arbetsdagar (avtalet).
2. **Logga:** en rad i `kunder/<kund>/andringar.md` (datum, vad, status). Skapa filen vid
   första ärendet.
3. **Gör:** i den källkod som `kunder/<kund>/hemsida.md` pekar på. Varje push kräver Mathias
   ja (CLAUDE.md 🔴), samla kundens ändringar i en PR.
4. **Kontrollera:** öppna sidan en gång i mobil och dator efter deployen. Aldrig i loop.
5. **Meddela:** färdig mejltext på högst två meningar, med länken.

**Ingår alltid:** förbättringar och ändringar av befintlig sida (texter, bilder, priser,
öppettider, nya tjänstesidor). **Offereras separat:** helt nya funktioner, till exempel
webbshop eller bokningssystem. Säg det vänligt och direkt, och låt kunden välja.

## Månadens fasta arbete (kunder med månadsavgift)

| Vecka | Arbete |
|---|---|
| 1 | Kontrollera sidan: formuläret skickar, inga döda länkar, laddtid. Uppdatera Google Företagsprofil (inlägg, bilder) |
| 2 | En SEO-åtgärd ur kundens `seo-geo-aeo.md`, till exempel en ny ortssida eller tjänstesida |
| 3 | Omdömen: skicka kunden en färdig omdömeslänk och ett sms att vidarebefordra |
| 4 | Rapporten (`rapporter/SOP.md`) och nästa månads plan |

Contentkunder (Bromma) har dessutom sin egen veckorutin i `kunder/bromma/produktionsrutin.md`.
