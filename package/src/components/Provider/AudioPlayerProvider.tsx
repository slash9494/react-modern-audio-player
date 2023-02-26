import {
  audioPlayerDispatchContext,
  audioPlayerReducer,
  audioPlayerStateContext,
  AudioState,
  defaultInterfacePlacement,
  defaultInterfacePlacementMaxLength,
  Placements,
} from "@/components/AudioPlayer/Context";
import { PropsWithChildren, useReducer } from "react";
import { AudioPlayerProps } from "../AudioPlayer/Player";

export const AudioPlayerProvider = <
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  children,
  ...props
}: PropsWithChildren<AudioPlayerProps<TInterfacePlacementLength>>) => {
  const {
    playList,
    audioInitialState,
    activeUI: activeUIProp,
    placement: placementProp,
    ...otherProps
  } = props;

  const curAudioState: AudioState = {
    isPlaying: audioInitialState?.isPlaying || false,
    repeatType: audioInitialState?.repeatType || "ALL",
    volume: audioInitialState?.volume || 1,
    muted: audioInitialState?.muted,
  };

  const activeUI = activeUIProp || {
    playButton: true,
  };

  const placement: Placements<TInterfacePlacementLength | 10> = {
    playerPlacement: placementProp?.player,
    playListPlacement: placementProp?.playList || "bottom",
    interfacePlacement: placementProp?.interface || {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"],
      },
    },
    volumeSliderPlacement: placementProp?.volumeSlider,
  };

  const [audioContextState, dispatchAudioContextState] = useReducer(
    audioPlayerReducer,
    {
      playList,
      curPlayId: audioInitialState?.curPlayId || 1,
      curIdx: audioInitialState?.curPlayId
        ? playList.findIndex(
            (audioData) => audioData.id === audioInitialState?.curPlayId
          )
        : 0,
      curAudioState,
      activeUI,
      ...(placement as Placements<10>),
      ...otherProps,
    }
  );

  return (
    <audioPlayerStateContext.Provider value={audioContextState}>
      <audioPlayerDispatchContext.Provider value={dispatchAudioContextState}>
        {children}
      </audioPlayerDispatchContext.Provider>
    </audioPlayerStateContext.Provider>
  );
};
