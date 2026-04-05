import { PropsWithChildren } from "react";
import { ListItem } from "./index";
import {
  useSortableListItem,
  UseSortableListItemProps,
} from "./useSortableListItem";
import "./SortableListItem.css";

export type SortableListItemProps<T> = UseSortableListItemProps<T>;

export const SortableListItem = <T extends ListItem>(
  props: PropsWithChildren<SortableListItemProps<T>>
) => {
  const { children, ...useListItemProps } = props;
  const eventProps = useSortableListItem(useListItemProps);

  return (
    <li className="rmap-sortable-item" {...eventProps}>
      <div className="rmap-sortable-item-inner">{children}</div>
    </li>
  );
};
