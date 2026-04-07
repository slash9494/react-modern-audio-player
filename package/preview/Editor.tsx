import { Dispatch, SetStateAction, useState } from "react";
import type {
  ActiveUI,
  InterfaceGridTemplateArea,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement,
} from "../src";
import { CustomComponentsArea, playerMode } from "./playerMode";

interface EditorProps {
  setProgressType: Dispatch<SetStateAction<ProgressUI>>;
  setPlayerPlacement: Dispatch<SetStateAction<PlayerPlacement>>;
  setInterfacePlacement: Dispatch<
    SetStateAction<InterfaceGridTemplateArea | undefined>
  >;
  setPlayListPlacement: Dispatch<SetStateAction<PlayListPlacement>>;
  setVolumeSliderPlacement: Dispatch<
    SetStateAction<VolumeSliderPlacement | undefined>
  >;
  setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>;
  setActiveUI: Dispatch<SetStateAction<ActiveUI>>;
  setWidth: Dispatch<SetStateAction<string>>;
  setCustomComponentsArea: Dispatch<SetStateAction<CustomComponentsArea>>;
}

const sectionStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const Editor = ({
  setProgressType,
  setPlayerPlacement,
  setInterfacePlacement,
  setPlayListPlacement,
  setVolumeSliderPlacement,
  setTheme,
  setActiveUI,
  setWidth,
  setCustomComponentsArea,
}: EditorProps) => {
  const [curPlayerModeIdx, setCurPlayerModeIdx] = useState(0);

  const changePlayerMode = () => {
    const nextIdx = (curPlayerModeIdx + 1) % Object.keys(playerMode).length;
    const next = playerMode[nextIdx];

    setCurPlayerModeIdx(nextIdx);
    setInterfacePlacement(next.interfacePlacement);
    setProgressType(next.progressType);
    setPlayListPlacement(next.playListPlacement);
    setVolumeSliderPlacement(next.volumeSliderPlacement);
    setWidth(next.width ?? "100%");
    setActiveUI(next.activeUI ?? { all: true });
    setCustomComponentsArea(next.customComponentsArea ?? {});
  };

  const changeTheme = () => {
    const isSystemDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme((prevTheme) => {
      switch (prevTheme) {
        case undefined:
          return isSystemDarkTheme ? "light" : "dark";
        case "dark":
          return "light";
        case "light":
          return undefined;
        default:
          return undefined;
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "720px",
        width: "100%",
        background: "rgba(0,0,0,0.04)",
      }}
    >
      <div style={sectionStyle}>
        <button
          onClick={() =>
            setProgressType((prev) => (prev === "bar" ? "waveform" : "bar"))
          }
        >
          change progress type
        </button>

        <button
          onClick={() => {
            setPlayerPlacement((prevPlacement) => {
              switch (prevPlacement) {
                case "static":
                  return "top-left";
                case "top-left":
                  return "bottom-left";
                case "bottom-left":
                  return "static";
                default:
                  return "static";
              }
            });
          }}
        >
          change player placement
        </button>
      </div>

      <div style={sectionStyle}>
        <button onClick={changePlayerMode}>change player mode</button>
        <button onClick={changeTheme}>change theme</button>
      </div>
    </div>
  );
};

export default Editor;
