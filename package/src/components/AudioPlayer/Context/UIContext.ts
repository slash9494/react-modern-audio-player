import { createContext } from "react";
import {
  ActiveUI,
  InterfacePlacement,
  PlayListPlacement,
  PlayerPlacement,
  SpeedSelectorPlacement,
  VolumeSliderPlacement,
} from "./StateContext";

export type ColorScheme = "light" | "dark";

export interface UIContext {
  activeUI: ActiveUI;
  playListPlacement: PlayListPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  volumeSliderPlacement?: VolumeSliderPlacement;
  speedSelectorPlacement?: SpeedSelectorPlacement;
  colorScheme?: ColorScheme;
  playListExpanded?: boolean;
}

export const uiContext = createContext<UIContext | null>(null);
uiContext.displayName = "UIContext";
