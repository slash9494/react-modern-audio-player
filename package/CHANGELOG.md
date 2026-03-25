# React-modern-audio-player

## v2.0.0 (Unreleased)

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

---

## v1.2.1

### apply release git action