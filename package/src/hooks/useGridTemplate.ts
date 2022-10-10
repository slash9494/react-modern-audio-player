import { ActiveUI, InterfacePlacement } from "@/components/AudioPlayer/Context";
import { generateGridTemplateValues } from "@/utils/generateGridTemplateValues";
import { useState } from "react";

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
