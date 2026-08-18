/* ===========================================================
   MUGGLAGRET — demo av Bahko Byrå
   Delad data + beteende för index / katalog / produkt
   =========================================================== */
(function () {
  "use strict";

  /* ---------- kundens sju färgval (Ceramic-serien) ---------- */
  var COLORS = [
    { id: "white",  name: "Ceramic White",  hex: "#FFFFFF" },
    { id: "yellow", name: "Ceramic Yellow", hex: "#F0C244" },
    { id: "pink",   name: "Ceramic Pink",   hex: "#E895AF" },
    { id: "green",  name: "Ceramic Green",  hex: "#4E8C5B" },
    { id: "red",    name: "Ceramic Red",    hex: "#BE3B2E" },
    { id: "black",  name: "Ceramic Black",  hex: "#1C1C1C" },
    { id: "blue",   name: "Ceramic Blue",   hex: "#2E6DB4" }
  ];

  var CATS = {
    katter: "Katter",
    djur:   "Djur",
    fjaril: "Fjäril",
    karlek: "Kärlek & vänskap",
    retro:  "Retro",
    stader: "Världens städer",
    texter: "Texter & bilder"
  };

  /* ---------- sortimentet (kundens egna produkter) ---------- */
  var P = [
    ["katter-1.jpg", "Kärleksfull Kisse",      "katter", 1],
    ["katter-2.jpg", "Katter & Pappersblommor","katter", 1],
    ["katter-3.jpg", "Kattmugg i Pastell",     "katter", 0],
    ["katter-4.jpg", "Söt Kattunge",           "katter", 0],
    ["katter-5.jpg", "Quilling Kattmugg",      "katter", 1],
    ["katter-6.jpg", "Kattunge i Pastell",     "katter", 0],
    ["katter-7.jpg", "Söt Katt i Pastell",     "katter", 0],
    ["katter-8.jpg", "Magiska Blå Ögon",       "katter", 0],
    ["djur-1.jpg",   "Kattunge i Rosa Hjärta", "djur",   0],
    ["djur-2.jpg",   "Katt Bland Blommor",     "djur",   0],
    ["djur-3.jpg",   "Katt & Blommor",         "djur",   0],
    ["djur-4.jpg",   "Kattunge i Sju Färger",  "djur",   0],
    ["djur-5.jpg",   "Lekfull Kattunge",       "djur",   0],
    ["djur-6.jpg",   "Kattungehjärta",         "djur",   0],
    ["fjaril-1.jpg", "Fjärilsdröm i Rosa",     "fjaril", 1],
    ["fjaril-2.jpg", "Fjärilsdröm",            "fjaril", 0],
    ["fjaril-3.jpg", "Mjuk Blomsterpastell",   "fjaril", 0],
    ["fjaril-4.jpg", "Abstrakt Fjäril",        "fjaril", 0],
    ["karlek-1.jpg", "Snömonster",             "karlek", 0],
    ["karlek-2.jpg", "Chibi Knight",           "karlek", 1],
    ["karlek-3.jpg", "Spöke & Äpple",          "karlek", 0],
    ["karlek-4.jpg", "Kawaii-spöke",           "karlek", 0],
    ["karlek-5.jpg", "Ismagikern",             "karlek", 0],
    ["karlek-6.jpg", "Kawaii Vattenvarelse",   "karlek", 0],
    ["retro-1.jpg",  "Retro Car i Akvarell",   "retro",  1],
    ["retro-2.jpg",  "Retro Lykta",            "retro",  0],
    ["retro-3.jpg",  "50-tals Cruiser",        "retro",  0],
    ["retro-4.jpg",  "Abstrakt Sol",           "retro",  0],
    ["retro-5.jpg",  "Japansk Soluppgång",     "retro",  0],
    ["retro-6.jpg",  "Gaming i Akvarell",      "retro",  0],
    ["stader-1.jpg", "I Love Malmö",           "stader", 0],
    ["stader-2.jpg", "I Love Borås",           "stader", 0],
    ["texter-1.jpg", "Bokälskarens Bästa Vän", "texter", 0],
    ["texter-2.jpg", "Mysig Biblioteksmugg",   "texter", 0],
    ["texter-3.jpg", "Bibliotekshunden",       "texter", 0],
    ["texter-4.jpg", "Valp på Biblioteket",    "texter", 0],
    ["texter-5.jpg", "Valp på Bokhyllan",      "texter", 1],
    ["texter-6.jpg", "Valpar & Böcker",        "texter", 0]
  ].map(function (r, i) {
    return { id: i + 1, img: "media/" + r[0], title: r[1], cat: r[2], isNew: !!r[3], price: 136 };
  });

  var PRICE = "136 kr";

  /* ---------- hjälpare ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function swatchRow(n) {
    return COLORS.slice(0, n || COLORS.length).map(function (c) {
      return '<i style="background:' + c.hex + '"></i>';
    }).join("");
  }

  function cardHTML(p, i) {
    /* De första korten i en grid ligger ofta redan i vyn — lazy där ger
       synlig pop-in. Ladda dem direkt. */
    var lazy = i != null && i < 4 ? "" : ' loading="lazy"';
    return '' +
      '<a class="pcard rv" href="produkt.html?p=' + p.id + '">' +
        '<div class="pcard-img">' +
          (p.isNew ? '<span class="pcard-tag pcard-tag--new">Nyhet</span>' : '') +
          '<img src="' + p.img + '" alt="' + esc(p.title) + ' – keramikmugg 11 oz"' + lazy + ' width="494" height="592">' +
          '<span class="pcard-quick">Välj färg</span>' +
        '</div>' +
        '<div class="pcard-body">' +
          '<span class="pcard-cat">' + esc(CATS[p.cat]) + '</span>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<div class="pcard-price"><b>' + PRICE + '</b><span>11 oz keramik</span></div>' +
          '<div class="pcard-swatches">' + swatchRow(7) + '</div>' +
        '</div>' +
      '</a>';
  }

  /* ---------- scroll-reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ---------- header / mobilmeny ---------- */
  function initNav() {
    var burger = document.getElementById("burger");
    var mnav = document.getElementById("mnav");
    if (!burger || !mnav) return;
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    Array.prototype.forEach.call(mnav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        mnav.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Bahko-modal ---------- */
  function initModal() {
    var bg = document.getElementById("modal");
    var floatBtn = document.getElementById("float-demo");
    if (!bg) return;

    window.openModal = function () {
      bg.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    window.closeModal = function () {
      bg.classList.remove("open");
      document.body.style.overflow = "";
    };
    bg.addEventListener("click", function (e) { if (e.target === bg) window.closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && bg.classList.contains("open")) window.closeModal();
    });
    if (floatBtn) {
      var onScroll = function () {
        floatBtn.classList.toggle("visible", window.scrollY > window.innerHeight * 0.55);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ===========================================================
     VARUKORG — riktig, med localStorage. Gör demon till en butik
     som går att prova, inte bara titta på.
     =========================================================== */
  var CART_KEY = "mugglagret_demo_cart_v1";

  function cartRead() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch (e) { return []; }
  }
  function cartWrite(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* privat läge */ }
  }
  function cartCount(items) {
    return items.reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function cartSum(items) {
    return items.reduce(function (n, i) { return n + i.qty * i.price; }, 0);
  }
  function hexFor(colorId) {
    var c = COLORS.filter(function (x) { return x.id === colorId; })[0];
    return c ? c.hex : "#FFFFFF";
  }

  function initCart() {
    var drawer = document.createElement("div");
    drawer.className = "drawer-bg";
    drawer.id = "cart-drawer";
    drawer.innerHTML = '' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-label="Varukorg">' +
        '<div class="drawer-top">' +
          '<b>Varukorg</b>' +
          '<button class="drawer-x" data-cart-close aria-label="Stäng varukorgen">✕</button>' +
        '</div>' +
        '<div class="drawer-body" id="cart-body"></div>' +
        '<div class="drawer-foot" id="cart-foot"></div>' +
      '</aside>';
    document.body.appendChild(drawer);

    var body = drawer.querySelector("#cart-body");
    var foot = drawer.querySelector("#cart-foot");

    function paint() {
      var items = cartRead();

      Array.prototype.forEach.call(document.querySelectorAll(".cart-dot"), function (d) {
        var n = cartCount(items);
        d.textContent = n;
        d.classList.toggle("is-empty", n === 0);
      });

      if (!items.length) {
        body.innerHTML = '' +
          '<div class="cart-empty">' +
            '<p>Varukorgen är tom.</p>' +
            '<a class="btn btn--ghost" href="katalog.html">Se alla muggar</a>' +
          '</div>';
        foot.innerHTML = '';
        return;
      }

      body.innerHTML = items.map(function (i, idx) {
        return '' +
          '<div class="cart-row">' +
            '<img src="' + i.img + '" alt="" width="80" height="96">' +
            '<div class="cart-row-mid">' +
              '<b>' + esc(i.title) + '</b>' +
              '<span class="cart-row-var"><i style="background:' + hexFor(i.color) + '"></i>' + esc(i.colorName) + '</span>' +
              '<div class="cart-qty">' +
                '<button data-cart-dec="' + idx + '" aria-label="Minska antal">−</button>' +
                '<span>' + i.qty + '</span>' +
                '<button data-cart-inc="' + idx + '" aria-label="Öka antal">+</button>' +
              '</div>' +
            '</div>' +
            '<div class="cart-row-end">' +
              '<b>' + (i.qty * i.price) + ' kr</b>' +
              '<button data-cart-del="' + idx + '">Ta bort</button>' +
            '</div>' +
          '</div>';
      }).join("");

      foot.innerHTML = '' +
        '<div class="cart-sum"><span>Summa</span><b>' + cartSum(items) + ' kr</b></div>' +
        '<p class="cart-note">Frakt räknas i kassan. Leverans 3–6 dagar med spårbar frakt.</p>' +
        '<button class="btn btn--block" data-demo="Kassan kopplas på i den färdiga sajten.">Till kassan</button>' +
        '<button class="cart-cont" data-cart-close>Fortsätt handla</button>';
    }

    function open() {
      paint();
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      drawer.classList.remove("open");
      document.body.style.overflow = "";
    }

    window.mugCartOpen = open;
    window.mugCartAdd = function (item) {
      var items = cartRead();
      var hit = items.filter(function (i) { return i.id === item.id && i.color === item.color; })[0];
      if (hit) hit.qty = Math.min(99, hit.qty + item.qty);
      else items.push(item);
      cartWrite(items);
      open();
    };

    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) { close(); return; }
      var t = e.target.closest("[data-cart-close],[data-cart-inc],[data-cart-dec],[data-cart-del]");
      if (!t) return;
      if (t.hasAttribute("data-cart-close")) { close(); return; }
      var items = cartRead();
      var idx = parseInt(t.getAttribute("data-cart-inc") || t.getAttribute("data-cart-dec") || t.getAttribute("data-cart-del"), 10);
      if (isNaN(idx) || !items[idx]) return;
      if (t.hasAttribute("data-cart-inc")) items[idx].qty = Math.min(99, items[idx].qty + 1);
      else if (t.hasAttribute("data-cart-dec")) {
        items[idx].qty -= 1;
        if (items[idx].qty < 1) items.splice(idx, 1);
      } else items.splice(idx, 1);
      cartWrite(items);
      paint();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) close();
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-cart-open]"), function (b) {
      b.addEventListener("click", function () { open(); });
    });

    paint();
  }

  /* ---------- demo-knappar utan bakomliggande butik ---------- */
  function initDemoActions() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-demo]");
      if (!t) return;
      e.preventDefault();
      var bar = document.getElementById("demo-toast");
      if (!bar) return;
      bar.textContent = t.getAttribute("data-demo");
      bar.classList.remove("hide");
      clearTimeout(bar._t);
      bar._t = setTimeout(function () { bar.classList.add("hide"); }, 2600);
    });
  }

  /* ===========================================================
     BRÅDSKAN — dagens packningsdeadline, ett räkneverk för hela sajten.
     Mekaniken är äkta: klockan 14:00 är gränsen, efter det gäller nästa
     arbetsdag. Alla platser som visar tiden läser samma källa.
     =========================================================== */
  var CUTOFF_HOUR = 14;

  function tidTillCutoff() {
    var nu = new Date();
    var mal = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate(), CUTOFF_HOUR, 0, 0, 0);
    var passerad = nu >= mal;
    if (passerad) mal.setDate(mal.getDate() + 1);
    /* Helg: nästa packning sker på måndagen */
    while (mal.getDay() === 0 || mal.getDay() === 6) mal.setDate(mal.getDate() + 1);
    var kvar = Math.max(0, mal - nu);
    var h = Math.floor(kvar / 3600000);
    var m = Math.floor((kvar % 3600000) / 60000);
    var s = Math.floor((kvar % 60000) / 1000);
    return {
      passerad: passerad,
      text: h > 0 ? h + " h " + m + " min" : m + " min " + (s < 10 ? "0" : "") + s + " s"
    };
  }

  function initCutoff() {
    var mal = document.querySelectorAll("[data-cutoff]");
    if (!mal.length) return;
    function tick() {
      var t = tidTillCutoff();
      Array.prototype.forEach.call(mal, function (el) { el.textContent = t.text; });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- rullande budskap i toppremsan ---------- */
  function initRoll() {
    var roll = document.getElementById("announce-roll");
    if (!roll) return;
    var items = roll.querySelectorAll("span");
    if (items.length < 2) return;
    var i = 0;
    setInterval(function () {
      items[i].classList.remove("is-on");
      i = (i + 1) % items.length;
      items[i].classList.add("is-on");
    }, 3600);
  }

  /* ---------- headern: mega-meny + krympläge ---------- */
  function initHeader() {
    var hdr = document.getElementById("hdr");
    if (hdr) {
      var onScroll = function () {
        hdr.classList.toggle("is-tight", window.scrollY > 40);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    var drop = document.querySelector("[data-drop]");
    if (!drop) return;
    var trigger = drop.querySelector(".nav-trigger");
    var stang = null;

    function satt(open) {
      drop.classList.toggle("open", open);
      if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    /* Klick styr på pekskärm och tangentbord, hover på mus. Fördröjd
       stängning så menyn inte försvinner när pekaren korsar mellanrummet. */
    if (trigger) {
      trigger.addEventListener("click", function () { satt(!drop.classList.contains("open")); });
    }
    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      drop.addEventListener("mouseenter", function () { clearTimeout(stang); satt(true); });
      drop.addEventListener("mouseleave", function () {
        stang = setTimeout(function () { satt(false); }, 180);
      });
    }
    document.addEventListener("click", function (e) {
      if (!drop.contains(e.target)) satt(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") satt(false);
    });
  }

  /* ---------- klisterremsan: pris och deadline följer med nedåt ---------- */
  function initStickybar() {
    var bar = document.getElementById("stickybar");
    if (!bar) return;
    var floatBtn = document.getElementById("float-demo");
    var onScroll = function () {
      var visa = window.scrollY > window.innerHeight * 0.9;
      bar.classList.toggle("visible", visa);
      /* Bahko-knappen flyttas upp så den inte hamnar under remsan */
      if (floatBtn) floatBtn.classList.toggle("lyft", visa);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- startsidans produktgrid ---------- */
  function initHome() {
    var grid = document.getElementById("home-grid");
    if (grid) {
      var picks = [1, 15, 25, 20, 5, 31, 35, 27, 2, 22, 29, 33];
      grid.innerHTML = picks.map(function (id, i) {
        var p = P.filter(function (x) { return x.id === id; })[0];
        return p ? cardHTML(p, i) : "";
      }).join("");
    }

    /* Nytt denna vecka — samma mönster som de stora butikerna: färska släpp
       högt upp på sidan, så sortimentet känns levande vid varje besök. */
    var nytt = document.getElementById("nytt-grid");
    if (nytt) {
      var nya = P.filter(function (p) { return p.isNew; }).slice(0, 4);
      nytt.innerHTML = nya.map(function (p, i) { return cardHTML(p, i); }).join("");
    }
  }

  /* ---------- katalogsidan ---------- */
  function initShop() {
    var grid = document.getElementById("shop-grid");
    if (!grid) return;

    var state = { cat: "alla", color: null, sort: "senast" };

    var params = new URLSearchParams(location.search);
    if (params.get("kategori") && CATS[params.get("kategori")]) state.cat = params.get("kategori");

    var countEl = document.getElementById("shop-count");
    var titleEl = document.getElementById("shop-title");
    var leadEl = document.getElementById("shop-lead");
    var crumbEl = document.getElementById("shop-crumb");

    var LEADS = {
      alla:   "Hela sortimentet av tryckta keramikmuggar, 11 oz. Sju färgval på handtag och insida — samma pris oavsett motiv.",
      katter: "Kattmotiv i pastell, papperskonst och akvarell. Vår mest efterfrågade motivfamilj.",
      djur:   "Djurmotiv för dig som vill ha lite liv i morgonkaffet.",
      fjaril: "Fjärilar och blomster i mjuka toner — lugna motiv som passar de flesta hem.",
      karlek: "Motiv att ge bort. Kawaii, figurer och lekfulla teman för present och vänskap.",
      retro:  "Bilar, lyktor och soluppgångar i akvarell. Retro utan att bli museum.",
      stader: "Muggar för hemstaden. Ett motiv per ort, tryckt på beställning.",
      texter: "Böcker, texter och blandade motiv för läshörnan och kontoret."
    };

    function render() {
      var list = P.filter(function (p) { return state.cat === "alla" || p.cat === state.cat; });

      if (state.sort === "namn") {
        list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title, "sv"); });
      } else if (state.sort === "nyheter") {
        list = list.slice().sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.id - b.id; });
      }

      grid.innerHTML = list.length
        ? list.map(cardHTML).join("")
        : '<p class="empty">Inga muggar matchar filtret just nu.</p>';

      countEl.innerHTML = "Visar <b>" + list.length + "</b> av " + P.length + " muggar i demon";
      titleEl.textContent = state.cat === "alla" ? "Alla muggar" : CATS[state.cat];
      leadEl.textContent = LEADS[state.cat];
      crumbEl.textContent = state.cat === "alla" ? "Alla muggar" : CATS[state.cat];

      Array.prototype.forEach.call(document.querySelectorAll("[data-cat]"), function (b) {
        b.classList.toggle("is-on", b.getAttribute("data-cat") === state.cat);
      });
      initReveal();
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-cat]"), function (b) {
      b.addEventListener("click", function () { state.cat = b.getAttribute("data-cat"); render(); });
    });

    var colorWrap = document.getElementById("filter-colors");
    if (colorWrap) {
      colorWrap.innerHTML = COLORS.map(function (c) {
        return '<button class="fcolor" data-color="' + c.id + '" style="background:' + c.hex +
               '" title="' + c.name + '" aria-label="' + c.name + '"></button>';
      }).join("");
      var colorNote = document.getElementById("filter-color-note");
      colorWrap.addEventListener("click", function (e) {
        var b = e.target.closest(".fcolor");
        if (!b) return;
        var id = b.getAttribute("data-color");
        state.color = state.color === id ? null : id;
        Array.prototype.forEach.call(colorWrap.children, function (el) {
          el.classList.toggle("is-on", el.getAttribute("data-color") === state.color);
        });
        if (colorNote) {
          var c = COLORS.filter(function (x) { return x.id === state.color; })[0];
          colorNote.textContent = c
            ? "Visar alla motiv i " + c.name + "."
            : "Alla motiv finns i samtliga sju färger.";
        }
      });
    }

    var sortEl = document.getElementById("shop-sort");
    if (sortEl) sortEl.addEventListener("change", function () { state.sort = sortEl.value; render(); });

    var fToggle = document.getElementById("filter-toggle");
    if (fToggle) {
      fToggle.addEventListener("click", function () {
        document.getElementById("filters").classList.toggle("open");
      });
    }

    render();
  }

  /* ---------- produktsidan ---------- */
  function initPDP() {
    var root = document.getElementById("pdp");
    if (!root) return;

    var id = parseInt(new URLSearchParams(location.search).get("p"), 10);
    var p = P.filter(function (x) { return x.id === id; })[0] || P[0];

    document.title = p.title + " – Mugglagret";
    document.getElementById("pdp-title").textContent = p.title;
    document.getElementById("pdp-cat").textContent = CATS[p.cat];
    document.getElementById("pdp-crumb-cat").textContent = CATS[p.cat];
    document.getElementById("pdp-crumb-cat").href = "katalog.html?kategori=" + p.cat;
    document.getElementById("pdp-crumb-name").textContent = p.title;

    /* bildgalleri: produktens egen bild + tre grannar ur samma kategori */
    var siblings = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
    var shots = [p].concat(siblings);
    var mainImg = document.getElementById("pdp-main-img");
    var thumbs = document.getElementById("pdp-thumbs");

    mainImg.src = p.img;
    mainImg.alt = p.title + " – keramikmugg 11 oz";
    thumbs.innerHTML = shots.map(function (s, i) {
      return '<button class="pdp-thumb' + (i === 0 ? " is-on" : "") + '" data-src="' + s.img +
             '" aria-label="Visa bild ' + (i + 1) + '"><img src="' + s.img + '" alt="" loading="lazy"></button>';
    }).join("");
    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest(".pdp-thumb");
      if (!b) return;
      mainImg.src = b.getAttribute("data-src");
      Array.prototype.forEach.call(thumbs.children, function (el) { el.classList.remove("is-on"); });
      b.classList.add("is-on");
    });

    /* färgval */
    var picked = COLORS[0];
    var colorWrap = document.getElementById("pdp-colors");
    var colorName = document.getElementById("pdp-color-name");
    colorWrap.innerHTML = COLORS.map(function (c, i) {
      return '<button class="color' + (i === 0 ? " is-on" : "") + '" data-id="' + c.id +
             '" style="background:' + c.hex + '" title="' + c.name + '" aria-label="' + c.name + '"></button>';
    }).join("");
    colorName.textContent = picked.name;
    colorWrap.addEventListener("click", function (e) {
      var b = e.target.closest(".color");
      if (!b) return;
      picked = COLORS.filter(function (c) { return c.id === b.getAttribute("data-id"); })[0];
      colorName.textContent = picked.name;
      Array.prototype.forEach.call(colorWrap.children, function (el) { el.classList.remove("is-on"); });
      b.classList.add("is-on");
    });

    /* antal */
    var qty = 1;
    var qtyEl = document.getElementById("pdp-qty");
    document.getElementById("qty-minus").addEventListener("click", function () {
      qty = Math.max(1, qty - 1); qtyEl.textContent = qty;
    });
    document.getElementById("qty-plus").addEventListener("click", function () {
      qty = Math.min(99, qty + 1); qtyEl.textContent = qty;
    });

    /* lägg i varukorgen */
    var addBtn = document.getElementById("pdp-add");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        window.mugCartAdd({
          id: p.id, title: p.title, img: p.img, price: p.price,
          color: picked.id, colorName: picked.name, qty: qty
        });
      });
    }

    /* dragspel */
    document.addEventListener("click", function (e) {
      var h = e.target.closest(".acc-head");
      if (!h) return;
      var item = h.parentElement;
      var open = item.classList.toggle("open");
      h.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* relaterat */
    var rel = document.getElementById("pdp-related");
    if (rel) {
      var more = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; });
      if (more.length < 4) {
        more = more.concat(P.filter(function (x) { return x.cat !== p.cat && x.id !== p.id; }));
      }
      rel.innerHTML = more.slice(0, 4).map(cardHTML).join("");
    }
  }

  /* ---------- start ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHeader();
    initCutoff();
    initRoll();
    initStickybar();
    initModal();
    initCart();
    initDemoActions();
    initHome();
    initShop();
    initPDP();
    initReveal();
  });
})();
