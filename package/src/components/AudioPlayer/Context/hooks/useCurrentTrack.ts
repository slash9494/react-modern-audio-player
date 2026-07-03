import { AudioData } from "@/components/AudioPlayer/Context";
import { useTrackContext } from "./useTrackContext";

export const useCurrentTrack = (): AudioData | undefined => {
  const { curPlayId, playList } = useTrackContext();
  return playList.find((audioData) => audioData.id === curPlayId);
};
