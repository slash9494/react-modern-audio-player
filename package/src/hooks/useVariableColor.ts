import { useRef, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "@/utils/ssr";

export type VariableColors<T extends string> = Record<T, string>;

export const useVariableColor = <Keys extends string>(
  variableColors: VariableColors<Keys>,
  // Optional dependency that should trigger a re-read of CSS variables —
  // typically the consumer-controlled colorScheme. The OS-level
  // `prefers-color-scheme` media query is always observed.
  colorSchemeOverride?: string
) => {
  const colorsRef = useRef<VariableColors<Keys>>();

  const readColors = useCallback(() => {
    const el = document.getElementsByClassName("rmap-player-provider")[0];
    if (!el) return;
    const parsedColors: VariableColors<Keys> = Object.entries(
      variableColors
    ).reduce(
      (acc, [key, varName]) => ({
        ...acc,
        [key]: window.getComputedStyle(el).getPropertyValue(`${varName}`),
      }),
      {} as VariableColors<Keys>
    );
    colorsRef.current = parsedColors;
  }, [variableColors]);

  useIsomorphicLayoutEffect(() => {
    readColors();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", readColors);
    return () => mediaQuery.removeEventListener("change", readColors);
  }, [readColors, colorSchemeOverride]);

  return colorsRef;
};
