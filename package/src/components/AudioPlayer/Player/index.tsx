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
  /**
   * Forces the player to render in a specific color scheme, overriding the
   * operating system `prefers-color-scheme` setting. When omitted, the
   * player follows the OS preference.
   */
  colorScheme?: "light" | "dark";
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
    <div id="rm-audio-player" className="rmap-player-container">
      <Audio audioRef={audioRef} />
      <Interface>{children}</Interface>
    </div>
  );
};
