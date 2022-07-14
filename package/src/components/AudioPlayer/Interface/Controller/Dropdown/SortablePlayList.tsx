import classNames from "classnames";
import { FC, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useNonNullableContext } from "../../../../../hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "../../../../../lib/audioContext/dispatchContext";
import {
  AudioData,
  audioPlayerStateContext,
  PlayList,
} from "../../../../../lib/audioContext/StateContext";
import { SortableList } from "../../../../SortableList";
import { StyledDropdown } from "./StyledDropdown";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

export const SortablePlayList: FC<InterfaceChildrenProps> = () => {
  const { playList, curPlayId, iconImgs, activeUI, coverImgsCss } =
    useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClickItem = useCallback(
    (index: number) => {
      audioPlayerDispatch({
        type: "SET_CURRENT_INDEX",
        currentIndex: index,
        currentAudioId: playList[index].id,
      });
    },
    [audioPlayerDispatch, playList]
  );

  const TriggerEl = (isOpen: boolean) =>
    useMemo(() => {
      return (
        <TriggerElContainer
          isOpen={isOpen}
          className="play-list-trigger-container"
        >
          <Icon
            render={<MdOutlineKeyboardArrowDown size={"100%"} />}
            customImg={iconImgs?.dropDown}
          />
        </TriggerElContainer>
      );
    }, [isOpen]);

  const ContentEl = useMemo(() => {
    const onDropItem = (newList: PlayList) => {
      audioPlayerDispatch({
        type: "UPDATE_PLAY_LIST",
        playList: newList,
      });
    };
    const ListItem = ({ data }: { data: AudioData; index: number }) => {
      return (
        <ListItemContainer
          className={classNames("list-item-container", {
            curPlayed: curPlayId === data.id,
          })}
        >
          <div className="list-item-contents-wrapper">
            <div className="album-cover-wrapper">
              <img src={data.img} alt="" style={coverImgsCss?.listThumbnail} />
            </div>
            <div className="album-info-wrapper">
              {data.writer && <span className="writer">{data.writer}</span>}
              {data.name && <span className="title">{data.name}</span>}
              {data.description && (
                <div className="description">{data.description}</div>
              )}
            </div>
          </div>
        </ListItemContainer>
      );
    };
    return playList.length !== 0 ? (
      ReactDOM.createPortal(
        <SortableList
          data={playList}
          renderItem={(data, index) => (
            <ListItem key={index} data={data} index={index} />
          )}
          onDropCb={onDropItem}
          onClickCb={onClickItem}
        />,
        document.querySelector(
          ".sortable-play-list-content-container"
        ) as HTMLDivElement
      )
    ) : (
      <></>
    );
  }, [playList, onClickItem, audioPlayerDispatch, curPlayId, coverImgsCss]);

  return activeUI.playList ?? activeUI.all ? (
    <StyledDropdown
      TriggerEl={(isOpen: boolean) => TriggerEl(isOpen)}
      ContentEl={() => ContentEl}
    />
  ) : null;
};

interface TriggerElContainerProps {
  isOpen: boolean;
}

const TriggerElContainer = styled.div`
  ${({ isOpen }: TriggerElContainerProps) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 100%;
      transition: transform 0.2s ease-in-out;
    }
    ${isOpen
      ? css`
          svg {
            transform: rotateX(180deg);
          }
        `
      : css`
          svg {
            transform: rotateY(0deg);
          }
        `}
  `}
`;

const ListItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &.curPlayed {
    background: var(--rs-audio-player-selected-list-item-background);
  }
  .list-item-contents-wrapper {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  .album-cover-wrapper {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
    }
  }
  .album-info-wrapper {
    display: grid;
    min-width: 10px;
    font-size: 13px;
    margin-right: 1.5rem;
    padding: 2px 0%;
    span {
      align-self: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
