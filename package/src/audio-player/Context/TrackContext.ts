import { createContext } from "react";
import { PlayList } from "./StateContext";

export interface TrackContext {
  playList: PlayList;
  curPlayId: number;
  curIdx: number;
}

export const trackContext = createContext<TrackContext | null>(null);
trackContext.displayName = "TrackContext";
