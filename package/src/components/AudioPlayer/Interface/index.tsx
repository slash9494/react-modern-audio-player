import React, { FC, isValidElement, useMemo, useState } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";

import Grid from "@/components/Grid";

import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";
import { useDuplicateSlotWarning } from "./useDuplicateSlotWarning";
import { playListPortalContext } from "./playListPortalContext";
import { isPresetActive, resolveSlotKey, slotRegistry } from "./slotRegistry";
import "./Interface.css";

interface InterfaceProps {
  children: React.ReactNode;
}

const COMPOUND_FORCE_VALUES: Partial<Record<keyof ActiveUI, unknown>> = {
  progress: "bar",
  playList: "sortable",
};

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const CustomComponents =
    React.Children.toArray(children).filter(isValidElement);
  useDuplicateSlotWarning(CustomComponents, activeUI);

  const compoundForceKeys = CustomComponents.map(resolveSlotKey)
    .map((key) => (key ? slotRegistry[key]?.activeUIKey : undefined))
    .filter(
      (k): k is keyof ActiveUI => Boolean(k) && !isPresetActive(activeUI, k!)
    )
    .sort()
    .join(",");

  // Augment activeUI for template generation only — Controller/Information
  // still see the original so their preset visibility logic stays intact.
  // Without this, a compound slot whose preset is off would have no named
  // grid area and fall back to implicit tracks.
  const effectiveActiveUI = useMemo<ActiveUI>(() => {
    if (!compoundForceKeys) return activeUI;
    const next: Record<string, unknown> = { ...activeUI };
    for (const key of compoundForceKeys.split(",") as (keyof ActiveUI)[]) {
      const force = COMPOUND_FORCE_VALUES[key];
      next[key] = force !== undefined ? force : true;
    }
    return next as ActiveUI;
  }, [compoundForceKeys, activeUI]);

  const [gridAreas, gridColumns] = useGridTemplate(
    effectiveActiveUI,
    interfacePlacement?.templateArea,
    interfacePlacement?.customComponentsArea
  );

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
          alignItems="center"
          justifyContent="center"
          areas={gridAreas}
          minHeight="30px"
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
