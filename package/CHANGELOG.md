# React-modern-audio-player

## v2.0.0 (Unreleased)

### New Features

- **`useAudioPlayer()` public hook**: exposes a stable API to control the player externally
  - Returns `play`, `pause`, `togglePlay`, `next`, `prev`, `seek`, `setVolume`, `setTrack`
  - Returns state: `isPlaying`, `volume`, `currentTime`, `duration`, `repeatType`, `muted`, `currentTrack`, `currentIndex`, `playList`
  - Must be called inside `AudioPlayerProvider` (or `AudioPlayer` which wraps it)
  - Replaces the previous pattern of accessing `audioPlayerState` via `CustomComponent` props

### Bug Fixes

- **WaveSurfer memory leak on unmount**: `waveformInst.destroy()` was never called due to a stale closure in the cleanup effect (empty deps `[]` captured `elementRefs` as `undefined` at mount time). Fixed by tracking the instance via `useRef` so the cleanup always holds the latest reference.

### Breaking Changes

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
