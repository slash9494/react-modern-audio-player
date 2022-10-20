import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useCallback, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

// TODO : feature - draggable time movement

export const WaveSurferAudio: FC = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs, curPlayId, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  const colorsRef = useVariableColor({
    progressColor: "--rm-audio-player-waveform-bar",
    waveColor: "--rm-audio-player-waveform-background",
  });

  /** init waveSurfer */
  useEffect(() => {
    if (
      !elementRefs?.audioEl ||
      elementRefs?.waveformInst ||
      !colorsRef.current
    )
      return;

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
  }, [
    elementRefs?.audioEl,
    elementRefs?.waveformInst,
    audioPlayerDispatch,
    colorsRef,
  ]);

  const onReady = useCallback(() => {
    console.log("waveform ready", curAudioState.isPlaying);
    if (curAudioState.isPlaying) elementRefs?.audioEl?.play();
  }, [curAudioState.isPlaying, elementRefs?.audioEl]);
  useEffect(() => {
    if (!elementRefs?.audioEl || !elementRefs?.waveformInst) return;

    elementRefs?.audioEl.pause();
    elementRefs.waveformInst?.load(elementRefs?.audioEl);
    console.log("load waveform");
    elementRefs.waveformInst?.on("waveform-ready", onReady);

    return () => {
      elementRefs.waveformInst?.un("waveform-ready", onReady);
    };
  }, [curPlayId, elementRefs?.audioEl, elementRefs?.waveformInst, onReady]);

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

  return null;
};
