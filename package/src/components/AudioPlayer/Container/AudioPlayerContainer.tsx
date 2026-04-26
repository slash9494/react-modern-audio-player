import React, {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  useMemo,
} from "react";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { PlayerPlacement } from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerContainerProps {
  rootContainerProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
}

type PlacementOffset = Pick<CSSProperties, "top" | "right" | "bottom" | "left">;

const PLACEMENT_OFFSET_BASE: PlacementOffset = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
};

const PLACEMENT_OFFSET_MAP: Partial<Record<PlayerPlacement, PlacementOffset>> =
  {
    bottom: { ...PLACEMENT_OFFSET_BASE, bottom: 0 },
    top: { ...PLACEMENT_OFFSET_BASE, top: 0 },
    "bottom-left": { ...PLACEMENT_OFFSET_BASE, bottom: 0, left: 0 },
    "bottom-right": { ...PLACEMENT_OFFSET_BASE, bottom: 0, right: 0 },
    "top-left": { ...PLACEMENT_OFFSET_BASE, top: 0, left: 0 },
    "top-right": { ...PLACEMENT_OFFSET_BASE, top: 0, right: 0 },
  };

export const AudioPlayerContainer = React.memo<
  PropsWithChildren<AudioPlayerContainerProps>
>(({ children, rootContainerProps }) => {
  const { playerPlacement: contextPlayerPlacement, colorScheme } =
    useUIContext();

  const placementOffset = useMemo<PlacementOffset | undefined>(
    () =>
      contextPlayerPlacement
        ? PLACEMENT_OFFSET_MAP[contextPlayerPlacement]
        : undefined,
    [contextPlayerPlacement]
  );

  const isFixed =
    contextPlayerPlacement !== "static" && Boolean(contextPlayerPlacement);

  const style: CSSProperties = {
    width: "100%",
    position: isFixed ? "fixed" : "static",
    ...placementOffset,
    ...(rootContainerProps?.style ?? {}),
  };

  return (
    <div
      {...rootContainerProps}
      className={`rmap-player-provider${
        rootContainerProps?.className ? ` ${rootContainerProps.className}` : ""
      }`}
      data-theme={colorScheme ?? undefined}
      style={style}
    >
      {children}
    </div>
  );
});

AudioPlayerContainer.displayName = "AudioPlayerContainer";
