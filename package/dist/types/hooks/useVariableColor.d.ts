/// <reference types="react" />
export declare type VariableColors<T extends string> = Record<T, string>;
export declare const useVariableColor: <Keys extends string>(variableColors: VariableColors<Keys>) => import("react").MutableRefObject<VariableColors<Keys> | undefined>;
