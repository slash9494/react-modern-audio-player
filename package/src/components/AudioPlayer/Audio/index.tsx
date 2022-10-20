import { Basic } from "./Basic";
import { FC } from "react";
import { WaveSurferAudio } from "./WaveSurfer";

export const Audio: FC = () => {
  return (
    <>
      <WaveSurferAudio />
      <Basic />
    </>
  );
};
