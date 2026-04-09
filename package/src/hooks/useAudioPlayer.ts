import { useCallback } from "react";
import { useNonNullableContext } from "./context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "./context/usePlaybackContext";
import { useTimeContext } from "./context/useTimeContext";
import { useTrackContext } from "./context/useTrackContext";
import { useResourceContext } from "./context/useResourceContext";
import type {
  RepeatType,
  AudioData,
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
  playList: ReadonlyArray<AudioData>;
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
  const playback = usePlaybackContext();
  const { currentTime, duration } = useTimeContext();
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
    // wavesurfer wraps the same `<audio>` element via the MediaElement
    // backend (useWavesurfer.ts), so reading audioEl.currentTime covers
    // both bar and waveform progress modes. The legacy reducer used to
    // OR audioEl and waveformInst reads but that branch was dead.
    const audioElCurrentTime = elementRefs?.audioEl?.currentTime ?? 0;
    dispatch({ type: "PREV_AUDIO", currentTime: audioElCurrentTime });
  }, [dispatch, playList.length, elementRefs?.audioEl]);

  const seek = useCallback(
    (time: number) => {
      dispatch({ type: "SEEK", time });
    },
    [dispatch]
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
    isPlaying: playback.isPlaying,
    volume: playback.volume,
    currentTime,
    duration,
    repeatType: playback.repeatType,
    muted: playback.muted,
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
