# Breaking Changes

This file documents all breaking changes introduced in v2.
Each section describes what changed, why, and how to migrate.

---

## v2 — Context Architecture Overhaul

> Branch: `v2/refactor/re-render-storm`

### Removed: `audioPlayerStateContext` and `AudioPlayerStateContext`

**Why**: The monolithic state context caused a re-render storm — every state change triggered re-renders across all 35+ consumer components. The context has been split into 4 domain-specific contexts to eliminate unnecessary re-renders (~70% reduction).

**Before**:

```ts
import { audioPlayerStateContext, AudioPlayerStateContext } from "react-modern-audio-player";

const state = useNonNullableContext(audioPlayerStateContext);
// state.curAudioState.isPlaying
// state.playList
// state.activeUI
// ...
```

**After** — import only the context your component needs:

```ts
import {
  usePlaybackContext,   // curAudioState (isPlaying, repeatType, volume, muted, isLoadedMetaData)
  useTrackContext,      // playList, curIdx, curPlayId
  useUIContext,         // activeUI, interfacePlacement, playListPlacement, playerPlacement, volumeSliderPlacement
  useResourceContext,   // elementRefs, customIcons, coverImgsCss
} from "react-modern-audio-player";

// Example — component that only needs playback state:
const { curAudioState } = usePlaybackContext();
// curAudioState.isPlaying, curAudioState.volume, curAudioState.muted, ...

// Example — component that only needs track info:
const { playList, curIdx } = useTrackContext();
```

**Type migration**:

| Before | After |
|---|---|
| `AudioPlayerStateContext` | `PlaybackContext \| TrackContext \| UIContext \| ResourceContext` |

If you need the full merged state shape (e.g., for `CustomComponent` children), compose from all 4:

```ts
import {
  usePlaybackContext,
  useTrackContext,
  useUIContext,
  useResourceContext,
} from "react-modern-audio-player";

const playback = usePlaybackContext();
const track = useTrackContext();
const ui = useUIContext();
const resource = useResourceContext();

const fullState = { ...playback, ...track, ...ui, ...resource };
```

---

<!-- Add new breaking changes above this line, following the same format:

## v2 — <Short title>

> Branch: `<branch-name>`

### Changed/Removed/Renamed: `<symbol>`

**Why**: ...

**Before**: ...

**After**: ...

-->
