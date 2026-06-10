# Hero-video

Lägg hero-videon här med filnamnet exakt: **`hero.mp4`**

Startsidans hero (`bahkobyra/index.html`) pekar på `/media/hero.mp4` och spelar den
automatiskt (loopad, ljudlös). Saknas filen visas poster-bilden istället — sajten
ser hel ut ändå.

## Så laddar du upp (GitHub i webbläsaren)

1. Ladda ner videon från Google Drive till din dator
2. Gå till github.com/BahkoStudio/BahkoByra → mappen `bahkobyra/media/`
3. **Add file → Upload files** → släpp `hero.mp4` → Commit till `main`
4. Vercel bygger om automatiskt — videon är live inom ett par minuter

## Rekommenderad komprimering (för snabb laddning)

- 1080p, H.264 (MP4), utan ljudspår, mål: under ~15 MB
- Med ffmpeg: `ffmpeg -i input.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4`
- `-movflags +faststart` är viktigt — videon börjar spela innan hela filen laddats
- Max 100 MB (GitHubs filgräns), men håll den långt under för mobilbesökare
