import { Context, useContext } from "react";

export const useNonNullableContext = <T>(context: Context<T | null>): T => {
  const state = useContext(context);
  if (!state) throw new Error(`${context} is not provided or null`);
  return state;
};
