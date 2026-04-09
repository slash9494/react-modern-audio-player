import { createContext } from "react";
import {
  ActiveUI,
  InterfacePlacement,
  PlayListPlacement,
  PlayerPlacement,
  VolumeSliderPlacement,
} from "./StateContext";

export type ColorScheme = "light" | "dark";

export interface UIContext {
  activeUI: ActiveUI;
  playListPlacement: PlayListPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  volumeSliderPlacement?: VolumeSliderPlacement;
  colorScheme?: ColorScheme;
}

export const uiContext = createContext<UIContext | null>(null);
uiContext.displayName = "UIContext";
