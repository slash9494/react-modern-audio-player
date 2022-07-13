import { FC, useMemo } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";
import { Grid } from "@react-spectrum/layout";
import { generateGridTemplateValues } from "../../../utils/generateGridTemplateValues";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";

export const Interface: FC = () => {
  const { interfacePlacement, activeUI, dropdownPlacement } =
    useNonNullableContext(audioPlayerStateContext);
  const { gridAreas, gridColumns } = generateGridTemplateValues(
    activeUI,
    interfacePlacement
  );
  const sortableListContent = useMemo(
    () => <div className="sortable-play-list-content-container" />,
    []
  );
  return (
    <div className="interface-container">
      {dropdownPlacement === "top" && sortableListContent}
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        areas={gridAreas}
        minHeight={"30px"}
        columns={gridColumns}
      >
        <Information />
        <Controller />
      </Grid>
      {dropdownPlacement === "bottom" && sortableListContent}
    </div>
  );
};
