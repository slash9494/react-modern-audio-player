import { useLayoutEffect, useRef } from "react";

export type VariableColors<T extends string> = Record<T, string>;
export type ParsedVariableColors<T extends string> = Record<T, string>;

export const useVariableColor = <Keys extends string>(
  variableColors: VariableColors<Keys>
) => {
  const colors = useRef<ParsedVariableColors<Keys>>();
  useLayoutEffect(() => {
    const parsedColors: ParsedVariableColors<Keys> = Object.entries(
      variableColors
    ).reduce(
      (acc, [key, varName]) => ({
        ...acc,
        [key]: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(`${varName}`),
      }),
      {} as ParsedVariableColors<Keys>
    );
    console.log(parsedColors);
    colors.current = parsedColors;
  }, [variableColors]);

  return colors.current;
};
