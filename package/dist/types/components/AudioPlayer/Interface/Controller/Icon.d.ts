import { FC, ReactElement, ReactNode } from "react";
import { IconType } from "react-icons/lib";
interface _IconProps {
    render: ReactElement<IconType>;
    customIcon?: ReactNode;
}
export declare const Icon: FC<_IconProps>;
export {};
