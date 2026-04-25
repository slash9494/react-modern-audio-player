import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useUIContext = () => useNonNullableContext(uiContext);
