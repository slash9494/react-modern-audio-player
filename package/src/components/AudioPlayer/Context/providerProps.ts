import type {
  ActiveUI,
  CoverImgsCss,
  CustomIcons,
  InitialStates,
  InterfacePlacement,
  PlayList,
  PlayListPlacement,
  PlayerPlacement,
  VolumeSliderPlacement,
} from "./StateContext";
import { defaultInterfacePlacementMaxLength } from "./StateContext";

export interface AudioPlayerPlacement<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> {
  player?: PlayerPlacement;
  playList?: PlayListPlacement;
  interface?: InterfacePlacement<TInterfacePlacementLength>;
  volumeSlider?: VolumeSliderPlacement;
}

export interface AudioPlayerStateProviderProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> {
  playList: PlayList;
  audioInitialState?: InitialStates;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: AudioPlayerPlacement<TInterfacePlacementLength>;
}
