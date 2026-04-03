import { FC, HTMLAttributes, PropsWithChildren } from "react";
import "./TrackTimeContainer.css";
import { TrackTimePosition } from "./Types";

export interface TrackTimeContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  position: TrackTimePosition;
}

export const TrackTimeContainer: FC<
  PropsWithChildren<TrackTimeContainerProps>
> = ({ position, className, children, ...rest }) => {
  return (
    <div
      className={`track-time-container${className ? ` ${className}` : ""}`}
      data-position={position}
      {...rest}
    >
      {children}
    </div>
  );
};
