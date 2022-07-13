import { FC, PropsWithChildren } from "react";
interface SortableListItemProps {
    index: number;
    draggable?: boolean;
    onDragStartCb?: (index: number) => void;
    onDropCb?: (index: number) => void;
    onClickCb?: (index: number) => void;
}
export declare const SortableListItem: FC<PropsWithChildren<SortableListItemProps>>;
export {};
