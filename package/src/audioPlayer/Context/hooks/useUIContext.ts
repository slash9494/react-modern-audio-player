import { uiContext } from "@/audioPlayer/Context/UIContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";

export const useUIContext = () => useNonNullableContext(uiContext);
