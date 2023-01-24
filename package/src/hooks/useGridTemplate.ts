import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
} from "@/components/AudioPlayer/Context";
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
        .map(([key, value]) => {
          const [rowWithText, colStrNum] = value!.split("-");
          const row = +rowWithText.split("row")[1];

          maxRow = Math.max(maxRow, row);
          colsCntRecord[row] = colsCntRecord[row] ? colsCntRecord[row] + 1 : 1;
          return {
            key,
            row,
            col: +colStrNum,
          };
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
          const progressCnt = maxCol - (curRowPlacementArr.length - 1);

          for (let i = 0; i < maxCol - (progressCnt - 1); i++) {
            if (curRowPlacementArr[i]?.key === "progress") {
              cols += ` row${rowIdx + 1}-${curRowPlacementArr[i].col} `.repeat(
                progressCnt
              );
              progressColIdx = Math.ceil(progressCnt / 2) + i - 1;
            } else {
              cols += ` row${rowIdx + 1}-${
                curRowPlacementArr[i] ? curRowPlacementArr[i].col : i + 1
              }`;
            }
          }
        } else {
          for (let i = 0; i < maxCol; i++) {
            cols += ` row${rowIdx + 1}-${
              curRowPlacementArr[i] ? curRowPlacementArr[i].col : i + 1
            }`;
          }
        }

        return cols.trimStart();
      });

      const maxWidth = window ? window.innerWidth - 100 : 1500;
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
