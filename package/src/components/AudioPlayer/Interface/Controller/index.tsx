import { FC } from "react";
import "./Controller.css";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { TransportControls, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import { SpeedSelector } from "./SpeedSelector";
import { Volume } from "./Volume";

// TODO(v2.4.2, Phase 7.7): this directory mixes input-kind groupings
// (Button/Input/Drawer) with domain folders (Volume/SpeedSelector), so the
// domain and UI layers collide. Regroup by domain in v2.4.2; full visual
// unification follows the design-system groundwork (v2.7.0 — see
// .claude/docs/v2-final-overhaul.md roadmap).
export const Controller: FC = () => {
  const { activeUI } = useUIContext();
  const isVisible = (key: keyof typeof activeUI) =>
    Boolean(activeUI[key] ?? activeUI.all);

  return (
    <>
      <Progress visible={isVisible("progress")} />
      <RepeatTypeBtn visible={isVisible("repeatType")} />
      <TransportControls visible={isVisible("playButton")} />
      <Volume visible={isVisible("volume")} />
      <SpeedSelector visible={isVisible("playbackRate")} />
      <SortablePlayList visible={isVisible("playList")} />
    </>
  );
};
