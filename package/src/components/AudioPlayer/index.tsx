import { AudioPlayerStateProvider } from "@/components/AudioPlayer/Provider";
import {
  AudioPlayerContainer,
  AudioPlayerContainerProps,
} from "@/components/AudioPlayer/Container";
import "@/styles/vars.css";
import "@/styles/GlobalStyle.css";
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayer, AudioPlayerProps } from "./Player";
import { Progress } from "./Interface/Controller/Input";
import { Volume } from "./Interface/Controller/Tooltip";
import { SortablePlayList } from "./Interface/Controller/Drawer";
import { PlayButton, RepeatTypeBtn } from "./Interface/Controller/Button";
import { Artwork } from "./Interface/Information/Artwork";
import { TrackInfo } from "./Interface/Information/TrackInfo";
import { TrackTime } from "./Interface/Information/TrackTime";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> = AudioPlayerProps<TInterfacePlacementLength> & AudioPlayerContainerProps;

function AudioPlayerWithProviders<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
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

type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
  Progress: typeof Progress;
  Volume: typeof Volume;
  PlayList: typeof SortablePlayList;
  PlayButton: typeof PlayButton;
  RepeatButton: typeof RepeatTypeBtn;
  Artwork: typeof Artwork;
  TrackInfo: typeof TrackInfo;
  TrackTime: typeof TrackTime;
  CustomComponent: typeof CustomComponent;
};

const AudioPlayerCompound = Object.assign(AudioPlayerWithProviders, {
  Progress,
  Volume,
  PlayList: SortablePlayList,
  PlayButton,
  RepeatButton: RepeatTypeBtn,
  Artwork,
  TrackInfo,
  TrackTime,
  CustomComponent,
}) as AudioPlayerComponent;

export default AudioPlayerCompound;
