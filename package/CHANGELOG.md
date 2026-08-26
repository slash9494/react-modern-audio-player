# React-modern-audio-player

## v2.4.3 - 2026-08-16

### 🐛 Fixed

- **Compound slots were ignored in published builds**: `<AudioPlayer.Progress />` and every other slot rendered without the placement it was given once an app was built for production. Development builds were unaffected, so this only showed up after deploying.
- **Layout broke when controls were switched off or re-placed**: turning a control off through `activeUI`, or giving a slot a `gridArea`, could shift the remaining controls sideways, pile them all into one spot, leave the progress bar unable to stretch, or — from a single mistyped `gridArea` — collapse the whole layout. Positions now hold, and a value the player cannot read costs only that one control its place.
- **A re-placed slot displaced the built-in one**: rendering a compound copy while its preset counterpart is still on (the documented additive mode) left the preset control without a place to sit. Both now keep their own.

## v2.4.2 - 2026-07-25

### 🐛 Fixed

- **Drag seeking now continues outside the progress bar**: once a seek drag starts, moving the pointer off the bar (or releasing anywhere on the page) is tracked via document-level listeners, so the drag no longer aborts when the cursor leaves the bar. `onMouseLeave` now only clears the hover tooltip.
- **Oversize probe no longer caches transient failures**: a failed `HEAD` size probe (no response / missing `Content-Length`) is no longer cached permanently, so a later attempt can retry. Successful probes are still cached and deduped, and the probe cache is now bounded.
- **Waveform fallback stuck after advancing from a long-form/live track**: auto-advancing to the next track (via `onEnded` or the next control) kept `isLoadedMetaData` set, so the progress bar kept reading the previous long-form/live track's duration and stayed on the `faux`/`live` bar fallback until the new track's metadata loaded. `NEXT_AUDIO` now resets `isLoadedMetaData` when the track actually changes, matching the shuffle and previous-track paths, while leaving a single-track repeat-`ALL` loop (same `src`, no reload) untouched so its progress bar stays live.

## v2.4.1 - 2026-07-21

### 🐛 Fixed

- **Hover time tooltip clipped near track ends**: the tooltip is centered on the cursor, so close to the start/end half of it overflowed the progress wrapper and was cut off by its `overflow` clip (only partial text like `:00` showed). Its horizontal position is now clamped to stay fully inside the track.

## v2.4.0 - 2026-07-21

### ✨ Added

- **Long-form & live stream support**: the player now auto-detects long-form and live tracks and falls back from the waveform to a standard seekable bar, so multi-hour files no longer stall the Web Audio decode and endless streams no longer leak `Infinity:NaN` into the UI. Fallback triggers on a live stream, a duration over **30 minutes**, or a file over **50 MB** (probed via a `HEAD` request). Four optional, non-breaking `AudioData` fields tune it: `isLive` (skip decode, disable seeking, hide the duration), `duration` (early length hint / force the bar), `peaks` (server-precomputed samples that render the real waveform with no client decode), and `preload`. Existing playlists are unaffected; `getTime` shows `--:--` for non-finite input and `H:MM:SS` for hour-plus tracks.
- **Hover time tooltip**: hovering or dragging either progress type (bar or waveform) shows a floating time label at the pointer position, YouTube-style. Hidden for live streams (where seeking is disabled) and until metadata loads; decorative only for assistive tech (`aria-valuetext` already announces the position). The tooltip auto-flips above or below the progress bar based on the player's position in the viewport, so it stays visible when the player is placed at the top.
- **Tooltip color token**: new `--rm-audio-player-tooltip-background` CSS variable to theme the hover tooltip surface independently (defaults: `#f2f2f2` light / `#2c2c2c` dark).
- **Tooltip placement override**: pin the hover tooltip above or below the bar with `placement.timeTooltip` (`"top" | "bottom"`); when unset it keeps the automatic viewport-based detection.

### 🔄 Changed

- **Time display & tooltip fonts are now overridable**: dropped the `!important` flags on the track-time font/size so consumers can restyle the time display and hover tooltip via CSS. Both still default to `monospace` for stable digit width — override `.rmap-track-time-container` / `.rmap-progress-tooltip` to change it.
