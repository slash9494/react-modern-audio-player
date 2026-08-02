import {
  ResourceContext,
  resourceContext,
} from "@/audio-player/Context/ResourceContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useResourceContext = (): ResourceContext =>
  useNonNullableContext(resourceContext);
