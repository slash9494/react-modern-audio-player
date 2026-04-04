import { memo } from "react";
import { AudioData } from "@/components/AudioPlayer/Context";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import "./PlayListItem.css";

export const PlayListItem = memo(function PlayListItem({
  data,
}: {
  data: AudioData;
}) {
  const { curPlayId } = useTrackContext();
  const { coverImgsCss } = useResourceContext();
  const isCurrentId = curPlayId === data.id;
  return (
    <div
      className={`rmap-playlist-item${isCurrentId ? " cur-played" : ""}`}
      data-testid="playlist-item"
      aria-current={isCurrentId ? "true" : undefined}
    >
      <div className="rmap-playlist-item-contents">
        <div className="rmap-playlist-album-cover">
          {data.img && (
            <img
              src={data.img}
              alt={data.name || "Album thumbnail"}
              style={coverImgsCss?.listThumbnail}
            />
          )}
        </div>
        <div className="rmap-playlist-album-info">
          {data.writer && (
            <span className="rmap-playlist-writer">{data.writer}</span>
          )}
          {data.name && (
            <span className="rmap-playlist-title">{data.name}</span>
          )}
          {data.description && (
            <div className="rmap-playlist-description">{data.description}</div>
          )}
        </div>
      </div>
    </div>
  );
});
