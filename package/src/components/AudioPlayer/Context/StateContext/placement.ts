import { DropdownContentPlacement } from "@/components/Dropdown";
import { NumbersToUnionNum } from "@/utils/generateUnionNumType";
import { ActiveUI } from "./element";

export type VolumeSliderPlacement = DropdownContentPlacement;
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
export const defaultInterfacePlacementMaxLength = 10; // plus 1 for deleted number 0;

export type InterfacePlacementKey =
  | Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime" | "volumeSlider">
  | "trackTimeCurrent"
  | "trackTimeDuration";

export type InterfaceGridTemplateArea<TMaxLength extends number> = Partial<
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
  TMaxLength extends number = typeof defaultInterfacePlacementMaxLength
> = {
  templateArea?: InterfaceGridTemplateArea<TMaxLength>;
  customComponentsArea?: InterfaceGridCustomComponentsArea<TMaxLength>;
  itemCustomArea?: InterfaceGridItemArea;
};

export const defaultInterfacePlacement: {
  templateArea: Required<
    InterfaceGridTemplateArea<typeof defaultInterfacePlacementMaxLength>
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
  },
};

export interface Placements {
  playListPlacement: PlayListPlacement;
  interfacePlacement: InterfacePlacement;
  volumeSliderPlacement: VolumeSliderPlacement | undefined;
  playerPlacement: PlayerPlacement | undefined;
}
