import {
  PlaybackContext,
  playbackContext,
} from "@/components/AudioPlayer/Context/PlaybackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const usePlaybackContext = (): PlaybackContext =>
  useNonNullableContext(playbackContext);
