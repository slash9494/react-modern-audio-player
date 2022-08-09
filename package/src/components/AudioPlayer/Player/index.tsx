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
} from "@/components/AudioPlayer/Context";
import { Audio } from "../Audio";
import { Interface } from "../Interface";
import { usePropsStateEffect } from "./usePropsStateEffect";

export interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: AudioInitialState;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: {
    player?: PlayerPlacement;
    playList?: PlayListPlacement;
    interface?: InterfacePlacement;
  };
}

export const AudioPlayer: FC<AudioPlayerProps> = (props) => {
  usePropsStateEffect(props);

  return (
    <View id="rm-audio-player" UNSAFE_className="rm-audio-player-container">
      <Audio />
      <Interface />
    </View>
  );
};
