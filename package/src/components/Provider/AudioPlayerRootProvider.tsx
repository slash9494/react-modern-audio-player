import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { useUIContext } from "@/hooks/context/useUIContext";

export interface AudioPlayerRootProviderProps {
  rootContainerProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
}

export const AudioPlayerRootProvider: FC<
  PropsWithChildren<AudioPlayerRootProviderProps>
> = ({ children, rootContainerProps }) => {
  const { playerPlacement: contextPlayerPlacement } = useUIContext();
  const [placementState, setPlacementState] =
    useState<Pick<CSSProperties, "top" | "right" | "bottom" | "left">>();
  useLayoutEffect(() => {
    if (contextPlayerPlacement) {
      const placementValidation = () => {
        const base = {
          top: "auto",
          right: "auto",
          bottom: "auto",
          left: "auto",
        } as const;
        switch (contextPlayerPlacement) {
          case "bottom":
            return { ...base, bottom: 0 };
          case "top":
            return { ...base, top: 0 };
          case "bottom-left":
            return { ...base, bottom: 0, left: 0 };
          case "bottom-right":
            return { ...base, bottom: 0, right: 0 };
          case "top-left":
            return { ...base, top: 0, left: 0 };
          case "top-right":
            return { ...base, top: 0, right: 0 };
          default:
            break;
        }
      };
      setPlacementState(placementValidation());
    }
  }, [contextPlayerPlacement]);

  const isFixed =
    contextPlayerPlacement !== "static" && Boolean(contextPlayerPlacement);

  const style: CSSProperties = {
    width: "100%",
    position: isFixed ? "fixed" : "static",
    ...placementState,
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
