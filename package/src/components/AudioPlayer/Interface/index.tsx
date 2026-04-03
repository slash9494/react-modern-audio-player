import React, { FC } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { useUIContext } from "@/hooks/context/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import "./Interface.css";

interface InterfaceProps {
  children: React.ReactNode;
}

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const CustomComponents = React.Children.toArray(children);

  const [gridAreas, gridColumns] = useGridTemplate(
    activeUI,
    interfacePlacement?.templateArea,
    interfacePlacement?.customComponentsArea
  );

  return (
    <div
      className="interface-container"
      data-testid="audio-player"
      role="region"
      aria-label="Audio player"
    >
      {playListPlacement === "top" && <div className="sortable-play-list" />}
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        areas={gridAreas}
        minHeight={"30px"}
        columns={gridColumns}
        UNSAFE_className="interface-grid"
      >
        <Information />
        <Controller />

        {CustomComponents}
      </Grid>
      {playListPlacement === "bottom" && <div className="sortable-play-list" />}
    </div>
  );
};
