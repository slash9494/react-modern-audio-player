# React-modern-audio-player

## v2.4.0 (Unreleased)

### ✨ New Features

- **Hover time tooltip**: hovering or dragging either progress type (bar or waveform) shows a floating time label at the pointer position, YouTube-style. Hidden for live streams (where seeking is disabled) and until metadata loads; decorative only for assistive tech (`aria-valuetext` already announces the position). The tooltip auto-flips above or below the progress bar based on the player's position in the viewport, so it stays visible when the player is placed at the top.
- **Tooltip color token**: new `--rm-audio-player-tooltip-background` CSS variable to theme the hover tooltip surface independently (defaults: `#f2f2f2` light / `#2c2c2c` dark).

### 🐛 Fixed

- **Tooltip dark-theme inversion**: the hover tooltip previously rendered a light background with dark text in dark mode (its colors were mapped to the wrong theme tokens). It now follows the theme like the rest of the UI — dark surface + light text in dark mode — and its label is center-aligned. Consumers who recolored the tooltip through `--rm-audio-player-text-color` / `--rm-audio-player-interface-container` should use the new `--rm-audio-player-tooltip-background` instead.
