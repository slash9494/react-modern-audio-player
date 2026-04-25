import { ReactNode, createContext } from "react";

export const playListEmptyContext = createContext<ReactNode>(null);
playListEmptyContext.displayName = "PlayListEmptyContext";
