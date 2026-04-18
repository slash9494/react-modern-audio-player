import React, { FC, isValidElement, useState } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { useUIContext } from "@/hooks/context/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import { useDuplicateSlotWarning } from "./useDuplicateSlotWarning";
import { playListPortalContext } from "./playListPortalContext";
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

  // Callback ref — state-backed so consumers re-render when the node mounts.
  const [playListPortalNode, setPlayListPortalNode] =
    useState<HTMLDivElement | null>(null);

  return (
    <div
      className="rmap-interface-container"
      data-testid="audio-player"
      role="region"
      aria-label="Audio player"
    >
      <playListPortalContext.Provider value={playListPortalNode}>
        {playListPlacement === "top" && (
          <div ref={setPlayListPortalNode} className="rmap-sortable-playlist" />
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
          <div ref={setPlayListPortalNode} className="rmap-sortable-playlist" />
        )}
      </playListPortalContext.Provider>
    </div>
  );
};
