import { useLayoutEffect, useRef } from "react";

export type VariableColors<T extends string> = Record<T, string>;

export const useVariableColor = <Keys extends string>(
  variableColors: VariableColors<Keys>
) => {
  const colorsRef = useRef<VariableColors<Keys>>();
  useLayoutEffect(() => {
    const parsedColors: VariableColors<Keys> = Object.entries(
      variableColors
    ).reduce(
      (acc, [key, varName]) => ({
        ...acc,
        [key]: window
          .getComputedStyle(
            document.getElementsByClassName("rs-audio-player-provider")[0]
          )
          .getPropertyValue(`${varName}`),
      }),
      {} as VariableColors<Keys>
    );
    colorsRef.current = parsedColors;
  }, [variableColors]);

  return colorsRef;
};
