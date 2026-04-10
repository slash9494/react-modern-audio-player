import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import type { AudioData } from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerTrackControls {
  curPlayId: number;
  curIdx: number;
  playList: ReadonlyArray<AudioData>;
  currentTrack: AudioData | null;
  setTrack: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export const useAudioPlayerTrack = (): AudioPlayerTrackControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { playList, curIdx, curPlayId } = useTrackContext();
  const { elementRefs } = useResourceContext();

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

  const next = useCallback(() => {
    if (playList.length === 0) return;
    dispatch({ type: "NEXT_AUDIO" });
  }, [dispatch, playList.length]);

  const prev = useCallback(() => {
    if (playList.length === 0) return;
    const audioElCurrentTime = elementRefs?.audioEl?.currentTime ?? 0;
    dispatch({ type: "PREV_AUDIO", currentTime: audioElCurrentTime });
  }, [dispatch, playList.length, elementRefs?.audioEl]);

  return {
    curPlayId,
    curIdx,
    playList,
    currentTrack: playList[curIdx] ?? null,
    setTrack,
    next,
    prev,
  };
};
