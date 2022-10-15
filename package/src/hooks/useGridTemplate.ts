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
  const [curActiveUI, setCurActiveUI] = useState(activeUI);
  const [curTemplateArea, setCurTemplateArea] = useState(templateArea);
  const [curTemplateAreaValues, setCurTemplateAreaValues] = useState<{
    gridAreas: string[];
    gridColumns: string[];
  }>();

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
      const placementArr = Object.entries(newInterfacePlacement)
        .map(([key, value]) => {
          const [row, col] = value.split("-");
          return {
            key,
            row: Number(row.split("row")[1]),
            col: Number(col),
          };
        })
        .filter(({ key }) => activeUIArr.includes(key))
        .sort((a, b) => a.col - b.col);

      let maxRow = 1;
      const getMaxRow = () => {
        for (let i = 0; i < placementArr.length; i++) {
          maxRow = Math.max(maxRow, placementArr[i].row);
        }
      };
      getMaxRow();

      const gridAreas = new Array(maxRow).fill("").map((_, rowIdx) => {
        let cols = "";
        for (let i = 0; i < placementArr.length; i++) {
          cols += ` row${rowIdx + 1}-${placementArr[i].col}`;
          if (i === 0) {
            cols = cols.trim();
          }
        }
        return cols;
      });
      const gridColumns = new Array(maxRow).fill("").map((_, rowIdx) => {
        const maxWidth = window ? window.innerWidth - 100 : 1500;

        let cols = "";
        for (let i = 0; i < placementArr.length; i++) {
          if (i === 0) {
            cols = cols.trim();
          }
          if (rowIdx === 0 && placementArr[i].key === "progress") {
            cols += ` 1fr`;
            continue;
          }
          cols += ` fit-content(${maxWidth}px)`;
        }
        return cols;
      });

      return { gridAreas, gridColumns };
    },
    []
  );

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
