import { FC, useRef } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useRefsDispatch } from "@/hooks/useRefsDispatch";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Duration: FC<TrackTimeChildrenProps> = ({ position }) => {
  const trackDurationRef = useRef<HTMLSpanElement>(null);
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);

  useRefsDispatch(
    {
      refs: { trackDurationEl: trackDurationRef },
    },
    []
  );

  return (
    <TrackTimeDurationContainer
      position={position}
      className="track-time-duration-container"
      childrenClassName="track-duration"
    >
      <span ref={trackDurationRef} className="track-duration">
        {elementRefs?.audioEl?.duration
          ? getTimeWithPadStart(elementRefs.audioEl.duration)
          : "00:00"}
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
