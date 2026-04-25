import {
  AudioAttrsContext,
  audioAttrsContext,
} from "@/components/AudioPlayer/Context/AudioAttrsContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useAudioAttrsContext = (): AudioAttrsContext =>
  useNonNullableContext(audioAttrsContext);
