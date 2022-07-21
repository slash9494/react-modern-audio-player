import { FC, PropsWithChildren } from "react";

export const DropdownTrigger: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <div className={"dropdown-trigger-wrapper"}>{children}</div>;
};
