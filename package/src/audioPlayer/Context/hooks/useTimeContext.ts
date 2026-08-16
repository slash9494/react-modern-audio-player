import { TimeContext, timeContext } from "@/audioPlayer/Context/TimeContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useTimeContext = (): TimeContext =>
  useNonNullableContext(timeContext);
