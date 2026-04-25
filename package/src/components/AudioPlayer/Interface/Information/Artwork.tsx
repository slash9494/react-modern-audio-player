import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { FC, memo } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import "./Artwork.css";

export type ArtworkProps = GridItemLayoutProps;

export const Artwork: FC<ArtworkProps> = memo(function Artwork({
  gridArea,
  visible,
  ...rest
}) {
  const { playList, curIdx } = useTrackContext();
  const { coverImgsCss } = useResourceContext();
  const { interfacePlacement } = useUIContext();

  const track = playList[curIdx];
  const altText =
    [track?.writer, track?.name].filter(Boolean).join(" - ") || "Album artwork";

  const resolvedGridArea =
    gridArea ??
    interfacePlacement?.itemCustomArea?.artwork ??
    interfacePlacement?.templateArea?.artwork ??
    defaultInterfacePlacement.templateArea.artwork;

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
