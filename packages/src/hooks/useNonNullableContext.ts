import { Context, useContext } from "react";
import { MusicPlayerDispatchContext } from "../lib/musicContext/dispatchContext";
import { MusicPlayerStateContext } from "../lib/musicContext/StateContext";

type ContextType = MusicPlayerStateContext | MusicPlayerDispatchContext;

export const useNonNullableContext = <T extends ContextType>(
  context: Context<T | null>
): T => {
  const state = useContext(context);
  if (!state) throw new Error(`Cannot find ${context}Provider`);
  return state;
};
