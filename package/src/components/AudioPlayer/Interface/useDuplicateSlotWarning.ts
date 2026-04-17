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

export function useDuplicateSlotWarning(
  children: ReactElement[],
  activeUI: ActiveUI
): void {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const duplicates: string[] = [];
    for (const child of children) {
      const type = child?.type as
        | { name?: string; displayName?: string }
        | undefined;
      const key = type?.displayName || type?.name;
      if (!key) continue;
      const meta = slotRegistry[key];
      if (!meta) continue;
      if (isPresetActive(activeUI, meta.activeUIKey)) {
        duplicates.push(meta.displayName);
      }
    }

    if (duplicates.length > 0) {
      const unique = Array.from(new Set(duplicates));
      for (const name of unique) {
        const meta = Object.values(slotRegistry).find(
          (m) => m.displayName === name
        );
        if (!meta) continue;
        // eslint-disable-next-line no-console
        console.warn(
          `[react-modern-audio-player] Both preset and compound '${name}' are rendered. ` +
            `Set \`activeUI.${meta.activeUIKey}=false\` to replace the preset control.`
        );
      }
    }
  }, [children, activeUI]);
}
