import {
  ResourceContext,
  resourceContext,
} from "@/audioPlayer/Context/ResourceContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useResourceContext = (): ResourceContext =>
  useNonNullableContext(resourceContext);
