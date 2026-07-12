import { FC, ReactNode, CSSProperties } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// Decorative floating label: consumers position it (e.g. left %) and own any
// accessible announcement; the tooltip itself is hidden from assistive tech.
export const Tooltip: FC<TooltipProps> = ({ children, className, style }) => (
  <div
    className={className ? `rmap-tooltip ${className}` : "rmap-tooltip"}
    style={style}
    aria-hidden="true"
  >
    {children}
  </div>
);
