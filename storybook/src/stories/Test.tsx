import { FC } from "react";
import AudioPlayer from "../../../package/dist/index.es.js";
import { playerMode } from "./playerMode.ts";
// import AudioPlayer, { PlayList } from "react-modern-audio-player";

const initialState = {
  volume: 0.2,
  curPlayId: 3,
};

export const Test: FC<{ mode: string }> = ({ mode }) => {
  const curPlayerMode = playerMode[+mode];

  return (
    <div
      style={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <AudioPlayer {...curPlayerMode} audioInitialState={initialState} />
      </div>
    </div>
  );
};
