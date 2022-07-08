import { PropsWithChildren, FC, useReducer } from "react";
import { audioPlayerDispatchContext } from "./dispatchContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "./StateContext";
import { audioPlayerReducer } from "./reducer";

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
        muted: true,
        volume: 1,
      },
      activeUI: {
        playButton: true,
      },
      dropdownPlacement: "bottom",
      interfacePlacement: {
        playButton: defaultInterfacePlacement["playButton"],
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
