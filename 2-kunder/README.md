# Gren 2: Kunder (Client Ops)

Allt som händer från att en kund säger ja tills kunden har varit med oss i flera år.
Målet: kunden ska aldrig behöva jaga oss, och varje månad ska kunden se svart på vitt
vad den betalar för.

## Kundresan i fem steg

```
 JA ──► 1 Onboarding & avtal ──► 2 Bygge ──► 3 Löpande leverans ──► 4 Rapport ──► 5 Retention & uppsälj
        (dag 0–2)                (7 dagar    (varje månad)          (vecka/månad)  (dag 30, månad 3, 6, 12)
                                 från betalning)
                                                    ▲                                    │
                                                    └────────────────────────────────────┘
```

| Steg | SOP | Klart när |
|---|---|---|
| 1 Onboarding & avtal | `onboarding-avtal/SOP.md` | Avtal påskrivet, första fakturan betald, allt material och alla tillgångar inne |
| 2 Bygge | `1-byran/hemsidor/README.md` (produktionschecklistan) | Sidan live på kundens domän, formuläret testat |
| 3 Löpande leverans & support | `leverans-support/SOP.md` | Månadens arbete gjort och loggat, inga obesvarade ärenden |
| 4 Rapporter & uppföljning | `rapporter/SOP.md` | Rapporten skickad med mejltext, siffrorna kontrollerade |
| 5 Retention & uppsälj | `retention-upsell/SOP.md` | Kontrollpunkten gjord, nästa erbjudande antingen sagt eller medvetet väntat med |

## Var saker bor

| Vad | Var |
|---|---|
| En mapp per kund (hemsida, struktur, Drive, SEO-underlag, rapporter) | `kunder/<kund>/`, mall i `kunder/_mall/README.md` |
| Var i resan varje kund är | Notion-CRM:et, kundens steg. Det är sanningen om kundläget |
| Checklista per kund | kommandocentralen, gren 2 (`docs/bahko_os.md`). Mathias egen avbockning, sparad i en webbläsare |
| Avtal, fakturor och priser | `OneDrive/1 Bahko Byrå/Kunder/<kund>/Avtal/` (aldrig i repot, det är publikt) |
| Affären, kontaktpersoner, nästa samtal och nästa faktura | Notion-CRM:et, steget "Kund" |
| Kundens rapporter | Kundens Drive, aldrig i repot |
| Återkommande åtaganden med datum (rapportdagar m.m.) | `web/public/crm-f2822a6f3a/atagande.json` |

## Regler för grenen

- **Ingen bindningstid, kunden äger sin sida och domän.** Det är löftet, varje SOP utgår från det.
- **Varje leverans följs av en färdig mejltext på högst två meningar.** Mathias mejlar själv.
- **Personuppgifter, bankuppgifter och belopp skrivs aldrig in i repot.**
- **AI får aldrig spela kundens riktiga jobb** i content (bilder och filmer på kundens arbete ska vara äkta).
- Ny kund: skapa de fyra filerna som beskrivs i `kunder/_mall/README.md`, lägg in åtagandena i
  `web/public/crm-f2822a6f3a/atagande.json`, och bocka av onboardingen i kommandocentralen.
