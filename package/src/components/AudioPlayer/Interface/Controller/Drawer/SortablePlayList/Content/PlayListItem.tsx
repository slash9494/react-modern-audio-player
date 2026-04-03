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
  return (
    <div
      className={`list-item-container${
        curPlayId === data.id ? " curPlayed" : ""
      }`}
      data-testid="playlist-item"
      aria-current={curPlayId === data.id ? "true" : undefined}
    >
      <div className="list-item-contents-wrapper">
        <div className="album-cover-wrapper">
          {data.img && (
            <img
              src={data.img}
              alt={data.name || "Album thumbnail"}
              style={coverImgsCss?.listThumbnail}
            />
          )}
        </div>
        <div className="album-info-wrapper">
          {data.writer && <span className="writer">{data.writer}</span>}
          {data.name && <span className="title">{data.name}</span>}
          {data.description && (
            <div className="description">{data.description}</div>
          )}
        </div>
      </div>
    </div>
  );
});
