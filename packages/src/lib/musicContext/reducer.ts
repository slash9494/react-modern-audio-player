import { MusicContextAction } from "./dispatchContext";
import { MusicPlayerStateContext } from "./StateContext";

export const musicPlayerReducer = (
  state: MusicPlayerStateContext,
  action: MusicContextAction
): MusicPlayerStateContext => {
  switch (action.type) {
    case "UPDATE_PLAY_LIST":
      return {
        ...state,
        playList: action.playList,
      };
    case "SET_INITIAL_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioInitialState },
      };
    case "SET_PlAY_STATE":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          isPlaying: !state.curAudioState?.isPlaying,
        },
      };
    default:
      throw new Error("Unhandled action");
  }
};
