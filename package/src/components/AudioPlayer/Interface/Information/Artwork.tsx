import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC } from "react";
import styled from "styled-components";

const ArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  img {
    width: 50px;
    height: 50px;
  }
`;

export const Artwork: FC = () => {
  const { activeUI, playList, curIdx, coverImgsCss } = useNonNullableContext(
    audioPlayerStateContext
  );

  return playList[curIdx] && (activeUI.artwork ?? activeUI.all) ? (
    <ArtworkContainer>
      <img src={playList[curIdx].img} alt={""} style={coverImgsCss?.artwork} />
    </ArtworkContainer>
  ) : null;
};
