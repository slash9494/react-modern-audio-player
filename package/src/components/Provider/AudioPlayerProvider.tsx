import {
  audioPlayerDispatchContext,
  audioPlayerReducer,
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context";
import { PropsWithChildren, FC, useReducer } from "react";

export const AudioPlayerProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [audioContextState, dispatchAudioContextState] = useReducer(
    audioPlayerReducer,
    {
      playList: [],
      curPlayId: 1,
      curIdx: 0,
      curAudioState: {
        isPlaying: false,
        repeatType: "ALL",
        volume: 1,
      },
      activeUI: {
        playButton: true,
        volumeSlider: true,
      },
      playListPlacement: "bottom",
      interfacePlacement: {
        templateArea: {
          playButton: defaultInterfacePlacement.templateArea["playButton"],
        },
      },
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
