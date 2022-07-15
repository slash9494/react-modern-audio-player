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
  DropdownPlacement,
  InterfacePlacement,
  PlayerPlacement,
} from "./placement";

export interface AudioPlayerStateContext {
  playList: PlayList;
  curPlayId: number;
  curIdx: number;
  curAudioState: CurAudioState;
  activeUI: ActiveUI;
  dropdownPlacement: DropdownPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  elementRefs?: ElementRefs;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
}

export * from "./audio";
export * from "./element";
export * from "./placement";
export const audioPlayerStateContext =
  createContext<AudioPlayerStateContext | null>(null);
