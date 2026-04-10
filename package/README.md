<p align="center">
<img width="20%" src="https://user-images.githubusercontent.com/70849655/180391190-2b268d23-c9f3-4e95-9fce-090897842c04.png" alt="rm-audio-player" />
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
  <a href="https://bundlephobia.com/package/react-modern-audio-player@0.0.3">
    <img src="https://img.shields.io/bundlephobia/minzip/react-modern-audio-player" alt="BundleSize">
  </a>
</p>

## DEMO

https://codesandbox.io/s/basic-91y82y?file=/src/App.tsx

# **Flexible and Customizable UI**

## This can offer waveform by `wavesurfer.js`

<img width="100%" src="https://user-images.githubusercontent.com/70849655/180435472-f043dbb4-54df-43e0-bc5c-67492510e817.png" alt="">

## This can offer various UI and you can also customize each component position

> Full View
> <img width="100%" src="https://user-images.githubusercontent.com/70849655/180435489-263fae23-f066-4a37-a524-58918eb40b0c.png" alt="">

> Position Change
> <img width="110%" src="https://user-images.githubusercontent.com/70849655/180435493-2c2e08c5-b67b-4ab7-aded-5a0403d42050.png" alt="">

> Particular View
> <br/> > <img width="50%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435497-0f839cd1-e1fd-400f-a013-82ba441ca79b.png" alt=""> > <img width="20%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435479-4f056620-f850-4d21-ab23-24efc4300d68.png" alt=""> > <br/> > <img width="20%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435484-3331b7cb-1555-4ffb-a36c-a5343f72c8c3.png" alt=""> > <img width="50%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435486-2402ba80-7121-410c-9a06-9a737be72ec2.png" alt="">

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
  { name: "track", writer: "artist", img: "cover.jpg", src: "audio.mp3", id: 1 },
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
| **Override & Style** | [CustomIcons](#customicons) · [CoverImgsCss](#coverimgscss) · [Theme mode](#theme-mode--dark-mode) · [ID & Classnames](#id--classnames)               |
| **Player Hook API**  | [useAudioPlayer](#useaudioplayer) · [AudioPlayerControls](#audioplayercontrols) · [Sub-Hooks](#sub-hooks)                                              |
| **Custom Component** | [Custom Component](#custom-component)                                                                                                                 |
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
};
```

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

> ⚠️ Setting the native CSS `color-scheme` property via `rootContainerProps={{ style: { colorScheme: "dark" } }}` will **not** toggle the player's theme. The library's theme is driven by the `prefers-color-scheme` media query and the `[data-theme]` attribute selector — use the top-level [`colorScheme`](#theme-mode--dark-mode) prop instead.

# Override Style

## Theme mode ( dark-mode )

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
        {currentTrack?.name} — {currentTime.toFixed(0)}s / {duration.toFixed(0)}
        s
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
  return <span>{currentTime.toFixed(0)}s / {duration.toFixed(0)}s</span>;
}
```

| Hook                       | Returns                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `useAudioPlayerPlayback`  | `{ isPlaying, repeatType, play, pause, togglePlay }`                            |
| `useAudioPlayerTrack`      | `{ currentPlayId, currentIndex, playList, currentTrack, setTrack, next, prev }` |
| `useAudioPlayerVolume`     | `{ volume, muted, setVolume, toggleMute }`                                      |
| `useAudioPlayerTime`       | `{ currentTime, duration, seek }`                                               |
| `useAudioPlayerElement`    | `{ audioEl, waveformInst }` (advanced)                                          |

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
