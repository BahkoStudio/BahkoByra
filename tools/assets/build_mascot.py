#!/usr/bin/env python3
"""
build_mascot.py — klipper ut maskoten ur 3D-rendern och bygger varumärkets bildfiler.

OBS om placering: tools/ är enligt CLAUDE.md Node-skript. Det här är inget
driftverktyg utan en engångsgenerator för bildassets, och den kräver Pillow
(bildbehandling saknas i Node-kedjan). Därför ligger den i tools/assets/
tillsammans med källbilden, avskild från de sju Node-verktygen.

Källor: tools/assets/mascot-sheet.png            (renderat karaktärsark — 3D-figuren)
        tools/assets/mark-flat.png               (platta 2D-märket — logga/favicon)
Skriver:
  web/public/brand/maskot/bahko-master.webp      maskoten frilagd, transparent
  web/public/brand/maskot/bahko-master.png       samma, för verktyg som inte gillar webp
  web/public/favicon.png                         256×256, platta märket, transparent
  web/public/apple-touch-icon.png                180×180, platta märket på marinblå
  web/public/brand/mark.svg                      logotypmärket = platta märket
  web/public/brand/logo.svg                      lockup ljus botten (platta märket)
  web/public/brand/logo-dark.svg                 lockup mörk botten (platta märket)

Beslut 2026-08-16: loggan och faviconen använder det PLATTA märket — 3D
överallt blev för mycket. 3D-maskoten lever som figur i sektioner, popup
och content (mascot.png/webp + gestlagren).

Kör:  python3 tools/assets/build_mascot.py       (kräver Pillow)

Varför geometrisk mask och inte chroma key: figuren är genomskinligt grönt glas
mot grön bakgrund, så både flood fill och bakgrundsmodellering läcker rakt genom
kroppen — båda testade, båda underkända. Silhuetten är däremot enkla primitiver,
så masken ritas efter uppmätta koordinater i CUT. Måtten är pixlar i den
beskurna bilden (CROP), uppmätta med rutnät mot originalet.
"""

import base64
import math
import re
from PIL import Image, ImageDraw, ImageFilter

SRC = "tools/assets/mascot-sheet.png"
FLAT = "tools/assets/mark-flat.png"
CROP = (30, 45, 800, 772)          # hjältefiguren i arkets vänstra del

CUT = {
    "body": (115, 25, 672, 600, 76),        # x0, y0, x1, y1, hörnradie
    "legs": [(252, 540, 400, 710, 40),
             (425, 540, 567, 712, 40)],
    "arms": [((114, 335), (78, 498), 49),   # spets, lobcentrum, lobradie
             ((678, 324), (710, 508), 48)],
}
SS = 4                                       # supersampling för mjuka kanter
AXEL_DJUP = 52                               # hur långt in i kroppen armroten går, se build_mask
AXEL_KNUT = 19                               # knutens radie i rotationspunkten, se build_mask
AXEL_IN = 30                               # knutens radie i rotationspunkten, se build_mask

NAVY = (10, 22, 40)

# Det platta märket som maskoten ersätter i lockup-loggorna
OLD_MARK = ('<rect x="8" y="8" width="84" height="84" rx="19" fill="#10B981"/>'
            '<g transform="translate(8,8) scale(0.84)"><path fill="#FFFFFF" fill-rule="evenodd" '
            'd="M32 24h24q17 0 17 15.5q0 9.5-9 12.5q13 3 13 14.5Q77 82 58 82H32Zm12 11v12h12q8 0 8-6t-8-6Zm0 23v13h14q9 0 9-6.5T58 58Z"/></g>')


def build_mask(size, delar=("kropp", "arm_v", "arm_h")):
    """Mask för valda kroppsdelar. Armarna kan ritas var för sig så de kan
    animeras separat i webben — figuren är en stel render, gesterna byggs
    genom att rotera armlagren kring axeln."""
    w, h = size
    m = Image.new("L", (w * SS, h * SS), 0)
    d = ImageDraw.Draw(m)

    def rr(x0, y0, x1, y1, r):
        d.rounded_rectangle([x0 * SS, y0 * SS, x1 * SS, y1 * SS], radius=r * SS, fill=255)

    def teardrop(tip, center, r):
        """Cirkel plus triangeln från spetsen ut till cirkelns tangentpunkter."""
        tx, ty = tip
        cx, cy = center
        dx, dy = cx - tx, cy - ty
        L = math.hypot(dx, dy)
        ux, uy = dx / L, dy / L
        a = math.asin(min(1.0, r / L))
        ca, sa = math.cos(a), math.sin(a)
        t1 = (tx + (ux * ca - uy * sa) * L * ca, ty + (ux * sa + uy * ca) * L * ca)
        t2 = (tx + (ux * ca + uy * sa) * L * ca, ty + (-ux * sa + uy * ca) * L * ca)
        d.polygon([(tx * SS, ty * SS), (t1[0] * SS, t1[1] * SS),
                   (cx * SS, cy * SS), (t2[0] * SS, t2[1] * SS)], fill=255)
        d.ellipse([(cx - r) * SS, (cy - r) * SS, (cx + r) * SS, (cy + r) * SS], fill=255)

    if "kropp" in delar:
        rr(*CUT["body"])
        for leg in CUT["legs"]:
            rr(*leg)
    # Armen förlängs inåt i kroppen istället för att få en påklistrad platta.
    # Roten begravs bakom kroppen (armlagren ritas före kroppen i webben), så
    # den syns aldrig — men armen har alltid material innanför silhuetten när
    # den svänger, och det som eventuellt tittar fram har armens egen form.
    bx0, by0, bx1, by1, _r = CUT["body"]
    mitt = ((bx0 + bx1) / 2, (by0 + by1) / 2)

    def rotad(tip, djup):
        """Punkten `djup` pixlar in mot kroppens mitt från armens spets."""
        dx, dy = mitt[0] - tip[0], mitt[1] - tip[1]
        L = math.hypot(dx, dy)
        return (tip[0] + dx / L * djup, tip[1] + dy / L * djup)

    # En liten knut i själva rotationspunkten håller armen visuellt fast vid
    # kroppen även i ytterlägen — droppen är spetsig där och skulle annars se
    # lös ut. Knuten ligger bakom kroppen, så den kan inte ge någon fläck.
    def axelknut(tip):
        r = AXEL_KNUT
        d.ellipse([(tip[0] - r) * SS, (tip[1] - r) * SS,
                   (tip[0] + r) * SS, (tip[1] + r) * SS], fill=255)

    if "arm_v" in delar:
        tip, c, r = CUT["arms"][0]
        teardrop(rotad(tip, AXEL_DJUP), c, r)
        axelknut(rotad(tip, AXEL_IN))
    if "arm_h" in delar:
        tip, c, r = CUT["arms"][1]
        teardrop(rotad(tip, AXEL_DJUP), c, r)
        axelknut(rotad(tip, AXEL_IN))

    mask = m.resize((w, h), Image.LANCZOS)
    # Krymp ett snäpp så bakgrundens kantljus inte följer med. Gäller alla
    # lager: armarna ligger bakom kroppen, så de behöver inte täcka någon skarv.
    mask = mask.filter(ImageFilter.MinFilter(3))
    return mask.filter(ImageFilter.GaussianBlur(0.7))


def fit(img, size, pad=0.04, bg=None):
    """Skalar in figuren i en kvadrat med marginal, proportionerna behållna."""
    box = int(size * (1 - pad * 2))
    im = img.copy()
    im.thumbnail((box, box), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (bg + (255,)) if bg else (0, 0, 0, 0))
    canvas.alpha_composite(im, ((size - im.width) // 2, (size - im.height) // 2))
    return canvas


def squeeze(im, colors=192):
    """Palettkomprimering med bevarad alfakant — håller filstorleken nere."""
    alpha = im.getchannel("A")
    q = im.convert("RGB").quantize(colors=colors, method=Image.MEDIANCUT).convert("RGBA")
    q.putalpha(alpha)
    return q


def embed(img, max_side, colors=160):
    """Base64-PNG att lägga in i en SVG."""
    im = img.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    im = squeeze(im, colors)
    im.save("/tmp/_embed.png", optimize=True)
    return base64.b64encode(open("/tmp/_embed.png", "rb").read()).decode(), im.size


def main():
    base = Image.open(SRC).convert("RGB").crop(CROP)
    full = base.convert("RGBA")
    full.putalpha(build_mask(base.size))
    cut = full.crop(full.getbbox())

    web = cut.copy()
    web.thumbnail((760, 760), Image.LANCZOS)
    web.save("web/public/brand/maskot/bahko-master.webp", quality=92, method=6)
    web.save("web/public/brand/maskot/bahko-master.png", optimize=True)
    print(f"  ✓ web/public/brand/maskot/bahko-master.{{webp,png}} {web.size}")

    # ── Lager för gester ────────────────────────────────────────────────────
    # Figuren är en stel render, så armarna klipps ut som egna lager och
    # roteras med CSS kring axeln. Alla lager delar samma ram (bbox för hela
    # figuren) så de kan staplas med inset:0 utan att räkna om positioner.
    ram = full.getbbox()
    skala = 760 / max(ram[2] - ram[0], ram[3] - ram[1])
    for namn, delar in (("kropp", ("kropp",)), ("arm-vanster", ("arm_v",)), ("arm-hoger", ("arm_h",))):
        lager = base.convert("RGBA")
        lager.putalpha(build_mask(base.size, delar))
        lager = lager.crop(ram)
        lager.thumbnail((760, 760), Image.LANCZOS)
        lager.save(f"web/public/brand/maskot/bahko-{namn}.webp", quality=92, method=6)
        print(f"  ✓ web/public/brand/maskot/bahko-{namn}.webp {lager.size}")

    # Axelpunkterna i procent av ramen — CSS transform-origin för armlagren
    bx0, by0, bx1, by1, _rr = CUT["body"]
    mitt = ((bx0 + bx1) / 2, (by0 + by1) / 2)
    for etikett, (tip, _c, _r) in zip(("vänster", "höger"), CUT["arms"]):
        dx, dy = mitt[0] - tip[0], mitt[1] - tip[1]
        L = math.hypot(dx, dy)
        ix, iy = tip[0] + dx / L * AXEL_IN, tip[1] + dy / L * AXEL_IN
        px = (ix - ram[0]) / (ram[2] - ram[0]) * 100
        py = (iy - ram[1]) / (ram[3] - ram[1]) * 100
        print(f"     axel {etikett}: transform-origin: {px:.1f}% {py:.1f}%")

    # Ikoner och märke: PLATTA 2D-märket. 3D-rendern i loggan blev för mycket —
    # den lever som figur i sektionerna, märket och faviconen är platta.
    flat = Image.open(FLAT).convert("RGBA")

    squeeze(fit(flat, 256, pad=0.02), 128).save("web/public/favicon.png", optimize=True)
    print("  ✓ web/public/favicon.png 256×256 (platta märket)")

    fit(flat, 180, pad=0.12, bg=NAVY).convert("RGB").save("web/public/apple-touch-icon.png")
    print("  ✓ web/public/apple-touch-icon.png 180×180")

    # Märket i header/preloader
    b64, size = embed(fit(flat, 150, pad=0.02), 150, 128)
    with open("web/public/brand/mark.svg", "w") as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" '
                f'height="100" role="img" aria-label="Bahko Byrå">\n'
                f'<!-- GENERERAD av tools/assets/build_mascot.py — ändra där, inte här. -->\n'
                f'<image x="0" y="0" width="100" height="100" href="data:image/png;base64,{b64}"/>\n'
                f'</svg>\n')
    print("  ✓ web/public/brand/mark.svg")

    # Lockups: platta märket där brickan satt, ordmärket rörs inte
    lb64, (lw, lh) = embed(flat, 180, 128)
    mh = 84
    mw = round(mh * lw / lh)
    new_mark = f'<image x="8" y="8" width="{mw}" height="{mh}" href="data:image/png;base64,{lb64}"/>'
    for path in ("web/public/brand/logo.svg", "web/public/brand/logo-dark.svg"):
        s = open(path).read()
        if OLD_MARK in s:                       # första körningen: platta brickan sitter kvar
            s = s.replace(OLD_MARK, new_mark, 1)
        elif '<image x=' in s:               # senare körningar: byt ut förra maskoten
            s = re.sub(r'<image x="\d+"[^>]*/>', new_mark, s, count=1)
        else:
            print(f"  ⚠ {path}: hittar varken brickan eller ett tidigare maskotlager")
            continue
        open(path, "w").write(s)
        print(f"  ✓ {path} (maskot {mw}×{mh})")


if __name__ == "__main__":
    main()
