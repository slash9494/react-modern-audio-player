import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC } from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { Icon } from "../../Icon";

export const PlayListIcon: FC = () => {
  const { customIcons } = useNonNullableContext(audioPlayerStateContext);
  return (
    <Icon
      render={<MdPlaylistPlay size={"100%"} />}
      customIcon={customIcons?.playList}
    />
  );
};
