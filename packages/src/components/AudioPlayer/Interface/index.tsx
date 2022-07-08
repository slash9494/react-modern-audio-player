import { FC } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";
import { Grid } from "@react-spectrum/layout";
import { generateGridAreas } from "../../../utils/generateGridAreas";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";

// TODO : container 는 최상위 , 하위 그룹은 wrapper, 개별 기능은 이름만
export const Interface: FC = () => {
  const { interfacePlacement, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
  const gridA = generateGridAreas(activeUI, interfacePlacement);
  console.log(gridA);
  return (
    <div className="interface-container">
      <Grid alignItems={"center"} rows={["30px", "30px"]} areas={gridA}>
        {/* <Information /> */}
        <Controller />
      </Grid>
      <div className="sortable-play-list-content-container" />
    </div>
  );
};
