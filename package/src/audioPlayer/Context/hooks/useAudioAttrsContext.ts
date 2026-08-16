import {
  AudioAttrsContext,
  audioAttrsContext,
} from "@/audioPlayer/Context/AudioAttrsContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useAudioAttrsContext = (): AudioAttrsContext =>
  useNonNullableContext(audioAttrsContext);
