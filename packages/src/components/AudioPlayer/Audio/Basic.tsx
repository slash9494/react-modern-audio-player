import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import {
  audioPlayerStateContext,
  AudioNativeProps,
} from "lib/audioContext/StateContext";
import { FC, SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { getTimeWithPadStart } from "../../../utils/getTime";
import { resetAudioValues } from "../../../utils/resetAudioValues";

export const Basic: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { curAudioState, curPlayId, playList, elementRefs } =
    useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const curPlayedAudioData = playList.find(
    (audioData) => audioData.id === curPlayId
  );
  const audioNativeStates: AudioNativeProps = Object.fromEntries(
    Object.entries(curAudioState).filter((state) => {
      if (
        state[0] === "isPlaying" ||
        state[0] === "repeatType" ||
        state[0] === "curPlayId"
      ) {
        return false;
      }
      return true;
    })
  );
  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      if (event.currentTarget.readyState === 0 || !elementRefs) return;
      const currentTime = event.currentTarget.currentTime;
      const duration = event.currentTarget.duration;

      const {
        trackCurTimeEl,
        progressBarEl,
        progressValueEl,
        progressHandleEl,
      } = elementRefs;
      if (trackCurTimeEl) {
        trackCurTimeEl.innerText = getTimeWithPadStart(currentTime);
      }

      if (progressBarEl && progressValueEl && progressHandleEl) {
        const progressBarWidth = progressBarEl.clientWidth;
        const progressHandlePosition =
          (currentTime / duration) * progressBarWidth;

        progressValueEl.style.transform = `scaleX(${currentTime / duration})`;
        progressHandleEl.style.transform = `translateX(${progressHandlePosition}px)`;
      }
    },
    [elementRefs]
  );
  const onEnded = useCallback(() => {
    if (!audioRef.current) return;
    if (curAudioState.repeatType === "ONE") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  }, [audioPlayerDispatch, curAudioState.repeatType]);
  const onLoadedMetadata = useCallback(
    (e: SyntheticEvent<HTMLAudioElement, Event>) => {
      if (!elementRefs) return;
      const { duration } = e.currentTarget;
      resetAudioValues(elementRefs, duration);
    },
    [elementRefs]
  );

  useEffect(() => {
    if (!audioRef.current) return;
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { audioEl: audioRef.current },
    });
  }, [audioRef.current, audioPlayerDispatch]);

  /** play */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (curAudioState.isPlaying) {
      elementRefs?.audioEl.play();
    } else {
      elementRefs?.audioEl.pause();
    }
  }, [elementRefs?.audioEl, curAudioState.isPlaying]);

  /** volume */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    elementRefs.audioEl.volume = curAudioState.volume;
  }, [elementRefs?.audioEl, curAudioState.volume]);

  return (
    <audio
      id="rs-audio-player-audio"
      autoPlay={curAudioState.isPlaying}
      ref={audioRef}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      src={curPlayedAudioData!.src}
      onLoadedMetadata={onLoadedMetadata}
      {...audioNativeStates}
    ></audio>
  );
};
