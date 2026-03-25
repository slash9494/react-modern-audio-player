import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { useNonNullableContext } from "../useNonNullableContext";

export const useResourceContext = () => useNonNullableContext(resourceContext);
