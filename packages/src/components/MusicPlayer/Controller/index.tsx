import { FC } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "../../../hooks/useNonNullableContext";
import { musicPlayerStateContext } from "../../../lib/musicContext/StateContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Buttons";
import { Volume } from "./Dropdown";
import { SortablePlayList } from "./Dropdown/SortablePlayList";

/**
 * //TODO: ALL CONTROLLER UI
 * cover, musicInfo, currentTime/ duration, progress, repeatType, volume, prev, play, next, listDrop
 */

const ControllerContainer = styled.div`
  display: flex;
  align-items: center;
  .btn-wrapper {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;

export const Controller: FC = () => {
  const { curAudioState, curPlayId, playList, activeUI } =
    useNonNullableContext(musicPlayerStateContext);
  return (
    <ControllerContainer>
      <div className="btn-wrapper">
        {activeUI.repeatType && <RepeatTypeBtn />}
        {activeUI.prevNnext && <PrevNnextBtn type="prev" />}
        {activeUI.playButton && (
          <div className="play-btn-wrapper">
            <PlayBtn />
          </div>
        )}
        {activeUI.prevNnext && <PrevNnextBtn type="next" />}
      </div>
      <div className="drop-down-wrapper">
        <Volume />
      </div>
      <div className="playlist-trigger-wrapper">
        <SortablePlayList />
      </div>
    </ControllerContainer>
  );
};
