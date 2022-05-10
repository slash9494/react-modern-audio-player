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
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        curPlayId: action.currentMusicId,
      };
    case "SET_REPEAT_TYPE":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          repeatType: action.repeatType,
        },
      };
    case "SET_PLACEMENTS":
      return {
        ...state,
        playerPlacement: action.playerPlacement || state.playerPlacement,
        dropdownPlacement: action.dropdownPlacement || state.dropdownPlacement,
      };
    default:
      throw new Error("Unhandled action");
  }
};
