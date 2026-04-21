import { createContext } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";

export interface PlayListPortalContextValue {
  node: HTMLDivElement | null;
}

export const playListPortalContext =
  createContext<PlayListPortalContextValue | null>(null);
playListPortalContext.displayName = "PlayListPortalContext";

export const usePlayListPortalContext = () =>
  useNonNullableContext(playListPortalContext);
