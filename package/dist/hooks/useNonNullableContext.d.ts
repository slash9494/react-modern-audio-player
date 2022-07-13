import { Context } from "react";
import { AudioPlayerDispatchContext } from "../lib/audioContext/dispatchContext";
import { AudioPlayerStateContext } from "../lib/audioContext/StateContext";
declare type ContextType = AudioPlayerStateContext | AudioPlayerDispatchContext;
export declare const useNonNullableContext: <T extends ContextType>(
  context: Context<T | null>
) => T;
export {};
