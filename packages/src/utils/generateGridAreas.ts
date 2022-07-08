import {
  ActiveUI,
  interfacePlacementMaxLength,
} from "lib/audioContext/StateContext";

export const generateGridAreas = (
  activeUi: ActiveUI,
  placementArr?: string[]
) => {
  let maxRowLength = 0;
  let maxColLength = 1;

  const getMaxLength = () => {
    if (!placementArr) {
      if (activeUi.all) {
        maxRowLength = interfacePlacementMaxLength - 1;
        return;
      }
      maxRowLength = Object.values(activeUi).filter((boolean) =>
        Boolean(boolean)
      ).length;
      return;
    }
    for (let i = 0; i < placementArr.length; i++) {
      const row = placementArr[i].split("-")[0];
      const col = placementArr[i].split("-")[1];
      maxRowLength = Math.max(maxRowLength, +row);
      maxColLength = Math.max(maxColLength, +col);
    }
  };
  getMaxLength();

  const gridAreas = new Array(maxRowLength).fill("").map((_, rowIdx) => {
    let cols = "";
    for (let i = 0; i < maxColLength; i++) {
      cols += ` ${rowIdx + 1}-${i + 1}`;
      if (i === 0) {
        cols = cols.trim();
      }
    }
    return cols;
  });

  return gridAreas;
};
