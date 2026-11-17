// /llms.txt på gdmaleri.se. public/ är gitignorerad (fylls av kopiera.mjs),
// därför en route här i app/.
const TEXT = `# GD Måleri Sthlm AB

- Webbplats: https://gdmaleri.se/
- Företag: GD Måleri Sthlm AB
- Organisationsnummer: 559468-2444
- VAT-nummer: SE559468244401
- Säte: Södertälje, Stockholms län
- Verksamhetsområde: Stockholm och Stockholms län
- Telefon: 073-729 88 89
- E-post: info@gdmaleri.se
- Öppettider: alla dagar klockan 08 till 17
- Instagram: https://www.instagram.com/gdmaleristhlm/
- Facebook: https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/
- Reco: https://www.reco.se/gd-maleri-sthlm
- Google-profil: https://maps.google.com/?cid=13566570836618556636

GD Måleri Sthlm AB är en målerifirma i Stockholm som målar inomhus och utomhus och gör förarbetet själva. Firman målar åt villaägare, bostadsrätter och företag. Färgen är Flügger, och firman är försäkrad via Trygg-Hansa. Offerten är kostnadsfri och räknar in material, arbete, förarbete, städning och bortforsling. Fakturan kommer när jobbet är klart, med ROT redan avdraget på småhus. Inget extraarbete görs utan kundens godkännande. Ett års garanti lämnas på måleriarbetet. Snittbetyget på Reco är 4,9 av 5, och firman är rekommenderat företag på Reco tre år i rad.

## Tjänster

- [Invändig målning](https://gdmaleri.se/malning-invandigt/): väggar, innertak, dörrar och snickerier i Stockholm.
- [Tapetsering och bredspackling](https://gdmaleri.se/tapetsering/): tapetborttagning, slät vägg och ny tapet eller färg.
- [Fasadmålning](https://gdmaleri.se/fasad-malning/): trä, puts, tegel och plåt, med fönster, vindskivor och takfot. Senast 234 kvm i Bromma.
- [Fasadtvätt](https://gdmaleri.se/fasadtvatt/): smuts, alger och lös färg bort, som egen tjänst eller inför målning.
- [Takmålning](https://gdmaleri.se/takmalning/): taktvätt och målning av yttertak.
- [Taktvätt](https://gdmaleri.se/taktvatt/): mossa, alger och smuts tvättas bort från takpannorna, för sig eller inför takmålning.
- [Fönster och snickerier](https://gdmaleri.se/snickerier-fonster-malning/): målning av fönster, dörrar, karmar, foder och snickerier, inne och ute.
- [Golvläggning och golvslipning](https://gdmaleri.se/golv/): läggning, slipning och målning av golv, gärna i samma jobb som väggar och tak.
- [Målning för bostadsrättsföreningar](https://gdmaleri.se/brf/): trapphus, entréer, fasader och fönster.

## Orter

Belagda jobb finns i Bromma (fasad 234 kvm, klart hösten 2026), Täby kyrkby (träfasad 350 kvm, klar i september 2026) och Södertälje (tak och väggar 180 kvm, bolagets säte). Firman tar också fasadjobb i resten av Stockholm.

- [Fasadmålning i Bromma](https://gdmaleri.se/fasadmalning-bromma/)
- [Fasadmålning i Täby](https://gdmaleri.se/fasadmalning-taby/)
- [Målare i Södertälje](https://gdmaleri.se/malare-sodertalje/)
- [Fasadmålning på Lidingö](https://gdmaleri.se/fasadmalning-lidingo/)
- [Fasadmålning i Sollentuna](https://gdmaleri.se/fasadmalning-sollentuna/)
- [Fasadmålning i Huddinge](https://gdmaleri.se/fasadmalning-huddinge/)
- [Fasadmålning i Danderyd](https://gdmaleri.se/fasadmalning-danderyd/)

## Så går arbetet till

1. Kunden ringer eller skriver. Svar inom 24 timmar.
2. Kostnadsfri offert, ofta vid ett hembesök på 45 minuter, alla dagar klockan 08 till 17.
3. Jobbet utförs. Allt som inte ska målas täcks. Inget extra utan kundens ja.
4. Slutbesiktning tillsammans. Fakturan kommer efter det.

Offertbesök kan bokas på https://cal.com/gdmaleri/offert.

## Guide

- [Så väljer du målare](https://gdmaleri.se/basta-malare-stockholm/): checklista för att jämföra verifierade omdömen, F-skatt, försäkring och vad offerten ska innehålla.

## Integritet

- [Integritet och cookies](https://gdmaleri.se/integritet/): så hanteras uppgifter från formulär och bokning, och vilka cookies sidan använder. Google Analytics laddas bara efter samtycke.
`;

export function GET() {
  return new Response(TEXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
