import { SpectrumProviderProps } from '../Provider';
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayerProps } from "./Player";
export declare type RMAudioPlayerProps<TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength> = AudioPlayerProps<TInterfacePlacementLength> & SpectrumProviderProps;
declare const AudioPlayerWithProviders: <TInterfacePlacementLength extends number>({ rootContainerProps, ...audioPlayProps }: RMAudioPlayerProps<TInterfacePlacementLength>) => import("react/jsx-runtime").JSX.Element;
declare type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
    CustomComponent: typeof CustomComponent;
};
declare const _default: AudioPlayerComponent;
export default _default;
