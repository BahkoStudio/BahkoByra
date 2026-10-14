# Kvist: Fakturering

## Reglerna

- **Fakturanummer:** `BAHKO-` följt av fyra siffror, löpande över alla kunder (BAHKO-0010,
  BAHKO-0011 …). Hoppa aldrig över ett nummer och återanvänd aldrig ett.
- **Månadsavgifter faktureras i förskott**, en period i taget (till exempel 9/10 till 8/11).
- **Hemsidor faktureras i två delar** enligt avtalet: del 1 när avtalet skrivs på, del 2
  när sidan är live.
- **Moms 25 %** läggs på alla belopp. Avtal och offerter anger belopp exklusive moms.
- **Betalningsvillkor** enligt avtalet (hittills 2 eller 7 dagar).
- Sidfoten med bankuppgifter finns i fakturamallen i OneDrive, aldrig i repot.

## Rutinen per faktura

1. Ta förra fakturans mall för kunden (`OneDrive/1 Bahko Byrå/Kunder/<kund>/Avtal/`), byt period och nummer.
2. Rendera till PDF, ögonläs den. Kontrollera att momsreg.nr, F-skatt, fakturanummer och
   förfallodag är ifyllda, och att inga platshållare står kvar (till exempel "kontrollera" eller
   "ange bankgiro" i sidfoten).
3. Mathias mejlar den, med en mejltext på högst två meningar.
4. Notera i Notion-affären: fakturanummer, period, skickad datum, och sätt fältet
   "Nästa faktura" till nästa fakturadag.
5. När betalningen kommit: bocka av i Notion.

## Påminnelser

| Dagar efter förfallodag | Åtgärd |
|---|---|
| 1 | Vänlig påminnelse per mejl, fakturan bifogad igen |
| 7 | Ring kunden |
| 14 | Avtalet ger rätt att pausa arbetet. Säg det lugnt, en gång |

## Löpande fakturor just nu

Står i Notion-CRM:et (affärer på steget "Kund"), inte här. Ett fält per sak:
**"Nästa faktura"** är nästa fakturadag, **"Nästa samtal"** är nästa kontrollpunkt
(`2-kunder/retention-upsell/SOP.md`). Fältet "Nästa faktura" läggs till för hand i Notion,
eftersom Claude inte kan ändra databasens fält via MCP.
