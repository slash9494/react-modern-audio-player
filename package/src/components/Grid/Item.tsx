import { CSSProperties, forwardRef, ReactNode } from "react";

export interface GridItemProps {
  gridArea?: string;
  width?: CSSProperties["width"];
  visible?: boolean;
  UNSAFE_className?: string;
  justifySelf?: CSSProperties["justifySelf"];
  padding?: CSSProperties["padding"];
  children?: ReactNode;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      visible = true,
      gridArea,
      width,
      justifySelf = "center",
      padding,
      UNSAFE_className,
    },
    ref
  ) => {
    const style: CSSProperties = {
      gridArea,
      width,
      justifySelf,
      padding: visible ? padding ?? "0 5px" : undefined,
    };
    return (
      <div ref={ref} className={UNSAFE_className} style={style}>
        {visible && children}
      </div>
    );
  }
);
GridItem.displayName = "GridItem";
