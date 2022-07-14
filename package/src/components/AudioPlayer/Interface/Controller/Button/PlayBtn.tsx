import { FC, useMemo } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { StyledBtn } from "./StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

const StyledPlayBtn = styled(StyledBtn)`
  width: 30px;
`;

export const PlayBtn: FC<InterfaceChildrenProps> = () => {
  const { curAudioState, iconImgs, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClick = () => audioPlayerDispatch({ type: "SET_PlAY_STATE" });
  const PlayIcon = useMemo(() => {
    if (curAudioState.isPlaying)
      return (
        <Icon render={<MdPauseCircleFilled />} customImg={iconImgs?.pause} />
      );
    return <Icon render={<MdPlayCircleFilled />} customImg={iconImgs?.play} />;
  }, [curAudioState.isPlaying, iconImgs?.pause, iconImgs?.play]);

  return activeUI.playButton ?? activeUI.all ? (
    <StyledPlayBtn onClick={onClick} className="play-button">
      {PlayIcon}
    </StyledPlayBtn>
  ) : null;
};
