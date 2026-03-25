import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { useNonNullableContext } from "../useNonNullableContext";

export const usePlaybackContext = () => useNonNullableContext(playbackContext);
