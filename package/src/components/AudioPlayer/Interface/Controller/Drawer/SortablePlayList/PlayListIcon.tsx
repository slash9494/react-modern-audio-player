import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC } from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { Icon } from "../../Icon";

export interface PlayListIconProps {
  isOpen: boolean;
}

export const PlayListIcon: FC<PlayListIconProps> = ({ isOpen }) => {
  const { customIcons } = useNonNullableContext(audioPlayerStateContext);
  return (
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
  );
};
