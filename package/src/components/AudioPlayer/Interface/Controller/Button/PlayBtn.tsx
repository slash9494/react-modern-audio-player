import { FC, useMemo } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "./StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

const StyledPlayBtn = styled(StyledBtn)`
  width: 35px;
`;

export const PlayBtn: FC<InterfaceChildrenProps> = () => {
  const { curAudioState, customIcons, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClick = () => audioPlayerDispatch({ type: "SET_PlAY_STATE" });
  const PlayIcon = useMemo(() => {
    if (curAudioState.isPlaying)
      return (
        <Icon
          render={<MdPauseCircleFilled />}
          customIcon={customIcons?.pause}
        />
      );
    return (
      <Icon render={<MdPlayCircleFilled />} customIcon={customIcons?.play} />
    );
  }, [curAudioState.isPlaying, customIcons?.pause, customIcons?.play]);

  return activeUI.playButton ?? activeUI.all ? (
    <StyledPlayBtn onClick={onClick} className="play-button">
      {PlayIcon}
    </StyledPlayBtn>
  ) : null;
};
