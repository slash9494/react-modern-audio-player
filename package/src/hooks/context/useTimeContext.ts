import {
  TimeContext,
  timeContext,
} from "@/components/AudioPlayer/Context/TimeContext";
import { useNonNullableContext } from "../useNonNullableContext";

export const useTimeContext = (): TimeContext =>
  useNonNullableContext(timeContext);
