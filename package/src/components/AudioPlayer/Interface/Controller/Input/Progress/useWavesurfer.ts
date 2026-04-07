import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useEffect, useRef } from "react";

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
  const { colorScheme } = useUIContext();
  const colorsRef = useVariableColor(waveformColors, colorScheme);
  const waveformInstRef = useRef(elementRefs?.waveformInst);
  waveformInstRef.current = elementRefs?.waveformInst;

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
          !waveformRef.current ||
          !colorsRef.current?.progressColor ||
          !colorsRef.current?.waveColor
        ) {
          console.error("[useWaveSurfer] missing required dependencies");
          return;
        }

        let waveSurfer;
        try {
          waveSurfer = WaveSurfer.create({
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
        } catch (err) {
          console.error(
            "[useWaveSurfer] failed to create WaveSurfer instance",
            err
          );
          return;
        }

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

  /** load audio — preserve playback position across waveform init */
  const prevPlayIdRef = useRef(curPlayId);
  useEffect(() => {
    if (!elementRefs?.audioEl || !elementRefs?.waveformInst) return;
    const audioEl = elementRefs.audioEl;
    const waveform = elementRefs.waveformInst;
    const isTrackChange = prevPlayIdRef.current !== curPlayId;
    prevPlayIdRef.current = curPlayId;

    const savedTime = isTrackChange ? 0 : audioEl.currentTime;
    const wasPlaying = curAudioState.isPlaying;

    waveform.load(audioEl);

    if (curAudioState.volume != null) {
      audioEl.volume = curAudioState.volume;
    }

    const onReady = () => {
      if (!isTrackChange && savedTime > 0 && audioEl.duration) {
        audioEl.currentTime = savedTime;
        waveform.seekTo(savedTime / audioEl.duration);
      }
      if (wasPlaying) audioEl.play();
    };
    waveform.on("ready", onReady);

    return () => {
      waveform.un("ready", onReady);
    };
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

  /** cleanup waveSurfer on unmount */
  useEffect(
    () => () => {
      const waveEl = waveformRef.current?.querySelector("wave");
      if (waveEl) {
        waveEl.remove();
      }
      waveformInstRef.current?.destroy();
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { waveformInst: undefined },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioPlayerDispatch]
  );

  // Destroy the WaveSurfer instance whenever the color scheme changes —
  // either via the OS-level `prefers-color-scheme` media query, or via the
  // consumer-controlled `colorScheme` prop on the provider. The init effect
  // above will then re-create the instance with the freshly-resolved colors.
  const destroyInstance = () => {
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", destroyInstance);
    return () => mediaQuery.removeEventListener("change", destroyInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPlayerDispatch, elementRefs?.waveformInst]);

  // Re-init when consumer toggles the explicit colorScheme prop.
  const prevColorSchemeRef = useRef(colorScheme);
  useEffect(() => {
    if (prevColorSchemeRef.current === colorScheme) return;
    prevColorSchemeRef.current = colorScheme;
    destroyInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);
};
