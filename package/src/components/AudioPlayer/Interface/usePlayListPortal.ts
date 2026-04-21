import { useMemo, useState } from "react";
import { PlayListPortalContextValue } from "./playListPortalContext";

export interface PlayListPortalBinding {
  value: PlayListPortalContextValue;
  setNode: (node: HTMLDivElement | null) => void;
}

export function usePlayListPortal(): PlayListPortalBinding {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const value = useMemo<PlayListPortalContextValue>(() => ({ node }), [node]);
  return { value, setNode };
}
