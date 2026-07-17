import React, { useState, useEffect } from 'react';

// Native <video> player that replaces ReactJWPlayer app-wide.
//
// props:
//   playlist:   array of { src, poster } — plays sequentially, AUTO-ADVANCING to
//               the next item on `ended` (matches JW's follow-along behavior).
//               Single-video callers just pass a one-item array.
//   autoPlay:   default true
//   onComplete: called when the final item finishes
//   style:      merged into the <video> inline style
//
// The current index resets to 0 only when the actual sequence of srcs changes
// (a signature), so passing a freshly-built inline array each render does NOT
// interrupt an in-progress auto-advancing playlist, and switching a single
// video's source (e.g. Strength <-> Mobility, or a technical tip) restarts
// playback correctly.
const VideoElement = ({ playlist = [], autoPlay = true, onComplete, style }) => {
  const [index, setIndex] = useState(0);

  const signature = playlist.map((p) => p && p.src).join('|');

  useEffect(() => {
    setIndex(0);
  }, [signature]);

  if (!playlist.length) return null;

  const current = playlist[Math.min(index, playlist.length - 1)];
  if (!current || !current.src) return null;

  const handleEnded = () => {
    if (index < playlist.length - 1) {
      setIndex(index + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <video
      key={`${index}-${current.src}`}
      controls
      autoPlay={autoPlay}
      playsInline
      poster={current.poster}
      src={current.src}
      onEnded={handleEnded}
      onError={(err) => console.log('VideoElement onError', err)}
      style={{ width: '100%', display: 'block', ...style }}
    />
  );
};

export default VideoElement;
