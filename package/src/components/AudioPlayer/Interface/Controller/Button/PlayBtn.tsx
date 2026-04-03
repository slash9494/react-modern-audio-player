import { FC, memo } from "react";
import "./PlayBtn.css";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "@/components/icons";
import { Icon } from "../Icon";

export const PlayBtn: FC = memo(function PlayBtn() {
  const { curAudioState } = usePlaybackContext();
  const { customIcons } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const changePlayState = () =>
    audioPlayerDispatch({ type: "CHANGE_PLAYING_STATE" });

  return (
    <StyledBtn
      type="button"
      aria-label={curAudioState.isPlaying ? "Pause" : "Play"}
      onClick={changePlayState}
      className="play-button"
      data-testid="play-btn"
    >
      {curAudioState.isPlaying ? (
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
