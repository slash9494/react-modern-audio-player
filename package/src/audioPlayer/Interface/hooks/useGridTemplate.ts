import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
} from "@/audioPlayer/Context";
import {
  compoundSlotMetaMap,
  isPresetActive,
  resolveSlotKey,
} from "@/audioPlayer/Interface/compound/slotMetaMap";
import { isBrowser } from "@/utils/ssr";
import { ReactElement, useCallback, useMemo, useState } from "react";

type GridAreaLayer = Partial<Record<string, string>>;

interface CompoundSlotArea {
  activeUIKey: keyof ActiveUI;
  gridArea: string | undefined;
}

// The only shape this template can declare. Three digits leave room above
// `DEFAULT_INTERFACE_GRID_BOUND` for a raised `InterfacePlacement<N>` while
// keeping an unbounded value out of the row and column loops below.
const AREA_NAME_PATTERN = /^row(\d{1,3})-(\d{1,3})$/;

// Accepts a value only if it already *is* the name the template emits. Zero
// padding matches the pattern but not the emitted form (`row02-01` vs
// `row2-1`), and the item is handed its raw value by `useResolvedGridArea`, so
// it would ask for a cell that was never declared. Rejected values — a raw CSS
// `grid-area`, a typo — are treated as absent, leaving the slot its default
// cell while the raw value still reaches CSS.
const parseAreaName = (value: unknown) => {
  if (typeof value !== "string") return null;
  const parsed = AREA_NAME_PATTERN.exec(value);
  if (!parsed) return null;

  const row = +parsed[1];
  const col = +parsed[2];
  if (row < 1 || col < 1) return null;
  return `row${row}-${col}` === value ? { row, col } : null;
};

const toAreaName = (value: string | undefined): string | undefined =>
  parseAreaName(value) ? value : undefined;

// Later layers win, but only where they actually name an area: a partial layer
// carrying an explicit `undefined` must not erase the layer beneath it. The
// layer order follows the `??` chain in `useResolvedGridArea` — that chain is
// what every rendered item asks for, so a template built on any other
// precedence would declare areas no item ever claims. `itemCustomArea` is
// deliberately left out: it holds a raw CSS `grid-area` value (line-based, e.g.
// `"row1-4 / 2 / row1-4 / 10"`), not a name this template can declare.
const mergeAreaLayers = (
  ...layers: (GridAreaLayer | undefined)[]
): Record<string, string> => {
  const mergedAreas: Record<string, string> = {};
  for (const layer of layers) {
    for (const [slotKey, area] of Object.entries(layer ?? {})) {
      if (area !== undefined) mergedAreas[slotKey] = area;
    }
  }
  return mergedAreas;
};

export const useGridTemplate = (
  activeUI: ActiveUI,
  interfacePlacement: InterfacePlacement | undefined,
  compoundChildren?: ReactElement[]
) => {
  const compoundSlotAreas = useMemo<CompoundSlotArea[]>(
    () =>
      (compoundChildren ?? []).flatMap((child) => {
        const slotKey = resolveSlotKey(child);
        const activeUIKey = slotKey
          ? compoundSlotMetaMap[slotKey]?.activeUIKey
          : undefined;
        if (!activeUIKey) return [];
        const { gridArea } = child.props as { gridArea?: string };
        return [{ activeUIKey, gridArea: toAreaName(gridArea) }];
      }),
    [compoundChildren]
  );

  const compoundSlotSignature = useMemo(
    () =>
      compoundSlotAreas
        .map(({ activeUIKey, gridArea }) => `${activeUIKey}:${gridArea ?? ""}`)
        .sort()
        .join(","),
    [compoundSlotAreas]
  );

  const generateGridTemplateValues = useCallback(
    (
      activeUi: ActiveUI,
      placement: InterfacePlacement | undefined,
      compoundSlots: CompoundSlotArea[]
    ) => {
      const activeUIAllKeys = Object.keys(
        defaultInterfacePlacement.templateArea
      ).filter((key) => {
        if (
          (key === "trackTimeCurrent" || key === "trackTimeDuration") &&
          activeUi.trackTime === false
        ) {
          return false;
        }

        if (activeUi[key as keyof ActiveUI] !== undefined) {
          return activeUi[key as keyof ActiveUI];
        }
        return true;
      });

      const activeUIKeysArr = activeUi.all
        ? activeUIAllKeys
        : Object.entries(activeUi)
            .filter(([, value]) => value)
            .map(([key]) => key);

      for (const { activeUIKey } of compoundSlots) {
        if (!activeUIKeysArr.includes(activeUIKey))
          activeUIKeysArr.push(activeUIKey);
      }

      const renameTrackTime = () => {
        if (activeUIKeysArr.find((key) => key === "trackTime")) {
          activeUIKeysArr.splice(activeUIKeysArr.indexOf("trackTime"), 1);
          activeUIKeysArr.push("trackTimeCurrent");
          activeUIKeysArr.push("trackTimeDuration");
        }
      };
      renameTrackTime();

      // A compound child renders additively, so its preset counterpart may be
      // on screen at the same time, and nothing stops a consumer from rendering
      // several copies of one slot. Every instance resolves its own area — the
      // preset one to the slot's entry, each child to its `gridArea` — so only
      // the first area that can claim the slot's entry takes it and the rest
      // are declared alongside. Overwriting instead would leave some instance
      // asking for a name the template no longer holds.
      // `isPresetActive` answers "activeUI allows it", not "it renders": artwork
      // and trackInfo also need track data, so their column can end up reserved
      // for an instance that never appears.
      const compoundReplacements: GridAreaLayer = {};
      const compoundExtraAreas: [string, string][] = [];
      for (const { activeUIKey, gridArea } of compoundSlots) {
        // `trackTime` owns no column of its own — it maps to two areas — so a
        // key the template cannot place would only add a row nothing claims.
        if (
          gridArea === undefined ||
          !(activeUIKey in defaultInterfacePlacement.templateArea)
        ) {
          continue;
        }

        if (
          isPresetActive(activeUi, activeUIKey) ||
          compoundReplacements[activeUIKey] !== undefined
        ) {
          compoundExtraAreas.push([activeUIKey, gridArea]);
        } else {
          compoundReplacements[activeUIKey] = gridArea;
        }
      }

      const totalTemplatePlacement = mergeAreaLayers(
        defaultInterfacePlacement.templateArea,
        placement?.templateArea,
        compoundReplacements
      );
      const activeTemplatePlacementArr = Object.entries(
        totalTemplatePlacement
      ).filter(([key]) => activeUIKeysArr.includes(key));

      let maxRow = 1;
      // Widest column *index* in use, not how many items are placed: column
      // numbers are fixed per slot, so turning one off must not shift the
      // others left.
      let maxCol = 1;

      const totalPlacementArr = [
        ...activeTemplatePlacementArr,
        ...compoundExtraAreas,
        ...Object.entries(placement?.customComponentsArea ?? {}),
      ]
        .flatMap(([key, value]) => {
          // `customComponentsArea` reaches here straight from consumer props,
          // so an unreadable value still has to be dropped rather than poison
          // `maxRow`/`maxCol` and wipe out the template for every item.
          const parsedArea = parseAreaName(value);
          if (!parsedArea) return [];
          const { row, col } = parsedArea;

          maxRow = Math.max(maxRow, row);
          maxCol = Math.max(maxCol, col);
          return [
            {
              key,
              row,
              col,
            },
          ];
        })
        .sort((a, b) => a.col - b.col);

      let progressColIdx: number | undefined;
      const gridAreas = new Array(maxRow).fill("").map((_, rowIdx) => {
        let cols = "";
        // Captured during the filter pass below so `progressItem` and
        // `curRowPlacementArr` stay in sync by construction — no separate
        // `isWithProgress` flag, no second `find()` scan, and TS narrows
        // the nullable away inside the `if (progressItem)` branch so the
        // former `"" fallback` dead-code path is gone.
        let progressItem: (typeof totalPlacementArr)[number] | undefined;

        const curRowPlacementArr = totalPlacementArr.filter((item) => {
          if (item.row !== rowIdx + 1) return false;
          if (item.key === "progress") progressItem = item;
          return true;
        });

        if (progressItem) {
          // Build one slot per column. Each slot gets the area name
          // `row{r}-{col}` by default; empty slots are absorbed by progress
          // so progress visually expands across the unused space. Slot-based
          // iteration (instead of `curRowPlacementArr[i]`) keeps sparse
          // items — e.g. an item at col 2 with no col 1 — in their correct
          // cells.
          const itemByCol = new Map<
            number,
            (typeof curRowPlacementArr)[number]
          >();
          curRowPlacementArr.forEach((item) => itemByCol.set(item.col, item));

          const progressCol = progressItem.col;
          const progressAreaName = `row${rowIdx + 1}-${progressCol}`;

          // A repeated area name must stay rectangular, so only empty columns
          // reachable from progress without crossing an occupied one may take
          // its name. Absorbing a detached gap too would split the span and
          // make CSS discard the whole template.
          const isAdjacentToProgress = (colNum: number) => {
            const step = colNum < progressCol ? 1 : -1;
            for (let col = colNum + step; col !== progressCol; col += step) {
              if (itemByCol.has(col)) return false;
            }
            return true;
          };

          const slotNames: string[] = [];
          for (let i = 0; i < maxCol; i++) {
            const colNum = i + 1;
            // Empty slot → absorbed by progress (repeats progress area name,
            // which CSS Grid interprets as a single spanning area).
            if (!itemByCol.has(colNum) && isAdjacentToProgress(colNum)) {
              slotNames.push(progressAreaName);
            } else {
              slotNames.push(`row${rowIdx + 1}-${colNum}`);
            }
          }

          // Mark the center of the progress span as the 1fr column. Every row
          // repeats the same column tracks, so there is only one index to give
          // away: the first progress row claims it, and a later one must not
          // overwrite it or the free space goes to whatever sits at that index
          // in the row that is actually sized. With progress on more than one
          // row the later spans may not contain that index and stay fixed —
          // one track cannot satisfy spans that do not overlap.
          // `progressAreaName` is guaranteed to appear in `slotNames`:
          // progress's own col lands in itemByCol (hit branch) and produces
          // an identical `row{r}-{col}` name, so indexOf is never -1.
          if (progressColIdx === undefined) {
            const firstProgressIdx = slotNames.indexOf(progressAreaName);
            const lastProgressIdx = slotNames.lastIndexOf(progressAreaName);
            progressColIdx = Math.floor(
              (firstProgressIdx + lastProgressIdx) / 2
            );
          }

          cols = " " + slotNames.join(" ");
        } else {
          // Emit one named area per column slot. An item's `gridArea` prop
          // (e.g. "row1-2") already carries its real column, so the slot
          // name alone is enough — the item lands in its matching cell, and
          // empty slots become filler areas with no conflict. Indexing by
          // `curRowPlacementArr[i]` (sorted array position) instead of by
          // slot would collapse sparse items toward col 1 and duplicate the
          // trailing name — see modes where row items start at col 2+.
          for (let i = 0; i < maxCol; i++) {
            cols += ` row${rowIdx + 1}-${i + 1}`;
          }
        }

        return cols.trimStart();
      });

      const maxWidth = isBrowser ? window.innerWidth - 100 : 1500;
      const gridColumns = new Array(maxRow).fill("").map((_, rowIdx) => {
        let cols = "";
        for (let i = 0; i < maxCol; i++) {
          if (progressColIdx === i && rowIdx === 0) {
            cols += ` 1fr`;
            continue;
          }

          cols += ` fit-content(${maxWidth}px)`;
        }
        return cols.trimStart();
      });

      return { gridAreas, gridColumns };
    },
    []
  );

  const placementAreas = {
    templateArea: interfacePlacement?.templateArea,
    customComponentsArea: interfacePlacement?.customComponentsArea,
  };

  const [curActiveUI, setCurActiveUI] = useState(activeUI);
  const [curCompoundSlotSignature, setCurCompoundSlotSignature] = useState(
    compoundSlotSignature
  );
  const [curPlacementArea, setCurPlacementArea] = useState(placementAreas);
  const [curPlacementAreaValues, setCurPlacementAreaValues] = useState<{
    gridAreas: string[];
    gridColumns: string[];
  }>();

  if (!curPlacementAreaValues) {
    const { gridAreas, gridColumns } = generateGridTemplateValues(
      curActiveUI,
      curPlacementArea,
      compoundSlotAreas
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
    return [gridAreas, gridColumns] as const;
  }

  if (
    curActiveUI !== activeUI ||
    curCompoundSlotSignature !== compoundSlotSignature ||
    curPlacementArea.templateArea !== placementAreas.templateArea ||
    curPlacementArea.customComponentsArea !==
      placementAreas.customComponentsArea
  ) {
    setCurActiveUI(activeUI);
    setCurCompoundSlotSignature(compoundSlotSignature);
    setCurPlacementArea(placementAreas);

    const { gridAreas, gridColumns } = generateGridTemplateValues(
      activeUI,
      interfacePlacement,
      compoundSlotAreas
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
  }

  const { gridAreas, gridColumns } = curPlacementAreaValues;
  return [gridAreas, gridColumns] as const;
};
