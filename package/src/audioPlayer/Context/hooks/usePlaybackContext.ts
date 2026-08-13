import {
  PlaybackContext,
  playbackContext,
} from "@/audioPlayer/Context/PlaybackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const usePlaybackContext = (): PlaybackContext =>
  useNonNullableContext(playbackContext);
