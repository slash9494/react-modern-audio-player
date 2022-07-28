import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  AudioData,
  audioPlayerStateContext,
} from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import styled from "styled-components";

const TrackInfoContainer = styled.div`
  display: grid;
  align-items: center;
  row-gap: 5px;
  width: 200px;
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    font-size: 16px;
  }
  .writer {
    font-size: 12px;
  }
`;

export const TrackInfo: FC = () => {
  const { playList, curIdx } = useNonNullableContext(audioPlayerStateContext);
  const curPlayData = playList[curIdx];
  return (
    <TrackInfoContainer className="track-info-container">
      {curPlayData?.customTrackInfo ? (
        curPlayData.customTrackInfo
      ) : (
        <>
          {curPlayData?.name && (
            <span className="title">{curPlayData.name}</span>
          )}
          {curPlayData?.writer && (
            <span className="writer">{curPlayData.writer}</span>
          )}
        </>
      )}
    </TrackInfoContainer>
  );
};
