import { Context, useContext } from "react";

export const useNonNullableContext = <T>(context: Context<T | null>): T => {
  const state = useContext(context);
  if (!state) {
    const name = context.displayName || "Context";
    throw new Error(`${name} is not provided`);
  }
  return state;
};
