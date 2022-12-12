import React, { FC } from "react";
import styled from "styled-components";
import { Controller } from "./Controller";
import { Information } from "./Information";
import { CustomComponent, CustomComponentProps } from "./CustomComponent";

import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import Grid from "@/components/Grid";

import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useGridTemplate } from "@/hooks/useGridTemplate";

interface InterfaceProps {
  children: React.ReactNode;
}

export const Interface: FC<InterfaceProps> = ({ children }) => {
  const { interfacePlacement, activeUI, playListPlacement } =
    useNonNullableContext(audioPlayerStateContext);

  const CustomComponents = React.Children.toArray(children).filter(
    (child) => child !== null
  );

  const CustomComponentsArea = CustomComponents.map((child) => {
    const {
      props: { gridArea },
    } = child as React.ReactElement<CustomComponentProps>;

    return gridArea;
  });
  const [gridAreas, gridColumns] = useGridTemplate(
    activeUI,
    interfacePlacement?.templateArea,
    CustomComponentsArea
  );

  console.log("CustomComponentsArea", CustomComponentsArea);
  return (
    <InterfaceContainer className="interface-container">
      {playListPlacement === "top" && <div className="sortable-play-list" />}
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

        {CustomComponents}
      </Grid>
      {playListPlacement === "bottom" && <div className="sortable-play-list" />}
    </InterfaceContainer>
  );
};

const InterfaceContainer = styled.div`
  .interface-grid {
    background: var(--rm-audio-player-interface-container);
  }
  .interface-grid {
    padding: 0.5rem 10px;
  }
  .sortable-play-list {
    background: var(--rm-audio-player-sortable-list);
    box-shadow: -5px 2px 4px 0px rgb(0 0 0 / 4%) inset;
  }
`;
