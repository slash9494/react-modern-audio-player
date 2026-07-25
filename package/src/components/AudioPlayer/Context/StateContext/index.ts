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
  SpeedSelectorPlacement,
  TimeTooltipPlacement,
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
  speedSelectorPlacement?: SpeedSelectorPlacement;
  timeTooltipPlacement?: TimeTooltipPlacement;
  elementRefs?: ElementRefs;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  audioResetKey: number;
  seekRequestKey: number;
}

export type InitialStates = Partial<AudioState> & {
  curPlayId: number;
  playListExpanded?: boolean;
};

export * from "./audio";
export * from "./element";
export * from "./placement";
