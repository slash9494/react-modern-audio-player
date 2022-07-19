import SortableList from "./SortableList";
import { SortableListItem } from "./SortableListItem";

SortableList.Item = SortableListItem;
export default SortableList;

export type ListData<T> = Array<T>;
export type ListItem = Record<string, any> & { index: number };

export type { UseSortableListItemProps } from "./useSortableListItem";
export type { SortableListItemProps } from "./SortableListItem";
