import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { FC } from "react";
import { MdPlaylistPlay } from "@/components/icons";
import { Icon } from "../../Icon";

export const PlayListIcon: FC = () => {
  const { customIcons } = useResourceContext();
  return (
    <Icon
      render={<MdPlaylistPlay size={"100%"} />}
      customIcon={customIcons?.playList}
    />
  );
};
