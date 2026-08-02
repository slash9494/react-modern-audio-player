import { TimeContext, timeContext } from "@/audio-player/Context/TimeContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useTimeContext = (): TimeContext =>
  useNonNullableContext(timeContext);
