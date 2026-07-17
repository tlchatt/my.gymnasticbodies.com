// Vercel Blob video helpers — replaces JW Platform (content.jwplatform.com).
// All course/workout videos are public, unauthenticated files in Vercel Blob:
//   {mediaId}.mp4  -> video
//   {mediaId}.jpeg -> thumbnail/poster
//
// mediaIds arrive in two shapes across the app's data:
//   new/plain: "3bac3y3F"
//   legacy JW signed-feed ref: "3bac3y3F.json?exp=...&sig=..."
// cleanMediaId strips the "." / "?" suffix so both resolve to the bare id.

// Some course data references a JW *playlist container* ID (e.g. classInfo.playLists)
// rather than a video's own media ID. JW's feed endpoint played the whole playlist;
// Blob only holds real media IDs. playlistMap maps each known container ID to its
// ordered media IDs (first = primary "Follow Along"). See CLAUDE.md "Video data sources".
import playlistMap from '../data/playlistMap.json';

export const BLOB_BASE = 'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com';

export const cleanMediaId = (id) => (id ? String(id).split(/[.?]/)[0] : '');

export const getVideoUrl = (id) => {
  const mediaId = cleanMediaId(id);
  return mediaId ? `${BLOB_BASE}/${mediaId}.mp4` : '';
};

export const getVideoThumbnail = (id) => {
  const mediaId = cleanMediaId(id);
  return mediaId ? `${BLOB_BASE}/${mediaId}.jpeg` : '';
};

// Build a { src, poster } playlist item from a raw mediaId.
export const toPlaylistItem = (id) => ({
  src: getVideoUrl(id),
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

// Resolve any id to a VideoElement playlist ([{ src, poster }]).
export const resolvePlaylist = (id) => resolveMediaIds(id).map(toPlaylistItem);
