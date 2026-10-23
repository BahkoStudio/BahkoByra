import DemoSida from '../_mall/DemoSida';
import ForeEfterReglage from './ForeEfterReglage';

/* ===========================================================================
   FÄRGA TAK — kostnadsfritt hemsideförslag från Bahko Byrå (ny lead)
   Takmålning i hela Sverige. Ägaren startar AB vid årsskiftet: inget org.nr än.
   Byggd 2026-10-22 på demomallen v3 (hero exakt som velebitmaleri, placeholders
   och dolda sektioner som kakel0413).

   Bärande idé: ett trött, mossigt tak kan se ut som nytt igen. Heron visar
   det: mossigt och blekt → målaren sprutar färg → blankt, nymålat tak.

   VERIFIERAT (Mathias 2026-10-22):
   - Namn och NY logotyp "FÄRGA TAK" (kundens filer 2026-10-23: rund och fyrkantig,
     vit text + två korallröda takvinklar på svart). Originalen ligger som
     logo-original-rund.jpg / logo-original-fyrkant.jpg. logo.png/.webp = den
     fyrkantiga, svart bakgrund gjord transparent och beskuren (1504×648), inte
     omritad. ikon.png/apple-ikon.png = takvinklarna på svart (favicon).
     Logans slogan "VI MÅLAR TAK I HELA SVERGIE" (sic) står kvar i filen; i
     sidtexten skrivs "Sverige".
   - Tjänst: takmålning. Område: hela Sverige (logans slogan).
   - Färger ur nya logon: svart bas, vitt, korall #FE504F (uppmätt ur bilden).
     Svart text på korallknappar (ca 7:1), vit text på svart. Rubriker i Outfit 800
     versaler (geometrisk sans, nära logans typsnitt). Stilen ligger i STIL nedan.

   INTE verifierat, och finns därför INTE på sidan: telefon, e-post, ort,
   hemsida, Instagram, org.nr, F-skatt, ROT-avdrag, priser, garantier,
   ledtider, omdömen, jobbfoton.

   PLATSHÅLLARE (för Mathias):
   - TELEFON: '07X-XXX XX XX' är en tydlig platshållare, länken går till #kontakt
     (inte ett nummer som går att ringa). Byt tel + telHref när numret finns.
   - Tjänstekorten (Takmålning / Färgval / Ett tak som ser nytt ut) beskriver bara
     takmålningen (Mathias 2026-10-22: ingen rengöring på sidan). Stegen och frågorna är generella och
     ska stämmas av med ägaren.
   - JOBB, OMDÖMEN OCH OM OSS är dolda (stilblocket nedan): inga jobbfoton,
     inga omdömen, ingen ägarberättelse ännu. Inget påhittat.
   - VARFÖR- OCH KONTAKTFILMEN ÄR GENERERADE (Higgsfield: Qwen Image 3 + Wan 3.0
     Prime). TJÄNSTEBILDERNA OCH HERONS FÖRE/EFTER (2026-10-23) är gjorda med GPT
     Image 2.5 Sunburst (Higgsfield marketing-studio/image/sunburst, 2k high);
     efter-bilden är en redigering av före-bilden, så tak och vinkel är desamma.
     Hero-filmen ligger kvar i media men visas inte när foreEfter är satt.
     Heron: hero-fore.webp + hero-efter.webp i en dragbar jämförelse (ForeEfterReglage.js).
     Illustrationer, INTE kundens egna jobb.
   - Formuläret går till demonyckeln (Mathias). Vid leverans: egen nyckel.
   =========================================================================== */

export const metadata = {
  title: 'Färga Tak — takmålning i hela Sverige',
  description: 'Färga Tak målar tak i hela Sverige. Ett blekt, trött tak blir nymålat igen. Berätta om ditt tak och begär en offert.',
  robots: { index: false, follow: false },
  icons: { icon: '/fargatak/media/ikon.png', apple: '/fargatak/media/apple-ikon.png' },
};

const M = '/fargatak/media';

const tjanster = [
  {
    id: 'takmalning',
    namn: 'Takmålning',
    bild: `${M}/foto-malning.jpg`,
    alt: 'Illustration: takmålare i sele sprutar svart takfärg över ett mossigt tak med betongpannor, halva taket redan målat',
    text: 'Taket målas jämnt över hela ytan, från nock till takfot.',
    punkter: ['Hela takytan', 'Jämnt och noggrant', 'Villor och hus i hela Sverige'],
    ritning: (<><path d="M20 90l80-55 80 55" /><path d="M120 30l25-15M145 15l10 10M150 20l-10 30" /><path d="M20 105h160" /></>),
  },
  {
    id: 'fargval',
    namn: 'Färgval',
    bild: `${M}/foto-farg.jpg`,
    alt: 'Illustration: kulörprover för takfärg i svart, grått, tegelrött och brunt bredvid en gammal takpanna',
    text: 'Du väljer kulör till taket. Vi går igenom valet med dig innan arbetet börjar.',
    punkter: ['Kulör till taket', 'Bestäms tillsammans', 'Innan arbetet börjar'],
    ritning: (<><circle cx="100" cy="60" r="35" /><path d="M100 25v70M65 60h70" /><path d="M20 105h160" /></>),
  },
  {
    id: 'klart',
    namn: 'Ett tak som ser nytt ut',
    bild: `${M}/foto-klart.jpg`,
    alt: 'Illustration: takmålare och husägare tittar upp på ett nymålat svart tak på en röd trävilla',
    text: 'När jobbet är klart går vi igenom resultatet tillsammans med dig.',
    punkter: ['Nymålat tak', 'Genomgång när det är klart', 'Fräscht hus igen'],
    ritning: (<><path d="M20 90l80-55 80 55" /><path d="M75 75l15 15 35-35" /><path d="M20 105h160" /></>),
  },
];

const data = {
  namn: 'Färga Tak',
  // Kundens nya logga (2026-10-23): svart bakgrund gjord transparent, beskuren. Vit text + korall, för mörk botten.
  logo: { src: `${M}/logo.webp`, ljus: `${M}/logo.webp`, w: 1504, h: 648, alt: 'Färga Tak', topp: 'fri' },
  tema: {
    mork: '#0A0A0A',
    accent: '#FE504F',
    accentHover: '#FF6B6A',
    accentText: '#FF6B6A',
    accentLjus: '#FF8A89',
    paAccent: '#0A0A0A',
  },
  kontakt: {
    // PLATSHÅLLARE: inget telefonnummer än. Länken går till formuläret, inte till ett nummer.
    tel: '07X-XXX XX XX',
    telHref: '#kontakt',
    adress: 'Hela Sverige',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Takmålning' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#varfor', txt: 'Därför oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    tjanster: ['Takmålning', 'Nytt utseende'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
    // Före/efter: samma villa och vinkel. Mallen visar före-bilden; ForeEfterReglage lägger den dragbara jämförelsen ovanpå.
    foreEfter: { src: `${M}/hero-fore.webp`, alt: 'Villatak före målning: mossigt och blekt', w: 900, h: 1200, txt: 'Dra i handtaget för att se före och efter' },
  },
  tejp: ['Takmålning', 'Nymålat tak', 'Färgval', 'Nytt utseende', 'Villor', 'Hela Sverige', 'Färga Tak'],

  tjanster: {
    eyebrow: 'Takmålning',
    rubrik: ['Från blekt och trött', 'till nymålat'],
    lead: 'Vi gör en sak: vi målar tak, i hela Sverige. Bilderna är illustrationer.',
    kort: tjanster,
  },

  // Dold (se PLATSHÅLLARE): inga jobbfoton än. Banden får inte vara tomma, så en dold post var.
  jobb: {
    eyebrow: '', rubrik: [''], lead: '', not: '', tid: '60s',
    rad1: [{ src: `${M}/logo.webp`, alt: '', txt: '' }],
    rad2: [{ src: `${M}/logo.webp`, alt: '', txt: '' }],
  },

  varfor: {
    eyebrow: 'Varför Färga Tak',
    rubrik: ['Taket är det första', 'man ser av huset'],
    lead: 'Ett mossigt, blekt tak får hela huset att se trött ut. Nymålat ser det ut som nytt igen.',
    punkter: [
      { rubrik: 'Bara tak', text: 'Takmålning är det enda vi gör. Hela fokus ligger på ditt tak.' },
      { rubrik: 'Du väljer kulör', text: 'Vi går igenom färgvalet med dig innan arbetet börjar.' },
      { rubrik: 'Hela Sverige', text: 'Vi målar tak i hela landet. Berätta var huset ligger.' },
      { rubrik: 'Tydlig offert', text: 'Du vet vad som ingår innan arbetet börjar.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Illustration: ett nymålat, blankt tak på en svensk villa, som slutar med Färga Taks logotyp',
  },

  // Dold (se PLATSHÅLLARE): ingen ägarberättelse ännu. Mallen kräver fältet.
  om: {
    eyebrow: 'Om oss',
    rubrik: ['Färga Tak', ''],
    kortRad: 'Hela Sverige',
    stycken: ['[Platshållare: kort om ägaren och firman.]'],
    bevis: [],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första kontakt', 'till nymålat tak'],
    lead: 'Det ska vara enkelt att få taket målat. Så här går det till.',
    lista: [
      { namn: 'Kontakt', ikon: 'kontakt', text: 'Berätta kort om taket och var huset ligger. Skicka gärna bilder på taket.' },
      { namn: 'Vi tittar på taket', ikon: 'besok', text: 'Vi går igenom taket och vad som behöver göras innan det målas.' },
      { namn: 'Offert', ikon: 'offert', text: 'Du får en tydlig offert, så att du vet vad som ingår innan arbetet börjar.' },
      { namn: 'Planering', ikon: 'plan', text: 'Vi bestämmer tillsammans när arbetet ska göras.' },
      { namn: 'Målning', ikon: 'arbete', text: 'Taket målas. Om något oväntat dyker upp pratar vi med dig först.' },
      { namn: 'Genomgång', ikon: 'klart', text: 'När taket är klart går vi igenom resultatet tillsammans med dig.' },
    ],
  },

  // Dold (se PLATSHÅLLARE): inga omdömen ännu, och vi hittar inte på några.
  omdomen: { eyebrow: '', rubrik: [''], lista: [], not: '' },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    lead: 'Kort om hur det fungerar.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Skriv till oss, så får du besked om just ditt tak.' },
    lista: [
      { q: 'Var arbetar ni?', a: 'Vi målar tak i hela Sverige.' },
      { q: 'Vad gör ni?', a: 'Takmålning. Det är det enda vi gör.' },
      { q: 'Kan jag skicka bilder på taket?', a: 'Gärna. Bilder gör att vi får en bättre bild av taket redan från början.' },
      { q: 'Vet jag vad det kostar innan ni börjar?', a: 'Ja. Du får en offert och vi går igenom vad som ingår innan arbetet börjar.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då pratar vi med dig innan vi går vidare.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om ditt tak,', 'så hör vi av oss'],
    lead: 'Skriv kort om taket och var huset ligger. Skicka gärna bilder. Vi målar tak i hela Sverige.',
    checkar: ['Takmålning i hela Sverige', 'Färgval tillsammans med dig', 'Tydlig offert innan arbetet börjar'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Var ligger huset, vilken sorts tak är det (t.ex. betongpannor) och ungefär hur stort är det?',
    formNot: 'Skriv kort om taket, då blir första kontakten mer konkret. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Ser taket trött ut?',
    text: 'Berätta om ditt tak, så får du en offert innan arbetet börjar.',
  },

  footer: {
    text: 'Färga Tak målar tak i hela Sverige. Ett blekt, trött tak blir nymålat.',
  },

  modal: {
    rubrik: 'Så här kan Färga Tak se ut på nätet',
    text: 'Det här är en förhandsvisning av hemsidan. Bilderna och filmen är illustrationer, inte egna jobb. Telefon och kontaktuppgifter fylls i när de finns, och formuläret landar ännu inte i Färga Taks inkorg.',
  },
};

/* STIL: loggans uttryck — svart bas, vitt, korall, kraftig geometrisk versal-rubrik och
   takvinkeln som motiv. Bara variabler och kundens egna överstyrningar; mallen (🔒) är orörd. */
const STIL = `
#jobb,#omdomen,#om{display:none!important}
[class*="sida"]{--vit:#0A0A0A;--mjuk:#141414;--kram:#111;--text:#fff;--text-2:#C9C9C9;--linje:#2A2A2A;--kort:#161616;--f-kursiv:var(--f-rubrik)}
body:has([class*="sida"]){background:#0A0A0A}
[class*="sida"] header{background:rgba(10,10,10,calc(var(--bahko-hdr-t) * .94))!important;box-shadow:0 1px 0 rgba(254,80,79,calc(var(--bahko-hdr-t) * .5))!important}
[class*="sida"] header nav{border-color:rgba(255,255,255,.14)!important;background:rgba(255,255,255,.04)!important}
[class*="sida"] [class*="heroTjanster"]{font-family:var(--f-rubrik);font-style:normal;font-weight:800;text-transform:uppercase;letter-spacing:.03em}
[class*="sida"] :is(h2,h3){font-family:var(--f-rubrik);font-weight:800;text-transform:uppercase;letter-spacing:.01em}
[class*="sida"] :is(h1,h2,p) :is(em,i),[class*="sida"] [class*="hero"] em{font-style:normal;font-weight:800;text-transform:uppercase;letter-spacing:.02em}
[class*="sida"] h2 :is(em,i){color:var(--accent)}
[class*="sida"] :is([class*="tjanst_"],[class*="tjanst "],[class*="resaNod"],[class*="fragaKort"],[class*="fraga_"],[class*="fragaIkon"],[class*="form_"],[class*="mobilMenyPanel"],[class*="popup"],[class*="btnLjus"]){background:var(--kort)!important;color:#fff;border-color:#2A2A2A}
[class*="sida"] [class*="form"] :is(input,textarea,select){background:#0F0F0F!important;color:#fff;border-color:#3A3A3A}
[class*="sida"] [class*="form"] ::placeholder{color:#9A9A9A}
[class*="sida"] [class*="form"] label{background:transparent}
[class*="sida"] [class*="tjanstBild"]{background:#111!important}
[class*="sida"] footer{background:#000!important;color:#fff;border-top:3px solid var(--accent)}
[class*="sida"] [class*="eyebrow"]::before{content:"";display:inline-block;width:.9em;height:.5em;margin-right:.45em;vertical-align:.1em;background:var(--accent);clip-path:polygon(0 100%,50% 0,100% 100%,82% 100%,50% 36%,18% 100%)}
[class*="sida"] section+section{border-top:1px solid #1E1E1E}
`;

export default function FargaTakDemo() {
  return (
    <>
      {/* Jobbanden, omdömena och Om oss döljs tills det finns egna foton, riktiga omdömen och en ägartext (se PLATSHÅLLARE). */}
      <style>{STIL}</style>
      <DemoSida data={data} />
      <ForeEfterReglage fore={`${M}/hero-fore.webp`} efter={`${M}/hero-efter.webp`} altFore="Villatak före målning: mossigt och blekt" altEfter="Samma villatak efter målning: nymålat i matt svart" />
    </>
  );
}
