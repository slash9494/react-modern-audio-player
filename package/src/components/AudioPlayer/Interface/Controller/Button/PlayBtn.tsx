import { FC, memo } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { StyledBtn } from "./StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Icon } from "../Icon";

const StyledPlayBtn = styled(StyledBtn)`
  width: 35px;
`;

export const PlayBtn: FC = memo(function PlayBtn() {
  const { curAudioState } = usePlaybackContext();
  const { customIcons } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const changePlayState = () =>
    audioPlayerDispatch({ type: "CHANGE_PLAYING_STATE" });

  return (
    <StyledPlayBtn
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
    </StyledPlayBtn>
  );
});
