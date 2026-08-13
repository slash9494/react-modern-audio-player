import { FC, memo } from "react";
import "./PlayBtn.css";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "@/ui/icons";
import { IconSlot } from "@/ui/IconSlot";

export const PlayBtn: FC = memo(function PlayBtn() {
  const { isPlaying } = usePlaybackContext();
  const { customIcons } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const changePlayState = () =>
    audioPlayerDispatch({ type: "CHANGE_PLAYING_STATE" });

  return (
    <StyledBtn
      type="button"
      aria-label={isPlaying ? "Pause" : "Play"}
      onClick={changePlayState}
      className="rmap-play-btn"
      data-testid="play-btn"
    >
      {isPlaying ? (
        <IconSlot
          render={<MdPauseCircleFilled />}
          customIcon={customIcons?.pause}
        />
      ) : (
        <IconSlot
          render={<MdPlayCircleFilled />}
          customIcon={customIcons?.play}
        />
      )}
    </StyledBtn>
  );
});
