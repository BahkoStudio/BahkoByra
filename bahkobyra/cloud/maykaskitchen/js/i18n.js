/* ── MaykasKitchen i18n ───────────────────────────────────── */
(function () {
  'use strict';

  const T = {
    sv: {
      'nav.event':   'Event',
      /* EVENT */
      'event.label':    'Live-event',
      'event.title':    'Maykas Kitchen <em>Live</em> – Malmö',
      'event.date':     'Söndag 25 oktober 2026',
      'event.place':    'Kitchen 961, Pilgatan 3, Malmö',
      'event.foto':     'Foto: Rickard L Eriksson',
      'event.vem':      'Mayka är kokboksförfattare till <em>Maykas gröna kök – Kutle, hummus och kärlek</em> och lagar mat med assyriska och syrianska rötter.',
      'event.lead':     'En eftermiddag med buffé fylld av smaker från Mellanöstern, inspirationsföreläsning med Mayka, frågestund och mingel. Dryck ingår i priset.',
      'event.platser':  'Begränsat till 150 gäster',
      'event.prog1':    'VIP-timme',
      'event.prog1b':   '· endast VIP-biljett',
      'event.prog2':    'Huvudevent',
      'event.prog2b':   '· alla gäster',
      'event.currency': 'kr',
      'event.std.name': 'Standard',
      'event.std.intro':'Huvudeventet 15:00–18:00',
      'event.std.b1':   'Buffé med smaker från Mellanöstern, dryck ingår',
      'event.std.b2':   'Inspirationsföreläsning med Mayka',
      'event.std.b3':   'Frågestund',
      'event.std.b4':   'Mingel och nätverkande',
      'event.std.b5':   'Överraskningar under eftermiddagen',
      'event.std.b6':   'Möjlighet att träffa Mayka',
      'event.vip.name': 'VIP',
      'event.vip.note': 'Allt i Standard, plus VIP-timmen 14:00–15:00:',
      'event.vip.b1':   'Insläpp redan kl. 14:00',
      'event.vip.b2':   'Välkomstdryck',
      'event.vip.b3':   'Meet &amp; Greet med Mayka',
      'event.vip.b4':   'Fotografering',
      'event.vip.b5':   'Signerad kokbok',
      'event.btn':      'Köp biljett →',
      'event.note':     'Biljetter säljs via Billetto · 150 platser totalt',
      /* SOCIALA KANALER */
      'social.label': 'Följ mig',
      'social.title': 'Följ <em>Maykas Kitchen</em>',
      'social.sub':   'Välj den kanal du gillar bäst.',
      'social.ig':    'Följ på Instagram',
      'social.aven':  'Finns även på',
      /* SAMARBETE */
      'collab.i1':  'Kampanjer',
      'collab.i2':  'Ambassadörskap',
      'collab.i3':  'Contentproduktion',
      'collab.i4':  'Receptsamarbeten',
      'collab.i5':  'Events',
      'collab.i6':  'Långsiktiga partnerskap',
      'collab.mgmt':'Management &amp; Partnerships för Maykas Kitchen',
      /* NAV */
      'nav.home':    'Hem',
      'nav.recipes': 'Recept',
      'nav.collab':  'Samarbeten',
      'nav.contact': 'Kontakt',
      'nav.buybook': 'Köp min bok →',
      'nav.open':    'Öppna meny',
      /* HERO */
      'hero.eyebrow': 'SuryoyoFood',
      'hero.w1': 'Mat',
      'hero.w2': 'från',
      'hero.w3': 'hjärtat',
      'hero.w5': 'själen',
      'hero.sub': 'Säsongsbaserad matlagning som skapar glädje runt bordet<br>för hela familjen – med autentiska assyriska/syrianska rötter.',
      'hero.btn.recipes':   'Utforska recept',
      'hero.btn.book':      'Köp min bok',
      'hero.btn.instagram': 'Följ på Instagram',
      'hero.follow': 'Följ mig',
      'hero.scroll': 'Scrolla',
      /* RECIPES SECTION */
      'recipes.label': 'Matinspiration',
      'recipes.title': 'Populära recept',
      'recipes.desc':  'Autentiska assyriska och syrianska rätter kombinerade med moderna smaker – enkla tillagningsmetoder och djupa, äkta smaker som hela familjen älskar.',
      'recipes.all':   'Se alla recept',
      'recipes.count': '17+ autentiska recept från Mayka',
      /* SHARED RECIPE UI */
      'badge.popular': 'Populärt',
      'recipe.view':   'Visa recept →',
      /* TAGS */
      'tag.bakverk':       'Bakverk',
      'tag.assyriskt':     'Assyriskt',
      'tag.traditionellt': 'Traditionellt',
      'tag.vegetariskt':   'Vegetariskt',
      'tag.vegan':         'Vegan',
      'tag.snabb':         'Snabb',
      'tag.fisk':          'Fisk',
      'tag.under60':       'Under 60 min',
      'tag.kott':          'Kött',
      'tag.syrianskt':     'Syrianskt',
      'tag.kyckling':      'Kyckling',
      'tag.friterat':      'Friterat',
      'tag.fredagsmys':    'Fredagsmys',
      'tag.gryta':         'Gryta',
      'tag.meze':          'Meze',
      'tag.nyhetsmorgon':  'Nyhetsmorgon',
      'tag.brod':          'Bröd',
      /* RECIPE CARDS */
      'rc1.name':     'Qrimyothe – Mormors munkar 🍩',
      'rc1.desc':     'Mamma berättar om mormors kärlek i varje tugga. Mer än bara ett recept – ett stycke historia.',
      'rc1.portions': '20 portioner',
      'rc2.name':     'Krämigaste kikärts-tikka masalan 🤯🔥',
      'rc2.desc':     'En gryta som kramar om både hjärta och smaklökar – den krämigaste tikka masalan du kan tänka dig.',
      'rc2.portions': '4–6 portioner',
      'rc3.name':     'Kryddig lax- &amp; risbowl',
      'rc3.desc':     'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och smakrikt.',
      'rc3.portions': '4 portioner',
      'rc4.name':     'Kafta bil sejnie',
      'rc4.desc':     'Traditionell rätt från Mellanöstern med saftiga köttbullar och potatis i smakrik tomatsås.',
      'rc4.portions': '5–6 portioner',
      'rc5.name':     'Lins- &amp; bulgurjärpar med sumak 🌿',
      'rc5.desc':     'Proteinrika vegetariska järpar med linser, bulgur och sumak – fylliga smaker från Mellanöstern.',
      'rc5.portions': '4–6 portioner',
      'rc6.name':     'Köfta bil Sanieh 🍅',
      'rc6.desc':     'Syrisk ugnsrätt med kryddig köttfärs, potatis och padron paprika i mustig tomatsås.',
      'rc6.portions': '8 portioner',
      'rc7.name':     'Friterad kyckling med BBQ-glaze 😍🔥',
      'rc7.desc':     'Krispig friterad kyckling med kladdig BBQ- och ketchupglaze och en snabb vitlöksmajonnäs. Perfekt fredagsmiddag!',
      'rc7.portions': '4 portioner',
      'rc8.name':     'Humse qarhone',
      'rc8.desc':     'Smakrik och proteinrik assyrisk/syriansk kikärtsgryta med bulgurbollar.',
      'rc8.portions': '4 portioner',
      'rc9.name':     'Hummus x 3',
      'rc9.desc':     'Grundreceptet plus två smaksättningar – krämig, syrlig och supergod.',
      'rc9.portions': '4–6 portioner',
      'rc10.name':    'Lahmo do bayto',
      'rc10.desc':    'Husets bröd – mjuk deg som gräddas till gyllene, fluffiga bröd.',
      /* CTA */
      'cta.label':       'Kontakt &amp; Samarbeten',
      'cta.heading':     'Låt oss skapa<br>tillsammans',
      'cta.sub':         'Matlagning, recept och berättelser som engagerar – redo för nästa projekt.',
      'cta.card1.title': 'Samarbeten',
      'cta.card1.body':  'Samarbeten hanteras av J&amp;J Management. Vi arbetar bland annat med:',
      'cta.card2.title': 'Min bok',
      'cta.card2.body':  '<em>Maykas gröna kök – Kutle, hummus och kärlek.</em> En resa genom smak, traditioner och kärlek.',
      'cta.card2.btn':   'Köp boken på Bokus →',
      /* FOOTER */
      'footer.tagline':  'Mat från hjärtat &amp; tro i själen.<br>Assyriska/Syrianska rötter, alltid lagat med kärlek.',
      'footer.explore':  'Utforska',
      'footer.nl.title': 'Nyhetsbrev',
      'footer.nl.p':     'Få nya recept och matinspiration direkt i din inkorg!',
      'footer.nl.btn':   'Prenumerera',
      'footer.copy':     '© 2025 MaykasKitchen. Alla rättigheter förbehållna.',
      'footer.made':     'Skapad med ♥ i Skåne, Sverige',
      /* POPUP */
      'popup.title':      'Matglädje<br><em>direkt i din inkorg</em>',
      'popup.sub':        'Nya recept, säsongsinspirat­ion och exklusiva erbjudanden – gratis varje månad.',
      'popup.btn':        'Prenumerera gratis',
      'popup.success':    '<span>✓</span> Tack! Du är nu med i gemenskapen 🌿',
      'popup.or':         'eller',
      'popup.book.title': 'Köp min bok',
      'popup.book.sub':   'Maykas gröna kök – Kutle, hummus och kärlek',
      /* RECEPT PAGE */
      'back':           'Tillbaka',
      'r.loading':      'Laddar recept…',
      'r.notfound.h':   'Recept hittades inte',
      'r.notfound.p':   'Det här receptet finns inte.',
      'r.notfound.btn': '← Tillbaka till recept',
      'r.ingredients':  'Ingredienser',
      'r.instructions': 'Tillagning',
      'r.tips':         'Tips',
      'r.portions':     'portioner',
      'r.min':          'min',
    },
    en: {
      'nav.event':   'Event',
      /* EVENT */
      'event.label':    'Live event',
      'event.title':    'Maykas Kitchen <em>Live</em> – Malmö',
      'event.date':     'Sunday 25 October 2026',
      'event.place':    'Kitchen 961, Pilgatan 3, Malmö',
      'event.foto':     'Photo: Rickard L Eriksson',
      'event.vem':      'Mayka is the author of the cookbook <em>Maykas gröna kök – Kutle, hummus och kärlek</em> and cooks with Assyrian and Syriac roots.',
      'event.lead':     'An afternoon with a buffet full of Middle Eastern flavours, an inspiring talk by Mayka, a Q&amp;A and mingling. Drinks are included.',
      'event.platser':  'Limited to 150 guests',
      'event.prog1':    'VIP hour',
      'event.prog1b':   '· VIP ticket only',
      'event.prog2':    'Main event',
      'event.prog2b':   '· all guests',
      'event.currency': 'SEK',
      'event.std.name': 'Standard',
      'event.std.intro':'The main event 15:00–18:00',
      'event.std.b1':   'Buffet of Middle Eastern flavours, drinks included',
      'event.std.b2':   'An inspiring talk by Mayka',
      'event.std.b3':   'Q&amp;A session',
      'event.std.b4':   'Mingling and networking',
      'event.std.b5':   'Surprises during the afternoon',
      'event.std.b6':   'The chance to meet Mayka',
      'event.vip.name': 'VIP',
      'event.vip.note': 'Everything in Standard, plus the VIP hour 14:00–15:00:',
      'event.vip.b1':   'Entry from 14:00',
      'event.vip.b2':   'Welcome drink',
      'event.vip.b3':   'Meet &amp; Greet with Mayka',
      'event.vip.b4':   'Photo opportunity',
      'event.vip.b5':   'Signed cookbook',
      'event.btn':      'Buy ticket →',
      'event.note':     'Tickets are sold via Billetto · 150 seats in total',
      /* SOCIAL CHANNELS */
      'social.label': 'Follow me',
      'social.title': 'Follow <em>Maykas Kitchen</em>',
      'social.sub':   'Pick the channel you like best.',
      'social.ig':    'Follow on Instagram',
      'social.aven':  'Also on',
      /* COLLABORATIONS */
      'collab.i1':  'Campaigns',
      'collab.i2':  'Ambassadorships',
      'collab.i3':  'Content production',
      'collab.i4':  'Recipe collaborations',
      'collab.i5':  'Events',
      'collab.i6':  'Long-term partnerships',
      'collab.mgmt':'Management &amp; Partnerships for Maykas Kitchen',
      /* NAV */
      'nav.home':    'Home',
      'nav.recipes': 'Recipes',
      'nav.collab':  'Collaborations',
      'nav.contact': 'Contact',
      'nav.buybook': 'Buy my book →',
      'nav.open':    'Open menu',
      /* HERO */
      'hero.eyebrow': 'SuryoyoFood',
      'hero.w1': 'Food',
      'hero.w2': 'from',
      'hero.w3': 'the heart',
      'hero.w5': 'the soul',
      'hero.sub': 'Seasonal cooking that brings joy to the table for the whole family – with authentic Assyrian/Syriac roots.',
      'hero.btn.recipes':   'Explore recipes',
      'hero.btn.book':      'Buy my book',
      'hero.btn.instagram': 'Follow on Instagram',
      'hero.follow': 'Follow me',
      'hero.scroll': 'Scroll',
      /* RECIPES SECTION */
      'recipes.label': 'Food inspiration',
      'recipes.title': 'Popular recipes',
      'recipes.desc':  'Authentic Assyrian and Syriac dishes combined with modern flavours – simple methods and deep, genuine tastes the whole family will love.',
      'recipes.all':   'See all recipes',
      'recipes.count': '17+ authentic recipes by Mayka',
      /* SHARED RECIPE UI */
      'badge.popular': 'Popular',
      'recipe.view':   'View recipe →',
      /* TAGS */
      'tag.bakverk':       'Pastry',
      'tag.assyriskt':     'Assyrian',
      'tag.traditionellt': 'Traditional',
      'tag.vegetariskt':   'Vegetarian',
      'tag.vegan':         'Vegan',
      'tag.snabb':         'Quick',
      'tag.fisk':          'Fish',
      'tag.under60':       'Under 60 min',
      'tag.kott':          'Meat',
      'tag.syrianskt':     'Syriac',
      'tag.kyckling':      'Chicken',
      'tag.friterat':      'Deep-fried',
      'tag.fredagsmys':    'Friday night',
      'tag.gryta':         'Stew',
      'tag.meze':          'Meze',
      'tag.nyhetsmorgon':  'Morning TV',
      'tag.brod':          'Bread',
      /* RECIPE CARDS */
      'rc1.name':     "Qrimyothe – Grandma's doughnuts 🍩",
      'rc1.desc':     "Mum tells of grandma's love in every bite. More than just a recipe – a piece of history.",
      'rc1.portions': '20 servings',
      'rc2.name':     'Creamiest chickpea tikka masala 🤯🔥',
      'rc2.desc':     'A stew that hugs both heart and taste buds – the creamiest tikka masala you can imagine.',
      'rc2.portions': '4–6 servings',
      'rc3.name':     'Spicy salmon &amp; rice bowl',
      'rc3.desc':     'Perfect as a fresh weekday dinner or when you want to elevate lunch. Quick, easy and flavourful.',
      'rc3.portions': '4 servings',
      'rc4.name':     'Kafta bil sejnie',
      'rc4.desc':     'Traditional Middle Eastern dish with juicy meatballs and potatoes in a rich tomato sauce.',
      'rc4.portions': '5–6 servings',
      'rc5.name':     'Lentil &amp; bulgur patties with sumac 🌿',
      'rc5.desc':     'Protein-rich vegetarian patties with lentils, bulgur and sumac – hearty Middle Eastern flavours.',
      'rc5.portions': '4–6 servings',
      'rc6.name':     'Köfta bil Sanieh 🍅',
      'rc6.desc':     'Syrian oven dish with spiced minced meat, potatoes and padron peppers in a rich tomato sauce.',
      'rc6.portions': '8 servings',
      'rc7.name':     'Fried chicken with BBQ glaze 😍🔥',
      'rc7.desc':     'Crispy fried chicken with a sticky BBQ and ketchup glaze and a quick garlic mayo. The perfect Friday dinner!',
      'rc7.portions': '4 servings',
      'rc8.name':     'Humse Qarhone',
      'rc8.desc':     'Flavourful, protein-rich Assyrian/Syriac chickpea stew with bulgur balls.',
      'rc8.portions': '4 servings',
      'rc9.name':     'Hummus x 3',
      'rc9.desc':     'The base recipe plus two variations – creamy, tangy and delicious.',
      'rc9.portions': '4–6 servings',
      'rc10.name':    'Lahmo do Bayto',
      'rc10.desc':    'The bread of the house – a soft dough baked into golden, fluffy loaves.',
      /* CTA */
      'cta.label':       'Contact &amp; Collaborations',
      'cta.heading':     "Let's create<br>together",
      'cta.sub':         'Cooking, recipes and stories that engage – ready for the next project.',
      'cta.card1.title': 'Collaborations',
      'cta.card1.body':  'Collaborations are handled by J&amp;J Management. We work with, among other things:',
      'cta.card2.title': 'My book',
      'cta.card2.body':  "<em>Mayka's green kitchen – Kutle, hummus and love.</em> A journey through flavour, traditions and love.",
      'cta.card2.btn':   'Buy the book on Bokus →',
      /* FOOTER */
      'footer.tagline':  'Food from the heart &amp; faith in the soul.<br>Assyrian/Syriac roots, always cooked with love.',
      'footer.explore':  'Explore',
      'footer.nl.title': 'Newsletter',
      'footer.nl.p':     'Get new recipes and food inspiration straight to your inbox!',
      'footer.nl.btn':   'Subscribe',
      'footer.copy':     '© 2025 MaykasKitchen. All rights reserved.',
      'footer.made':     'Made with ♥ in Skåne, Sweden',
      /* POPUP */
      'popup.title':      'Food joy<br><em>straight to your inbox</em>',
      'popup.sub':        'New recipes, seasonal inspiration and exclusive offers – free every month.',
      'popup.btn':        'Subscribe for free',
      'popup.success':    '<span>✓</span> Thank you! You are now part of the community 🌿',
      'popup.or':         'or',
      'popup.book.title': 'Buy my book',
      'popup.book.sub':   "Mayka's green kitchen – Kutle, hummus and love",
      /* RECEPT PAGE */
      'back':           'Back',
      'r.loading':      'Loading recipe…',
      'r.notfound.h':   'Recipe not found',
      'r.notfound.p':   'This recipe does not exist.',
      'r.notfound.btn': '← Back to recipes',
      'r.ingredients':  'Ingredients',
      'r.instructions': 'Instructions',
      'r.tips':         'Tips',
      'r.portions':     'servings',
      'r.min':          'min',
    }
  };

  window.MK_LANG = localStorage.getItem('mk-lang') || 'sv';

  window.getT = function (key) {
    return (T[window.MK_LANG] && T[window.MK_LANG][key]) || (T.sv[key]) || key;
  };

  window.applyLang = function (lang) {
    window.MK_LANG = lang;
    localStorage.setItem('mk-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18n];
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18nPh];
      if (val !== undefined) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18nAria];
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'sv' ? 'EN' : 'SV';
    });

    /* Re-render recipe page if present */
    if (typeof window.MK_RENDER === 'function') window.MK_RENDER();
  };

  window.initLangToggle = function () {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = window.MK_LANG === 'sv' ? 'EN' : 'SV';
      btn.addEventListener('click', () => {
        window.applyLang(window.MK_LANG === 'sv' ? 'en' : 'sv');
      });
    });
    if (window.MK_LANG !== 'sv') window.applyLang(window.MK_LANG);
  };
}());
