import { PropsWithChildren, FC, useReducer } from "react";
import { musicPlayerDispatchContext } from "./dispatchContext";
import { musicPlayerStateContext } from "./StateContext";
import { musicPlayerReducer } from "./reducer";

export const MusicPlayerProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [musicContextState, disPatchMusicContextState] = useReducer(
    musicPlayerReducer,
    {
      playList: [],
      curAudioState: {
        isPlaying: false,
        repeatType: "ALL",
        muted: false,
      },
    }
  );

  return (
    <musicPlayerStateContext.Provider value={musicContextState}>
      <musicPlayerDispatchContext.Provider value={disPatchMusicContextState}>
        {children}
      </musicPlayerDispatchContext.Provider>
    </musicPlayerStateContext.Provider>
  );
};
