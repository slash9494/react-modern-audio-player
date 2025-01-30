import { PropsWithChildren } from "react";
import { ListItem } from "./index";
import { UseSortableListItemProps } from "./useSortableListItem";
export declare type SortableListItemProps<T> = UseSortableListItemProps<T>;
export declare const SortableListItem: <T extends ListItem>(props: PropsWithChildren<SortableListItemProps<T>>) => import("react/jsx-runtime").JSX.Element;
