import { FC, useMemo } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";
import { generateGridTemplateValues } from "../../../utils/generateGridTemplateValues";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import Grid from "../Grid";
import styled from "styled-components";

const InterfaceContainer = styled.div`
  .interface-grid {
    padding: 0.5rem 10px;
  }
`;

export const Interface: FC = () => {
  const { interfacePlacement, activeUI, dropdownPlacement } =
    useNonNullableContext(audioPlayerStateContext);
  const { gridAreas, gridColumns } = generateGridTemplateValues(
    activeUI,
    interfacePlacement?.templateArea
  );
  const sortableListContent = useMemo(
    () => <div className="sortable-play-list-content-container" />,
    []
  );

  return (
    <InterfaceContainer className="interface-container">
      {dropdownPlacement === "top" && sortableListContent}
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        areas={gridAreas}
        minHeight={"30px"}
        columns={gridColumns}
        UNSAFE_className="interface-grid"
      >
        <Information />
        <Controller />
      </Grid>
      {dropdownPlacement === "bottom" && sortableListContent}
    </InterfaceContainer>
  );
};
