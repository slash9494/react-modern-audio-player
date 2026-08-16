import Dropdown from "./Dropdown";
import { DropdownContent } from "./DropdownContent";
import { DropdownTrigger } from "./DropdownTrigger";

export default Dropdown;
Dropdown.Content = DropdownContent;
Dropdown.Trigger = DropdownTrigger;

export type {
  DropdownContentProps,
  DropdownContentPlacement,
} from "./DropdownContent";
