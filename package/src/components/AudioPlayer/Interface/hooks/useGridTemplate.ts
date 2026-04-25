import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
} from "@/components/AudioPlayer/Context";
import {
  compoundSlotMetaMap,
  resolveSlotKey,
} from "@/components/AudioPlayer/Interface/compound/slotMetaMap";
import { isBrowser } from "@/utils/ssr";
import { ReactElement, useCallback, useMemo, useState } from "react";

export const useGridTemplate = (
  activeUI: ActiveUI,
  templateArea: InterfacePlacement["templateArea"] | undefined,
  customComponentsArea?: InterfacePlacement["customComponentsArea"],
  compoundChildren?: ReactElement[]
) => {
  const compoundActiveKeys = useMemo(
    () =>
      (compoundChildren ?? [])
        .map(resolveSlotKey)
        .map((slotKey) =>
          slotKey ? compoundSlotMetaMap[slotKey]?.activeUIKey : undefined
        )
        .filter((key): key is keyof ActiveUI => key !== undefined),
    [compoundChildren]
  );

  const compoundKeySignature = useMemo(
    () => [...compoundActiveKeys].sort().join(","),
    [compoundActiveKeys]
  );

  const generateGridTemplateValues = useCallback(
    (
      activeUi: ActiveUI,
      templatePlacement: InterfacePlacement["templateArea"] | undefined,
      customComponentsPlacement:
        | InterfacePlacement["customComponentsArea"]
        | undefined,
      compoundKeys: (keyof ActiveUI)[]
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

      for (const key of compoundKeys) {
        if (!activeUIKeysArr.includes(key)) activeUIKeysArr.push(key);
      }

      const renameTrackTime = () => {
        if (activeUIKeysArr.find((key) => key === "trackTime")) {
          activeUIKeysArr.splice(activeUIKeysArr.indexOf("trackTime"), 1);
          activeUIKeysArr.push("trackTimeCurrent");
          activeUIKeysArr.push("trackTimeDuration");
        }
      };
      renameTrackTime();

      const totalTemplatePlacement = {
        ...defaultInterfacePlacement.templateArea,
        ...templatePlacement,
      };
      const activeTemplatePlacementArr = Object.entries(
        totalTemplatePlacement
      ).filter(([key]) => activeUIKeysArr.includes(key));

      let maxRow = 1;
      const colsCntRecord: Record<number, number> = {};

      const totalPlacementArr = [
        ...activeTemplatePlacementArr,
        ...Object.entries(customComponentsPlacement || {}),
      ]
        .flatMap(([key, value]) => {
          if (value == null) return [];
          const [rowWithText, colStrNum] = value.split("-");
          const row = +rowWithText.split("row")[1];

          maxRow = Math.max(maxRow, row);
          colsCntRecord[row] = colsCntRecord[row] ? colsCntRecord[row] + 1 : 1;
          return [
            {
              key,
              row,
              col: +colStrNum,
            },
          ];
        })
        .sort((a, b) => a.col - b.col);

      const maxCol = Math.max(...Object.values(colsCntRecord));

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

          const progressAreaName = `row${rowIdx + 1}-${progressItem.col}`;

          const slotNames: string[] = [];
          for (let i = 0; i < maxCol; i++) {
            const colNum = i + 1;
            // Empty slot → absorbed by progress (repeats progress area name,
            // which CSS Grid interprets as a single spanning area).
            if (!itemByCol.has(colNum)) {
              slotNames.push(progressAreaName);
            } else {
              slotNames.push(`row${rowIdx + 1}-${colNum}`);
            }
          }

          // Mark the center of the progress span as the 1fr column.
          // `progressAreaName` is guaranteed to appear in `slotNames`:
          // progress's own col lands in itemByCol (hit branch) and produces
          // an identical `row{r}-{col}` name, so indexOf is never -1.
          const firstProgressIdx = slotNames.indexOf(progressAreaName);
          const lastProgressIdx = slotNames.lastIndexOf(progressAreaName);
          progressColIdx = Math.floor((firstProgressIdx + lastProgressIdx) / 2);

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

  const [curActiveUI, setCurActiveUI] = useState(activeUI);
  const [curCompoundKeySig, setCurCompoundKeySig] =
    useState(compoundKeySignature);
  const [curPlacementArea, setCurPlacementArea] = useState({
    templateArea,
    customComponentsArea,
  });
  const [curPlacementAreaValues, setCurPlacementAreaValues] = useState<{
    gridAreas: string[];
    gridColumns: string[];
  }>();

  if (!curPlacementAreaValues) {
    const { gridAreas, gridColumns } = generateGridTemplateValues(
      curActiveUI,
      curPlacementArea.templateArea,
      curPlacementArea.customComponentsArea,
      compoundActiveKeys
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
    return [gridAreas, gridColumns] as const;
  }

  if (
    curActiveUI !== activeUI ||
    curCompoundKeySig !== compoundKeySignature ||
    curPlacementArea.templateArea !== templateArea ||
    curPlacementArea.customComponentsArea !== customComponentsArea
  ) {
    setCurActiveUI(activeUI);
    setCurCompoundKeySig(compoundKeySignature);
    setCurPlacementArea({ templateArea, customComponentsArea });

    const { gridAreas, gridColumns } = generateGridTemplateValues(
      activeUI,
      templateArea,
      customComponentsArea,
      compoundActiveKeys
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
  }

  const { gridAreas, gridColumns } = curPlacementAreaValues;
  return [gridAreas, gridColumns] as const;
};
