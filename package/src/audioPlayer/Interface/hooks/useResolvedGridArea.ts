import {
  InterfacePlacementKey,
  defaultInterfacePlacement,
} from "@/audioPlayer/Context/StateContext";
import { useUIContext } from "@/audioPlayer/Context/hooks/useUIContext";

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
