import { useResourceContext } from "@/hooks/context/useResourceContext";
import { FC } from "react";
import { MdPlaylistPlay } from "react-icons/md";
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
