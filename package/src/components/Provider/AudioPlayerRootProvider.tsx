import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useMemo,
} from "react";
import { useUIContext } from "@/hooks/context/useUIContext";
import { PlayerPlacement } from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerRootProviderProps {
  rootContainerProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
}

type PlacementOffset = Pick<CSSProperties, "top" | "right" | "bottom" | "left">;

const PLACEMENT_OFFSET_BASE: PlacementOffset = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
};

// Map of `playerPlacement` token → CSS offset overrides. Replaces the
// previous useState + useEffect derived-state pattern with a pure lookup
// that is computed during render. This eliminates the 1-frame stale render
// (where `position: fixed` was applied before the offsets) and the
// hydration mismatch risk on SSR.
const PLACEMENT_OFFSET_MAP: Partial<Record<PlayerPlacement, PlacementOffset>> =
  {
    bottom: { ...PLACEMENT_OFFSET_BASE, bottom: 0 },
    top: { ...PLACEMENT_OFFSET_BASE, top: 0 },
    "bottom-left": { ...PLACEMENT_OFFSET_BASE, bottom: 0, left: 0 },
    "bottom-right": { ...PLACEMENT_OFFSET_BASE, bottom: 0, right: 0 },
    "top-left": { ...PLACEMENT_OFFSET_BASE, top: 0, left: 0 },
    "top-right": { ...PLACEMENT_OFFSET_BASE, top: 0, right: 0 },
  };

export const AudioPlayerRootProvider: FC<
  PropsWithChildren<AudioPlayerRootProviderProps>
> = ({ children, rootContainerProps }) => {
  const { playerPlacement: contextPlayerPlacement } = useUIContext();

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
      className={`rm-audio-player-provider${
        rootContainerProps?.className ? ` ${rootContainerProps.className}` : ""
      }`}
      style={style}
    >
      {children}
    </div>
  );
};
