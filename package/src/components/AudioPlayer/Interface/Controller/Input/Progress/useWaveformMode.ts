import { useEffect, useState } from "react";
import { AudioData } from "@/components/AudioPlayer/Context";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useCurrentTrack } from "@/components/AudioPlayer/Context/hooks/useCurrentTrack";
import { createTimeoutSignal } from "@/utils/timeoutSignal";
import { isLiveTrack } from "./isLiveTrack";

export type WaveformMode = "live" | "faux" | "normal";

// Decoded PCM costs ~353KB/s (44.1kHz stereo float32): 30min ≈ 0.6GB, already
// the kill line for mobile Safari tabs — decode time is not the constraint.
export const LARGE_FILE_THRESHOLD_SEC = 30 * 60;

const BYTES_PER_MB = 1024 * 1024;

// Download budget (~10s at 40Mbps) and the catch for short-but-heavy hi-res
// files that slip the duration gate.
export const LARGE_FILE_BYTES = 50 * BYTES_PER_MB;

// A hung HEAD must not pin sizeGatePending forever; time out and fail open to the normal decode path.
const HEAD_TIMEOUT_MS = 8000;

// One HEAD per src, reused across re-renders, track revisits, and any AudioPlayer instances sharing the src.
const contentLengthCache = new Map<string, Promise<number | null>>();

// Warn once per src across those same re-renders / revisits / shared instances.
const warnedLargeFileSrc = new Set<string>();

// Test-only: module caches otherwise leak state between test files sharing a src.
export const __resetWaveformSizeCache = () => {
  contentLengthCache.clear();
  warnedLargeFileSrc.clear();
};

const fetchContentLength = (src: string): Promise<number | null> => {
  const cached = contentLengthCache.get(src);
  if (cached) return cached;

  const timeout =
    typeof fetch === "undefined" ? null : createTimeoutSignal(HEAD_TIMEOUT_MS);

  const pending: Promise<number | null> =
    typeof fetch === "undefined"
      ? Promise.resolve<number | null>(null)
      : fetch(src, { method: "HEAD", signal: timeout?.signal })
          .then((res) => {
            const header = res.headers.get("content-length");
            return header ? Number(header) : null;
          })
          .catch(() => null)
          // Trailing .then (not .finally) clears the timer: .finally postdates
          // AbortController on some engines (EdgeHTML/FF57), reintroducing a throw.
          .then((bytes) => {
            timeout?.cancel();
            return bytes;
          });

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

// `enabled` skips the HEAD size probe for bar-only players; it stays true while a
// waveform instance is mounted so an oversized track's "faux" verdict cannot flip
// back to "normal" and trigger a hidden decode.
export const useWaveformMode = (enabled = true): WaveformModeResult => {
  const { elementRefs } = useResourceContext();
  const { isLoadedMetaData } = usePlaybackContext();
  const [oversizeSrc, setOversizeSrc] = useState<string | null>(null);
  const [sizeResolvedSrc, setSizeResolvedSrc] = useState<string | null>(null);

  const curTrack = useCurrentTrack();
  const audioElDuration = isLoadedMetaData
    ? elementRefs?.audioEl?.duration
    : undefined;
  const baseMode = getWaveformMode(curTrack, audioElDuration);

  const src = curTrack?.src;
  const isSizeGateCandidate =
    enabled && baseMode === "normal" && !!src && !curTrack?.peaks;

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
