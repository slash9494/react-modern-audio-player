import { NativeGridProps, Grid as BaseGrid } from "./Grid";
import { GridItem } from "./Item";

type GridComponent = typeof BaseGrid & {
  Item: typeof GridItem;
};

const Grid = BaseGrid as GridComponent;
Grid.Item = GridItem;

export type { NativeGridProps };
export type { NativeGridProps as GridProps };
export default Grid;
