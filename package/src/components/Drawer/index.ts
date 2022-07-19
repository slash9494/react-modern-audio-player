import Drawer from "./Drawer";
import { DrawerContent } from "./DrawerContent";
import { DrawerTrigger } from "./DrawerTrigger";

export default Drawer;
Drawer.Content = DrawerContent;
Drawer.Trigger = DrawerTrigger;

export type {
  DrawerContentProps,
  DrawerContentPlacement,
} from "./DrawerContent";
