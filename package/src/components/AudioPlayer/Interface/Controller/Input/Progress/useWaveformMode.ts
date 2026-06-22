import { AudioData } from "@/components/AudioPlayer/Context";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { isLiveTrack } from "./isLiveTrack";

export type WaveformMode = "live" | "faux" | "normal";

export const LARGE_FILE_THRESHOLD_SEC = 30 * 60;

export const getWaveformMode = (
  audioData: AudioData | undefined,
  audioElDuration: number | undefined
): WaveformMode => {
  if (isLiveTrack(audioData, audioElDuration)) return "live";

  if (audioData?.peaks) return "normal";

  const isLargeFile =
    audioData?.duration != null &&
    audioData.duration > LARGE_FILE_THRESHOLD_SEC;
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

  const curTrack = playList.find((audioData) => audioData.id === curPlayId);
  const mode = getWaveformMode(curTrack, elementRefs?.audioEl?.duration);

  return { mode, curTrack };
};
