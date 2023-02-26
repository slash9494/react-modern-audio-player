import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const waveformColors = {
  progressColor: "--rm-audio-player-waveform-bar",
  waveColor: "--rm-audio-player-waveform-background",
};

// TODO : dynamic drawing form from large files

export const useWaveSurfer = (waveformRef: React.RefObject<HTMLElement>) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs, curPlayId, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  const colorsRef = useVariableColor(waveformColors);

  /** init waveSurfer */
  useEffect(() => {
    if (elementRefs?.waveformInst || !colorsRef.current) return;

    const waveSurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 2,
      container: "#rm-waveform",
      height: 80,
      progressColor: `${colorsRef.current.progressColor}`,
      responsive: true,
      waveColor: `${colorsRef.current.waveColor}`,
      cursorColor: "var(--rm-audio-player-waveform-cursor)",
      backend: "MediaElement",
      removeMediaElementOnDestroy: false,
    });

    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { waveformInst: waveSurfer },
    });
  }, [elementRefs?.waveformInst, audioPlayerDispatch, colorsRef]);

  // TODO : preserve audio state when loading new audio
  /** load audio */
  useEffect(() => {
    if (!elementRefs?.audioEl || !elementRefs?.waveformInst) return;
    elementRefs.audioEl.pause();
    elementRefs.waveformInst.load(elementRefs?.audioEl);

    if (curAudioState.volume) {
      elementRefs.audioEl.volume = curAudioState.volume;
    }

    if (curAudioState.isPlaying) elementRefs?.audioEl?.play();
  }, [curPlayId, elementRefs?.audioEl, elementRefs?.waveformInst]);

  // set waveform responsively
  useEffect(() => {
    if (!waveformRef.current || !elementRefs?.waveformInst) return;

    const redrawWaveform = () => {
      elementRefs.waveformInst?.drawBuffer();
    };
    const resizeObserver = new ResizeObserver(redrawWaveform);
    resizeObserver.observe(waveformRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRefs?.waveformInst, waveformRef]);

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
};
