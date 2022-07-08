import { NumbersToUnionNum } from "../../../utils/generateUnionNumType";
import { ActiveUI } from "./element";

export type DropdownPlacement = "bottom" | "top";
export type PlayerPlacement =
  | "bottom"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

//TODO : declare dynamic length type depending on the number of activeUI;
export const interfacePlacementMaxLength = 9; // plus 1 for deleted number 0;
type InterfacePlacementKey = Exclude<keyof ActiveUI, "all" | "prevNnext">;

export type InterfacePlacement = Partial<
  Record<
    InterfacePlacementKey,
    `${NumbersToUnionNum<
      typeof interfacePlacementMaxLength
    >}-${NumbersToUnionNum<typeof interfacePlacementMaxLength>}`
  >
>;

export const defaultInterfacePlacement: InterfacePlacement = {
  artwork: "1-1",
  trackInfo: "1-2",
  trackTime: "1-3",
  progress: "1-4",
  repeatType: "1-5",
  volume: "1-6",
  playButton: "1-7",
  playList: "1-8",
};
