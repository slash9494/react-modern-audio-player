import {
  InterfacePlacementKey,
  defaultInterfacePlacement,
} from "@/audio-player/Context/StateContext";
import { useUIContext } from "@/audio-player/Context/hooks/useUIContext";

export function useResolvedGridArea(
  slotKey: InterfacePlacementKey,
  override?: string
): string {
  const { interfacePlacement } = useUIContext();
  return (
    override ??
    interfacePlacement?.itemCustomArea?.[slotKey] ??
    interfacePlacement?.templateArea?.[slotKey] ??
    defaultInterfacePlacement.templateArea[slotKey]
  );
}
