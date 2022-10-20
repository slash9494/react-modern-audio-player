import { getRandomNumber } from "@/utils/getRandomNumber";
import { resetAudioValues } from "@/utils/resetAudioValues";
import { AudioContextAction } from "./dispatchContext";
import { AudioPlayerStateContext } from "./StateContext";

const getRandomIdx = (curIdx: number, minNumber: number, maxNumber: number) => {
  let nextIdx = getRandomNumber(minNumber, maxNumber);
  while (nextIdx === curIdx) {
    nextIdx = getRandomNumber(minNumber, maxNumber);
  }
  return nextIdx;
};

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
        const randomIdx = getRandomIdx(
          state.curIdx,
          0,
          state.playList.length - 1
        );
        return {
          ...state,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx,
        };
      }
      const infiniteLoopNextIdx = (state.curIdx + 1) % state.playList.length;
      return {
        ...state,
        curIdx: infiniteLoopNextIdx,
        curPlayId: state.playList[infiniteLoopNextIdx].id,
      };
    }
    case "PREV_AUDIO": {
      if (
        (state.elementRefs?.audioEl &&
          state.elementRefs?.audioEl.currentTime > 1) ||
        (state.elementRefs?.waveformInst &&
          state.elementRefs?.waveformInst.getCurrentTime() > 1) ||
        (state.curAudioState.repeatType === "NONE" && state.curIdx === 0)
      ) {
        resetAudioValues(state.elementRefs, undefined, true);
        return state;
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        const randomIdx = getRandomIdx(
          state.curIdx,
          0,
          state.playList.length - 1
        );
        return {
          ...state,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx,
        };
      }
      const infiniteLoopPrevIdx =
        (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        curPlayId: state.playList[infiniteLoopPrevIdx].id,
        curIdx: infiniteLoopPrevIdx,
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

      const curIdx = action.playList.findIndex(
        (item) => item.id === state.curPlayId
      );

      return {
        ...state,
        playList: action.playList,
        curIdx,
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
    case "CHANGE_PLAYING_STATE":
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
    case "SET_CURRENT_AUDIO":
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
        playListPlacement: action.playListPlacement || state.playListPlacement,
        interfacePlacement: action.interfacePlacement,
        volumeSliderPlacement: action.volumeSliderPlacement,
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
    case "SET_CUSTOM_ICONS":
      return {
        ...state,
        customIcons: { ...state.customIcons, ...action.customIcons },
      };
    case "SET_COVER_IMGS_CSS":
      return {
        ...state,
        coverImgsCss: { ...state.coverImgsCss, ...action.coverImgsCss },
      };
    default:
      throw new Error("Unhandled action");
  }
};
