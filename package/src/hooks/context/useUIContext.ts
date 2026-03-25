import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { useNonNullableContext } from "../useNonNullableContext";

export const useUIContext = () => useNonNullableContext(uiContext);
