import React, { FC } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { useUIContext } from "@/hooks/context/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import { useDuplicateSlotWarning } from "./useDuplicateSlotWarning";
import { playListPortalContext } from "./playListPortalContext";
import { playListEmptyContext } from "./playListEmptyContext";
import { useCompoundSlots } from "./useCompoundSlots";
import { useEffectiveActiveUI } from "./useEffectiveActiveUI";
import { usePlayListPortal } from "./usePlayListPortal";
import "./Interface.css";

interface InterfaceProps {
  children: React.ReactNode;
}

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const { compoundChildren, playListEmptyNode } = useCompoundSlots(children);
  useDuplicateSlotWarning({ compoundChildren, activeUI });

  const effectiveActiveUI = useEffectiveActiveUI(compoundChildren, activeUI);

  const [gridAreas, gridColumns] = useGridTemplate(
    effectiveActiveUI,
    interfacePlacement?.templateArea,
    interfacePlacement?.customComponentsArea
  );

  const { value: portalValue, setNode: setPortalNode } = usePlayListPortal();

  return (
    <div
      className="rmap-interface-container"
      data-testid="audio-player"
      role="region"
      aria-label="Audio player"
    >
      <playListPortalContext.Provider value={portalValue}>
        <playListEmptyContext.Provider value={playListEmptyNode}>
          {playListPlacement === "top" && (
            <div ref={setPortalNode} className="rmap-sortable-playlist" />
          )}
          <Grid
            alignItems="center"
            justifyContent="center"
            areas={gridAreas}
            minHeight="30px"
            columns={gridColumns}
            UNSAFE_className="rmap-interface-grid"
          >
            <Information />
            <Controller />

            {compoundChildren}
          </Grid>
          {playListPlacement === "bottom" && (
            <div ref={setPortalNode} className="rmap-sortable-playlist" />
          )}
        </playListEmptyContext.Provider>
      </playListPortalContext.Provider>
    </div>
  );
};
