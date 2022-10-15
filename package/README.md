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

# ****Flexible and Customizable UI****
## This can offer waveform by `wavesurfer.js`
<img width="100%" src="https://user-images.githubusercontent.com/70849655/180435472-f043dbb4-54df-43e0-bc5c-67492510e817.png" alt="">

## This can offer various UI and you can also customize each component position
> Full View
> <img width="100%" src="https://user-images.githubusercontent.com/70849655/180435489-263fae23-f066-4a37-a524-58918eb40b0c.png" alt="">

> Position Change
> <img width="110%" src="https://user-images.githubusercontent.com/70849655/180435493-2c2e08c5-b67b-4ab7-aded-5a0403d42050.png" alt="">


> Particular View
> </br>
><img width="50%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435497-0f839cd1-e1fd-400f-a013-82ba441ca79b.png" alt="">
><img width="20%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435479-4f056620-f850-4d21-ab23-24efc4300d68.png" alt="">
> </br>
><img width="20%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435484-3331b7cb-1555-4ffb-a36c-a5343f72c8c3.png" alt="">
> <img width="50%" margin='10px' src="https://user-images.githubusercontent.com/70849655/180435486-2402ba80-7121-410c-9a06-9a737be72ec2.png" alt="">


# ****Installation****

```tsx
npm install --save react-modern-audio-player
```

# ****Quick Start****

```tsx
import AudioPlayer from 'react-modern-audio-player';

const playList = [
  {
    name: 'name',
    writer: 'writer',
    img: 'image.jpg',
    src: 'audio.mp3',
    id: 1,
  },
]
function Player (){
	return (
		<AudioPlayer playList={playList} />
	)
}
```

# Props

```tsx
interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: AudioInitialState;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: {
    player?: PlayerPlacement;
    playList?: PlayListPlacement;
    interface?: InterfacePlacement;
    volumeSlider?: VolumeSliderPlacement;
  };
  rootContainerProps?: RootContainerProps
}
```

Prop | Type | Default 
--- | --- | --- 
`playList` | [PlayList](#playlist) | [ ] 
`audioInitialState` | [AudioInitialState](#audioinitialstate) | isPlaying: false </br>repeatType: "ALL" </br>volume: 1 
`activeUI` | [ActiveUI](#activeui) | playButton : true
`customIcons` | [CustomIcons](#customicons) | undefined 
`coverImgsCss` | [CoverImgsCss](#coverimgscss) | undefined 
`placement` | [Placement](#placement) | playListPlacement : "bottom" </br>interfacePlacement :[DefaultInterfacePlacement](#default-interface-placement)
`rootContainerProps` | [RootContainerProps](#rootcontainerprops) | theme: spectrum-theme-default<br/>width: 100% <br/>position: 'static'<br/>UNSAFE_className: rm-audio-player-provider

## PlayList

```tsx
type PlayList = Array<AudioData>;
type AudioData = {
  src: string;
  id: number;
  name?: string | ReactNode;
  writer?: string | ReactNode;
  img?: string;
  description?: string | ReactNode;
  customTrackInfo?: string | ReactNode;
};
```

## AudioInitialState

```tsx
type AudioInitialState = Omit<
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
  itemCustomArea?: InterfaceGridItemArea;
};

type InterfaceGridTemplateArea = Record<InterfacePlacementKey,InterfacePlacementValue>
type InterfacePlacementKey =
  | Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime">
  | "trackTimeCurrent"
  | "trackTimeDuration";
type InterfacePlacementValue = "row1-1" | "row1-2" | "row1-3" | "row1-4" | ... more ... | "row9-9";

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
> it is same with spectrum provider props
> </br>
> https://react-spectrum.adobe.com/react-spectrum/Provider.html#themes


# Override Style

### Theme mode ( dark-mode )

> it apply dark-mode depending on `system-theme` 
> </br>
> you can customize color-theme by `css-variable` of `react-spectrum` `theme-default`


## ID & Classnames

### root ID

- rm-audio-player

### root ClassName

- rm-audio-player-provider

### color variables

```tsx
--rm-audio-player-interface-container:var(--spectrum-global-color-gray-100);
--rm-audio-player-volume-background: #ccc;
--rm-audio-player-volume-panel-background:#f2f2f2;
--rm-audio-player-volume-panel-border:#ccc;
--rm-audio-player-volume-thumb: #d3d3d3;
--rm-audio-player-volume-fill:rgba(0, 0, 0, 0.5);
--rm-audio-player-volume-track:#ababab;
--rm-audio-player-track-current-time:#0072F5;
--rm-audio-player-track-duration:#8c8c8c;
--rm-audio-player-progress-bar:#0072F5;
--rm-audio-player-progress-bar-background:#D1D1D1;
--rm-audio-player-waveform-cursor:var(--spectrum-global-color-gray-800);
--rm-audio-player-waveform-background:var(--rm-audio-player-progress-bar-background);
--rm-audio-player-waveform-bar:var(--rm-audio-player-progress-bar);
--rm-audio-player-sortable-list:var(--spectrum-global-color-gray-200);
--rm-audio-player-sortable-list-button-active:#0072F5;
--rm-audio-player-selected-list-item-background:var(--spectrum-global-color-gray-500);

// ...spectrum theme palette and so on... //
```

# ****Example****
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
