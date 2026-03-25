import { FC } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Duration: FC<TrackTimeChildrenProps> = ({ position }) => {
  const { curAudioState } = useNonNullableContext(audioPlayerStateContext);

  return (
    <TrackTimeDurationContainer
      position={position}
      className="track-time-duration-container"
      childrenClassName="track-duration"
    >
      <span className="track-duration">
        {getTimeWithPadStart(curAudioState.duration ?? 0)}
      </span>
    </TrackTimeDurationContainer>
  );
};

const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  .track-duration {
    display: flex;
    color: var(--rm-audio-player-track-duration);
    letter-spacing: -0.1rem;
  }
`;
