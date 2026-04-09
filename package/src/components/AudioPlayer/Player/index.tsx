import {
  AudioPlayerStateProviderProps,
  defaultInterfacePlacementMaxLength,
} from "@/components/AudioPlayer/Context";
import { Audio } from "../Audio";
import { Interface } from "../Interface";
import { usePropsStateEffect } from "./usePropsStateEffect";

// TODO : feature - add Equalizer component

export interface AudioPlayerProps<
  TInterfacePlacementLength extends number = number
> extends AudioPlayerStateProviderProps<TInterfacePlacementLength> {
  children?: React.ReactNode;
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
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
