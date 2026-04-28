import { clampVolume } from "@/components/AudioPlayer/utils/clampVolume";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { AudioContextAction } from "./dispatchContext";
import { AudioPlayerStateContext } from "./StateContext";

const PREV_RESET_THRESHOLD_SEC = 1;

const getRandomIdx = (curIdx: number, minNumber: number, maxNumber: number) => {
  // Guard: when the playable range collapses to a single index (e.g. a
  // playlist with one track) the loop below would spin forever waiting
  // for a different value. Returning curIdx is the only correct answer.
  if (maxNumber - minNumber < 1) return curIdx;
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
      if (state.playList.length === 0) return state;
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
        // Single-track playlist: SHUFFLE has nowhere to jump. Rewind in
        // place instead of flipping isLoadedMetaData (which would disable
        // the progress bar) or re-dispatching the same index.
        if (state.playList.length <= 1) {
          return {
            ...state,
            audioResetKey: state.audioResetKey + 1,
            curAudioState: { ...state.curAudioState, currentTime: 0 },
          };
        }
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
      // Single-track playlist: every prev press is a rewind, regardless of
      // repeatType. Falling through to the per-mode branches would either
      // (a) flip isLoadedMetaData=false on the only track and disable the
      // progress bar (ALL/no-mode path) or (b) re-dispatch the same index
      // for SHUFFLE without resetting audio. Treat it as a single concern.
      const isSingleTrackPlaylist = state.playList.length <= 1;
      const shouldRewindToStart = action.currentTime > PREV_RESET_THRESHOLD_SEC;
      const isFirstTrackNoRepeat =
        state.curAudioState.repeatType === "NONE" && state.curIdx === 0;
      if (
        isSingleTrackPlaylist ||
        shouldRewindToStart ||
        isFirstTrackNoRepeat
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
          audioResetKey: state.audioResetKey + 1,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx,
          curAudioState: { ...state.curAudioState, currentTime: 0 },
        };
      }
      const infiniteLoopPrevIdx =
        (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        audioResetKey: state.audioResetKey + 1,
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
      if (action.playList.length === 0) {
        return {
          ...state,
          playList: action.playList,
          curPlayId: 0,
          curIdx: -1,
          curAudioState: {
            ...state.curAudioState,
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            isLoadedMetaData: false,
          },
        };
      }
      const curPlayListItem = action.playList.find(
        (item) => item.id === state.curPlayId
      );
      if (!curPlayListItem) {
        return {
          ...state,
          playList: action.playList,
          curPlayId: action.playList[0].id,
          curIdx: 0,
          audioResetKey: state.audioResetKey + 1,
          curAudioState: {
            ...state.curAudioState,
            currentTime: 0,
            isLoadedMetaData: false,
          },
        };
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
    // No clamping: HTMLMediaElement.playbackRate is delegated to the browser,
    // which both rejects unsupported rates and emits ratechange events.
    case "SET_PLAYBACK_RATE":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          playbackRate: action.playbackRate,
        },
      };
    case "SET_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioState },
      };
    case "SEEK":
      return {
        ...state,
        seekRequestKey: state.seekRequestKey + 1,
        curAudioState: { ...state.curAudioState, currentTime: action.time },
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
