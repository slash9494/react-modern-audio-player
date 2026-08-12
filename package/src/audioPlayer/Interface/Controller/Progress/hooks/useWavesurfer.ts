import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { useTrackContext } from "@/audioPlayer/Context/hooks/useTrackContext";
import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import { useUIContext } from "@/audioPlayer/Context/hooks/useUIContext";
import { useEffect, useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js";
import type { WaveformModeResult } from "./useWaveformMode";

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
  // `backend` itself is public API; only its MediaElement internals are untyped.
  const backend = waveform.backend as unknown as
    | MediaElementBackendInternals
    | undefined;
  if (!backend?.media || !backend.mediaListeners) return;
  for (const [id, listener] of Object.entries(backend.mediaListeners)) {
    backend.media.removeEventListener(id, listener);
  }
};

export const useWaveSurfer = (
  waveformRef: React.RefObject<HTMLElement>,
  waveformMode: WaveformModeResult
) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { isPlaying: isPlaybackActive, isLoadedMetaData } =
    usePlaybackContext();
  const { curPlayId } = useTrackContext();
  const { elementRefs } = useResourceContext();
  const { mode, curTrack, sizeGatePending } = waveformMode;
  const { colorScheme } = useUIContext();
  const colorsRef = useVariableColor(waveformColors, colorScheme);
  const waveformInstRef = useRef(elementRefs?.waveformInst);
  waveformInstRef.current = elementRefs?.waveformInst;
  const [isWaveformReady, setIsWaveformReady] = useState(false);

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

  // Skeleton shows until wavesurfer re-fires "redraw" for the new track.
  useEffect(() => {
    setIsWaveformReady(false);
  }, [curPlayId]);

  const prevPlayIdRef = useRef(curPlayId);
  useEffect(() => {
    if (!elementRefs?.audioEl || !elementRefs?.waveformInst) return;
    const audioEl = elementRefs.audioEl;
    if (!audioEl.getAttribute("src")) return;
    if (!isLoadedMetaData) return;
    const waveform = elementRefs.waveformInst;
    const isTrackChange = prevPlayIdRef.current !== curPlayId;
    prevPlayIdRef.current = curPlayId;

    const savedTime = isTrackChange ? 0 : audioEl.currentTime;
    const wasPlaying = isPlaybackActive;

    // Live streams and oversized files skip load() entirely; Progress swaps in
    // BarProgress as their static placeholder while this waveform stays hidden.
    if (mode !== "normal") return;
    // Size HEAD unresolved: defer decode until the gate settles, then this
    // effect re-runs and lands on either load() (small) or faux (oversized).
    if (sizeGatePending) return;

    // useAudio owns the primary track-change autoplay (deps include
    // audioResetKey), but `waveform.load(audioEl)` re-attaches MediaElement
    // listeners and can race with that play() call — the racing play() rejects
    // with AbortError. This onReady fallback restarts playback once wavesurfer
    // settles, so the waveform path stays alive even after that abort.
    const onReady = () => {
      if (!isTrackChange && savedTime > 0 && audioEl.duration) {
        audioEl.currentTime = savedTime;
        waveform.seekTo(savedTime / audioEl.duration);
      }
      if (wasPlaying) audioEl.play();
    };
    // "redraw" also fires for resize relays and the pre-decode canplay draw,
    // both with empty peaks; only a draw that painted real bars may settle.
    const onRedraw = (peaks: unknown) =>
      Array.isArray(peaks) && peaks.length > 0 && setIsWaveformReady(true);
    // A decode/network error must settle to the (blank but functional) waveform,
    // not leave the loading skeleton pulsing forever.
    const onError = () => setIsWaveformReady(true);
    // Register before load(): for peaks-provided tracks wavesurfer 6.6.4 fires
    // the settling "redraw" synchronously inside load(), before it would return.
    waveform.on("ready", onReady);
    waveform.on("redraw", onRedraw);
    waveform.on("error", onError);

    detachStaleBackendListeners(waveform);
    if (curTrack?.peaks) {
      waveform.load(audioEl, curTrack.peaks, undefined, curTrack.duration);
    } else {
      waveform.load(audioEl);
    }

    return () => {
      waveform.un("ready", onReady);
      waveform.un("redraw", onRedraw);
      waveform.un("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    curPlayId,
    elementRefs?.audioEl,
    elementRefs?.waveformInst,
    mode,
    curTrack,
    isLoadedMetaData,
    sizeGatePending,
  ]);

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

  return { isWaveformReady };
};
