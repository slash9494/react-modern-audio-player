import { ReactElement, useEffect } from "react";
import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";
import {
  isPresetActive,
  resolveSlotKey,
  compoundSlotMetaMap,
} from "./slotMetaMap";

export interface DuplicateSlotWarningArgs {
  compoundChildren: ReactElement[];
  activeUI: ActiveUI;
}

export function useDuplicateSlotWarning({
  compoundChildren,
  activeUI,
}: DuplicateSlotWarningArgs): void {
  const compoundSignature = compoundChildren
    .map(resolveSlotKey)
    .filter((key): key is string => Boolean(key && compoundSlotMetaMap[key]))
    .sort()
    .join(",");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!compoundSignature) return;

    const seen = new Set<string>();
    for (const key of compoundSignature.split(",")) {
      const meta = compoundSlotMetaMap[key];
      if (!meta) continue;
      if (seen.has(meta.displayName)) continue;
      if (!isPresetActive(activeUI, meta.activeUIKey)) continue;
      seen.add(meta.displayName);
      // eslint-disable-next-line no-console
      console.warn(
        `[react-modern-audio-player] Both preset and compound '${meta.displayName}' are rendered. ` +
          `Set \`activeUI.${meta.activeUIKey}=false\` to replace the preset control.`
      );
    }
  }, [compoundSignature, activeUI]);
}
