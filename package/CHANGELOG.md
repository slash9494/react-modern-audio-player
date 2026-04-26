# React-modern-audio-player

## v2.3.0 (Unreleased)

### ✨ New Features

- **Playback speed support** (Closes [#3](https://github.com/slash9494/react-modern-audio-player/issues/3)): the player now supports per-track playback speed via three new public surfaces.

  - **1. `AudioPlayer.SpeedSelector` compound slot** — a Dropdown-based UI that displays the current rate as a clickable label (e.g. `1×`, `1.5×`) and opens a menu of selectable rates. Defaults to `[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`. Mounts automatically alongside the preset when `activeUI.playbackRate` is `true` (or `activeUI.all` is `true`); accepts `options?: number[]` and `formatRate?: (rate: number) => string` for customization.

      ```tsx
      <AudioPlayer playList={list} activeUI={{ all: true, playbackRate: true }} />

      // or as a compound child with custom rate options
      <AudioPlayer playList={list} activeUI={{ all: true, playbackRate: false }}>
        <AudioPlayer.SpeedSelector
          options={[1, 1.5, 2, 3]}
          formatRate={(r) => `${r}x`}
          gridArea="1 / 10 / 1 / 11"
        />
      </AudioPlayer>
      ```

      The dropdown menu uses `role="menu"` + `role="menuitemradio"` with `aria-checked` reflecting the active rate (WAI-ARIA APG menu pattern, matches video.js / Vidstack).

  - **2. `useAudioPlayer().playbackRate` + `setPlaybackRate(rate)`** — the imperative API exposes the current rate and a setter. Available on the facade and on `useAudioPlayerPlayback` for fine-grained subscriptions.

      ```tsx
      const { playbackRate, setPlaybackRate } = useAudioPlayer();
      // ... later
      setPlaybackRate(1.5);
      ```

  - **3. `audioInitialState.playbackRate`** — initial rate at mount, defaults to `1`. No clamping is applied at any layer; the browser enforces HTML5 `playbackRate` bounds.

  Implementation notes: the new `SET_PLAYBACK_RATE` reducer action is the single write path; `useAudio` mirrors the rate to `audioEl.playbackRate` via a sync effect plus a re-apply inside `onLoadedMetadata` (the browser resets the DOM `playbackRate` to `1` on `src` change, mirroring the existing `volume` re-apply pattern). Internal-only `defaultInterfacePlacementMaxLength` was bumped from `10` to `11` to accommodate `playbackRate: "row1-10"` in the default template area; consumers passing an explicit `interfacePlacement` length parameter are unaffected.

- **Volume and SpeedSelector dropdown customization**: both compound slots now expose `triggerType?: "click" \| "hover"` and a `placement?` prop typed as the per-slot domain alias — `VolumeSliderPlacement` for `<AudioPlayer.Volume>` and `SpeedSelectorPlacement` for `<AudioPlayer.SpeedSelector>` (both currently resolve to `"top" \| "bottom" \| "left" \| "right"`). `AudioPlayer.SpeedSelector` also gains a top-level `placement.speedSelector?: SpeedSelectorPlacement` provider option that mirrors the existing `placement.volumeSlider`. Resolution order (both knobs, both components): **compound prop > UIContext > component default**. Defaults are unchanged — `Volume` stays on `triggerType="hover"` with viewport-aware auto-placement, `SpeedSelector` stays on `triggerType="click"` with `placement="top"`.

  ```tsx
  // Switch Volume to a click-opened panel and force the menu below the trigger
  <AudioPlayer.Volume triggerType="click" placement="bottom" />

  // Per-instance SpeedSelector placement
  <AudioPlayer.SpeedSelector placement="bottom" triggerType="hover" />

  // Or set a default for every SpeedSelector mounted under this provider
  <AudioPlayer playList={list} placement={{ speedSelector: "bottom" }} />
  ```

  Implementation note: when `Volume` resolves to `triggerType="click"`, the inner `<Dropdown.Content>` `role` switches from `"tooltip"` to `"dialog"` for semantic correctness — `tooltip` semantics are reserved for non-interactive informational popovers and don't fit a click-opened slider panel. SpeedSelector keeps `role="menu"` regardless of `triggerType` (the menu pattern allows either trigger style).

### 💥 Breaking Changes

- **`row1-10` grid slot now occupied by default `playbackRate` control**: The new default `playbackRate` placement at `row1-10` will collide with any existing `customComponentsArea` or `templateArea` entry that targets the same cell. Two ways to resolve:
  - Move the conflicting custom area to a different cell (e.g. `row1-11`)
  - Disable the new slot by setting `activeUI={{ ..., playbackRate: false }}`

  No collision warning is emitted at runtime — the symptom is overlapping cells in the rendered grid.

## v2.2.0 (2026-04-25)

### ✨ New Features

- **Compound slots on `AudioPlayer`**: the default export now exposes the built-in controls as static members that can be rendered as children alongside the preset:

  | Static member | Wraps |
  | --- | --- |
  | `AudioPlayer.Progress` | progress bar / waveform |
  | `AudioPlayer.Volume` | volume trigger + slider |
  | `AudioPlayer.PlayList` | sortable playlist drawer |
  | `AudioPlayer.PlayListEmpty` | fallback rendered inside the playlist drawer when `playList` is empty |
  | `AudioPlayer.PlayButton` | Play + Prev + Next group (Prev/Next visibility follows `activeUI.prevNnext`) |
  | `AudioPlayer.RepeatButton` | repeat-type button |
  | `AudioPlayer.Artwork` | track artwork |
  | `AudioPlayer.TrackInfo` | track title / writer |
  | `AudioPlayer.TrackTime` | current + duration time |
  | `AudioPlayer.CustomComponent` | user-defined slot (existing) |

  Compound children render **additively** alongside the preset — they do not replace the default layout by themselves. To replace a preset control, disable the corresponding slot in `activeUI` and render the compound counterpart with a custom `gridArea`:

  ```tsx
  // Hide the preset volume and re-place a custom volume at the right edge
  <AudioPlayer
    playList={list}
    activeUI={{ all: true, volume: false }}
  >
    <AudioPlayer.Volume gridArea="1 / 5 / 1 / 6" />
  </AudioPlayer>
  ```

  Each compound accepts the full `GridItemLayoutProps` set — `gridArea?`, `visible?` (defaults to `true`), `width?`, `padding?`, `justifySelf?`, `UNSAFE_className?` — plus its own domain props. `AudioPlayer.TrackTime` is the exception: it only exposes `visible?` because the slot maps to two grid areas internally.

  Native HTML attributes (`className`, `style`, `onClick`, `data-*`, etc.) are **not** forwarded by compound slots. The original internal components (`PlayBtn`, `PrevBtn`, `NextBtn`, etc.) remain exported for users who want fully custom layouts with full DOM control; headless support with native attribute pass-through is planned for v3.

  In development, a `console.warn` is emitted when a compound slot is rendered while its preset counterpart is still active, pointing to the `activeUI` flag that resolves the duplication.

  **Why it matters**

  - Move or re-skin individual controls (e.g. volume at the right edge, a waveform in place of the bar progress) without rebuilding the whole player from primitives.
  - Drop specific built-in controls by toggling `activeUI` flags and keep everything else intact — no more choosing between "preset" and "fully custom".
  - Fall back to the preset layout the moment you stop passing compound children — adopting the new API is zero-cost for existing consumers.
  - Mix preset and compound in the same player when you need two of the same control (e.g. a secondary volume) without forking the component tree.

- **Custom empty-playlist UI** via `AudioPlayer.PlayListEmpty`: when `playList` is empty the drawer previously rendered nothing; consumers can now opt into a custom fallback by passing children to the slot. Omitting the slot preserves the previous default.

  ```tsx
  <AudioPlayer playList={[]}>
    <AudioPlayer.PlayListEmpty>
      <div className="my-empty">Playlist is empty</div>
    </AudioPlayer.PlayListEmpty>
  </AudioPlayer>
  ```

- **`audioInitialState.playListExpanded`** (Fixes [#21](https://github.com/slash9494/react-modern-audio-player/issues/21)): the playlist drawer can now start in the expanded state without user interaction.

  ```tsx
  <AudioPlayer
    playList={list}
    audioInitialState={{ curPlayId: 1, playListExpanded: true }}
  />
  ```

  Consistent with the rest of `audioInitialState`: read once at mount, not tracked in reducer state.

- **Multi-instance playlist isolation** (Fixes [#11](https://github.com/slash9494/react-modern-audio-player/issues/11), [#15](https://github.com/slash9494/react-modern-audio-player/issues/15)): multiple `<AudioPlayer>` instances on the same page no longer leak playlist content into each other's drawer. Previously `PlayList` resolved its portal target through `document.querySelector(".rmap-sortable-playlist")`, which matched the first target in document order — every secondary player would render its playlist into the first player's drawer. `Interface` now publishes its own portal node per instance, and each drawer renders exclusively into its own target. Audio state (play/pause, volume, mute, current track) was already isolated per instance via the v2 provider split.

### 🐛 Bug Fixes

- **Compound slots silently dropped layout props**: each compound slot (`AudioPlayer.Volume`, `AudioPlayer.Progress`, `AudioPlayer.Artwork`, `AudioPlayer.TrackInfo`, `AudioPlayer.RepeatButton`, `AudioPlayer.PlayList`, `AudioPlayer.PlayButton`) advertised the full `GridItemLayoutProps` set in its TypeScript surface but the implementation only forwarded `gridArea` and `visible` to the underlying `Grid.Item`, so `width`, `padding`, `justifySelf`, and `UNSAFE_className` were silently ignored at runtime. The slots now spread the rest of `GridItemLayoutProps` onto `Grid.Item`, and `AudioPlayer.Progress` treats its previous hard-coded `width="100%"` as a default (`width ?? "100%"`) so consumers can override.

## v2.1.0 (2026-04-14)

### ♿ Accessibility

- **SortableList keyboard support**: playlist items are now focusable (`tabIndex=0`) and expose full keyboard control following the WAI-ARIA "Listbox with Rearrangeable Options" pattern:

  | Key | Action |
  | --- | --- |
  | `Tab` | Move focus between controls |
  | `ArrowUp` / `ArrowDown` | Move focus between playlist items |
  | `Alt+ArrowUp` / `Alt+ArrowDown` | Reorder the focused item |
  | `Enter` / `Space` | Select the focused track |

- **Native `<button>` for Dropdown trigger**: replaced `<div role="button">` with a real `<button>` element. Enter/Space activation is now handled by the browser natively, and the trigger exposes `aria-haspopup="true"`, `aria-expanded`, and `aria-controls` wired to the dropdown id.
- **Eliminated nested `<button>` anti-pattern in Volume control**: the volume tooltip trigger was rendering a `<button>` inside `Dropdown.Trigger` (itself a button). Refactored so the outer `Dropdown.Trigger` owns the button role and `VolumeIcon` renders only the icon — screen readers now announce a single control.
- **PlayBtn ARIA correction**: removed incorrect `aria-pressed` from the play/pause button. Play → Pause changes the button's function (not a toggle state), so the dynamic `aria-label` is the correct signal. Using `aria-pressed` simultaneously announced a conflicting state to screen readers.
- **vitest-axe smoke tests**: added automated `axe-core` checks for `PlayBtn`, `RepeatTypeBtn`, `BarProgress`, `Dropdown` (both closed and expanded states), `SortableList`, and `Drawer`.

### 🐛 Bug Fixes

- **Empty playlist crash** (Fixes [#25](https://github.com/slash9494/react-modern-audio-player/issues/25)): passing `playList={[]}` or dynamically switching to an empty list no longer throws "fetch url missing" and no longer crashes the component tree.
  - Reducer `NEXT_AUDIO` early-returns on empty playlist, preventing `(idx + 1) % 0 = NaN` state corruption.
  - `createInitialState` uses nullish checks instead of truthy checks so tracks with `id: 0` are handled correctly, and falls back to `playList[0].id` when `audioInitialState.curPlayId` doesn't match any track.
  - `UPDATE_PLAY_LIST` accepts empty arrays (previously silently rejected) and resets `isPlaying`, `currentTime`, `duration`, and `isLoadedMetaData` to safe defaults. When the current track disappears from the new list, playback falls back to the first track.
  - WaveSurfer `load()` is skipped when the audio element has no `src`, so the waveform renderer no longer throws during empty-state transitions.
- **SortableList focus restoration after reorder**: replaced `requestAnimationFrame` with `flushSync` so the reorder commits synchronously before focus is restored. The previous rAF-based path could race React's render cycle and focus the pre-reorder element.

### 🔧 Internal

- `DropdownTrigger` spread order: `{...props}` is placed before context-driven ARIA attributes so consumers cannot accidentally override `aria-expanded` or `aria-controls`.
- SortableList a11y tests migrated from `fireEvent.keyDown` to `@testing-library/user-event` `user.keyboard()` for more realistic browser event sequences.

## v2.0.0 (2026-04-11)

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

- **Waveform crash on theme toggle after track change**: toggling the theme after switching tracks in waveform mode no longer throws `TypeError: Cannot read properties of null (reading 'muted')`. Worked around a wavesurfer.js 6.6.4 listener leak (`MediaElement._setupMediaListeners()` overwrites `mediaListeners` before calling `removeEventListener`, orphaning prior closures on every `waveform.load()`) by detaching stale backend listeners before each load, and replaced destroy+recreate with in-place `setWaveColor` / `setProgressColor` updates on theme change.
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
