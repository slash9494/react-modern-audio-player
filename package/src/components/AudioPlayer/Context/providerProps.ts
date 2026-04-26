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

export interface AudioPlayerStateProviderProps<
  TInterfacePlacementLength extends number
> {
  playList: PlayList;
  audioInitialState?: InitialStates;
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
