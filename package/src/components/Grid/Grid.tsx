import { CSSProperties, FC, ReactNode } from "react";

export interface NativeGridProps {
  areas?: string[];
  columns?: string[];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  minHeight?: CSSProperties["minHeight"];
  UNSAFE_className?: string;
  "data-testid"?: string;
  children?: ReactNode;
}

const NativeGrid: FC<NativeGridProps> = ({
  areas,
  columns,
  alignItems,
  justifyContent,
  minHeight,
  UNSAFE_className,
  "data-testid": testId,
  children,
}) => {
  const style: CSSProperties = {
    display: "grid",
    gridTemplateAreas: areas?.map((row) => `"${row}"`).join(" "),
    gridTemplateColumns: columns?.join(" "),
    alignItems,
    justifyContent,
    minHeight,
  };
  return (
    <div className={UNSAFE_className} style={style} data-testid={testId}>
      {children}
    </div>
  );
};

export const Grid = NativeGrid;

export default Grid;
