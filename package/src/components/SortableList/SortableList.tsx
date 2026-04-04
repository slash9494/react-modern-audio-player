import { FC, PropsWithChildren } from "react";
import { SortableListItem } from "./SortableListItem";
import "./SortableList.css";

const SortableList: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="rmap-sortable-list-container" aria-label="Sortable list">
      {children}
    </ul>
  );
};

type SortableListComponent = typeof SortableList & {
  Item: typeof SortableListItem;
};

export default SortableList as SortableListComponent;
