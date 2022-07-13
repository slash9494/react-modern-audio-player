import { FC, ReactElement, ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface _IconProps {
  render: ReactElement<IconType>;
  customImg?: ReactNode;
}

export const Icon: FC<_IconProps> = ({ render, customImg }) => {
  return customImg ? <>{customImg}</> : <>{render}</>;
};
