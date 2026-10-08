/* ===========================================================================
   LEVANDE FLÖDEN — valfritt, bara för demos som slår på dem i data.
   Hämtas på SERVERN (ingen klient-JS), cachas med revalidate (standard 6 h).
   Nycklar och flödes-URL:er läses ur process.env och ligger ALDRIG i repot
   (repot är publikt). Varje funktion returnerar null när nyckel saknas eller
   källan inte svarar — då ritar mallen dagens statiska innehåll oförändrat.

   data.omdomen.levande = {
     google: { placeId?, sok?, cid?, nyckelEnv? = 'GOOGLE_PLACES_KEY', cacheSek? },
     reco:   { urlEnv },          // hela API-URL:en från Reco (med nyckel) i env
     max?,                        // antal kort totalt (standard 6)
   }
   data.instagram.levande = { env, antal? = 3 }
     env-värdet är antingen en Behold JSON-flödes-URL (https://feeds.behold.so/…)
     eller en Instagram-token (Instagram API med Instagram-inloggning).

   Inget här får bli JSON-LD (Review/AggregateRating står på svartlistan).
   Fältbeskrivning: ~/.claude/skills/hemsidor/SKILL.md
   =========================================================================== */

const SEX_TIMMAR = 21600;

async function hamtaJson(url, init = {}, cacheSek = SEX_TIMMAR) {
  try {
    const cache = cacheSek === 0 ? { cache: 'no-store' } : { next: { revalidate: cacheSek } };
    const svar = await fetch(url, { ...init, ...cache, signal: AbortSignal.timeout(8000) });
    if (!svar.ok) return null;
    return await svar.json();
  } catch {
    return null;
  }
}

const textOk = (s) => typeof s === 'string' && s.trim().length > 0;

/* Google: Places API (New). Place Details med fälten reviews, rating,
   userRatingCount och googleMapsUri = SKU:n Place Details Enterprise + Atmosphere.
   Högst 5 omdömen, i Googles relevansordning. place_id får lagras (Googles
   villkor), resten hämtas om. Saknas placeId: Text Search med bara places.id
   (IDs Only), och cid kontrolleras mot googleMapsUri så att fel firma aldrig visas. */
export async function googleOmdomen(cfg) {
  if (!cfg) return null;
  const nyckel = process.env[cfg.nyckelEnv || 'GOOGLE_PLACES_KEY'];
  if (!nyckel) return null;
  // Bara för test mot en lokal fejkserver; utelämnas i drift.
  const bas = process.env.GOOGLE_PLACES_BAS || 'https://places.googleapis.com/v1';
  const sek = cfg.cacheSek ?? SEX_TIMMAR;
  let id = cfg.placeId;
  if (!id && cfg.sok) {
    const sok = await hamtaJson(`${bas}/places:searchText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': nyckel, 'X-Goog-FieldMask': 'places.id' },
      body: JSON.stringify({ textQuery: cfg.sok, languageCode: 'sv', regionCode: 'SE' }),
    }, sek);
    id = sok?.places?.[0]?.id;
  }
  if (!id) return null;
  const p = await hamtaJson(`${bas}/places/${encodeURIComponent(id)}?languageCode=sv&regionCode=SE`, {
    headers: { 'X-Goog-Api-Key': nyckel, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' },
  }, sek);
  if (!p) return null;
  if (cfg.cid && typeof p.googleMapsUri === 'string' && p.googleMapsUri.includes('cid=') && !p.googleMapsUri.includes(`cid=${cfg.cid}`)) return null;
  const lista = (p.reviews || [])
    .map((r) => ({
      id: r.name,
      namn: r.authorAttribution?.displayName,
      profil: r.authorAttribution?.uri,
      foto: r.authorAttribution?.photoUri,
      betyg: r.rating,
      kalla: r.relativePublishTimeDescription,
      // Originaltexten: recensentens egna ord, inte Googles översättning.
      text: r.originalText?.text || r.text?.text,
      lank: r.googleMapsUri || p.googleMapsUri,
      google: true,
      maps: true,
    }))
    .filter((r) => textOk(r.namn) && textOk(r.text));
  if (!lista.length && !p.rating) return null;
  return { betyg: p.rating, antal: p.userRatingCount, uri: p.googleMapsUri, lista };
}

/* Reco: ingen öppen API-dokumentation. Recos egen WordPress-plugin (reco-widget)
   läser JSON från api.reco.se med företags-id och API-nyckel som Reco lämnar ut.
   Hela URL:en ligger i env. Formatet tolkas tolerant: reviews[] med
   reviewer.screenName, text, grade och created (ms). Skrapa aldrig reco.se. */
export async function recoOmdomen(cfg) {
  if (!cfg?.urlEnv) return null;
  const url = process.env[cfg.urlEnv];
  if (!url) return null;
  const j = await hamtaJson(url, {}, cfg.cacheSek ?? SEX_TIMMAR);
  const rader = Array.isArray(j) ? j : j?.reviews || j?.items || j?.recos;
  if (!Array.isArray(rader)) return null;
  const lista = rader
    .map((r, i) => {
      const datum = typeof r.created === 'number' ? new Date(r.created) : r.created ? new Date(r.created) : null;
      return {
        id: `reco-${r.id ?? i}`,
        namn: r.reviewer?.screenName || r.reviewer?.name || r.name,
        betyg: typeof r.grade === 'number' ? r.grade : typeof r.rating === 'number' ? r.rating : undefined,
        kalla: datum && !Number.isNaN(+datum) ? `Reco · ${datum.toISOString().slice(0, 10)}` : 'Reco',
        text: r.text || r.body,
      };
    })
    .filter((r) => textOk(r.namn) && textOk(r.text));
  return lista.length ? { lista } : null;
}

/* Instagram: Behold JSON-flöde (bilderna ligger på Beholds CDN och går inte ut)
   eller en egen token mot graph.instagram.com (bild-URL:erna från Instagrams CDN
   går ut efter en tid och token måste förnyas var 60:e dag — Behold är enklare). */
export async function instagramInlagg(cfg) {
  if (!cfg?.env) return null;
  const varde = process.env[cfg.env];
  if (!varde) return null;
  const antal = cfg.antal || 3;
  const sek = cfg.cacheSek ?? SEX_TIMMAR;
  let poster;
  if (/^https?:\/\//.test(varde)) {
    const j = await hamtaJson(varde, {}, sek);
    poster = (Array.isArray(j) ? j : j?.posts || [])
      .map((p) => ({
        id: p.id,
        lank: p.permalink,
        bild: p.sizes?.medium?.mediaUrl || (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl),
        text: p.prunedCaption || p.caption || '',
      }));
  } else {
    const f = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const j = await hamtaJson(`https://graph.instagram.com/me/media?fields=${f}&limit=12&access_token=${encodeURIComponent(varde)}`, {}, sek);
    poster = (j?.data || []).map((p) => ({
      id: p.id,
      lank: p.permalink,
      bild: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      text: p.caption || '',
    }));
  }
  const ut = poster.filter((p) => p.id && p.bild && /^https:\/\/(www\.)?instagram\.com\//.test(p.lank || '')).slice(0, antal);
  return ut.length >= antal ? ut : null;
}

// Bildtexten kortad vid ett ordslut, så att korten blir lika höga.
export function kortaText(s, max = 140) {
  const t = (s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(' ', max) > 60 ? t.lastIndexOf(' ', max) : max)} …`;
}
