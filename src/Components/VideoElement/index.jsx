import React, { useState, useEffect } from 'react';
import { logEvent } from '../../util/clientLogger';

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
    // Silent-failure detector: a non-empty playlist whose items ALL resolve to an
    // empty src means the upstream data gave us undefined mediaId(s). This renders a
    // blank modal with no <video> and no native onError — exactly the "videos won't
    // load" reports we can't otherwise see. Fires once per distinct playlist.
    if (playlist.length && !playlist.some((p) => p && p.src)) {
      logEvent('my.video.missing_src', {
        level: 'warn',
        component: 'VideoElement',
        total: playlist.length,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      onError={() => logEvent('my.video.error', {
        level: 'error',
        component: 'VideoElement',
        src: current.src,
        index,
        total: playlist.length,
      })}
      onStalled={() => logEvent('my.video.stalled', {
        level: 'warn',
        component: 'VideoElement',
        src: current.src,
      })}
      style={{ width: '100%', display: 'block', ...style }}
    />
  );
};

export default VideoElement;
