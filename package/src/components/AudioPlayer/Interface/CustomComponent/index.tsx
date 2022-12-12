import Grid from "@/components/Grid";
import { GridItemProps } from "@/components/Grid/Item";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import React, { FC } from "react";
import { audioPlayerStateContext } from "../../Context";

export type CustomComponentProps = {
  children?: React.ReactNode;
} & GridItemProps;

export const CustomComponent: FC<CustomComponentProps> = ({
  children,
  ...gridItemProps
}) => {
  const audioPlayerState = useNonNullableContext(audioPlayerStateContext);
  return (
    <Grid.Item UNSAFE_className="custom_component" {...gridItemProps}>
      {React.cloneElement(children as React.ReactElement, { audioPlayerState })}
    </Grid.Item>
  );
};
