import React, { useState, useEffect, useRef } from 'react';
import { logEvent } from '../../util/clientLogger';

// Native <video> player that replaces ReactJWPlayer app-wide.
//
// props:
//   playlist:   array of { src, sources, poster } — plays sequentially, AUTO-ADVANCING
//               to the next item on `ended` (matches JW's follow-along behavior).
//               Single-video callers just pass a one-item array. `sources` (when present)
//               is the preferred ordered <source> list (screen-right WebM rendition, then
//               the .mp4 fallback); `src` is the .mp4 fallback and the last resort.
//   autoPlay:   default true
//   onComplete: called when the final item finishes
//   style:      merged into the <video> inline style
//
// The current index resets to 0 only when the actual sequence of srcs changes
// (a signature), so passing a freshly-built inline array each render does NOT
// interrupt an in-progress auto-advancing playlist.
//
// Telemetry: every event logs the ACTUAL playing source (video.currentSrc — reveals
// whether the optimized .webm or the .mp4 fallback is playing) plus the playback
// position/duration, so a benign buffering blip (stall -> playing) is distinguishable
// from a true cut-off (stall that never resumes -> my.video.stuck).
const VideoElement = ({ playlist = [], autoPlay = true, onComplete, style }) => {
  const [index, setIndex] = useState(0);
  const stuckTimerRef = useRef(null);
  const lastPosRef = useRef(0);

  const signature = playlist.map((p) => p && p.src).join('|');

  const clearStuck = () => {
    if (stuckTimerRef.current) {
      clearTimeout(stuckTimerRef.current);
      stuckTimerRef.current = null;
    }
  };

  useEffect(() => {
    setIndex(0);
    // Silent-failure detector: a non-empty playlist whose items ALL resolve to an
    // empty src means the upstream data gave us undefined mediaId(s) — a blank modal
    // with no <video> and no native onError. Fires once per distinct playlist.
    if (playlist.length && !playlist.some((p) => p && p.src)) {
      logEvent('my.video.missing_src', {
        level: 'warn',
        component: 'VideoElement',
        total: playlist.length,
      });
    }
    return clearStuck; // cancel any pending watchdog when the playlist changes / unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  if (!playlist.length) return null;

  const current = playlist[Math.min(index, playlist.length - 1)];
  if (!current || !current.src) return null;

  // Actual playing source + position from the <video> element (not the mp4 fallback label).
  const info = (e) => {
    const v = e && e.target;
    return {
      component: 'VideoElement',
      src: (v && v.currentSrc) || current.src,
      position: v && isFinite(v.currentTime) ? Math.round(v.currentTime) : null,
      duration: v && isFinite(v.duration) ? Math.round(v.duration) : null,
    };
  };

  // A stall/waiting that doesn't resume within 12s (and isn't a finish or a user pause) is
  // a real "stuck" — the event that maps to the "video cut off" complaints.
  const armStuck = (e) => {
    const v = e && e.target;
    if (v && isFinite(v.currentTime)) lastPosRef.current = v.currentTime;
    clearStuck();
    stuckTimerRef.current = setTimeout(() => {
      if (!v || v.ended || v.paused) return;
      if (v.currentTime > lastPosRef.current + 0.25) return; // progressed -> recovered
      logEvent('my.video.stuck', {
        level: 'warn',
        component: 'VideoElement',
        src: v.currentSrc || current.src,
        position: isFinite(v.currentTime) ? Math.round(v.currentTime) : null,
        duration: isFinite(v.duration) ? Math.round(v.duration) : null,
      });
    }, 12000);
  };

  const handleEnded = (e) => {
    clearStuck();
    logEvent('my.video.ended', info(e));
    if (index < playlist.length - 1) setIndex(index + 1);
    else if (onComplete) onComplete();
  };

  return (
    <video
      key={`${index}-${current.src}`}
      controls
      autoPlay={autoPlay}
      playsInline
      poster={current.poster}
      onEnded={handleEnded}
      onLoadStart={(e) => { clearStuck(); logEvent('my.video.loadstart', info(e)); }}
      onPlaying={(e) => { clearStuck(); logEvent('my.video.playing', info(e)); }}
      onTimeUpdate={(e) => {
        const v = e.target;
        if (v && isFinite(v.currentTime)) lastPosRef.current = v.currentTime;
        clearStuck(); // progressing -> cancel any armed stuck-watchdog
      }}
      onWaiting={(e) => { logEvent('my.video.waiting', { level: 'warn', ...info(e) }); armStuck(e); }}
      onStalled={(e) => { logEvent('my.video.stalled', { level: 'warn', ...info(e) }); armStuck(e); }}
      onError={(e) => { clearStuck(); logEvent('my.video.error', { level: 'error', ...info(e), index, total: playlist.length }); }}
      style={{ width: '100%', display: 'block', ...style }}
    >
      {(current.sources && current.sources.length
        ? current.sources
        : [{ src: current.src, type: 'video/mp4' }]
      ).map((s, i) => (
        <source key={i} src={s.src} type={s.type} />
      ))}
    </video>
  );
};

export default VideoElement;
