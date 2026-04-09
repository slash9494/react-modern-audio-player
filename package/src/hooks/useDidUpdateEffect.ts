import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * Like `useEffect`, but skips the initial mount invocation.
 * Useful for prop-sync effects where the initial value is already
 * baked into state via the reducer's lazy initializer.
 *
 * StrictMode-safe: React 18 StrictMode runs effects in the order
 * setup₁→cleanup₁→setup₂. A boolean ref flipped inside the deps
 * effect would already be true on setup₂ and fire prematurely.
 *
 * Fix: a separate empty-deps effect (declared AFTER the main effect)
 * sets the flag on mount and resets it on unmount. Because React runs
 * effects in declaration order, the main effect always sees false on
 * mount before the mount-tracker sets it to true.
 */
export const useDidUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList
) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) return;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    hasMounted.current = true;
    return () => {
      hasMounted.current = false;
    };
  }, []);
};
