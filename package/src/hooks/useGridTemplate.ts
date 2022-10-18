import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
} from "@/components/AudioPlayer/Context";
import { useCallback, useState } from "react";

export const useGridTemplate = (
  activeUI: ActiveUI,
  templateArea: InterfacePlacement["templateArea"] | undefined
) => {
  const generateGridTemplateValues = useCallback(
    (activeUi: ActiveUI, placement?: InterfacePlacement["templateArea"]) => {
      const activeUIArr = activeUi.all
        ? Object.keys(defaultInterfacePlacement.templateArea).filter((key) => {
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
          })
        : Object.entries(activeUi)
            .filter(([, value]) => value)
            .map(([key]) => key);

      const renameTrackTime = () => {
        if (activeUIArr.find((key) => key === "trackTime")) {
          activeUIArr.splice(activeUIArr.indexOf("trackTime"), 1);
          activeUIArr.push("trackTimeCurrent");
          activeUIArr.push("trackTimeDuration");
        }
      };
      renameTrackTime();

      const newInterfacePlacement = {
        ...defaultInterfacePlacement.templateArea,
        ...placement,
      };

      let maxRow = 1;
      const colsCntRecord: Record<number, number> = {};
      const placementArr = Object.entries(newInterfacePlacement)
        .map(([key, value]) => {
          const [row, col] = value.split("-");
          return {
            key,
            row: Number(row.split("row")[1]),
            col: Number(col),
          };
        })
        .filter(({ key, row }) => {
          if (activeUIArr.includes(key)) {
            maxRow = Math.max(maxRow, row);
            colsCntRecord[row] = colsCntRecord[row]
              ? colsCntRecord[row] + 1
              : 1;
            return true;
          }
          return false;
        })
        .sort((a, b) => a.col - b.col);

      const maxCol = Math.max(...Object.values(colsCntRecord));

      let progressColIdx: number | undefined;
      const gridAreas = new Array(maxRow).fill("").map((_, rowIdx) => {
        let cols = "";
        let isWithProgress = false;

        const curRowPlacementArr = placementArr.filter(({ key, row }) => {
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
          let extraColCnt = maxCol - curRowPlacementArr.length;
          let curRowIdx = 0;
          for (let i = 0; i < maxCol; i++) {
            if (!extraColCnt && curRowPlacementArr[curRowIdx]?.col > i + 1) {
              curRowIdx++;
              cols += ` row${rowIdx + 1}-${
                curRowPlacementArr[curRowIdx]?.col
                  ? curRowPlacementArr[curRowIdx].col
                  : i + 1
              }`;
            } else {
              extraColCnt--;
              cols += ` row${rowIdx + 1}-${i + 1}`;
            }
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
  const [curTemplateArea, setCurTemplateArea] = useState(templateArea);
  const [curTemplateAreaValues, setCurTemplateAreaValues] = useState<{
    gridAreas: string[];
    gridColumns: string[];
  }>();

  if (!curTemplateAreaValues) {
    const { gridAreas, gridColumns } = generateGridTemplateValues(
      curActiveUI,
      curTemplateArea
    );
    setCurTemplateAreaValues({ gridAreas, gridColumns });
    return [gridAreas, gridColumns] as const;
  }

  if (curActiveUI !== activeUI || curTemplateArea !== templateArea) {
    setCurActiveUI(activeUI);
    setCurTemplateArea(templateArea);

    const { gridAreas, gridColumns } = generateGridTemplateValues(
      activeUI,
      templateArea
    );
    setCurTemplateAreaValues({ gridAreas, gridColumns });
  }

  const { gridAreas, gridColumns } = curTemplateAreaValues;
  return [gridAreas, gridColumns] as const;
};
