import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC } from "react";
import styled from "styled-components";

const TrackInfoContainer = styled.div`
  display: grid;
  align-items: center;
  row-gap: 5px;
  .title {
    font-size: 1rem;
  }
  .writer {
    font-size: 0.875rem;
  }
`;

export const TrackInfo: FC = () => {
  const { activeUI, playList, curIdx } = useNonNullableContext(
    audioPlayerStateContext
  );
  const curPlayData = playList[curIdx];
  return curPlayData && (activeUI.trackInfo ?? activeUI.all) ? (
    <TrackInfoContainer>
      {curPlayData.customTrackInfo ? (
        curPlayData.customTrackInfo
      ) : (
        <>
          {curPlayData.name && (
            <span className="title">{curPlayData.name}</span>
          )}
          {curPlayData.writer && (
            <span className="writer">{curPlayData.writer}</span>
          )}
        </>
      )}
    </TrackInfoContainer>
  ) : null;
};
