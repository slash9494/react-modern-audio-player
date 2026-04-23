import { ReactElement } from "react";
import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";

export type ActiveUIKey = keyof ActiveUI;

export interface SlotMeta {
  displayName: string;
  activeUIKey: ActiveUIKey;
}

export const compoundSlotPresetMap: Record<string, SlotMeta> = {
  Progress: { displayName: "Progress", activeUIKey: "progress" },
  Volume: { displayName: "Volume", activeUIKey: "volume" },
  SortablePlayList: { displayName: "PlayList", activeUIKey: "playList" },
  TransportControls: {
    displayName: "TransportControls",
    activeUIKey: "playButton",
  },
  PlayButton: { displayName: "TransportControls", activeUIKey: "playButton" },
  RepeatTypeBtn: { displayName: "RepeatButton", activeUIKey: "repeatType" },
  Artwork: { displayName: "Artwork", activeUIKey: "artwork" },
  TrackInfo: { displayName: "TrackInfo", activeUIKey: "trackInfo" },
  TrackTime: { displayName: "TrackTime", activeUIKey: "trackTime" },
};

export function isPresetActive(activeUI: ActiveUI, key: ActiveUIKey): boolean {
  const explicit = activeUI[key];
  if (explicit === false) return false;
  if (explicit !== undefined) return true;
  return Boolean(activeUI.all);
}

// Unwrap one layer of memo/forwardRef — wrappers hide the inner `.name`.
export function resolveSlotKey(child: ReactElement): string | undefined {
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
