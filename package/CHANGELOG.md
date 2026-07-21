# React-modern-audio-player

## v2.4.0 - 2026-07-21

### ✨ New Features

- **Hover time tooltip**: hovering or dragging either progress type (bar or waveform) shows a floating time label at the pointer position, YouTube-style. Hidden for live streams (where seeking is disabled) and until metadata loads; decorative only for assistive tech (`aria-valuetext` already announces the position). The tooltip auto-flips above or below the progress bar based on the player's position in the viewport, so it stays visible when the player is placed at the top.
- **Tooltip color token**: new `--rm-audio-player-tooltip-background` CSS variable to theme the hover tooltip surface independently (defaults: `#f2f2f2` light / `#2c2c2c` dark).
- **Tooltip placement override**: pin the hover tooltip above or below the bar with `placement.timeTooltip` (`"top" | "bottom"`); when unset it keeps the automatic viewport-based detection.

### 🔄 Changed

- **Time display & tooltip fonts are now overridable**: dropped the `!important` flags on the track-time font/size so consumers can restyle the time display and hover tooltip via CSS. Both still default to `monospace` for stable digit width — override `.rmap-track-time-container` / `.rmap-progress-tooltip` to change it.
