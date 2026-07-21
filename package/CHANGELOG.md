# React-modern-audio-player

## v2.4.0 - 2026-07-21

### ✨ New Features

- **Long-form & live stream support**: the player now auto-detects long-form and live tracks and falls back from the waveform to a standard seekable bar, so multi-hour files no longer stall the Web Audio decode and endless streams no longer leak `Infinity:NaN` into the UI. Fallback triggers on a live stream, a duration over **30 minutes**, or a file over **50 MB** (probed via a `HEAD` request). Four optional, non-breaking `AudioData` fields tune it: `isLive` (skip decode, disable seeking, hide the duration), `duration` (early length hint / force the bar), `peaks` (server-precomputed samples that render the real waveform with no client decode), and `preload`. Existing playlists are unaffected; `getTime` shows `--:--` for non-finite input and `H:MM:SS` for hour-plus tracks.
- **Hover time tooltip**: hovering or dragging either progress type (bar or waveform) shows a floating time label at the pointer position, YouTube-style. Hidden for live streams (where seeking is disabled) and until metadata loads; decorative only for assistive tech (`aria-valuetext` already announces the position). The tooltip auto-flips above or below the progress bar based on the player's position in the viewport, so it stays visible when the player is placed at the top.
- **Tooltip color token**: new `--rm-audio-player-tooltip-background` CSS variable to theme the hover tooltip surface independently (defaults: `#f2f2f2` light / `#2c2c2c` dark).
- **Tooltip placement override**: pin the hover tooltip above or below the bar with `placement.timeTooltip` (`"top" | "bottom"`); when unset it keeps the automatic viewport-based detection.

### 🔄 Changed

- **Time display & tooltip fonts are now overridable**: dropped the `!important` flags on the track-time font/size so consumers can restyle the time display and hover tooltip via CSS. Both still default to `monospace` for stable digit width — override `.rmap-track-time-container` / `.rmap-progress-tooltip` to change it.
