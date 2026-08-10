// Vercel Blob video helpers — replaces JW Platform (content.jwplatform.com).
// All course/workout videos are public, unauthenticated files in Vercel Blob:
//   {mediaId}.mp4  -> original video (always present; the fallback)
//   {mediaId}.jpeg -> thumbnail/poster
//
// Optimized responsive renditions (added 2026-08 to cut Blob data-transfer cost):
//   {mediaId}_480.webm / _720.webm / _1080.webm  -> VP9, per-screen sizes
// These exist only for videos the batch worker has processed. A manifest lists which
// ids are optimized so we never request a rendition that isn't there:
//   {BLOB}/optimized-manifest.json  ->  { ids: ["aH1k32u9", ...] }
//
// Selection (owner-validated 2026-08): mobile 480p, desktop 720p; the original .mp4 is
// always the last <source>, so browsers without VP9/WebM — or videos not yet encoded —
// fall back automatically. Nothing breaks while the batch is still draining.
//
// mediaIds arrive in two shapes across the app's data:
//   new/plain: "3bac3y3F"
//   legacy JW signed-feed ref: "3bac3y3F.json?exp=...&sig=..."
// cleanMediaId strips the "." / "?" suffix so both resolve to the bare id.
import playlistMap from '../data/playlistMap.json';

export const BLOB_BASE = 'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com';

// ---- optimized-rendition manifest (which ids have _480/_720/_1080 webm) ----
// Fetched once at module load, cached in memory. Until it resolves, getVideoSources
// returns the original .mp4 only — safe. Video modals open well after app init, so in
// practice the manifest is loaded before the first play.
let optimizedIds = new Set();
try {
  fetch(`${BLOB_BASE}/optimized-manifest.json`, { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : null))
    .then((m) => { if (m && Array.isArray(m.ids)) optimizedIds = new Set(m.ids); })
    .catch(() => {});
} catch (_) { /* no fetch (very old env) — stay on originals */ }

// Pick the rendition tier for the current screen. Mobile (coarse pointer or small
// viewport) -> 480p; desktop -> 720p. Fullscreen upscaling to 1080p is handled by the
// player component (it can swap the source on fullscreenchange); the base pick is
// deliberately conservative because 480/720 tested visually identical to source.
export const pickTier = () => {
  if (typeof window === 'undefined') return '720';
  const coarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
  const smallViewport = Math.min(window.innerWidth || 9999, window.innerHeight || 9999) <= 820;
  return (coarse || smallViewport) ? '480' : '720';
};

// The 1080p tier is served only on a fullscreen player on a >=1080p physical display
// (1080/4K/Retina). The component calls this on fullscreenchange.
export const fullscreenTier = () => {
  if (typeof window === 'undefined' || !window.screen) return '720';
  const physical = Math.max(window.screen.width, window.screen.height) * (window.devicePixelRatio || 1);
  return physical >= 1080 ? '1080' : '720';
};

export const cleanMediaId = (id) => {
  const key = id ? String(id).split(/[.?]/)[0] : '';
  // Some AWS-exported catalog rows stringified a missing id into "null.json?exp=..."
  // — treat it as no video (VideoElement renders nothing) instead of a 404 player.
  return key === 'null' || key === 'undefined' ? '' : key;
};

export const isOptimized = (id) => optimizedIds.has(cleanMediaId(id));

export const renditionUrl = (id, tier) => {
  const mediaId = cleanMediaId(id);
  return mediaId ? `${BLOB_BASE}/${mediaId}_${tier}.webm` : '';
};

export const getVideoUrl = (id) => {
  const mediaId = cleanMediaId(id);
  return mediaId ? `${BLOB_BASE}/${mediaId}.mp4` : '';
};

export const getVideoThumbnail = (id) => {
  const mediaId = cleanMediaId(id);
  return mediaId ? `${BLOB_BASE}/${mediaId}.jpeg` : '';
};

// Ordered <source> list for a media id: the screen-right WebM rendition first (only
// when optimized), then the original .mp4 as universal fallback.
export const getVideoSources = (id) => {
  const mediaId = cleanMediaId(id);
  if (!mediaId) return [];
  const original = { src: `${BLOB_BASE}/${mediaId}.mp4`, type: 'video/mp4' };
  if (!optimizedIds.has(mediaId)) return [original];
  return [
    { src: renditionUrl(mediaId, pickTier()), type: 'video/webm' },
    original,
  ];
};

// Build a { id, src, sources, poster } playlist item from a raw mediaId.
export const toPlaylistItem = (id) => ({
  id: cleanMediaId(id),
  src: getVideoUrl(id),          // original — kept for any legacy consumer reading .src
  sources: getVideoSources(id),  // preferred: screen-right rendition + fallback
  poster: getVideoThumbnail(id),
});

// Resolve any id to an ordered list of real media IDs:
//   - a known playlist container  -> its ordered media IDs
//   - anything else (a plain id)  -> [id]
export const resolveMediaIds = (id) => {
  const key = cleanMediaId(id);
  if (!key) return [];
  const mapped = playlistMap[key];
  return mapped && mapped.length ? mapped : [key];
};

// Resolve any id to a VideoElement playlist ([{ id, src, sources, poster }]).
export const resolvePlaylist = (id) => resolveMediaIds(id).map(toPlaylistItem);
