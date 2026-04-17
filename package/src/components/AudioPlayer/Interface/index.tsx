import React, { FC, isValidElement } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { useUIContext } from "@/hooks/context/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import { useDuplicateSlotWarning } from "./useDuplicateSlotWarning";
import "./Interface.css";

interface InterfaceProps {
  children: React.ReactNode;
}

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const CustomComponents =
    React.Children.toArray(children).filter(isValidElement);
  useDuplicateSlotWarning(CustomComponents, activeUI);

  const [gridAreas, gridColumns] = useGridTemplate(
    activeUI,
    interfacePlacement?.templateArea,
    interfacePlacement?.customComponentsArea
  );

  return (
    <div
      className="rmap-interface-container"
      data-testid="audio-player"
      role="region"
      aria-label="Audio player"
    >
      {/* Portal target for SortablePlayList when placement is "top" */}
      {playListPlacement === "top" && (
        <div className="rmap-sortable-playlist" />
      )}
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        areas={gridAreas}
        minHeight={"30px"}
        columns={gridColumns}
        UNSAFE_className="rmap-interface-grid"
      >
        <Information />
        <Controller />

        {CustomComponents}
      </Grid>
      {playListPlacement === "bottom" && (
        <div className="rmap-sortable-playlist" />
      )}
    </div>
  );
};
