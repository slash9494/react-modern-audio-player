import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import styled from "styled-components";

const ArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
`;

export const Artwork: FC = () => {
  const { playList, curIdx, coverImgsCss } = useNonNullableContext(
    audioPlayerStateContext
  );

  return (
    <ArtworkContainer className="artwork-container">
      <img src={playList[curIdx]?.img} alt={""} style={coverImgsCss?.artwork} />
    </ArtworkContainer>
  );
};
