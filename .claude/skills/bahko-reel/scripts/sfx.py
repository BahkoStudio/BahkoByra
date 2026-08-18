#!/usr/bin/env python3
"""Bygger ett SFX-spår tidsatt till kortens beats.

Ljuden syntetiseras här i skriptet (ren stdlib, inga sampelbibliotek och inga
credits) och blandas in i compose_bahko.sh UNDER rösten. Syftet är att markera
att något händer på skärmen, inte att höras för sig: en whoosh när ett kort
kommer in, en pop när en siffra landar, ett tick per rad i en lista.

Nivå: topparna ligger på -18 dBFS. Rösten ska alltid dominera -- hörs SFX:en
tydligt är den för hög.

Usage:
    python scripts/sfx.py <beats.json> <out.m4a> [total_s]

beats.json skrivs av gen_bahko.py och ser ut så:
    [{"start": 0.80, "typ": "hook"}, {"start": 2.30, "typ": "graf"}, ...]
"""
from __future__ import annotations
import array, json, math, random, subprocess, sys, tempfile, wave
from pathlib import Path

SR = 48000
TOPP = 10 ** (-18 / 20)          # -18 dBFS

# Korttyp -> ljud. Okända typer får en whoosh: ett kort som kommer in ska höras.
LJUD_FOR_TYP = {
    "hook": "riser",
    "graf": "whoosh",
    "statgraf": "pop",
    "kundcase": "pop",
    "checklista": "tick3",
    "cta": "riser",
    "outro": "whoosh",
}


def env(n: int, attack: float, release: float) -> list[float]:
    """Envelope med kort attack och exponentiellt avfall — klickar inte."""
    a = max(1, int(n * attack))
    ut = []
    for i in range(n):
        if i < a:
            ut.append(i / a)
        else:
            x = (i - a) / max(1, n - a)
            ut.append(math.exp(-x / max(1e-6, release)))
    return ut


def whoosh(dur=0.34, seed=1) -> list[float]:
    """Vitt brus genom ett enpoligt lågpass vars brytfrekvens stiger."""
    rnd = random.Random(seed)
    n = int(SR * dur)
    e = env(n, 0.06, 0.30)
    ut, forra = [], 0.0
    for i in range(n):
        # brytfrekvensen går från mörk till ljus över ljudets längd
        alpha = 0.02 + 0.16 * (i / n)
        forra += alpha * (rnd.uniform(-1, 1) - forra)
        ut.append(forra * e[i] * 3.2)
    return ut


def pop(dur=0.16, grund=190.0) -> list[float]:
    """Sinus med överton och snabbt avfall: en siffra som landar."""
    n = int(SR * dur)
    e = env(n, 0.004, 0.16)
    ut = []
    for i in range(n):
        t = i / SR
        v = (math.sin(2 * math.pi * grund * t)
             + 0.4 * math.sin(2 * math.pi * grund * 2 * t))
        ut.append(v * e[i] * 0.6)
    return ut


def riser(dur=0.52) -> list[float]:
    """Stigande svep: används där ett beat ska kännas som en öppning."""
    n = int(SR * dur)
    ut = []
    fas = 0.0
    for i in range(n):
        x = i / n
        f = 200 + 700 * x * x
        fas += 2 * math.pi * f / SR
        amp = 0.20 + 0.55 * x
        # tona ut de sista 12 procenten så svepet inte kapas tvärt
        if x > 0.88:
            amp *= (1 - x) / 0.12
        ut.append(math.sin(fas) * amp)
    return ut


def tick(dur=0.012, seed=2) -> list[float]:
    rnd = random.Random(seed)
    n = int(SR * dur)
    e = env(n, 0.02, 0.10)
    return [rnd.uniform(-1, 1) * e[i] * 0.5 for i in range(n)]


# Relativ vikt per ljud EFTER att varje ljud toppnormaliserats. Utan detta steg
# bestämmer det längsta/starkaste ljudet (risern) den globala skalan och trycker
# ner resten: ticken mätte -48 dB mot risern -27 och blev ohörbar under rösten.
VIKT = {"riser": 1.00, "whoosh": 0.90, "pop": 0.85, "tick3": 0.80}


def toppnormalisera(s: list[float], mal: float) -> list[float]:
    topp = max((abs(v) for v in s), default=0.0)
    if topp <= 0:
        return s
    k = mal / topp
    return [v * k for v in s]


def bygg_ljud() -> dict:
    t = tick()
    rå = {
        "whoosh": whoosh(),
        "pop": pop(),
        "riser": riser(),
        # tre tick i följd: en rad i en lista som checkas av
        "tick3": t + [0.0] * int(SR * 0.14) + t + [0.0] * int(SR * 0.14) + t,
    }
    return {k: toppnormalisera(v, VIKT[k]) for k, v in rå.items()}


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    beats = json.loads(Path(sys.argv[1]).read_text())
    out = Path(sys.argv[2])
    if not beats:
        sys.exit("beats.json var tom")
    total = float(sys.argv[3]) if len(sys.argv) > 3 else max(b["start"] for b in beats) + 2.0

    ljud = bygg_ljud()
    buf = [0.0] * int(SR * (total + 0.6))
    lagda = {}
    for b in beats:
        namn = LJUD_FOR_TYP.get(b.get("typ", ""), "whoosh")
        s = ljud[namn]
        start = int(float(b["start"]) * SR)
        for i, v in enumerate(s):
            j = start + i
            if 0 <= j < len(buf):
                buf[j] += v
        lagda[namn] = lagda.get(namn, 0) + 1

    # Normalisera till -18 dBFS. Överlappande ljud kan annars summera över 1.0
    # och klippa; klippning i ett SFX-spår låter som ett fel i inspelningen.
    topp = max((abs(v) for v in buf), default=0.0)
    skala = (TOPP / topp) if topp > 0 else 0.0
    pcm = array.array("h", (int(max(-1.0, min(1.0, v * skala)) * 32767) for v in buf))

    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "sfx.wav"
        with wave.open(str(wav), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(pcm.tobytes())
        out.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["ffmpeg", "-y", "-i", str(wav), "-c:a", "aac", "-b:a", "160k",
                        "-ar", str(SR), str(out)],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"sfx: {len(beats)} träffar, {total:.2f}s -> {out}")
    for k, v in sorted(lagda.items()):
        print(f"  {k:8s} x{v}")
    print(f"  topp normaliserad till -18 dBFS (rösten ska dominera)")


if __name__ == "__main__":
    main()
