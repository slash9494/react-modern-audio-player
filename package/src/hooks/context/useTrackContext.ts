import {
  TrackContext,
  trackContext,
} from "@/components/AudioPlayer/Context/TrackContext";
import { useNonNullableContext } from "./useNonNullableContext";

export const useTrackContext = (): TrackContext =>
  useNonNullableContext(trackContext);
