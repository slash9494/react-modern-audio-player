import { createContext } from "react";

export interface TimeContext {
  currentTime: number;
  duration: number;
  seekRequestKey: number;
}

export const timeContext = createContext<TimeContext | null>(null);
