import { FC } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { musicPlayerDispatchContext } from "lib/musicContext/dispatchContext";
import { musicPlayerStateContext } from "lib/musicContext/StateContext";
import { StyledBtn } from "./StyledBtn";

const StyledPlayBtn = styled(StyledBtn)`
  width: 30px;
`;

export const PlayBtn: FC = () => {
  const { curAudioState, curPlayId, playList, activeUI } =
    useNonNullableContext(musicPlayerStateContext);
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  const onClick = () => musicPlayerDispatch({ type: "SET_PlAY_STATE" });
  return (
    <StyledPlayBtn onClick={onClick}>
      {curAudioState.isPlaying ? (
        <img src="/public/images/pause-button.svg" alt="" />
      ) : (
        <img src="/public/images/play-button.svg" alt="" />
      )}
    </StyledPlayBtn>
  );
};
