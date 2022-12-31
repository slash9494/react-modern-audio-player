import Grid from "@/components/Grid";
import { GridItemProps } from "@/components/Grid/Item";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import React, { FC } from "react";
import { audioPlayerStateContext } from "../../Context";

export type CustomComponentProps = {
  children?: React.ReactNode;
  id: string;
} & GridItemProps;

export const CustomComponent: FC<CustomComponentProps> = ({
  children,
  id,
  ...gridItemProps
}) => {
  const audioPlayerState = useNonNullableContext(audioPlayerStateContext);

  const placement = audioPlayerState.interfacePlacement;
  const gridArea = placement?.customComponentsArea?.[id];

  return (
    <Grid.Item
      UNSAFE_className="custom_component"
      gridArea={gridArea}
      {...gridItemProps}
    >
      {React.cloneElement(children as React.ReactElement, { audioPlayerState })}
    </Grid.Item>
  );
};
