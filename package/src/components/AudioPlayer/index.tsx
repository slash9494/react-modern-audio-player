import {
  AudioPlayerProvider,
  AudioPlayerRootProvider,
  AudioPlayerRootProviderProps,
} from "@/components/Provider";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> = AudioPlayerProps<TInterfacePlacementLength> & AudioPlayerRootProviderProps;

const AudioPlayerWithProviders = <TInterfacePlacementLength extends number>({
  rootContainerProps,
  ...audioPlayProps
}: RMAudioPlayerProps<TInterfacePlacementLength>) => {
  return (
    <AudioPlayerProvider {...audioPlayProps}>
      <AudioPlayerRootProvider rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
        <GlobalStyle />
      </AudioPlayerRootProvider>
    </AudioPlayerProvider>
  );
};

type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
  CustomComponent: typeof CustomComponent;
};

export default AudioPlayerWithProviders as AudioPlayerComponent;
