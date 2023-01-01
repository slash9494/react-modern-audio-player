import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "@/components/Provider";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> = AudioPlayerProps<TInterfacePlacementLength> & SpectrumProviderProps;

const AudioPlayerWithProviders = <TInterfacePlacementLength extends number>({
  rootContainerProps,
  ...audioPlayProps
}: RMAudioPlayerProps<TInterfacePlacementLength>) => {
  return (
    <AudioPlayerProvider {...audioPlayProps}>
      <SpectrumProvider rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
        <GlobalStyle />
      </SpectrumProvider>
    </AudioPlayerProvider>
  );
};

type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
  CustomComponent: typeof CustomComponent;
};

export default AudioPlayerWithProviders as AudioPlayerComponent;
