import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { FC, memo } from "react";
import "./Artwork.css";

export const Artwork: FC = memo(function Artwork() {
  const { playList, curIdx } = useTrackContext();
  const { coverImgsCss } = useResourceContext();

  const track = playList[curIdx];
  const altText =
    [track?.writer, track?.name].filter(Boolean).join(" - ") || "Album artwork";

  return (
    <div className="rmap-artwork-container">
      {track?.img ? (
        <img src={track.img} alt={altText} style={coverImgsCss?.artwork} />
      ) : (
        <div
          className="rmap-artwork-fallback"
          role="img"
          aria-label={altText}
          style={coverImgsCss?.artwork}
        >
          {track?.name || "♪"}
        </div>
      )}
    </div>
  );
});
