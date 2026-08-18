#!/usr/bin/env python3
"""Hämtar Bahko-varumärkets assets till ett reel-projekt.

brand.json i repot är ENDA källan för palett, typografi och maskotregler
(se CLAUDE.md "Heligt"). Den här skriptet KOPIERAR därifrån in i projektets
cards/assets/bahko/ vid generering — inget varumärkesmaterial dupliceras in i
skillen, så en ändring i brand.json slår igenom på nästa reel automatiskt.

Sökordning för brand-katalogen:
  1. $BAHKO_BRAND_DIR
  2. web/public/brand/ i närmaste förälder som har den (uppåt från cwd)
  3. ~/BahkoByra/web/public/brand/

Usage:
    python scripts/bahko_assets.py <cards_dir>        # t.ex. cards
    BAHKO_BRAND_DIR=/sökväg python scripts/bahko_assets.py cards
"""
from __future__ import annotations
import json, os, shutil, sys, textwrap
from pathlib import Path

# Lager som maskoten ritas av. Alla delar samma 732x690-ram och är frilagda,
# så de kan staplas med inset:0 utan att räkna om positioner (samma kontrakt
# som web/app/komponenter/Maskot.js bygger på).
MASKOT_LAGER = ["bahko-kropp.webp", "bahko-arm-vanster.webp", "bahko-arm-hoger.webp"]
MASKOT_MASTER = "bahko-master.webp"
MARKEN = ["mark.svg", "logo.svg", "logo-dark.svg"]


def hitta_brand_dir() -> Path:
    env = os.environ.get("BAHKO_BRAND_DIR")
    if env:
        p = Path(env).expanduser().resolve()
        if not (p / "brand.json").exists():
            sys.exit(f"BAHKO_BRAND_DIR saknar brand.json: {p}")
        return p
    for start in [Path.cwd(), *Path.cwd().parents]:
        kandidat = start / "web" / "public" / "brand"
        if (kandidat / "brand.json").exists():
            return kandidat.resolve()
    fallback = Path.home() / "BahkoByra" / "web" / "public" / "brand"
    if (fallback / "brand.json").exists():
        return fallback.resolve()
    sys.exit(
        "Hittade inte brand.json.\n"
        "  Kör från BahkoByra-repot, eller sätt BAHKO_BRAND_DIR=/sökväg/till/web/public/brand"
    )


def palett(brand: dict) -> dict:
    """Plockar ut precis det korten behöver. Nycklarna speglar brand.json v2."""
    return {
        "A": brand["primary_color"],           # smaragd, huvudaccent
        "AB": brand["accent_color"],           # ljus smaragd, highlights
        "BAS": brand["background_color"],      # marinblå botten
        "YTA": brand["surface_dark"],          # kortyta
        "TEXT": brand["text_color"],
        "TEXT2": brand["text_secondary_dark"],
        "FEL": brand["semantic"]["fel"],
        "VARNING": brand["semantic"]["varning"],
        "OK": brand["semantic"]["ok"],
        "GRADIENT": brand["accent_gradient"],
        "FONT": brand["font_heading"],
        # CTA-regeln är inte kosmetik: vit text på smaragd är 2,54:1 och underkänt.
        "CTA_YTA": brand["primary_color"],
        "CTA_TEXT": brand["background_color"],
    }


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cards = Path(sys.argv[1]).resolve()
    dest = cards / "assets" / "bahko"
    dest.mkdir(parents=True, exist_ok=True)

    src = hitta_brand_dir()
    brand = json.loads((src / "brand.json").read_text())
    shutil.copy2(src / "brand.json", dest / "brand.json")

    kopierade, saknade = [], []
    for namn in MARKEN:
        f = src / namn
        (kopierade if f.exists() else saknade).append(namn)
        if f.exists():
            shutil.copy2(f, dest / namn)
    for namn in [MASKOT_MASTER, *MASKOT_LAGER]:
        f = src / "maskot" / namn
        (kopierade if f.exists() else saknade).append(namn)
        if f.exists():
            shutil.copy2(f, dest / namn)

    # Outfit följer med från skillen: korten renderas i Chromium via hyperframes och
    # @font-face måste peka på en fil som ligger i projektet, inte i skill-mappen.
    skill_assets = Path(__file__).resolve().parent.parent / "assets"
    font = skill_assets / "fonts" / "Outfit[wght].ttf"
    if font.exists():
        shutil.copy2(font, dest / font.name)
        kopierade.append(font.name)
    else:
        saknade.append(font.name)

    # GSAP lokalt i stället för CDN: hämtas biblioteket över nätet vid rendering
    # är kortlagret beroende av att jsdelivr är nåbart. Är det inte det blir
    # gsap undefined, skriptet kastar, och hyperframes renderar korten i sitt
    # SLUTLÄGE utan en enda animation — med bara en mild varning
    # (sub_timeline_script_failure). Tyst kvalitetsförlust, mätt 2026-08-18.
    gsap = skill_assets / "vendor" / "gsap.min.js"
    if gsap.exists():
        shutil.copy2(gsap, dest / gsap.name)
        kopierade.append(gsap.name)
    else:
        saknade.append(gsap.name)

    (dest / "palett.json").write_text(json.dumps(palett(brand), indent=2, ensure_ascii=False))

    p = palett(brand)
    print(f"brand-källa: {src}")
    print(f"kopierat till: {dest}  ({len(kopierade)} filer)")
    print(f"  accent {p['A']} / {p['AB']}   bas {p['BAS']}   yta {p['YTA']}   font {p['FONT']}")
    print(f"  CTA: yta {p['CTA_YTA']} + text {p['CTA_TEXT']} (aldrig vit text på smaragd)")
    lager_ok = all((dest / n).exists() for n in MASKOT_LAGER)
    print(f"  maskotlager kompletta: {'JA' if lager_ok else 'NEJ — gestanimationen faller tillbaka på master'}")
    if saknade:
        print(f"  SAKNAS i källan: {', '.join(saknade)}")
    # Ingen substrängmatchning på doseringstexten: den formuleringen ändras, och en
    # naiv sökning på "intro/outro" började ljuga så fort regeln skrevs om till
    # "inte låst till intro/outro" (2026-08-18). Skriv ut regeln i sin helhet i
    # stället och låt läsaren tolka den.
    dos = brand.get("mascot", {}).get("dosering", "")
    if dos:
        print("  doseringsregel ur brand.json (läs den, tolka inte rubriken):")
        for rad in textwrap.wrap(dos, 96):
            print(f"    {rad}")


if __name__ == "__main__":
    main()
