import { createContext } from "react";

export interface TimeContext {
  currentTime: number;
  duration: number;
}

export const timeContext = createContext<TimeContext | null>(null);
