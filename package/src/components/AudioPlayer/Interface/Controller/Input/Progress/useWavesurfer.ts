import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useEffect, useRef } from "react";
import type WaveSurfer from "wavesurfer.js";

const waveformColors = {
  progressColor: "--rm-audio-player-waveform-bar",
  waveColor: "--rm-audio-player-waveform-background",
};

type MediaElementBackendInternals = {
  media: HTMLMediaElement | null;
  mediaListeners: Record<string, EventListener>;
};

/**
 * Workaround for wavesurfer.js 6.6.4: MediaElement `_setupMediaListeners()`
 * overwrites `this.mediaListeners` in place before calling removeEventListener,
 * orphaning the previous closures on audioEl. A later destroy() followed by
 * any volumechange on the shared audio element then throws
 * `Cannot read properties of null (reading 'muted')`.
 */
const detachStaleBackendListeners = (waveform: WaveSurfer) => {
  const backend = (
    waveform as unknown as { backend?: MediaElementBackendInternals }
  ).backend;
  if (!backend?.media || !backend.mediaListeners) return;
  for (const [id, listener] of Object.entries(backend.mediaListeners)) {
    backend.media.removeEventListener(id, listener);
  }
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

  const prevPlayIdRef = useRef(curPlayId);
  useEffect(() => {
    if (!elementRefs?.audioEl || !elementRefs?.waveformInst) return;
    const audioEl = elementRefs.audioEl;
    if (!audioEl.getAttribute("src")) return;
    const waveform = elementRefs.waveformInst;
    const isTrackChange = prevPlayIdRef.current !== curPlayId;
    prevPlayIdRef.current = curPlayId;

    const savedTime = isTrackChange ? 0 : audioEl.currentTime;
    const wasPlaying = isPlaybackActive;

    detachStaleBackendListeners(waveform);
    waveform.load(audioEl);

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

  // Canvas wave/progress colors are baked into <canvas> fillStyle and must be
  // re-pushed on theme flip. In-place update avoids the destroy+recreate cycle
  // that triggers the upstream MediaElement listener leak.
  const applyWaveformColors = () => {
    const waveform = waveformInstRef.current;
    // setWaveColor/setProgressColor → drawBuffer() → backend.getDuration(),
    // which throws before any media has been loaded.
    if (!waveform?.isReady) return;
    const waveColor = colorsRef.current?.waveColor;
    const progressColor = colorsRef.current?.progressColor;
    if (waveColor) waveform.setWaveColor(waveColor);
    if (progressColor) waveform.setProgressColor(progressColor);
  };
  const applyWaveformColorsRef = useRef(applyWaveformColors);
  applyWaveformColorsRef.current = applyWaveformColors;

  const prevColorSchemeRef = useRef(colorScheme);
  useEffect(() => {
    if (prevColorSchemeRef.current === colorScheme) return;
    prevColorSchemeRef.current = colorScheme;
    applyWaveformColorsRef.current();
  }, [colorScheme, elementRefs?.waveformInst]);

  useEffect(() => {
    const handler = () => applyWaveformColorsRef.current();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
};
