import { ReactElement } from "react";
import { ActiveUI } from "@/components/AudioPlayer/Context/StateContext";

export type ActiveUIKey = keyof ActiveUI;

export interface SlotMeta {
  activeUIKey: ActiveUIKey;
}

// Slot identity is declared, not inferred. Minified builds rename component
// functions, and React's production `memo` — unlike the development build —
// does not copy `displayName` onto the wrapped function, so neither `.name`
// nor `.displayName` survives a published bundle.
export const SLOT_ID = "__rmapSlotId";

type SlotCarrier = { [SLOT_ID]?: string };

export const compoundSlotMetaMap: Record<string, SlotMeta> = {
  Progress: { activeUIKey: "progress" },
  Volume: { activeUIKey: "volume" },
  PlayList: { activeUIKey: "playList" },
  PlayButton: { activeUIKey: "playButton" },
  RepeatButton: { activeUIKey: "repeatType" },
  Artwork: { activeUIKey: "artwork" },
  TrackInfo: { activeUIKey: "trackInfo" },
  TrackTime: { activeUIKey: "trackTime" },
  SpeedSelector: { activeUIKey: "playbackRate" },
};

export function isPresetActive(activeUI: ActiveUI, key: ActiveUIKey): boolean {
  const explicit = activeUI[key];
  if (explicit === false) return false;
  if (explicit !== undefined) return true;
  return Boolean(activeUI.all);
}

// Stamps each entry's key onto the component it points at, so the key the
// consumer writes (`<AudioPlayer.Progress/>`) is the key resolved at runtime.
// Stamping the outer object matters: `child.type` is the memo wrapper, not the
// function inside it.
export function withSlotIds<TSlots extends Record<string, unknown>>(
  slots: TSlots
): TSlots {
  Object.entries(slots).forEach(([slotId, component]) => {
    (component as SlotCarrier)[SLOT_ID] = slotId;
  });
  return slots;
}

export function resolveSlotKey(child: ReactElement): string | undefined {
  return (child.type as SlotCarrier | undefined)?.[SLOT_ID];
}
