import { useEffect, useLayoutEffect } from "react";

/** true when running in a browser environment */
export const isBrowser = typeof window !== "undefined";

/** useLayoutEffect that falls back to useEffect during SSR */
export const useIsomorphicLayoutEffect = isBrowser
  ? useLayoutEffect
  : useEffect;
