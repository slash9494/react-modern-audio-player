import { View } from "@react-spectrum/view";
import {
  ActiveUI,
  PlayListPlacement,
  CustomIcons,
  PlayerPlacement,
  PlayList,
  InitialStates,
  InterfacePlacement,
  CoverImgsCss,
  VolumeSliderPlacement,
  defaultInterfacePlacementMaxLength,
} from "@/components/AudioPlayer/Context";
import { Audio } from "../Audio";
import { Interface } from "../Interface";
import { usePropsStateEffect } from "./usePropsStateEffect";

// TODO : feature - add Equalizer component
// TODO : feature - add dynamic spectrum form

export interface AudioPlayerProps<TInterfacePlacementLength extends number> {
  children?: React.ReactNode;
  playList: PlayList;
  audioInitialState?: InitialStates;
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: {
    player?: PlayerPlacement;
    playList?: PlayListPlacement;
    interface?: InterfacePlacement<TInterfacePlacementLength>;
    volumeSlider?: VolumeSliderPlacement;
  };
}

export const AudioPlayer = <
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  audioRef,
  children,
  ...restProps
}: AudioPlayerProps<TInterfacePlacementLength>) => {
  usePropsStateEffect(restProps);

  return (
    <View id="rm-audio-player" UNSAFE_className="rm-audio-player-container">
      <Audio audioRef={audioRef} />
      <Interface>{children}</Interface>
    </View>
  );
};
