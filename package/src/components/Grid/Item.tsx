import { CSSProperties, HTMLAttributes, forwardRef } from "react";

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  gridArea?: string;
  width?: CSSProperties["width"];
  visible?: boolean;
  UNSAFE_className?: string;
  justifySelf?: CSSProperties["justifySelf"];
  padding?: CSSProperties["padding"];
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
      style: styleProp,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const style: CSSProperties = {
      gridArea,
      width,
      justifySelf,
      padding: padding ?? "0 5px",
      ...styleProp,
    };
    return (
      <div ref={ref} className={UNSAFE_className} style={style} {...rest}>
        {children}
      </div>
    );
  }
);
GridItem.displayName = "GridItem";
