import DemoSida from '../_mall/DemoSida';
import { formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, menyExtra, modal, samarbeten, RECO_WIDGET, RECO_LISTA } from './_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/gdmaleristhlm · Stockholm · HAR hemsida (gdmaleri.se).
   Byggd 2026-10-08 på demomallen v3 (kopia av swedcro-kanon).

   Bärande idé: allt i offerten, inget i förskott. Offerten är kostnadsfri och
   tar med material, förarbete, städning och bortforsling; inget extra görs
   utan kundens ja; jobbet slutbesiktas och fakturan kommer när det är klart.
   Allt ur gdmaleri.se. Besiktning FÖRE offert är inget generellt löfte (bara
   ett Reco-omdöme, Ola A, som står kvar som citat). Varför-sektionen bär den.

   VERIFIERAT (2026-10-08):
   gdmaleri.se: "Din målare i Stockholm", "flera års erfarenhet", tjänsterna
   invändig målning, tapetsering, snickerier & fönstermålning, takmålning,
   fasadmålning, bredspackling & tapetborttagning · "Nöjd kund garanti",
   "kostnadsfri offert" · "från planering och materialval till genomförande
   och slutbesiktning" · FAQ: F-skatt och fullt försäkrade via Trygg-Hansa;
   offerten inkluderar material, arbetskraft, förberedelser som tvättning och
   skrapning, städning och bortforsling; färg från Flügger, miljövänliga
   alternativ finns; 1 års garanti på måleriarbetet, åtgärdas utan extra
   kostnad; ytor täcks med plast eller papper, möbler och golv skyddas;
   faktura efter slutfört arbete, ingen förskottsbetalning (över 500 kvm: 50 %
   av arbetskostnaden vid halva jobbet); inga extraarbeten utan kundens
   godkännande; ROT dras direkt på fakturan · info@gdmaleri.se · sajtens
   synliga nummer 073-729 88 89 (länken bakom är platshållaren tel:123-456-7890).
   Telefon 073-729 88 89 bekräftad i IG-inlägg Dd-zVd3ggOI ("Tel:0737298889")
   och på Reco. Facebook-sidan länkas från sajten.
   allabolag.se: GD Måleri Sthlm AB, org.nr 559468-2444, Södertälje,
   aktiebolag registrerat 2024-01-16, F-skatt och moms, Ghandi Danho
   (befattningshavare), "Bolaget skall utföra måleritjänster, golvläggning …".
   Reco.se/gd-maleri-sthlm: 4,9 av 5, 45 omdömen (39 femmor, 6 fyror),
   "Verifierat företag", Rekommenderat företag 2024, 2025 och 2026 (IG-inlägg
   DcmMHrIEbrF: "rekommenderat företag för tredje året i rad"); omdömena från
   Ola A (2026-08-25), Anders F (2025-12-19) och Inga-Lill M (2026-07-26) är
   femmor från verifierade kunder, citerade ordagrant (Ola i sin helhet, Anders
   kortat i slutet, markerat med …).
   Instagram @gdmaleristhlm, bildtexter ordagrant: Dd-zVd3ggOI "Årets sista Fasad
   på 234 kvm 2026 är avklarad i Bromma" · Dc1IM7Pgpeh "Exklusiv Fasadmålning
   klar 350 kvm i Täby kyrkby" (platstagg Täby) · DeNI1zEkcpW "180 kvm Tak/Vägg
   målning samt microlituppsättning och snobbkant" (platstagg Södertälje). Alla
   tre är inbäddade i Instagram-sektionen. Reco-omdöme Johan W: lägenhet 43 kvm.
   Jobbildernas bildtexter säger bara vad bilden visar och vilken tjänstesida på
   gdmaleri.se den ligger under; ingen ort är belagd för dem.
   Alla stillbilder är firmans egna foton från gdmaleri.se (galleri, utförda
   arbeten, tjänstesidor) och bildrutor ur deras egen film.
   Alla filmer (hero, Varför, kontakt) är klipp ur firmans EGEN herofilm på
   gdmaleri.se: wp-content/uploads/2026/02/Omslag-hemsida-2.mp4 (Elementor-
   bakgrundsvideo i startsidans första sektion, 1920×1080, 60 s, hämtad
   2026-10-08). Den visar en vit villa med solceller (drönare, deras skylt på
   altanen, målare på stege vid balkongen), en takfot som rollas, och inne:
   spackling, rollning och slipning i jacka med GD Måleris logotyp och nummer.
   Ingen ort är belagd för villan, så filmen påstår ingen.
   Hero = 0:02.1–6.1, 6.35–9.3, 30.3–33.3, 39.7–42.7, 55.0–58.5 (16,4 s,
   stående omramad per klipp) · Varför = takfoten 0:13.2–19.2 + logokort ·
   kontakt = herofilmen nedskalad och suddad.
   Fasadtvätt, taktvätt och takmålning (YTTERTAK) som tjänster: Ghandi via
   Mathias 2026-10-08 ("fasadtvätt, och takmålning i tjänsterna också").
   Takfotona är Ghandis egna, skickade via Mathias 2026-10-08 (images/5.png
   och 6.png, samma jobb som IG-karusellen Dcja9QqkbrR). Ghandi beskriver
   jobbet som TAKTVÄTT: Före = jobb-tak-fore.jpg ("Tak före tvätt"), Efter
   tvätt = tjanst-tak.jpg (tjänstekortet). Ingen bild påstås visa ett målat
   tak. OBS: gdmaleri.se:s "Takmålning" är INNERTAK; här står det
   "innertak" i invändig-kortet. Skatteverket (gerarbetetratttillrotavdrag,
   hämtat 2026-10-08): på småhus ger "rengöra … tak, takpannor" och
   "reparera och underhålla … takpannor" rotavdrag. Inga löften om metod,
   kemikalier, produkt, garanti eller pris för tvätt eller takmålning.
   Tjänstekortens texter omskrivna 2026-10-08 (Ghandi tyckte de var
   "sådär"); "Invändig målning" och "Tapetsering och spackel" är ett kort
   så att rutnätet har fyra kort (4 → 2 → 1). tjanster.lattKort (mallfält):
   rubrikerna i accentText 600, punkterna grå 400 (Ghandis önskemål).
   Korten kortade igen samma kväll (Mathias: "tjänstetexterna är för mycket,
   håll bullet points"): en mening per kort, punkterna bär innehållet, inga
   nya påståenden (allt ur texterna ovan).
   Reco-kortet (reco-kort.png): Recos egen märkesbild från IG-inlägg
   DcmMHrIEbrF (images/4.png från Mathias), HELA kortet som originalet
   (Mathias 2026-10-08 kväll: "hela Reco-kortet"): rosa ruta med märket
   "Rekommenderat 3 år i rad" och raden med GD-logotypen och "4.9 / 5
   (44 recos)". Ingen beskärning, ingen friläggning, 18 px radie
   (om.bild.rundad). Ligger i Om oss i stället för logotypen (om.bild),
   utan raden under (kortet säger allt). OBS: bilden säger 44 recos (Recos
   skärmdump), Reco visar nu 45; texten på sidan säger 45.
   INGA PLATTOR BAKOM MÄRKENA (Mathias 2026-10-08): logo.topp 'fri' = ingen
   vit rundel bakom loggan i headern (ljus variant över filmen, egna färger
   när headern blivit vit), om.utanKort = Reco-märket står fritt utan det
   vita kortet, och Varför-filmens logokort är mörkt (#0D1B2A, `mork`) med
   den ljusa varianten i stället för vitt (video-varfor-mork.mp4).

   LEVANDE FLÖDEN (mallens levande.js, 2026-10-08): omdomen.levande och
   instagram.levande. Utan nycklar i miljön (GOOGLE_PLACES_KEY,
   GDMALERI_RECO_URL, GDMALERI_IG_FLODE) ser sidan ut exakt som nu. Med dem
   hämtas Google-omdömen (högst 5, Googles ordning), Reco-omdömen och de tre
   senaste Instagram-inläggen på servern var sjätte timme. Vad som behövs och
   kostar: content/leads/gdmaleri.md, "Levande omdömen och Instagram".
   GD Måleri Sthlm AB är KUND hos Bahko Byrå sedan 2026-10-08.

   RECO-WIDGET (2026-10-09, Mathias, PR #239): siffrorna ur Recos egen
   widget på gdmaleri.se (reviewCount 45, rating 4,8667 → 4,9, transparencyRating
   "Best" = "Mycket bra", verifieringstexten ordagrant) och reco.se/gd-maleri-sthlm
   (JSON-LD aggregateRating 4,9/45, hämtat 2026-10-09). Omdömena ordagrant med
   datum och reco.se/r/<id> (se ../gdmaleri/_gd.js RECO_LISTA); Bo M:s signatur
   och Anders F:s stjärn-emojis strukna. Två omdömen utan känt betyg (Jenny E,
   Viktor E) är inte med. #239:s rullande partnerband (Flügger, Måleriföretagen,
   AAA, Reco 2024) togs INTE med vid sammanslagningen 2026-10-09 (Mathias beslut):
   märkena står i stället i Samarbeten sist på sidan (se _gd.js samarbeten), bara
   belagda sådana — Måleriföretagen och AAA är inte verifierade.

   INTE verifierat, och finns därför inte i någon text: Google-profil och betyg
   (ingen hittad), öppettider, priser, antal projekt, ledtider, medlemskap i
   Måleriföretagen och AAA-kreditbetyg (märkena står på gdmaleri.se men är inte
   kontrollerade — se FLAGGOR; inte med på sidan),
   "Alltid fast pris" (sajten säger det, men ett Reco-omdöme
   beskriver slutpris över offert vid tillägg — utelämnat). Gatuadressen
   (Prosten Linders Väg 39, Södertälje, enligt Reco) visas inte.

   NYA BILDER (2026-10-09, Ghandi via Mathias): Fasad-kortet visar
   fasad-fore-efter-kortbild.webp, sammansatt före/efter av samma gavel (Bromma-jobbet,
   IG Dd-zVd3ggOI 2026-10-02; se fasad/page.js). Banden: jobb-taby-43.webp (Ghandis
   foto ur Täby-inlägget Dc1IM7Pgpeh, 2026-09-03) och invandig-sodertalje-1.webp
   (bild 2 ur senaste inlägget DeNI1zEkcpW, 2026-10-07, Södertälje, "180 kvm Tak/Vägg
   målning samt microlituppsättning och snobbkant"). Hämtat 2026-10-09 via Instagrams
   publika inbäddning (profilens /embed/ och inläggens /embed/captioned/).

   FLAGGOR (märken som INTE visas): AAA — Dun & Bradstreets AAA kräver att bolaget
   funnits i mer än två år; GD registrerades 2024-01-16 och märket laddades upp
   på sajten 2025-02, så det kan inte ha varit giltigt då. Märket är dessutom ett
   licensierat varumärke (D&B LiveLogo). Ghandi måste bekräfta aktivt AAA och
   licens, och skicka en skarp fil (sajtens är 100 px bred) — först då kan det
   läggas i Samarbeten. Måleriföretagen — medlemskapet gick inte att kontrollera
   (medlemsregistret är JS-drivet); Ghandi bekräftar.
   FLAGGOR: inga genererade filmer längre — hero, Varför och kontakt är
   deras egen film (se ovan). Den genererade rödfärgade villan och
   röda-gavel-filmerna är borttagna 2026-10-08. Logokortet: loggan är nästan
   kvadratisk, så den fyller 85 % av höjden men bara 51 % av bredden.
   (gamla video-varfor.mp4 och poster-varfor.jpg med vitt logokort är borttagna)
   Logotypen är deras egen: formerna, penseln och texten är vektorerna ur
   GD-MALERI-STHLM-AB-logo-1.svg i deras mediebibliotek (gradientbilden i den
   filen är bortstrippad), fyllda med färgerna ur deras 512-px PNG. 1400 px
   bred. Den ljusa varianten har bara texten omfärgad till vit, som i deras
   egen vita variant i sajtens header. Varför-filmens slutkort har samma
   skarpa logotyp. Formuläret går till Ghandis egen Web3Forms-nyckel (se ovan).

   OPTIMERING (skillen optimering, 2026-10-08): titel och beskrivning med
   firmanamn, tjänst och ort; JSON-LD HousePainter nedan, utan betyg/omdömen
   (svartlistan). noindex står KVAR tills sidan ligger på gdmaleri.se —
   bahkobyra.se/gdmaleri ska inte konkurrera med hans egen domän. Ingen
   canonical till gdmaleri.se förrän innehållet där är detsamma. Åtgärdslistan
   står i content/leads/gdmaleri.md under "Optimering".

   TJÄNSTESIDOR (2026-10-08, förebild marlonshantverksgrupp.se som Ghandi
   skickade, ingen text kopierad): invandig-malning/, fasad/, tak/ och golv/,
   var och en med egen VERIFIERAT/FLAGGOR. Det gemensamma (tema, logotyp,
   kontakt, formulär, Varför, Om oss, steg, länklistor) ligger i _gd.js.
   Tjänstekorten här länkar till sina sidor (mallfältet tjanster.kort[].lank),
   footerns Tjänster-kolumn till alla fem (footer.tjanster) och mobilmenyn får
   dem som inte ryms i pillret (nav.extra).
   GOLV är ny tjänst (Mathias på Ghandis vägnar 2026-10-08; Bolagsverket:
   "golvläggning"; två Reco-omdömen om golvslipning, se golv/page.js). Golvkortets
   bild (golv-slipat.jpg) är en GENERERAD illustration: alt-texten börjar med
   "Illustrationsbild" och jobb.not säger det. "Snickerier och fönster" är inte
   längre ett eget kort (rutnätet håller fyra kort): fönster står i fasadkortet
   och dörrar/lister i invändig-kortet, och bilden ligger i jobbandet.
   FORMULÄRET (2026-10-08) går till Ghandis EGEN Web3Forms-nyckel (data.formular,
   _gd.js). Ämne ("Ny förfrågan via hemsidan – {field:kundtyp}") och avsändare
   ("GD Måleri hemsida") och autosvaret är inställda i hans Web3Forms-panel; anropet
   skickar inget subject/from_name, e-postfältet heter email. Kundtyp Privatperson/Företag/BRF (kontaktSektion.kundtyp). Svarstid
   "Vi återkommer inom 24 timmar": Mathias på Ghandis vägnar 2026-10-08.
   BOKNING (data.bokning, _gd.js): Cal.com-länkarna cal.com/gdmaleri/offert
   (kostnadsfri offert, 45 min hembesök, vardagar 08–17) och /ring-mig (15 min,
   Ghandi ringer upp), Mathias 2026-10-08. Kalendern för /offert är inbäddad som
   <iframe> i egen sektion "Boka offertbesök direkt" före kontakt (bokning.inbaddad,
   ?embed=true&theme=light, ingen embed.js); /ring-mig är en länk under. Öppettider
   vardagar 08–17 och "hela Stockholm" bekräftade av Ghandi samma dag.

   BRF-UNDERSIDA (2026-10-08): brf/page.js, länkad som "För BRF" i nav (och
   därmed footer och mobilmeny). Egen VERIFIERAT/FLAGGOR där; BRF är nytt
   för Ghandi, och tre av dess bilder är genererade illustrationer.
   =========================================================================== */

export const metadata = {
  title: 'Målare i Stockholm – fasad, tak och invändig målning | GD Måleri Sthlm AB',
  description:
    'GD Måleri Sthlm AB är målare i Stockholm: fasadtvätt och fasadmålning, taktvätt och takmålning, invändig målning, tapetsering, bredspackling och golv. Kostnadsfri offert, ROT direkt på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const M = '/gdmaleri/media';

/* Strukturerad data. url och @id = hans egen domän. Bildfilerna serveras i
   dag från bahkobyra.se; byt FILBAS till DOMAN när sajten flyttat dit och
   kontrollera att logotypens URL svarar 200. Inget AggregateRating/Review:
   egna omdömen i schema är otillåtna, stjärnorna ska komma från Google-profilen. */
const DOMAN = 'https://gdmaleri.se';
const FILBAS = 'https://www.bahkobyra.se';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  '@id': `${DOMAN}/#business`,
  name: 'GD Måleri Sthlm AB',
  url: `${DOMAN}/`,
  logo: `${FILBAS}${M}/logo-gdmaleri.png`,
  image: `${FILBAS}${M}/tjanst-fasad.jpg`,
  description: 'Målerifirma i Stockholm: invändig målning av väggar och innertak, fasadtvätt och fasadmålning, taktvätt och målning av yttertak, tapetsering, bredspackling, målning av snickerier och fönster, och golvläggning, golvslipning och golvmålning. ROT dras direkt på fakturan.',
  telephone: '+46737298889',
  email: 'info@gdmaleri.se',
  foundingDate: '2024-01-16',
  identifier: { '@type': 'PropertyValue', name: 'Organisationsnummer', value: '559468-2444' },
  vatID: 'SE559468244401',
  address: { '@type': 'PostalAddress', addressLocality: 'Södertälje', addressRegion: 'Stockholms län', addressCountry: 'SE' },
  // Hela Stockholm och vardagar 08–17: bekräftat av Ghandi (via Mathias 2026-10-08).
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
  areaServed: [
    { '@type': 'City', name: 'Stockholm' },
    { '@type': 'AdministrativeArea', name: 'Stockholms län' },
    { '@type': 'Place', name: 'Bromma, Stockholm' },
    { '@type': 'City', name: 'Täby' },
    { '@type': 'City', name: 'Södertälje' },
  ],
  sameAs: [
    'https://www.instagram.com/gdmaleristhlm/',
    'https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/',
    'https://www.reco.se/gd-maleri-sthlm',
    // Google Företagsprofil (Mathias 2026-10-08, kartlänk ur Maps)
    'https://maps.google.com/?cid=13566570836618556636',
  ],
};

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema: {
    mork: '#0D1B2A',
    accent: '#D42E44',
    accentHover: '#B82237',
    accentText: '#B82237',
    accentLjus: '#FF8E9A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-gdmaleri.png`, ljus: `${M}/logo-gdmaleri-ljus.png`, w: 1400, h: 1315, alt: 'GD Måleri Sthlm AB', topp: 'fri' },
  kontakt: {
    tel: '073-729 88 89',
    telHref: 'tel:+46737298889',
    epost: 'info@gdmaleri.se',
    ig: 'https://www.instagram.com/gdmaleristhlm/',
    igHandle: '@gdmaleristhlm',
    fb: 'https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/',
    orgnr: '559468-2444',
    oppet: 'Vardagar 08–17',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  formular,
  bokning,
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    // Undersidan för bostadsrättsföreningar (brf/page.js). Länkas här, i footerns
    // "Sidan"-kolumn och i mobilmenyn — mallen tar nav-länkarna till alla tre.
    hoger: [{ href: '/gdmaleri/brf/', txt: 'För BRF' }, { href: '#omdomen', txt: 'Omdömen' }],
    // Tjänstesidorna, bara i mobilmenyn (pillret rymmer två plus två).
    extra: menyExtra('/gdmaleri/brf/'),
  },

  hero: {
    ort: 'Stockholm',
    tjanster: ['Måleri', 'Fasad'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['4,9 av 5 på Reco', 'Rekommenderat tre år i rad', 'Invändig målning', 'Fasadtvätt', 'Fasadmålning', 'Taktvätt', 'Takmålning', 'Tapetsering', 'Golvläggning', 'Golvslipning', 'ROT direkt på fakturan', 'F-skatt och försäkrade'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Inne, ute och', 'allt förarbete'],
    lead: '4,9 av 5 i snitt på Reco från 45 omdömen, och Rekommenderat företag på Reco tre år i rad. Vi målar inne och ute och gör förarbetet själva: skrapning, slipning, spackling och tapetborttagning.',
    lattKort: true,
    kort: [
      { id: 'invandig', namn: 'Invändig målning och tapet', bild: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', text: 'Väggar, innertak och snickerier, hemma eller på kontoret.', punkter: ['Tapet och bredspackling', 'Dörrar, foder och lister', 'ROT direkt på fakturan'], lank: { href: '/gdmaleri/invandig-malning/', txt: 'Allt om invändig målning' }, ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M84 60h32v24H84z" /></>) },
      { id: 'fasad', namn: 'Fasadtvätt och fasadmålning', bild: `${M}/fasad-fore-efter-kortbild.webp`, alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva flagnande grå färg och byggställning, höger halva nymålad ljusgrå panel', text: 'Panel, vindskivor, takfot och fönsterkarmar får ny färg.', punkter: ['Fasadtvätt och skrapning', 'Fönster och dörrar', 'Färg från Flügger'], lank: { href: '/gdmaleri/fasad/', txt: 'Allt om fasaden' }, ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M44 56v44M68 50v50M92 44v56M116 44v56M140 50v50M164 56v44" /></>) },
      { id: 'tak', namn: 'Taktvätt och takmålning', bild: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', text: 'Mossa och lav tvättas bort, och taket kan målas om.', punkter: ['Taktvätt', 'Takmålning', 'ROT på småhus'], lank: { href: '/gdmaleri/tak/', txt: 'Allt om taket' }, ritning: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M58 52l84 0M46 62h108" /><path d="M136 30v18" /></>) },
      { id: 'golv', namn: 'Golvläggning och golvslipning', bild: `${M}/golv-slipat.jpg`, alt: 'Illustrationsbild: trägolv halvvägs slipat, ljust där golvslipen har gått och mörkt och slitet bredvid', text: 'Nytt golv, eller det gamla slipat eller målat.', punkter: ['Golvläggning', 'Golvslipning', 'Golvmålning'], lank: { href: '/gdmaleri/golv/', txt: 'Allt om golv' }, ritning: (<><path d="M14 100h172" /><path d="M40 100l22-62h76l22 62" /><path d="M74 100l8-62M126 100l-8-62M100 100V38" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Hus och hem vi', 'har målat om'],
    lead: 'Fasader, tak, fönster, trappor och rum. Bilderna i banden är från våra egna projekt.',
    not: 'Golvbilden under Tjänster är en illustrationsbild. Fler jobb, med ort och yta, finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', txt: 'Tak före tvätt' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', txt: 'Panel och fönster målade' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
      { src: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', txt: 'Dörr målad mörkgrön' },
    ],
    rad2: [
      { src: `${M}/invandig-sodertalje-1.webp`, alt: 'Nymålat rum med ljusa väggar, vit taklist och skrivbord vid fönstret i Södertälje', txt: 'Södertälje: tak och väggar, 180 kvm' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trapphus med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trapphus målat i två kulörer' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/jobb-bredspackling.jpg`, alt: 'Vägg under bredspackling, golvet täckt med papper', txt: 'Vägg bredspacklas före målning' },
      { src: `${M}/tjanst-tapet.jpg`, alt: 'Nyuppsatt mönstrad tapet runt en dörr', txt: 'Mönstrad tapet uppsatt' },
    ],
  },

  varfor: {
    eyebrow: 'Varför GD Måleri',
    rubrik: ['Allt i offerten,', 'inget i förskott'],
    lead: 'Offerten kostar ingenting och tar med allt från förarbete till bortforsling. Inget extra görs utan ditt ja, och fakturan kommer när jobbet är klart.',
    punkter: [
      { rubrik: 'Allt med i offerten', text: 'Material, förarbete som tvätt och skrapning, städning och bortforsling räknas in från början. Offerten är kostnadsfri.' },
      { rubrik: 'Inget extra utan ditt ja', text: 'Dyker något oväntat upp hör vi av oss direkt. Vi gör inga extraarbeten utan ditt godkännande.' },
      { rubrik: 'Ett års garanti', text: 'Behöver något åtgärdas under det första året gör vi det utan extra kostnad.' },
      { rubrik: 'Slutbesiktning före fakturan', text: 'Vi går igenom resultatet när jobbet är klart. Ingen förskottsbetalning, och ROT är redan avdraget på fakturan.' },
    ],
    video: `${M}/video-varfor-mork.mp4`,
    poster: `${M}/poster-varfor-mork.jpg`,
    videoAlt: 'En målare rollar en vit takfot med långskaft mot tallar och blå himmel, ur GD Måleris egen film. Filmen slutar med GD Måleris logotyp.',
  },

  om: {
    eyebrow: 'Om GD Måleri',
    rubrik: ['Ägaren driver', 'firman själv'],
    // Recos hela märkeskort i stället för logotypen (Mathias 2026-10-08). Mallfältet om.bild, rundad.
    bild: { src: `${M}/reco-kort.png`, w: 827, h: 845, alt: 'Reco: GD Måleri Sthlm AB, rekommenderat företag tre år i rad, 4,9 av 5', rundad: true },
    utanKort: true,
    stycken: [
      'GD Måleri Sthlm AB är målare i Stockholm, och firman drivs av Ghandi Danho. Vi målar inomhus och utomhus och gör förarbetet själva, med flera års erfarenhet i yrket.',
      'Vi målar åt villaägare, bostadsrätter och företag, från en lägenhet på 43 kvm till en fasad på 350 kvm i Täby kyrkby. Färgen är Flügger, och vi är försäkrade via Trygg-Hansa.',
    ],
    bevis: [
      { ord: '4,9 av 5', text: 'i snitt på Reco, 45 omdömen' },
      { ord: 'Tre år i rad', text: 'Rekommenderat företag på Reco' },
      { ord: 'F-skatt', text: 'och fullt försäkrade' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet till', 'färdig genomgång'],
    lead: 'Inget extra utan ditt ja, och fakturan kommer när jobbet är klart.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad som ska målas, inne eller ute. Det räcker med några rader.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri offert', text: 'Du får en offert där material, arbete, förarbete, städning och bortforsling ingår.', ikon: 'offert' },
      { namn: 'Vi målar', text: 'Allt som inte ska målas täcks. Du hålls uppdaterad, och inget extra görs utan ditt ja.', ikon: 'arbete' },
      { namn: 'Slutbesiktning', text: 'Vi går igenom resultatet tillsammans. Fakturan kommer efter det, med ROT redan avdraget.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Det kunderna', 'lägger märke till'],
    reco: RECO_WIDGET,
    lista: RECO_LISTA,
    not: 'Från Reco.se, där kundrelationen kontrolleras.',
    lank: { href: 'https://www.reco.se/gd-maleri-sthlm', txt: 'Läs alla 45 på Reco' },
    // Levande omdömen (mallens levande.js). Utan nycklar i miljön visas listan ovan oförändrad.
    // Google: GOOGLE_PLACES_KEY i Vercel. placeId saknas än: Text Search på namnet, och cid
    // kontrolleras mot profilen (maps.google.com/?cid=13566570836618556636). Sätt placeId när det är känt.
    // Reco: hela API-URL:en från Reco (med nyckel) i GDMALERI_RECO_URL. Utan den: Reco-citaten ovan.
    levande: {
      google: { sok: 'GD Måleri Sthlm AB', cid: '13566570836618556636' },
      reco: { urlEnv: 'GDMALERI_RECO_URL' },
      max: 6,
    },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Måleri inne och ute · Stockholm',
    // Levande flöde: Behold JSON-URL (eller Instagram-token) i GDMALERI_IG_FLODE. Utan den: inbäddningarna.
    levande: { env: 'GDMALERI_IG_FLODE', antal: 3 },
    koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DeNI1zEkcpW'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring oss och fråga rakt ut om just ditt hus eller din lägenhet.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på ytan, skicket och vad som ska göras. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som tvätt och skrapning, städning och bortforsling.' },
      { q: 'Hur fungerar ROT-avdraget?', a: 'Vi drar av ROT direkt på fakturan och sköter resten, så du behöver inte göra något själv. Hur stort avdraget blir beror på arbetskostnaden och hur mycket avdrag du redan har använt i år. På ett småhus gäller det också taktvätt och takmålning: Skatteverket räknar rengöring och underhåll av tak och takpannor som rotarbete.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning. På stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då hör vi av oss direkt och föreslår en lösning. Vi gör inga extraarbeten utan ditt godkännande.' },
      { q: 'Har ni garanti?', a: 'Ja, ett år på måleriarbetet. Behöver något åtgärdas under den tiden gör vi det utan extra kostnad.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är fullt försäkrade via Trygg-Hansa. Skulle något gå fel under arbetet är du skyddad.' },
      { q: 'Hur skyddar ni hemmet?', a: 'Allt som inte ska målas täcks med plast eller papper, och vi skyddar möbler och golv innan vi börjar.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har vi bland annat målat fasader i Bromma och Täby kyrkby och tak och väggar i Södertälje.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert,', 'den kostar ingenting'],
    lead: 'Ring, eller skriv några rader om jobbet. Du får en kostnadsfri offert där allt ingår, från förarbete till bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska göras, inne eller ute, ungefärlig yta, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Inne eller ute?',
    text: 'Berätta vad som ska målas så får du en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Målare i Stockholm för invändig målning, fasadtvätt och fasadmålning, taktvätt och takmålning, tapetsering, snickerier och golv. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
  },

  modal,
  // Samarbeten (Reco, Flügger, Trygg-Hansa) sist på sidan, före footern: se _gd.js.
  samarbeten,
};

export default function GdMaleriDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
