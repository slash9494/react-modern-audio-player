import {
  InterfacePlacementKey,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";

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
