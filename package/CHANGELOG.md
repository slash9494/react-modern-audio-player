# React-modern-audio-player

## v2.0.0 (Unreleased)

### Breaking Changes

- **`SpectrumProvider` renamed to `AudioPlayerRootProvider`**: import name changed
  - Before: `import { SpectrumProvider } from "react-modern-audio-player"`
  - After: `import { AudioPlayerRootProvider } from "react-modern-audio-player"`
- **`SpectrumProviderProps` renamed to `AudioPlayerRootProviderProps`**: type import name changed
  - Before: `import type { SpectrumProviderProps } from "react-modern-audio-player"`
  - After: `import type { AudioPlayerRootProviderProps } from "react-modern-audio-player"`
- **`AudioPlayerRootProviderProps.rootContainerProps` type changed**: `ProviderProps` (React Spectrum) → `HTMLAttributes<HTMLDivElement>`

  - If you were passing Spectrum-specific props (e.g. `colorScheme`, `locale`), replace them with standard HTML div attributes.

- **`styled-components` moved to `peerDependencies`**: consumers must install `styled-components ^5.3.5` explicitly if not already present.

### Bug Fixes

- **Theme color switching**: system dark/light theme changes now correctly update progress bar, volume slider, shadow, and waveform colors
- **Progress bar handle position**: handle no longer drifts when player placement changes (replaced JS-based width tracking with CSS container query units)
- **Waveform progress rendering**: waveform blue progress layer now redraws correctly on container resize and placement changes
- **Waveform theme re-initialization**: waveform canvas re-creates with correct colors when system color scheme changes

### Bundle Size Optimization

| Change                       | Before                       | After                        | Saving              |
| ---------------------------- | ---------------------------- | ---------------------------- | ------------------- |
| `@react-spectrum/*` (4 pkgs) | bundled (~20–30 kB)          | removed — native HTML + CSS  | ~20–30 kB           |
| `react-icons` (3 icon sets)  | bundled (~15–25 kB)          | removed — 12 inlined SVGs    | ~15–25 kB           |
| `wavesurfer.js`              | always bundled (~192 kB raw) | lazy chunk, loaded on demand | ~192 kB from main   |
| `styled-components`          | bundled                      | moved to `peerDependencies`  | ~15 kB              |
| `sideEffects`                | not set                      | `false`                      | better tree-shaking |
| **Main bundle (gzip)**       | **~65 kB+**                  | **~16 kB**                   | **~75% reduction**  |

- **`ElementRefs.trackCurTimeEl` removed**: `HTMLSpanElement | undefined` → removed

  - Time display is now driven by `curAudioState.currentTime` via React state. Remove any direct access to this ref.

- **`ElementRefs.trackDurationEl` removed**: `HTMLSpanElement | undefined` → removed

  - Duration display is now driven by `curAudioState.duration` via React state. Remove any direct access to this ref.

- **`ElementRefs.progressBarEl` removed**: `HTMLDivElement | undefined` → removed

  - Progress bar width is now measured locally within the component. Remove any direct access to this ref.

- **`ElementRefs.progressValueEl` removed**: `HTMLDivElement | undefined` → removed

  - Progress fill is now driven by inline `style` bound to `curAudioState.currentTime`. Remove any direct access to this ref.

- **`ElementRefs.progressHandleEl` removed**: `HTMLDivElement | undefined` → removed

  - Progress handle is now driven by inline `style` bound to `curAudioState.currentTime`. Remove any direct access to this ref.

- **`AudioData.name` type narrowed**: `string | ReactNode` → `string`
  - If you were passing a ReactNode as `name`, use `customTrackInfo` instead
- **`AudioData.writer` type narrowed**: `string | ReactNode` → `string`
  - If you were passing a ReactNode as `writer`, use `customTrackInfo` instead

---

## v1.2.1

### apply release git action
