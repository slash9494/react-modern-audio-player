import { createElement, memo } from "react";
import { describe, expect, it } from "vitest";
import AudioPlayer from "@/audio-player";
import {
  SLOT_ID,
  compoundSlotMetaMap,
  resolveSlotKey,
  withSlotIds,
} from "../slotMetaMap";

// Slot keys exposed on the compound namespace. Every one of these must carry a
// declared identity — identity used to be inferred from the component function
// name, which minified builds rename.
const NAMESPACE_SLOT_KEYS = [
  "Progress",
  "Volume",
  "PlayList",
  "PlayListEmpty",
  "PlayButton",
  "RepeatButton",
  "SpeedSelector",
  "Artwork",
  "TrackInfo",
  "TrackTime",
  "CustomComponent",
] as const;

describe("slot identity", () => {
  it.each(NAMESPACE_SLOT_KEYS)(
    "stamps '%s' with a slot id matching its namespace key",
    (slotKey) => {
      const component = AudioPlayer[slotKey] as Record<string, unknown>;
      expect(component[SLOT_ID]).toBe(slotKey);
    }
  );

  it.each(Object.keys(compoundSlotMetaMap))(
    "exposes meta entry '%s' on the compound namespace",
    (metaKey) => {
      expect(NAMESPACE_SLOT_KEYS).toContain(metaKey);
    }
  );

  it("resolves the id through a memo wrapper", () => {
    const Wrapped = memo(function Inner() {
      return null;
    });
    const { Stamped } = withSlotIds({ Stamped: Wrapped });

    expect(resolveSlotKey(createElement(Stamped))).toBe("Stamped");
  });

  it("returns undefined for a component that was never stamped", () => {
    const Foreign = () => null;

    expect(resolveSlotKey(createElement(Foreign))).toBeUndefined();
  });
});
