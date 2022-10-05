import { FC, PropsWithChildren, useLayoutEffect, useState } from "react";
import { Provider } from "@react-spectrum/provider";
import { theme } from "@react-spectrum/theme-default";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { DOMRefValue } from "@react-types/shared";
import { ProviderProps } from "@react-types/provider";

export interface SpectrumProviderProps {
  rootContainerProps?: Omit<
    ProviderProps & React.RefAttributes<DOMRefValue<HTMLDivElement>>,
    "children"
  >;
}

export const SpectrumProvider: FC<PropsWithChildren<SpectrumProviderProps>> = ({
  children,
  rootContainerProps,
}) => {
  const { playerPlacement: contextPlayerPlacement } = useNonNullableContext(
    audioPlayerStateContext
  );
  const [placementState, setPlacementState] = useState<{
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
  }>();
  useLayoutEffect(() => {
    if (contextPlayerPlacement) {
      const placementValidation = () => {
        switch (contextPlayerPlacement) {
          case "bottom":
            return { bottom: 0 };
          case "top":
            return { top: 0 };
          case "bottom-left":
            return { bottom: 0, left: 0 };
          case "bottom-right":
            return { bottom: 0, right: 0 };
          case "top-left":
            return { top: 0, left: 0 };
          case "top-right":
            return { top: 0, right: 0 };
          default:
            break;
        }
      };
      setPlacementState(placementValidation());
    }
  }, [contextPlayerPlacement]);

  return (
    <Provider
      theme={theme}
      width={"100%"}
      position={
        contextPlayerPlacement === "static" || !contextPlayerPlacement
          ? "static"
          : "fixed"
      }
      UNSAFE_className="rm-audio-player-provider"
      {...placementState}
      {...rootContainerProps}
    >
      {children}
    </Provider>
  );
};
