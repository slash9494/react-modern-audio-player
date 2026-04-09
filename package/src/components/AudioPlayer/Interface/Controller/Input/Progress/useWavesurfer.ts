import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
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
  const { isPlaying: isPlaybackActive } = usePlaybackContext();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Intentional stale capture: wasPlaying reads isPlaybackActive at the
    // time waveform.load() is called so the onReady callback can resume
    // playback without taking isPlaybackActive as a reactive dependency
    // (which would re-run the effect on every play/pause toggle).
    const wasPlaying = isPlaybackActive;

    waveform.load(audioEl);

    // Volume is owned by useAudio's volume effect. Writing it here during
    // wavesurfer re-init (e.g. colorScheme change) would fire a DOM
    // volumechange event while the previous wavesurfer instance's
    // listener is still attached to audioEl — its `this.mediaElement` is
    // already nulled by destroy(), so the listener throws.

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

  // wavesurfer's drawBuffer is not responsive, so we trigger 'redraw' on
  // container resize via ResizeObserver to keep all canvas layers in sync.
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

  // Latest-closure ref so the media-query and colorScheme listeners below
  // always destroy the *current* waveformInst without taking it as a dep
  // (which would churn listener attachment on every waveform lifecycle).
  const destroyInstanceRef = useRef<(() => void) | undefined>(undefined);
  destroyInstanceRef.current = () => {
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
    const handler = () => destroyInstanceRef.current?.();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const prevColorSchemeRef = useRef(colorScheme);
  useEffect(() => {
    if (prevColorSchemeRef.current === colorScheme) return;
    prevColorSchemeRef.current = colorScheme;
    destroyInstanceRef.current?.();
  }, [colorScheme]);
};
