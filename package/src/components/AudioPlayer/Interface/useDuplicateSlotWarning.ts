import { ReactElement, useEffect } from "react";
import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";

type ActiveUIKey = keyof ActiveUI;

interface SlotMeta {
  displayName: string;
  activeUIKey: ActiveUIKey;
}

const slotRegistry: Record<string, SlotMeta> = {
  Progress: { displayName: "Progress", activeUIKey: "progress" },
  Volume: { displayName: "Volume", activeUIKey: "volume" },
  SortablePlayList: { displayName: "PlayList", activeUIKey: "playList" },
  PlayButton: { displayName: "PlayButton", activeUIKey: "playButton" },
  RepeatTypeBtn: { displayName: "RepeatButton", activeUIKey: "repeatType" },
  Artwork: { displayName: "Artwork", activeUIKey: "artwork" },
  TrackInfo: { displayName: "TrackInfo", activeUIKey: "trackInfo" },
  TrackTime: { displayName: "TrackTime", activeUIKey: "trackTime" },
};

function isPresetActive(activeUI: ActiveUI, key: ActiveUIKey): boolean {
  const explicit = activeUI[key];
  if (explicit === false) return false;
  if (explicit !== undefined) return true;
  return Boolean(activeUI.all);
}

// Unwrap one layer of memo/forwardRef — wrappers hide the inner `.name`.
function resolveSlotKey(child: ReactElement): string | undefined {
  const outer = child?.type as
    | {
        name?: string;
        displayName?: string;
        type?: { name?: string; displayName?: string };
      }
    | undefined;
  if (!outer) return undefined;
  const inner = outer.type ?? outer;
  return inner.displayName || inner.name || undefined;
}

export function useDuplicateSlotWarning(
  children: ReactElement[],
  activeUI: ActiveUI
): void {
  // Stable signature string so the effect dep is value-compared, not ref-compared.
  const compoundSignature = children
    .map(resolveSlotKey)
    .filter((key): key is string => Boolean(key && slotRegistry[key]))
    .sort()
    .join(",");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!compoundSignature) return;

    const seen = new Set<string>();
    for (const key of compoundSignature.split(",")) {
      const meta = slotRegistry[key];
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
