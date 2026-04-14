import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { FC, memo } from "react";
import {
  SvgIconProps,
  TbVolume3,
  TbVolume2,
  TbVolume,
} from "@/components/icons";
import { Icon } from "../Icon";

const volumeOpt: SvgIconProps = { size: "100%" };

export const VolumeIcon: FC = memo(() => {
  const { volume: stateVolume, muted } = usePlaybackContext();
  const { customIcons, elementRefs } = useResourceContext();
  const volume = stateVolume ?? elementRefs?.audioEl?.volume ?? 0;
  const isLowVolume = volume > 0 && volume <= 0.5;

  if (muted || volume === 0) {
    return (
      <Icon
        render={<TbVolume3 {...volumeOpt} />}
        customIcon={customIcons?.volumeMuted}
      />
    );
  }
  if (isLowVolume) {
    return (
      <Icon
        render={<TbVolume2 {...volumeOpt} />}
        customIcon={customIcons?.volumeHalf}
      />
    );
  }
  return (
    <Icon
      render={<TbVolume {...volumeOpt} />}
      customIcon={customIcons?.volumeFull}
    />
  );
});
VolumeIcon.displayName = "VolumeIcon";
