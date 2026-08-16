import { renderHook } from "@testing-library/react";
import { ComponentProps, createElement, ReactElement } from "react";
import { describe, expect, it } from "vitest";
import AudioPlayer from "@/audioPlayer";
import { ActiveUI, InterfacePlacement } from "@/audioPlayer/Context";
import { useGridTemplate } from "../useGridTemplate";

// Column numbers are fixed per slot by `defaultInterfacePlacement.templateArea`.
const PROGRESS_COLUMN = 5;
const REPEAT_TYPE_COLUMN = 6;
const VOLUME_COLUMN = 7;
const TOTAL_COLUMNS = 10;
const PROGRESS_AREA = `row1-${PROGRESS_COLUMN}`;
// `Grid` concatenates every entry of `gridColumns` into one
// `grid-template-columns` (`ui/Grid/Grid.tsx:27`), so only the first row's
// tracks are real columns and there is a single flexible index to give away.
const FLEXIBLE_TRACK = "1fr";

// The hook keeps derived state and compares `activeUI` and `compoundChildren`
// by identity, so every argument has to stay referentially stable across the
// re-render its own `set…` calls trigger.
const ALL_UI: ActiveUI = { all: true };
const ALL_UI_WITHOUT_VOLUME: ActiveUI = { all: true, volume: false };
const ALL_UI_WITHOUT_REPEAT_TYPE: ActiveUI = { all: true, repeatType: false };
// Both neighbours of column 7 have to be free for the preset-off case to be
// observable: with repeatType still on, column 7 reads `row1-7` whether it is
// volume's own cell or mere filler, and the assertion could not fail.
const ALL_UI_WITHOUT_VOLUME_AND_REPEAT_TYPE: ActiveUI = {
  all: true,
  volume: false,
  repeatType: false,
};
// `toAreaName` only decides anything for a slot whose preset is off: that is
// the path where the value replaces the slot's template area, so an unreadable
// one would erase it. With the preset on the value becomes an extra area and a
// second `parseAreaName` in the placement pass would mask a broken `toAreaName`.
const ALL_UI_WITHOUT_PROGRESS_AND_REPEAT_TYPE: ActiveUI = {
  all: true,
  progress: false,
  repeatType: false,
};

const makeProgressSlot = (gridArea?: string): ReactElement[] => [
  createElement(AudioPlayer.Progress, { gridArea }),
];

const PROGRESS_AT_ROW2 = makeProgressSlot("row2-1");
const PROGRESS_WITHOUT_AREA = makeProgressSlot();

// A compound copy of `volume` parked on progress's column, the arrangement the
// preset instance was measured being auto-placed out of.
const makeVolumeSlot = (gridArea?: string): ReactElement[] => [
  createElement(AudioPlayer.Volume, { gridArea }),
];

const makePlayButtonSlot = (gridArea: string): ReactElement[] => [
  createElement(AudioPlayer.PlayButton, { gridArea }),
];

const VOLUME_AT_PROGRESS_COLUMN = makeVolumeSlot(`row1-${PROGRESS_COLUMN}`);
const VOLUME_WITHOUT_AREA = makeVolumeSlot();

// Two copies of one slot. Nothing stops a consumer from rendering these, and
// with the preset off `useDuplicateSlotWarning` stays silent, so the template
// has to hold a cell for each.
const TWO_VOLUME_COPIES: ReactElement[] = [
  ...makeVolumeSlot("row1-2"),
  ...makeVolumeSlot("row2-1"),
];
// `progress` carries the renderer name rather than a boolean, so `"bar"` is
// how this preset is switched on.
const ONLY_PROGRESS_UI: ActiveUI = { all: false, progress: "bar" };
const NO_PRESET_UI: ActiveUI = { all: false };

// Progress on both rows: the first copy claims the slot's entry on row 2, the
// second becomes an extra on row 1. Row 2's span is wider, so its centre index
// differs from row 1's — which is what lets a leaked index be spotted.
const PROGRESS_ON_TWO_ROWS: ReactElement[] = [
  ...makeProgressSlot("row2-1"),
  ...makeProgressSlot(PROGRESS_AREA),
  ...makeVolumeSlot("row1-4"),
];
// Progress sits on row 2 with a play button beside it, so row 2's span covers
// only part of the row — the flexible index has to land inside that span, not
// merely somewhere on the row.
const PROGRESS_BELOW_ROW1: ReactElement[] = [
  ...makeVolumeSlot("row1-4"),
  ...makeProgressSlot("row2-1"),
  ...makePlayButtonSlot("row2-3"),
];

// `TrackTime` renders two areas of its own and ignores `gridArea`, so its
// props type omits it — a JS consumer can still pass one.
const TRACK_TIME_WITH_AREA: ReactElement[] = [
  createElement(AudioPlayer.TrackTime, { gridArea: "row2-1" } as ComponentProps<
    typeof AudioPlayer.TrackTime
  >),
];

// None of these is a name the template emits, so each must leave its slot at
// the default cell. `row02-01` and `row0-0` both satisfy the digit pattern —
// the first fails the round-trip to `row2-1`, the second fails the `>= 1`
// bound, which the round-trip alone accepts (`row${0}-${0}` === "row0-0").
const UNREADABLE_AREA_VALUES = ["row1", "row02-01", "row0-0"];

const PLACEMENT_WITH_ITEM_CUSTOM_AREA: InterfacePlacement = {
  itemCustomArea: { progress: "2-4" },
};

// `customComponentsArea` is typed as area names, but it reaches the hook
// straight from consumer props — an untyped caller can put anything there,
// which is exactly the case under test.
const PLACEMENT_WITH_UNREADABLE_CUSTOM_AREA = {
  customComponentsArea: { badge: "top-left", counter: "row2-3" },
} as unknown as InterfacePlacement;

// `row03-01` sits on a row no readable entry claims, so accepting it would
// stretch the template to three rows — the padded form has to be dropped while
// `counter` still fills row 2.
const PLACEMENT_WITH_ZERO_PADDED_CUSTOM_AREA = {
  customComponentsArea: { badge: "row03-01", counter: "row2-3" },
} as unknown as InterfacePlacement;

const renderGridTemplate = (
  activeUI: ActiveUI,
  interfacePlacement?: InterfacePlacement,
  compoundChildren?: ReactElement[]
) =>
  renderHook(() =>
    useGridTemplate(activeUI, interfacePlacement, compoundChildren)
  ).result.current;

const columnsOf = (row: string) => row.split(" ");

const flexibleColumnIndexOf = (gridColumnsRow: string) =>
  columnsOf(gridColumnsRow).indexOf(FLEXIBLE_TRACK);

describe("useGridTemplate column count", () => {
  it("declares every column index up to the widest slot when a control is off", () => {
    const [gridAreas] = renderGridTemplate(ALL_UI_WITHOUT_VOLUME);
    const columns = columnsOf(gridAreas[0]);

    expect(columns).toHaveLength(TOTAL_COLUMNS);
    expect(columns).toContain(`row1-${TOTAL_COLUMNS}`);
  });
});

describe("useGridTemplate progress absorption", () => {
  it("absorbs an empty column that sits directly beside progress", () => {
    const [gridAreas] = renderGridTemplate(ALL_UI_WITHOUT_REPEAT_TYPE);
    const columns = columnsOf(gridAreas[0]);

    expect(columns[REPEAT_TYPE_COLUMN - 1]).toBe(PROGRESS_AREA);
    expect(columns.indexOf(PROGRESS_AREA)).toBe(PROGRESS_COLUMN - 1);
    expect(columns.lastIndexOf(PROGRESS_AREA)).toBe(REPEAT_TYPE_COLUMN - 1);
  });

  it("leaves an empty column detached from progress under its own area name", () => {
    const [gridAreas] = renderGridTemplate(ALL_UI_WITHOUT_VOLUME);
    const columns = columnsOf(gridAreas[0]);

    expect(columns[VOLUME_COLUMN - 1]).toBe(`row1-${VOLUME_COLUMN}`);
    expect(columns.filter((area) => area === PROGRESS_AREA)).toHaveLength(1);
  });
});

describe("useGridTemplate compound slot area", () => {
  it("declares the row a compound slot's gridArea prop asks for", () => {
    const [gridAreas] = renderGridTemplate(ALL_UI, undefined, PROGRESS_AT_ROW2);

    expect(gridAreas).toHaveLength(2);
    expect(columnsOf(gridAreas[1])).toEqual(
      new Array(TOTAL_COLUMNS).fill("row2-1")
    );
  });
});

describe("useGridTemplate additive compound slots", () => {
  it("declares both cells when a compound copy joins a live preset instance", () => {
    const [gridAreas] = renderGridTemplate(
      ALL_UI_WITHOUT_REPEAT_TYPE,
      undefined,
      VOLUME_AT_PROGRESS_COLUMN
    );
    const columns = columnsOf(gridAreas[0]);

    expect(columns[VOLUME_COLUMN - 1]).toBe(`row1-${VOLUME_COLUMN}`);
    expect(columns).toContain(PROGRESS_AREA);
  });

  it("hands the slot's own cell to the compound copy when the preset is off", () => {
    const [gridAreas] = renderGridTemplate(
      ALL_UI_WITHOUT_VOLUME_AND_REPEAT_TYPE,
      undefined,
      VOLUME_AT_PROGRESS_COLUMN
    );
    const columns = columnsOf(gridAreas[0]);

    expect(columns).not.toContain(`row1-${VOLUME_COLUMN}`);
    expect(columns[VOLUME_COLUMN - 1]).toBe(PROGRESS_AREA);
  });

  it("gives every duplicate copy its own cell when the preset is off", () => {
    const [gridAreas] = renderGridTemplate(
      ONLY_PROGRESS_UI,
      undefined,
      TWO_VOLUME_COPIES
    );

    expect(gridAreas).toHaveLength(2);
    expect(columnsOf(gridAreas[0])[1]).toBe("row1-2");
    expect(columnsOf(gridAreas[1])[0]).toBe("row2-1");
  });

  it("ignores a gridArea on a slot the template cannot place", () => {
    const templateWithoutTrackTimeArea = renderGridTemplate(ALL_UI);

    expect(renderGridTemplate(ALL_UI, undefined, TRACK_TIME_WITH_AREA)).toEqual(
      templateWithoutTrackTimeArea
    );
  });

  it("keeps the slot's default cell when a compound copy declares no gridArea", () => {
    const templateWithPresetVolume = renderGridTemplate(
      ALL_UI_WITHOUT_REPEAT_TYPE
    );

    expect(
      renderGridTemplate(
        ALL_UI_WITHOUT_VOLUME_AND_REPEAT_TYPE,
        undefined,
        VOLUME_WITHOUT_AREA
      )
    ).toEqual(templateWithPresetVolume);
  });
});

describe("useGridTemplate flexible column track", () => {
  it("puts the flexible track on the progress span of a single-row layout", () => {
    const [gridAreas, gridColumns] = renderGridTemplate(
      ALL_UI_WITHOUT_REPEAT_TYPE
    );

    expect(columnsOf(gridAreas[0])[flexibleColumnIndexOf(gridColumns[0])]).toBe(
      PROGRESS_AREA
    );
  });

  it("keeps row 1's flexible track on its own progress column when a later row also holds progress", () => {
    const [gridAreas, gridColumns] = renderGridTemplate(
      NO_PRESET_UI,
      undefined,
      PROGRESS_ON_TWO_ROWS
    );

    expect(columnsOf(gridAreas[0])[flexibleColumnIndexOf(gridColumns[0])]).toBe(
      PROGRESS_AREA
    );
    expect(gridColumns[1]).not.toContain(FLEXIBLE_TRACK);
  });

  it("gives the flexible track to the first progress row even when that is not row 1", () => {
    const [gridAreas, gridColumns] = renderGridTemplate(
      NO_PRESET_UI,
      undefined,
      PROGRESS_BELOW_ROW1
    );
    const flexibleIdx = flexibleColumnIndexOf(gridColumns[0]);
    const progressRowColumns = columnsOf(gridAreas[1]);

    expect(flexibleIdx).toBeGreaterThanOrEqual(
      progressRowColumns.indexOf("row2-1")
    );
    expect(flexibleIdx).toBeLessThanOrEqual(
      progressRowColumns.lastIndexOf("row2-1")
    );
  });
});

describe("useGridTemplate itemCustomArea", () => {
  it("ignores itemCustomArea, which holds a raw CSS grid-area value", () => {
    const templateWithoutItemCustomArea = renderGridTemplate(
      ALL_UI_WITHOUT_REPEAT_TYPE
    );

    expect(
      renderGridTemplate(
        ALL_UI_WITHOUT_REPEAT_TYPE,
        PLACEMENT_WITH_ITEM_CUSTOM_AREA
      )
    ).toEqual(templateWithoutItemCustomArea);
  });
});

describe("useGridTemplate unreadable area values", () => {
  it.each(UNREADABLE_AREA_VALUES)(
    "keeps a compound slot at its default area when its gridArea is '%s'",
    (unreadableArea) => {
      const templateWithoutGridArea = renderGridTemplate(
        ALL_UI_WITHOUT_PROGRESS_AND_REPEAT_TYPE,
        undefined,
        PROGRESS_WITHOUT_AREA
      );

      expect(
        renderGridTemplate(
          ALL_UI_WITHOUT_PROGRESS_AND_REPEAT_TYPE,
          undefined,
          makeProgressSlot(unreadableArea)
        )
      ).toEqual(templateWithoutGridArea);
    }
  );

  it("drops a zero-padded customComponentsArea entry", () => {
    const [gridAreas] = renderGridTemplate(
      ALL_UI,
      PLACEMENT_WITH_ZERO_PADDED_CUSTOM_AREA
    );

    expect(gridAreas).toHaveLength(2);
    expect(gridAreas[1]).toContain("row2-3");
  });

  it("drops only the unreadable customComponentsArea entry", () => {
    const [gridAreas] = renderGridTemplate(
      ALL_UI,
      PLACEMENT_WITH_UNREADABLE_CUSTOM_AREA
    );

    expect(gridAreas).toHaveLength(2);
    expect(columnsOf(gridAreas[1])).toHaveLength(TOTAL_COLUMNS);
    expect(gridAreas[1]).toContain("row2-3");
  });
});
