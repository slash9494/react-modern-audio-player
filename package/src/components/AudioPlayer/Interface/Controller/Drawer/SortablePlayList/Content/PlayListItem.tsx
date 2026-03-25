import { memo } from "react";
import { AudioData } from "@/components/AudioPlayer/Context";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import classNames from "classnames";
import styled from "styled-components";

export const PlayListItem = memo(function PlayListItem({
  data,
}: {
  data: AudioData;
}) {
  const { curPlayId } = useTrackContext();
  const { coverImgsCss } = useResourceContext();
  return (
    <ListItemContainer
      className={classNames("list-item-container", {
        curPlayed: curPlayId === data.id,
      })}
      data-testid="playlist-item"
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
});

const ListItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &.curPlayed {
    background: var(--rm-audio-player-selected-list-item-background);
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
