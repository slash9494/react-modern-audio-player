import React, { FC, useState } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import { useCompoundSlots, useDuplicateSlotWarning } from "./compound";
import { playListPortalContext } from "./playListPortalContext";
import { playListEmptyContext } from "./playListEmptyContext";
import "./Interface.css";

interface InterfaceProps {
  children: React.ReactNode;
}

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const { compoundChildren, playListEmptyNode } = useCompoundSlots(children);
  useDuplicateSlotWarning({ compoundChildren, activeUI });

  const [gridAreas, gridColumns] = useGridTemplate(
    activeUI,
    interfacePlacement?.templateArea,
    interfacePlacement?.customComponentsArea,
    compoundChildren
  );

  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  return (
    <div
      className="rmap-interface-container"
      data-testid="audio-player"
      role="region"
      aria-label="Audio player"
    >
      <playListPortalContext.Provider value={portalNode}>
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
