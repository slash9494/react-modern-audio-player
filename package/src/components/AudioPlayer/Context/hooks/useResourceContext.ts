import {
  ResourceContext,
  resourceContext,
} from "@/components/AudioPlayer/Context/ResourceContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useResourceContext = (): ResourceContext =>
  useNonNullableContext(resourceContext);
