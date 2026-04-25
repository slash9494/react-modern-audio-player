<!-- markdownlint-disable MD033 MD041 MD028 -->

<p align="center">
<img width="12%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/icon.png" alt="rm-audio-player" />
<h1 align="center">React Modern Audio Player</h1>
</p>

<p align="center">
  <a href="https://github.com/slash9494/react-modern-audio-player/blob/main/package/LICENSE">
    <img src="https://img.shields.io/npm/l/react-modern-audio-player" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/react-modern-audio-player">
    <img src="https://img.shields.io/npm/v/react-modern-audio-player" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/react-modern-audio-player">
    <img src="https://img.shields.io/npm/dt/react-modern-audio-player" alt="Download">
  </a>
  <a href="https://bundlephobia.com/package/react-modern-audio-player">
    <img src="https://img.shields.io/bundlephobia/minzip/react-modern-audio-player" alt="BundleSize">
  </a>
  <a href="https://github.com/slash9494/react-modern-audio-player/actions/workflows/integration.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/slash9494/react-modern-audio-player/integration.yml?branch=main&label=CI" alt="CI">
  </a>
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
</p>

## Highlights

- **Waveform** progress bar powered by `wavesurfer.js`
- **Playlist** with drag-and-drop reorder, repeat, shuffle
- **Fully customizable** — swap any sub-component, CSS variable theming, light & dark themes
- **Compound slots** — `AudioPlayer.Volume`, `AudioPlayer.Progress`, `AudioPlayer.PlayList`, etc. for partial customization without losing the preset
- **Multi-instance playlist** — render multiple players on the same page with isolated playlist drawers and fully independent audio state
- **Accessible** — WAI-ARIA patterns, full keyboard navigation, axe-tested
- **TypeScript-first** — typed props and hooks (`useAudioPlayer`, sub-hooks)
- **SSR-friendly** — works with Next.js App Router / Server Components

## DEMO

<https://codesandbox.io/p/sandbox/basic-nfrpfq>

# **Flexible and Customizable UI**

## Waveform progress with `wavesurfer.js`

<img width="100%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/waveform-light.png" alt="Waveform view" />

## Customizable layout and placement — with light & dark themes

### Full View

<p align="center">
  <img width="49%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/full-view-light.png" alt="Full view — light" />
  <img width="49%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/full-view-dark.png" alt="Full view — dark" />
</p>

### Position Change

<p align="center">
  <img width="49%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/position-change-light.png" alt="Position change — light" />
  <img width="49%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/position-change-dark.png" alt="Position change — dark" />
</p>

### Particular View

<p align="center" style="display:flex; gap: 10%;">
  <img width="39%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/particular-view-dark.png" alt="Particular view — compact compound" />
  <img width="10%" height="50%" src="https://raw.githubusercontent.com/slash9494/react-modern-audio-player/main/package/assets/screenshots/particular-view-play-only-dark.png" alt="Particular view — play button only" />
</p>

# **Installation**

```tsx
npm install --save react-modern-audio-player
```

# **Requirements**

- React **18.0.0** or higher
- react-dom **18.0.0** or higher
  > For React 16/17 projects, use v1.x of this library.

# **Quick Start**

```tsx
import AudioPlayer from "react-modern-audio-player";

const playList = [
  {
    name: "name",
    writer: "writer",
    img: "image.jpg",
    src: "audio.mp3",
    id: 1,
  },
];
function Player() {
  return <AudioPlayer playList={playList} />;
}
```

# **Next.js / Server Components**

This library includes the `'use client'` directive and can be imported directly in Next.js App Router.

**Server Component** — render `<AudioPlayer>` with static props (no hooks, no compound components):

```tsx
// app/page.tsx — Server Component, no 'use client' needed
import AudioPlayer from "react-modern-audio-player";

const playList = [
  {
    name: "track",
    writer: "artist",
    img: "cover.jpg",
    src: "audio.mp3",
    id: 1,
  },
];

export default function Page() {
  return <AudioPlayer playList={playList} activeUI={{ playButton: true }} />;
}
```

**Client Component** — use `useAudioPlayer` hooks or `AudioPlayer.CustomComponent`:

```tsx
"use client";
// app/player/page.tsx — Client Component required for hooks & compound pattern
import AudioPlayer, { useAudioPlayer } from "react-modern-audio-player";

function Controls() {
  const { isPlaying, togglePlay } = useAudioPlayer();
  return <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>;
}

export default function PlayerPage() {
  return (
    <AudioPlayer playList={playList}>
      <AudioPlayer.CustomComponent id="controls">
        <Controls />
      </AudioPlayer.CustomComponent>
    </AudioPlayer>
  );
}
```

> **Why `'use client'`?** The library's `'use client'` directive marks the **client boundary** — it allows Server Components to import and render `<AudioPlayer>`. However, `useAudioPlayer()` hooks and `AudioPlayer.CustomComponent` require client-side React features (state, context), so components using them must be Client Components.

## Table of Contents

| Category             | Sections                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Props**            | [PlayList](#playlist) · [InitialStates](#initialstates) · [ActiveUI](#activeui) · [Placement](#placement) · [RootContainerProps](#rootcontainerprops) |
| **Override & Style** | [CustomIcons](#customicons) · [CoverImgsCss](#coverimgscss) · [Theme mode](#theme-mode-dark-mode) · [ID & Classnames](#id--classnames)                |
| **Player Hook API**  | [useAudioPlayer](#useaudioplayer) · [AudioPlayerControls](#audioplayercontrols) · [Sub-Hooks](#sub-hooks)                                             |
| **Custom Component** | [Custom Component](#custom-component) · [Compound Slots](#compound-slots)                                                                             |
| **Accessibility**    | [Keyboard support](#keyboard-support)                                                                                                                 |
| **Gotchas**          | [Gotchas](#gotchas)                                                                                                                                   |
| **Example**          | [Example](#example)                                                                                                                                   |

# Props

```tsx
interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: InitialStates;
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: {
    player?: PlayerPlacement;
    playList?: PlayListPlacement;
    interface?: InterfacePlacement;
    volumeSlider?: VolumeSliderPlacement;
  };
  rootContainerProps?: RootContainerProps;
  colorScheme?: "light" | "dark";
}
```

| Prop                 | Type                                      | Default                                                                                                         |
| -------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `playList`           | [PlayList](#playlist)                     | [ ]                                                                                                             |
| `audioInitialState`  | [InitialStates](#initialstates)           | isPlaying: false </br>repeatType: "ALL" </br>volume: 1                                                          |
| `activeUI`           | [ActiveUI](#activeui)                     | playButton : true                                                                                               |
| `customIcons`        | [CustomIcons](#customicons)               | undefined                                                                                                       |
| `coverImgsCss`       | [CoverImgsCss](#coverimgscss)             | undefined                                                                                                       |
| `placement`          | [Placement](#placement)                   | playListPlacement : "bottom" </br>interfacePlacement :[DefaultInterfacePlacement](#default-interface-placement) |
| `rootContainerProps` | [RootContainerProps](#rootcontainerprops) | width: 100%<br/>position: 'static'<br/>className: rmap-player-provider                                          |
| `colorScheme`        | `"light" \| "dark"`                       | undefined (follows OS `prefers-color-scheme`)                                                                   |

## PlayList

```tsx
type PlayList = Array<AudioData>;
type AudioData = {
  src: string;
  id: number;
  name?: string;
  writer?: string;
  img?: string;
  description?: string | ReactNode;
  customTrackInfo?: string | ReactNode;
};
```

### Empty playlist handling

Passing `playList={[]}` renders the player in an empty state without crashing. This is useful while waiting for asynchronous track data:

```tsx
function App() {
  const [tracks, setTracks] = useState<PlayList>([]);

  useEffect(() => {
    fetchTracks().then(setTracks);
  }, []);

  // Safe — the player mounts with no audio source and activates once tracks arrive.
  return <AudioPlayer playList={tracks} />;
}
```

- When the playlist becomes empty after updates, playback stops and all time state resets.
- When `audioInitialState.curPlayId` doesn't match any track in the current list, the player falls back to `playList[0]` automatically.

## InitialStates

```tsx
type InitialStates = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
> & {
  isPlaying?: boolean;
  repeatType?: RepeatType;
  volume?: number;
  currentTime?: number;
  duration?: number;
  curPlayId: number;
  playListExpanded?: boolean;
};
```

> `playListExpanded: true` opens the playlist drawer on mount. Consistent with the other fields on `audioInitialState`, this is read once at mount and is not tracked in reducer state.

## ActiveUI

```tsx
type ActiveUI = {
  all: boolean;
  playButton: boolean;
  playList: PlayListUI;
  prevNnext: boolean;
  volume: boolean;
  volumeSlider: boolean;
  repeatType: boolean;
  trackTime: boolean;
  trackInfo: boolean;
  artwork: boolean;
  progress: ProgressUI;
};
type ProgressUI = "waveform" | "bar" | false;
type PlayListUI = "sortable" | "unSortable" | false;
```

## CustomIcons

```tsx
type CustomIcons = {
  play: ReactNode;
  pause: ReactNode;
  prev: ReactNode;
  next: ReactNode;
  repeatOne: ReactNode;
  repeatAll: ReactNode;
  repeatNone: ReactNode;
  repeatShuffle: ReactNode;
  volumeFull: ReactNode;
  volumeHalf: ReactNode;
  volumeMuted: ReactNode;
  playList: ReactNode;
};
```

## CoverImgsCss

```tsx
interface CoverImgsCss {
  artwork?: React.CSSProperties;
  listThumbnail?: React.CSSProperties;
}
```

## Placement

```tsx
type PlayerPlacement =
  | "bottom"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

type VolumeSliderPlacement = "bottom" | "top" | 'left' | 'right';

type PlayListPlacement = "bottom" | "top";

type InterfacePlacement = {
  templateArea?: InterfaceGridTemplateArea;
  customComponentsArea?: InterfaceGridCustomComponentsArea<TMaxLength>;
  itemCustomArea?: InterfaceGridItemArea;
};

type InterfacePlacementKey =
  | Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime">
  | "trackTimeCurrent"
  | "trackTimeDuration";

type InterfacePlacementValue = "row1-1" | "row1-2" | "row1-3" | "row1-4" | ... more ... | "row9-9"
/** if you apply custom components, values must be "row1-1" ~ any more */

type InterfaceGridTemplateArea = Record<InterfacePlacementKey,InterfacePlacementValue>;

type InterfaceGridCustomComponentsArea = Record<componentId,InterfacePlacementValue>;

type InterfaceGridItemArea = Partial<Record<InterfacePlacementKey, string>>;
  /** example
   * progress : 2-4
   * repeatBtn : row1-4 / 2 / row1-4 / 10
   *
   * check MDN - grid area
   * https://developer.mozilla.org/ko/docs/Web/CSS/grid-area
   */
```

### Default interface placement

```tsx
const defaultInterfacePlacement = {
  templateArea: {
    artwork: "row1-1",
    trackInfo: "row1-2",
    trackTimeCurrent: "row1-3",
    trackTimeDuration: "row1-4",
    progress: "row1-5",
    repeatType: "row1-6",
    volume: "row1-7",
    playButton: "row1-8",
    playList: "row1-9",
  },
};
```

## RootContainerProps

`rootContainerProps` accepts any standard `HTMLAttributes<HTMLDivElement>` (e.g. `className`, `style`, `data-*`). The root container always has the class `rmap-player-provider` applied automatically.

> ⚠️ Setting the native CSS `color-scheme` property via `rootContainerProps={{ style: { colorScheme: "dark" } }}` will **not** toggle the player's theme. The library's theme is driven by the `prefers-color-scheme` media query and the `[data-theme]` attribute selector — use the top-level [`colorScheme`](#theme-mode-dark-mode) prop instead.

# Override Style

## Theme mode (dark mode)

> Dark mode is driven by `system-theme` (`prefers-color-scheme: dark`) by default.
> To force a specific theme regardless of OS preference, pass the top-level `colorScheme="light" | "dark"` prop on `<AudioPlayer>` — this applies a `data-theme` attribute on `.rmap-player-provider` which overrides the media query.
> You can override any color by redefining the CSS variables below on `.rmap-player-provider`.

```css
@media (prefers-color-scheme: dark) {
  .rmap-player-provider {
    --rm-audio-player-interface-container: #1e1e1e;
    /* override other variables as needed */
  }
}
```

## ID & Classnames

### root ID

- rm-audio-player

> **Multi-instance note**: when multiple `<AudioPlayer>` instances share a
> page the root `id` is duplicated across them. Playlist and audio state are
> still isolated per instance (each player has its own React provider tree
> and its own `<audio>` DOM node). If you need per-instance selectors, target
> via the class names below rather than the id.

### root ClassName

- rmap-player-provider

### color variables

```css
.rmap-player-provider {
  --rm-audio-player-text-color: #2c2c2c;
  --rm-audio-player-shadow: 0 0 0;
  --rm-audio-player-interface-container: #f5f5f5;
  --rm-audio-player-volume-background: #ccc;
  --rm-audio-player-volume-panel-background: #f2f2f2;
  --rm-audio-player-volume-panel-border: #ccc;
  --rm-audio-player-volume-thumb: #5c5c5c;
  --rm-audio-player-volume-fill: rgba(0, 0, 0, 0.5);
  --rm-audio-player-volume-track: #ababab;
  --rm-audio-player-track-current-time: #0072f5;
  --rm-audio-player-track-duration: #8c8c8c;
  --rm-audio-player-progress-bar: #0072f5;
  --rm-audio-player-progress-bar-background: #393939;
  --rm-audio-player-waveform-cursor: #4b4b4b;
  --rm-audio-player-waveform-background: var(
    --rm-audio-player-progress-bar-background
  );
  --rm-audio-player-waveform-bar: var(--rm-audio-player-progress-bar);
  --rm-audio-player-sortable-list: #eaeaea;
  --rm-audio-player-sortable-list-button-active: #0072f5;
  --rm-audio-player-selected-list-item-background: #b3b3b3;
}
```

# useAudioPlayer

Control the player externally using the `useAudioPlayer` hook. Must be called inside `AudioPlayerStateProvider` (or `AudioPlayer` which wraps it).

```tsx
import AudioPlayer, { useAudioPlayer } from "react-modern-audio-player";

function PlayerControls() {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    setTrack,
  } = useAudioPlayer();

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      <button onClick={() => seek(30)}>+30s</button>
      <button onClick={() => setVolume(0.5)}>Volume 50%</button>
      <button onClick={() => setTrack(1)}>Track 2</button>
      <p>
        {currentTrack?.name} — {currentTime.toFixed(0)}s / {duration.toFixed(0)}s
      </p>
    </div>
  );
}

function App() {
  const playList = [{ id: 1, src: "audio.mp3", name: "Track 1" }];
  return (
    <AudioPlayer playList={playList}>
      <PlayerControls />
    </AudioPlayer>
  );
}
```

## AudioPlayerControls

| Property          | Type                       | Description               |
| ----------------- | -------------------------- | ------------------------- |
| `isPlaying`       | `boolean`                  | Current playback state    |
| `volume`          | `number`                   | Current volume (0–1)      |
| `currentTime`     | `number`                   | Elapsed time in seconds   |
| `duration`        | `number`                   | Track duration in seconds |
| `repeatType`      | `RepeatType`               | Current repeat mode       |
| `muted`           | `boolean`                  | Whether audio is muted    |
| `currentTrack`    | `AudioData \| null`        | Currently playing track   |
| `currentIndex`    | `number`                   | Index in playlist         |
| `playList`        | `PlayList`                 | Full playlist             |
| `play()`          | `() => void`               | Start playback            |
| `pause()`         | `() => void`               | Pause playback            |
| `togglePlay()`    | `() => void`               | Toggle play/pause         |
| `next()`          | `() => void`               | Skip to next track        |
| `prev()`          | `() => void`               | Skip to previous track    |
| `seek(time)`      | `(time: number) => void`   | Seek to time in seconds   |
| `setVolume(vol)`  | `(volume: number) => void` | Set volume (0–1, clamped) |
| `toggleMute()`    | `() => void`               | Toggle mute on/off        |
| `setTrack(index)` | `(index: number) => void`  | Jump to playlist index    |

## Sub-Hooks

`useAudioPlayer` subscribes to all context slices. For fine-grained re-render control, use domain-specific sub-hooks:

```tsx
import {
  useAudioPlayerPlayback,
  useAudioPlayerTrack,
  useAudioPlayerVolume,
  useAudioPlayerTime,
  useAudioPlayerElement,
} from "react-modern-audio-player";

// Only re-renders on play/pause and repeat type changes
function PlayButton() {
  const { isPlaying, togglePlay } = useAudioPlayerPlayback();
  return <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>;
}

// Only re-renders on time updates
function TimeDisplay() {
  const { currentTime, duration } = useAudioPlayerTime();
  return (
    <span>
      {currentTime.toFixed(0)}s / {duration.toFixed(0)}s
    </span>
  );
}
```

| Hook                     | Returns                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `useAudioPlayerPlayback` | `{ isPlaying, repeatType, play, pause, togglePlay }`                            |
| `useAudioPlayerTrack`    | `{ currentPlayId, currentIndex, playList, currentTrack, setTrack, next, prev }` |
| `useAudioPlayerVolume`   | `{ volume, muted, setVolume, toggleMute }`                                      |
| `useAudioPlayerTime`     | `{ currentTime, duration, seek }`                                               |
| `useAudioPlayerElement`  | `{ audioEl, waveformInst }` (advanced)                                          |

# Context Hooks

Components inside `AudioPlayer` can subscribe to only the state slice they need, avoiding unnecessary re-renders.

```tsx
import {
  usePlaybackContext, // curAudioState: { isPlaying, repeatType, volume, muted, isLoadedMetaData }
  useTrackContext, // playList, curIdx, curPlayId
  useUIContext, // activeUI, interfacePlacement, playListPlacement, playerPlacement, volumeSliderPlacement
  useResourceContext, // elementRefs, customIcons, coverImgsCss
} from "react-modern-audio-player";

const MyComponent = () => {
  const { curAudioState } = usePlaybackContext();
  return <span>{curAudioState.isPlaying ? "Playing" : "Paused"}</span>;
};
```

| Hook                 | Returns                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `usePlaybackContext` | `{ curAudioState: AudioState }`                                                               |
| `useTrackContext`    | `{ playList, curIdx, curPlayId }`                                                             |
| `useUIContext`       | `{ activeUI, interfacePlacement, playListPlacement, playerPlacement, volumeSliderPlacement }` |
| `useResourceContext` | `{ elementRefs, customIcons, coverImgsCss }`                                                  |

# Custom Component

You can place a custom component anywhere in the player interface using `AudioPlayer.CustomComponent`. Use `useAudioPlayer` inside it to access player state and controls.

```tsx
import AudioPlayer, {
  useAudioPlayer,
  InterfacePlacement,
} from "react-modern-audio-player";

const activeUI: ActiveUI = {
  all: true,
};

const placement = {
  interface: {
    customComponentsArea: {
      playerCustomComponent: "row1-10",
    },
  } as InterfacePlacement<11>,
  /**
   * set the generic value of InterfacePlacement to the max interface length + 1
   * for correct "row1-10" autocompletion
   */
};

const CustomComponent = () => {
  const { currentTime, duration, seek, isPlaying, togglePlay } =
    useAudioPlayer();
  return (
    <>
      <button onClick={() => seek(currentTime + 30)}>+30s</button>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <span>
        {currentTime.toFixed(0)}s / {duration.toFixed(0)}s
      </span>
    </>
  );
};

<AudioPlayer playList={playList} placement={placement} activeUI={activeUI}>
  <AudioPlayer.CustomComponent id="playerCustomComponent">
    <CustomComponent />
  </AudioPlayer.CustomComponent>
</AudioPlayer>;
```

# Compound Slots

`AudioPlayer` exposes its built-in controls as static members so you can re-place or augment individual pieces without rebuilding the whole layout.

| Member | Renders |
| --- | --- |
| `AudioPlayer.Progress` | progress bar / waveform |
| `AudioPlayer.Volume` | volume trigger + slider |
| `AudioPlayer.PlayList` | sortable playlist drawer (accepts `initialExpanded?`) |
| `AudioPlayer.PlayListEmpty` | fallback rendered inside the playlist drawer when `playList` is empty |
| `AudioPlayer.PlayButton` | Play + Prev + Next group (Prev/Next visibility follows `activeUI.prevNnext`) |
| `AudioPlayer.RepeatButton` | repeat-type button |
| `AudioPlayer.Artwork` | track artwork |
| `AudioPlayer.TrackInfo` | track title / writer |
| `AudioPlayer.TrackTime` | current + duration time |
| `AudioPlayer.CustomComponent` | user-defined slot |

Each slot accepts the full `GridItemLayoutProps` set — `gridArea?`, `visible?`, `width?`, `padding?`, `justifySelf?`, `UNSAFE_className?` — plus its own domain props. `AudioPlayer.TrackTime` is the exception: it only exposes `visible?` because the slot maps to two grid areas internally.

Native HTML attributes (`className`, `style`, `onClick`, `data-*`, etc.) are **not** forwarded by compound slots. Compose the underlying primitives (`PlayBtn`, `PrevBtn`, `NextBtn`, etc., still exported) when full DOM control is needed; headless support with native attribute pass-through is planned for v3.

## Mental model — `activeUI` vs compound children

- **`activeUI`** governs the **preset** (default layout) — which built-in controls are shown.
- **Compound children** are **explicit placements** that always render (`visible` defaults to `true`).

The two layers are orthogonal. Compound children render **additively** alongside the preset. To truly replace a preset control, disable it in `activeUI` and render the compound counterpart:

```tsx
// Remove the default volume, re-place it with a custom gridArea
<AudioPlayer
  playList={playList}
  activeUI={{ all: true, volume: false }}
>
  <AudioPlayer.Volume gridArea="1 / 5 / 1 / 6" />
</AudioPlayer>
```

In development, a `console.warn` is emitted when a compound slot is rendered while its preset counterpart is still active, so silent duplication is easy to catch.

## Custom empty-playlist UI

Pass children to `AudioPlayer.PlayListEmpty` to render a custom node inside the playlist drawer when `playList` is empty. Omit the slot to keep the default (drawer content renders nothing).

```tsx
<AudioPlayer playList={[]}>
  <AudioPlayer.PlayListEmpty>
    <div className="my-empty">Playlist is empty</div>
  </AudioPlayer.PlayListEmpty>
</AudioPlayer>
```

`PlayListEmpty` is a marker slot; its children are consumed by the drawer via context and the component itself does not render in-place.

# **Accessibility**

The player follows WAI-ARIA patterns and is fully navigable by keyboard and screen readers.

## Keyboard support

All controls are reachable via `Tab` and respond to standard keyboard activation. The playlist uses the WAI-ARIA "Listbox with Rearrangeable Options" pattern:

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move focus between player controls |
| `Space` / `Enter` | Activate the focused button (play/pause, prev/next, repeat, mute, playlist) |
| `ArrowUp` / `ArrowDown` | Move focus between playlist items |
| `Alt+ArrowUp` / `Alt+ArrowDown` | Reorder the focused playlist item |
| `Enter` / `Space` on a playlist item | Select and play that track |

Drag-and-drop reordering is preserved as an alternative — keyboard and mouse both call the same `onReorder` handler.

# **Gotchas**

Common integration mistakes to avoid:

- **Don't toggle the theme via `rootContainerProps.style.colorScheme`.** The native CSS `color-scheme` property does not switch the player's theme. Use the top-level [`colorScheme`](#theme-mode-dark-mode) prop, which drives the `[data-theme]` attribute and re-initializes the waveform colors.
- **Set the `InterfacePlacement` generic when placing `customComponentsArea` beyond row 9.** TypeScript rejects values past the default range, so use `InterfacePlacement<N>` where `N` is `(max row length + 1)` — e.g. `InterfacePlacement<11>` for `"row1-10"` (see [Custom Component](#custom-component)).
- **`AudioPlayer.CustomComponent` accepts a single React element child.** It uses `React.cloneElement` internally, so passing multiple children or a primitive (string, number) will throw.
- **Volume is `0..1`, not `0..100`.** `setVolume` clamps out-of-range values, so `setVolume(50)` silently becomes `setVolume(1)`.
- **Compound slots don't forward native HTML attributes.** `<AudioPlayer.Volume className="...">` is rejected by TypeScript — only `GridItemLayoutProps` (layout) pass through. Compose the underlying primitives (`PlayBtn`, `PrevBtn`, `NextBtn`, etc., still exported) when you need `className`, `style`, `onClick`, or `data-*`. Full headless support is planned for v3.
- **`id: 0` is a valid track id.** The reducer uses nullish checks, so tracks with `id: 0` are handled correctly — don't filter them out of `playList` on the assumption that zero is falsy.
- **Don't import the CSS manually.** Styles are auto-injected via `sideEffects: ["*.css"]`; `import "react-modern-audio-player/dist/index.css"` will 404 or double-load.
- **Multiple mounted `<AudioPlayer>` instances don't share React state, but they do share the user's speakers.** Each instance has its own provider and its own `<audio>` element, so the state is isolated — but if two instances both play, the user hears both tracks simultaneously. Coordinate playback yourself (e.g. pause the others when one `play()` fires).

# **Example**

```tsx
function App() {
  return (
    <div>
      <AudioPlayer
        playList={playList}
        audioInitialState={{
          muted: true,
          volume: 0.2,
          curPlayId: 1,
        }}
        placement={{
          interface: {
            templateArea: {
              trackTimeDuration: "row1-5",
              progress: "row1-4",
              playButton: "row1-6",
              repeatType: "row1-7",
              volume: "row1-8",
            },
          },
          player: "bottom-left",
        }}
        activeUI={{
          all: true,
          progress: "waveform",
        }}
      />
    </div>
  );
}
```
