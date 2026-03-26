import styled from "styled-components";

export const StyledBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  width: 20px;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  /** //TODO : animation on off  */
  &:hover {
    transform: scale(1.1);
  }
  &:focus-visible {
    outline: 2px solid var(--rm-audio-player-progress-bar, #0072f5);
    outline-offset: 2px;
  }
  &:active {
    transform: scale(0.8);
    opacity: 0.5;
    transition: all 0.2s ease-out;
  }
`;
