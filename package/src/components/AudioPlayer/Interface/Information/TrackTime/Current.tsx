import { FC, useRef } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useRefsDispatch } from "@/hooks/useRefsDispatch";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Current: FC<TrackTimeChildrenProps> = ({ position }) => {
  const trackCurTimeRef = useRef<HTMLSpanElement>(null);
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);

  useRefsDispatch(
    {
      refs: { trackCurTimeEl: trackCurTimeRef },
    },
    []
  );

  return (
    <TrackTimeCurrentContainer
      position={position}
      className="track-time-current-container"
      childrenClassName="track-current-time"
    >
      <span ref={trackCurTimeRef} className="track-current-time">
        {elementRefs?.audioEl?.currentTime
          ? getTimeWithPadStart(elementRefs.audioEl.currentTime)
          : "00:00"}
      </span>
    </TrackTimeCurrentContainer>
  );
};

const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  .track-current-time {
    font-weight: 700;
    letter-spacing: -0.1rem;
    color: var(--rm-audio-player-track-current-time);
  }
`;
