#!/usr/bin/env python3
"""Renderar Bahko-maskoten som en genomskinlig, sömlöst loopande PNG-sekvens.

Maskoten står VID Mathias i nedre bandet genom hela reelen — assistent, supporter,
kompis (Mathias beslut 2026-08-18, ersätter den tidigare intro/outro-doseringen
för reels). Den ligger alltså inte i kortlagret: hyperframes renderar yuv420p
utan alpha, och kortbandet klipps till de övre 864 px. Den här sekvensen läggs
i stället på som eget overlay i compose_bahko.sh, precis som undertexterna.

Figuren ritas i tre lager (kropp + två armar) som delar samma 732x690-ram och är
frilagda — samma lagerkontrakt som web/app/komponenter/Maskot.js. Gesten byggs
genom att rotera ett armlager kring axeln, inte genom att byta bild.

Bara EN cykel renderas (sömlös: sväng och armrörelse börjar och slutar i vila),
sen loopar ffmpeg den. 48 rutor istället för hundratals.

Usage:
    python scripts/maskot_frames.py <maskot_dir> <out_dir> [höjd=300] [gest=vinkar] [fps=12] [cykel_s=4.0]

maskot_dir = mappen med bahko-kropp/arm-vanster/arm-hoger.webp
             (cards/assets/bahko/ efter bahko_assets.py, eller web/public/brand/maskot/)
Skriver ut overlay-positionen som compose_bahko.sh ska använda.
"""
from __future__ import annotations
import math, sys
from pathlib import Path
from PIL import Image

LAGER = {"kropp": "bahko-kropp.webp",
         "armv": "bahko-arm-vanster.webp",
         "armh": "bahko-arm-hoger.webp"}

# Axelpunkter, uppmätta ur lagrens alfa-bbox (2026-08-18): armarnas INRE kant, en
# bit ner från överkanten. Rotation kring dessa punkter ser ut som en axelled;
# kring lagrets mitt ser den ut som att armen lossnar.
AXEL = {"armv": (138, 340), "armh": (598, 340)}

# Gest -> (lager, vinkel i grader, hur stor del av cykeln rörelsen tar)
GESTER = {
    # TECKENKONVENTION (mätt på kontaktkarta 2026-08-18, två fel innan den satt):
    # PIL roterar moturs vid positiv vinkel, och axeln ligger på armens INRE kant.
    # Höger arm (fri ände utåt höger) lyfts alltså av POSITIV vinkel; vänster arm
    # av NEGATIV. Fel tecken viker in armen över kroppen -- ser ut som att den
    # kryper längs magen, inte vinkar.
    # Vinklarna är dessutom stora med flit: armarna är korta droppar tätt mot
    # kroppen, så allt under ~50 grader läses som vobbling och inte som en gest.
    "vinkar":     ("armh",  62.0, 0.55),   # hälsar, standard för kompis-läget
    "pekar":      ("armh",  40.0, 0.45),   # sträcker armen utåt mot erbjudandet
    "undersoker": ("armv", -38.0, 0.70),   # lutar sig fram och tittar
    "dansar":     ("armv", -55.0, 0.35),   # tvåtakt, glad energi
    "stilla":     ("armh",   0.0, 1.00),   # bara andning, ingen arm
}


def mjuk(x: float) -> float:
    """0->1->0 med mjuka ändar: ger en sömlös loop (derivatan är 0 i båda ändar)."""
    return 0.5 - 0.5 * math.cos(2 * math.pi * x)


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src = Path(sys.argv[1]).expanduser().resolve()
    out = Path(sys.argv[2]).expanduser().resolve()
    HOJD = int(sys.argv[3]) if len(sys.argv) > 3 else 300
    GEST = sys.argv[4] if len(sys.argv) > 4 else "vinkar"
    FPS = int(sys.argv[5]) if len(sys.argv) > 5 else 12
    CYKEL = float(sys.argv[6]) if len(sys.argv) > 6 else 4.0

    if GEST not in GESTER:
        sys.exit(f"okänd gest '{GEST}'. Välj: {', '.join(GESTER)}")
    saknas = [f for f in LAGER.values() if not (src / f).exists()]
    if saknas:
        sys.exit(f"saknar lager i {src}: {', '.join(saknas)}\n"
                 "  Kör scripts/bahko_assets.py cards först, eller peka på web/public/brand/maskot/")

    bilder = {k: Image.open(src / f).convert("RGBA") for k, f in LAGER.items()}
    RAM_W, RAM_H = bilder["kropp"].size
    skala = HOJD / RAM_H
    W, H = round(RAM_W * skala), HOJD

    armlager, vinkel_max, andel = GESTER[GEST]
    ax, ay = AXEL[armlager]

    # Marginalen RÄKNAS UT, gissas inte: en lyft arm svepte utanför duken vid 62
    # grader med en fast 10%-marginal (kontaktkarta 2026-08-18). Armspetsen kan
    # hamna var som helst på en cirkel med radien r kring axeln, så duken måste
    # rymma axeln +/- r utöver kroppen.
    arm_bbox = bilder[armlager].getchannel("A").getbbox()
    horn = [(arm_bbox[0], arm_bbox[1]), (arm_bbox[2], arm_bbox[1]),
            (arm_bbox[0], arm_bbox[3]), (arm_bbox[2], arm_bbox[3])]
    r = max(math.hypot(hx - ax, hy - ay) for hx, hy in horn) * skala
    px, py = ax * skala, ay * skala
    SVANG = round(H * 0.018) + 2          # andningens utslag
    # Armlagren är ritade ända ut till ramkanten (alfa tonar till ~0 vid x=0 resp.
    # x=731 — inte avhugget, men flush). En liten basmarginal håller figuren fri
    # från overlay-kanten så den inte ser kapad ut mot videon.
    BAS = 6
    M_V = max(0, math.ceil(r - px)) + BAS
    M_H = max(0, math.ceil(px + r - W)) + BAS
    M_O = max(0, math.ceil(r - py)) + SVANG + BAS
    M_N = max(0, math.ceil(py + r - H)) + SVANG + BAS
    CW, CH = W + M_V + M_H, H + M_O + M_N
    axel_skalad = (px + M_V, py + M_O)

    out.mkdir(parents=True, exist_ok=True)
    for gammal in out.glob("*.png"):
        gammal.unlink()

    n = max(1, round(CYKEL * FPS))
    for i in range(n):
        fas = i / n
        duk = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
        # Andning: liten vertikal sväng, en hel period per cykel -> sömlös.
        sway = round(math.sin(2 * math.pi * fas) * H * 0.018)
        # Armrörelsen ligger i cykelns första del och vilar resten.
        v = mjuk(min(1.0, fas / andel)) if fas < andel else 0.0
        vinkel = vinkel_max * v

        for nyckel in ("kropp", "armv", "armh"):
            lag = bilder[nyckel].resize((W, H), Image.LANCZOS)
            ram = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
            ram.paste(lag, (M_V, M_O + sway))
            if nyckel == armlager and abs(vinkel) > 0.01:
                ram = ram.rotate(vinkel, resample=Image.BICUBIC,
                                 center=axel_skalad, translate=(0, 0))
            duk = Image.alpha_composite(duk, ram)
        duk.save(out / f"{i:05d}.png")

    print(f"maskotrutor: {n} st ({CYKEL:.1f}s sömlös loop @ {FPS}fps) -> {out}")
    print(f"  gest: {GEST} ({armlager} {vinkel_max:+.0f}° kring axel {AXEL[armlager]})")
    print(f"  rutstorlek: {CW}x{CH} px (figur {W}x{H}, marginal v{M_V}/h{M_H}/ö{M_O}/n{M_N})")
    # Placering: nedre VÄNSTER. Två hänsyn styr, båda mätta:
    #   1. Undertexterna landar kring y=778-900 i slutkompositionen -> figuren
    #      måste ligga tydligt under dem.
    #   2. Instagrams knapprad (gilla/kommentera/dela) ligger längs HÖGER kant,
    #      grovt x>950 och y 1100-1750 -> en figur i nedre höger blir delvis
    #      täckt i flödet. Vänster sida är fri, och 150px botten-marginal håller
    #      figuren ovanför bildtextraden.
    x = 40
    y = 1920 - CH - 150
    print(f"  MASKOT_XY={x}:{y}   (nedre höger, fri från undertexterna)")


if __name__ == "__main__":
    main()
