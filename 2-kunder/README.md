# Gren 2: Kunder (Client Ops)

Allt som händer från att en kund säger ja tills kunden har varit med oss i flera år.
Målet: kunden ska aldrig behöva jaga oss, och varje månad ska kunden se svart på vitt
vad den betalar för.

## Kundresan i fem steg

```
 JA ──► 1 Onboarding & avtal ──► 2 Bygge ──► 3 Löpande leverans ──► 4 Rapport ──► 5 Retention & uppsälj
        (dag 0–2)                (dag 2–7)   (varje månad)          (vecka/månad)  (månad 3, 6, 12)
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
| Var i resan varje kund är, checklista per kund | kommandocentralen, gren 2 (`docs/bahko_os.md`) |
| Avtal, fakturor och priser | `OneDrive/Contracts & Legal/<kund>/` (aldrig i repot, det är publikt) |
| Affären och nästa samtal | Notion-CRM:et, steget "Kund" |
| Återkommande åtaganden med datum (rapportdagar m.m.) | `web/public/crm-f2822a6f3a/atagande.json` |

## Regler för grenen

- **Ingen bindningstid, kunden äger sin sida och domän.** Det är löftet, varje SOP utgår från det.
- **Varje leverans följs av en färdig mejltext på högst två meningar.** Mathias mejlar själv.
- **Personuppgifter, bankuppgifter och belopp skrivs aldrig in i repot.**
- **AI får aldrig spela kundens riktiga jobb** i content (bilder och filmer på kundens arbete ska vara äkta).
- Ny kund: kopiera `kunder/_mall/`, lägg in åtagandena i `atagande.json`, och bocka av
  onboardingen i kommandocentralen.
