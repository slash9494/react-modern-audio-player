import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { FC, memo } from "react";
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

export const Artwork: FC = memo(function Artwork() {
  const { playList, curIdx } = useTrackContext();
  const { coverImgsCss } = useResourceContext();

  return (
    <ArtworkContainer className="artwork-container">
      <img src={playList[curIdx]?.img} alt={""} style={coverImgsCss?.artwork} />
    </ArtworkContainer>
  );
});
