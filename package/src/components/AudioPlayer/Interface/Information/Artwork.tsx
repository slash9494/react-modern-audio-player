import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import styled from "styled-components";

const ArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  img,
  .artwork-fallback {
    width: 50px;
    height: 50px;
  }
`;

export const Artwork: FC = () => {
  const { playList, curIdx, coverImgsCss } = useNonNullableContext(
    audioPlayerStateContext
  );

  const track = playList[curIdx];
  const altText =
    [track?.writer, track?.name].filter(Boolean).join(" - ") || "Album artwork";

  return (
    <ArtworkContainer className="artwork-container">
      {track?.img ? (
        <img src={track.img} alt={altText} style={coverImgsCss?.artwork} />
      ) : (
        <div
          className="artwork-fallback"
          role="img"
          aria-label={track?.name || "No artwork available"}
          style={coverImgsCss?.artwork}
        >
          {track?.name || "♪"}
        </div>
      )}
    </ArtworkContainer>
  );
};
