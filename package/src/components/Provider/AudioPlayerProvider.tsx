import {
  audioPlayerDispatchContext,
  audioPlayerReducer,
  audioPlayerStateContext,
  CurAudioState,
  defaultInterfacePlacement,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
} from "@/components/AudioPlayer/Context";
import { PropsWithChildren, FC, useReducer } from "react";
import { AudioPlayerProps } from "../AudioPlayer/Player";

export const AudioPlayerProvider: FC<PropsWithChildren<AudioPlayerProps>> = ({
  children,
  ...props
}) => {
  const {
    playList,
    audioInitialState,
    activeUI: activeUIProp,
    placement: placementProp,
    ...otherProps
  } = props;

  const curAudioState: CurAudioState = {
    isPlaying: audioInitialState?.isPlaying || false,
    repeatType: audioInitialState?.repeatType || "ALL",
    volume: audioInitialState?.volume || 1,
    muted: audioInitialState?.muted,
  };

  const activeUI = activeUIProp || {
    playButton: true,
  };

  const placement: {
    playerPlacement?: PlayerPlacement;
    playListPlacement: PlayListPlacement;
    interfacePlacement?: InterfacePlacement;
  } = {
    playerPlacement: placementProp?.player,
    playListPlacement: placementProp?.playList || "bottom",
    interfacePlacement: placementProp?.interface || {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"],
      },
    },
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
      ...placement,
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
