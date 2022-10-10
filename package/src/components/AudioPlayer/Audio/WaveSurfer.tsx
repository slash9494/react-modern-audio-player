import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useWaveSurfer } from "./useWaveSurfer";

export const WaveSurferAudio: FC = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);
  const colorsRef = useVariableColor({
    progressColor: "--rm-audio-player-waveform-bar",
    waveColor: "--rm-audio-player-waveform-background",
  });

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
      backend: "WebAudio",
    });
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { waveformInst: waveSurfer },
    });
  }, [elementRefs?.waveformInst, audioPlayerDispatch, colorsRef]);

  useWaveSurfer();
  return null;
};
