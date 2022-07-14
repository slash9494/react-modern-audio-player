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
export const interfacePlacementMaxLength = 10; // plus 1 for deleted number 0;
type InterfacePlacementKey =
  | Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime">
  | "trackTimeCurrent"
  | "trackTimeDuration";

export type InterfaceGridTemplateArea = Partial<
  Record<
    InterfacePlacementKey,
    `row${NumbersToUnionNum<
      typeof interfacePlacementMaxLength
    >}-${NumbersToUnionNum<typeof interfacePlacementMaxLength>}`
  >
>;
export type InterfaceGridItemArea = Partial<
  Record<InterfacePlacementKey, string>
>;
export type InterfacePlacement = {
  templateArea: InterfaceGridTemplateArea;
  itemArea?: InterfaceGridItemArea;
};

export const defaultInterfacePlacement: {
  templateArea: Required<InterfaceGridTemplateArea>;
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
