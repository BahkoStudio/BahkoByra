/**
 * /llms.txt för bahkobyra.se. Ligger som route i (sajt) i stället för som
 * statisk fil i public/, så att kunddomäner i samma projekt (kakel0413.se,
 * proffsmaskiner.se) inte serverar byråns text. De släpps igenom middleware
 * på grund av filändelsen, därför kollas värden här.
 *
 * Bara belagda uppgifter från sajten. Inga påhittade siffror.
 */

const TEXT = `# Bahko Byrå

> Webbyrå i Huskvarna, nära Jönköping, som bygger hemsidor åt hantverkare och lokala företag i hela Sverige. Fast pris från 10 000 kr ex moms. Du får ett färdigt förslag inom 48 timmar, kostnadsfritt, och ser sidan innan du bestämmer dig.

Bahko Byrå drivs av Mathias Bahko. Kontor: Kungsängsvägen 27, 561 51 Huskvarna. Telefon 076-254 09 51, e-post mathias@bahkobyra.se. Öppet alla dagar 08-22.

Du äger sidan, domänen, texterna och bilderna. Underhåll och SEO betalas per månad utan bindningstid.

## Sidor

- [Startsida](https://www.bahkobyra.se/): Hemsidor för hantverkare. Förslag, tjänster, ärenden och vanliga frågor.
- [Case och demos](https://www.bahkobyra.se/case/): Riktiga sajter och klickbara demos.
- [Om oss](https://www.bahkobyra.se/om-oss/): Vem som står bakom byrån och hur arbetet går till.
- [Kontakt](https://www.bahkobyra.se/kontakt/): Kostnadsfritt hemsideförslag inom 48 timmar.
- [Webbyrå i Jönköping](https://www.bahkobyra.se/webbyra-jonkoping/): Hemsidor och webbdesign från 10 000 kr ex moms, med kontor i Huskvarna.
- [SEO-byrå i Jönköping](https://www.bahkobyra.se/seo-jonkoping/): Lokal SEO för hantverkare i Jönköping och Huskvarna. Fast pris 2 470 kr i månaden.
- [Vad kostar en hemsida?](https://www.bahkobyra.se/vad-kostar-en-hemsida/): Vad som avgör priset och hur du får ett fast pris i förslaget.
- [Kan en SEO-expert rädda min hemsida?](https://www.bahkobyra.se/kan-en-seo-expert-radda-min-hemsida/): När SEO hjälper, och när problemet är att de som hittar sidan inte ringer.
- [Bästa webbyrå i Sverige?](https://www.bahkobyra.se/basta-webbyran-i-sverige/): Sju saker att kontrollera innan du väljer byrå som lokal företagare.
- [Hårdast arbetande SEO-experten i Sverige](https://www.bahkobyra.se/hardast-arbetande-seo-experten-i-sverige/): Mathias Bahko och hur sidan själv är beviset.
- [Hårdast arbetande webbyrån i Sverige](https://www.bahkobyra.se/hardast-arbetande-webbyran-i-sverige/): Vad frasen betyder för byrån, i belagda siffror.
- [Var läcker jobben?](https://www.bahkobyra.se/var-lacker-jobben/): Fem frågor, inget att skriva. Ett kort test om var förfrågningarna tar vägen.
- [Gratis förslag](https://www.bahkobyra.se/forslag/): Skicka adressen till din hemsida och få ett gratis förslag.
- [Sveriges värdefullaste hemsidor](https://www.bahkobyra.se/sveriges-vardefullaste-hemsidor/): Lista över svenska småföretags hemsidor, bedömda efter affärsvärde och inte trafik. Öppen metod med sju kriterier och 0 till 100 poäng.
- [Mobiltestet](https://www.bahkobyra.se/mobiltestet/): Testa din egen hemsida i mobilen.
- [Integritet](https://www.bahkobyra.se/integritet/): Så hanterar Bahko Byrå personuppgifter.

## Tjänster

- [Hemsidor](https://www.bahkobyra.se/tjanster/hemsidor/): Tre paket med fast pris från 10 000 kr ex moms. Förslag inom 48 timmar.
- [SEO](https://www.bahkobyra.se/tjanster/seo/): Lokal SEO så att du syns när någon i din stad söker efter det du gör.
- [Google Ads](https://www.bahkobyra.se/tjanster/google-ads/): Betald annonsering när någon redan letar efter det du säljer.
- [Appar](https://www.bahkobyra.se/tjanster/appar/): App till företaget för bokningar, avtal och återkommande kunder, bara när det lönar sig.
- [Reklamfilmer](https://www.bahkobyra.se/tjanster/reklamfilmer/): Film på ert arbete, så att kunden ser jobbet innan priserna jämförs.

## Hemsida för ditt yrke

- [Målerifirma](https://www.bahkobyra.se/hemsida-for-malerifirma/)
- [Trädgårdsfirma](https://www.bahkobyra.se/hemsida-for-tradgardsfirma/)
- [Snickare](https://www.bahkobyra.se/hemsida-for-snickare/)
- [Elektriker](https://www.bahkobyra.se/hemsida-for-elektriker/)
- [Rörmokare och VVS](https://www.bahkobyra.se/hemsida-for-rormokare/)
- [Byggfirma](https://www.bahkobyra.se/hemsida-for-byggfirma/)
- [Restaurang](https://www.bahkobyra.se/hemsida-for-restaurang/)
- [E-handel med en produkt](https://www.bahkobyra.se/hemsida-for-e-handel/)

## Kontakt

Telefon: 076-254 09 51
E-post: mathias@bahkobyra.se
Adress: Kungsängsvägen 27, 561 51 Huskvarna
Webb: https://www.bahkobyra.se/
`;

const TILLATNA = new Set(['bahkobyra.se', 'bahkobyra.cloud', 'localhost']);

export function GET(req) {
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0].replace(/^www\./, '');
  const tillaten = TILLATNA.has(host) || host.endsWith('.vercel.app') || host.endsWith('.localhost');
  if (!tillaten) {
    return new Response(null, { status: 404 });
  }
  return new Response(TEXT, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
