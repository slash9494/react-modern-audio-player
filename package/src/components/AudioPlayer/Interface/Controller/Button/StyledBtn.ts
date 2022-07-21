import styled from "styled-components";

export const StyledBtn = styled.button`
  display: flex;
  width: 20px;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.8);
    opacity: 0.5;
    transition: all 0.2s ease-out;
  }
`;
