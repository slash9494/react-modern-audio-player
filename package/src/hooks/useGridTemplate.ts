import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
} from "@/components/AudioPlayer/Context";
import { isBrowser } from "@/utils/ssr";
import { useCallback, useState } from "react";

export const useGridTemplate = (
  activeUI: ActiveUI,
  templateArea: InterfacePlacement["templateArea"] | undefined,
  customComponentsArea?: InterfacePlacement["customComponentsArea"]
) => {
  const generateGridTemplateValues = useCallback(
    (
      activeUi: ActiveUI,
      templatePlacement?: InterfacePlacement["templateArea"],
      customComponentsPlacement?: InterfacePlacement["customComponentsArea"]
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
        let isWithProgress = false;

        const curRowPlacementArr = totalPlacementArr.filter(({ key, row }) => {
          if (row === rowIdx + 1) {
            if (key === "progress") {
              isWithProgress = true;
            }
            return true;
          }
          return false;
        });

        if (isWithProgress) {
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

          const progressItem = curRowPlacementArr.find(
            ({ key }) => key === "progress"
          );
          const progressAreaName = progressItem
            ? `row${rowIdx + 1}-${progressItem.col}`
            : "";

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
          const firstProgressIdx = slotNames.indexOf(progressAreaName);
          const lastProgressIdx = slotNames.lastIndexOf(progressAreaName);
          if (firstProgressIdx !== -1) {
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

  const [curActiveUI, setCurActiveUI] = useState(activeUI);
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
      curPlacementArea.customComponentsArea
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
    return [gridAreas, gridColumns] as const;
  }

  if (
    curActiveUI !== activeUI ||
    curPlacementArea.templateArea !== templateArea ||
    curPlacementArea.customComponentsArea !== customComponentsArea
  ) {
    setCurActiveUI(activeUI);
    setCurPlacementArea({ templateArea, customComponentsArea });

    const { gridAreas, gridColumns } = generateGridTemplateValues(
      activeUI,
      templateArea,
      customComponentsArea
    );
    setCurPlacementAreaValues({ gridAreas, gridColumns });
  }

  const { gridAreas, gridColumns } = curPlacementAreaValues;
  return [gridAreas, gridColumns] as const;
};
