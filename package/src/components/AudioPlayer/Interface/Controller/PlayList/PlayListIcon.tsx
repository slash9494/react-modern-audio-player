import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { FC } from "react";
import { MdPlaylistPlay } from "@/ui/icons";
import { IconSlot } from "@/ui/IconSlot";

export const PlayListIcon: FC = () => {
  const { customIcons } = useResourceContext();
  return (
    <IconSlot
      render={<MdPlaylistPlay size={"100%"} />}
      customIcon={customIcons?.playList}
    />
  );
};
