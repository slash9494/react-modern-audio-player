# React-modern-audio-player

## v2.0.0 (Unreleased)

### New Features

- **`colorScheme` prop**: forces the player to render in `"light"` or `"dark"` mode regardless of the OS `prefers-color-scheme` setting. When omitted, the player follows the OS preference (existing behavior). The provider applies a `data-theme` attribute on the root container, and the WaveSurfer instance is automatically re-initialized when the prop changes so waveform colors stay in sync. Maps to the same use case as Adobe Spectrum's `<Provider colorScheme>`.
  - **Placement**: `colorScheme` is a **top-level prop** on `<AudioPlayer>`, not nested under `rootContainerProps`. Previously the only way to influence theme from the consumer side was to pass `rootContainerProps={{ style: { colorScheme: ... } }}` (a native CSS property that did not actually override the library's OS-media-query–driven theme). The new top-level `colorScheme` prop is the supported way to override the theme.
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
  - Replaces the previous pattern of accessing `audioPlayerState` via `CustomComponent` props

### Bug Fixes

- **WaveSurfer memory leak on unmount**: `waveformInst.destroy()` was never called due to a stale closure in the cleanup effect (empty deps `[]` captured `elementRefs` as `undefined` at mount time). Fixed by tracking the instance via `useRef` so the cleanup always holds the latest reference.

### SSR / Next.js Compatibility

- **`react` and `react-dom` peerDependencies bumped to `>=18.0.0`**: The library already required React 18 features (`useId`). This formalizes the minimum version. Consumers on React 16/17 should use v1.x.
- **`useIsomorphicLayoutEffect`**: All `useLayoutEffect` calls that require layout timing replaced with an isomorphic wrapper that falls back to `useEffect` during SSR, eliminating React's server-side warning.
- **`useLayoutEffect` → `useEffect` downgrade**: 6 call sites across 4 files that did not require layout timing were downgraded to `useEffect` (prop sync, state dispatch patterns).
- **`'use client'` directive**: Added to the library entry point so Next.js App Router consumers can import directly without a client wrapper file.
- **SSR-safe `window`/`document` access**: `isBrowser` guard utility added; applied to `useVariableColor` and `useGridTemplate`.

### Accessibility

- **Dropdown `useId` + ARIA attributes**: `Dropdown` now generates a unique `dropdownId` via `useId()` (matching the existing `Drawer` pattern). `DropdownTrigger` gains `aria-expanded` and `aria-controls` attributes. `DropdownContent` receives matching `id`.

### Progress Rendering

- **Conditional rendering**: `WaveformProgress` and `BarProgress` are now conditionally rendered based on `activeUI.progress` instead of rendering both and toggling via CSS. Only the active component is mounted.

### Breaking Changes

- **`react` and `react-dom` minimum version is now `>=18.0.0`**: Projects using React 16/17 must stay on v1.x.
- **`SpectrumProvider` renamed to `AudioPlayerRootProvider`**: import name changed
  - Before: `import { AudioPlayer, SpectrumProvider } from "react-modern-audio-player"`
  - After: `import { AudioPlayer, AudioPlayerRootProvider } from "react-modern-audio-player"`
- **`SpectrumProviderProps` renamed to `AudioPlayerRootProviderProps`**: type import name changed
  - Before: `import type { SpectrumProviderProps } from "react-modern-audio-player"`
  - After: `import type { AudioPlayerRootProviderProps } from "react-modern-audio-player"`
- **`AudioPlayerRootProviderProps.rootContainerProps` type changed**: `ProviderProps` (React Spectrum) → `HTMLAttributes<HTMLDivElement>`

  - If you were passing Spectrum-specific props (e.g. `colorScheme`, `locale`), replace them with standard HTML div attributes.

- **`styled-components` removed**: The library no longer uses `styled-components`. It is removed from both `dependencies` and `peerDependencies`. All styles are now vanilla CSS. Consumers can uninstall `styled-components` if it was only used by this library.

- **`audioPlayerStateContext` removed**: The monolithic state context has been split into 4 domain-specific contexts to eliminate unnecessary re-renders (~70% reduction).

  - Before: `const state = useNonNullableContext(audioPlayerStateContext);`
  - After: Import only the context your component needs:

    ```ts
    import {
      usePlaybackContext,   // curAudioState (isPlaying, repeatType, volume, muted)
      useTrackContext,      // playList, curIdx, curPlayId
      useUIContext,         // activeUI, placements
      useResourceContext,   // elementRefs, customIcons, coverImgsCss
    } from "react-modern-audio-player";
    ```

- **CSS class names prefixed with `rmap-`**: All internal CSS class names now use the `rmap-` prefix (e.g., `btn-wrapper` → `rmap-ctrl-btn-wrapper`). If you targeted internal class names for custom styling, update your selectors. CSS custom properties (`--rm-audio-player-*`) are unchanged.

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
| `styled-components`          | bundled                      | removed — vanilla CSS        | ~15 kB              |
| `sideEffects`                | not set                      | `["*.css"]`                  | better tree-shaking |
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
