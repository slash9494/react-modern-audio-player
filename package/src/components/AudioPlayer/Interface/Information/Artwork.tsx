import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { FC, memo } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { usePlacedGridArea } from "../usePlacedGridArea";
import "./Artwork.css";

export type ArtworkProps = GridItemLayoutProps;

export const Artwork: FC<ArtworkProps> = memo(function Artwork({
  gridArea,
  visible,
  ...rest
}) {
  const { playList, curIdx } = useTrackContext();
  const { coverImgsCss } = useResourceContext();

  const track = playList[curIdx];
  const altText =
    [track?.writer, track?.name].filter(Boolean).join(" - ") || "Album artwork";

  const resolvedGridArea = usePlacedGridArea("artwork", gridArea);

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
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
    </Grid.Item>
  );
});
