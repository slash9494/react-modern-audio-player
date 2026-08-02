import {
  AudioAttrsContext,
  audioAttrsContext,
} from "@/audio-player/Context/AudioAttrsContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useAudioAttrsContext = (): AudioAttrsContext =>
  useNonNullableContext(audioAttrsContext);
