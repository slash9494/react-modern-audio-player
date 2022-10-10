import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { resetAudioValues } from "@/utils/resetAudioValues";
import { useState, useEffect, useCallback } from "react";
import {
  audioPlayerDispatchContext,
  audioPlayerStateContext,
} from "../Context";

// TODO : useImperativeHandle to standardize the interface on the dispatch
// TODO : feature - draggable time movement
// TODO : fix - when the wavesurfer is reloaded, the time is reset

export const useWaveSurfer = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const {
    curAudioState,
    curIdx,
    playList,
    elementRefs,
    interfacePlacement,
    playerPlacement,
  } = useNonNullableContext(audioPlayerStateContext);
  const [isReady, setIsReady] = useState(false);

  const getCurTime = useCallback(() => {
    if (!elementRefs?.waveformInst || !elementRefs.trackCurTimeEl) return;
    const { trackCurTimeEl } = elementRefs;
    const curTime = elementRefs.waveformInst.getCurrentTime();
    trackCurTimeEl.innerText = getTimeWithPadStart(curTime);
  }, [elementRefs]);

  /** delete empty wave surfer */
  useEffect(
    () => () => {
      const waveEl = document.getElementsByTagName("wave");
      if (waveEl.length) {
        waveEl[0].remove();
        audioPlayerDispatch({
          type: "SET_ELEMENT_REFS",
          elementRefs: { waveformInst: undefined },
        });
        elementRefs?.waveformInst?.destroy();
      }
    },
    []
  );

  const [reloadValidation, setReloadValidation] = useState({
    curAudioData: playList[curIdx],
    curInterfacePlacement: interfacePlacement,
    curPlayerPlacement: playerPlacement,
  });

  if (
    reloadValidation.curAudioData.src !== playList[curIdx].src ||
    reloadValidation.curInterfacePlacement !== interfacePlacement ||
    reloadValidation.curPlayerPlacement !== playerPlacement
  ) {
    setReloadValidation({
      curAudioData: playList[curIdx],
      curInterfacePlacement: interfacePlacement,
      curPlayerPlacement: playerPlacement,
    });
  }

  /** load file */
  useEffect(() => {
    if (!elementRefs?.waveformInst || !reloadValidation.curAudioData) return;

    setIsReady(false);
    elementRefs.waveformInst.load(reloadValidation.curAudioData.src);
    elementRefs.waveformInst.on("ready", () => {
      resetAudioValues(elementRefs, elementRefs.waveformInst!.getDuration());
      setIsReady(true);
      elementRefs.waveformInst!.on("seek", () => getCurTime());
    });
  }, [elementRefs?.waveformInst, getCurTime, elementRefs, reloadValidation]);

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
      elementRefs.waveformInst.setMute(true);
      return;
    }

    elementRefs.waveformInst.setMute(false);
    elementRefs.waveformInst.setVolume(curAudioState.volume);
  }, [
    curAudioState.volume,
    elementRefs?.waveformInst,
    curAudioState.muted,
    isReady,
  ]);

  return null;
};
