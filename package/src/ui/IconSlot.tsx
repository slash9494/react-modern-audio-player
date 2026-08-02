import { FC, ReactElement, ReactNode } from "react";
import { SvgIconProps } from "@/ui/icons";

interface _IconSlotProps {
  render: ReactElement<SvgIconProps>;
  customIcon?: ReactNode;
}

export const IconSlot: FC<_IconSlotProps> = ({ render, customIcon }) => {
  return <>{customIcon ?? render}</>;
};
