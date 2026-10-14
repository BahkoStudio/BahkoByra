# Kvist: Kostnader & credits

Det som drar pengar eller credits. Saldon och belopp kollas live, de skrivs inte hit.

| Tjänst | Används till | Kolla saldot |
|---|---|---|
| Higgsfield | Bilder och filmer till demos och content | MCP `balance`, eller API:t i `tools/hf-api/` (dollar) |
| vidIQ | Musik, YouTube-analys, 5 credits per anrop | MCP `vidiq_balance` |
| Vercel | Hosting av bahkobyra.se och kundsajterna | Vercel-dashboarden. **Planen är Hobby** (Mathias 2026-10-14), deploytaket delas av alla projekt |
| one.com | Domänen bahkobyra.se och mejlen | one.com-kontot |
| Notion | CRM:et | Notion-kontot |
| Claude | Allt arbete med Claude | claude.ai-kontot |

## Reglerna

- **Över 100 credits i ett och samma jobb: fråga Mathias först.** Under 100 körs det.
- **Varje push och merge kostar flera Vercel-deployer.** Batcha i en pull request.
- Kör alltid kostnadskollen (`generate cost` eller motsvarande) innan en dyr generering.
- En kostnad som ligger hos en kund (deras domän, deras Behold-konto) står i kundens mapp
  under `2-kunder/kunder/<kund>/`, inte här.

## ⚠ Vercel Hobby och betalande kunder

Vercels Hobby-plan får enligt deras villkor bara användas för icke-kommersiella projekt.
bahkobyra.se och kundsajterna (smamaleri.se, brommatradgardsservice.se, gdmaleri.se) är
kommersiella och kunderna betalar för drift och hosting. Risken: Vercel kan stänga av
projekten, och då går kundernas sajter ner. Beslut som väntar på Mathias: uppgradera till
Pro eller flytta kundsajterna. Tills dess: lova ingen ny kund drift på Vercel utan att
beslutet är taget.
