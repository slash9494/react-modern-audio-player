import { FC, memo } from "react";
import "./PlayBtn.css";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "@/components/icons";
import { Icon } from "../../Icon";

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
        <Icon
          render={<MdPauseCircleFilled />}
          customIcon={customIcons?.pause}
        />
      ) : (
        <Icon render={<MdPlayCircleFilled />} customIcon={customIcons?.play} />
      )}
    </StyledBtn>
  );
});
