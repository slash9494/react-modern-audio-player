import { DropdownContentPlacement } from "@/components/Dropdown";
import { NumbersToUnionNum } from "@/utils/generateUnionNumType";
import { ActiveUI } from "./element";

export type VolumeSliderPlacement = DropdownContentPlacement;
export type SpeedSelectorPlacement = DropdownContentPlacement;
export type PlayListPlacement = "bottom" | "top";
export type PlayerPlacement =
  | "bottom"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right"
  | "static";

//TODO : declare dynamic length type depending on the number of activeUI;
// Exclusive upper bound for the `InterfacePlacement<N>` generic — usable grid
// indices are `1..(DEFAULT_INTERFACE_GRID_BOUND - 1)` (i.e. `1..10` by default).
export const DEFAULT_INTERFACE_GRID_BOUND = 11;

export type InterfacePlacementKey =
  | Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime" | "volumeSlider">
  | "trackTimeCurrent"
  | "trackTimeDuration";

export type InterfaceGridTemplateArea<
  TMaxLength extends number = typeof DEFAULT_INTERFACE_GRID_BOUND
> = Partial<
  Record<
    InterfacePlacementKey,
    `row${NumbersToUnionNum<TMaxLength>}-${NumbersToUnionNum<TMaxLength>}`
  >
>;

export type InterfaceGridCustomComponentsArea<TMaxLength extends number> =
  Partial<
    Record<
      string,
      `row${NumbersToUnionNum<TMaxLength>}-${NumbersToUnionNum<TMaxLength>}`
    >
  >;

export type InterfaceGridItemArea = Partial<
  Record<InterfacePlacementKey, string>
>;

export type InterfacePlacement<
  TMaxLength extends number = typeof DEFAULT_INTERFACE_GRID_BOUND
> = {
  templateArea?: InterfaceGridTemplateArea<TMaxLength>;
  customComponentsArea?: InterfaceGridCustomComponentsArea<TMaxLength>;
  itemCustomArea?: InterfaceGridItemArea;
};

export const defaultInterfacePlacement: {
  templateArea: Required<
    InterfaceGridTemplateArea<typeof DEFAULT_INTERFACE_GRID_BOUND>
  >;
} = {
  templateArea: {
    artwork: "row1-1",
    trackInfo: "row1-2",
    trackTimeCurrent: "row1-3",
    trackTimeDuration: "row1-4",
    progress: "row1-5",
    repeatType: "row1-6",
    volume: "row1-7",
    playButton: "row1-8",
    playList: "row1-9",
    playbackRate: "row1-10",
  },
};

export interface Placements<
  TInterfacePlacementLength extends number = typeof DEFAULT_INTERFACE_GRID_BOUND
> {
  playListPlacement: PlayListPlacement;
  interfacePlacement: InterfacePlacement<TInterfacePlacementLength>;
  volumeSliderPlacement: VolumeSliderPlacement | undefined;
  speedSelectorPlacement: SpeedSelectorPlacement | undefined;
  playerPlacement: PlayerPlacement | undefined;
}
