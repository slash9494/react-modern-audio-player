import {
  PlaybackContext,
  playbackContext,
} from "@/audio-player/Context/PlaybackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const usePlaybackContext = (): PlaybackContext =>
  useNonNullableContext(playbackContext);
