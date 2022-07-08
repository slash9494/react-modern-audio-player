import { Context, useContext } from "react";
import { AudioPlayerDispatchContext } from "../lib/audioContext/dispatchContext";
import { AudioPlayerStateContext } from "../lib/audioContext/StateContext";

type _ContextType = AudioPlayerStateContext | AudioPlayerDispatchContext;

export const useNonNullableContext = <T extends _ContextType>(
  context: Context<T | null>
): T => {
  const state = useContext(context);
  if (!state) throw new Error(`Cannot find ${context}Provider`);
  return state;
};
