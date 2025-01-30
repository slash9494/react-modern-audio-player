import { GridItemProps } from '../../../Grid/Item';
import React, { FC } from "react";
export declare type CustomComponentProps = {
    children?: React.ReactNode;
    id: string;
} & GridItemProps;
export declare const CustomComponent: FC<CustomComponentProps>;
