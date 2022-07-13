import { AudioContextAction } from "./dispatchContext";
import { AudioPlayerStateContext } from "./StateContext";
export declare const audioPlayerReducer: (
  state: AudioPlayerStateContext,
  action: AudioContextAction
) => AudioPlayerStateContext;
