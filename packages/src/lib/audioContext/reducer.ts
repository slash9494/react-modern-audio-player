import { resetAudioValues } from "../../utils/resetAudioValues";
import { AudioContextAction } from "./dispatchContext";
import { AudioPlayerStateContext } from "./StateContext";

export const audioPlayerReducer = (
  state: AudioPlayerStateContext,
  action: AudioContextAction
): AudioPlayerStateContext => {
  switch (action.type) {
    case "NEXT_AUDIO": {
      if (
        state.curAudioState.repeatType === "NONE" &&
        state.curIdx + 1 === state.playList.length
      ) {
        return {
          ...state,
          curAudioState: { ...state.curAudioState, isPlaying: false },
        };
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        let nextIdx = 0;
        const getShuffledPlayIdx = () => {
          nextIdx = Math.round(Math.random() * (state.playList.length - 1));
        };
        while (nextIdx === state.curIdx) {
          getShuffledPlayIdx();
        }
        return {
          ...state,
          curPlayId: state.playList[nextIdx].id,
          curIdx: nextIdx,
        };
      }
      const infiniteNextIdx = (state.curIdx + 1) % state.playList.length;
      return {
        ...state,
        curIdx: infiniteNextIdx,
        curPlayId: state.playList[infiniteNextIdx].id,
      };
    }
    case "PREV_AUDIO": {
      if (
        (state.elementRefs?.audioEl &&
          state.elementRefs?.audioEl?.currentTime > 1) ||
        (state.curAudioState.repeatType === "NONE" && state.curIdx === 0)
      ) {
        resetAudioValues(state.elementRefs, undefined, true);
        return state;
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        const shuffledPlayIdx = Math.round(
          Math.random() * (state.playList.length - 1)
        );
        return {
          ...state,
          curPlayId: state.playList[shuffledPlayIdx].id,
          curIdx: shuffledPlayIdx,
        };
      }
      const infinitePrevIdx =
        (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        curPlayId: state.playList[infinitePrevIdx].id,
        curIdx: infinitePrevIdx,
      };
    }
    case "UPDATE_PLAY_LIST": {
      const curPlayListItem = action.playList.find(
        (item) => item.id === state.curPlayId
      );
      if (!curPlayListItem) {
        console.error(
          "UPDATE_PLAY_LIST ERROR - curPlayId is not found on playList"
        );
        return state;
      }
      return {
        ...state,
        playList: action.playList,
        curIdx: curPlayListItem.index,
      };
    }
    case "SET_VOLUME":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          volume: action.volume,
        },
      };
    case "SET_INITIAL_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioInitialState },
        curPlayId: action.audioInitialState.curPlayId,
      };
    case "SET_PlAY_STATE":
      if (action.state !== undefined) {
        return {
          ...state,
          curAudioState: {
            ...state.curAudioState,
            isPlaying: action.state,
          },
        };
      }
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          isPlaying: !state.curAudioState.isPlaying,
        },
      };
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        curPlayId: action.currentAudioId,
        curIdx: action.currentIndex,
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
        interfacePlacement: action.interfacePlacement,
      };
    case "SET_MUTED":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          muted: action.muted,
        },
      };
    case "SET_ACTIVE_UI":
      return {
        ...state,
        activeUI: { ...action.activeUI },
      };
    case "SET_ELEMENT_REFS":
      return {
        ...state,
        elementRefs: { ...state.elementRefs, ...action.elementRefs },
      };
    case "SET_ICON_IMGS":
      return {
        ...state,
        iconImgs: { ...state.iconImgs, ...action.iconImgs },
      };
    default:
      throw new Error("Unhandled action");
  }
};
