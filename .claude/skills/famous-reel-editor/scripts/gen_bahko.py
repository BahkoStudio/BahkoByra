#!/usr/bin/env python3
"""Bahko-generator: kortlagret (övre bandet) i BahkoByrås varumärke.

Kör bahko_assets.py FÖRST (den hämtar palett, märke, maskotlager och Outfit ur
brand.json-källan till cards/assets/bahko/). Sen:

    cd cards && python <skill>/scripts/gen_bahko.py ../edit/tF/transcripts/cutF.json

Varumärkesregler som är inbyggda och inte konfigurerbara här:

  * INTRON ÄR AVSKALAD (Mathias 2026-08-18): inget märke, ingen figur, inget
    varumärkespynt i öppningen. Hooken ska bära ensam.
  * OUTRON BÄR VARUMÄRKESLÅSET: korttypen "outro" lägger logo-dark.svg + tagline
    sist. Det MÅSTE vara logo-dark (vit text) — logo.svg är marinblå #0A1628 och
    blir osynlig på det marinblå bandet.
  * MASKOTEN LIGGER INTE HÄR. Hon står vid Mathias i nedre bandet, i de fönster
    där hon passar innehållet (Mathias 2026-08-18). Kortlagret kan inte bära
    henne: hyperframes renderar yuv420p utan alpha och kortbandet klipps till de
    övre 864 px. Hon renderas av scripts/maskot_frames.py och läggs på i
    scripts/compose_bahko.sh, som styr fönstren med MASKOT_FONSTER.
  * CTA-REGELN: smaragdyta med marinblå text. Vit text på smaragd är 2,54:1 och
    underkänt, så CTA-korten tar färgerna ur palett.json (CTA_YTA/CTA_TEXT).
  * TYPOGRAFI: Outfit rakt igenom. Guld/cream/Cormorant är utfasat.
  * LOGGAN: alltid det PLATTA materialet, aldrig 3D-rendern. Outron använder
    ordmärket logo-dark.svg; mark.svg finns kopierad i projektet om du vill ha
    bara symbolen någonstans.

Redigera BEATS längst ner. trigger = ordet kortet ska dyka upp på.
"""
from __future__ import annotations
import html, json, re, sys
from pathlib import Path

# ---------- palett ur brand.json (kopierad av bahko_assets.py) ----------
BA = Path("assets/bahko")
if not (BA / "palett.json").exists():
    sys.exit("assets/bahko/palett.json saknas — kör scripts/bahko_assets.py cards först.")
P = json.loads((BA / "palett.json").read_text())
A, AB = P["A"], P["AB"]                    # smaragd, ljus smaragd
BAS, YTA = P["BAS"], P["YTA"]              # marinblå botten, kortyta
TXT, TXT2 = P["TEXT"], P["TEXT2"]
FEL, VARN, OK = P["FEL"], P["VARNING"], P["OK"]
CTA_YTA, CTA_TXT = P["CTA_YTA"], P["CTA_TEXT"]
GRAD = P["GRADIENT"]


def rgba(hexf: str, a: float) -> str:
    h = hexf.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return f"rgba({r},{g},{b},{a})"


AD, GL = rgba(A, 0.45), rgba(A, 0.16)

# ---------- transkript ----------
d = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "cut_transcript.json"))
WS = [w for w in d["words"] if w.get("type") != "spacing" and w.get("start") is not None]
TOTAL = round(WS[-1]["end"], 2) + 0.3


def norm(s): return re.sub(r"[^a-zåäöé0-9 ]", "", s.lower())


TOK = [norm(w["text"]) for w in WS]


def find(trig):
    tt = norm(trig).split()
    for i in range(len(TOK) - len(tt) + 1):
        if TOK[i:i + len(tt)] == tt:
            return round(WS[i]["start"], 2)
    for i, t in enumerate(TOK):
        if tt and t == tt[0]:
            return round(WS[i]["start"], 2)
    return 0.0


def find_after(trig, after):
    tt = norm(trig).split()
    for i in range(len(TOK) - len(tt) + 1):
        if TOK[i:i + len(tt)] == tt and WS[i]["start"] >= after - 0.01:
            return round(WS[i]["start"], 2)
    return after


def esc(s): return html.escape(s)
def eb(e, färg=None):
    if not e:
        return ""
    c = färg or A
    return (f'<div class="eyebrow" style="color:{c}">'
            f'<span class="ebdot" style="background:{c};box-shadow:0 0 14px {c}"></span>{esc(e)}</div>')


# ---------- kurva som ritar sig själv (aldrig ett naket tal) ----------
def poly(riktning):
    return ("0,150 110,120 220,132 330,92 440,100 550,50 600,34" if riktning == "up"
            else "0,34 110,58 220,50 330,92 440,88 550,140 600,152")


# =======================================================================
# BEATS — byt ut mot reelens innehåll. Korten är sammanhängande: ett kort
# är alltid uppe, och varje kort börjar på sitt trigger-ord.
# =======================================================================
BEATS = [
    ("hook_ord_här",     "hook",      {"eyebrow": "FÖR BYGG & HANTVERK", "kw": "OSYNLIG\nPÅ GOOGLE"}),
    ("problem_ord",      "graf",      {"eyebrow": "SÅ SER DET UT IDAG", "dir": "down", "color": FEL}),
    ("stat_ord",         "statgraf",  {"eyebrow": "MISSADE JOBB", "count": 0, "suffix": "", "unit": "FÖRFRÅGNINGAR", "dir": "down"}),
    ("lösning_ord",      "checklista", {"eyebrow": "DET DU FÅR", "rows": ["Hemsida som säljer", "Syns när kunden söker", "Klar på en vecka"]}),
    ("bevis_ord",        "kundcase",  {"eyebrow": "RIKTIG KUND", "namn": "Småmåleri", "resultat": "fler förfrågningar varje vecka"}),
    ("cta_ord",          "cta",       {"eyebrow": "NÄSTA STEG", "kw": "GRATIS FÖRSLAG", "knapp": "SKRIV \"HEMSIDA\""}),
    ("outro_ord",        "outro",     {"webb": "bahkobyra.se"}),   # taglinen sitter i ordmärket
]
starts = [find(t) for t, _, _ in BEATS]
ends = [starts[i + 1] for i in range(len(starts) - 1)] + [TOTAL]

# Guard: en felräknad ankarpunkt desynkar ett beat tyst. Bättre att dö här.
for i, (trig, _, _) in enumerate(BEATS):
    if starts[i] == 0.0 and i > 0:
        sys.exit(f"beat {i} ('{trig}') hittade inte sitt trigger-ord i transkriptet — rätta triggern.")
    if i and starts[i] <= starts[i - 1]:
        sys.exit(f"beat {i} ('{trig}') ligger före eller på beat {i-1} ({starts[i]} <= {starts[i-1]}).")


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
        return (f'{eb(p["eyebrow"])}<div class="case" id="cs{i}">'
                f'<div class="csnamn">{esc(p["namn"])}</div>'
                f'<div class="csres">{esc(p["resultat"])}</div>'
                f'<svg class="spark" viewBox="0 0 600 150" preserveAspectRatio="none">'
                f'<polyline id="sp{i}" points="{poly("up")}" style="stroke:{OK}"/></svg></div>')
    if t == "cta":
        # Sekundärt innehåll fyller kortets FRAMKANT så det aldrig står tomt medan
        # knappen väntar på sitt ord (lärdom: tom CTA-ruta i 3s).
        return (f'{eb(p["eyebrow"])}<div class="kw"><span class="hl" id="c{i}k">{esc(p["kw"])}</span></div>'
                f'<div class="knapp" id="c{i}b">{esc(p["knapp"])}</div>')
    if t == "outro":
        # logo-dark.svg = VIT text. logo.svg är marinblå och försvinner på bandet.
        # Ordmärket BÄR REDAN taglinen — sätt "tagline" bara om du vill ha en ANNAN
        # rad under adressen, annars dubbleras "SYNLIGHET SOM SÄLJER" på skärmen.
        tag = p.get("tagline", "")
        tagrad = f'<div class="tagline" id="tg{i}">{esc(tag)}</div>' if tag else ""
        return (f'<div class="lockup"><img src="assets/bahko/logo-dark.svg" class="ordmarke" id="lm{i}"/>'
                f'{tagrad}<div class="webb" id="wb{i}">{esc(p.get("webb", "bahkobyra.se"))}</div></div>')
    return ""


clips, tw = [], []
for i, ((trig, t, p), s, e) in enumerate(zip(BEATS, starts, ends)):
    dur = max(0.6, e - s)
    clips.append(f'<div class="beat" id="beat{i}" data-start="{s}" data-duration="{dur:.2f}" '
                 f'data-track-index="{i+2}"><div class="inner {t}" id="in{i}">{inner(i, t, p)}</div></div>')
    js = [f'tl.fromTo("#beat{i}",{{opacity:0,y:28,scale:0.975}},{{opacity:1,y:0,scale:1,duration:0.2,ease:"power3.out"}},{s:.2f});']
    if t == "hook":
        for j in range(len(p["kw"].split("\n"))):
            js.append(f'tl.fromTo("#h{i}r{j}",{{opacity:0,y:44}},{{opacity:1,y:0,duration:0.34,ease:"power3.out"}},{s+0.1+j*0.16:.2f});')
    if t in ("graf", "kundcase"):
        js.append(f'tl.fromTo("#sp{i}",{{attr:{{"stroke-dashoffset":760}}}},{{attr:{{"stroke-dashoffset":0}},duration:1.1,ease:"power2.out"}},{s+0.15:.2f});')
    if t == "kundcase":
        js.append(f'tl.fromTo("#cs{i}",{{opacity:0,scale:0.94}},{{opacity:1,scale:1,duration:0.3,ease:"back.out(1.7)"}},{s+0.1:.2f});')
    if t == "statgraf":
        # Kort beat -> POPPA slutsiffran, räkna inte (en uppräkning under 1,2s är oläsbar).
        if dur < 1.2:
            js.append(f'tl.fromTo("#big{i}",{{opacity:0,scale:1.5}},{{opacity:1,scale:1,duration:0.3,ease:"back.out(2)",'
                      f'onStart:function(){{document.getElementById("big{i}").textContent="{p["count"]}{p.get("suffix","")}";}}}},{s+0.15:.2f});')
        else:
            js.append(f'tl.to({{v:0}},{{v:{p["count"]},duration:0.9,ease:"power2.out",onUpdate:function(){{'
                      f'document.getElementById("big{i}").textContent=Math.round(this.targets()[0].v)+"{p.get("suffix","")}";}}}},{s+0.15:.2f});')
        js.append(f'tl.fromTo("#sp{i}",{{attr:{{"stroke-dashoffset":760}}}},{{attr:{{"stroke-dashoffset":0}},duration:1.0,ease:"power2.out"}},{s+0.2:.2f});')
    if t == "checklista":
        for j in range(len(p["rows"])):
            js.append(f'tl.fromTo("#b{i}l{j}",{{opacity:0,x:-46}},{{opacity:1,x:0,duration:0.26,ease:"back.out(1.8)"}},{s+0.15+j*0.3:.2f});')
    if t == "cta":
        js.append(f'tl.fromTo("#c{i}k",{{opacity:0,y:30}},{{opacity:1,y:0,duration:0.3,ease:"power3.out"}},{s+0.1:.2f});')
        js.append(f'tl.fromTo("#c{i}b",{{opacity:0,scale:0.86}},{{opacity:1,scale:1,duration:0.32,ease:"back.out(2)"}},{max(s+0.5, e-1.4):.2f});')
    if t == "outro":
        js.append(f'tl.fromTo("#lm{i}",{{opacity:0,y:34,scale:0.94}},{{opacity:1,y:0,scale:1,duration:0.42,ease:"back.out(1.6)"}},{s+0.1:.2f});')
        if p.get("tagline"):
            js.append(f'tl.fromTo("#tg{i}",{{opacity:0,y:20}},{{opacity:1,y:0,duration:0.3,ease:"power3.out"}},{s+0.4:.2f});')
        js.append(f'tl.fromTo("#wb{i}",{{opacity:0}},{{opacity:1,duration:0.3}},{s+0.62:.2f});')
    js.append(f'tl.to("#beat{i}",{{opacity:0,duration:0.16,ease:"power2.in"}},{e-0.16:.2f});')
    tw.append("\n      ".join(js))

# Intron är avskalad: inget märke i öppningen. Varumärket landar i outro-kortet.
mjs = []

# ---------- dekorlager ----------
NP = 20
parts = "".join(f'<span class="pt" id="pt{k}" style="left:{(k*137+40)%1040}px;top:{(k*101+30)%780}px;'
                f'width:{5+(k%3)*3}px;height:{5+(k%3)*3}px;opacity:{0.12+0.2*((k*7)%5)/5:.2f}"></span>'
                for k in range(NP))
streaks = "".join(f'<span class="stk" id="stk{k}" style="top:{130+k*240}px"></span>' for k in range(3))
bg = ['tl.to("#glow",{x:110,y:34,scale:1.14,duration:6,yoyo:true,repeat:19,ease:"sine.inOut"},0);',
      'tl.to("#grid",{backgroundPosition:"0px 110px",duration:6,ease:"none",repeat:19},0);']
for k in range(NP):
    dd = 4 + (k % 5)
    bg.append(f'tl.to("#pt{k}",{{y:-{120+(k%4)*60},duration:{dd},ease:"none",repeat:{int(TOTAL/dd)+1}}},0);')
    bg.append(f'tl.to("#pt{k}",{{opacity:0,duration:{dd},yoyo:true,repeat:{int(TOTAL/dd)+1},ease:"sine.inOut"}},0);')
for k in range(3):
    bg.append(f'tl.fromTo("#stk{k}",{{x:-1200}},{{x:1200,duration:{5+k*2},ease:"none",repeat:{int(TOTAL/6)+1}}},{k*1.5});')

HTML = f'''<!doctype html><html lang="sv"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=1080, height=1920"/>
<script src="assets/bahko/gsap.min.js"></script>
<script>if(!window.gsap){{document.write('<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"><\/script>');}}</script>
<style>
@font-face{{font-family:"Outfit";src:url("assets/bahko/Outfit[wght].ttf") format("truetype-variations");font-weight:100 900;font-display:block}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;overflow:hidden;background:#000;font-family:"Outfit",system-ui,sans-serif}}
#root{{position:relative;width:1080px;height:1920px}}
#bgz{{position:absolute;top:0;left:0;width:1080px;height:864px;overflow:hidden;background:{BAS}}}
#grid{{position:absolute;inset:-40px;background-image:linear-gradient({rgba(A,0.06)} 1px,transparent 1px),linear-gradient(90deg,{rgba(A,0.06)} 1px,transparent 1px);background-size:110px 110px}}
#glow{{position:absolute;top:110px;left:270px;width:540px;height:540px;border-radius:50%;background:radial-gradient(circle,{rgba(A,0.26)},transparent 66%);filter:blur(22px)}}
.pt{{position:absolute;border-radius:50%;background:{A};box-shadow:0 0 12px {A}}}
.stk{{position:absolute;left:0;width:520px;height:2px;background:linear-gradient(90deg,transparent,{A},transparent);opacity:0.3}}
.beat{{position:absolute;top:0;left:0;width:1080px;height:864px}}
.inner{{position:absolute;top:52px;left:64px;right:64px;height:690px;display:flex;flex-direction:column;justify-content:center;gap:24px}}
.eyebrow{{font-size:30px;font-weight:800;letter-spacing:6px;text-transform:uppercase;display:flex;align-items:center;gap:13px}}
.ebdot{{width:14px;height:14px;border-radius:50%}}
.kw{{color:{TXT};font-size:104px;font-weight:900;line-height:0.98;letter-spacing:-1px;text-shadow:0 0 30px {GL};display:flex;flex-direction:column}}
.hl{{display:block}}
.statrow{{display:flex;align-items:flex-end;gap:26px}}
.big{{color:{TXT};font-size:196px;font-weight:900;line-height:0.85;letter-spacing:-3px;text-shadow:0 0 36px {GL}}}
.unit{{color:{A};font-size:36px;font-weight:900;text-transform:uppercase;line-height:1.1;padding-bottom:18px}}
.spark{{width:100%;height:200px}} .sparkbig{{width:100%;height:320px}}
.spark polyline,.sparkbig polyline{{fill:none;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:760;filter:drop-shadow(0 0 12px currentColor)}}
.lc{{display:flex;flex-direction:column;gap:16px}}
.lrow{{display:flex;align-items:center;gap:20px;background:{YTA};border:1px solid {AD};border-radius:18px;padding:26px 32px;box-shadow:0 0 20px {GL}}}
.lck{{color:{A};font-size:40px;font-weight:900}} .lt{{color:{TXT};font-size:40px;font-weight:800}}
.case{{background:{YTA};border:1px solid {AD};border-radius:22px;padding:34px 38px;box-shadow:0 0 26px {GL}}}
.csnamn{{color:{TXT};font-size:64px;font-weight:900;letter-spacing:-1px}}
.csres{{color:{TXT2};font-size:34px;font-weight:600;margin-top:6px}}
/* CTA-regeln: smaragdyta + marinblå text. ALDRIG vit text på smaragd. */
.knapp{{align-self:flex-start;background:{CTA_YTA};color:{CTA_TXT};font-size:52px;font-weight:900;
        letter-spacing:1px;padding:24px 44px;border-radius:20px;box-shadow:0 0 40px {rgba(A,0.5)}}}
.inner.cta{{background:{rgba(YTA,0.92)};border:2px solid {A};border-radius:26px;padding:42px;box-shadow:0 0 46px {GL}}}
/* outro-lockup: ordmärket i logo-dark (vit text) + tagline + adress */
.inner.outro{{align-items:center;text-align:center;gap:30px}}
.lockup{{display:flex;flex-direction:column;align-items:center;gap:26px}}
.ordmarke{{width:760px;height:auto;filter:drop-shadow(0 0 26px {rgba(A,0.45)})}}
.tagline{{color:{A};font-size:40px;font-weight:700;letter-spacing:8px;text-transform:uppercase}}
.webb{{color:{TXT2};font-size:34px;font-weight:600;letter-spacing:3px}}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL:.2f}" data-width="1080" data-height="1920">
  <div id="bgz" data-start="0" data-duration="{TOTAL:.2f}" data-track-index="0"><div id="grid"></div><div id="glow"></div>{streaks}{parts}</div>
  {"".join(clips)}
</div>
<script>
if(!window.gsap){{throw new Error("gsap laddades inte - korten skulle renderats helt utan animation");}}
window.__timelines=window.__timelines||{{}};const tl=gsap.timeline({{paused:true}});
      {chr(10).join(bg)}
      {chr(10).join(mjs)}
      {chr(10).join(tw)}
window.__timelines["main"]=tl;</script></body></html>'''

Path("index.html").write_text(HTML, encoding="utf-8")
print(f"gen_bahko: {len(BEATS)} beats, {TOTAL:.2f}s")
print("  intro: avskalad (inget märke) | outro: logo-dark + tagline")
print("  maskot: INTE i korten — maskot_frames.py + MASKOT_FONSTER i compose_bahko.sh")
print(f"  palett: accent {A}/{AB}  bas {BAS}  CTA {CTA_YTA} på {CTA_TXT}")
for i, ((trig, t, p), s, e) in enumerate(zip(BEATS, starts, ends)):
    print(f"  {s:6.2f}-{e:6.2f} {t:11s} {trig}")
