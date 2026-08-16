#!/usr/bin/env python3
"""
build_mascot.py — klipper ut maskoten ur 3D-rendern och bygger varumärkets bildfiler.

OBS om placering: tools/ är enligt CLAUDE.md Node-skript. Det här är inget
driftverktyg utan en engångsgenerator för bildassets, och den kräver Pillow
(bildbehandling saknas i Node-kedjan). Därför ligger den i tools/assets/
tillsammans med källbilden, avskild från de sju Node-verktygen.

Källa:  tools/assets/mascot-sheet.png            (renderat karaktärsark)
Skriver:
  web/public/brand/maskot/bahko-master.webp      maskoten frilagd, transparent
  web/public/brand/maskot/bahko-master.png       samma, för verktyg som inte gillar webp
  web/public/favicon.png                         256×256, kroppsbeskuren
  web/public/apple-touch-icon.png                180×180 på marinblå
  web/public/brand/mark.svg                      logotypmärket = maskoten
  web/public/brand/logo.svg                      lockup ljus botten
  web/public/brand/logo-dark.svg                 lockup mörk botten

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
CROP = (30, 45, 800, 772)          # hjältefiguren i arkets vänstra del

CUT = {
    "body": (115, 25, 672, 600, 76),        # x0, y0, x1, y1, hörnradie
    "legs": [(252, 540, 400, 710, 40),
             (425, 540, 567, 712, 40)],
    "arms": [((114, 335), (78, 498), 49),   # spets, lobcentrum, lobradie
             ((678, 324), (710, 508), 48)],
}
SS = 4                                       # supersampling för mjuka kanter
AXEL_R = 30                                  # axelplattans radie, se build_mask

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
    # Armlagren får en axelplatta: en cirkel centrerad i rotationspunkten.
    # En cirkel roterad kring sitt eget centrum är identisk med sig själv, så
    # leden kan aldrig glipa mot kroppen hur mycket armen än svänger.
    def axelplatta(tip):
        r = AXEL_R
        d.ellipse([(tip[0] - r) * SS, (tip[1] - r) * SS,
                   (tip[0] + r) * SS, (tip[1] + r) * SS], fill=255)

    if "arm_v" in delar:
        teardrop(*CUT["arms"][0])
        axelplatta(CUT["arms"][0][0])
    if "arm_h" in delar:
        teardrop(*CUT["arms"][1])
        axelplatta(CUT["arms"][1][0])

    mask = m.resize((w, h), Image.LANCZOS)
    if delar == ("kropp",) or "kropp" in delar:
        # Krymp ett snäpp så bakgrundens kantljus inte följer med
        mask = mask.filter(ImageFilter.MinFilter(3))
    else:
        # Armlagren växer istället: de ligger ovanpå kroppen och ska täcka
        # skarven vid axeln när armen svänger, annars syns kroppens kantlinje
        # som en mörk skåra.
        mask = mask.filter(ImageFilter.MaxFilter(5))
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
    for etikett, (tip, _c, _r) in zip(("vänster", "höger"), CUT["arms"]):
        px = (tip[0] - ram[0]) / (ram[2] - ram[0]) * 100
        py = (tip[1] - ram[1]) / (ram[3] - ram[1]) * 100
        print(f"     axel {etikett}: transform-origin: {px:.1f}% {py:.1f}%")

    # Ikonerna beskärs till kroppen med ögat. Hela figuren blir gröt vid 16 px
    # och armar och ben äter yta från B:et, det enda som måste läsa i en flik.
    bx0, by0, bx1, by1, _ = CUT["body"]
    head = full.crop((bx0 - 6, by0 - 6, bx1 + 6, by1 + 6))

    squeeze(fit(head, 256, pad=0.02)).save("web/public/favicon.png", optimize=True)
    print("  ✓ web/public/favicon.png 256×256")

    fit(head, 180, pad=0.10, bg=NAVY).convert("RGB").save("web/public/apple-touch-icon.png")
    print("  ✓ web/public/apple-touch-icon.png 180×180")

    # Märket: maskoten i en kvadratisk vy, ersätter den platta B-brickan
    b64, size = embed(fit(head, 150, pad=0.02), 150, 200)
    with open("web/public/brand/mark.svg", "w") as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" '
                f'height="100" role="img" aria-label="Bahko Byrå">\n'
                f'<!-- GENERERAD av tools/assets/build_mascot.py — ändra där, inte här. -->\n'
                f'<image x="0" y="0" width="100" height="100" href="data:image/png;base64,{b64}"/>\n'
                f'</svg>\n')
    print("  ✓ web/public/brand/mark.svg")

    # Lockups: byt ut den platta brickan mot maskoten, ordmärket rörs inte
    lb64, (lw, lh) = embed(cut, 200, 160)
    mh = 92
    mw = round(mh * lw / lh)
    new_mark = f'<image x="4" y="{round((100 - mh) / 2)}" width="{mw}" height="{mh}" href="data:image/png;base64,{lb64}"/>'
    for path in ("web/public/brand/logo.svg", "web/public/brand/logo-dark.svg"):
        s = open(path).read()
        if OLD_MARK in s:                       # första körningen: platta brickan sitter kvar
            s = s.replace(OLD_MARK, new_mark, 1)
        elif '<image x="4"' in s:               # senare körningar: byt ut förra maskoten
            s = re.sub(r'<image x="4"[^>]*/>', new_mark, s, count=1)
        else:
            print(f"  ⚠ {path}: hittar varken brickan eller ett tidigare maskotlager")
            continue
        open(path, "w").write(s)
        print(f"  ✓ {path} (maskot {mw}×{mh})")


if __name__ == "__main__":
    main()
