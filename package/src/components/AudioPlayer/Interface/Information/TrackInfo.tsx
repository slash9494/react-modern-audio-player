import { useTrackContext } from "@/hooks/context/useTrackContext";
import { FC, memo } from "react";
import "./TrackInfo.css";

export const TrackInfo: FC = memo(function TrackInfo() {
  const { playList, curIdx } = useTrackContext();
  const curPlayData = playList[curIdx];
  return (
    <div className="track-info-container">
      {curPlayData?.customTrackInfo ? (
        curPlayData.customTrackInfo
      ) : (
        <>
          {curPlayData?.name && (
            <span className="title" data-testid="track-title">
              {curPlayData.name}
            </span>
          )}
          {curPlayData?.writer && (
            <span className="writer">{curPlayData.writer}</span>
          )}
        </>
      )}
    </div>
  );
});
