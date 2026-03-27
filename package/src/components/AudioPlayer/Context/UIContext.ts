import { createContext } from "react";
import {
  ActiveUI,
  InterfacePlacement,
  PlayListPlacement,
  PlayerPlacement,
  VolumeSliderPlacement,
} from "./StateContext";

export interface UIContext {
  activeUI: ActiveUI;
  playListPlacement: PlayListPlacement;
  playerPlacement?: PlayerPlacement;
  interfacePlacement?: InterfacePlacement;
  volumeSliderPlacement?: VolumeSliderPlacement;
}

export const uiContext = createContext<UIContext | null>(null);
