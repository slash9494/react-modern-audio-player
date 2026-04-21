import { ReactElement, useMemo } from "react";
import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";
import { isPresetActive, resolveSlotKey, slotRegistry } from "./slotRegistry";

const COMPOUND_FORCE_VALUES: Partial<Record<keyof ActiveUI, unknown>> = {
  progress: "bar",
  playList: "sortable",
};

export function useEffectiveActiveUI(
  compoundChildren: ReactElement[],
  activeUI: ActiveUI
): ActiveUI {
  const inactivePresetSignature = compoundChildren
    .map(resolveSlotKey)
    .map((slotKey) =>
      slotKey ? slotRegistry[slotKey]?.activeUIKey : undefined
    )
    .filter(
      (activeUIKey): activeUIKey is keyof ActiveUI =>
        activeUIKey !== undefined && !isPresetActive(activeUI, activeUIKey)
    )
    .sort()
    .join(",");

  return useMemo<ActiveUI>(() => {
    if (!inactivePresetSignature) return activeUI;
    const inactiveKeys = inactivePresetSignature.split(
      ","
    ) as (keyof ActiveUI)[];
    const augmented: ActiveUI = { ...activeUI };
    for (const key of inactiveKeys) {
      const forceValue = COMPOUND_FORCE_VALUES[key] ?? true;
      (augmented as Record<string, unknown>)[key] = forceValue;
    }
    return augmented;
  }, [inactivePresetSignature, activeUI]);
}
