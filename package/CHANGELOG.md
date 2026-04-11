# React-modern-audio-player

## v2.0.0-beta.1 (2026-04-09)

### ✨ New Features

- **`colorScheme` prop**: forces the player to render in `"light"` or `"dark"` mode regardless of the OS `prefers-color-scheme` setting. When omitted, the player follows the OS preference (existing behavior). The provider applies a `data-theme` attribute on the root container, and the WaveSurfer instance is automatically re-initialized when the prop changes so waveform colors stay in sync.

  ```tsx
  // ❌ Before — native CSS property, did not actually toggle the theme
  <AudioPlayer rootContainerProps={{ style: { colorScheme: "dark" } }} />

  // ✅ After — top-level prop, drives `[data-theme]` + wavesurfer re-init
  <AudioPlayer colorScheme="dark" />
  ```

- **`useAudioPlayer()` public hook**: exposes a stable API to control the player externally
  - Returns `play`, `pause`, `togglePlay`, `next`, `prev`, `seek`, `setVolume`, `setTrack`
  - Returns state: `isPlaying`, `volume`, `currentTime`, `duration`, `repeatType`, `muted`, `currentTrack`, `currentIndex`, `playList`
  - Must be called inside `AudioPlayerProvider` (or `AudioPlayer` which wraps it)
- **Domain-specific sub-hooks**: Fine-grained alternatives to `useAudioPlayer` that subscribe to only the context slice they need, minimizing re-renders:
  - `useAudioPlayerPlayback()` — playback state and controls
  - `useAudioPlayerTrack()` — playlist and track navigation
  - `useAudioPlayerVolume()` — volume and mute controls
  - `useAudioPlayerTime()` — current time, duration, and seek
  - `useAudioPlayerElement()` — raw `audioEl` and `waveformInst` refs (advanced)
- **`useAudioPlayer().toggleMute()`**: Facade now exposes `toggleMute` from the volume sub-hook.
- **Conditional progress rendering**: `WaveformProgress` and `BarProgress` are now conditionally rendered based on `activeUI.progress` instead of rendering both and toggling via CSS. Only the active component is mounted.

### 🐛 Bug Fixes

- **WaveSurfer memory leak on unmount**: `waveformInst.destroy()` was never called due to a stale closure in the cleanup effect. Fixed by tracking the instance via `useRef`.
- **Theme color switching**: system dark/light theme changes now correctly update progress bar, volume slider, shadow, and waveform colors
- **Progress bar handle position**: handle no longer drifts when player placement changes (replaced JS-based width tracking with CSS container query units)
- **Waveform progress rendering**: waveform blue progress layer now redraws correctly on container resize and placement changes
- **Waveform theme re-initialization**: waveform canvas re-creates with correct colors when system color scheme changes
- **`useDidUpdateEffect` StrictMode fix**: boolean ref was flipped inside deps effect causing premature execution on React 18 StrictMode's setup₁→cleanup₁→setup₂ cycle. Fixed by separating mount tracking into its own empty-deps effect.
- **Volume reset on source load**: browser resets volume to 1.0 when loading a new audio source. Volume is now re-applied after `loadedmetadata`.
- **`audioInitialState` not applied correctly** (Fixes [#9](https://github.com/slash9494/react-modern-audio-player/issues/9))
- **Generic type error `InterfaceGridTemplateArea`** (Fixes [#22](https://github.com/slash9494/react-modern-audio-player/issues/22))

### 🌐 SSR / Next.js Compatibility

- **`'use client'` directive**: Added to the library entry point so Next.js App Router consumers can import `<AudioPlayer>` directly from Server Components. For `useAudioPlayer()` hooks and `AudioPlayer.CustomComponent` compound pattern, consumers must use `'use client'` in their own component (standard RSC behavior, same as Radix/Chakra).
- **`useIsomorphicLayoutEffect`**: All `useLayoutEffect` calls replaced with an isomorphic wrapper that falls back to `useEffect` during SSR.
- **SSR-safe `window`/`document` access**: `isBrowser` guard utility added; applied to `useVariableColor` and `useGridTemplate`.
- **`useLayoutEffect` → `useEffect` downgrade**: 6 call sites that did not require layout timing were downgraded to `useEffect`.
- Fixes [#20](https://github.com/slash9494/react-modern-audio-player/issues/20) — Next.js 14 `ReferenceError: self is not defined`
- Fixes [#12](https://github.com/slash9494/react-modern-audio-player/issues/12) — `Cannot find name 'WaveSurfer'` when building Next.js app
- Fixes [#7](https://github.com/slash9494/react-modern-audio-player/issues/7), [#13](https://github.com/slash9494/react-modern-audio-player/issues/13) — CSS syntax errors / failed to compile global CSS

### ♿ Accessibility

- **Dropdown `useId` + ARIA attributes**: `Dropdown` now generates a unique `dropdownId` via `useId()`. `DropdownTrigger` gains `aria-expanded` and `aria-controls` attributes.
- Fixes [#10](https://github.com/slash9494/react-modern-audio-player/issues/10) — Clicking control buttons no longer triggers form submit

### 📦 Bundle Size Optimization

| Change                       | Before                       | After                        | Saving              |
| ---------------------------- | ---------------------------- | ---------------------------- | ------------------- |
| `@react-spectrum/*` (4 pkgs) | bundled (~20–30 kB)          | removed — native HTML + CSS  | ~20–30 kB           |
| `react-icons` (3 icon sets)  | bundled (~15–25 kB)          | removed — 12 inlined SVGs    | ~15–25 kB           |
| `wavesurfer.js`              | always bundled (~192 kB raw) | lazy chunk, loaded on demand | ~192 kB from main   |
| `styled-components`          | bundled                      | removed — vanilla CSS        | ~15 kB              |
| `sideEffects`                | not set                      | `["*.css"]`                  | better tree-shaking |
| **Main bundle (gzip)**       | **~65 kB+**                  | **~16 kB**                   | **~75% reduction**  |

### 💥 Breaking Changes

- **`react` and `react-dom` minimum version is now `>=18.0.0`**: Projects using React 16/17 must stay on v1.x.
- **`SpectrumProvider` renamed to `AudioPlayerContainer`**: import name changed
  - Before: `import { AudioPlayer, SpectrumProvider } from "react-modern-audio-player"`
  - After: `import { AudioPlayer, AudioPlayerContainer } from "react-modern-audio-player"`
  - (Interim name `AudioPlayerRootProvider` was also removed; `AudioPlayerContainer` is the final name.)
- **`SpectrumProviderProps` renamed to `AudioPlayerContainerProps`**: type import name changed (interim `AudioPlayerRootProviderProps` also removed)
- **`AudioPlayerContainerProps.rootContainerProps` type changed**: `ProviderProps` (React Spectrum) → `HTMLAttributes<HTMLDivElement>`
- **Provider directory reorganized**: Old import paths under `components/Provider/` are removed. Providers now live under `components/AudioPlayer/Provider/` (`AudioPlayerStateProvider`) and `components/AudioPlayer/Container/` (`AudioPlayerContainer`). Package entry consumers unaffected; deep-import users must update paths.
- **`AudioPlayerProvider` renamed to `AudioPlayerStateProvider`**: internal state provider name changed.
- **`useAudioPlayer` relocated**: `hooks/useAudioPlayer` → `api/useAudioPlayer`. Package entry consumers unaffected; deep-import users must update paths.
- **`useAudioPlayer` facade decomposition**: Now a convenience facade composing domain-specific sub-hooks. Signature compatible. For fine-grained re-render control, use individual sub-hooks:
  - `useAudioPlayerPlayback()` — `{ isPlaying, repeatType, play, pause, togglePlay }`
  - `useAudioPlayerTrack()` — `{ currentPlayId, currentIndex, playList, currentTrack, setTrack, next, prev }`
  - `useAudioPlayerVolume()` — `{ volume, muted, setVolume, toggleMute }`
  - `useAudioPlayerTime()` — `{ currentTime, duration, seek }`
  - `useAudioPlayerElement()` — `{ audioEl, waveformInst }` (advanced)
- **`PrevNnextBtn` removed**: Split into `PrevBtn` and `NextBtn`. Prop `visible` renamed to `isVisible`. CSS class `rmap-prev-next-btn` replaced by `rmap-prev-btn` and `rmap-next-btn`.
- **`styled-components` removed**: The library no longer uses `styled-components`. It is removed from both `dependencies` and `peerDependencies`. All styles are now vanilla CSS.
- **`audioPlayerStateContext` removed**: Split into 4 domain-specific contexts (~70% re-render reduction).

  ```ts
  import {
    usePlaybackContext,   // isPlaying, repeatType, volume, muted
    useTrackContext,      // playList, curIdx, curPlayId
    useUIContext,         // activeUI, placements
    useResourceContext,   // elementRefs, customIcons, coverImgsCss
  } from "react-modern-audio-player";
  ```

- **CSS class names prefixed with `rmap-`**: e.g., `btn-wrapper` → `rmap-ctrl-btn-wrapper`. CSS custom properties (`--rm-audio-player-*`) are unchanged.
- **`rm-audio-player-provider` class renamed to `rmap-player-provider`**
- **`ElementRefs` removed**: `trackCurTimeEl`, `trackDurationEl`, `progressBarEl`, `progressValueEl`, `progressHandleEl` — all now driven by React state.
- **`AudioData.name` type narrowed**: `string | ReactNode` → `string` (use `customTrackInfo` for ReactNode)
- **`AudioData.writer` type narrowed**: `string | ReactNode` → `string` (use `customTrackInfo` for ReactNode)

---

## v1.2.1

### apply release git action
