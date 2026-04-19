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

// Fill-in value when a compound slot needs to force its area into the grid
// template. `useGridTemplate` only checks truthiness, so per-key truthy
// placeholders are enough to preserve placement without changing consumer
// behavior in the preset path.
const COMPOUND_FORCE_VALUES: Partial<Record<keyof ActiveUI, unknown>> = {
  progress: "bar",
  playList: "sortable",
};

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } = useUIContext();

  const CustomComponents =
    React.Children.toArray(children).filter(isValidElement);
  useDuplicateSlotWarning(CustomComponents, activeUI);

  // Stable comma-joined list of activeUI keys that need forcing. Derived
  // inline so the memo below can depend on a primitive (string) instead of
  // the per-render `CustomComponents` array — `useGridTemplate` treats its
  // activeUI input via reference equality, so a new object every render
  // would loop.
  const compoundForceKeys = CustomComponents.map(resolveSlotKey)
    .map((key) => (key ? slotRegistry[key]?.activeUIKey : undefined))
    .filter(
      (k): k is keyof ActiveUI => Boolean(k) && !isPresetActive(activeUI, k!)
    )
    .sort()
    .join(",");

  // When a compound slot is rendered while its preset counterpart is off,
  // the grid template would otherwise drop that named area and the compound
  // gridArea reference would fall back to implicit tracks. Augment activeUI
  // for template generation only (Controller/Information still see the
  // original activeUI so their preset visibility logic stays intact).
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
