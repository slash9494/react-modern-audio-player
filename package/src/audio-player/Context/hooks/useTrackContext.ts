import {
  TrackContext,
  trackContext,
} from "@/audio-player/Context/TrackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useTrackContext = (): TrackContext =>
  useNonNullableContext(trackContext);
