import { clampVolume } from "@/utils/clampVolume";
import { getRandomNumber } from "@/utils/getRandomNumber";
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
          audioResetKey: state.audioResetKey + 1,
          curAudioState: {
            ...state.curAudioState,
            isPlaying: false,
            currentTime: 0,
          },
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
          audioResetKey: state.audioResetKey + 1,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx,
          curAudioState: {
            ...state.curAudioState,
            isLoadedMetaData: false,
            currentTime: 0,
          },
        };
      }
      const infiniteLoopNextIdx = (state.curIdx + 1) % state.playList.length;
      return {
        ...state,
        audioResetKey: state.audioResetKey + 1,
        curIdx: infiniteLoopNextIdx,
        curPlayId: state.playList[infiniteLoopNextIdx].id,
        curAudioState: { ...state.curAudioState, currentTime: 0 },
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
        return {
          ...state,
          audioResetKey: state.audioResetKey + 1,
          curAudioState: { ...state.curAudioState, currentTime: 0 },
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
          curAudioState: { ...state.curAudioState, currentTime: 0 },
        };
      }
      const infiniteLoopPrevIdx =
        (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        curPlayId: state.playList[infiniteLoopPrevIdx].id,
        curIdx: infiniteLoopPrevIdx,
        curAudioState: {
          ...state.curAudioState,
          isLoadedMetaData: false,
          currentTime: 0,
        },
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
          volume: clampVolume(action.volume),
        },
      };
    case "SET_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioState },
      };
    case "SET_INITIAL_STATES":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioState },
        curPlayId: action.curPlayId,
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
        audioResetKey: state.audioResetKey + 1,
        curPlayId: action.currentAudioId,
        curIdx: action.currentIndex,
        curAudioState: {
          ...state.curAudioState,
          currentTime: 0,
          isLoadedMetaData: false,
        },
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
