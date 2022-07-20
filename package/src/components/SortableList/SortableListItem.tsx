import { Flex } from "@react-spectrum/layout";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { ListItem } from "./index";
import {
  useSortableListItem,
  UseSortableListItemProps,
} from "./useSortableListItem";

export type SortableListItemProps<T> = UseSortableListItemProps<T>;

export const SortableListItem = <T extends ListItem>(
  props: PropsWithChildren<SortableListItemProps<T>>
) => {
  const { children, ...useListItemProps } = props;
  const eventProps = useSortableListItem(useListItemProps);

  return (
    <SortableListItemContainer
      className="list-item-root-container"
      {...eventProps}
    >
      <Flex alignItems={"center"}>{children}</Flex>
    </SortableListItemContainer>
  );
};

const SortableListItemContainer = styled.li`
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;

  & * {
    pointer-events: none;
  }

  &.dragstart {
    opacity: 0.5;
  }

  &.dragover {
    transform: scale(1.02);
    backdrop-filter: blur(20px);
    box-shadow: 0px 3.58195px 22.3872px -2.68646px rgb(0 0 0 / 20%);
  }
`;
