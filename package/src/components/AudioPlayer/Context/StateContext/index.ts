import { createContext } from "react";
import { CurAudioState } from "./audio";
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

// TODO : add dark mode setting

export interface AudioPlayerStateContext {
  playList: PlayList;
  curPlayId: number;
  curIdx: number;
  curAudioState: CurAudioState;
  activeUI: ActiveUI;
  playListPlacement: PlayListPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  volumeSliderPlacement?: VolumeSliderPlacement;
  elementRefs?: ElementRefs;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
}

export * from "./audio";
export * from "./element";
export * from "./placement";
export const audioPlayerStateContext =
  createContext<AudioPlayerStateContext | null>(null);
