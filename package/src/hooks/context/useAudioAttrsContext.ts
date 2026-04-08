import {
  AudioAttrsContext,
  audioAttrsContext,
} from "@/components/AudioPlayer/Context/AudioAttrsContext";
import { useNonNullableContext } from "../useNonNullableContext";

export const useAudioAttrsContext = (): AudioAttrsContext =>
  useNonNullableContext(audioAttrsContext);
