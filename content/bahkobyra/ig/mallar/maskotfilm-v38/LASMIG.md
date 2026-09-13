# Maskotfilmer v38 (2026-09-13)

Två reels, 24 s, 1080 x 1920, 24 fps, samma struktur som v37: klipp 1 (8 s), fryst sista ruta med inzoom (5,5 s), klipp 2 (8 s), DEMO-outro (3,8 s). Textbeats i Outfit, blip per beat, whoosh vid klippbyten, chime på outron. Ingen musik i filen, den läggs på i Instagram-appen.

Stillbilder: GPT Image 2.5 (gpt_image_2_5) sunburst, medium, 1k, 9:16, maskotens master som image_references. 1 credit per bild.
Klipp: seedance_2_5, mode omni_reference, start_image = stillbildens job_id, image_references = master, 8 s, 9:16, 1080p, generate_audio false. 72 credits per klipp (v37: 52). Presetförslaget IN THE DARK avböjs med declined_preset_id på generate_video (batchen kan inte avböja).

Textkorten (overlay-v38.html ?f=1|2&i=0..5, ?wm=1, ?bg=1) renderas lokalt i Edge/Playwright till 1080 x 1920 och laddas upp med media_upload (svaret listar uploads i samma ordning som filerna skickades, namnen är media-id, inte filnamnen). bygg-kommando.mjs skriver sandlådekommandot: skriptet som base64 plus argument. Kör med sandbox_exec background:true, polla loggen, media_confirm på mp4:n efter UPLOAD 200.

Kostnad v38: 4 stillbilder + 4 klipp = 292 credits. Leverans: Drive Planerat v38/reel 1.mp4 och reel 2.mp4 med captionfiler.
