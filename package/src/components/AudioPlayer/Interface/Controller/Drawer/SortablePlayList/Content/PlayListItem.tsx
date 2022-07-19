import {
  AudioData,
  audioPlayerStateContext,
} from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useVariableColor } from "@/hooks/useVariableColor";
import classNames from "classnames";
import styled, { css } from "styled-components";

export const PlayListItem = ({ data }: { data: AudioData }) => {
  const { curPlayId, coverImgsCss } = useNonNullableContext(
    audioPlayerStateContext
  );

  const colors = useVariableColor({
    selectedColor: "--rs-audio-player-selected-list-item-background",
  });

  return (
    <ListItemContainer
      className={classNames("list-item-container", {
        curPlayed: curPlayId === data.id,
      })}
      selectedColor={colors?.selectedColor}
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

interface ListItemContainerProps {
  selectedColor: string | undefined;
}

const ListItemContainer = styled.div`
  ${({ selectedColor }: ListItemContainerProps) => css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    &.curPlayed {
      background: ${selectedColor};
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
  `}
`;
