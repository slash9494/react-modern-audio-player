import { uiContext } from "@/audio-player/Context/UIContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useUIContext = () => useNonNullableContext(uiContext);
