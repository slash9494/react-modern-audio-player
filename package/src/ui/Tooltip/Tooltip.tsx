import { ReactNode, CSSProperties, forwardRef } from "react";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom";

export interface TooltipProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  placement?: TooltipPlacement;
}

// Decorative floating label: consumers position it (e.g. left %) and own any
// accessible announcement; the tooltip itself is hidden from assistive tech.
// Forwards a ref so consumers can measure the rendered box (e.g. offsetWidth).
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, className, style, placement }, ref) => (
    <div
      ref={ref}
      className={className ? `rmap-tooltip ${className}` : "rmap-tooltip"}
      style={style}
      data-placement={placement}
      aria-hidden="true"
    >
      {children}
    </div>
  )
);

Tooltip.displayName = "Tooltip";
