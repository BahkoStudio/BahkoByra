#!/usr/bin/env python3
"""Grafiklagret för en Bahko-reel: flytande paneler med ALFA, ovanpå full video.

Skillnad mot famous-reel-editor: där delas ramen (grafik i övre bandet, ansiktet i
nedre). Här fyller Mathias video HELA 9:16 hela tiden, och grafiken ligger som ett
genomskinligt lager över honom (Mathias beslut 2026-08-18).

Det ställer tre krav som styr all design här:

  1. ALFA. Duken måste vara genomskinlig och renderas med `--format mov`
     (eller png-sequence). Renderas den som mp4 blir bakgrunden svart och
     täcker videon helt.
  2. LÄSBARHET ÖVER RÖRLIG BILD. Text kan inte ligga naken över video — den
     försvinner så fort något ljust rör sig bakom. Allt innehåll bor därför i
     paneler med egen yta, kant och skugga.
  3. SÄKRA ZONER. Panelerna får inte täcka ansiktet, och inte krocka med
     Instagrams gränssnitt: knappraden längs högerkanten (grovt x>950,
     y 1100-1750) och bildtext/namn nedtill (y>1750).

Kör scripts/brand.py FÖRST (hämtar palett, logga, maskotlager, Outfit och gsap ur
brand.json). Sen:

    cd grafik && python <skill>/scripts/gen.py ../edit/tF/transcripts/cutF.json

Inbyggda varumärkesregler:
  * CTA: smaragdyta med marinblå text. Vit text på smaragd är 2,54:1, underkänt.
  * Typografi: Outfit rakt igenom.
  * Outro: ordmärket logo-dark.svg (VIT text) — logo.svg är marinblå och
    försvinner mot både videon och panelen.
  * Maskoten ligger INTE här. Hon renderas av scripts/maskot.py och läggs på i
    scripts/compose.sh, som styr vilka fönster hon syns i.
"""
from __future__ import annotations
import html, json, re, sys
from pathlib import Path

BA = Path("assets")
if not (BA / "palett.json").exists():
    sys.exit("assets/palett.json saknas — kör scripts/brand.py <grafik_dir> först.")
P = json.loads((BA / "palett.json").read_text())
A, AB = P["A"], P["AB"]
BAS, YTA = P["BAS"], P["YTA"]
TXT, TXT2 = P["TEXT"], P["TEXT2"]
FEL, VARN, OK = P["FEL"], P["VARNING"], P["OK"]
CTA_YTA, CTA_TXT = P["CTA_YTA"], P["CTA_TEXT"]


def rgba(h: str, a: float) -> str:
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return f"rgba({r},{g},{b},{a})"


AD, GL = rgba(A, 0.55), rgba(A, 0.18)
PANEL = rgba(YTA, 0.90)          # tät nog att bära text över rörlig bild
PANEL_KANT = rgba(A, 0.70)

# ---------------- säkra zoner (1080x1920) ----------------
# Grafiken bor i ÖVRE delen: talande huvud framas normalt med ansiktet i mitten
# eller strax under, och nedtill ligger Instagrams bildtext.
ZON_TOP = 210
ZON_H = 700
ZON_X = 60
ZON_B = 1080 - 2 * ZON_X

# ---------------- tidssättning: två lägen ----------------
# ORD-LÄGET fanns först: ett transkript ger ord -> sekund, och varje beat triggas
# på ett ord i talet. Kräver transkribering, alltså en API-nyckel.
#
# SEKUND-LÄGET (Mathias beslut 2026-08-19: han producerar videon själv, ingen VO,
# ingen avatar, ingen transkribering): tiderna sätts för hand och argumentet är
# videons längd i sekunder i stället för en transkriptfil.
#
#     python gen.py 24.5                              sekund-triggers: ("3.5", ...)
#     python gen.py ../edit/tF/transcripts/cutF.json  ord-triggers:    ("hook_ord", ...)
#
# En numerisk trigger tolkas som sekunder i BÅDA lägena.

ARG = sys.argv[1] if len(sys.argv) > 1 else "cut_transcript.json"


def as_sec(v):
    """Sekunder om v är ett tal (både 3.5 och 3,5 går), annars None."""
    try:
        return round(float(str(v).replace(",", ".")), 2)
    except (TypeError, ValueError):
        return None


MANUELL = as_sec(ARG) is not None
if MANUELL:
    WS, TOK, TOTAL = [], [], as_sec(ARG)
    if TOTAL <= 0:
        sys.exit("videons längd måste vara större än 0 sekunder.")
elif Path(ARG).exists():
    d = json.load(open(ARG, encoding="utf-8"))
    WS = [w for w in d["words"] if w.get("type") != "spacing" and w.get("start") is not None]
    TOK, TOTAL = None, round(WS[-1]["end"], 2) + 0.3
else:
    sys.exit(f"'{ARG}' är varken en transkriptfil eller ett antal sekunder.\n"
             f"  utan VO: python gen.py <videons_langd_i_sekunder>\n"
             f"  med VO:  python gen.py <transkript.json>")


def norm(s): return re.sub(r"[^a-zåäöé0-9 ]", "", str(s).lower())


if not MANUELL:
    TOK = [norm(w["text"]) for w in WS]


def find(trig):
    s = as_sec(trig)
    if s is not None:
        if s > TOTAL:
            sys.exit(f"trigger {s}s ligger efter videons slut ({TOTAL}s).")
        return s
    if MANUELL:
        sys.exit(f"trigger '{trig}' är ett ord, men det finns inget transkript att\n"
                 f"  leta i. Sätt sekunder i stället: (\"3.5\", \"graf\", {{...}}).")
    tt = norm(trig).split()
    for i in range(len(TOK) - len(tt) + 1):
        if TOK[i:i + len(tt)] == tt:
            return round(WS[i]["start"], 2)
    for i, t in enumerate(TOK):
        if tt and t == tt[0]:
            return round(WS[i]["start"], 2)
    return 0.0


def find_after(trig, after):
    s = as_sec(trig)
    if s is not None:
        return s if s >= after - 0.01 else after
    if MANUELL:
        sys.exit(f"trigger '{trig}' är ett ord, men det finns inget transkript.")
    tt = norm(trig).split()
    for i in range(len(TOK) - len(tt) + 1):
        if TOK[i:i + len(tt)] == tt and WS[i]["start"] >= after - 0.01:
            return round(WS[i]["start"], 2)
    return after


def esc(s): return html.escape(s)


def eb(e, farg=None):
    if not e:
        return ""
    c = farg or A
    return (f'<div class="eyebrow" style="color:{c}">'
            f'<span class="ebdot" style="background:{c};box-shadow:0 0 14px {c}"></span>{esc(e)}</div>')


def poly(r):
    return ("0,150 110,120 220,132 330,92 440,100 550,50 600,34" if r == "up"
            else "0,34 110,58 220,50 330,92 440,88 550,140 600,152")


# =======================================================================
# BEATS — byt ut mot reelens innehåll. trigger = ordet panelen dyker upp på.
# Panelerna är SAMMANHÄNGANDE: en panel är alltid uppe.
# =======================================================================
BEATS = [
    ("hook_ord",    "hook",       {"eyebrow": "FÖR BYGG & HANTVERK", "kw": "INGEN\nHEMSIDA"}),
    ("problem_ord", "graf",       {"eyebrow": "SÅ SER DET UT IDAG", "dir": "down", "color": FEL}),
    ("lista_ord",   "checklista", {"eyebrow": "DET DU FÅR", "rows": ["Visar era jobb", "Syns på Google", "Klart på en vecka"]}),
    ("bevis_ord",   "kundcase",   {"eyebrow": "RIKTIG KUND", "namn": "Småmåleri", "resultat": "fler förfrågningar varje vecka"}),
    ("stat_ord",    "statgraf",   {"eyebrow": "LEVERANSTID", "count": 7, "suffix": "", "unit": "DAGAR", "dir": "up"}),
    ("cta_ord",     "cta",        {"eyebrow": "NÄSTA STEG", "kw": "GRATIS FÖRSLAG", "knapp": "SKRIV \"HEMSIDA\""}),
    ("outro_ord",   "outro",      {"webb": "bahkobyra.se"}),
]

starts = [find(t) for t, _, _ in BEATS]
ends = [starts[i + 1] for i in range(len(starts) - 1)] + [TOTAL]

for i, (trig, _, _) in enumerate(BEATS):
    if starts[i] == 0.0 and i > 0:
        sys.exit(f"beat {i} ('{trig}') hittade inte sitt trigger-ord — rätta triggern.")
    if i and starts[i] <= starts[i - 1]:
        sys.exit(f"beat {i} ('{trig}') ligger före eller på beat {i-1}.")

# TEMPO: en panel under ~1,4s hinner inte läsas (Mathias 2026-08-18: "det går för
# fort, man hinner inte med"). Färre paneler som hinns med slår fler som blinkar.
MIN_BEAT = 1.4
korta = [(i, BEATS[i][0], ends[i] - starts[i]) for i in range(len(BEATS))
         if ends[i] - starts[i] < MIN_BEAT]
if korta:
    print(f"VARNING: {len(korta)} av {len(BEATS)} paneler är kortare än {MIN_BEAT}s:")
    for i, trig, dd in korta:
        print(f"  beat {i} '{trig}': {dd:.2f}s")
    print("  Slå ihop dem eller stryk en panel. Sikta 3-5s per panel.")


def inner(i, t, p):
    if t == "hook":
        rader = "".join(f'<span class="hl" id="h{i}r{j}">{esc(r)}</span>'
                        for j, r in enumerate(p["kw"].split("\n")))
        return f'{eb(p["eyebrow"])}<div class="kw">{rader}</div>'
    if t == "graf":
        return (f'{eb(p["eyebrow"], p.get("color"))}<svg class="sparkbig" viewBox="0 0 600 170" '
                f'preserveAspectRatio="none"><polyline id="sp{i}" points="{poly(p["dir"])}" '
                f'style="stroke:{p.get("color", A)}"/></svg>')
    if t == "statgraf":
        return (f'{eb(p["eyebrow"])}<div class="statrow"><div class="big" id="big{i}">0</div>'
                f'<div class="unit">{esc(p["unit"])}</div></div>'
                f'<svg class="spark" viewBox="0 0 600 150" preserveAspectRatio="none">'
                f'<polyline id="sp{i}" points="{poly(p["dir"])}" style="stroke:{A}"/></svg>')
    if t == "checklista":
        rows = "".join(f'<div class="lrow" id="b{i}l{j}"><span class="lck">✓</span>'
                       f'<span class="lt">{esc(x)}</span></div>' for j, x in enumerate(p["rows"]))
        return f'{eb(p["eyebrow"])}<div class="lc">{rows}</div>'
    if t == "kundcase":
        return (f'{eb(p["eyebrow"])}<div class="csnamn" id="cs{i}">{esc(p["namn"])}</div>'
                f'<div class="csres">{esc(p["resultat"])}</div>'
                f'<svg class="spark" viewBox="0 0 600 150" preserveAspectRatio="none">'
                f'<polyline id="sp{i}" points="{poly("up")}" style="stroke:{OK}"/></svg>')
    if t == "cta":
        return (f'{eb(p["eyebrow"])}<div class="kw"><span class="hl" id="c{i}k">{esc(p["kw"])}</span></div>'
                f'<div class="knapp" id="c{i}b">{esc(p["knapp"])}</div>')
    if t == "outro":
        # Outron får dimma videon: den är slutbilden, inte ett inslag över talet.
        tag = p.get("tagline", "")
        tagrad = f'<div class="tagline" id="tg{i}">{esc(tag)}</div>' if tag else ""
        return (f'<div class="lockup"><img src="assets/logo-dark.svg" class="ordmarke" id="lm{i}"/>'
                f'{tagrad}<div class="webb" id="wb{i}">{esc(p.get("webb", "bahkobyra.se"))}</div></div>')
    return ""


clips, tw = [], []
for i, ((trig, t, p), s, e) in enumerate(zip(BEATS, starts, ends)):
    dur = max(0.6, e - s)
    # Outron är helskärm med dimmer; övriga är paneler i den säkra zonen.
    wrap = "helskarm" if t == "outro" else "panel"
    clips.append(f'<div class="beat" id="beat{i}" data-start="{s}" data-duration="{dur:.2f}" '
                 f'data-track-index="{i+1}"><div class="{wrap} {t}" id="in{i}">{inner(i, t, p)}</div></div>')
    js = [f'tl.fromTo("#beat{i}",{{opacity:0,y:26,scale:0.98}},{{opacity:1,y:0,scale:1,duration:0.24,ease:"power3.out"}},{s:.2f});']
    if t == "hook":
        for j in range(len(p["kw"].split("\n"))):
            js.append(f'tl.fromTo("#h{i}r{j}",{{opacity:0,y:40}},{{opacity:1,y:0,duration:0.34,ease:"power3.out"}},{s+0.12+j*0.16:.2f});')
    if t in ("graf", "kundcase", "statgraf"):
        js.append(f'tl.fromTo("#sp{i}",{{attr:{{"stroke-dashoffset":760}}}},{{attr:{{"stroke-dashoffset":0}},duration:1.1,ease:"power2.out"}},{s+0.18:.2f});')
    if t == "kundcase":
        js.append(f'tl.fromTo("#cs{i}",{{opacity:0,x:-30}},{{opacity:1,x:0,duration:0.3,ease:"back.out(1.7)"}},{s+0.12:.2f});')
    if t == "statgraf":
        if dur < 1.2:
            js.append(f'tl.fromTo("#big{i}",{{opacity:0,scale:1.5}},{{opacity:1,scale:1,duration:0.3,ease:"back.out(2)",'
                      f'onStart:function(){{document.getElementById("big{i}").textContent="{p["count"]}{p.get("suffix","")}";}}}},{s+0.15:.2f});')
        else:
            js.append(f'tl.to({{v:0}},{{v:{p["count"]},duration:0.9,ease:"power2.out",onUpdate:function(){{'
                      f'document.getElementById("big{i}").textContent=Math.round(this.targets()[0].v)+"{p.get("suffix","")}";}}}},{s+0.15:.2f});')
    if t == "checklista":
        n = len(p["rows"])
        lucka = min(0.42, max(0.16, (dur * 0.55) / max(1, n)))
        for j in range(n):
            js.append(f'tl.fromTo("#b{i}l{j}",{{opacity:0,x:-44}},{{opacity:1,x:0,duration:0.26,ease:"back.out(1.8)"}},{s+0.16+j*lucka:.2f});')
    if t == "cta":
        js.append(f'tl.fromTo("#c{i}k",{{opacity:0,y:28}},{{opacity:1,y:0,duration:0.3,ease:"power3.out"}},{s+0.12:.2f});')
        js.append(f'tl.fromTo("#c{i}b",{{opacity:0,scale:0.86}},{{opacity:1,scale:1,duration:0.32,ease:"back.out(2)"}},{max(s+0.5, e-1.4):.2f});')
    if t == "outro":
        js.append(f'tl.fromTo("#lm{i}",{{opacity:0,y:32,scale:0.94}},{{opacity:1,y:0,scale:1,duration:0.44,ease:"back.out(1.6)"}},{s+0.12:.2f});')
        if p.get("tagline"):
            js.append(f'tl.fromTo("#tg{i}",{{opacity:0,y:18}},{{opacity:1,y:0,duration:0.3,ease:"power3.out"}},{s+0.42:.2f});')
        js.append(f'tl.fromTo("#wb{i}",{{opacity:0}},{{opacity:1,duration:0.3}},{s+0.62:.2f});')
    if t != "outro":
        js.append(f'tl.to("#beat{i}",{{opacity:0,duration:0.16,ease:"power2.in"}},{e-0.16:.2f});')
    tw.append("\n      ".join(js))

HTML = f'''<!doctype html><html lang="sv"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=1080, height=1920"/>
<script src="assets/gsap.min.js"></script>
<script>if(!window.gsap){{document.write('<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"><\\/script>');}}</script>
<style>
@font-face{{font-family:"Outfit";src:url("assets/Outfit[wght].ttf") format("truetype-variations");font-weight:100 900;font-display:block}}
*{{margin:0;padding:0;box-sizing:border-box}}
/* GENOMSKINLIG duk: videon ligger under i compose. Sätts detta till en färg
   täcker grafiklagret hela bilden och hela poängen faller. */
html,body{{width:1080px;height:1920px;overflow:hidden;background:transparent;font-family:"Outfit",system-ui,sans-serif}}
#root{{position:relative;width:1080px;height:1920px;background:transparent}}
.beat{{position:absolute;top:0;left:0;width:1080px;height:1920px}}
/* Panel: egen yta, kant och skugga — text kan inte ligga naken över rörlig bild. */
.panel{{position:absolute;top:{ZON_TOP}px;left:{ZON_X}px;width:{ZON_B}px;
  min-height:200px;max-height:{ZON_H}px;display:flex;flex-direction:column;justify-content:center;gap:22px;
  background:{PANEL};border:2px solid {PANEL_KANT};border-radius:30px;padding:44px 46px;
  box-shadow:0 26px 70px rgba(0,0,0,0.55), 0 0 50px {GL};backdrop-filter:blur(3px)}}
.helskarm{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  background:{rgba(BAS,0.88)}}}
.eyebrow{{font-size:29px;font-weight:800;letter-spacing:6px;text-transform:uppercase;display:flex;align-items:center;gap:13px}}
.ebdot{{width:13px;height:13px;border-radius:50%}}
.kw{{color:{TXT};font-size:96px;font-weight:900;line-height:0.99;letter-spacing:-1px;display:flex;flex-direction:column}}
.hl{{display:block}}
.statrow{{display:flex;align-items:flex-end;gap:24px}}
.big{{color:{TXT};font-size:172px;font-weight:900;line-height:0.85;letter-spacing:-3px}}
.unit{{color:{A};font-size:34px;font-weight:900;text-transform:uppercase;line-height:1.1;padding-bottom:16px}}
.spark{{width:100%;height:170px}} .sparkbig{{width:100%;height:280px}}
.spark polyline,.sparkbig polyline{{fill:none;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:760;filter:drop-shadow(0 0 12px currentColor)}}
.lc{{display:flex;flex-direction:column;gap:15px}}
.lrow{{display:flex;align-items:center;gap:19px;background:{rgba(BAS,0.55)};border:1px solid {AD};border-radius:17px;padding:23px 28px}}
.lck{{color:{A};font-size:38px;font-weight:900}} .lt{{color:{TXT};font-size:38px;font-weight:800}}
.csnamn{{color:{TXT};font-size:60px;font-weight:900;letter-spacing:-1px}}
.csres{{color:{TXT2};font-size:32px;font-weight:600}}
/* CTA-regeln: smaragdyta + marinblå text. ALDRIG vit text på smaragd. */
.knapp{{align-self:flex-start;background:{CTA_YTA};color:{CTA_TXT};font-size:48px;font-weight:900;
  letter-spacing:1px;padding:22px 40px;border-radius:19px;box-shadow:0 0 40px {rgba(A,0.5)}}}
.lockup{{display:flex;flex-direction:column;align-items:center;gap:26px;text-align:center}}
.ordmarke{{width:780px;height:auto;filter:drop-shadow(0 0 26px {rgba(A,0.45)})}}
.tagline{{color:{A};font-size:38px;font-weight:700;letter-spacing:8px;text-transform:uppercase}}
.webb{{color:{TXT2};font-size:33px;font-weight:600;letter-spacing:3px}}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL:.2f}" data-width="1080" data-height="1920">
  {"".join(clips)}
</div>
<script>
if(!window.gsap){{throw new Error("gsap laddades inte - grafiken skulle renderats helt utan animation");}}
window.__timelines=window.__timelines||{{}};const tl=gsap.timeline({{paused:true}});
      {chr(10).join(tw)}
window.__timelines["main"]=tl;</script></body></html>'''

Path("index.html").write_text(HTML, encoding="utf-8")
Path("beats.json").write_text(json.dumps(
    [{"start": starts[i], "slut": ends[i], "typ": BEATS[i][1], "trigger": BEATS[i][0]}
     for i in range(len(BEATS))], indent=1, ensure_ascii=False), encoding="utf-8")

print(f"gen: {len(BEATS)} paneler, {TOTAL:.2f}s  (beats.json skriven)")
print(f"  RENDERA MED ALFA: npx hyperframes render . --format mov -o grafik.mov")
print(f"  mp4 ger svart bakgrund som täcker videon.")
print(f"  panelzon: y {ZON_TOP}-{ZON_TOP+ZON_H}, x {ZON_X}-{ZON_X+ZON_B}")
for i, ((trig, t, p), s, e) in enumerate(zip(BEATS, starts, ends)):
    flagga = "  <-- för kort" if e - s < MIN_BEAT else ""
    print(f"  {s:6.2f}-{e:6.2f} ({e-s:4.2f}s) {t:11s} {trig}{flagga}")
