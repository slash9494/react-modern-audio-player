import { FC, PropsWithChildren } from "react";
import { DOMRefValue } from "@react-types/shared";
import { ProviderProps } from "@react-types/provider";
export interface SpectrumProviderProps {
    rootContainerProps?: Omit<ProviderProps & React.RefAttributes<DOMRefValue<HTMLDivElement>>, "children">;
}
export declare const SpectrumProvider: FC<PropsWithChildren<SpectrumProviderProps>>;
