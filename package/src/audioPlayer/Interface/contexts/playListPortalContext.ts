import { createContext } from "react";

export const playListPortalContext = createContext<HTMLDivElement | null>(null);
playListPortalContext.displayName = "PlayListPortalContext";
