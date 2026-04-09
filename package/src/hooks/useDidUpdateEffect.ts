import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * Like `useEffect`, but skips the first invocation (mount).
 * Useful for prop-sync effects where the initial value is already
 * baked into state via the reducer's lazy initializer.
 */
export const useDidUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList
) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
