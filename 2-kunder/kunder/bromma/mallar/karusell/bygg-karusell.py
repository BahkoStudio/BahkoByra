"""Brommas karusellmall, design v5 (2026-10-13, efter Mathias referens).
Foto överst (1080x720), mörk panel under: grön etikett med streck, tung Archivo-rubrik,
en rad förklaring, ev. rutavdragsmarkering, sedan linje + lövloggan till vänster och "Svep →"
till höger. Sidräknaren ligger som en piller uppe till höger på fotot.

Anrop: python bygg-karusell.py <veckomapp>   (mappen ska innehålla text.py och k1/photo1.png ...)
text.py definierar TXT = {'k1': [(etikett, rubrik, förklaring, rut), ...], ...}
rut: 'ja' | 'nej' | 'delvis' | None
"""
import io, os, sys, importlib.util

BAS = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
spec = importlib.util.spec_from_file_location("text", os.path.join(BAS, "text.py"))
text = importlib.util.module_from_spec(spec); spec.loader.exec_module(text)
LOGGA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "logo.svg").replace("\\", "/")

RUT = {
 'ja': '<span class="pill ja">✓ Ger rutavdrag</span>',
 'nej': '<span class="pill nej">✕ Inget rutavdrag</span>',
 'delvis': '<span class="pill delvis">Delvis rutavdrag</span>',
}

TPL = """<!DOCTYPE html><html lang="sv"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;background:#0E120F;font-family:'Archivo','Segoe UI Symbol',sans-serif;color:#FFFFFF;
  font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0,'calt' 0;display:flex;flex-direction:column}
.foto{position:relative;height:720px;flex:none}
.foto img{width:1080px;height:720px;object-fit:cover;display:block}
.foto:after{content:"";position:absolute;left:0;right:0;bottom:0;height:120px;background:linear-gradient(180deg,rgba(14,18,15,0),#0E120F)}
.sid{position:absolute;top:36px;right:36px;background:rgba(14,18,15,.72);color:#E8ECE6;font-weight:700;font-size:26px;
  padding:8px 18px;border-radius:100px;letter-spacing:.02em}
.panel{flex:1;display:flex;flex-direction:column;padding:28px 72px 56px}
.etikett{display:flex;align-items:center;gap:16px;color:#8FD16A;font-weight:800;font-size:26px;letter-spacing:.2em;text-transform:uppercase}
.etikett:before{content:"";width:6px;height:30px;background:#8FD16A;border-radius:2px}
h1{margin-top:24px;font-weight:800;font-size:__HS__px;line-height:1.06;letter-spacing:-.012em;text-wrap:balance}
.fork{margin-top:22px;color:#C9CFC6;font-weight:500;font-size:__FS__px;line-height:1.36;text-wrap:pretty}
.pill{display:inline-block;margin-top:24px;font-weight:800;font-size:25px;padding:9px 20px;border-radius:100px;align-self:flex-start}
.pill.ja{background:#8FD16A;color:#0E120F}
.pill.nej{background:#F2EFE9;color:#8A2E1E}
.pill.delvis{color:#F2EFE9;border:2.5px solid #F2EFE9}
.fot{margin-top:auto;border-top:2px solid #232A25;padding-top:28px;display:flex;justify-content:space-between;align-items:center}
.fot img{height:76px}
.fot .svep{color:#8FD16A;font-weight:800;font-size:32px}
</style></head><body>
<div class="foto"><img src="__FOTO__"><span class="sid">__I__/__N__</span></div>
<div class="panel">
  <div class="etikett">__E__</div>
  <h1>__H__</h1>
  <div class="fork">__F__</div>
  __PILL__
  <div class="fot"><img src="__LOGGA__"><span class="svep">__SVEP__</span></div>
</div>
</body></html>"""

def esc(s): return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

os.makedirs(f"{BAS}/html", exist_ok=True)
for d, rows in text.TXT.items():
    n = len(rows)
    for i, (e, h, f, rut) in enumerate(rows, start=1):
        hs = 84 if i == 1 else (74 if len(h) < 34 else 66)
        fs = 36 if len(f) < 70 else 33
        svep = 'Svep →' if i < n else 'Ring nu'
        html = (TPL.replace('__FOTO__', f"../{d}/photo{i}.png").replace('__I__', str(i)).replace('__N__', str(n))
                   .replace('__E__', esc(e)).replace('__H__', esc(h)).replace('__F__', esc(f))
                   .replace('__PILL__', RUT.get(rut, '')).replace('__HS__', str(hs)).replace('__FS__', str(fs))
                   .replace('__LOGGA__', "file:///" + LOGGA).replace('__SVEP__', svep))
        io.open(f"{BAS}/html/{d}-{i}.html", 'w', encoding='utf-8').write(html)
print(f"{sum(len(r) for r in text.TXT.values())} html-filer skrivna")
