import Grid from "@/components/Grid";
import React, { FC } from "react";

interface CustomComponentProps {
  children: React.ReactNode;
}

export const CustomComponent: FC<CustomComponentProps> = ({ children }) => {
  return <Grid.Item UNSAFE_className="custom_component">{children}</Grid.Item>;
};
