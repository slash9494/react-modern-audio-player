import { View } from "@react-spectrum/view";
import { forwardRef } from "react";
import { ViewProps } from "@react-types/view";
import { DOMRefValue } from "@react-types/shared";

export interface GridItemProps extends Omit<ViewProps, "children"> {
  visible?: boolean;
  children: React.ReactNode;
}

export const GridItem = forwardRef<
  React.RefAttributes<DOMRefValue<HTMLElement>>,
  GridItemProps
>(({ children, visible = true, ...viewProps }, ref) => {
  return (
    <View
      justifySelf={"center"}
      padding={visible ? "0 5px" : undefined}
      ref={ref as any}
      {...viewProps}
    >
      {visible && children}
    </View>
  );
});
GridItem.displayName = "GridItem";
