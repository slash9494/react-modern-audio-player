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
    import("wavesurfer.js")
      .then(({ default: WaveSurfer }) => {
        if (
          cancelled ||
          !colorsRef.current?.progressColor ||
          !colorsRef.current?.waveColor
        )
          return;

        const waveSurfer = WaveSurfer.create({
          barWidth: 1,
          cursorWidth: 2,
          container: waveformRef.current as HTMLElement,
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
      })
      .catch((err) => {
        console.error("[useWaveSurfer] failed to load wavesurfer.js", err);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPlayId, elementRefs?.audioEl, elementRefs?.waveformInst]);

  // set waveform responsively — trigger drawer 'redraw' on container resize
  // which internally calls drawBuffer() + drawer.progress() to update all layers
  useEffect(() => {
    if (!waveformRef.current || !elementRefs?.waveformInst) return;

    const onContainerResize = () => {
      elementRefs.waveformInst?.drawer?.fireEvent("redraw");
    };
    const resizeObserver = new ResizeObserver(onContainerResize);
    resizeObserver.observe(waveformRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRefs?.waveformInst, waveformRef]);

  /** delete empty wave surfer */
  useEffect(
    () => () => {
      const waveEl = waveformRef.current?.querySelector("wave");
      if (waveEl) {
        waveEl.remove();
        audioPlayerDispatch({
          type: "SET_ELEMENT_REFS",
          elementRefs: { waveformInst: undefined },
        });
        elementRefs?.waveformInst?.destroy();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Re-initialize WaveSurfer when color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => {
      const waveEl = waveformRef.current?.querySelector("wave");
      if (waveEl) {
        waveEl.remove();
      }
      elementRefs?.waveformInst?.destroy();
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { waveformInst: undefined },
      });
    };
    mediaQuery.addEventListener("change", onSchemeChange);
    return () => mediaQuery.removeEventListener("change", onSchemeChange);
  }, [audioPlayerDispatch, elementRefs?.waveformInst]);
};
