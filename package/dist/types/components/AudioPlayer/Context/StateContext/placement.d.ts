import { DropdownContentPlacement } from '../../../Dropdown';
import { NumbersToUnionNum } from '../../../../utils/generateUnionNumType';
import { ActiveUI } from "./element";
export declare type VolumeSliderPlacement = DropdownContentPlacement;
export declare type PlayListPlacement = "bottom" | "top";
export declare type PlayerPlacement = "bottom" | "top" | "bottom-left" | "bottom-right" | "top-left" | "top-right" | "static";
export declare const defaultInterfacePlacementMaxLength = 10;
export declare type InterfacePlacementKey = Exclude<keyof ActiveUI, "all" | "prevNnext" | "trackTime" | "volumeSlider"> | "trackTimeCurrent" | "trackTimeDuration";
export declare type InterfaceGridTemplateArea<TMaxLength extends number> = Partial<Record<InterfacePlacementKey, `row${NumbersToUnionNum<TMaxLength>}-${NumbersToUnionNum<TMaxLength>}`>>;
export declare type InterfaceGridCustomComponentsArea<TMaxLength extends number> = Partial<Record<string, `row${NumbersToUnionNum<TMaxLength>}-${NumbersToUnionNum<TMaxLength>}`>>;
export declare type InterfaceGridItemArea = Partial<Record<InterfacePlacementKey, string>>;
export declare type InterfacePlacement<TMaxLength extends number = typeof defaultInterfacePlacementMaxLength> = {
    templateArea?: InterfaceGridTemplateArea<TMaxLength>;
    customComponentsArea?: InterfaceGridCustomComponentsArea<TMaxLength>;
    itemCustomArea?: InterfaceGridItemArea;
};
export declare const defaultInterfacePlacement: {
    templateArea: Required<InterfaceGridTemplateArea<typeof defaultInterfacePlacementMaxLength>>;
};
export interface Placements<TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength> {
    playListPlacement: PlayListPlacement;
    interfacePlacement: InterfacePlacement<TInterfacePlacementLength>;
    volumeSliderPlacement: VolumeSliderPlacement | undefined;
    playerPlacement: PlayerPlacement | undefined;
}
