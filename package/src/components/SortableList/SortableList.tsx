import { FC, PropsWithChildren } from "react";
import { SortableListItem } from "./SortableListItem";
import styled from "styled-components";

const SortableList: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SortableListContainer className="sortable-list-container">
      {children}
    </SortableListContainer>
  );
};

const SortableListContainer = styled.ul`
  ul,
  li {
    list-style-type: none;
  }
  cursor: pointer;
`;

type SortableListComponent = typeof SortableList & {
  Item: typeof SortableListItem;
};

export default SortableList as SortableListComponent;
