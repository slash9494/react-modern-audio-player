import { FC, ReactElement, ReactNode } from "react";
import { SvgIconProps } from "@/components/icons";

interface _IconProps {
  render: ReactElement<SvgIconProps>;
  customIcon?: ReactNode;
}

export const Icon: FC<_IconProps> = ({ render, customIcon }) => {
  return <>{customIcon ?? render}</>;
};
