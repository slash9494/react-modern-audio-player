import { useEffect, useState } from "react";
import { AudioData } from "@/components/AudioPlayer/Context";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { isLiveTrack } from "./isLiveTrack";

export type WaveformMode = "live" | "faux" | "normal";

export const LARGE_FILE_THRESHOLD_SEC = 30 * 60;

const BYTES_PER_MB = 1024 * 1024;

export const LARGE_FILE_BYTES = 50 * BYTES_PER_MB;

// One HEAD per src, reused across re-renders, track revisits, and any AudioPlayer instances sharing the src.
const contentLengthCache = new Map<string, Promise<number | null>>();

// Warn once per src across those same re-renders / revisits / shared instances.
const warnedLargeFileSrc = new Set<string>();

const fetchContentLength = (src: string): Promise<number | null> => {
  const cached = contentLengthCache.get(src);
  if (cached) return cached;

  const pending =
    typeof fetch === "undefined"
      ? Promise.resolve<number | null>(null)
      : fetch(src, { method: "HEAD" })
          .then((res) => {
            const header = res.headers.get("content-length");
            return header ? Number(header) : null;
          })
          .catch(() => null);

  contentLengthCache.set(src, pending);
  return pending;
};

export const getWaveformMode = (
  audioData: AudioData | undefined,
  audioElDuration: number | undefined,
  isOversizeBytes?: boolean
): WaveformMode => {
  if (isLiveTrack(audioData, audioElDuration)) return "live";

  if (audioData?.peaks) return "normal";

  const knownDuration = audioData?.duration ?? audioElDuration;
  const isLargeFile =
    knownDuration != null &&
    Number.isFinite(knownDuration) &&
    knownDuration > LARGE_FILE_THRESHOLD_SEC;
  if (isLargeFile) return "faux";

  if (isOversizeBytes === true) return "faux";

  return "normal";
};

export type WaveformModeResult = {
  mode: WaveformMode;
  curTrack: AudioData | undefined;
  sizeGatePending: boolean;
};

export const useWaveformMode = (): WaveformModeResult => {
  const { curPlayId, playList } = useTrackContext();
  const { elementRefs } = useResourceContext();
  const { isLoadedMetaData } = usePlaybackContext();
  const [oversizeSrc, setOversizeSrc] = useState<string | null>(null);
  const [sizeResolvedSrc, setSizeResolvedSrc] = useState<string | null>(null);

  const curTrack = playList.find((audioData) => audioData.id === curPlayId);
  const audioElDuration = isLoadedMetaData
    ? elementRefs?.audioEl?.duration
    : undefined;
  const baseMode = getWaveformMode(curTrack, audioElDuration);

  const src = curTrack?.src;
  const isSizeGateCandidate =
    baseMode === "normal" && !!src && !curTrack?.peaks;

  useEffect(() => {
    if (!isSizeGateCandidate || !src) return;

    let cancelled = false;
    fetchContentLength(src).then((bytes) => {
      if (cancelled) return;
      setSizeResolvedSrc(src);
      // null = unknown size (missing header / CORS / SSR), not "small": kept on
      // the normal decode path. A CORS-blocked HEAD also blocks the decode fetch,
      // so only a same-origin header-less >50MB stream can slip this gate.
      if (bytes != null && bytes > LARGE_FILE_BYTES) {
        setOversizeSrc(src);
        if (
          process.env.NODE_ENV !== "production" &&
          !warnedLargeFileSrc.has(src)
        ) {
          warnedLargeFileSrc.add(src);
          // eslint-disable-next-line no-console
          console.warn(
            `[react-modern-audio-player] Track "${src}" is larger than ${
              LARGE_FILE_BYTES / BYTES_PER_MB
            } MB; ` +
              `its waveform decode is skipped and it falls back to the bar progress. ` +
              "Provide `peaks` to render its waveform."
          );
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isSizeGateCandidate, src]);

  const mode = isSizeGateCandidate && oversizeSrc === src ? "faux" : baseMode;
  const sizeGatePending = isSizeGateCandidate && sizeResolvedSrc !== src;

  return { mode, curTrack, sizeGatePending };
};
