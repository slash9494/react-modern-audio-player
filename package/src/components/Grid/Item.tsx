import { View } from "@react-spectrum/view";
import { forwardRef } from "react";

export const GridItem: typeof View = forwardRef((viewProps, ref) => {
  return (
    <View justifySelf={"center"} padding={"0 5px"} ref={ref} {...viewProps}>
      {viewProps.children}
    </View>
  );
});
GridItem.displayName = "GridItem";
