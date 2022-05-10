import { FC } from "react";
import styled from "styled-components";
import { StyledBtn } from "./StyledBtn";

interface PrevNnextBtnProps {
  type: "prev" | "next";
}

const PrevNnextStyledBtn = styled(StyledBtn)``;

export const PrevNnextBtn: FC<PrevNnextBtnProps> = ({ type }) => {
  return (
    <PrevNnextStyledBtn>
      {type === "prev" ? (
        <img src="/public/images/play-prev.svg" alt="" />
      ) : (
        <img src="/public/images/play-next.svg" alt="" />
      )}
    </PrevNnextStyledBtn>
  );
};
