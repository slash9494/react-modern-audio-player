import { View } from "@react-spectrum/view";
import { FC } from "react";
import {
  ActiveUI,
  PlayListPlacement,
  CustomIcons,
  PlayerPlacement,
  PlayList,
  AudioInitialState,
  InterfacePlacement,
  CoverImgsCss,
  VolumeSliderPlacement,
} from "@/components/AudioPlayer/Context";
import { Audio } from "../Audio";
import { Interface } from "../Interface";
import { usePropsStateEffect } from "./usePropsStateEffect";

// TODO : feature - add custom component
// TODO : feature - add Equalizer component
// TODO : feature - add dynamic spectrum form

export interface AudioPlayerProps {
  children?: React.ReactNode;
  playList: PlayList;
  audioInitialState?: AudioInitialState;
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
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  audioRef,
  children,
  ...restProps
}) => {
  usePropsStateEffect(restProps);

  return (
    <View id="rm-audio-player" UNSAFE_className="rm-audio-player-container">
      <Audio audioRef={audioRef} />
      <Interface>{children}</Interface>
    </View>
  );
};
