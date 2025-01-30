/// <reference types="react" />
import { ListData } from "./index";
export interface UseSortableListItemProps<T> {
    index: number;
    dragStartIdx: number;
    listData: ListData<T>;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLLIElement>, newListData: ListData<T>) => void;
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}
export declare const useSortableListItem: <T>(props: UseSortableListItemProps<T>) => React.LiHTMLAttributes<HTMLLIElement>;
