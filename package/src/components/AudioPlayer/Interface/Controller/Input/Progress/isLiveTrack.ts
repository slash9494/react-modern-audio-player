import { AudioData } from "@/components/AudioPlayer/Context";

export const isLiveTrack = (
  audioData: AudioData | undefined,
  audioElDuration: number | undefined
): boolean =>
  audioData?.isLive === true || audioElDuration === Number.POSITIVE_INFINITY;
