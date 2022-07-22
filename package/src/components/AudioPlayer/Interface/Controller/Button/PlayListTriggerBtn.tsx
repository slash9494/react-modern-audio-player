import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC } from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { Icon } from "../Icon";
import { StyledBtn } from "./StyledBtn";

export interface PlayListTriggerBtnProps {
  isOpen: boolean;
}

export const PlayListTriggerBtn: FC<PlayListTriggerBtnProps> = ({ isOpen }) => {
  const { customIcons } = useNonNullableContext(audioPlayerStateContext);
  return (
    <StyledBtn>
      <Icon
        render={
          <MdPlaylistPlay
            size={"100%"}
            color={
              isOpen
                ? "var(--rm-audio-player-sortable-list-button-active)"
                : undefined
            }
          />
        }
        customIcon={customIcons?.playList}
      />
    </StyledBtn>
  );
};
