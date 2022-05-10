import { useNonNullableContext } from "hooks/useNonNullableContext";
import { musicPlayerDispatchContext } from "lib/musicContext/dispatchContext";
import { musicPlayerStateContext } from "lib/musicContext/StateContext";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { StyledDropdown } from "./StyledDropdown";

const TriggerElContainer = styled.div`
  img {
    width: 20px;
  }
`;

const ContentElContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 1rem;
  padding-left: 0;
  input {
    transform: rotate(90deg);
  }
`;

export const Volume: FC = ({}) => {
  const { curAudioState, curPlayId, playList, activeUI } =
    useNonNullableContext(musicPlayerStateContext);
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  const TriggerEl = useMemo(() => {
    return (
      <TriggerElContainer>
        {curAudioState.muted ? (
          <img src="/images/silent-line.svg" alt="" />
        ) : (
          <img src="/images/volume.svg" alt="" />
        )}
      </TriggerElContainer>
    );
  }, [curAudioState.muted]);

  const ContentEl = useMemo(() => {
    // TODO - volume feature
    return (
      <ContentElContainer>
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          min="0"
          max="1"
          step="0.1"
        />
      </ContentElContainer>
    );
  }, []);
  return (
    <StyledDropdown
      TriggerEl={() => TriggerEl}
      ContentEl={() => ContentEl}
      outboundClickActive
    />
  );
};
