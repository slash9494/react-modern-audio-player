import { useCallback } from "react";
import { useNonNullableContext } from "./useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "./context/usePlaybackContext";
import { useTrackContext } from "./context/useTrackContext";
import { useResourceContext } from "./context/useResourceContext";
import type {
  RepeatType,
  AudioData,
  PlayList,
} from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerControls {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeatType: RepeatType;
  muted: boolean;
  currentTrack: AudioData | null;
  currentIndex: number;
  playList: PlayList;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setTrack: (index: number) => void;
}

export const useAudioPlayer = (): AudioPlayerControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { curAudioState } = usePlaybackContext();
  const { playList, curIdx } = useTrackContext();
  const { elementRefs } = useResourceContext();

  const play = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: true });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: false });
  }, [dispatch]);

  const togglePlay = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE" });
  }, [dispatch]);

  const next = useCallback(() => {
    if (playList.length === 0) return;
    dispatch({ type: "NEXT_AUDIO" });
  }, [dispatch, playList.length]);

  const prev = useCallback(() => {
    if (playList.length === 0) return;
    dispatch({ type: "PREV_AUDIO" });
  }, [dispatch, playList.length]);

  const seek = useCallback(
    (time: number) => {
      if (elementRefs?.audioEl) {
        elementRefs.audioEl.currentTime = time;
        dispatch({
          type: "SET_AUDIO_STATE",
          audioState: { currentTime: time },
        });
      }
    },
    [elementRefs?.audioEl, dispatch]
  );

  const setVolume = useCallback(
    (volume: number) => {
      dispatch({ type: "SET_VOLUME", volume });
    },
    [dispatch]
  );

  const setTrack = useCallback(
    (index: number) => {
      const track = playList[index];
      if (!track) return;
      dispatch({
        type: "SET_CURRENT_AUDIO",
        currentIndex: index,
        currentAudioId: track.id,
      });
    },
    [dispatch, playList]
  );

  return {
    isPlaying: curAudioState.isPlaying ?? false,
    volume: curAudioState.volume ?? 1,
    currentTime: curAudioState.currentTime ?? 0,
    duration: curAudioState.duration ?? 0,
    repeatType: curAudioState.repeatType ?? "ALL",
    muted: curAudioState.muted ?? false,
    currentTrack: playList[curIdx] ?? null,
    currentIndex: curIdx,
    playList,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    setTrack,
  };
};
