import {
  InterfacePlacementKey,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { useUIContext } from "@/hooks/context/useUIContext";

export function usePlacedGridArea(
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
