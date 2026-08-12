import { TrackContext, trackContext } from "@/audioPlayer/Context/TrackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useTrackContext = (): TrackContext =>
  useNonNullableContext(trackContext);
