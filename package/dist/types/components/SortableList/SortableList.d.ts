import { FC, PropsWithChildren } from "react";
import { SortableListItem } from "./SortableListItem";
declare const SortableList: FC<PropsWithChildren<unknown>>;
declare type SortableListComponent = typeof SortableList & {
    Item: typeof SortableListItem;
};
declare const _default: SortableListComponent;
export default _default;
