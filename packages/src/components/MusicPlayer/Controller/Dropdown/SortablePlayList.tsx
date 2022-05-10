import { FC, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useNonNullableContext } from "../../../../hooks/useNonNullableContext";
import { musicPlayerDispatchContext } from "../../../../lib/musicContext/dispatchContext";
import {
  musicPlayerStateContext,
  PlayList,
} from "../../../../lib/musicContext/StateContext";
import { SortableList } from "../../../SortableList";
import { StyledDropdown } from "./StyledDropdown";

interface TriggerElContainerProps {
  isOpen: boolean;
}

const TriggerElContainer = styled.div`
  ${({ isOpen }: TriggerElContainerProps) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      transition: transform 0.2s ease-in-out;
    }
    ${isOpen
      ? css`
          img {
            transform: rotateX(180deg);
          }
        `
      : css`
          img {
            transform: rotateY(0deg);
          }
        `}
  `}
`;

export const SortablePlayList: FC = () => {
  const { playList } = useNonNullableContext(musicPlayerStateContext);
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  const onClickItem = useCallback(
    (index: number) => {
      musicPlayerDispatch({
        type: "SET_CURRENT_INDEX",
        currentIndex: index,
        currentMusicId: playList[index].id,
      });
    },
    [musicPlayerDispatch, playList]
  );

  const TriggerEl = (isOpen: boolean) =>
    useMemo(() => {
      return (
        <TriggerElContainer isOpen={isOpen}>
          <img src="/images/down-arrow.svg" alt="" />
        </TriggerElContainer>
      );
    }, [isOpen]);

  const ContentEl = useMemo(() => {
    const onDropItem = (newList: PlayList) => {
      musicPlayerDispatch({
        type: "UPDATE_PLAY_LIST",
        playList: newList,
      });
    };
    return playList.length !== 0 ? (
      ReactDOM.createPortal(
        <SortableList
          data={playList}
          renderItem={(data, index) => <div key={index}>{data.name}</div>}
          onDropCb={onDropItem}
          onClickCb={onClickItem}
        />,
        document.querySelector(
          ".sortable-play-list-content-wrapper"
        ) as HTMLDivElement
      )
    ) : (
      <></>
    );
  }, [playList, onClickItem, musicPlayerDispatch]);
  return (
    <StyledDropdown
      TriggerEl={(isOpen: boolean) => TriggerEl(isOpen)}
      ContentEl={() => ContentEl}
    />
  );
};
