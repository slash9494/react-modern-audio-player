import { FC } from "react";
export declare type ListItem = Record<string, any>;
export declare type ListData = Array<ListItem>;
export interface SortableListProps {
    data: ListData;
    renderItem: (item: ListItem, index: number) => JSX.Element;
    onDropCb: (newData: ListData) => void;
    onClickCb?: (index: number) => void;
}
export declare const SortableList: FC<SortableListProps>;
