import styled, { css } from "styled-components";
import { TrackTimePosition } from "./Types";

export interface TrackTimeContainerProps {
  position: TrackTimePosition;
  childrenClassName: string;
}

export const TrackTimeContainer = styled.div<TrackTimeContainerProps>`
  ${({ position, childrenClassName }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 16px;
    font-family: monospace !important;
    font-size: 16px !important;

    .${childrenClassName} {
      margin-right: ${position === "left" && "-10px"};
    }

    ${position === "right" &&
    css`
      .${childrenClassName}:before {
        content: "/";
        margin: 0 0.3rem;
      }
    `}
  `}
`;
