import { FC, PropsWithChildren } from "react";
import { SortableListItem } from "./SortableListItem";
import "./SortableList.css";

const SortableList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className="sortable-list-container">{children}</ul>;
};

type SortableListComponent = typeof SortableList & {
  Item: typeof SortableListItem;
};

export default SortableList as SortableListComponent;
