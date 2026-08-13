import { AudioData } from "@/audioPlayer/Context";

// Browsers report duration === Infinity for unbounded streams (e.g. Icecast).
export const isLiveTrack = (
  audioData: AudioData | undefined,
  audioElDuration: number | undefined
): boolean =>
  audioData?.isLive === true || audioElDuration === Number.POSITIVE_INFINITY;
