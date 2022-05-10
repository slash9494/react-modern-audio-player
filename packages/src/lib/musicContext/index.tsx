import { PropsWithChildren, FC, useReducer } from "react";
import { musicPlayerDispatchContext } from "./dispatchContext";
import { musicPlayerStateContext } from "./StateContext";
import { musicPlayerReducer } from "./reducer";

export const MusicPlayerProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [musicContextState, dispatchMusicContextState] = useReducer(
    musicPlayerReducer,
    {
      playList: [],
      curPlayId: 0,
      curAudioState: {
        isPlaying: false,
        repeatType: "ALL",
        muted: false,
      },
      activeUI: {
        playButton: true,
        prevNnext: true,
        repeatType: true,
      },
      dropdownPlacement: "top",
      playerPlacement: "bottom-left",
    }
  );

  return (
    <musicPlayerStateContext.Provider value={musicContextState}>
      <musicPlayerDispatchContext.Provider value={dispatchMusicContextState}>
        {children}
      </musicPlayerDispatchContext.Provider>
    </musicPlayerStateContext.Provider>
  );
};
