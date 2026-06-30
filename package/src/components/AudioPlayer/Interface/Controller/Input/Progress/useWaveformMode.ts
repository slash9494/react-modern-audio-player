import { useEffect, useState } from "react";
import { AudioData } from "@/components/AudioPlayer/Context";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { isLiveTrack } from "./isLiveTrack";

export type WaveformMode = "live" | "faux" | "normal";

export const LARGE_FILE_THRESHOLD_SEC = 30 * 60;

export const LARGE_FILE_BYTES = 50 * 1024 * 1024;

// Cache keeps a single HEAD per src; this hook runs in both Progress and useWaveSurfer.
const contentLengthCache = new Map<string, Promise<number | null>>();

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
  audioElDuration: number | undefined
): WaveformMode => {
  if (isLiveTrack(audioData, audioElDuration)) return "live";

  if (audioData?.peaks) return "normal";

  const knownDuration = audioData?.duration ?? audioElDuration;
  const isLargeFile =
    knownDuration != null &&
    Number.isFinite(knownDuration) &&
    knownDuration > LARGE_FILE_THRESHOLD_SEC;
  if (isLargeFile) return "faux";

  return "normal";
};

type WaveformModeResult = {
  mode: WaveformMode;
  curTrack: AudioData | undefined;
};

export const useWaveformMode = (): WaveformModeResult => {
  const { curPlayId, playList } = useTrackContext();
  const { elementRefs } = useResourceContext();
  const { isLoadedMetaData } = usePlaybackContext();
  const [oversizeSrc, setOversizeSrc] = useState<string | null>(null);

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
      if (bytes != null && bytes > LARGE_FILE_BYTES) setOversizeSrc(src);
    });

    return () => {
      cancelled = true;
    };
  }, [isSizeGateCandidate, src]);

  const mode = isSizeGateCandidate && oversizeSrc === src ? "faux" : baseMode;

  return { mode, curTrack };
};
