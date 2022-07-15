import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import {
  AudioData,
  audioPlayerStateContext,
} from "lib/audioContext/StateContext";
import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { getTimeWithPadStart } from "../../../utils/getTime";
import { resetAudioValues } from "../../../utils/resetAudioValues";

export const WaveSurferAudio: FC = () => {
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

  /** get colors from style */
  const [colors, setColors] = useState<{
    progressColor: string;
    waveColor: string;
  }>();
  useLayoutEffect(() => {
    const progressColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--rs-audio-player-waveform-bar");
    const waveColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--rs-audio-player-waveform-background");
    setColors({ progressColor, waveColor });
  }, []);

  /** init waveSurfer */
  useEffect(() => {
    if (!elementRefs || elementRefs.waveformInst || !colors) return;
    const waveSurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 2,
      container: "#rs-waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: `${colors.progressColor}`,
      responsive: true,
      waveColor: `${colors.waveColor}`,
      cursorColor: "var(--rs-audio-player-waveform-cursor)",
    });
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { waveformInst: waveSurfer },
    });
  }, [elementRefs, elementRefs?.waveformInst, audioPlayerDispatch, colors]);

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
