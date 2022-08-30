import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { resetAudioValues } from "@/utils/resetAudioValues";
import { useState, useEffect, useCallback } from "react";
import {
  AudioData,
  audioPlayerDispatchContext,
  audioPlayerStateContext,
} from "../Context";

export const useWaveSurfer = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { curAudioState, curIdx, playList, elementRefs } =
    useNonNullableContext(audioPlayerStateContext);
  const [isReady, setIsReady] = useState(false);
  const getCurTime = useCallback(() => {
    if (!elementRefs?.waveformInst || !elementRefs.trackCurTimeEl) return;
    const { trackCurTimeEl } = elementRefs;
    const curTime = elementRefs.waveformInst.getCurrentTime();
    trackCurTimeEl.innerText = getTimeWithPadStart(curTime);
  }, [elementRefs]);

  /** delete empty wave surfer */
  const waveEl = document.getElementsByTagName("wave");
  useEffect(() => {
    if (waveEl.length > 1) {
      waveEl[0].setAttribute("style", "display: none");
    }
  }, [waveEl]);

  /** load file */
  const [curAudioData, setCurAudioData] = useState<AudioData>();
  useEffect(() => {
    if (!elementRefs?.waveformInst || !playList[curIdx]) return;

    // prevent reloading caused by updating sortable list
    if (curAudioData?.src === playList[curIdx].src) return;

    setCurAudioData(playList[curIdx]);
    setIsReady(false);
    elementRefs.waveformInst.load(playList[curIdx].src);
    elementRefs.waveformInst.on("ready", () => {
      resetAudioValues(elementRefs, elementRefs.waveformInst!.getDuration());
      setIsReady(true);
      elementRefs.waveformInst!.on("seek", () => getCurTime());
    });
  }, [
    playList,
    curIdx,
    elementRefs?.waveformInst,
    curAudioData,
    elementRefs,
    getCurTime,
  ]);

  /** play */
  useEffect(() => {
    if (!isReady || !elementRefs?.waveformInst) return;
    if (curAudioState.isPlaying) {
      elementRefs.waveformInst.play();
    } else {
      elementRefs.waveformInst.pause();
    }
  }, [isReady, curAudioState.isPlaying, elementRefs?.waveformInst]);

  /** audio finish */
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    if (!elementRefs?.waveformInst) return;
    elementRefs.waveformInst.on("finish", () => setIsFinished(true));

    if (!isFinished) return;
    const playNext = () => {
      setIsFinished(false);
      if (curAudioState.repeatType === "ONE") {
        elementRefs.waveformInst?.seekTo(0);
        elementRefs.waveformInst?.play();
        return;
      }

      audioPlayerDispatch({ type: "NEXT_AUDIO" });
    };
    playNext();
  }, [
    elementRefs?.waveformInst,
    audioPlayerDispatch,
    curAudioState.repeatType,
    isFinished,
  ]);

  /** audio current time per second */
  useEffect(() => {
    if (!isReady) return;
    const setIntervalId = setInterval(getCurTime, 1000);

    if (!curAudioState.isPlaying) {
      clearInterval(setIntervalId);
    }
    return () => clearInterval(setIntervalId);
  }, [curAudioState.isPlaying, getCurTime, isReady]);

  /** volume */
  useEffect(() => {
    if (!elementRefs?.waveformInst || !isReady) return;
    if (curAudioState.muted) {
      elementRefs.waveformInst.setVolume(0);
      elementRefs.waveformInst.setMute(true);
      return;
    }

    elementRefs.waveformInst.setVolume(curAudioState.volume);
  }, [
    curAudioState.volume,
    elementRefs?.waveformInst,
    curAudioState.muted,
    isReady,
  ]);
  return null;
};
