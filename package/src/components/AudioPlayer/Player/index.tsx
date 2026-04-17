import { useId } from "react";
import {
  AudioPlayerStateProviderProps,
  defaultInterfacePlacementMaxLength,
} from "@/components/AudioPlayer/Context";
import { Audio } from "../Audio";
import { Interface } from "../Interface";
import { usePropsStateEffect } from "./usePropsStateEffect";

// TODO : feature - add Equalizer component

export interface AudioPlayerProps<TInterfacePlacementLength extends number>
  extends AudioPlayerStateProviderProps<TInterfacePlacementLength> {
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
  const instanceId = useId();
  const playerId = `rm-audio-player-${instanceId}`;
  const audioId = `rm-audio-player-audio-${instanceId}`;

  return (
    <div id={playerId} className="rmap-player-container">
      <Audio audioRef={audioRef} audioId={audioId} />
      <Interface>{children}</Interface>
    </div>
  );
};
