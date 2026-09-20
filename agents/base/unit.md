# Unit Test Rules

- Test files must be colocated with the source file or placed in a `__tests__` directory
- File naming convention: `*.test.tsx` or `*.test.ts`
- Each test file must cover one module or component
- Do not test implementation details — test behavior and output
- Mock external dependencies (wavesurfer.js, audio APIs) at the module level

---

## Priority Order

Priority 1 — Pure utility functions (no dependencies, test immediately)

- utils/getTime: time formatting (e.g. 0 → "00:00", 90 → "01:30")
- utils/getRandomNumber: range validity, min/max boundary
- utils/safeRatio: division by zero, out-of-range input
- utils/refs: DOM ref mutation helpers
- utils/ssr: server-side rendering guards
- utils/fetchWithTimeout: resolves before timeout, aborts after it
- audioPlayer/utils/clampVolume: clamps below 0 and above 1

Priority 2 — Reducer (core state logic, most critical)

File: Context/reducer.ts

Required test cases:

NEXT_AUDIO

- normal: increments curIdx, wraps around at end (infinite loop)
- repeatType NONE + last track: sets isPlaying to false, does not advance
- repeatType SHUFFLE: returns a different index from current

PREV_AUDIO

- normal: decrements curIdx, wraps around at start (infinite loop)
- currentTime > 1: resets audio time, stays on same track
- repeatType NONE + first track (curIdx === 0): stays on same track
- repeatType SHUFFLE: returns a different index from current

CHANGE_PLAYING_STATE

- toggle: flips isPlaying
- explicit state: sets isPlaying to given value

SET_REPEAT_TYPE

- cycles: ALL → ONE → NONE → SHUFFLE → ALL

UPDATE_PLAY_LIST

- valid: updates playList and recalculates curIdx
- curPlayId not found in new list: resets to first track (curPlayId/curIdx → first item, bumps audioResetKey, currentTime 0)

SET_VOLUME / SET_MUTED

- correctly updates curAudioState

Priority 3 — Custom hooks

- hooks/useNonNullableContext: throws when context is null, returns value when valid
- hooks/useClickOutside: calls handler on outside click, ignores inside click
- hooks/useDidUpdateEffect: skips the mount run, fires on later updates
- hooks/useVariableColor: derives colors from the active color scheme
- api/useAudioPlayerVolume: volume state transitions

Priority 4 — UI Components

- Transport buttons — `audioPlayer/Interface/Controller/Transport/`: PlayBtn, PrevBtn, NextBtn, RepeatTypeBtn
- Volume — `audioPlayer/Interface/Controller/Volume/VolumeIcon.tsx`
- Verify correct aria-label per state
- Verify type="button" attribute
- Verify dispatch is called on click

---

## Mock Strategy

### HTMLAudioElement (jsdom does not support audio)

Add to test setup file (src/test/setup.ts):

```ts
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();
```

### wavesurfer.js

Mock at module level in tests that involve WaveformProgress or useWavesurfer:

```ts
vi.mock("wavesurfer.js", () => ({
  default: {
    create: vi.fn(() => ({
      load: vi.fn(),
      on: vi.fn(),
      destroy: vi.fn(),
      getCurrentTime: vi.fn().mockReturnValue(0),
    })),
  },
}));
```

### elementRefs

Always provide a minimal mock ref object:

```ts
const mockElementRefs = {
  audioEl: document.createElement("audio"),
  progressBarEl: document.createElement("div"),
  progressValueEl: document.createElement("div"),
  progressHandleEl: document.createElement("div"),
  trackCurTimeEl: document.createElement("span"),
  trackDurationEl: document.createElement("span"),
};
```
