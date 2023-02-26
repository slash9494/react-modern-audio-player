import { createContext } from "react";
import { AudioState } from "./audio";
import {
  ActiveUI,
  CoverImgsCss,
  ElementRefs,
  CustomIcons,
  PlayList,
} from "./element";
import {
  PlayListPlacement,
  InterfacePlacement,
  PlayerPlacement,
  VolumeSliderPlacement,
} from "./placement";

export interface AudioPlayerStateContext {
  playList: PlayList;
  curPlayId: number;
  curIdx: number;
  curAudioState: AudioState;
  activeUI: ActiveUI;
  playListPlacement: PlayListPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  volumeSliderPlacement?: VolumeSliderPlacement;
  elementRefs?: ElementRefs;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
}

export type InitialStates = AudioState & {
  curPlayId: number;
};

export * from "./audio";
export * from "./element";
export * from "./placement";
export const audioPlayerStateContext =
  createContext<AudioPlayerStateContext | null>(null);
