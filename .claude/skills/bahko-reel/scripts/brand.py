#!/usr/bin/env python3
"""Hämtar Bahko-varumärket till ett reel-projekt.

web/public/brand/brand.json är ENDA källan för palett, typografi, logga och
maskotregler (se CLAUDE.md "Heligt"). Det här skriptet kopierar därifrån in i
projektets grafik/assets/ vid varje körning — inget varumärkesmaterial
dupliceras in i skillen, så en ändring i källan slår igenom på nästa reel.

Sökordning: $BAHKO_BRAND_DIR, sedan web/public/brand/ uppåt från cwd, sedan
~/BahkoByra/web/public/brand/.

Usage:  python scripts/brand.py <grafik_dir>
"""
from __future__ import annotations
import json, os, shutil, sys, textwrap
from pathlib import Path

MASKOT_LAGER = ["bahko-kropp.webp", "bahko-arm-vanster.webp", "bahko-arm-hoger.webp"]
MARKEN = ["mark.svg", "logo.svg", "logo-dark.svg"]


def hitta_brand_dir() -> Path:
    env = os.environ.get("BAHKO_BRAND_DIR")
    if env:
        p = Path(env).expanduser().resolve()
        if not (p / "brand.json").exists():
            sys.exit(f"BAHKO_BRAND_DIR saknar brand.json: {p}")
        return p
    for start in [Path.cwd(), *Path.cwd().parents]:
        k = start / "web" / "public" / "brand"
        if (k / "brand.json").exists():
            return k.resolve()
    f = Path.home() / "BahkoByra" / "web" / "public" / "brand"
    if (f / "brand.json").exists():
        return f.resolve()
    sys.exit("Hittade inte brand.json. Kör från BahkoByra-repot eller sätt BAHKO_BRAND_DIR.")


def palett(b: dict) -> dict:
    return {
        "A": b["primary_color"], "AB": b["accent_color"],
        "BAS": b["background_color"], "YTA": b["surface_dark"],
        "TEXT": b["text_color"], "TEXT2": b["text_secondary_dark"],
        "FEL": b["semantic"]["fel"], "VARNING": b["semantic"]["varning"], "OK": b["semantic"]["ok"],
        "FONT": b["font_heading"],
        # CTA-regeln: smaragdyta + marinblå text. Vit text på smaragd är 2,54:1, underkänt.
        "CTA_YTA": b["primary_color"], "CTA_TEXT": b["background_color"],
    }


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    dest = Path(sys.argv[1]).resolve() / "assets"
    dest.mkdir(parents=True, exist_ok=True)
    src = hitta_brand_dir()
    brand = json.loads((src / "brand.json").read_text())
    shutil.copy2(src / "brand.json", dest / "brand.json")

    kopierade, saknade = [], []
    for namn in MARKEN:
        (kopierade if (src / namn).exists() else saknade).append(namn)
        if (src / namn).exists():
            shutil.copy2(src / namn, dest / namn)
    for namn in MASKOT_LAGER:
        f = src / "maskot" / namn
        (kopierade if f.exists() else saknade).append(namn)
        if f.exists():
            shutil.copy2(f, dest / namn)

    egna = Path(__file__).resolve().parent.parent / "assets"
    for rel in ("Outfit[wght].ttf", "gsap.min.js"):
        f = egna / rel
        if f.exists():
            shutil.copy2(f, dest / f.name)
            kopierade.append(f.name)
        else:
            saknade.append(f.name)

    (dest / "palett.json").write_text(json.dumps(palett(brand), indent=2, ensure_ascii=False))
    p = palett(brand)
    print(f"brand-källa: {src}")
    print(f"kopierat: {len(kopierade)} filer -> {dest}")
    print(f"  accent {p['A']}/{p['AB']}  bas {p['BAS']}  yta {p['YTA']}  font {p['FONT']}")
    print(f"  CTA: yta {p['CTA_YTA']} + text {p['CTA_TEXT']} (aldrig vit text på smaragd)")
    if saknade:
        print(f"  SAKNAS: {', '.join(saknade)}")
    dos = brand.get("mascot", {}).get("dosering", "")
    if dos:
        print("  maskotregel ur brand.json:")
        for rad in textwrap.wrap(dos, 92):
            print(f"    {rad}")


if __name__ == "__main__":
    main()
