import { AudioPlayerStateProvider } from "@/components/AudioPlayer/Provider";
import {
  AudioPlayerContainer,
  AudioPlayerContainerProps,
} from "@/components/AudioPlayer/Container";
import "@/styles/vars.css";
import "@/styles/GlobalStyle.css";
import { DEFAULT_INTERFACE_GRID_BOUND } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { PlayListEmpty } from "./Interface/PlayListEmpty";
import { AudioPlayer, AudioPlayerProps } from "./Player";
import { Progress } from "./Interface/Controller/Input";
import { Volume } from "./Interface/Controller/Tooltip";
import { SortablePlayList } from "./Interface/Controller/Drawer";
import { SpeedSelector } from "./Interface/Controller/SpeedSelector";
import {
  TransportControls,
  RepeatTypeBtn,
} from "./Interface/Controller/Button";
import { Artwork } from "./Interface/Information/Artwork";
import { TrackInfo } from "./Interface/Information/TrackInfo";
import { TrackTime } from "./Interface/Information/TrackTime";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof DEFAULT_INTERFACE_GRID_BOUND
> = AudioPlayerProps<TInterfacePlacementLength> & AudioPlayerContainerProps;

function AudioPlayerWithProviders<
  TInterfacePlacementLength extends number = typeof DEFAULT_INTERFACE_GRID_BOUND
>({
  rootContainerProps,
  ...audioPlayProps
}: RMAudioPlayerProps<TInterfacePlacementLength>) {
  return (
    <AudioPlayerStateProvider {...audioPlayProps}>
      <AudioPlayerContainer rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
      </AudioPlayerContainer>
    </AudioPlayerStateProvider>
  );
}

AudioPlayerWithProviders.displayName = "AudioPlayerWithProviders";

// Public compound slot name `PlayButton` maps to the internal `TransportControls`
// component. The internal name reflects the role (prev + play + next group);
// the public name preserves backward compatibility with the existing
// `activeUI.playButton` flag. See `.claude/docs/v3-deferred.md` for the
// planned public rename to `TransportControls` in v3.
type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
  Progress: typeof Progress;
  Volume: typeof Volume;
  PlayList: typeof SortablePlayList;
  PlayListEmpty: typeof PlayListEmpty;
  PlayButton: typeof TransportControls;
  RepeatButton: typeof RepeatTypeBtn;
  SpeedSelector: typeof SpeedSelector;
  Artwork: typeof Artwork;
  TrackInfo: typeof TrackInfo;
  TrackTime: typeof TrackTime;
  CustomComponent: typeof CustomComponent;
};

const AudioPlayerCompound = Object.assign(AudioPlayerWithProviders, {
  Progress,
  Volume,
  PlayList: SortablePlayList,
  PlayListEmpty,
  PlayButton: TransportControls,
  RepeatButton: RepeatTypeBtn,
  SpeedSelector,
  Artwork,
  TrackInfo,
  TrackTime,
  CustomComponent,
}) as AudioPlayerComponent;

export default AudioPlayerCompound;
