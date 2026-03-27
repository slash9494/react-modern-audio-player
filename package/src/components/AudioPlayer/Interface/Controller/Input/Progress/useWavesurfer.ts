import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useEffect } from "react";

const waveformColors = {
  progressColor: "--rm-audio-player-waveform-bar",
  waveColor: "--rm-audio-player-waveform-background",
};

// TODO : dynamic drawing form from large files

export const useWaveSurfer = (waveformRef: React.RefObject<HTMLElement>) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { curAudioState } = usePlaybackContext();
  const { curPlayId } = useTrackContext();
  const { elementRefs } = useResourceContext();
  const colorsRef = useVariableColor(waveformColors);

  /** init waveSurfer — lazy loaded on first use */
  useEffect(() => {
    if (
      elementRefs?.waveformInst ||
      !colorsRef.current?.progressColor ||
      !colorsRef.current?.waveColor
    )
      return;

    let cancelled = false;
    import("wavesurfer.js").then(({ default: WaveSurfer }) => {
      if (
        cancelled ||
        !colorsRef.current?.progressColor ||
        !colorsRef.current?.waveColor
      )
        return;

      const waveSurfer = WaveSurfer.create({
        barWidth: 1,
        cursorWidth: 2,
        container: "#rm-waveform",
        height: 80,
        progressColor: colorsRef.current.progressColor,
        responsive: true,
        waveColor: colorsRef.current.waveColor,
        cursorColor: "var(--rm-audio-player-waveform-cursor)",
        backend: "MediaElement",
        removeMediaElementOnDestroy: false,
      });

      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { waveformInst: waveSurfer },
      });
    });

    return () => {
      cancelled = true;
    };
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
