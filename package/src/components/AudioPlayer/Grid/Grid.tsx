import { Grid as SpectrumGrid } from "@react-spectrum/layout";
import { GridItem } from "./Item";

export const Grid = SpectrumGrid;

type GridComponent = typeof SpectrumGrid & {
  Item: typeof GridItem;
};

export default Grid as GridComponent;
